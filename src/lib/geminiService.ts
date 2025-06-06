import { supabase } from '@/lib/supabase';

const GEMINI_API_KEY = "AIzaSyCkbXUlRUe4mQiEjEUgOyAxRAkaN4gm9hM";
const GEMINI_MODEL = "models/gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// To track API errors and avoid hammering the API if it's down
let API_ERROR_COUNT = 0;
const MAX_API_ERRORS = 3;
const ERROR_RESET_TIME = 60 * 1000; // 1 minute

// Flag to skip API calls entirely and use only local messages
const USE_LOCAL_MESSAGES_ONLY = true;

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface MotivationalMessage {
  id: string;
  message: string;
  created_at: string;
  used_count: number;
}

/**
 * Service to interact with Google's Gemini API
 */
export const geminiService = {
  /**
   * Save a motivational message to Supabase
   */
  async saveMessageToSupabase(message: string): Promise<void> {
    try {
      await supabase
        .from('motivational_messages')
        .insert({ message });
    } catch (error) {
      console.error('Error saving message to Supabase:', error);
    }
  },
  
  /**
   * Get a fallback message from Supabase
   */
  async getFallbackMessage(): Promise<string> {
    try {
      // Try to get a random message from Supabase
      const { data, error } = await supabase
        .from('motivational_messages')
        .select('*')
        .order('used_count', { ascending: true }) // Prioritize less-used messages
        .limit(10);
      
      if (error || !data || data.length === 0) {
        return this.getDefaultMessages();
      }
      
      // Pick a random message from the results
      const randomIndex = Math.floor(Math.random() * data.length);
      const selectedMessage = data[randomIndex] as MotivationalMessage;
      
      // Update the used count
      await supabase
        .from('motivational_messages')
        .update({ used_count: selectedMessage.used_count + 1 })
        .eq('id', selectedMessage.id);
      
      return selectedMessage.message;
    } catch (error) {
      console.error('Error getting message from Supabase:', error);
      return this.getDefaultMessages();
    }
  },

  /**
   * Get a random motivational message from the Gemini API
   * Falls back to Supabase if API fails
   */
  async getMotivationalMessage(): Promise<string> {
    // Skip the API entirely if configured to use only local messages
    if (USE_LOCAL_MESSAGES_ONLY) {
      return this.getFallbackMessage();
    }
    
    // If we've had too many recent API errors, skip the API call entirely
    if (API_ERROR_COUNT >= MAX_API_ERRORS) {
      console.log('Skipping Gemini API due to recent errors');
      return this.getFallbackMessage();
    }
    
    try {
      console.log('Starting Gemini API request...');
      
      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log('Aborting Gemini API request due to timeout');
        controller.abort();
      }, 10000); // 10 seconds timeout
      
      console.log('Sending fetch request to Gemini API...');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a powerful, impactful motivational quote or message for someone building better habits. 
                  
                  Requirements:
                  - Keep it under 20 words
                  - Make it profound and meaningful
                  - Draw inspiration from self-help principles (atomic habits, power of now, mindfulness, etc.)
                  - Focus on themes like consistency, small steps, progress over perfection, resilience
                  - Be direct and action-oriented
                  - Don't use clichés
                  - Don't include attribution or quotes
                  - Don't use phrases like "remember that" or "always"
                  
                  Examples of good messages:
                  - "Small actions compound. Your daily 1% improvements are building an extraordinary future."
                  - "The path to transformation is paved with tiny, consistent choices made daily."
                  - "Your habits shape your identity. Choose the ones that build who you want to become."
                  - "Embrace discomfort today; it's the price of growth for tomorrow's strength."
                  `
                }
              ]
            }
          ]
        }),
        signal: controller.signal
      });
      
      // Clear the timeout
      clearTimeout(timeoutId);
      console.log('Received response from Gemini API');

      if (!response.ok) {
        console.error(`Gemini API error: ${response.status} ${response.statusText}`);
        throw new Error(`API request failed with status ${response.status}`);
      }

      console.log('Parsing Gemini API response...');
      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0 || 
          !data.candidates[0].content || 
          !data.candidates[0].content.parts || 
          !data.candidates[0].content.parts[0].text) {
        console.error('Invalid Gemini API response format:', JSON.stringify(data));
        throw new Error('Invalid response format from Gemini API');
      }

      const message = data.candidates[0].content.parts[0].text.trim();
      console.log('Successfully extracted message from Gemini API');
      
      if (!message || message.length < 5) {
        console.error('Empty or too short message received from Gemini API');
        throw new Error('Empty or too short message received');
      }
      
      // Reset API error count on success
      API_ERROR_COUNT = 0;
      
      // Save successful message to Supabase for future use
      await this.saveMessageToSupabase(message);
      console.log('Successfully saved message to Supabase');
      
      return message;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorName = error instanceof Error ? error.name : 'Error';
      
      console.error(`Error fetching motivational message: ${errorName} - ${errorMessage}`);
      
      // Check for specific error types
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error('Gemini API request was aborted due to timeout');
      }
      
      // Increment error count
      API_ERROR_COUNT++;
      
      // Set a timer to reset the error count after a while
      if (API_ERROR_COUNT === 1) {
        setTimeout(() => {
          API_ERROR_COUNT = 0;
        }, ERROR_RESET_TIME);
      }
      
      // Fallback to a message from Supabase
      return this.getFallbackMessage();
    }
  },

  /**
   * Get a default message when all else fails
   */
  getDefaultMessages(): string {
    const messages = [
      "Small daily actions compound into remarkable transformations.",
      "Your habits shape your future. Choose wisely today.",
      "Progress lives in the discomfort zone. Step in daily.",
      "The gap between who you are and who you want to be is what you do daily.",
      "Consistency, not intensity, is the path to lasting change.",
      "Each tiny choice is a vote for the person you're becoming.",
      "Success isn't owned, it's rented. The rent is due every day.",
      "Master your habits, master your life.",
      "The quality of your habits determines the quality of your future.",
      "Break the cycle, build the routine, become the person you envision."
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
  }
}; 