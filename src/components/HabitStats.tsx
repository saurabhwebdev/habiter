import { Habit } from "@/lib/types";
import { CirclePlus, CircleMinus, Flame, Calendar } from "lucide-react";

interface HabitStatsProps {
  habits: Habit[];
}

const HabitStats = ({ habits }: HabitStatsProps) => {
  const buildHabits = habits.filter(habit => habit.type === "build");
  const breakHabits = habits.filter(habit => habit.type === "break");
  
  const totalHabits = habits.length;
  const buildHabitsCount = buildHabits.length;
  const breakHabitsCount = breakHabits.length;
  
  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(habit => 
    habit.completedDates.includes(today)
  ).length;
  
  const completionRate = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0;
  
  const longestStreak = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak)) 
    : 0;

  const stats = [
    {
      title: "Total",
      value: totalHabits,
      icon: Calendar,
      color: "bg-blue-500",
      description: `${buildHabitsCount} build, ${breakHabitsCount} break`
    },
    {
      title: "Build",
      value: buildHabitsCount,
      icon: CirclePlus,
      color: "bg-green-500",
      description: "Habits to develop"
    },
    {
      title: "Break",
      value: breakHabitsCount,
      icon: CircleMinus,
      color: "bg-red-500",
      description: "Habits to eliminate"
    },
    {
      title: "Streak",
      value: longestStreak,
      icon: Flame,
      color: "bg-orange-500",
      description: `${completionRate}% completed today`
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </span>
            <div className={`${stat.color} p-1.5 rounded-full`}>
              <stat.icon className="h-3.5 w-3.5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HabitStats; 