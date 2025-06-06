import React, { useState } from 'react';
import { HabitWithProgress } from '@/types/habit';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Info, Edit, DollarSign } from 'lucide-react';
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
      toast({
        title: "Error",
        description: "Failed to log habit. Please try again.",
        variant: "destructive",
      });
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
            </div>
          </div>
          <CardTitle className="flex items-center gap-2 mt-2">
            <span className="text-xl">{habit.icon || '📝'}</span> {habit.name}
          </CardTitle>
          <CardDescription>
            {habit.goal_type === 'min' ? 'Min' : 'Max'} {habit.daily_goal} {habit.unit}{habit.daily_goal > 1 ? 's' : ''} daily
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
    </>
  );
}; 