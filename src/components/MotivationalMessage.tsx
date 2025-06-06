import React, { useEffect, useState, useCallback } from 'react';
import { geminiService } from '@/lib/geminiService';
import { Sparkles, RefreshCw } from 'lucide-react';

export const MotivationalMessage: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const REFRESH_INTERVAL = 30; // seconds

  const fetchMessage = useCallback(async () => {
    try {
      setIsLoading(true);
      const motivationalMessage = await geminiService.getMotivationalMessage();
      setMessage(motivationalMessage);
      setTimeRemaining(REFRESH_INTERVAL);
    } catch (error) {
      console.error('Failed to fetch motivational message:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    <div className="bg-black/5 p-4 rounded-lg border border-black/10 shadow-sm">
      <div className="flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-black mt-0.5" />
        <div className="flex-1">
          {isLoading ? (
            <div className="h-5 w-48 bg-black/10 animate-pulse rounded" />
          ) : (
            <p className="text-black font-medium">{message}</p>
          )}
          
          <div className="flex items-center mt-2 text-xs text-black/50">
            <RefreshCw className="h-3 w-3 mr-1" />
            <span>New message in {timeRemaining}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 