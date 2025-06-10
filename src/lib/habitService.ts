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
  JournalFilters,
  UserPoints,
  LeaderboardEntry
} from '@/types/habit';

export const habitService = {
  // Habits CRUD operations
  async getHabits(filters?: HabitFilters): Promise<Habit[]> {
    let query = supabase
      .from('habits')
      .select('*')
      .eq('archived', false); // Only get non-archived habits by default
    
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

      // If includeArchived is true, don't filter by archived status
      if (filters.includeArchived) {
        query = supabase
          .from('habits')
          .select('*');
          
        // Re-apply the other filters
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
    
    // Get the habit to calculate points
    const habit = await this.getHabitById(log.habit_id);
    
    // Calculate points earned
    const pointsEarned = habit?.points_per_completion ? habit.points_per_completion * log.count : 10 * log.count;
    
    // Add the user_id, date, and time to the log object
    const logWithDetails = {
      ...log,
      user_id: user.id,
      date,
      time,
      points_earned: pointsEarned
    };
    
    // First, insert the habit log
    const { data, error } = await supabase
      .from('habit_logs')
      .insert([logWithDetails])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating habit log:', error);
      throw error;
    }
    
    // Update the streak for this habit
    try {
      await this.updateStreak(log.habit_id);
    } catch (streakError) {
      console.error('Error updating streak:', streakError);
      // Continue even if streak update fails
    }
    
    // Try to update user points directly
    try {
      // Check if user_points record exists
      const { data: userPointsData } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (!userPointsData) {
        // Create new user_points record
        await supabase
          .from('user_points')
          .insert([{ user_id: user.id, total_points: pointsEarned }]);
      } else {
        // Update existing user_points record
        await supabase
          .from('user_points')
          .update({ 
            total_points: userPointsData.total_points + pointsEarned,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      }
    } catch (pointsError) {
      console.error('Error updating user points:', pointsError);
      // Continue even if points update fails
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
  
  async updateStreak(habitId: string): Promise<void> {
    try {
      // Get the habit to check its goal type
      const habit = await this.getHabitById(habitId);
      if (!habit) {
        throw new Error('Habit not found');
      }
      
      // Get the current date
      const today = new Date().toISOString().split('T')[0];
      
      // Get logs for today
      const logsToday = await this.getHabitLogsForDate(habitId, today);
      
      // Calculate total for today
      const totalToday = logsToday.reduce((sum, log) => sum + log.count, 0);
      
      // Check if the goal is met for today
      let goalMet = false;
      if (habit.goal_type === 'min') {
        goalMet = totalToday >= habit.daily_goal;
      } else {
        goalMet = totalToday <= habit.daily_goal;
      }
      
      // Get or create streak
      const streak = await this.getStreak(habitId);
      if (!streak) {
        return;
      }
      
      // Get yesterday's date
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      let currentStreak = streak.current_streak;
      let longestStreak = streak.longest_streak;
      
      if (goalMet) {
        // If the goal is met today
        if (streak.last_successful_day === yesterdayStr) {
          // Continuing streak
          currentStreak += 1;
        } else if (streak.last_successful_day !== today) {
          // New streak (not continuing and not already counted today)
          currentStreak = 1;
        }
        
        // Update longest streak if needed
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        
        // Update the streak in the database
        await supabase
          .from('streaks')
          .update({
            current_streak: currentStreak,
            longest_streak: longestStreak,
            last_successful_day: today,
            updated_at: new Date().toISOString()
          })
          .eq('id', streak.id);
      }
      
      // For fixed days tracking, update progress if this is the first log of the day
      if (habit.fixed_days_enabled && logsToday.length === 1 && goalMet) {
        await supabase
          .from('habits')
          .update({ 
            fixed_days_progress: (habit.fixed_days_progress || 0) + 1 
          })
          .eq('id', habitId);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
      throw error;
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
    // Get all non-archived habits
    const habits = await this.getHabits();
    
    // Get the current date
    const today = new Date().toISOString().split('T')[0];
    
    // Process each habit to add progress information
    const habitsWithProgress = await Promise.all(habits.map(async (habit) => {
      // Get logs for today
      const logsToday = await this.getHabitLogsForDate(habit.id, today);
      
      // Calculate total for today
      const totalToday = logsToday.reduce((sum, log) => sum + log.count, 0);
      
      // Get streak information
      const streak = await this.getStreak(habit.id);
      
      // Calculate progress percentage
      let progressPercentage = 0;
      let goalMet = false;
      
      // For tapering habits, get the adjusted goal value
      let dailyGoal = habit.daily_goal;
      if (habit.tapering_enabled) {
        dailyGoal = await this.getTaperedGoalValue(habit.id);
      }
      
      if (habit.goal_type === 'min') {
        // For minimum goals, progress is current / goal (capped at 100%)
        progressPercentage = Math.min((totalToday / dailyGoal) * 100, 100);
        goalMet = totalToday >= dailyGoal;
      } else {
        // For maximum goals, progress is (goal - current) / goal (capped at 100%)
        // Higher is better (means you're further under your max limit)
        progressPercentage = Math.min(((dailyGoal - totalToday) / dailyGoal) * 100, 100);
        progressPercentage = Math.max(progressPercentage, 0); // Ensure it's not negative
        goalMet = totalToday <= dailyGoal;
      }
      
      // Get money savings if enabled
      let moneySavedToday = 0;
      let totalMoneySaved = 0;
      
      if (habit.money_tracking_enabled) {
        const moneySavingToday = await this.getMoneySavingForDate(habit.id, today);
        moneySavedToday = moneySavingToday ? moneySavingToday.amount_saved : 0;
        
        totalMoneySaved = await this.getTotalMoneySaved(habit.id);
      }
      
      // Calculate points earned today
      const pointsEarnedToday = logsToday.reduce((sum, log) => sum + (log.points_earned || 0), 0);
      
      return {
        ...habit,
        logs_today: logsToday,
        total_today: totalToday,
        streak: streak || undefined,
        current_streak: streak?.current_streak || 0,
        longest_streak: streak?.longest_streak || 0,
        progress_percentage: progressPercentage,
        goal_met: goalMet,
        money_saved_today: moneySavedToday,
        total_money_saved: totalMoneySaved,
        points_earned_today: pointsEarnedToday
      };
    }));
    
    return habitsWithProgress;
  },
  
  // Get the current tapered goal value for a habit
  async getTaperedGoalValue(habitId: string): Promise<number> {
    const { data, error } = await supabase
      .rpc('calculate_tapered_goal_value', { p_habit_id: habitId });
      
    if (error) {
      console.error('Error calculating tapered goal value:', error);
      throw error;
    }
    
    return data || 0;
  },
  
  // Record a tapering history entry
  async recordTaperingHistory(habitId: string, goalValue: number): Promise<void> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { error } = await supabase
      .from('tapering_history')
      .insert([{
        habit_id: habitId,
        user_id: user.id,
        goal_value: goalValue
      }]);
      
    if (error) {
      console.error('Error recording tapering history:', error);
      throw error;
    }
  },
  
  // Get tapering history for a habit
  async getTaperingHistory(habitId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('tapering_history')
      .select('*')
      .eq('habit_id', habitId)
      .order('date', { ascending: true });
      
    if (error) {
      console.error('Error getting tapering history:', error);
      throw error;
    }
    
    return data || [];
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

  async getArchivedHabits(): Promise<Habit[]> {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('archived', true)
      .order('archived_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching archived habits:', error);
      throw error;
    }
    
    return data as Habit[];
  },

  async archiveHabit(id: string): Promise<Habit> {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('habits')
      .update({ 
        archived: true,
        archived_at: now
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error archiving habit:', error);
      throw error;
    }
    
    return data as Habit;
  },

  async unarchiveHabit(id: string): Promise<Habit> {
    const { data, error } = await supabase
      .from('habits')
      .update({ 
        archived: false,
        archived_at: null
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error unarchiving habit:', error);
      throw error;
    }
    
    return data as Habit;
  },

  async extendFixedDaysHabit(id: string, additionalDays: number): Promise<Habit> {
    // First get the current habit
    const { data: habit, error: getError } = await supabase
      .from('habits')
      .select('*')
      .eq('id', id)
      .single();
    
    if (getError) {
      console.error('Error getting habit for extension:', getError);
      throw getError;
    }
    
    if (!habit.fixed_days_enabled || !habit.fixed_days_target) {
      throw new Error('Cannot extend a habit that does not have fixed days tracking enabled');
    }
    
    // Calculate the new target
    const newTarget = habit.fixed_days_target + additionalDays;
    
    // Update the habit
    const { data, error } = await supabase
      .from('habits')
      .update({ 
        fixed_days_target: newTarget
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error extending habit days:', error);
      throw error;
    }
    
    return data as Habit;
  },

  // Points and Leaderboard operations
  async getUserPoints(): Promise<UserPoints | null> {
    // Get the current user ID
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data, error } = await supabase
      .from('user_points')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error fetching user points:', error);
      throw error;
    }
    
    // If no points record exists yet, create one
    if (!data) {
      const { data: newData, error: createError } = await supabase
        .from('user_points')
        .insert([{ user_id: user.id, total_points: 0 }])
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating user points:', createError);
        throw createError;
      }
      
      return newData as UserPoints;
    }
    
    return data as UserPoints;
  },
  
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    // Get the current user ID for highlighting in the UI
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    try {
      // First get all user points
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .order('total_points', { ascending: false })
        .limit(limit);
      
      if (pointsError) {
        console.error('Error fetching user points:', pointsError);
        throw pointsError;
      }
      
      // Get user profiles separately
      const userIds = pointsData.map((entry: any) => entry.user_id);
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', userIds);
      
      if (profilesError) {
        console.error('Error fetching user profiles:', profilesError);
        // Continue even if profiles fetch fails
      }
      
      // Create a map of user_id to username
      const profileMap = new Map();
      if (profilesData) {
        profilesData.forEach((profile: any) => {
          profileMap.set(profile.id, profile.username);
        });
      }
      
      // Transform the data to include rank and username
      const leaderboard = pointsData.map((entry: any, index) => ({
        user_id: entry.user_id,
        total_points: entry.total_points,
        username: profileMap.get(entry.user_id) || 'Anonymous User',
        rank: index + 1
      }));
      
      return leaderboard as LeaderboardEntry[];
    } catch (error) {
      console.error('Error in getLeaderboard:', error);
      // Return empty leaderboard rather than crashing
      return [];
    }
  },
  
  async addPointsToUser(userId: string, points: number): Promise<void> {
    const { error } = await supabase.rpc('add_points_to_user', {
      user_id_param: userId,
      points_param: points
    });
    
    if (error) {
      console.error('Error adding points to user:', error);
      throw error;
    }
  }
};

export default habitService; 