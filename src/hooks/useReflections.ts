import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { ReflectionPrompt, Quote } from '@/lib/types';
import { 
  getRandomReflectionPrompt, 
  addReflection, 
  getRandomQuote 
} from '@/lib/habitService';
import { useToast } from '@/components/ui/use-toast';
import { reflectionPrompts, quotes } from '@/lib/seedData';

export const useReflections = () => {
  const [currentPrompt, setCurrentPrompt] = useState<ReflectionPrompt | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const getRandomPromptFromSeed = (category?: string): ReflectionPrompt => {
    let filteredPrompts = reflectionPrompts;
    
    if (category) {
      filteredPrompts = reflectionPrompts.filter(prompt => prompt.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
    return filteredPrompts[randomIndex];
  };

  const getRandomQuoteFromSeed = (category?: string): Quote => {
    let filteredQuotes = quotes;
    
    if (category) {
      filteredQuotes = quotes.filter(quote => quote.category === category);
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
  };

  const fetchRandomPrompt = async (category?: string) => {
    setLoading(true);
    try {
      // Try to get from Firestore first
      const firestorePrompt = await getRandomReflectionPrompt(category);
      
      if (firestorePrompt) {
        setCurrentPrompt(firestorePrompt);
      } else {
        // Fall back to seed data
        const seedPrompt = getRandomPromptFromSeed(category);
        setCurrentPrompt(seedPrompt);
      }
    } catch (error) {
      // Fall back to seed data on error
      const seedPrompt = getRandomPromptFromSeed(category);
      setCurrentPrompt(seedPrompt);
      
      toast({
        title: "Notice",
        description: "Using local reflection prompts due to connection issues.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomQuote = async (category?: string) => {
    setLoading(true);
    try {
      // Try to get from Firestore first
      const firestoreQuote = await getRandomQuote(category);
      
      if (firestoreQuote) {
        setCurrentQuote(firestoreQuote);
      } else {
        // Fall back to seed data
        const seedQuote = getRandomQuoteFromSeed(category);
        setCurrentQuote(seedQuote);
      }
    } catch (error) {
      // Fall back to seed data on error
      const seedQuote = getRandomQuoteFromSeed(category);
      setCurrentQuote(seedQuote);
      
      toast({
        title: "Notice",
        description: "Using local quotes due to connection issues.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReflection = async (response: string, habitId?: string) => {
    if (!currentUser || !currentPrompt) return;
    
    try {
      await addReflection(currentUser.uid, currentPrompt.id, response, habitId);
      toast({
        title: "Success",
        description: "Reflection saved successfully!",
      });
      // Get a new prompt after submission
      await fetchRandomPrompt();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save reflection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    currentPrompt,
    currentQuote,
    loading,
    fetchRandomPrompt,
    fetchRandomQuote,
    submitReflection
  };
}; 