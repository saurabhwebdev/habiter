import { useState } from "react";
import { Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Flame, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ArrowUpCircle, 
  XCircle,
  Brain,
  Zap,
  DollarSign,
  Clock,
  Heart,
  Lightbulb,
  Link,
  Repeat,
  AlertCircle,
  ChevronRight
} from "lucide-react";
import HabitForm from "./HabitForm";
import CravingLogForm from "./CravingLogForm";
import { useHabits } from "@/hooks/useHabits";
import { useCravingLogs } from "@/hooks/useCravingLogs";

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (habit: Habit, date: string) => void;
  onEdit: (habitId: string, updates: Partial<Habit>) => void;
  onDelete: (habitId: string) => void;
}

const HabitCard = ({ 
  habit, 
  onToggleCompletion, 
  onEdit, 
  onDelete 
}: HabitCardProps) => {
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showCravingSheet, setShowCravingSheet] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const { habits } = useHabits();
  const { addLog } = useCravingLogs(habit.id);
  
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  const handleToggleCompletion = () => {
    onToggleCompletion(habit, today);
  };

  const handleEdit = (formData: any) => {
    onEdit(habit.id, formData);
    setShowEditSheet(false);
  };

  const handleDelete = () => {
    onDelete(habit.id);
  };

  const handleAddCravingLog = (data: any) => {
    addLog(data);
    setShowCravingSheet(false);
  };

  // Find stacked habit or substitution habit if any
  const stackedHabit = habit.stackedHabit 
    ? habits.find(h => h.id === habit.stackedHabit) 
    : null;
  
  const substitutionHabit = habit.substitutionFor 
    ? habits.find(h => h.id === habit.substitutionFor) 
    : null;

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border-l-4 ${
        habit.type === 'build' ? 'border-l-green-500' : 'border-l-red-500'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            {habit.type === 'build' ? (
              <Checkbox 
                checked={isCompletedToday} 
                onCheckedChange={handleToggleCompletion}
                className="mt-1"
              />
            ) : (
              <div 
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isCompletedToday ? 'bg-red-500' : 'border border-gray-300'
                }`}
                onClick={handleToggleCompletion}
              >
                {isCompletedToday && <XCircle className="h-4 w-4 text-white" />}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="font-medium text-base">{habit.name}</h3>
                <Badge 
                  variant={habit.type === 'build' ? "default" : "destructive"}
                  className="ml-2 text-[10px] px-1 py-0"
                >
                  {habit.type === 'build' ? 'Build' : 'Break'}
                </Badge>
              </div>
              
              {habit.identity && (
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <Brain className="h-3 w-3 text-violet-500 mr-1" />
                  <span className="italic">"{habit.identity}"</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <Flame className="h-4 w-4 text-orange-500 mr-1" />
              <span className="text-sm font-medium">{habit.streak}</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
                  <SheetTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                    <SheetHeader>
                      <SheetTitle>Edit Habit</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <HabitForm
                        onSubmit={handleEdit}
                        initialData={habit}
                        isEditing={true}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                <DropdownMenuItem onClick={() => setShowDetailsSheet(true)}>
                  <ChevronRight className="mr-2 h-4 w-4" /> Details
                </DropdownMenuItem>
                
                {habit.type === 'break' && (
                  <Sheet open={showCravingSheet} onOpenChange={setShowCravingSheet}>
                    <SheetTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <AlertCircle className="mr-2 h-4 w-4" /> Log Craving
                      </DropdownMenuItem>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                      <SheetHeader>
                        <SheetTitle>Log a Craving</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <CravingLogForm
                          onSubmit={handleAddCravingLog}
                          habitId={habit.id}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                
                <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
          <SheetHeader>
            <SheetTitle>{habit.name} Details</SheetTitle>
          </SheetHeader>
          <div className="py-4 space-y-6">
            {/* Habit Loop */}
            {(habit.cue || habit.craving || habit.response || habit.reward) && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-amber-500" />
                  Habit Loop
                </h4>
                <div className="grid grid-cols-1 gap-3 bg-muted/50 rounded-lg p-3">
                  {habit.cue && (
                    <div className="bg-background rounded-md p-3">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Cue</span>
                      <p className="text-sm">{habit.cue}</p>
                    </div>
                  )}
                  {habit.craving && (
                    <div className="bg-background rounded-md p-3">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Craving</span>
                      <p className="text-sm">{habit.craving}</p>
                    </div>
                  )}
                  {habit.response && (
                    <div className="bg-background rounded-md p-3">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Response</span>
                      <p className="text-sm">{habit.response}</p>
                    </div>
                  )}
                  {habit.reward && (
                    <div className="bg-background rounded-md p-3">
                      <span className="text-xs font-medium text-muted-foreground block mb-1">Reward</span>
                      <p className="text-sm">{habit.reward}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Habit Stacking */}
            {stackedHabit && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Repeat className="h-4 w-4 mr-2 text-blue-500" />
                  Stacked with
                </h4>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm font-medium">{stackedHabit.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      After completing this habit, do {habit.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Substitution */}
            {substitutionHabit && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Link className="h-4 w-4 mr-2 text-indigo-500" />
                  Substitution for
                </h4>
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="bg-background rounded-md p-3">
                    <p className="text-sm font-medium">{substitutionHabit.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This habit replaces {substitutionHabit.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Other Details */}
            <div className="space-y-3">
              <h4 className="font-medium">Additional Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-xs font-medium">Frequency</span>
                  </div>
                  <p className="text-sm">
                    {habit.frequency === 7 ? "Daily" : `${habit.frequency} days/week`}
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-xs font-medium">Difficulty</span>
                  </div>
                  <p className="text-sm">
                    {habit.difficulty || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setShowDetailsSheet(false)}>Close</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HabitCard; 