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
import { X } from 'lucide-react';
import { Habit, NewJournalEntry, MoodType } from '@/types/habit';
import { habitService } from '@/lib/habitService';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="habit_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a habit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {habits.map((habit) => (
                    <SelectItem key={habit.id} value={habit.id}>
                      {habit.icon ? `${habit.icon} ${habit.name}` : habit.name} 
                      <span className="ml-2 text-xs opacity-70">
                        ({habit.type === 'positive' ? '+' : '−'})
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
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
              <FormLabel>Journal Entry</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write about your experience, thoughts, and reflections..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {field.value.length}/1000 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="How are you feeling?" />
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
              <FormDescription>
                Select your current mood
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {showUrgeLevel && (
          <FormField
            control={form.control}
            name="urge_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Urge/Craving Level (0-10)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      defaultValue={[field.value || 0]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 - None</span>
                      <span>5 - Moderate</span>
                      <span>10 - Extreme</span>
                    </div>
                    <div className="text-center font-medium text-lg">
                      {field.value || 0}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Rate how strong your urge or craving is
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Triggers</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input
                    placeholder="Add a trigger (e.g., stress, boredom)"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTrigger();
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={addTrigger} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {triggers.map((trigger, index) => (
                  <Badge key={index} variant="secondary" className="pl-2">
                    {trigger}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 pl-1"
                      onClick={() => removeTrigger(trigger)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <FormDescription>
                Add any triggers that led to this habit behavior
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Journal Entry
        </Button>
      </form>
    </Form>
  );
}; 