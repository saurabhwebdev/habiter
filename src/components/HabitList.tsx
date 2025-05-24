import { useState } from "react";
import { Habit } from "@/lib/types";
import HabitCard from "./HabitCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface HabitListProps {
  habits: Habit[];
  onToggleCompletion: (habit: Habit, date: string) => void;
  onEdit: (habitId: string, updates: Partial<Habit>) => void;
  onDelete: (habitId: string) => void;
}

const HabitList = ({ 
  habits, 
  onToggleCompletion, 
  onEdit, 
  onDelete 
}: HabitListProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredHabits = habits.filter(habit => {
    if (activeTab === "all") return true;
    return habit.type === activeTab;
  });

  const buildHabits = habits.filter(habit => habit.type === "build");
  const breakHabits = habits.filter(habit => habit.type === "break");

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10 rounded-full bg-muted p-1">
          <TabsTrigger 
            value="all" 
            className="rounded-full text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            All ({habits.length})
          </TabsTrigger>
          <TabsTrigger 
            value="build" 
            className="rounded-full text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Build ({buildHabits.length})
          </TabsTrigger>
          <TabsTrigger 
            value="break" 
            className="rounded-full text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Break ({breakHabits.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <HabitListContent 
            habits={filteredHabits}
            onToggleCompletion={onToggleCompletion}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
        <TabsContent value="build" className="mt-4">
          <HabitListContent 
            habits={filteredHabits}
            onToggleCompletion={onToggleCompletion}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
        <TabsContent value="break" className="mt-4">
          <HabitListContent 
            habits={filteredHabits}
            onToggleCompletion={onToggleCompletion}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const HabitListContent = ({ 
  habits, 
  onToggleCompletion, 
  onEdit, 
  onDelete 
}: HabitListProps) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <p className="text-muted-foreground">No habits found in this category.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="space-y-3 pr-2">
        {habits.map((habit) => (
          <motion.div 
            key={habit.id}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <HabitCard
              habit={habit}
              onToggleCompletion={onToggleCompletion}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default HabitList; 