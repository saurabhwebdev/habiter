import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Habit, JournalEntry, JournalFilters } from '@/types/habit';
import { habitService } from '@/lib/habitService';

export const JournalHistory: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [filters, setFilters] = useState<JournalFilters>({});
  const [date, setDate] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [entriesData, habitsData] = await Promise.all([
          habitService.getJournalEntries(filters),
          habitService.getHabits()
        ]);
        setEntries(entriesData);
        setHabits(habitsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load journal entries. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters, toast]);

  const getHabitNameById = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    return habit ? (habit.icon ? `${habit.icon} ${habit.name}` : habit.name) : 'Unknown Habit';
  };

  const getMoodEmoji = (mood?: string) => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '🙂';
      case 'neutral': return '😐';
      case 'bad': return '😔';
      case 'terrible': return '😢';
      default: return '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await habitService.deleteJournalEntry(id);
      setEntries(entries.filter(entry => entry.id !== id));
      toast({
        title: 'Success',
        description: 'Journal entry deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete journal entry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const applyDateFilter = () => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setFilters({ ...filters, date_range: { start: formattedDate, end: formattedDate } });
    }
  };

  const clearFilters = () => {
    setFilters({});
    setDate(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Journal Entries</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
        >
          <Search className="mr-2 h-4 w-4" />
          Filters
          {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg space-y-4 bg-secondary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="habit-filter">Habit</Label>
              <Select 
                onValueChange={(value) => setFilters({ ...filters, habit_id: value })}
                value={filters.habit_id}
              >
                <SelectTrigger id="habit-filter">
                  <SelectValue placeholder="Select a habit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Habits</SelectItem>
                  {habits.map((habit) => (
                    <SelectItem key={habit.id} value={habit.id}>
                      {habit.icon ? `${habit.icon} ${habit.name}` : habit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mood-filter">Mood</Label>
              <Select 
                onValueChange={(value) => setFilters({ ...filters, mood: value })}
                value={filters.mood}
              >
                <SelectTrigger id="mood-filter">
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Moods</SelectItem>
                  <SelectItem value="great">😄 Great</SelectItem>
                  <SelectItem value="good">🙂 Good</SelectItem>
                  <SelectItem value="neutral">😐 Neutral</SelectItem>
                  <SelectItem value="bad">😔 Bad</SelectItem>
                  <SelectItem value="terrible">😢 Terrible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  <div className="p-2 border-t border-border flex justify-end">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={applyDateFilter}
                      disabled={!date}
                    >
                      Apply
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="space-y-2">
              <Label htmlFor="search-filter">Search</Label>
              <div className="flex gap-2">
                <Input 
                  id="search-filter"
                  placeholder="Search in journal content..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No journal entries found</p>
          <p className="text-sm text-muted-foreground mt-2">
            {Object.keys(filters).length > 0 
              ? "Try adjusting your filters"
              : "Start journaling about your habits to see entries here"}
          </p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {entries.map((entry) => (
            <AccordionItem key={entry.id} value={entry.id}>
              <AccordionTrigger className="hover:no-underline group">
                <div className="grid grid-cols-12 w-full text-left">
                  <div className="col-span-7 md:col-span-9 font-medium">
                    {getHabitNameById(entry.habit_id)}
                  </div>
                  <div className="col-span-3 md:col-span-2 text-sm text-muted-foreground justify-self-end">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </div>
                  <div className="col-span-2 md:col-span-1 justify-self-end text-xl">
                    {getMoodEmoji(entry.mood)}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                  
                  {entry.urge_level !== null && entry.urge_level !== undefined && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">Urge Level: </span>
                      <span>{entry.urge_level}/10</span>
                    </div>
                  )}
                  
                  {entry.triggers && entry.triggers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-sm font-medium">Triggers: </span>
                      {entry.triggers.map((trigger, index) => (
                        <Badge key={index} variant="outline">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-end pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this journal entry? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleDelete(entry.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}; 