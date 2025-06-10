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
import { 
  CalendarIcon, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  X, 
  Filter, 
  Trash2, 
  Clock, 
  Bookmark,
  Tag,
  AlertCircle
} from 'lucide-react';
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
import habitService from '@/lib/habitService';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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

  const getHabitTypeById = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    return habit ? habit.type : 'positive';
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

  const formatEntryDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };
  
  const formatEntryTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Bookmark className="h-5 w-5 text-gray-700" />
          Your Journal Entries
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="border-gray-300 hover:bg-gray-100 text-gray-700"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {showFilters && (
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="habit-filter" className="text-gray-700 flex items-center gap-2">
                    <Tag className="h-4 w-4" /> Habit
                  </Label>
                  <Select 
                    onValueChange={(value) => setFilters({ ...filters, habit_id: value })}
                    value={filters.habit_id}
                  >
                    <SelectTrigger id="habit-filter" className="border-gray-300 focus:ring-gray-900 focus:border-gray-900">
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
                  <Label htmlFor="mood-filter" className="text-gray-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Mood
                  </Label>
                  <Select 
                    onValueChange={(value) => setFilters({ ...filters, mood: value })}
                    value={filters.mood}
                  >
                    <SelectTrigger id="mood-filter" className="border-gray-300 focus:ring-gray-900 focus:border-gray-900">
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
                  <Label className="text-gray-700 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-100",
                          !date && "text-gray-500"
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
                        className="border-gray-200"
                      />
                      <div className="p-2 border-t border-gray-200 flex justify-end">
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={applyDateFilter}
                          disabled={!date}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="search-filter" className="text-gray-700 flex items-center gap-2">
                    <Search className="h-4 w-4" /> Search in content
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      id="search-filter"
                      placeholder="Search in journal content..."
                      value={filters.search || ''}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="self-end text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading your journal entries...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="flex justify-center">
            <Bookmark className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No entries found</h3>
          <p className="mt-2 text-gray-500">
            {Object.keys(filters).length > 0 
              ? "Try changing your filters or create a new journal entry" 
              : "Start journaling about your habits to see entries here"}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map(entry => (
            <Card key={entry.id} className="border-gray-200 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                {/* Left side - metadata */}
                <div className="p-4 sm:p-5 sm:w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge 
                      className={`
                        px-2 py-1 text-xs
                        ${getHabitTypeById(entry.habit_id) === 'positive' 
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                      `}
                    >
                      {getHabitTypeById(entry.habit_id) === 'positive' ? 'Positive' : 'Negative'}
                    </Badge>
                    
                    {entry.mood && (
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-2 py-1 text-xs">
                        {getMoodEmoji(entry.mood)} {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-gray-900 font-semibold mb-1">
                    {getHabitNameById(entry.habit_id)}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm mt-1 mb-3">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{formatEntryDate(entry.created_at)}, {formatEntryTime(entry.created_at)}</span>
                  </div>
                  
                  {entry.urge_level !== undefined && (
                    <div className="mt-auto pt-2">
                      <p className="text-xs text-gray-500">Urge Level</p>
                      <div className="flex items-center mt-1">
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gray-700" 
                            style={{ width: `${(entry.urge_level / 10) * 100}%` }}
                          />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{entry.urge_level}/10</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right side - content */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col">
                  <div className="flex-1">
                    <p className="text-gray-700 whitespace-pre-line">
                      {entry.content}
                    </p>
                    
                    {entry.triggers && entry.triggers.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Triggers:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.triggers.map((trigger, i) => (
                            <Badge 
                              key={i} 
                              variant="outline"
                              className="bg-gray-50 text-gray-700 border-gray-200"
                            >
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Journal Entry</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this journal entry? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-end">
                          <DialogClose asChild>
                            <Button variant="outline" className="border-gray-300">Cancel</Button>
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
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 