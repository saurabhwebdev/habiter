import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { CravingLog, CravingLogFormData } from '@/lib/types';
import { getCravingLogs, addCravingLog } from '@/lib/habitService';
import { useToast } from '@/components/ui/use-toast';

export const useCravingLogs = (habitId?: string) => {
  const [logs, setLogs] = useState<CravingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const fetchLogs = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const cravingLogs = await getCravingLogs(currentUser.uid, habitId);
      setLogs(cravingLogs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch craving logs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentUser, habitId]);

  const addLog = async (logData: CravingLogFormData) => {
    if (!currentUser) return;
    
    try {
      await addCravingLog(currentUser.uid, logData);
      toast({
        title: "Success",
        description: "Craving log added successfully!",
      });
      await fetchLogs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add craving log. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    logs,
    loading,
    addLog,
    refreshLogs: fetchLogs
  };
}; 