import React from 'react';
import { HabitWithProgress } from '@/types/habit';
import { CheckCircle2, AlertCircle, ArrowUpCircle, ArrowDownCircle, DollarSign, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface HabitTableProps {
  habits: HabitWithProgress[];
  onUpdate: () => void;
}

export const HabitTable: React.FC<HabitTableProps> = ({ habits, onUpdate }) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-4 border border-gray-200 rounded-md">
        <p className="text-black/70 text-sm">No habits to display</p>
      </div>
    );
  }

  // Check if any habits have money tracking enabled
  const hasMoneyTracking = habits.some(habit => habit.money_tracking_enabled);

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

  // Define column widths for a more structured table
  const columnWidths = {
    habit: "w-[20%]",
    type: "w-[13%]",
    goal: "w-[15%]",
    progress: "w-[20%]",
    streak: "w-[12%]",
    saved: "w-[10%]",
    actions: "w-[15%]"
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
    <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
      <Table className="w-full border-collapse table-fixed">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200">
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.habit)}>
              Habit
            </TableHead>
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.type)}>
              Type
            </TableHead>
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.goal)}>
              Goal
            </TableHead>
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.progress)}>
              Progress
            </TableHead>
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.streak)}>
              Streak
            </TableHead>
            {hasMoneyTracking && (
              <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.saved)}>
                Saved
              </TableHead>
            )}
            <TableHead className={cn("h-8 py-0 px-3 text-xs font-medium text-gray-500 text-center", columnWidths.actions)}>
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
                <TableCell className={cn("py-2 px-3 text-xs text-gray-700 align-middle", columnWidths.goal)}>
                  <div className="flex justify-center">
                    <span className="whitespace-nowrap">
                      {habit.goal_type === 'min' ? '≤' : '≥'} {habit.daily_goal} {habit.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.progress)}>
                  <div className="flex justify-center items-center gap-2">
                    <RadialProgress 
                      value={habit.progress_percentage} 
                      className={getProgressColor(habit)}
                      size={34}
                    />
                    <span className="text-xs text-gray-700 whitespace-nowrap">
                      {habit.total_today}/{habit.daily_goal}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={cn("py-2 px-3 text-xs text-gray-700 align-middle", columnWidths.streak)}>
                  <div className="flex justify-center">
                    <span>{habit.current_streak} day{habit.current_streak !== 1 ? 's' : ''}</span>
                  </div>
                </TableCell>
                {hasMoneyTracking && (
                  <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.saved)}>
                    <div className="flex justify-center">
                      {habit.money_tracking_enabled && habit.type === 'negative' ? (
                        <span className="whitespace-nowrap text-blue-600 font-medium">
                          {formatCurrency(habit.total_money_saved || 0, habit.currency)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </TableCell>
                )}
                <TableCell className={cn("py-2 px-3 text-xs align-middle", columnWidths.actions)}>
                  <div className="flex items-center justify-center gap-1">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDecrement(habit)}
                      disabled={habit.total_today <= 0 || habit.logs_today.length === 0}
                      className={cn("h-7 w-7 p-0 rounded", getButtonStyle(habit, true))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-5 text-center text-gray-700">{habit.total_today}</span>
                    <Button 
                      variant="default" 
                      size="icon"
                      onClick={() => handleIncrement(habit)}
                      className={cn(getButtonStyle(habit), "h-7 w-7 p-0 rounded")}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    {isCompleted ? (
                      <CheckCircle2 className={`h-4 w-4 ml-1 ${habit.type === 'positive' ? "text-green-600" : "text-gray-500"}`} />
                    ) : habit.type === 'negative' && habit.total_today > 0 ? (
                      <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}; 