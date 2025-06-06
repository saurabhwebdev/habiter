import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { habitService } from '@/lib/habitService';
import { HabitWithProgress, HabitLog } from '@/types/habit';
import { toast } from '@/components/ui/use-toast';
import { Layout } from '@/components/Layout';
import { format, subDays, subMonths, startOfWeek, endOfWeek, eachDayOfInterval, addDays, parseISO, isWithinInterval } from 'date-fns';

// Enhanced bar chart component with better visibility for small values
const BarChart = ({ data }: { data: { label: string; value: number; color: string }[] }) => {
  const maxValue = Math.max(...data.map(item => item.value), 1);
  
  return (
    <div className="flex flex-col h-64 mt-4">
      <div className="flex-1 flex items-end space-x-2">
        {data.map((item, index) => {
          // Calculate height percentage, ensure minimum height for visibility
          const heightPercentage = item.value > 0 
            ? Math.max(10, (item.value / maxValue) * 100) 
            : 0;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {item.value > 0 ? (
                <div 
                  className="w-full rounded-t-sm relative" 
                  style={{ 
                    height: `${heightPercentage}%`,
                    backgroundColor: item.color,
                    minHeight: '8px'
                  }}
                >
                  {/* Display value on top of the bar */}
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                    {item.value}
                  </span>
                </div>
              ) : (
                <div className="w-full h-1 bg-gray-100 rounded-t-sm" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-center flex-1 truncate px-1">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const Statistics = () => {
  const [habits, setHabits] = useState<HabitWithProgress[]>([]);
  const [habitLogs, setHabitLogs] = useState<HabitLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Get habits with progress
        const habitsWithProgress = await habitService.getHabitsWithProgress();
        setHabits(habitsWithProgress);
        
        // Get date range based on selected time range
        let startDate: Date;
        const today = new Date();
        
        switch (timeRange) {
          case 'week':
            startDate = subDays(today, 7);
            break;
          case 'month':
            startDate = subMonths(today, 1);
            break;
          case 'year':
            startDate = subMonths(today, 12);
            break;
          default:
            startDate = subDays(today, 7);
        }
        
        // Fetch logs for all habits within the date range
        const allLogs: HabitLog[] = [];
        for (const habit of habitsWithProgress) {
          const dateRange = {
            start: format(startDate, 'yyyy-MM-dd'),
            end: format(today, 'yyyy-MM-dd')
          };
          
          const logs = await habitService.getHabitLogs(habit.id, dateRange);
          allLogs.push(...logs);
        }
        
        setHabitLogs(allLogs);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load habit statistics",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);

  // Calculate completion rate for all habits
  const completionRate = habits.length > 0
    ? Math.round((habits.filter(h => h.goal_met).length / habits.length) * 100)
    : 0;
  
  // Calculate streak data with proper colors and ensure minimum bar height
  const streakData = habits.map(habit => ({
    label: habit.name.length > 10 ? habit.name.substring(0, 10) + '...' : habit.name,
    value: habit.current_streak || 0,
    color: habit.type === 'positive' ? '#22c55e' : '#ef4444'  // Green for positive, red for negative
  }));

  // Generate data based on time range using actual logs
  const getTimeRangeData = () => {
    const today = new Date();
    
    switch (timeRange) {
      case 'week': {
        // Last 7 days
        const days = Array.from({ length: 7 }, (_, i) => {
          const date = subDays(today, 6 - i);
          const dayStr = format(date, 'EEE');
          const dateStr = format(date, 'yyyy-MM-dd');
          
          // Count logs for this day
          const dayLogs = habitLogs.filter(log => log.date === dateStr);
          const completedHabits = new Set();
          
          dayLogs.forEach(log => {
            const habit = habits.find(h => h.id === log.habit_id);
            if (habit) {
              const totalForHabit = dayLogs
                .filter(l => l.habit_id === habit.id)
                .reduce((sum, l) => sum + l.count, 0);
                
              if ((habit.goal_type === 'min' && totalForHabit >= habit.daily_goal) || 
                  (habit.goal_type === 'max' && totalForHabit <= habit.daily_goal)) {
                completedHabits.add(habit.id);
              }
            }
          });
          
          return {
            label: dayStr,
            value: completedHabits.size,
            color: '#000000'
          };
        });
        
        return days;
      }
      
      case 'month': {
        // Last 4 weeks
        return Array.from({ length: 4 }, (_, i) => {
          const endDate = subDays(today, i * 7);
          const startDate = subDays(endDate, 6);
          
          const weekStr = `${format(startDate, 'MMM d')}-${format(endDate, 'MMM d')}`;
          const startDateStr = format(startDate, 'yyyy-MM-dd');
          const endDateStr = format(endDate, 'yyyy-MM-dd');
          
          // Count logs for this week
          const weekLogs = habitLogs.filter(log => {
            const logDate = log.date;
            return logDate >= startDateStr && logDate <= endDateStr;
          });
          
          const completedHabits = new Set();
          
          habits.forEach(habit => {
            // For each day in the week, check if the habit was completed
            const daysCompleted = new Set();
            
            for (let d = 0; d < 7; d++) {
              const date = format(addDays(startDate, d), 'yyyy-MM-dd');
              const dayLogs = weekLogs.filter(l => l.habit_id === habit.id && l.date === date);
              
              if (dayLogs.length > 0) {
                const totalForDay = dayLogs.reduce((sum, l) => sum + l.count, 0);
                
                if ((habit.goal_type === 'min' && totalForDay >= habit.daily_goal) || 
                    (habit.goal_type === 'max' && totalForDay <= habit.daily_goal)) {
                  daysCompleted.add(date);
                }
              }
            }
            
            // If habit was completed at least once in the week, count it
            if (daysCompleted.size > 0) {
              completedHabits.add(habit.id);
            }
          });
          
          return {
            label: `W${4-i}`,
            value: completedHabits.size,
            color: '#000000'
          };
        }).reverse();
      }
      
      case 'year': {
        // Last 12 months
        return Array.from({ length: 12 }, (_, i) => {
          const date = subMonths(today, 11 - i);
          const monthStr = format(date, 'MMM');
          const monthStart = format(new Date(date.getFullYear(), date.getMonth(), 1), 'yyyy-MM-dd');
          const monthEnd = format(new Date(date.getFullYear(), date.getMonth() + 1, 0), 'yyyy-MM-dd');
          
          // Count logs for this month
          const monthLogs = habitLogs.filter(log => {
            const logDate = log.date;
            return logDate >= monthStart && logDate <= monthEnd;
          });
          
          const completedHabits = new Set();
          
          habits.forEach(habit => {
            // If habit has any logs in this month, count it as active
            const habitLogs = monthLogs.filter(l => l.habit_id === habit.id);
            if (habitLogs.length > 0) {
              completedHabits.add(habit.id);
            }
          });
          
          return {
            label: monthStr,
            value: completedHabits.size,
            color: '#000000'
          };
        });
      }
      
      default:
        return [];
    }
  };

  // Add sample data if no real data is available for testing
  const ensureDataForDisplay = (data: { label: string; value: number; color: string }[]) => {
    if (data.length === 0 || data.every(item => item.value === 0)) {
      // Return sample data for demonstration
      return timeRange === 'week' 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
            label: day,
            value: Math.floor(Math.random() * 3) + 1,
            color: '#000000'
          }))
        : data;
    }
    return data;
  };

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black/70">Total Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{habits.length}</div>
                <p className="text-xs text-black/70 mt-1">
                  <span className="text-green-600">{habits.filter(h => h.type === 'positive').length} positive</span>, 
                  <span className="text-red-600"> {habits.filter(h => h.type === 'negative').length} negative</span>
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black/70">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{completionRate}%</div>
                <p className="text-xs text-black/70 mt-1">
                  {habits.filter(h => h.goal_met).length} of {habits.length} habits on track
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-black/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-black/70">Longest Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {habits.length > 0 ? Math.max(...habits.map(h => h.current_streak || 0)) : 0}
                </div>
                <p className="text-xs text-black/70 mt-1">
                  {habits.length > 0 && Math.max(...habits.map(h => h.current_streak || 0)) > 0
                    ? habits.reduce((max, h) => 
                        (h.current_streak || 0) > (max.current_streak || 0) ? h : max, habits[0]).name
                    : 'No active streaks'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Streak Chart */}
          <div>
            <h2 className="text-xl font-medium mb-4">Current Streaks</h2>
            {isLoading ? (
              <div className="h-64 animate-pulse bg-black/5 rounded-md"></div>
            ) : streakData.length > 0 ? (
              <BarChart data={streakData} />
            ) : (
              <div className="text-center py-12 border border-black/10 rounded-md">
                <p className="text-black/70">No habit data available</p>
              </div>
            )}
          </div>
          
          {/* Time-based Activity */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Activity Over Time</h2>
              <Tabs 
                value={timeRange} 
                onValueChange={(value) => setTimeRange(value as 'week' | 'month' | 'year')}
              >
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            {isLoading ? (
              <div className="h-64 animate-pulse bg-black/5 rounded-md"></div>
            ) : (
              <BarChart data={getTimeRangeData()} />
            )}
            <p className="text-xs text-center text-black/50 mt-2">
              Showing number of habits completed per time period
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics; 