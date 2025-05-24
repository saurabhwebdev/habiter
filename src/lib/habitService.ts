import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs,
  Timestamp,
  serverTimestamp,
  orderBy,
  limit,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';
import { Habit, HabitFormData, CravingLog, CravingLogFormData, Reflection, ReflectionPrompt, Quote } from './types';

const HABITS_COLLECTION = 'habits';
const CRAVING_LOGS_COLLECTION = 'craving_logs';
const REFLECTIONS_COLLECTION = 'reflections';
const REFLECTION_PROMPTS_COLLECTION = 'reflection_prompts';
const QUOTES_COLLECTION = 'quotes';

// Habit CRUD operations
export const createHabit = async (userId: string, habitData: HabitFormData): Promise<string> => {
  try {
    const newHabit = {
      userId,
      ...habitData,
      createdAt: serverTimestamp(),
      streak: 0,
      completedDates: [],
      active: true
    };
    
    const docRef = await addDoc(collection(db, HABITS_COLLECTION), newHabit);
    return docRef.id;
  } catch (error) {
    console.error('Error creating habit:', error);
    throw error;
  }
};

export const getUserHabits = async (userId: string): Promise<Habit[]> => {
  try {
    const habitsQuery = query(
      collection(db, HABITS_COLLECTION),
      where('userId', '==', userId),
      where('active', '==', true)
    );
    
    const querySnapshot = await getDocs(habitsQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        name: data.name,
        description: data.description,
        type: data.type,
        frequency: data.frequency,
        createdAt: data.createdAt?.toDate() || new Date(),
        streak: data.streak,
        completedDates: data.completedDates || [],
        active: data.active,
        identity: data.identity,
        cue: data.cue,
        craving: data.craving,
        response: data.response,
        reward: data.reward,
        stackedHabit: data.stackedHabit,
        substitutionFor: data.substitutionFor,
        cost: data.cost,
        environmentDesign: data.environmentDesign
      } as Habit;
    });
  } catch (error) {
    console.error('Error fetching habits:', error);
    throw error;
  }
};

export const updateHabit = async (habitId: string, updates: Partial<Habit>): Promise<void> => {
  try {
    const habitRef = doc(db, HABITS_COLLECTION, habitId);
    await updateDoc(habitRef, updates);
  } catch (error) {
    console.error('Error updating habit:', error);
    throw error;
  }
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  try {
    // Soft delete by setting active to false
    const habitRef = doc(db, HABITS_COLLECTION, habitId);
    await updateDoc(habitRef, { active: false });
  } catch (error) {
    console.error('Error deleting habit:', error);
    throw error;
  }
};

export const toggleHabitCompletion = async (habit: Habit, date: string): Promise<void> => {
  try {
    const habitRef = doc(db, HABITS_COLLECTION, habit.id);
    const completedDates = [...habit.completedDates];
    let streak = habit.streak;
    
    const dateIndex = completedDates.indexOf(date);
    
    if (dateIndex === -1) {
      // Mark as completed
      completedDates.push(date);
      
      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (completedDates.includes(yesterdayStr) || streak === 0) {
        streak += 1;
      }
    } else {
      // Mark as not completed
      completedDates.splice(dateIndex, 1);
      
      // Potentially decrease streak if it was today's completion
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        streak = Math.max(0, streak - 1);
      }
    }
    
    await updateDoc(habitRef, {
      completedDates,
      streak
    });
  } catch (error) {
    console.error('Error toggling habit completion:', error);
    throw error;
  }
};

// Craving log operations
export const addCravingLog = async (userId: string, logData: CravingLogFormData): Promise<string> => {
  try {
    const newLog = {
      userId,
      ...logData,
      timestamp: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, CRAVING_LOGS_COLLECTION), newLog);
    return docRef.id;
  } catch (error) {
    console.error('Error adding craving log:', error);
    throw error;
  }
};

export const getCravingLogs = async (userId: string, habitId?: string): Promise<CravingLog[]> => {
  try {
    let cravingQuery;
    
    if (habitId) {
      cravingQuery = query(
        collection(db, CRAVING_LOGS_COLLECTION),
        where('userId', '==', userId),
        where('habitId', '==', habitId),
        orderBy('timestamp', 'desc')
      );
    } else {
      cravingQuery = query(
        collection(db, CRAVING_LOGS_COLLECTION),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
    }
    
    const querySnapshot = await getDocs(cravingQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        habitId: data.habitId,
        trigger: data.trigger,
        intensity: data.intensity,
        emotion: data.emotion,
        location: data.location,
        action: data.action,
        notes: data.notes,
        timestamp: data.timestamp?.toDate() || new Date()
      } as CravingLog;
    });
  } catch (error) {
    console.error('Error fetching craving logs:', error);
    throw error;
  }
};

// Reflection operations
export const addReflection = async (userId: string, promptId: string, response: string, habitId?: string): Promise<string> => {
  try {
    const newReflection = {
      userId,
      promptId,
      response,
      habitId,
      date: serverTimestamp(),
    };
    
    const docRef = await addDoc(collection(db, REFLECTIONS_COLLECTION), newReflection);
    return docRef.id;
  } catch (error) {
    console.error('Error adding reflection:', error);
    throw error;
  }
};

export const getReflectionPrompts = async (category?: string): Promise<ReflectionPrompt[]> => {
  try {
    let promptsQuery;
    
    if (category) {
      promptsQuery = query(
        collection(db, REFLECTION_PROMPTS_COLLECTION),
        where('category', '==', category)
      );
    } else {
      promptsQuery = query(collection(db, REFLECTION_PROMPTS_COLLECTION));
    }
    
    const querySnapshot = await getDocs(promptsQuery);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.question,
        category: data.category
      } as ReflectionPrompt;
    });
  } catch (error) {
    console.error('Error fetching reflection prompts:', error);
    throw error;
  }
};

export const getRandomReflectionPrompt = async (category?: string): Promise<ReflectionPrompt | null> => {
  try {
    const prompts = await getReflectionPrompts(category);
    if (prompts.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  } catch (error) {
    console.error('Error getting random reflection prompt:', error);
    throw error;
  }
};

export const getRandomQuote = async (category?: string): Promise<Quote | null> => {
  try {
    let quotesQuery;
    
    if (category) {
      quotesQuery = query(
        collection(db, QUOTES_COLLECTION),
        where('category', '==', category),
        limit(20)
      );
    } else {
      quotesQuery = query(
        collection(db, QUOTES_COLLECTION),
        limit(20)
      );
    }
    
    const querySnapshot = await getDocs(quotesQuery);
    const quotes = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        author: data.author,
        source: data.source,
        category: data.category
      } as Quote;
    });
    
    if (quotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  } catch (error) {
    console.error('Error getting random quote:', error);
    throw error;
  }
}; 