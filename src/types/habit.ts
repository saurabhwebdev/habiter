export type HabitType = 'positive' | 'negative';
export type GoalType = 'min' | 'max';

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  type: HabitType;
  icon?: string;
  unit: string;
  goal_type: GoalType;
  daily_goal: number;
  cue?: string;
  habit?: string;
  reward?: string;
  reminder_enabled: boolean;
  money_tracking_enabled?: boolean;
  cost_per_unit?: number;
  currency?: string;
  tapering_enabled?: boolean;
  tapering_start_date?: string;
  tapering_end_date?: string;
  tapering_start_value?: number;
  tapering_target_value?: number;
  fixed_days_enabled?: boolean;
  fixed_days_target?: number;
  fixed_days_start_date?: string;
  fixed_days_progress?: number;
  points_per_completion?: number;
  archived?: boolean;
  archived_at?: string;
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  time: string;
  count: number;
  note?: string;
  points_earned?: number;
  created_at: string;
}

export interface MoneySaving {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  amount_saved: number;
  created_at: string;
}

export interface Streak {
  id: string;
  habit_id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_successful_day?: string;
  created_at: string;
  updated_at: string;
}

export interface HabitWithProgress extends Habit {
  logs_today: HabitLog[];
  total_today: number;
  streak?: Streak;
  current_streak?: number;
  longest_streak?: number;
  progress_percentage: number;
  goal_met: boolean;
  money_saved_today?: number;
  total_money_saved?: number;
  points_earned_today?: number;
}

export interface NewHabit {
  name: string;
  type: HabitType;
  icon?: string;
  unit: string;
  goal_type: GoalType;
  daily_goal: number;
  cue?: string;
  habit?: string;
  reward?: string;
  reminder_enabled: boolean;
  money_tracking_enabled?: boolean;
  cost_per_unit?: number;
  currency?: string;
  tapering_enabled?: boolean;
  tapering_start_date?: string;
  tapering_end_date?: string;
  tapering_start_value?: number;
  tapering_target_value?: number;
  fixed_days_enabled?: boolean;
  fixed_days_target?: number;
  fixed_days_start_date?: string;
  fixed_days_progress?: number;
  points_per_completion?: number;
}

export interface NewHabitLog {
  habit_id: string;
  count: number;
  note?: string;
  points_earned?: number;
}

export interface NewMoneySaving {
  habit_id: string;
  amount_saved: number;
}

export interface HabitFilters {
  type?: HabitType;
  search?: string;
  sortBy?: 'name' | 'created_at' | 'progress';
  sortDirection?: 'asc' | 'desc';
  includeArchived?: boolean;
}

export interface DateRange {
  start: string;
  end: string;
}

export type MoodType = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';

export interface JournalEntry {
  id: string;
  habit_id: string;
  user_id: string;
  date: string;
  content: string;
  mood?: string;
  triggers?: string[];
  urge_level?: number;
  created_at: string;
  updated_at: string;
}

export interface NewJournalEntry {
  habit_id: string;
  content: string;
  mood?: string;
  triggers?: string[];
  urge_level?: number;
}

export interface JournalFilters {
  habit_id?: string;
  date_range?: DateRange;
  mood?: string;
  search?: string;
}

export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  total_points: number;
  username?: string;
  rank: number;
}

export const DEFAULT_ICONS: Record<string, string> = {
  water: '💧',
  smoking: '🚬',
  walking: '🚶',
  reading: '📚',
  meditation: '🧘',
  exercise: '💪',
  sleep: '😴',
  food: '🍎',
  coffee: '☕',
  alcohol: '🍷',
  sugar: '🍬',
  social: '👋',
  default: '📝'
}; 