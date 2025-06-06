import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/Layout';
import { 
  BookOpen, 
  BarChart, 
  Settings, 
  PlusCircle, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  LineChart, 
  Mail, 
  Key, 
  Bell, 
  UserX, 
  Lightbulb, 
  Clock, 
  TrendingUp, 
  BarChart2, 
  Heart,
  AlertTriangle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Help = () => {
  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Welcome to Habiter</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <div className="bg-black/5 p-6 flex items-center justify-center">
                <Heart className="h-12 w-12 text-black" />
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70">
                  Habiter is a habit tracking application designed to help you build positive habits and break negative ones.
                  This guide will walk you through all the features and functionality of the app.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Getting Started</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="dashboard" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-black/70" />
                    <span>Dashboard Overview</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">The dashboard is your main hub for tracking and managing your habits:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>View all your habits in one place</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Filter between positive and negative habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Search for specific habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Add new habits with the "Add Habit" button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Track your daily progress with habit cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Get inspired by motivational messages that refresh every 30 seconds</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="habits" className="border border-black/10 rounded-lg mb-3 overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-black/70" />
                    <span>Understanding Habit Types</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">Habiter supports two types of habits:</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                      <div className="mt-1"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
                      <div>
                        <p className="font-medium">Positive Habits</p>
                        <p className="text-sm text-black/70">Activities you want to do more of (e.g., exercise, reading)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                      <div className="mt-1"><XCircle className="h-5 w-5 text-red-600" /></div>
                      <div>
                        <p className="font-medium">Negative Habits</p>
                        <p className="text-sm text-black/70">Activities you want to do less of or avoid (e.g., smoking, excessive social media)</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4">Each habit type has different tracking mechanisms to help you achieve your goals.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tracking" className="border border-black/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-black/70" />
                    <span>Tracking Your Progress</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">Habiter makes tracking your habits simple:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>For positive habits, mark each completion with the check button</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>For negative habits, reset the counter if you slip up</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Watch your streaks grow as you consistently maintain your habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Set frequency goals (daily, weekly, etc.) to stay on track</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="motivational" className="border border-black/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-black/70" />
                    <span>Motivational Messages</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">Habiter provides motivational messages to keep you inspired:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Sparkles className="h-4 w-4" /></div>
                      <span>AI-generated motivational quotes based on proven self-help principles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><RefreshCw className="h-4 w-4" /></div>
                      <span>Messages refresh automatically every 30 seconds to provide fresh inspiration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Focused on habit-building concepts like consistency, small steps, and identity-based change</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Heart className="h-4 w-4" /></div>
                      <span>Designed to provide actionable inspiration for your habit journey</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-black/5 rounded-md">
                    <p className="text-sm">
                      <strong>Pro Tip:</strong> Take a moment to reflect on the motivational message each time it changes. 
                      Consider how you can apply its wisdom to your current habits.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Features Guide</h2>
            </div>
            
            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <BarChart2 className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Statistics Page</CardTitle>
                  <CardDescription>Track your progress over time</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The Statistics page provides visual insights into your habit performance:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><LineChart className="h-4 w-4" /></div>
                    <span>View your overall completion rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><TrendingUp className="h-4 w-4" /></div>
                    <span>See your current streaks for all habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Calendar className="h-4 w-4" /></div>
                    <span>Track your activity over time (weekly, monthly, yearly)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><BarChart className="h-4 w-4" /></div>
                    <span>Identify patterns and trends in your habit performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <PlusCircle className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Adding & Editing Habits</CardTitle>
                  <CardDescription>Customize your habit tracking</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <PlusCircle className="h-5 w-5 text-black/70" />
                    <h3 className="font-medium">To add a new habit:</h3>
                  </div>
                  <ol className="space-y-2 pl-7 list-decimal">
                    <li>Click the "Add Habit" button on the dashboard</li>
                    <li>Enter a name and description for your habit</li>
                    <li>Select whether it's a positive or negative habit</li>
                    <li>Set your frequency goal (daily, specific days, etc.)</li>
                    <li>Save your new habit</li>
                  </ol>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Edit className="h-5 w-5 text-black/70" />
                    <h3 className="font-medium">To edit an existing habit:</h3>
                  </div>
                  <ol className="space-y-2 pl-7 list-decimal">
                    <li>Find the habit on your dashboard</li>
                    <li>Click the edit (pencil) icon</li>
                    <li>Make your changes</li>
                    <li>Save your updated habit</li>
                  </ol>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Trash2 className="h-5 w-5 text-black/70" />
                    <h3 className="font-medium">To delete a habit:</h3>
                  </div>
                  <ol className="space-y-2 pl-7 list-decimal">
                    <li>Go to the Settings page</li>
                    <li>Find the habit under "Habit Management"</li>
                    <li>Click the delete (trash) icon</li>
                    <li>Confirm the deletion in the dialog</li>
                  </ol>
                  <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-md flex items-start gap-2">
                    <div className="mt-0.5 text-red-500"><AlertTriangle className="h-4 w-4" /></div>
                    <p className="text-sm text-red-700">
                      This will permanently delete the habit and all its data
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Settings className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your profile</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The Settings page allows you to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Mail className="h-4 w-4" /></div>
                    <span>Update your email address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Key className="h-4 w-4" /></div>
                    <span>Change your password</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Settings className="h-4 w-4" /></div>
                    <span>Manage your habits - view and delete unwanted habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Bell className="h-4 w-4" /></div>
                    <span>Manage notification preferences <Badge variant="outline" className="ml-1 text-xs">Coming soon</Badge></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><UserX className="h-4 w-4" /></div>
                    <span>Delete your account if needed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-6 bg-black/10" />

          <section>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-black/70" />
              <h2 className="text-2xl font-light">Tips for Success</h2>
            </div>
            <Card className="border-black/10 overflow-hidden">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-5 w-5" /></div>
                    <div>
                      <strong>Start small:</strong> Begin with just 1-3 habits to avoid feeling overwhelmed
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Clock className="h-5 w-5" /></div>
                    <div>
                      <strong>Be consistent:</strong> Check in daily to track your progress
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><TrendingUp className="h-5 w-5" /></div>
                    <div>
                      <strong>Don't break the chain:</strong> Try to maintain your streaks for motivation
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><BarChart className="h-5 w-5" /></div>
                    <div>
                      <strong>Review your statistics:</strong> Use the data to identify patterns and make adjustments
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Heart className="h-5 w-5" /></div>
                    <div>
                      <strong>Be patient:</strong> Building new habits takes time, typically 21-66 days to form
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Sparkles className="h-5 w-5" /></div>
                    <div>
                      <strong>Find inspiration:</strong> Pay attention to the motivational messages and apply their wisdom to your habit journey
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Help; 