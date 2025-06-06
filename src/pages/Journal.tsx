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

  return (
    <Layout>
      <div className="container max-w-6xl py-6">
        <h1 className="text-3xl font-bold mb-6">Journal</h1>
        
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">New Entry</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>New Journal Entry</CardTitle>
                <CardDescription>
                  Record your thoughts, moods, and reflections about your habits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JournalForm habits={habits} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Journal History</CardTitle>
                <CardDescription>
                  View your past journal entries.
                </CardDescription>
              </CardHeader>
              <CardContent>
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