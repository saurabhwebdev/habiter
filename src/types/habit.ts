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
}

export interface NewHabitLog {
  habit_id: string;
  count: number;
  note?: string;
}

export interface HabitFilters {
  type?: HabitType;
  search?: string;
  sortBy?: 'name' | 'created_at' | 'progress';
  sortDirection?: 'asc' | 'desc';
}

export interface DateRange {
  start: string;
  end: string;
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