import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Habit, HabitType, GoalType, NewHabit, DEFAULT_ICONS } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { habitService } from '@/lib/habitService';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the form schema with Zod
const habitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['positive', 'negative']),
  icon: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  goal_type: z.enum(['min', 'max']),
  daily_goal: z.coerce.number().positive('Goal must be positive'),
  cue: z.string().optional(),
  habit: z.string().optional(),
  reward: z.string().optional(),
  reminder_enabled: z.boolean().default(false),
  money_tracking_enabled: z.boolean().default(false),
  cost_per_unit: z.coerce.number().optional(),
  currency: z.string().default('USD'),
});

type HabitFormValues = z.infer<typeof habitSchema>;

interface HabitFormProps {
  habit?: Habit;
  onSuccess: () => void;
  onCancel: () => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({ habit, onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!habit;
  const [showMoneyTracking, setShowMoneyTracking] = useState(habit?.money_tracking_enabled || false);

  // Initialize the form with default values or existing habit values
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: habit?.name || '',
      type: habit?.type || 'positive',
      icon: habit?.icon || '',
      unit: habit?.unit || '',
      goal_type: habit?.goal_type || 'min',
      daily_goal: habit?.daily_goal || 1,
      cue: habit?.cue || '',
      habit: habit?.habit || '',
      reward: habit?.reward || '',
      reminder_enabled: habit?.reminder_enabled || false,
      money_tracking_enabled: habit?.money_tracking_enabled || false,
      cost_per_unit: habit?.cost_per_unit || 0,
      currency: habit?.currency || 'USD',
    },
  });

  // Watch for changes in the money tracking enabled field
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'money_tracking_enabled') {
        setShowMoneyTracking(value.money_tracking_enabled || false);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Handle form submission
  const onSubmit = async (data: HabitFormValues) => {
    try {
      setIsLoading(true);
      
      // If no icon is provided, try to find a default one based on the name
      if (!data.icon) {
        const habitNameLower = data.name.toLowerCase();
        const matchingIcon = Object.entries(DEFAULT_ICONS).find(
          ([key]) => habitNameLower.includes(key)
        );
        if (matchingIcon) {
          data.icon = matchingIcon[1];
        } else {
          data.icon = DEFAULT_ICONS.default;
        }
      }
      
      // If money tracking is not enabled, set related fields to null
      if (!data.money_tracking_enabled) {
        data.cost_per_unit = undefined;
        data.currency = 'USD';
      }
      
      if (isEditing && habit) {
        // Update existing habit
        await habitService.updateHabit(habit.id, data);
        toast({
          title: "Habit updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        // Create new habit
        await habitService.createHabit(data as NewHabit);
        toast({
          title: "Habit created",
          description: `${data.name} has been added to your habits.`,
        });
      }
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'create'} habit. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Suggested icons
  const suggestedIcons = ['💧', '🚬', '🚶', '📚', '🧘', '💪', '😴', '🍎', '☕', '🍷', '🍬', '👋', '📝'];

  // Currency options
  const currencies = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'JPY (¥)', value: 'JPY' },
    { label: 'INR (₹)', value: 'INR' },
    { label: 'CAD (C$)', value: 'CAD' },
    { label: 'AUD (A$)', value: 'AUD' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Habit Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Drink Water" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Unit */}
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., glass, cigarette" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormDescription>
                    What are you counting?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Habit Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Habit Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="positive" id="positive" />
                      <Label htmlFor="positive">Positive (build this habit)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="negative" id="negative" />
                      <Label htmlFor="negative">Negative (reduce this habit)</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Goal Type and Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="goal_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Goal Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="min" id="min" />
                        <Label htmlFor="min">Minimum</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="max" id="max" />
                        <Label htmlFor="max">Maximum</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    {form.watch('goal_type') === 'min' 
                      ? 'Aim to do at least this many' 
                      : 'Aim to do at most this many'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="daily_goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Goal</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormDescription>
                    Target number of {form.watch('unit')}s per day
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Icon Selection */}
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon (Optional)</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input 
                      placeholder="Emoji or icon" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                    <div className="flex flex-wrap gap-2">
                      {suggestedIcons.map((icon) => (
                        <Button
                          key={icon}
                          type="button"
                          variant="outline"
                          className="h-10 w-10 p-0 border-black/20"
                          onClick={() => form.setValue('icon', icon)}
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Choose an emoji to represent your habit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Money Tracking Toggle */}
          <FormField
            control={form.control}
            name="money_tracking_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black/10 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Money Tracking</FormLabel>
                  <FormDescription>
                    Track money saved by reducing negative habits (e.g., smoking, coffee, etc.)
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Money Tracking Fields (conditional) */}
          {showMoneyTracking && form.watch('type') === 'negative' && (
            <div className="space-y-4 border border-black/10 p-4 rounded-md">
              <h3 className="font-medium">Money Tracking Settings</h3>
              <p className="text-sm text-black/70">
                Track how much money you save by reducing this habit
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cost_per_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost per {form.watch('unit')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          step="0.01"
                          {...field} 
                          className="border-black/20 focus:border-black"
                        />
                      </FormControl>
                      <FormDescription>
                        How much does one {form.watch('unit')} cost?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-black/20 focus:border-black">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your preferred currency
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          
          {/* CHR System */}
          <div className="space-y-4 border border-black/10 p-4 rounded-md">
            <h3 className="font-medium">Cue-Habit-Reward System</h3>
            <p className="text-sm text-black/70">
              Understanding the pattern behind your habit helps create lasting change.
            </p>
            
            <FormField
              control={form.control}
              name="cue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cue (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What triggers this habit? e.g., Feeling stressed at work" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="habit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What is the behavior? e.g., Smoking a cigarette" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What do you get from it? e.g., Temporary relief from stress" 
                      {...field} 
                      className="border-black/20 focus:border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Reminder Toggle */}
          <FormField
            control={form.control}
            name="reminder_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black/10 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Reminders</FormLabel>
                  <FormDescription>
                    Receive notifications for this habit
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isLoading}
            className="border-black/20"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-black text-white hover:bg-black/90"
          >
            {isLoading ? 'Saving...' : isEditing ? 'Update Habit' : 'Create Habit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};