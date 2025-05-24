import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import AuthNavBar from "@/components/AuthNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import HabitStats from "@/components/HabitStats";
import CravingLogForm from "@/components/CravingLogForm";
import CravingLogList from "@/components/CravingLogList";
import ReflectionPrompt from "@/components/ReflectionPrompt";
import { useHabits } from "@/hooks/useHabits";
import { useCravingLogs } from "@/hooks/useCravingLogs";
import { HabitFormData, CravingLogFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  AlertCircle, 
  Lightbulb,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { habits, loading, addHabit, editHabit, removeHabit, toggleCompletion } = useHabits();
  const { logs, loading: logsLoading, addLog } = useCravingLogs();
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showCravingSheet, setShowCravingSheet] = useState(false);

  const handleAddHabit = async (data: HabitFormData) => {
    await addHabit(data);
    setShowAddSheet(false);
  };

  const handleAddCravingLog = async (data: CravingLogFormData) => {
    await addLog(data);
    setShowCravingSheet(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthNavBar />
      <main className="flex-1 pt-16 pb-20">
        <div className="px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              {currentUser?.displayName || currentUser?.email}
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <HabitStats habits={habits} />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Habits</h2>
                <Sheet open={showAddSheet} onOpenChange={setShowAddSheet}>
                  <SheetTrigger asChild>
                    <Button size="sm" className="rounded-full">
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Habit
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl overflow-y-auto">
                    <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
                      <SheetTitle>Create New Habit</SheetTitle>
                    </SheetHeader>
                    <div className="pb-16">
                      <HabitForm onSubmit={handleAddHabit} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="mb-4">
                <HabitList 
                  habits={habits}
                  onToggleCompletion={toggleCompletion}
                  onEdit={editHabit}
                  onDelete={removeHabit}
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                  Craving Logs
                </h2>
                <Sheet open={showCravingSheet} onOpenChange={setShowCravingSheet}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <PlusCircle className="h-4 w-4 mr-1" /> Log Craving
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-xl overflow-y-auto">
                    <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
                      <SheetTitle>Log a Craving</SheetTitle>
                    </SheetHeader>
                    <div className="pb-16">
                      <CravingLogForm onSubmit={handleAddCravingLog} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="mb-8">
                <CravingLogList logs={logs} loading={logsLoading} />
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center mb-4">
                  <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                  Daily Reflection
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <ReflectionPrompt />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default Dashboard; 