import { supabase } from '@/lib/supabase';

const GEMINI_API_KEY = "AIzaSyDbjsVh3l8WjWr1JF5jGDupHZnfLN90a_0";
const GEMINI_MODEL = "models/gemini-2.5-flash-preview-05-20";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

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
      // First try to get a random message from Supabase
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
      console.error('Error getting fallback message:', error);
      return this.getDefaultMessages();
    }
  },

  /**
   * Get a random motivational message from the Gemini API
   * Falls back to Supabase if API fails
   */
  async getMotivationalMessage(): Promise<string> {
    try {
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
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini API');
      }

      const message = data.candidates[0].content.parts[0].text.trim();
      
      // Save successful message to Supabase for future use
      await this.saveMessageToSupabase(message);
      
      return message;
    } catch (error) {
      console.error('Error fetching motivational message:', error);
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