import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { HabitWithProgress, HabitType, HabitFilters } from '@/types/habit';
import habitService from '@/lib/habitService';
import { HabitCard } from '@/components/habits/HabitCard';
import { HabitTable } from '@/components/habits/HabitTable';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  Search, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  CalendarDays, 
  Flame, 
  Filter, 
  SlidersHorizontal,
  Sparkles,
  Clock,
  Trophy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { HabitDialog } from '@/components/habits/HabitDialog';
import { Layout } from '@/components/Layout';
import { MotivationalMessage } from '@/components/MotivationalMessage';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState<HabitWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddHabitForm, setShowAddHabitForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'positive' | 'negative'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'table'>(() => {
    // Default to card view on all screen sizes for better UX
    return 'card';
  });
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<'progress' | 'name' | 'streak'>('progress');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userPoints, setUserPoints] = useState<number>(0);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

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
      
      // Fetch user points
      const userPointsData = await habitService.getUserPoints();
      if (userPointsData) {
        setUserPoints(userPointsData.total_points);
      }
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

  // Filter habits based on search query, active tab, and completed status
  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || habit.type === activeTab;
    const matchesCompleted = showCompleted || !habit.goal_met;
    return matchesSearch && matchesTab && matchesCompleted;
  });

  // Sort habits based on sortBy option
  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'streak') {
      const aStreak = a.current_streak || 0;
      const bStreak = b.current_streak || 0;
      return bStreak - aStreak;
    } else {
    // First sort by goal met status (unmet goals first)
    if (a.goal_met !== b.goal_met) {
      return a.goal_met ? 1 : -1;
    }
      // Then sort by progress percentage (higher first)
      return b.progress_percentage - a.progress_percentage;
    }
  });

  // Calculate stats
  const totalHabits = habits.length;
  const positiveHabits = habits.filter(h => h.type === 'positive').length;
  const negativeHabits = habits.filter(h => h.type === 'negative').length;
  const completedToday = habits.filter(h => h.goal_met).length;
  const completionPercentage = totalHabits ? Math.round((completedToday / totalHabits) * 100) : 0;
  const longestStreak = habits.length 
    ? Math.max(...habits.map(h => h.current_streak || 0)) 
    : 0;
  const habitWithLongestStreak = habits.find(h => h.current_streak === longestStreak);

  // Format date with day of week
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format time in HH:MM:SS AM/PM
  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Generate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Section with User Greeting */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 shadow-md border border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-white">
                  {getGreeting()}, {user?.email?.split('@')[0] || 'there'}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-300">
                    {formatDate()}
                  </p>
                  <span className="text-gray-300">•</span>
                  <p className="text-gray-300 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime()}
                  </p>
                </div>
            </div>
              <div className="w-full md:w-auto">
                <Button 
                  onClick={() => setShowAddHabitForm(true)}
                  className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                  size="lg"
                >
                  <PlusCircle className="h-5 w-5 mr-2" /> Create New Habit
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Total Habits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{totalHabits}</div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <CalendarDays className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {positiveHabits} positive
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    {negativeHabits} negative
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Today's Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{completionPercentage}%</div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
                <div className="mt-2">
                  <Progress value={completionPercentage} className="h-2 bg-gray-100" />
                </div>
                <p className="text-sm mt-2 text-gray-600">
                  {completedToday} of {totalHabits} habits completed
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Longest Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{longestStreak} days</div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Flame className="h-5 w-5 text-gray-700" />
                  </div>
                </div>
                {habitWithLongestStreak && (
                  <p className="text-sm mt-2 text-gray-600 truncate">
                    {habitWithLongestStreak.name}
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Your Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{userPoints}</div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <Button 
                  variant="link" 
                  onClick={() => navigate('/leaderboard')}
                  className="text-sm mt-2 text-blue-600 p-0 h-auto"
                >
                  View Leaderboard
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200 shadow-sm lg:col-span-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Sparkles className="h-4 w-4 text-gray-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Daily Inspiration</span>
                </div>
                <MotivationalMessage />
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Search and Filter Controls */}
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search habits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
                <div className="flex flex-wrap gap-2 items-center">
              <Tabs 
                value={activeTab} 
                onValueChange={(value) => setActiveTab(value as 'all' | 'positive' | 'negative')}
                className="w-full sm:w-auto"
              >
                    <TabsList className="grid grid-cols-3 w-full sm:w-auto bg-gray-100">
                      <TabsTrigger value="all" className="data-[state=active]:bg-white">All</TabsTrigger>
                      <TabsTrigger value="positive" className="data-[state=active]:bg-white data-[state=active]:text-green-700">Positive</TabsTrigger>
                      <TabsTrigger value="negative" className="data-[state=active]:bg-white data-[state=active]:text-red-700">Negative</TabsTrigger>
                </TabsList>
              </Tabs>
              
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-200 gap-1">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span className="hidden sm:inline">Options</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Filters</h4>
                          <Separator />
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="show-completed" 
                              checked={showCompleted}
                              onCheckedChange={(checked) => setShowCompleted(checked as boolean)}
                            />
                            <Label htmlFor="show-completed">Show completed habits</Label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Sort by</h4>
                          <Separator />
                          <div className="grid grid-cols-3 gap-2">
                            <Button 
                              variant={sortBy === 'progress' ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSortBy('progress')}
                              className={sortBy === 'progress' ? "bg-blue-600" : "border-gray-200"}
                            >
                              Progress
                            </Button>
                            <Button 
                              variant={sortBy === 'name' ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSortBy('name')}
                              className={sortBy === 'name' ? "bg-blue-600" : "border-gray-200"}
                            >
                              Name
                            </Button>
                            <Button 
                              variant={sortBy === 'streak' ? "default" : "outline"} 
                              size="sm"
                              onClick={() => setSortBy('streak')}
                              className={sortBy === 'streak' ? "bg-blue-600" : "border-gray-200"}
                            >
                              Streak
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">View</h4>
                          <Separator />
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value) => {
                  if (value) setViewMode(value as 'card' | 'table');
                }}
                            className="justify-start"
              >
                            <ToggleGroupItem value="card" aria-label="Card View" className="border border-gray-200 data-[state=on]:bg-blue-600">
                              <LayoutGrid className="h-4 w-4 mr-2" />
                              Cards
                </ToggleGroupItem>
                            <ToggleGroupItem value="table" aria-label="Table View" className="border border-gray-200 data-[state=on]:bg-blue-600">
                              <List className="h-4 w-4 mr-2" />
                              Table
                </ToggleGroupItem>
              </ToggleGroup>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
            </div>
          </div>
            </CardContent>
          </Card>

          {/* Habits Display */}
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="border border-blue-100 rounded-md h-48 animate-pulse bg-blue-50/30"
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
              <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
                {searchQuery || activeTab !== 'all' || !showCompleted ? (
                  <div className="max-w-md mx-auto">
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <Filter className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No habits match your filters</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filter settings to find what you're looking for.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery('');
                        setActiveTab('all');
                        setShowCompleted(true);
                      }}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto">
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <PlusCircle className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">You haven't added any habits yet</h3>
                    <p className="text-gray-600 mb-4">
                      Start your habit tracking journey by creating your first habit.
                </p>
                <Button 
                  onClick={() => setShowAddHabitForm(true)}
                      className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Your First Habit
                </Button>
                  </div>
                )}
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