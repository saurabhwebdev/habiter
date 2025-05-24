import { useState } from "react";
import { CravingLogFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHabits } from "@/hooks/useHabits";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CravingLogFormProps {
  onSubmit: (data: CravingLogFormData) => void;
  habitId?: string;
}

const COMMON_EMOTIONS = [
  "Stressed", "Bored", "Tired", "Anxious", "Sad", 
  "Lonely", "Angry", "Happy", "Excited", "Relaxed"
];

const COMMON_LOCATIONS = [
  "Home", "Work", "Car", "Friend's place", "Restaurant", 
  "Outdoors", "Bedroom", "Living room", "Kitchen"
];

const CravingLogForm = ({ onSubmit, habitId }: CravingLogFormProps) => {
  const { habits } = useHabits();
  const [formData, setFormData] = useState<CravingLogFormData>({
    habitId: habitId || "",
    trigger: "",
    intensity: 5,
    emotion: "",
    location: "",
    action: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHabitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, habitId: value }));
  };

  const handleEmotionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, emotion: value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, location: value }));
  };

  const handleIntensityChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, intensity: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Log a Craving</CardTitle>
        <CardDescription>
          Track your cravings to identify patterns and triggers
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!habitId && (
            <div className="space-y-2">
              <Label htmlFor="habitId">Related Habit</Label>
              <Select 
                value={formData.habitId} 
                onValueChange={handleHabitChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a habit" />
                </SelectTrigger>
                <SelectContent>
                  {habits.filter(h => h.type === "break").map(habit => (
                    <SelectItem key={habit.id} value={habit.id}>
                      {habit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="trigger">What triggered this craving?</Label>
            <Input
              id="trigger"
              name="trigger"
              value={formData.trigger}
              onChange={handleChange}
              placeholder="Describe what triggered your craving"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="intensity">Intensity (1-10)</Label>
            <div className="pt-2">
              <Slider
                defaultValue={[5]}
                min={1}
                max={10}
                step={1}
                value={[formData.intensity]}
                onValueChange={handleIntensityChange}
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
            <div className="text-center font-medium mt-2">
              {formData.intensity}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emotion">Emotion</Label>
            <Select 
              value={formData.emotion} 
              onValueChange={handleEmotionChange}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="How were you feeling?" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_EMOTIONS.map(emotion => (
                  <SelectItem key={emotion} value={emotion}>
                    {emotion}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other (specify in notes)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select 
              value={formData.location} 
              onValueChange={handleLocationChange}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Where were you?" />
              </SelectTrigger>
              <SelectContent>
                {COMMON_LOCATIONS.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other (specify in notes)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="action">How did you respond?</Label>
            <Input
              id="action"
              name="action"
              value={formData.action}
              onChange={handleChange}
              placeholder="What did you do in response to the craving?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              placeholder="Any other details you want to record"
              rows={3}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button type="submit" variant="default">
            Save Log
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CravingLogForm; 