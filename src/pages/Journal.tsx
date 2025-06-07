import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { JournalForm } from '@/components/journal/JournalForm';
import { JournalHistory } from '@/components/journal/JournalHistory';
import { Habit } from '@/types/habit';
import { habitService } from '@/lib/habitService';
import { BookOpen, History, Clock } from 'lucide-react';

const Journal = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const habitsData = await habitService.getHabits();
        setHabits(habitsData);
      } catch (error) {
        console.error('Error fetching habits:', error);
        toast({
          title: "Error",
          description: "Failed to load habits. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [toast]);

  // Format date and time
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 shadow-md border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Your Journal</h1>
              <p className="text-gray-300 mt-1 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {formatDate()}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="new" className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4" />
              New Entry
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-xl text-gray-900">New Journal Entry</CardTitle>
                <CardDescription className="text-gray-600">
                  Record your thoughts, moods, and reflections about your habits.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <JournalForm habits={habits} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-xl text-gray-900">Journal History</CardTitle>
                <CardDescription className="text-gray-600">
                  View your past journal entries and track your progress over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <JournalHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Journal; 