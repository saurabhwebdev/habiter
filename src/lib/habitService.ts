import { supabase } from './supabase';
import { 
  Habit, 
  HabitLog, 
  Streak, 
  NewHabit, 
  NewHabitLog, 
  HabitWithProgress,
  HabitFilters,
  DateRange
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
        
        return {
          ...habit,
          logs_today: logs,
          total_today: total,
          streak,
          current_streak: streak?.current_streak || 0,
          longest_streak: streak?.longest_streak || 0,
          progress_percentage: progressPercentage,
          goal_met: goalMet
        };
      })
    );
    
    return habitsWithProgress;
  }
}; 