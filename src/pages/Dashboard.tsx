import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { HabitWithProgress, HabitType, HabitFilters } from '@/types/habit';
import { habitService } from '@/lib/habitService';
import { HabitCard } from '@/components/habits/HabitCard';
import { HabitTable } from '@/components/habits/HabitTable';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search, LayoutGrid, List } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { HabitDialog } from '@/components/habits/HabitDialog';
import { Layout } from '@/components/Layout';
import { MotivationalMessage } from '@/components/MotivationalMessage';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<HabitWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddHabitForm, setShowAddHabitForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>(() => {
    // Default to table on larger screens, card on smaller screens
    return window.innerWidth >= 1024 ? 'table' : 'card';
  });

  useEffect(() => {
    // Update view mode based on screen size
    const handleResize = () => {
      if (window.innerWidth < 1024 && viewMode === 'table') {
        setViewMode('card');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      const habitsWithProgress = await habitService.getHabitsWithProgress();
      setHabits(habitsWithProgress);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Filter habits based on search query and active tab
  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || habit.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Sort habits: first by goal met status, then by positive/negative type
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    // First sort by goal met status (unmet goals first)
    if (a.goal_met !== b.goal_met) {
      return a.goal_met ? 1 : -1;
    }
    // Then sort by type (positive first)
    if (a.type !== b.type) {
      return a.type === 'positive' ? -1 : 1;
    }
    // Finally sort by name
    return a.name.localeCompare(b.name);
  });

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section with Motivational Message */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-light">Today's Habits</h2>
              <p className="text-black/70 mt-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="md:max-w-xs w-full">
              <MotivationalMessage />
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black/50" />
              <Input
                placeholder="Search habits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-black/20 focus:border-black"
              />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => setActiveTab(value as 'all' | 'positive' | 'negative')}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="positive">Positive</TabsTrigger>
                  <TabsTrigger value="negative">Negative</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value) => {
                  if (value) setViewMode(value as 'card' | 'table');
                }}
                className="hidden sm:flex"
              >
                <ToggleGroupItem value="card" aria-label="Card View">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="Table View">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              
              <Button 
                onClick={() => setShowAddHabitForm(true)}
                className="bg-black text-white hover:bg-black/90"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Habit
              </Button>
            </div>
          </div>

          {/* Habits Display */}
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
            ) : sortedHabits.length > 0 ? (
              <>
                {/* Card View */}
                {viewMode === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedHabits.map(habit => (
                      <HabitCard 
                        key={habit.id} 
                        habit={habit} 
                        onUpdate={fetchHabits} 
                      />
                    ))}
                  </div>
                )}
                
                {/* Table View */}
                {viewMode === 'table' && (
                  <HabitTable 
                    habits={sortedHabits}
                    onUpdate={fetchHabits}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12 border border-black/10 rounded-md">
                <p className="text-black/70 mb-4">
                  {searchQuery || activeTab !== 'all' 
                    ? "No habits match your search or filter" 
                    : "You haven't added any habits yet"}
                </p>
                <Button 
                  onClick={() => setShowAddHabitForm(true)}
                  className="bg-black text-white hover:bg-black/90"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Your First Habit
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Habit Dialog */}
      <HabitDialog
        open={showAddHabitForm}
        onOpenChange={setShowAddHabitForm}
        onSuccess={() => {
          setShowAddHabitForm(false);
          fetchHabits();
        }}
      />
    </Layout>
  );
};

export default Dashboard; 