export type HabitType = 'build' | 'break';

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: HabitType;
  frequency: number; // Number of times per week
  createdAt: Date;
  streak: number;
  completedDates: string[]; // ISO date strings
  active: boolean;
  // New fields
  identity?: string; // "I am the type of person who..."
  cue?: string; // What triggers this habit
  craving?: string; // What you desire
  response?: string; // The actual habit
  reward?: string; // What you get from it
  stackedHabit?: string; // ID of habit this is stacked on
  substitutionFor?: string; // For break habits, what it substitutes
  cost?: HabitCost; // For break habits
  environmentDesign?: string[]; // Suggestions for environment changes
  difficulty?: string; // Easy, Medium, Hard
}

export interface HabitCost {
  money?: number; // Monthly cost
  time?: number; // Minutes per day
  health?: string; // Description of health impact
}

export interface HabitFormData {
  name: string;
  description?: string;
  type: HabitType;
  frequency: number;
  identity?: string;
  cue?: string;
  craving?: string;
  response?: string;
  reward?: string;
  stackedHabit?: string;
  substitutionFor?: string;
  cost?: HabitCost;
  environmentDesign?: string[];
  difficulty?: string;
}

export interface DailyProgress {
  date: string; // ISO date string
  completed: boolean;
}

export interface CravingLog {
  id: string;
  userId: string;
  habitId: string;
  timestamp: Date;
  trigger: string;
  intensity: number; // 1-10
  emotion: string;
  location: string;
  action: string; // What the user did in response
  notes?: string;
}

export interface CravingLogFormData {
  habitId: string;
  trigger: string;
  intensity: number;
  emotion: string;
  location: string;
  action: string;
  notes?: string;
}

export interface ReflectionPrompt {
  id: string;
  question: string;
  category: 'identity' | 'progress' | 'obstacles' | 'environment' | 'motivation';
}

export interface Reflection {
  id: string;
  userId: string;
  habitId?: string;
  promptId: string;
  response: string;
  date: Date;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source: 'atomic_habits' | 'alan_carr';
  category: 'motivation' | 'identity' | 'environment' | 'craving' | 'reward';
} 