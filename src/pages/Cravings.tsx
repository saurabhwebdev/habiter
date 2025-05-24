import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import AuthNavBar from "@/components/AuthNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import CravingLogForm from "@/components/CravingLogForm";
import CravingLogList from "@/components/CravingLogList";
import { useCravingLogs } from "@/hooks/useCravingLogs";
import { CravingLogFormData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { AlertCircle, PlusCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Cravings = () => {
  const { currentUser } = useAuth();
  const { logs, loading, addLog } = useCravingLogs();
  const [showCravingSheet, setShowCravingSheet] = useState(false);

  const handleAddCravingLog = async (data: CravingLogFormData) => {
    await addLog(data);
    setShowCravingSheet(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <AuthNavBar />
      <main className="flex-1 pt-16 pb-20">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Craving Logs</h1>
              <p className="text-sm text-muted-foreground">
                Track and analyze your cravings
              </p>
            </div>
            <Sheet open={showCravingSheet} onOpenChange={setShowCravingSheet}>
              <SheetTrigger asChild>
                <Button size="sm" className="rounded-full">
                  <PlusCircle className="h-4 w-4 mr-1" /> Log Craving
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
                <SheetHeader>
                  <SheetTitle>Log a Craving</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <CravingLogForm onSubmit={handleAddCravingLog} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-6">
              <div className="flex items-center space-x-2 text-amber-500 mb-2">
                <AlertCircle className="h-5 w-5" />
                <h2 className="text-lg font-medium">Understanding Cravings</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Tracking your cravings helps identify patterns and triggers. Note what you were doing, 
                feeling, and where you were when a craving hit. This awareness is the first step to breaking unwanted habits.
              </p>
            </div>
            
            <CravingLogList logs={logs} loading={loading} />
          </div>
        </div>
      </main>
      <MobileNavBar />
    </div>
  );
};

export default Cravings;