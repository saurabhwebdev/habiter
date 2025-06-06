import React from 'react';
import { HabitWithProgress } from '@/types/habit';
import { CheckCircle2, AlertCircle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';

interface HabitTableProps {
  habits: HabitWithProgress[];
  onUpdate: () => void;
}

export const HabitTable: React.FC<HabitTableProps> = ({ habits, onUpdate }) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 border border-black/10 rounded-md">
        <p className="text-black/70">No habits to display</p>
      </div>
    );
  }

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
      return habit.type === 'positive' ? 'bg-green-600' : 'bg-red-600/30';
    }
    return habit.type === 'positive' ? 'bg-green-600/30' : 'bg-red-600';
  };

  // Get badge style based on habit type
  const getBadgeStyle = (habit: HabitWithProgress) => {
    if (habit.type === 'positive') {
      return 'border-green-600/30 bg-green-50 text-green-700';
    }
    return 'border-red-600/30 bg-red-50 text-red-700';
  };

  // Get button style based on habit type
  const getButtonStyle = (habit: HabitWithProgress) => {
    return habit.type === 'positive' 
      ? "bg-green-600 text-white hover:bg-green-700" 
      : "bg-red-600 text-white hover:bg-red-700";
  };

  return (
    <div className="border border-black/10 rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Habit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Streak</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {habits.map((habit) => {
            const isCompleted = habit.goal_met;
            const rowClass = isCompleted 
              ? habit.type === 'positive' ? "bg-green-50/20" : "bg-red-50/20"
              : "";
            
            return (
              <TableRow key={habit.id} className={rowClass}>
                <TableCell className="font-medium">{habit.name}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getBadgeStyle(habit)}
                  >
                    {habit.type === 'positive' ? (
                      <ArrowUpCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownCircle className="h-3 w-3 mr-1" />
                    )}
                    {habit.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {habit.goal_type === 'min' ? '≥' : '≤'} {habit.daily_goal} {habit.unit}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={habit.progress_percentage} 
                      className={`h-2 w-24 ${getProgressColor(habit)}`} 
                    />
                    <span className="text-sm">
                      {habit.total_today}/{habit.daily_goal} {habit.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {habit.current_streak} day{habit.current_streak !== 1 ? 's' : ''}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDecrement(habit)}
                      disabled={habit.total_today <= 0 || habit.logs_today.length === 0}
                      className="border-black/20"
                    >
                      -
                    </Button>
                    <span className="min-w-8 text-center">{habit.total_today}</span>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleIncrement(habit)}
                      className={getButtonStyle(habit)}
                    >
                      +
                    </Button>
                    {isCompleted ? (
                      <CheckCircle2 className={`h-5 w-5 ml-2 ${habit.type === 'positive' ? "text-green-600" : "text-gray-500"}`} />
                    ) : habit.type === 'negative' && habit.total_today > 0 ? (
                      <AlertCircle className="h-5 w-5 text-red-500 ml-2" />
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