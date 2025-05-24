import { useState, useEffect } from "react";
import { HabitFormData, HabitType, Habit } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useHabits } from "@/hooks/useHabits";

interface HabitFormProps {
  onSubmit: (data: HabitFormData) => void;
  initialData?: Partial<HabitFormData>;
  isEditing?: boolean;
}

const HabitForm = ({ onSubmit, initialData, isEditing = false }: HabitFormProps) => {
  const { habits } = useHabits();
  const [formData, setFormData] = useState<HabitFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    type: initialData?.type || "build",
    frequency: initialData?.frequency || 7,
    identity: initialData?.identity || "",
    cue: initialData?.cue || "",
    craving: initialData?.craving || "",
    response: initialData?.response || "",
    reward: initialData?.reward || "",
    stackedHabit: initialData?.stackedHabit || "",
    substitutionFor: initialData?.substitutionFor || "",
    environmentDesign: initialData?.environmentDesign || [],
    cost: initialData?.cost || { money: 0, time: 0, health: "" }
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [environmentDesignInput, setEnvironmentDesignInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as HabitType }));
  };

  const handleFrequencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, frequency: parseInt(value) }));
  };

  const handleStackedHabitChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stackedHabit: value }));
  };

  const handleSubstitutionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, substitutionFor: value }));
  };

  const handleCostChange = (field: keyof typeof formData.cost, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      cost: {
        ...prev.cost!,
        [field]: field === 'health' ? value : Number(value)
      }
    }));
  };

  const addEnvironmentDesign = () => {
    if (environmentDesignInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        environmentDesign: [...(prev.environmentDesign || []), environmentDesignInput.trim()]
      }));
      setEnvironmentDesignInput("");
    }
  };

  const removeEnvironmentDesign = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      environmentDesign: prev.environmentDesign?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Filter habits based on type for substitution and stacking
  const buildHabits = habits.filter(h => h.type === "build" && (!isEditing || h.id !== (initialData as Habit)?.id));
  const breakHabits = habits.filter(h => h.type === "break" && (!isEditing || h.id !== (initialData as Habit)?.id));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Habit" : "Create New Habit"}</CardTitle>
        <CardDescription>
          {isEditing 
            ? "Update your habit details below" 
            : "Add a new habit to track your progress"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Habit Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter habit name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="identity">Identity Statement</Label>
            <Input
              id="identity"
              name="identity"
              value={formData.identity || ""}
              onChange={handleChange}
              placeholder="I am the type of person who..."
            />
            <p className="text-xs text-muted-foreground">
              Frame your habit as part of your identity (e.g., "I am the type of person who exercises daily")
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Why is this habit important to you?"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Habit Type</Label>
            <RadioGroup 
              value={formData.type} 
              onValueChange={handleTypeChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="build" id="build" />
                <Label htmlFor="build">Build Habit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="break" id="break" />
                <Label htmlFor="break">Break Habit</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="frequency">Weekly Frequency</Label>
            <Select 
              value={formData.frequency.toString()} 
              onValueChange={handleFrequencyChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day per week</SelectItem>
                <SelectItem value="2">2 days per week</SelectItem>
                <SelectItem value="3">3 days per week</SelectItem>
                <SelectItem value="4">4 days per week</SelectItem>
                <SelectItem value="5">5 days per week</SelectItem>
                <SelectItem value="6">6 days per week</SelectItem>
                <SelectItem value="7">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="advanced">
              <AccordionTrigger>Advanced Options</AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Habit Loop (Cue, Craving, Response, Reward) */}
                <div className="space-y-4 border rounded-md p-4">
                  <h3 className="font-medium">Habit Loop</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cue">Cue</Label>
                    <Input
                      id="cue"
                      name="cue"
                      value={formData.cue || ""}
                      onChange={handleChange}
                      placeholder="What triggers this habit?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="craving">Craving</Label>
                    <Input
                      id="craving"
                      name="craving"
                      value={formData.craving || ""}
                      onChange={handleChange}
                      placeholder="What do you desire?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="response">Response</Label>
                    <Input
                      id="response"
                      name="response"
                      value={formData.response || ""}
                      onChange={handleChange}
                      placeholder="What action do you take?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reward">Reward</Label>
                    <Input
                      id="reward"
                      name="reward"
                      value={formData.reward || ""}
                      onChange={handleChange}
                      placeholder="What satisfaction do you get?"
                    />
                  </div>
                </div>
                
                {/* Habit Stacking */}
                {formData.type === "build" && buildHabits.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="stackedHabit">Habit Stacking</Label>
                    <Select 
                      value={formData.stackedHabit || ""} 
                      onValueChange={handleStackedHabitChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Stack with existing habit (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {buildHabits.map(habit => (
                          <SelectItem key={habit.id} value={habit.id}>
                            {habit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      After I [existing habit], I will [new habit]
                    </p>
                  </div>
                )}
                
                {/* Substitution for break habits */}
                {formData.type === "break" && (
                  <div className="space-y-2">
                    <Label htmlFor="substitutionFor">Substitute With</Label>
                    <Select 
                      value={formData.substitutionFor || ""} 
                      onValueChange={handleSubstitutionChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Substitute with a build habit (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {buildHabits.map(habit => (
                          <SelectItem key={habit.id} value={habit.id}>
                            {habit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Instead of [bad habit], I will [good habit]
                    </p>
                  </div>
                )}
                
                {/* Environment Design */}
                <div className="space-y-2">
                  <Label>Environment Design</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={environmentDesignInput}
                      onChange={(e) => setEnvironmentDesignInput(e.target.value)}
                      placeholder="Add environment change to support this habit"
                    />
                    <Button type="button" variant="outline" onClick={addEnvironmentDesign}>
                      Add
                    </Button>
                  </div>
                  
                  {formData.environmentDesign && formData.environmentDesign.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {formData.environmentDesign.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded-md">
                          <span className="text-sm">{item}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeEnvironmentDesign(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Cost for break habits */}
                {formData.type === "break" && (
                  <div className="space-y-4 border rounded-md p-4">
                    <h3 className="font-medium">Cost of This Habit</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="costMoney">Monthly Cost ($)</Label>
                      <Input
                        id="costMoney"
                        type="number"
                        min="0"
                        value={formData.cost?.money || 0}
                        onChange={(e) => handleCostChange('money', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="costTime">Time Cost (minutes/day)</Label>
                      <Input
                        id="costTime"
                        type="number"
                        min="0"
                        value={formData.cost?.time || 0}
                        onChange={(e) => handleCostChange('time', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="costHealth">Health Impact</Label>
                      <Textarea
                        id="costHealth"
                        value={formData.cost?.health || ""}
                        onChange={(e) => handleCostChange('health', e.target.value)}
                        placeholder="Describe health impacts of this habit"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button type="submit" variant="default">
            {isEditing ? "Update Habit" : "Create Habit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default HabitForm; 