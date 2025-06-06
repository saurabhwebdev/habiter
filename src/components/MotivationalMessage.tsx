import React, { useEffect, useState, useCallback, useRef } from 'react';
import { geminiService } from '@/lib/geminiService';
import { Sparkles, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MotivationalMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [prevMessage, setPrevMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const REFRESH_INTERVAL = 30; // seconds
  const messageContainerRef = useRef<HTMLDivElement>(null);

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
      
      const motivationalMessage = await geminiService.getMotivationalMessage();
      setMessage(motivationalMessage);
      setFadeState('in');
      setTimeRemaining(REFRESH_INTERVAL);
    } catch (error) {
      console.error('Failed to fetch motivational message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [message]);

  useEffect(() => {
    fetchMessage();
    
    // Set up interval to refresh every 30 seconds
    const refreshIntervalId = setInterval(() => {
      fetchMessage();
    }, REFRESH_INTERVAL * 1000);
    
    // Set up countdown timer
    const countdownIntervalId = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : REFRESH_INTERVAL);
    }, 1000);
    
    // Clean up intervals on component unmount
    return () => {
      clearInterval(refreshIntervalId);
      clearInterval(countdownIntervalId);
    };
  }, [fetchMessage]);

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
                onClick={fetchMessage} 
                className="text-xs text-black/60 hover:text-black transition-colors"
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