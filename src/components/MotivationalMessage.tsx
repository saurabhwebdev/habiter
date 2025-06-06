import React, { useEffect, useState, useCallback, useRef } from 'react';
import { geminiService } from '@/lib/geminiService';
import { Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Default messages array to avoid any API or Supabase calls
const DEFAULT_MESSAGES = [
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

// Get a random message from the default array
const getRandomMessage = () => {
  return DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];
};

export const MotivationalMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [prevMessage, setPrevMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const REFRESH_INTERVAL = 30; // seconds
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMessage = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Start fade out transition of current message
      if (message) {
        setPrevMessage(message);
        setFadeState('out');
        // Wait for fade out animation to complete
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Simply get a random message from our local array
      // No API calls, no Supabase, just instant messages
      const newMessage = getRandomMessage();
      
      setMessage(newMessage);
      setFadeState('in');
      
      // Reset timer to full interval
      setTimeRemaining(REFRESH_INTERVAL);
      
      // Clear and restart the countdown timer
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      
      countdownRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Don't restart the countdown here - fetchMessage will do it
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error displaying message:', error);
      
      // Just to be safe, set a default message
      if (!message) {
        setMessage(getRandomMessage());
        setFadeState('in');
      }
    } finally {
      setIsLoading(false);
    }
  }, [message]);

  // Initial fetch and timer setup
  useEffect(() => {
    // Fetch the first message
    fetchMessage();
    
    // Set up timer to auto-refresh
    timerRef.current = setInterval(() => {
      fetchMessage();
    }, REFRESH_INTERVAL * 1000);
    
    // Clean up on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <div className="bg-black/5 rounded-lg border border-black/10 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-black/5 p-2 rounded-full">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <div className="flex-1">
            {/* Fixed height message container */}
            <div 
              ref={messageContainerRef}
              className="min-h-[80px] flex items-center"
            >
              {isLoading ? (
                <div className="w-full space-y-2">
                  <div className="h-4 w-3/4 bg-black/10 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-black/10 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-black/10 animate-pulse rounded" />
                </div>
              ) : (
                <div className="w-full">
                  <p 
                    className={cn(
                      "text-black font-medium transition-opacity duration-300",
                      fadeState === 'in' ? 'opacity-100' : 'opacity-0'
                    )}
                  >
                    {message}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/10">
              <div className="flex items-center text-xs text-black/60">
                <RefreshCw className={cn(
                  "h-3 w-3 mr-1 transition-transform",
                  timeRemaining <= 5 ? "animate-spin" : ""
                )} />
                <span>New message in {timeRemaining}s</span>
              </div>
              <button 
                onClick={() => fetchMessage()} 
                className="text-xs text-black/60 hover:text-black transition-colors"
                disabled={isLoading}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 