import { supabase } from './supabase';
import { 
  Habit, 
  HabitLog, 
  Streak, 
  NewHabit, 
  NewHabitLog, 
  HabitWithProgress,
  HabitFilters,
  DateRange,
  MoneySaving,
  NewMoneySaving,
  JournalEntry,
  NewJournalEntry,
  JournalFilters
} from '@/types/habit';

export const habitService = {
  // Habits CRUD operations
  async getHabits(filters?: HabitFilters): Promise<Habit[]> {
    let query = supabase
      .from('habits')
      .select('*');
    
    // Apply filters if provided
    if (filters) {
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      if (filters.sortBy) {
        const direction = filters.sortDirection || 'asc';
        query = query.order(filters.sortBy, { ascending: direction === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
    
    return data as Habit[];
  },
  
  async getHabitById(id: string): Promise<Habit | null> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching habit:', error);
      throw error;
    }
    
    return data as Habit;
  },
  
  async createHabit(habit: NewHabit): Promise<Habit> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Add the user_id to the habit object
    const habitWithUserId = {
      ...habit,
      user_id: user.id
    };
    
    const { data, error } = await supabase
      .from('habits')
      .insert([habitWithUserId])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
    
    return data as Habit;
  },
  
  async updateHabit(id: string, habit: Partial<Habit>): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .update(habit)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
    
    return data as Habit;
  },
  
  async deleteHabit(id: string): Promise<void> {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  },
  
  // Habit Logs operations
  async getHabitLogs(habitId: string, dateRange?: DateRange): Promise<HabitLog[]> {
    let query = supabase
      .from('habit_logs')
      .select('*')
      .eq('habit_id', habitId);
    
    if (dateRange) {
      query = query
        .gte('date', dateRange.start)
        .lte('date', dateRange.end);
    }
    
    query = query.order('time', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching habit logs:', error);
      throw error;
    }
    
    return data as HabitLog[];
  },
  
  async getHabitLogsForDate(habitId: string, date: string): Promise<HabitLog[]> {
    const { data, error } = await supabase
      .from('habit_logs')
      .select('*')
      .eq('habit_id', habitId)
      .eq('date', date)
      .order('time', { ascending: false });
    
    if (error) {
      console.error('Error fetching habit logs for date:', error);
      throw error;
    }
    
    return data as HabitLog[];
  },
  
  async createHabitLog(log: NewHabitLog): Promise<HabitLog> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the current date and time
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toISOString(); // Use full ISO string for timestamp with time zone
    
    // Add the user_id, date, and time to the log object
    const logWithUserId = {
      ...log,
      user_id: user.id,
      date: date,
      time: time
    };
    
    const { data, error } = await supabase
      .from('habit_logs')
      .insert([logWithUserId])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating habit log:', error);
      throw error;
    }
    
    return data as HabitLog;
  },
  
  async deleteHabitLog(id: string): Promise<void> {
    const { error } = await supabase
      .from('habit_logs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting habit log:', error);
      throw error;
    }
  },
  
  // Streaks operations
  async getStreak(habitId: string): Promise<Streak | null> {
    try {
      // Try to get the existing streak
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('habit_id', habitId)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // No streak found, create a new one
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            throw new Error('User not authenticated');
          }
          
          // Create a new streak record
          const newStreak = {
            habit_id: habitId,
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0
          };
          
          const { data: createdStreak, error: createError } = await supabase
            .from('streaks')
            .insert([newStreak])
            .select()
            .single();
          
          if (createError) {
            console.error('Error creating streak:', createError);
            return null;
          }
          
          return createdStreak as Streak;
        }
        
        console.error('Error fetching streak:', error);
        return null;
      }
      
      return data as Streak;
    } catch (error) {
      console.error('Error in getStreak:', error);
      return null;
    }
  },
  
  // Money Savings operations
  async getMoneySavings(habitId: string, dateRange?: DateRange): Promise<MoneySaving[]> {
    let query = supabase
      .from('money_savings')
      .select('*')
      .eq('habit_id', habitId);
    
    if (dateRange) {
      query = query
        .gte('date', dateRange.start)
        .lte('date', dateRange.end);
    }
    
    query = query.order('date', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching money savings:', error);
      throw error;
    }
    
    return data as MoneySaving[];
  },
  
  async getMoneySavingForDate(habitId: string, date: string): Promise<MoneySaving | null> {
    const { data, error } = await supabase
      .from('money_savings')
      .select('*')
      .eq('habit_id', habitId)
      .eq('date', date)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No money saving found for this date
        return null;
      }
      console.error('Error fetching money saving for date:', error);
      throw error;
    }
    
    return data as MoneySaving;
  },
  
  async createOrUpdateMoneySaving(saving: NewMoneySaving): Promise<MoneySaving> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the current date
    const date = new Date().toISOString().split('T')[0];
    
    // Check if there's already a record for this habit and date
    const existingSaving = await this.getMoneySavingForDate(saving.habit_id, date);
    
    if (existingSaving) {
      // Update existing record
      const { data, error } = await supabase
        .from('money_savings')
        .update({ amount_saved: saving.amount_saved })
        .eq('id', existingSaving.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating money saving:', error);
        throw error;
      }
      
      return data as MoneySaving;
    } else {
      // Create new record
      const savingWithUserIdAndDate = {
        ...saving,
        user_id: user.id,
        date: date
      };
      
      const { data, error } = await supabase
        .from('money_savings')
        .insert([savingWithUserIdAndDate])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating money saving:', error);
        throw error;
      }
      
      return data as MoneySaving;
    }
  },
  
  async getTotalMoneySaved(habitId: string): Promise<number> {
    const { data, error } = await supabase
      .from('money_savings')
      .select('amount_saved')
      .eq('habit_id', habitId);
    
    if (error) {
      console.error('Error fetching total money saved:', error);
      throw error;
    }
    
    return data.reduce((total, saving) => total + saving.amount_saved, 0);
  },
  
  // Get habits with today's progress
  async getHabitsWithProgress(): Promise<HabitWithProgress[]> {
    const today = new Date().toISOString().split('T')[0];
    
    // Get all habits
    const habits = await this.getHabits();
    
    // Get today's logs for all habits
    const habitsWithProgress = await Promise.all(
      habits.map(async (habit) => {
        // Get logs for today
        const logs = await this.getHabitLogsForDate(habit.id, today);
        
        // Calculate total for today
        const total = logs.reduce((sum, log) => sum + log.count, 0);
        
        // Get streak
        const streak = await this.getStreak(habit.id);
        
        // Calculate progress percentage
        let progressPercentage = 0;
        let goalMet = false;
        
        if (habit.goal_type === 'min') {
          // For min goals (like drink 8 glasses of water)
          progressPercentage = Math.min(100, (total / habit.daily_goal) * 100);
          goalMet = total >= habit.daily_goal;
        } else {
          // For max goals (like smoke max 5 cigarettes)
          progressPercentage = habit.daily_goal > 0 
            ? Math.min(100, (total / habit.daily_goal) * 100)
            : (total > 0 ? 100 : 0);
          goalMet = total <= habit.daily_goal;
        }
        
        // Calculate money saved if money tracking is enabled
        let moneySavedToday = 0;
        let totalMoneySaved = 0;
        
        if (habit.money_tracking_enabled && habit.cost_per_unit) {
          // For negative habits, money is saved by not doing the habit
          if (habit.type === 'negative') {
            // Calculate how many units were avoided
            const unitsAvoided = Math.max(0, habit.daily_goal - total);
            moneySavedToday = unitsAvoided * habit.cost_per_unit;
            
            // Save today's money saving
            if (moneySavedToday > 0) {
              try {
                await this.createOrUpdateMoneySaving({
                  habit_id: habit.id,
                  amount_saved: moneySavedToday
                });
              } catch (error) {
                console.error('Error saving money saving:', error);
              }
            }
          }
          
          // Get total money saved for this habit
          try {
            totalMoneySaved = await this.getTotalMoneySaved(habit.id);
          } catch (error) {
            console.error('Error getting total money saved:', error);
          }
        }
        
        return {
          ...habit,
          logs_today: logs,
          total_today: total,
          streak,
          current_streak: streak?.current_streak || 0,
          longest_streak: streak?.longest_streak || 0,
          progress_percentage: progressPercentage,
          goal_met: goalMet,
          money_saved_today: moneySavedToday,
          total_money_saved: totalMoneySaved
        };
      })
    );
    
    return habitsWithProgress;
  },
  
  // Journal operations
  async getJournalEntries(filters?: JournalFilters): Promise<JournalEntry[]> {
    let query = supabase
      .from('journal_entries')
      .select('*');
    
    // Apply filters if provided
    if (filters) {
      if (filters.habit_id) {
        query = query.eq('habit_id', filters.habit_id);
      }
      
      if (filters.date_range) {
        query = query
          .gte('date', filters.date_range.start)
          .lte('date', filters.date_range.end);
      }
      
      if (filters.mood) {
        query = query.eq('mood', filters.mood);
      }
      
      if (filters.search) {
        query = query.ilike('content', `%${filters.search}%`);
      }
    }
    
    query = query.order('created_at', { ascending: false });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
    
    return data as JournalEntry[];
  },
  
  async getJournalEntryById(id: string): Promise<JournalEntry | null> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching journal entry:', error);
      throw error;
    }
    
    return data as JournalEntry;
  },
  
  async createJournalEntry(entry: NewJournalEntry): Promise<JournalEntry> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Get the current date
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    
    // Add the user_id and date to the entry object
    const entryWithUserId = {
      ...entry,
      user_id: user.id,
      date
    };
    
    const { data, error } = await supabase
      .from('journal_entries')
      .insert([entryWithUserId])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
    
    return data as JournalEntry;
  },
  
  async updateJournalEntry(id: string, entry: Partial<JournalEntry>): Promise<JournalEntry> {
    const { data, error } = await supabase
      .from('journal_entries')
      .update(entry)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating journal entry:', error);
      throw error;
    }
    
    return data as JournalEntry;
  },
  
  async deleteJournalEntry(id: string): Promise<void> {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting journal entry:', error);
      throw error;
    }
  },
}; 