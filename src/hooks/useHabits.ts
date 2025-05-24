import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Habit, HabitFormData } from '@/lib/types';
import { 
  getUserHabits, 
  createHabit, 
  updateHabit, 
  deleteHabit, 
  toggleHabitCompletion 
} from '@/lib/habitService';
import { useToast } from '@/components/ui/use-toast';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const fetchHabits = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userHabits = await getUserHabits(currentUser.uid);
      setHabits(userHabits);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [currentUser]);

  const addHabit = async (habitData: HabitFormData) => {
    if (!currentUser) return;
    
    try {
      await createHabit(currentUser.uid, habitData);
      toast({
        title: "Success",
        description: "Habit created successfully!",
      });
      await fetchHabits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const editHabit = async (habitId: string, updates: Partial<Habit>) => {
    try {
      await updateHabit(habitId, updates);
      toast({
        title: "Success",
        description: "Habit updated successfully!",
      });
      await fetchHabits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const removeHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId);
      toast({
        title: "Success",
        description: "Habit deleted successfully!",
      });
      await fetchHabits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleCompletion = async (habit: Habit, date: string) => {
    try {
      await toggleHabitCompletion(habit, date);
      await fetchHabits();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update habit completion. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    habits,
    loading,
    addHabit,
    editHabit,
    removeHabit,
    toggleCompletion,
    refreshHabits: fetchHabits
  };
}; 