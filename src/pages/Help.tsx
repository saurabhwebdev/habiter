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
  RefreshCw,
  DollarSign,
  Book,
  Pencil,
  Filter,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Archive,
  Trophy,
  Medal
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
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Archive className="h-4 w-4" /></div>
                      <span>Access the Archive page from the navbar to view and manage archived habits</span>
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
                        <p className="text-sm text-black/70 mt-1">For negative habits, you can enable <strong>tapering</strong> to gradually reduce your goal over time until you quit completely.</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4">Each habit type has different tracking mechanisms to help you achieve your goals.</p>
                  <div className="mt-4 p-3 bg-black/5 rounded-md">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5"><Archive className="h-4 w-4 text-black/70" /></div>
                      <p className="text-sm">
                        <strong>Habit Organization:</strong> You can archive habits you've completed or want to temporarily pause tracking. Archived habits can be viewed in the Archive page and restored at any time.
                      </p>
                    </div>
                  </div>
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
                      <span>For negative habits, track occurrences and stay below your daily limit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>With tapering enabled, your daily limit for negative habits will automatically decrease over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Watch your streaks grow as you consistently maintain your habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Flag className="h-4 w-4" /></div>
                      <span>Set fixed-day goals to track habits for a specific duration (e.g., 30-day challenges)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><DollarSign className="h-4 w-4" /></div>
                      <span>Track money saved by reducing negative habits like smoking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Trophy className="h-4 w-4" /></div>
                      <span>Earn points for completing habits and compete on the leaderboard</span>
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

              <AccordionItem value="leaderboard" className="border border-black/10 rounded-lg overflow-hidden">
                <AccordionTrigger className="text-lg font-medium px-4 hover:bg-black/5 [&[data-state=open]]:bg-black/5">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-black/70" />
                    <span>Leaderboard & Points</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2 pb-4 bg-white">
                  <p className="mb-4">Habiter includes a competitive element to keep you motivated:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Earn points every time you complete a positive habit or avoid a negative one</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><TrendingUp className="h-4 w-4" /></div>
                      <span>Get bonus points for maintaining streaks (7, 30, and 100 days)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Trophy className="h-4 w-4" /></div>
                      <span>Compare your progress with other users on the leaderboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><Medal className="h-4 w-4" /></div>
                      <span>Special badges for top performers (gold, silver, bronze)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                      <span>Access the leaderboard from the main navigation menu</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-black/5 rounded-md">
                    <p className="text-sm">
                      <strong>Pro Tip:</strong> Use the leaderboard as extra motivation to stay consistent with your habits. 
                      Invite friends to join and create a friendly competition!
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
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><DollarSign className="h-4 w-4" /></div>
                    <span>View total money saved from reducing negative habits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Money Tracking</CardTitle>
                  <CardDescription>Save money by breaking negative habits</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  Track the financial benefits of breaking negative habits:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Enable money tracking when creating or editing a negative habit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Set the cost per unit (e.g., cost per cigarette or alcoholic drink)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Choose your preferred currency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>See daily and total money saved on your habit cards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>View money saved charts on the Statistics page</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Use the money saved as motivation to continue your habit-breaking journey. 
                    Consider setting aside the saved money for a reward when you reach a milestone.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Flag className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Fixed-Days Tracking</CardTitle>
                  <CardDescription>Track habits for a specific duration</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The fixed-days feature helps you track habits with a specific duration goal:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Enable fixed-days tracking when creating or editing a habit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Set a target number of days (e.g., "no sugar for 30 days")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Choose a start date for your tracking period</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Track your progress with a visual progress bar showing days completed and remaining</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Get notified when you complete your fixed-days challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Extend your goal with additional days when you reach your target</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Fixed-days tracking is perfect for habit challenges like "Dry January," "No-Sugar November," or "30-Day Fitness Challenge." Use it to set concrete goals with definite endpoints.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Archive className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Habit Archiving</CardTitle>
                  <CardDescription>Keep your dashboard focused and organized</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The archiving feature helps you manage completed or paused habits:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Archive habits you've completed or temporarily don't want to track</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Keep your active dashboard clean and focused on current habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Fixed-days habits can be automatically archived upon completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>View all archived habits in the Archive page</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Unarchive habits at any time to resume tracking them</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Use archiving for seasonal habits (like "Rake leaves") or for habits you've successfully incorporated into your lifestyle and no longer need to actively track.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Goal Tapering</CardTitle>
                  <CardDescription>Gradually reduce negative habits until you quit</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The tapering feature helps you gradually reduce negative habits over time:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Enable tapering when creating or editing a negative habit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Set a starting limit (e.g., maximum 5 cigarettes per day)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Choose a target date to reach your goal (typically zero)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>The system automatically calculates a gradually decreasing daily limit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Track your tapering progress with a visual progress bar</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Tapering is often more effective than quitting "cold turkey" because it gives your body and mind time to adjust. It also provides a structured approach with clear milestones along the way.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Book className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Journal</CardTitle>
                  <CardDescription>Record your habit journey</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The Journal feature helps you reflect on your habits and track your emotional journey:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Pencil className="h-4 w-4" /></div>
                    <span>Record detailed journal entries about your habits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><ThumbsUp className="h-4 w-4" /></div>
                    <span>For positive habits, track your motivations and celebrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><ThumbsDown className="h-4 w-4" /></div>
                    <span>For negative habits, monitor triggers, cravings, and urge levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Track your mood alongside each habit entry</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Filter className="h-4 w-4" /></div>
                    <span>Filter and search your journal history to identify patterns</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Journaling about your habits can double their effectiveness by making you more conscious of your behaviors and triggers. Try to journal regularly, especially when you struggle with a habit.
                  </p>
                </div>
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

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Heart className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Habit Setup Examples</CardTitle>
                  <CardDescription>Real-world examples to help you get started</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-6">
                  Here are step-by-step examples of how to set up different types of habits:
                </p>

                <div className="space-y-8">
                  {/* Example 1: Basic Positive Habit */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-green-50 p-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Daily Exercise (Basic Positive Habit)</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2 pl-7 list-decimal text-sm">
                        <li>Click "Add Habit" on the dashboard</li>
                        <li>Enter "Daily Exercise" as the name</li>
                        <li>Add a description: "30 minutes of physical activity"</li>
                        <li>Select <strong>Positive Habit</strong> type</li>
                        <li>Set goal type to <strong>Minimum</strong> with a daily goal of <strong>1</strong></li>
                        <li>Select <strong>All Days</strong> for frequency</li>
                        <li>Click "Save"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-green-50 rounded-md">
                        <p className="text-sm">
                          <strong>How to use:</strong> Each day after exercising, click the check button on your habit card to log your activity. Try to maintain your streak by not missing days.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example 2: Negative Habit with Tapering */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-red-50 p-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <h3 className="font-medium">Reduce Social Media (Negative Habit with Tapering)</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2 pl-7 list-decimal text-sm">
                        <li>Click "Add Habit" on the dashboard</li>
                        <li>Enter "Social Media Usage" as the name</li>
                        <li>Add a description: "Limit time spent on social media apps"</li>
                        <li>Select <strong>Negative Habit</strong> type</li>
                        <li>Set goal type to <strong>Maximum</strong> with a starting limit of <strong>10</strong> (sessions per day)</li>
                        <li>Enable <strong>Tapering</strong></li>
                        <li>Set a target date 30 days from now</li>
                        <li>Set target goal to <strong>2</strong> (allowing yourself just 2 sessions per day)</li>
                        <li>Select <strong>All Days</strong> for frequency</li>
                        <li>Click "Save"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-red-50 rounded-md">
                        <p className="text-sm">
                          <strong>How to use:</strong> Each time you check social media, log it by clicking the plus button. The app will automatically decrease your daily limit over time until you reach your target of 2 sessions per day.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example 3: Fixed-Days Challenge */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-blue-50 p-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-blue-600" />
                        <h3 className="font-medium">30-Day No Sugar Challenge (Fixed-Days Habit)</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2 pl-7 list-decimal text-sm">
                        <li>Click "Add Habit" on the dashboard</li>
                        <li>Enter "No Sugar Challenge" as the name</li>
                        <li>Add a description: "Avoid all added sugars for 30 days"</li>
                        <li>Select <strong>Negative Habit</strong> type (since you're avoiding sugar)</li>
                        <li>Set goal type to <strong>Maximum</strong> with a daily limit of <strong>0</strong></li>
                        <li>Enable <strong>Fixed Days Tracking</strong></li>
                        <li>Set the target to <strong>30 days</strong></li>
                        <li>Choose today as your start date</li>
                        <li>Select <strong>All Days</strong> for frequency</li>
                        <li>Click "Save"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm">
                          <strong>How to use:</strong> Each day you successfully avoid sugar, the app will track your progress toward the 30-day goal. If you consume sugar, log it and your streak will reset. When you complete 30 days, you'll have the option to extend the challenge or archive it.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example 4: Money-Saving Habit */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-emerald-50 p-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        <h3 className="font-medium">Quit Smoking (Money-Tracking Habit)</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2 pl-7 list-decimal text-sm">
                        <li>Click "Add Habit" on the dashboard</li>
                        <li>Enter "Quit Smoking" as the name</li>
                        <li>Add a description: "Reduce and eliminate cigarette consumption"</li>
                        <li>Select <strong>Negative Habit</strong> type</li>
                        <li>Set goal type to <strong>Maximum</strong> with a starting limit of how many cigarettes you currently smoke daily</li>
                        <li>Enable <strong>Tapering</strong> and set a quit date 8 weeks from now with a target of 0</li>
                        <li>Enable <strong>Money Tracking</strong></li>
                        <li>Enter the cost per cigarette (e.g., $0.50) and select your currency</li>
                        <li>Select <strong>All Days</strong> for frequency</li>
                        <li>Click "Save"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-emerald-50 rounded-md">
                        <p className="text-sm">
                          <strong>How to use:</strong> Each time you smoke, log it by clicking the plus button. The app will show you how much money you're saving compared to your previous consumption. You'll see both daily savings and total money saved since you started reducing.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Example 5: Habit with Specific Days */}
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-purple-50 p-4 border-b border-black/10">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <h3 className="font-medium">Gym Workout (Specific Days Habit)</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <ol className="space-y-2 pl-7 list-decimal text-sm">
                        <li>Click "Add Habit" on the dashboard</li>
                        <li>Enter "Gym Workout" as the name</li>
                        <li>Add a description: "Strength training routine"</li>
                        <li>Select <strong>Positive Habit</strong> type</li>
                        <li>Set goal type to <strong>Minimum</strong> with a daily goal of <strong>1</strong></li>
                        <li>Select <strong>Specific Days</strong> for frequency</li>
                        <li>Choose Monday, Wednesday, and Friday</li>
                        <li>Click "Save"</li>
                      </ol>
                      <div className="mt-4 p-3 bg-purple-50 rounded-md">
                        <p className="text-sm">
                          <strong>How to use:</strong> You'll only need to log this habit on your selected days. The streak and progress tracking will take into account that you're only expected to do this habit three times per week, not daily.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-black/10 mb-6 overflow-hidden">
              <div className="bg-black/5 p-4 flex items-center gap-3">
                <Trophy className="h-6 w-6 text-black/70" />
                <div>
                  <CardTitle>Leaderboard & Points</CardTitle>
                  <CardDescription>Track your progress against other users</CardDescription>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-black/70 mb-4">
                  The leaderboard feature adds a competitive element to your habit journey:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Earn points for completing your habits and maintaining streaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>See how you rank against other users on the leaderboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>View the top 20 users with the highest points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><CheckCircle2 className="h-4 w-4" /></div>
                    <span>Track your personal stats including total points and current rank</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-black/70"><Trophy className="h-4 w-4" /></div>
                    <span>Special badges for top performers (gold, silver, and bronze rankings)</span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-black/5 rounded-md">
                  <p className="text-sm">
                    <strong>Pro Tip:</strong> Use the leaderboard as motivation to stay consistent with your habits. Compete with friends by inviting them to join Habiter and see who can earn the most points!
                  </p>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">How Points Are Earned</h4>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-black/5 rounded-md">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                        <div>
                          <p className="font-medium">Completing Positive Habits</p>
                          <p className="text-black/70">Earn 10 points each time you complete a positive habit</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-black/5 rounded-md">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5"><XCircle className="h-4 w-4 text-red-600" /></div>
                        <div>
                          <p className="font-medium">Avoiding Negative Habits</p>
                          <p className="text-black/70">Earn 10 points each day you stay under your maximum limit for negative habits</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-black/5 rounded-md">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5"><TrendingUp className="h-4 w-4 text-blue-600" /></div>
                        <div>
                          <p className="font-medium">Streak Bonuses</p>
                          <p className="text-black/70">Earn bonus points for maintaining streaks:</p>
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>7-day streak: 50 bonus points</li>
                            <li>30-day streak: 200 bonus points</li>
                            <li>100-day streak: 500 bonus points</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-black/5 rounded-md">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5"><Flag className="h-4 w-4 text-amber-600" /></div>
                        <div>
                          <p className="font-medium">Completing Fixed-Day Challenges</p>
                          <p className="text-black/70">Earn 100 points when you successfully complete a fixed-day challenge</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Using the Leaderboard</h4>
                  <ol className="space-y-3 list-decimal pl-5">
                    <li className="text-black/70">
                      <span className="font-medium text-black">Access the leaderboard</span> by clicking on the "Leaderboard" link in the main navigation menu
                    </li>
                    <li className="text-black/70">
                      <span className="font-medium text-black">View your stats</span> at the top of the page, including your current rank and total points
                    </li>
                    <li className="text-black/70">
                      <span className="font-medium text-black">See top performers</span> in the leaderboard list below your stats
                    </li>
                    <li className="text-black/70">
                      <span className="font-medium text-black">Identify ranking badges</span> - gold trophy for 1st place, silver medal for 2nd place, bronze medal for 3rd place, and blue award icons for other top 20 positions
                    </li>
                    <li className="text-black/70">
                      <span className="font-medium text-black">Track your progress</span> over time as you earn more points and climb the rankings
                    </li>
                  </ol>
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start gap-2">
                    <div className="mt-0.5 text-amber-500"><Trophy className="h-4 w-4" /></div>
                    <p className="text-sm text-amber-700">
                      The leaderboard updates in real-time as you and other users complete habits and earn points. Check back regularly to see your progress!
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
                      <strong>Start small:</strong> Begin with 1-3 habits to avoid overwhelming yourself
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Clock className="h-5 w-5" /></div>
                    <div>
                      <strong>Be consistent:</strong> Log your habits at the same time each day
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><AlertTriangle className="h-5 w-5" /></div>
                    <div>
                      <strong>Don't break the chain:</strong> Try to maintain your streaks, but don't be discouraged by occasional slips
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Heart className="h-5 w-5" /></div>
                    <div>
                      <strong>Be patient:</strong> Building new habits takes time, typically 21-66 days to form
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Flag className="h-5 w-5" /></div>
                    <div>
                      <strong>Use fixed-days for challenges:</strong> When you want to build a temporary habit or complete a specific challenge, use the fixed-days tracking feature
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Archive className="h-5 w-5" /></div>
                    <div>
                      <strong>Declutter with archiving:</strong> Keep your dashboard focused by archiving completed or temporarily paused habits
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Sparkles className="h-5 w-5" /></div>
                    <div>
                      <strong>Find inspiration:</strong> Pay attention to the motivational messages and apply their wisdom to your habit journey
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><DollarSign className="h-5 w-5" /></div>
                    <div>
                      <strong>Track your savings:</strong> Use money tracking to see the financial benefits of breaking negative habits
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><TrendingUp className="h-5 w-5" /></div>
                    <div>
                      <strong>Use tapering for negative habits:</strong> Instead of quitting cold turkey, use the tapering feature to gradually reduce your limit until you quit completely
                    </div>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-md bg-black/5">
                    <div className="mt-1 text-black/70"><Book className="h-5 w-5" /></div>
                    <div>
                      <strong>Keep a journal:</strong> Record your thoughts and feelings about your habits to gain deeper insights and increase success
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