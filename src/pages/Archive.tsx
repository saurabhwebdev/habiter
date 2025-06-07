import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { HabitWithProgress } from '@/types/habit';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, List } from 'lucide-react';
import { HabitCard } from '@/components/habits/HabitCard';
import { HabitTable } from '@/components/habits/HabitTable';
import { format } from 'date-fns';

const Archive = () => {
  const [archivedHabits, setArchivedHabits] = useState<HabitWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>(() => {
    // Default to table on larger screens, card on smaller screens
    return window.innerWidth >= 1024 ? 'table' : 'card';
  });

  const fetchArchivedHabits = async () => {
    try {
      setIsLoading(true);
      const habits = await habitService.getArchivedHabits();
      
      // Convert regular habits to HabitWithProgress type with placeholder values
      const habitsWithProgress = habits.map(habit => ({
        ...habit,
        logs_today: [],
        total_today: 0,
        progress_percentage: 0,
        goal_met: false
      }));
      
      setArchivedHabits(habitsWithProgress);
    } catch (error) {
      console.error('Error fetching archived habits:', error);
      toast({
        title: "Error",
        description: "Failed to load archived habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArchivedHabits();
  }, []);

  // Handle restoring a habit from the archive
  const handleUnarchiveHabit = async (id: string) => {
    try {
      await habitService.unarchiveHabit(id);
      toast({
        title: "Habit restored",
        description: "The habit has been successfully restored to your active habits.",
      });
      fetchArchivedHabits();
    } catch (error) {
      console.error('Error unarchiving habit:', error);
      toast({
        title: "Error",
        description: "Failed to restore habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Filter habits based on search query
  const filteredHabits = archivedHabits.filter(habit => 
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'PPP');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-light">Archived Habits</h2>
              <p className="text-black/70 mt-2">
                View and manage your completed or archived habits
              </p>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/50" />
              <Input
                type="text"
                placeholder="Search habits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-black/20 focus:border-black"
              />
            </div>
            <div className="flex items-center">
              <div className="bg-black/5 rounded-md p-1 flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('card')}
                  className={`p-1 h-8 ${viewMode === 'card' ? 'bg-white shadow-sm' : ''}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className={`p-1 h-8 ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Archived Habits Display */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-black/10 rounded-md h-48 animate-pulse bg-black/5"
                  />
                ))}
              </div>
            ) : filteredHabits.length > 0 ? (
              <>
                {/* Card View */}
                {viewMode === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHabits.map(habit => (
                      <Card key={habit.id} className="border-black/10">
                        <CardHeader className="pb-2">
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-xl">{habit.icon || '📝'}</span> {habit.name}
                          </CardTitle>
                          <div className="text-sm text-black/70">
                            Archived on: {formatDate(habit.archived_at)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mt-4">
                            <div>
                              <p className="text-sm text-black/70">
                                {habit.type === 'positive' ? 'Positive' : 'Negative'} habit
                              </p>
                              <p className="text-sm text-black/70">
                                Goal: {habit.goal_type === 'min' ? '≥' : '≤'} {habit.daily_goal} {habit.unit}{habit.daily_goal > 1 ? 's' : ''} daily
                              </p>
                            </div>
                            <Button 
                              onClick={() => handleUnarchiveHabit(habit.id)} 
                              variant="outline"
                              className="border-black/20 hover:bg-black hover:text-white"
                            >
                              Restore
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Table View - Simplified for archived habits */}
                {viewMode === 'table' && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto border border-black/10 rounded-md">
                      <thead className="bg-black/5">
                        <tr>
                          <th className="py-2 px-4 text-left text-sm font-medium text-black/70">Habit</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-black/70">Type</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-black/70">Goal</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-black/70">Archived On</th>
                          <th className="py-2 px-4 text-left text-sm font-medium text-black/70">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHabits.map(habit => (
                          <tr key={habit.id} className="border-t border-black/10">
                            <td className="py-3 px-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span>{habit.icon || '📝'}</span>
                                <span>{habit.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {habit.type === 'positive' ? 'Positive' : 'Negative'}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {habit.goal_type === 'min' ? '≥' : '≤'} {habit.daily_goal} {habit.unit}{habit.daily_goal > 1 ? 's' : ''}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formatDate(habit.archived_at)}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <Button 
                                onClick={() => handleUnarchiveHabit(habit.id)} 
                                variant="outline" 
                                size="sm"
                                className="border-black/20 hover:bg-black hover:text-white"
                              >
                                Restore
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 border border-black/10 rounded-lg">
                <p className="text-lg font-medium mb-2">No archived habits found</p>
                <p className="text-black/70">
                  Habits will appear here when you complete or archive them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Archive; 