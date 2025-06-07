import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Pencil, Calendar, Smile, Tag, Zap } from 'lucide-react';
import { Habit, NewJournalEntry, MoodType } from '@/types/habit';
import { habitService } from '@/lib/habitService';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  habit_id: z.string().min(1, { message: 'Please select a habit' }),
  content: z.string().min(1, { message: 'Please enter some content' }).max(1000, { message: 'Content is too long' }),
  mood: z.string().optional(),
  urge_level: z.number().min(0).max(10).optional(),
  trigger: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface JournalFormProps {
  habits: Habit[];
  isLoading: boolean;
}

export const JournalForm: React.FC<JournalFormProps> = ({ habits, isLoading }) => {
  const [triggers, setTriggers] = useState<string[]>([]);
  const { toast } = useToast();

  const defaultValues: Partial<FormValues> = {
    content: '',
    urge_level: 0,
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const newEntry: NewJournalEntry = {
        habit_id: values.habit_id,
        content: values.content,
        mood: values.mood,
        triggers: triggers.length > 0 ? triggers : undefined,
        urge_level: values.urge_level,
      };

      await habitService.createJournalEntry(newEntry);
      
      toast({
        title: 'Success',
        description: 'Journal entry added successfully',
      });
      
      // Reset form
      form.reset(defaultValues);
      setTriggers([]);
    } catch (error) {
      console.error('Error creating journal entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to add journal entry. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const addTrigger = () => {
    const trigger = form.getValues().trigger;
    if (trigger && !triggers.includes(trigger)) {
      setTriggers([...triggers, trigger]);
      form.setValue('trigger', '');
    }
  };

  const removeTrigger = (triggerToRemove: string) => {
    setTriggers(triggers.filter(trigger => trigger !== triggerToRemove));
  };

  const selectedHabit = habits.find(habit => habit.id === form.watch('habit_id'));
  const showUrgeLevel = selectedHabit?.type === 'negative';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Essential fields */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-gray-700" />
              <h3 className="text-lg font-medium">Essential Information</h3>
            </div>
            
            <FormField
              control={form.control}
              name="habit_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Which habit are you journaling about?</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:ring-gray-900 focus:border-gray-900">
                        <SelectValue placeholder="Select a habit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {habits.map((habit) => (
                        <SelectItem key={habit.id} value={habit.id}>
                          {habit.icon ? `${habit.icon} ${habit.name}` : habit.name} 
                          <span className={`ml-2 text-xs ${habit.type === 'positive' ? 'text-gray-700' : 'text-gray-700'}`}>
                            ({habit.type === 'positive' ? '+' : '−'})
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500">
                    Select the habit you want to journal about
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 flex items-center gap-2">
                    <Pencil className="h-4 w-4" /> Your thoughts and reflections
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write about your experience, thoughts, and reflections..."
                      className="min-h-[200px] border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500 text-right">
                    {field.value.length}/1000 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right column - Additional context */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-gray-700" />
              <h3 className="text-lg font-medium">Additional Context</h3>
            </div>
            
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 flex items-center gap-2">
                    <Smile className="h-4 w-4" /> How are you feeling?
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:ring-gray-900 focus:border-gray-900">
                        <SelectValue placeholder="Select your mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="great">😄 Great</SelectItem>
                      <SelectItem value="good">🙂 Good</SelectItem>
                      <SelectItem value="neutral">😐 Neutral</SelectItem>
                      <SelectItem value="bad">😔 Bad</SelectItem>
                      <SelectItem value="terrible">😢 Terrible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showUrgeLevel && (
              <FormField
                control={form.control}
                name="urge_level"
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel className="text-gray-700 flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Urge/Craving Level
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={10}
                          step={1}
                          defaultValue={[field.value || 0]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0 - None</span>
                          <span>5 - Moderate</span>
                          <span>10 - Extreme</span>
                        </div>
                        <div className="text-center font-medium text-lg text-gray-900 bg-gray-100 rounded-full py-1 mt-2">
                          {field.value || 0}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="trigger"
              render={({ field }) => (
                <FormItem className="pt-2">
                  <FormLabel className="text-gray-700">What triggered this habit?</FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Add a trigger (e.g., stress, boredom)"
                        {...field}
                        className="border-gray-300 focus:ring-gray-900 focus:border-gray-900"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTrigger();
                          }
                        }}
                      />
                    </FormControl>
                    <Button 
                      type="button" 
                      onClick={addTrigger} 
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-100"
                    >
                      Add
                    </Button>
                  </div>
                  <FormMessage />
                  
                  {triggers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {triggers.map((trigger, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-gray-100 border-gray-200 text-gray-800 gap-1 py-1 px-3"
                        >
                          {trigger}
                          <button 
                            type="button" 
                            onClick={() => removeTrigger(trigger)}
                            className="text-gray-500 hover:text-gray-900 ml-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="my-6" />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-gray-900 hover:bg-gray-800"
            disabled={isLoading}
          >
            Save Journal Entry
          </Button>
        </div>
      </form>
    </Form>
  );
}; 