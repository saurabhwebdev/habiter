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
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Define the form schema with Zod
const habitSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['positive', 'negative']),
  icon: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  goal_type: z.enum(['min', 'max']),
  daily_goal: z.coerce.number().min(0, 'Goal must be at least 0'),
  cue: z.string().optional(),
  habit: z.string().optional(),
  reward: z.string().optional(),
  reminder_enabled: z.boolean(),
  money_tracking_enabled: z.boolean().default(false),
  cost_per_unit: z.coerce.number().optional(),
  currency: z.string().default('USD'),
  tapering_enabled: z.boolean().default(false),
  tapering_start_date: z.string().optional(),
  tapering_end_date: z.string().optional(),
  tapering_start_value: z.coerce.number().optional(),
  tapering_target_value: z.coerce.number().default(0),
  fixed_days_enabled: z.boolean().default(false),
  fixed_days_target: z.coerce.number().optional(),
  fixed_days_start_date: z.string().optional(),
  fixed_days_progress: z.coerce.number().optional()
}).refine((data) => {
  // For positive habits, ensure daily goal is at least 1
  if (data.type === 'positive' && data.daily_goal < 1) {
    return false;
  }
  return true;
}, {
  message: "For positive habits, the goal must be at least 1",
  path: ["daily_goal"]
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
  const [showMoneyTracking, setShowMoneyTracking] = useState(false);
  const [showTapering, setShowTapering] = useState(false);
  const [showFixedDays, setShowFixedDays] = useState(false);

  // Initialize the form with default values or existing habit values
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: habit
      ? {
          ...habit,
          tapering_enabled: habit.tapering_enabled || false,
          tapering_start_value: habit.tapering_start_value || habit.daily_goal,
          tapering_target_value: habit.tapering_target_value || 0,
          fixed_days_enabled: habit.fixed_days_enabled || false,
          fixed_days_target: habit.fixed_days_target || 30,
          fixed_days_start_date: habit.fixed_days_start_date || format(new Date(), 'yyyy-MM-dd'),
          fixed_days_progress: habit.fixed_days_progress || 0
        }
      : {
          name: '',
          type: 'positive',
          icon: '',
          unit: '',
          goal_type: 'min',
          daily_goal: 1,
          cue: '',
          habit: '',
          reward: '',
          reminder_enabled: false,
          money_tracking_enabled: false,
          cost_per_unit: undefined,
          currency: 'USD',
          tapering_enabled: false,
          tapering_start_date: format(new Date(), 'yyyy-MM-dd'),
          tapering_end_date: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
          tapering_start_value: 1,
          tapering_target_value: 0,
          fixed_days_enabled: false,
          fixed_days_target: 30,
          fixed_days_start_date: format(new Date(), 'yyyy-MM-dd'),
          fixed_days_progress: 0
        }
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

  // Watch for changes to money_tracking_enabled and type
  const moneyTrackingEnabled = form.watch('money_tracking_enabled');
  const habitType = form.watch('type');
  const taperingEnabled = form.watch('tapering_enabled');
  const goalType = form.watch('goal_type');
  
  // Show money tracking section only for negative habits with money tracking enabled
  useEffect(() => {
    setShowMoneyTracking(moneyTrackingEnabled && habitType === 'negative');
  }, [moneyTrackingEnabled, habitType]);
  
  // Show tapering section only for negative habits with max goal type
  useEffect(() => {
    setShowTapering(taperingEnabled && habitType === 'negative' && goalType === 'max');
    
    // When tapering is enabled, set the start value to the daily goal if not already set
    if (taperingEnabled && habitType === 'negative' && goalType === 'max') {
      const currentDailyGoal = form.getValues('daily_goal');
      const currentStartValue = form.getValues('tapering_start_value');
      
      if (!currentStartValue) {
        form.setValue('tapering_start_value', currentDailyGoal);
      }
    }
  }, [taperingEnabled, habitType, goalType, form]);
  
  // When habit type changes, update goal type
  useEffect(() => {
    if (habitType === 'positive') {
      form.setValue('goal_type', 'min');
    } else {
      form.setValue('goal_type', 'max');
    }
  }, [habitType, form]);

  // Watch for changes to fixed_days_enabled
  const fixedDaysEnabled = form.watch('fixed_days_enabled');
  
  // Show fixed days section
  useEffect(() => {
    setShowFixedDays(fixedDaysEnabled);
  }, [fixedDaysEnabled]);

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

      // If tapering is not enabled, set related fields to null
      if (!data.tapering_enabled) {
        data.tapering_start_date = undefined;
        data.tapering_end_date = undefined;
        data.tapering_start_value = undefined;
        data.tapering_target_value = undefined;
      }

      // If fixed days tracking is not enabled, set related fields to null
      if (!data.fixed_days_enabled) {
        data.fixed_days_target = undefined;
        data.fixed_days_start_date = undefined;
        data.fixed_days_progress = undefined;
      } else {
        // Initialize progress to 0 for new habits
        if (!isEditing) {
          data.fixed_days_progress = 0;
        }
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
                      min={form.watch('type') === 'negative' && form.watch('goal_type') === 'max' ? "0" : "1"}
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
          
          {/* Fixed Days Tracking Toggle */}
          <FormField
            control={form.control}
            name="fixed_days_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black/10 p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Track for Fixed Number of Days</FormLabel>
                  <FormDescription>
                    Set a specific number of days to track this habit (e.g., "Do not eat sugar for 10 days")
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
          
          {/* Fixed Days Tracking Fields (conditional) */}
          {showFixedDays && (
            <div className="space-y-4 border border-black/10 p-4 rounded-md">
              <h3 className="font-medium">Fixed Days Tracking Settings</h3>
              <p className="text-sm text-black/70">
                Track this habit for a specific number of days
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target Days */}
                <FormField
                  control={form.control}
                  name="fixed_days_target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Days</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          step="1"
                          {...field} 
                          className="border-black/20 focus:border-black"
                        />
                      </FormControl>
                      <FormDescription>
                        How many days do you want to track this habit?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="fixed_days_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-black/20 focus:border-black",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When should tracking begin?
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
                    <Badge variant="outline" className="ml-2 text-xs">Coming soon</Badge>
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={false}
                    onCheckedChange={() => {}}
                    disabled={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tapering Toggle (only for negative habits) */}
          {habitType === 'negative' && goalType === 'max' && (
            <FormField
              control={form.control}
              name="tapering_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-black/10 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Goal Tapering</FormLabel>
                    <FormDescription>
                      Gradually reduce your goal over time to help you quit completely
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
          )}
          
          {/* Tapering Settings (conditional) */}
          {showTapering && (
            <div className="space-y-4 border border-black/10 p-4 rounded-md">
              <h3 className="font-medium">Tapering Schedule</h3>
              <p className="text-sm text-black/70">
                Set a schedule to gradually reduce your {form.watch('unit')} consumption
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name="tapering_start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-black/20 focus:border-black",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When should tapering begin?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* End Date */}
                <FormField
                  control={form.control}
                  name="tapering_end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Target Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal border-black/20 focus:border-black",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When do you want to reach your target?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Starting Value */}
                <FormField
                  control={form.control}
                  name="tapering_start_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Starting Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1"
                          {...field} 
                          className="border-black/20 focus:border-black"
                        />
                      </FormControl>
                      <FormDescription>
                        How many {form.watch('unit')}s per day to start?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Target Value */}
                <FormField
                  control={form.control}
                  name="tapering_target_value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field} 
                          className="border-black/20 focus:border-black"
                        />
                      </FormControl>
                      <FormDescription>
                        Goal amount (usually zero to quit)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
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