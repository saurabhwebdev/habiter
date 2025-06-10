import React, { useState } from 'react';
import { HabitWithProgress } from '@/types/habit';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import habitService from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Info, Edit, DollarSign, Archive, Clock, CalendarPlus } from 'lucide-react';
import { HabitDialog } from './HabitDialog';

interface HabitCardProps {
  habit: HabitWithProgress;
  onUpdate: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onUpdate }) => {
  const [isLogging, setIsLogging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logCount, setLogCount] = useState(1);
  const [showCHR, setShowCHR] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [showExtendDays, setShowExtendDays] = useState(false);
  const [additionalDays, setAdditionalDays] = useState(7); // Default to 7 days

  const handleLogHabit = async (count: number = 1) => {
    try {
      setIsLoading(true);
      await habitService.createHabitLog({
        habit_id: habit.id,
        count
      });
      toast({
        title: "Habit logged",
        description: `Added ${count} ${habit.unit}${count > 1 ? 's' : ''} to ${habit.name}`,
      });
      onUpdate();
    } catch (error) {
      console.error('Error logging habit:', error);
      
      // Check if it's just a points-related error but the habit was logged
      if (error instanceof Error && error.message && error.message.includes('user_points')) {
        // The habit was probably logged but there was an issue with points
        toast({
          title: "Habit logged",
          description: `Added ${count} ${habit.unit}${count > 1 ? 's' : ''} to ${habit.name}, but there was an issue updating points.`,
        });
        // Still update the UI
        onUpdate();
      } else {
        toast({
          title: "Error",
          description: "Failed to log habit. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsLogging(false);
      setLogCount(1);
    }
  };

  // Calculate progress color
  const getProgressColor = () => {
    if (habit.goal_met) {
      return habit.type === 'positive' ? 'bg-green-600' : 'bg-red-600/30';
    }
    return habit.type === 'positive' ? 'bg-green-600/30' : 'bg-red-600';
  };

  // Get badge style based on habit type
  const getBadgeStyle = () => {
    if (habit.type === 'positive') {
      return 'border-green-600/30 bg-green-50 text-green-700';
    }
    return 'border-red-600/30 bg-red-50 text-red-700';
  };

  // Format currency based on currency code
  const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Handle archiving a habit
  const handleArchiveHabit = async () => {
    try {
      setIsLoading(true);
      await habitService.archiveHabit(habit.id);
      toast({
        title: "Habit archived",
        description: `${habit.name} has been archived successfully.`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowArchiveConfirm(false);
    }
  };

  // Handle extending days for a fixed-days habit
  const handleExtendDays = async () => {
    try {
      setIsLoading(true);
      await habitService.extendFixedDaysHabit(habit.id, additionalDays);
      toast({
        title: "Days extended",
        description: `Added ${additionalDays} more days to "${habit.name}".`,
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extend days. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowExtendDays(false);
    }
  };

  // Determine if the habit should be auto-archived
  const shouldAutoArchive = () => {
    if (habit.fixed_days_enabled && habit.fixed_days_target && habit.fixed_days_progress) {
      return habit.fixed_days_progress >= habit.fixed_days_target;
    }
    return false;
  };

  // Auto-archive if needed
  React.useEffect(() => {
    if (shouldAutoArchive()) {
      // We could automatically archive, but it's better to let the user decide
      // If we wanted to auto-archive, we would call handleArchiveHabit() here
    }
  }, [habit]);

  return (
    <>
      <Card className="border-black/10 hover:border-black/20 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge 
              variant="outline" 
              className={getBadgeStyle()}
            >
              {habit.type === 'positive' ? 'Positive' : 'Negative'}
            </Badge>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setShowCHR(true)}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setShowArchiveConfirm(true)}
              >
                <Archive className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="flex items-center gap-2 mt-2">
            <span className="text-xl">{habit.icon || '📝'}</span> {habit.name}
          </CardTitle>
          <CardDescription>
            {habit.goal_type === 'min' ? '≥' : '≤'} {habit.daily_goal} {habit.unit}{habit.daily_goal > 1 ? 's' : ''} daily
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-medium">{habit.total_today}/{habit.daily_goal}</p>
                <p className="text-xs text-black/50">Today's progress</p>
              </div>
              {habit.streak && habit.streak.current_streak > 0 && (
                <div className="text-right">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <span>🔥</span> {habit.streak.current_streak} day{habit.streak.current_streak > 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-black/50">Current streak</p>
                </div>
              )}
            </div>
            
            <Progress 
              value={habit.progress_percentage} 
              className={`h-2 ${getProgressColor()}`} 
            />

            {/* Tapering Display (if enabled) */}
            {habit.tapering_enabled && habit.type === 'negative' && (
              <div className="mt-3 pt-3 border-t border-black/10">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Tapering Plan</p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex justify-between text-xs text-black/70 mt-1">
                  <span>Start: {formatDate(habit.tapering_start_date)}</span>
                  <span>Goal: {formatDate(habit.tapering_end_date)}</span>
                </div>
                <div className="flex justify-between text-xs text-black/70 mt-1">
                  <span>Starting: {habit.tapering_start_value} {habit.unit}{habit.tapering_start_value !== 1 ? 's' : ''}</span>
                  <span>Target: {habit.tapering_target_value} {habit.unit}{habit.tapering_target_value !== 1 ? 's' : ''}</span>
                </div>
                <div className="w-full h-1 bg-black/10 rounded-full mt-2">
                  <div 
                    className="h-1 bg-blue-600 rounded-full" 
                    style={{ 
                      width: `${calculateTaperingProgress()}%` 
                    }}
                  />
                </div>
              </div>
            )}

            {/* Fixed Days Tracking Display (if enabled) */}
            {habit.fixed_days_enabled && (
              <div className="mt-3 pt-3 border-t border-black/10">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Fixed Days Challenge</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {calculateDaysRemaining() > 0 ? 'In Progress' : 'Completed!'}
                    </span>
                    {calculateDaysRemaining() <= 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => setShowExtendDays(true)}
                      >
                        <CalendarPlus className="h-3.5 w-3.5 text-purple-700" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-black/70 mt-1">
                  <span>Started: {formatDate(habit.fixed_days_start_date)}</span>
                  <span>Goal: {habit.fixed_days_target} days</span>
                </div>
                <div className="flex justify-between text-xs text-black/70 mt-1">
                  <span>Progress: {habit.fixed_days_progress || 0} days completed</span>
                  <span>{calculateDaysRemaining()} days remaining</span>
                </div>
                <div className="w-full h-1 bg-black/10 rounded-full mt-2">
                  <div 
                    className="h-1 bg-purple-600 rounded-full" 
                    style={{ 
                      width: `${calculateFixedDaysProgress()}%` 
                    }}
                  />
                </div>
              </div>
            )}

            {/* Money Saved Display (if enabled) */}
            {habit.money_tracking_enabled && habit.type === 'negative' && (
              <div className="mt-3 pt-3 border-t border-black/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-600">Money Saved:</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      {formatCurrency(habit.money_saved_today || 0, habit.currency)}
                    </p>
                    <p className="text-xs text-black/50">Today</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-black/50">Total saved:</p>
                  <p className="text-xs font-medium">
                    {formatCurrency(habit.total_money_saved || 0, habit.currency)}
                  </p>
                </div>
              </div>
            )}
            
            {/* Points Earned Display */}
            <div className="mt-3 pt-3 border-t border-black/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">🏆</span>
                  <p className="text-sm font-medium text-yellow-600">Points Earned:</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-yellow-600">
                    {habit.points_earned_today || 0} points
                  </p>
                  <p className="text-xs text-black/50">Today</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-black/50">Per completion:</p>
                <p className="text-xs font-medium">
                  {habit.points_per_completion || 10} points
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-black/20 hover:bg-black hover:text-white"
            onClick={() => setIsLogging(true)}
          >
            <Pencil className="h-3 w-3 mr-1" /> Log
          </Button>
          <Button 
            onClick={() => handleLogHabit(1)} 
            disabled={isLoading}
            className={habit.type === 'positive' ? 
              "bg-green-600 text-white hover:bg-green-700" : 
              "bg-red-600 text-white hover:bg-red-700"}
          >
            + Add {habit.unit}
          </Button>
        </CardFooter>
      </Card>

      {/* Custom Log Dialog */}
      <Dialog open={isLogging} onOpenChange={setIsLogging}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Log {habit.name}</DialogTitle>
            <DialogDescription>
              Enter the number of {habit.unit}s to log for today.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="count" className="text-right">
                Count
              </Label>
              <Input
                id="count"
                type="number"
                min={1}
                value={logCount}
                onChange={(e) => setLogCount(parseInt(e.target.value) || 1)}
                className="col-span-3 border-black/20 focus:border-black"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsLogging(false)}
              className="border-black/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => handleLogHabit(logCount)} 
              disabled={isLoading}
              className={habit.type === 'positive' ? 
                "bg-green-600 text-white hover:bg-green-700" : 
                "bg-red-600 text-white hover:bg-red-700"}
            >
              {isLoading ? 'Logging...' : 'Log Habit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Habit Dialog */}
      <HabitDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        habit={habit}
        onSuccess={() => {
          setIsEditing(false);
          onUpdate();
        }}
      />

      {/* CHR Info Dialog */}
      <Dialog open={showCHR} onOpenChange={setShowCHR}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
            <DialogTitle>Cue-Habit-Reward</DialogTitle>
            <DialogDescription>
              Understanding the pattern behind your habit.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Cue</h4>
              <p className="p-3 border border-black/10 rounded-md">
                {habit.cue || 'No cue specified'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Habit</h4>
              <p className="p-3 border border-black/10 rounded-md">
                {habit.habit || habit.name}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Reward</h4>
              <p className="p-3 border border-black/10 rounded-md">
                {habit.reward || 'No reward specified'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setShowCHR(false)}
              className="bg-black text-white hover:bg-black/90"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveConfirm} onOpenChange={setShowArchiveConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Archive Habit</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive "{habit.name}"? 
              Archived habits will be moved to the archive section and will no longer appear on your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setShowArchiveConfirm(false)}
              className="border-black/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleArchiveHabit} 
              disabled={isLoading}
              className="bg-black text-white hover:bg-black/90"
            >
              {isLoading ? 'Archiving...' : 'Archive Habit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Extend Days Dialog */}
      <Dialog open={showExtendDays} onOpenChange={setShowExtendDays}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Extend Challenge Days</DialogTitle>
            <DialogDescription>
              Add more days to your "{habit.name}" challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalDays" className="text-right">
                Days to add
              </Label>
              <Input
                id="additionalDays"
                type="number"
                min={1}
                value={additionalDays}
                onChange={(e) => setAdditionalDays(parseInt(e.target.value) || 1)}
                className="col-span-3 border-black/20 focus:border-black"
              />
            </div>
            <div className="col-span-4 text-sm text-black/70">
              <p>Current: {habit.fixed_days_target} days</p>
              <p>New total: {(habit.fixed_days_target || 0) + additionalDays} days</p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setShowExtendDays(false)}
              className="border-black/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleExtendDays} 
              disabled={isLoading}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {isLoading ? 'Extending...' : 'Extend Challenge'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  // Helper function to calculate tapering progress
  function calculateTaperingProgress(): number {
    if (!habit.tapering_enabled || !habit.tapering_start_date || !habit.tapering_end_date) {
      return 0;
    }
    
    const startDate = new Date(habit.tapering_start_date);
    const endDate = new Date(habit.tapering_end_date);
    const today = new Date();
    
    // If before start date
    if (today < startDate) return 0;
    
    // If after end date
    if (today > endDate) return 100;
    
    // Calculate percentage of time passed
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return Math.round((daysPassed / totalDays) * 100);
  }

  // Helper function to calculate days remaining
  function calculateDaysRemaining(): number {
    if (!habit.fixed_days_enabled || !habit.fixed_days_start_date || !habit.fixed_days_target) {
      return 0;
    }
    
    const startDate = new Date(habit.fixed_days_start_date);
    const today = new Date();
    
    // Calculate days passed
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate days remaining
    const daysRemaining = habit.fixed_days_target - daysPassed;
    
    return Math.max(daysRemaining, 0);
  }

  // Helper function to calculate fixed days progress
  function calculateFixedDaysProgress(): number {
    if (!habit.fixed_days_enabled || !habit.fixed_days_start_date || !habit.fixed_days_target) {
      return 0;
    }
    
    const startDate = new Date(habit.fixed_days_start_date);
    const today = new Date();
    
    // Calculate days passed
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate progress percentage
    const progressPercentage = (daysPassed / habit.fixed_days_target) * 100;
    
    return Math.min(Math.round(progressPercentage), 100);
  }
}; 