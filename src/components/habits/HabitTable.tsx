import React, { useState } from 'react';
import { HabitWithProgress } from '@/types/habit';
import { CheckCircle2, AlertCircle, ArrowUpCircle, ArrowDownCircle, DollarSign, Minus, Plus, Calendar, Archive, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface HabitTableProps {
  habits: HabitWithProgress[];
  onUpdate: () => void;
}

export const HabitTable: React.FC<HabitTableProps> = ({ habits, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [habitToArchive, setHabitToArchive] = useState<string | null>(null);
  const [showExtendDays, setShowExtendDays] = useState(false);
  const [habitToExtend, setHabitToExtend] = useState<string | null>(null);
  const [additionalDays, setAdditionalDays] = useState(7); // Default to 7 days

  if (habits.length === 0) {
    return (
      <div className="text-center py-4 border border-gray-200 rounded-md">
        <p className="text-black/70 text-sm">No habits to display</p>
      </div>
    );
  }

  // Check if any habits have money tracking enabled
  const hasMoneyTracking = habits.some(habit => habit.money_tracking_enabled);
  
  // Check if any habits have fixed days tracking enabled
  const hasFixedDaysTracking = habits.some(habit => habit.fixed_days_enabled);

  const handleIncrement = async (habit: HabitWithProgress) => {
    try {
      await habitService.createHabitLog({
        habit_id: habit.id,
        count: 1
      });
      onUpdate();
      toast({
        title: "Habit updated",
        description: `Added 1 ${habit.unit} to ${habit.name}`,
      });
    } catch (error) {
      console.error('Error incrementing habit:', error);
      toast({
        title: "Error",
        description: "Failed to update habit. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDecrement = async (habit: HabitWithProgress) => {
    if (habit.total_today > 0 && habit.logs_today.length > 0) {
      try {
        // Delete the most recent log
        const mostRecentLog = habit.logs_today[0];
        await habitService.deleteHabitLog(mostRecentLog.id);
        onUpdate();
        toast({
          title: "Habit updated",
          description: `Removed 1 ${habit.unit} from ${habit.name}`,
        });
      } catch (error) {
        console.error('Error decrementing habit:', error);
        toast({
          title: "Error",
          description: "Failed to update habit. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Handle archiving a habit
  const openArchiveConfirm = (habitId: string) => {
    setHabitToArchive(habitId);
    setShowArchiveConfirm(true);
  };

  const handleArchiveHabit = async () => {
    if (!habitToArchive) return;
    
    try {
      setIsLoading(true);
      await habitService.archiveHabit(habitToArchive);
      toast({
        title: "Habit archived",
        description: "The habit has been archived successfully.",
      });
      onUpdate();
    } catch (error) {
      console.error('Error archiving habit:', error);
      toast({
        title: "Error",
        description: "Failed to archive habit. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowArchiveConfirm(false);
      setHabitToArchive(null);
    }
  };

  // Handle extending days for a fixed-days habit
  const openExtendDays = (habitId: string) => {
    setHabitToExtend(habitId);
    setShowExtendDays(true);
  };

  const handleExtendDays = async () => {
    if (!habitToExtend) return;
    
    try {
      setIsLoading(true);
      await habitService.extendFixedDaysHabit(habitToExtend, additionalDays);
      toast({
        title: "Days extended",
        description: `Added ${additionalDays} more days to the challenge.`,
      });
      onUpdate();
    } catch (error) {
      console.error('Error extending habit days:', error);
      toast({
        title: "Error",
        description: "Failed to extend days. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setShowExtendDays(false);
      setHabitToExtend(null);
    }
  };

  // Get progress color based on habit type and goal met status
  const getProgressColor = (habit: HabitWithProgress) => {
    if (habit.goal_met) {
      return habit.type === 'positive' ? 'text-green-600 border-green-600' : 'text-red-600/30 border-red-600/30';
    }
    return habit.type === 'positive' ? 'text-green-600/30 border-green-600/30' : 'text-red-600 border-red-600';
  };

  // Get badge style based on habit type
  const getBadgeStyle = (habit: HabitWithProgress) => {
    if (habit.type === 'positive') {
      return 'border-green-600/30 bg-green-50 text-green-700';
    }
    return 'border-red-600/30 bg-red-50 text-red-700';
  };

  // Get button style based on habit type
  const getButtonStyle = (habit: HabitWithProgress, isDecrement = false) => {
    if (isDecrement) {
      return "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200";
    }
    return habit.type === 'positive' 
      ? "bg-green-600 text-white hover:bg-green-700" 
      : "bg-red-600 text-white hover:bg-red-700";
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

  // Calculate days remaining for fixed days tracking
  const calculateDaysRemaining = (habit: HabitWithProgress): number => {
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
  };

  // Calculate column widths
  const columnWidths = {
    habit: "w-24 md:w-40",
    type: "w-16 md:w-20",
    status: "w-16 md:w-20",
    progress: "w-24 md:w-32",
    streak: "w-20 md:w-28",
    money: hasMoneyTracking ? "w-20 md:w-28" : "hidden",
    fixedDays: hasFixedDaysTracking ? "w-24 md:w-32" : "hidden",
    actions: "w-32 md:w-40"
  };

  // Radial progress component
  const RadialProgress = ({ value, className, size = 32 }: { value: number, className?: string, size?: number }) => {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className={className}>
          {/* Background circle */}
          <circle
            className="text-gray-200"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress circle */}
          <circle
            className={className}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{ transition: 'stroke-dashoffset 0.5s ease 0s' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {Math.round(value)}%
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="border border-gray-200 rounded-md">
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.habit)}>
                Habit
              </TableHead>
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.type)}>
                Type
              </TableHead>
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.status)}>
                Status
              </TableHead>
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.progress)}>
                Progress
              </TableHead>
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.streak)}>
                Streak
              </TableHead>
              {hasMoneyTracking && (
                <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.money)}>
                  Saved
                </TableHead>
              )}
              {hasFixedDaysTracking && (
                <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.fixedDays)}>
                  Days Challenge
                </TableHead>
              )}
              <TableHead className={cn("py-2 px-3 text-xs font-medium text-center text-gray-700", columnWidths.actions)}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habits.map((habit, index) => {
              const isCompleted = habit.goal_met;
              const isLast = index === habits.length - 1;
              const rowClass = isCompleted 
                ? habit.type === 'positive' ? "bg-green-50/20" : "bg-red-50/20"
                : "";
              const isFixedDaysCompleted = habit.fixed_days_enabled && 
                habit.fixed_days_target && 
                habit.fixed_days_progress && 
                habit.fixed_days_progress >= habit.fixed_days_target;
              
              return (
                <TableRow 
                  key={habit.id} 
                  className={cn(
                    rowClass,
                    "h-12 border-b border-gray-200 hover:bg-gray-50/80",
                    isLast && "border-b-0"
                  )}
                >
                  <TableCell className={cn("py-2 px-3 text-xs font-medium text-gray-700 align-middle", columnWidths.habit)}>
                    <div className="flex justify-center">
                      <span className="truncate">{habit.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.type)}>
                    <div className="flex justify-center">
                      <Badge 
                        variant="outline" 
                        className={cn(getBadgeStyle(habit), "h-5 text-xs py-0 px-1.5 font-normal inline-flex items-center")}
                      >
                        {habit.type === 'positive' ? (
                          <ArrowUpCircle className="h-2.5 w-2.5 mr-1" />
                        ) : (
                          <ArrowDownCircle className="h-2.5 w-2.5 mr-1" />
                        )}
                        {habit.type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.status)}>
                    <div className="flex justify-center">
                      {isCompleted ? (
                        <Badge variant="outline" className="h-5 text-xs py-0 px-1.5 font-normal bg-green-50 text-green-700 border-green-200">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                          Done
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="h-5 text-xs py-0 px-1.5 font-normal bg-amber-50 text-amber-700 border-amber-200">
                          <AlertCircle className="h-2.5 w-2.5 mr-1" />
                          Open
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.progress)}>
                    <div className="flex justify-center items-center space-x-2">
                      <span 
                        className={cn(
                          "text-xs",
                          isCompleted 
                            ? habit.type === 'positive' ? 'text-green-600' : 'text-red-500/50' 
                            : habit.type === 'positive' ? 'text-green-500/50' : 'text-red-600'
                        )}
                      >
                        {habit.total_today}/{habit.daily_goal}
                      </span>
                      <div className="w-10 bg-gray-200 rounded-full h-1">
                        <div 
                          className={cn(
                            "h-1 rounded-full",
                            habit.type === 'positive' 
                              ? isCompleted ? 'bg-green-600' : 'bg-green-500/50'
                              : isCompleted ? 'bg-red-500/50' : 'bg-red-600'
                          )}
                          style={{ width: `${Math.min(100, habit.progress_percentage)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.streak)}>
                    <div className="flex justify-center">
                      {habit.streak && habit.streak.current_streak > 0 ? (
                        <Badge variant="outline" className="h-5 text-xs py-0 px-1.5 font-normal">
                          🔥 {habit.streak.current_streak} day{habit.streak.current_streak > 1 ? 's' : ''}
                        </Badge>
                      ) : (
                        <span className="text-black/40">No streak</span>
                      )}
                    </div>
                  </TableCell>
                  {hasMoneyTracking && (
                    <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.money)}>
                      <div className="flex justify-center">
                        {habit.money_tracking_enabled ? (
                          <Badge variant="outline" className="h-5 text-xs py-0 px-1.5 font-normal bg-blue-50 text-blue-700 border-blue-200">
                            <DollarSign className="h-2.5 w-2.5 mr-1" />
                            {new Intl.NumberFormat('en-US', { 
                              style: 'currency', 
                              currency: habit.currency || 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(habit.total_money_saved || 0)}
                          </Badge>
                        ) : (
                          <span className="text-black/40">-</span>
                        )}
                      </div>
                    </TableCell>
                  )}
                  {hasFixedDaysTracking && (
                    <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.fixedDays)}>
                      <div className="flex justify-center">
                        {habit.fixed_days_enabled ? (
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="h-5 text-xs py-0 px-1.5 font-normal bg-purple-50 text-purple-700 border-purple-200">
                              <Calendar className="h-2.5 w-2.5 mr-1" />
                              {habit.fixed_days_progress || 0}/{habit.fixed_days_target} days
                            </Badge>
                            {isFixedDaysCompleted && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0"
                                onClick={() => openExtendDays(habit.id)}
                              >
                                <CalendarPlus className="h-2.5 w-2.5 text-purple-700" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          <span className="text-black/40">-</span>
                        )}
                      </div>
                    </TableCell>
                  )}
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.actions)}>
                    <div className="flex justify-center items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleDecrement(habit)}
                        disabled={habit.total_today === 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleIncrement(habit)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => openArchiveConfirm(habit.id)}
                      >
                        <Archive className="h-3 w-3" />
                      </Button>
                      {habit.fixed_days_enabled && isFixedDaysCompleted && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => openExtendDays(habit.id)}
                        >
                          <CalendarPlus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveConfirm} onOpenChange={setShowArchiveConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Archive Habit</DialogTitle>
            <DialogDescription>
              Are you sure you want to archive this habit? 
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
              Add more days to your challenge.
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
}; 