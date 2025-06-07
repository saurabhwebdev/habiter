import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  BarChart2,
  Calendar,
  Sparkles,
  DollarSign,
  Book,
  Clock,
  Flag,
  PlusCircle,
  MinusCircle,
  Menu,
  X,
  MoveRight
} from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-black/10 py-4">
        <div className="container px-4 mx-auto flex justify-between items-center">
          <img src="/habiterlogo.svg" alt="HabitFlow" height={32} style={{ height: 32, width: 'auto' }} />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-black text-white hover:bg-black/80 text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/10 py-4 px-4 flex flex-col gap-2">
            <Link to="/login" className="w-full">
              <Button variant="ghost" size="sm" className="w-full text-sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button size="sm" className="w-full bg-black text-white hover:bg-black/80 text-sm">
                Sign up
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 mb-12">
              <Badge className="bg-black text-white hover:bg-black/80 border-none">BACKED BY SCIENCE</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Transform your habits with <span className="relative inline-block">
                  <span className="relative z-10">data-driven</span>
                  <span className="absolute bottom-2 md:bottom-3 left-0 w-full h-3 bg-black/10 -z-10"></span>
                </span> tracking
              </h1>
              <p className="text-lg text-black/70 max-w-2xl mx-auto leading-relaxed">
                <strong>87%</strong> of users report better habit formation after 30 days of consistent tracking. Build positive habits, break negative ones, and see measurable change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-black text-white hover:bg-black/80 flex items-center gap-2 h-12 px-6">
                    Start for free <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/help" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-black/20 hover:bg-black/5 h-12 px-6">
                    See how it works
                  </Button>
                </Link>
              </div>
            </div>

            {/* Data-focused highlight cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10">
              <div className="flex flex-col items-center p-6 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow transition-shadow hover:border-black/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/5 mb-3">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <span className="text-4xl font-bold">21-66</span>
                <span className="text-sm text-black/60 text-center mt-1">Days to form a habit</span>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow transition-shadow hover:border-black/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/5 mb-3">
                  <TrendingUp className="h-6 w-6 text-black" />
                </div>
                <span className="text-4xl font-bold">68<span className="text-2xl">%</span></span>
                <span className="text-sm text-black/60 text-center mt-1">Higher success rate</span>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow transition-shadow hover:border-black/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/5 mb-3">
                  <DollarSign className="h-6 w-6 text-black" />
                </div>
                <span className="text-4xl font-bold">$1,825</span>
                <span className="text-sm text-black/60 text-center mt-1">Avg. yearly savings</span>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-white border border-black/10 rounded-lg shadow-sm hover:shadow transition-shadow hover:border-black/20">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black/5 mb-3">
                  <CheckCircle2 className="h-6 w-6 text-black" />
                </div>
                <span className="text-4xl font-bold">94<span className="text-2xl">%</span></span>
                <span className="text-sm text-black/60 text-center mt-1">User satisfaction</span>
              </div>
            </div>
            
            {/* Key features strip */}
            <div className="flex flex-wrap justify-center mt-12 mb-2 gap-y-4 gap-x-10 text-sm font-medium">
              <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                <Check size={18} className="text-black" />
                <span>Track positive & negative habits</span>
              </div>
              <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                <Check size={18} className="text-black" />
                <span>Gradual tapering for quitting</span>
              </div>
              <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                <Check size={18} className="text-black" />
                <span>Money saved calculations</span>
              </div>
              <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
                <Check size={18} className="text-black" />
                <span>Detailed analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-none mb-3">CORE FEATURES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Build better habits with proven tools</h2>
            <p className="text-white/70 text-lg">
              HabitFlow combines behavioral science with powerful tracking to help you create lasting change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-white/10 border-white/10 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-full">
                    <PlusCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <CardTitle>Build Positive Habits</CardTitle>
                </div>
                <CardDescription className="text-white/70">Create behaviors you want to establish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Set daily goals with one-tap tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Watch your streaks grow day by day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Visualize progress with detailed analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/10 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-full">
                    <MinusCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <CardTitle>Break Negative Habits</CardTitle>
                </div>
                <CardDescription className="text-white/70">Eliminate behaviors you want to reduce</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Set maximum daily limits to stay accountable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Use tapering to gradually reduce over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Track financial benefits of breaking habits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/10 text-white">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-full">
                    <BarChart2 className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle>Track Your Progress</CardTitle>
                </div>
                <CardDescription className="text-white/70">Visualize and understand your journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>See completion rates and streaks over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Identify patterns in your behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 text-green-400 shrink-0" />
                    <span>Journal thoughts and track mood alongside habits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-black/10 text-black hover:bg-black/20 border-none mb-3">INTUITIVE INTERFACE</Badge>
                <h2 className="text-3xl font-bold mb-4">Simple yet powerful habit tracking</h2>
                <p className="text-black/70 mb-6">
                  HabitFlow makes tracking your habits effortless with an intuitive interface designed for daily use.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Create your habits</p>
                      <p className="text-sm text-black/60">Start with just 1-3 habits you want to build or break</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Track daily</p>
                      <p className="text-sm text-black/60">Log your habits with a single tap at the same time each day</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Watch your progress</p>
                      <p className="text-sm text-black/60">See your streaks grow and analyze your performance</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="border border-black/10 shadow-sm hover:shadow transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-black text-white hover:bg-black/80 border-none">Positive</Badge>
                      <span className="text-xl">💧</span>
                    </div>
                    <CardTitle className="text-base mt-2">Drink Water</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium">5/8</p>
                        <div className="w-full bg-black/10 h-1.5 rounded-full mt-1.5 mb-1">
                          <div className="bg-black h-1.5 rounded-full" style={{ width: '62.5%' }}></div>
                        </div>
                        <p className="text-xs text-black/50">Today's progress</p>
                      </div>
                      <Button size="sm" className="h-8 w-8 rounded-full bg-black text-white hover:bg-black/80 p-0">+</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-black/10 shadow-sm hover:shadow transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-black text-white hover:bg-black/80 border-none">Negative</Badge>
                      <span className="text-xl">🚬</span>
                    </div>
                    <CardTitle className="text-base mt-2">Smoking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium">3/5</p>
                        <div className="w-full bg-black/10 h-1.5 rounded-full mt-1.5 mb-1">
                          <div className="bg-black h-1.5 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <p className="text-xs text-black/50">Limit remaining</p>
                      </div>
                      <Button size="sm" className="h-8 w-8 rounded-full bg-black text-white hover:bg-black/80 p-0">+</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-black/10 shadow-sm hover:shadow transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-black text-white hover:bg-black/80 border-none">Positive</Badge>
                      <span className="text-xl">📚</span>
                    </div>
                    <CardTitle className="text-base mt-2">Read 20 Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-lg font-medium">1/1</p>
                        <div className="w-full bg-black/10 h-1.5 rounded-full mt-1.5 mb-1">
                          <div className="bg-black h-1.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-black">
                          <Check size={12} />
                          <span>Completed</span>
                        </div>
                      </div>
                      <Button size="sm" className="h-8 w-8 rounded-full bg-black text-white hover:bg-black/80 p-0">+</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-black/10 shadow-sm hover:shadow transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-black text-white hover:bg-black/80 border-none">Challenge</Badge>
                      <span className="text-xl">🍫</span>
                    </div>
                    <CardTitle className="text-base mt-2">No Sugar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Day 15 of 30</span>
                        <span className="font-medium">50%</span>
                      </div>
                      <div className="w-full bg-black/10 h-1.5 rounded-full mb-2">
                        <div className="bg-black h-1.5 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-black">
                          <Check size={12} />
                          <span>On track</span>
                        </div>
                        <p className="text-xs text-black/50">15 days left</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-black/10 text-black hover:bg-black/20 border-none mb-3">HOW IT WORKS</Badge>
              <h2 className="text-3xl font-bold mb-4">Special features that make the difference</h2>
              <p className="text-black/70 max-w-2xl mx-auto">
                HabitFlow goes beyond basic habit tracking with powerful tools designed for lasting change.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-black/10 shadow-sm hover:shadow-md transition-all">
                <div className="bg-black/5 p-4 flex items-center gap-3 border-b border-black/10">
                  <TrendingUp className="h-6 w-6 text-black/70" />
                  <CardTitle className="text-lg">Goal Tapering</CardTitle>
                </div>
                <CardContent className="pt-6">
                  <p className="text-black/70 mb-4">
                    Gradually reduce negative habits until you quit completely:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Set a starting limit and target quit date</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Automatically calculate decreasing daily limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">More sustainable than quitting "cold turkey"</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-black/10 shadow-sm hover:shadow-md transition-all">
                <div className="bg-black/5 p-4 flex items-center gap-3 border-b border-black/10">
                  <DollarSign className="h-6 w-6 text-black/70" />
                  <CardTitle className="text-lg">Money Tracking</CardTitle>
                </div>
                <CardContent className="pt-6">
                  <p className="text-black/70 mb-4">
                    See the financial benefits of breaking expensive habits:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Track cost per occurrence for habits like smoking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Watch your savings accumulate daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Visualize financial impact with detailed charts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-black/10 shadow-sm hover:shadow-md transition-all">
                <div className="bg-black/5 p-4 flex items-center gap-3 border-b border-black/10">
                  <Flag className="h-6 w-6 text-black/70" />
                  <CardTitle className="text-lg">Fixed-Days Challenges</CardTitle>
                </div>
                <CardContent className="pt-6">
                  <p className="text-black/70 mb-4">
                    Perfect for specific challenges with definite endpoints:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Ideal for "30-day challenges" or "Dry January"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Track progress with a visual countdown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Celebrate completion with achievement tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-black/10 shadow-sm hover:shadow-md transition-all">
                <div className="bg-black/5 p-4 flex items-center gap-3 border-b border-black/10">
                  <Book className="h-6 w-6 text-black/70" />
                  <CardTitle className="text-lg">Habit Journal</CardTitle>
                </div>
                <CardContent className="pt-6">
                  <p className="text-black/70 mb-4">
                    Reflect on your journey and identify patterns:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Record thoughts, feelings, and triggers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Track mood alongside habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 text-black shrink-0" />
                      <span className="text-sm">Search entries to discover insights</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Success */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-black/10 text-black hover:bg-black/20 border-none mb-3">TIPS FOR SUCCESS</Badge>
              <h2 className="text-3xl font-bold mb-4">Science-backed strategies that work</h2>
              <p className="text-black/70 max-w-2xl mx-auto">
                Apply these proven principles to maximize your habit-building success.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <Clock className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Be consistent</h3>
                <p className="text-sm text-black/70">Log your habits at the same time each day to build a reliable routine that sticks.</p>
              </div>
              
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <Sparkles className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Start small</h3>
                <p className="text-sm text-black/70">Begin with just 1-3 habits to avoid overwhelming yourself and increase your chances of success.</p>
              </div>
              
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <TrendingUp className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Don't break the chain</h3>
                <p className="text-sm text-black/70">Try to maintain your streaks, but don't be discouraged by occasional slips. Just keep going.</p>
              </div>
              
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <Calendar className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Be patient</h3>
                <p className="text-sm text-black/70">Building new habits takes time, typically 21-66 days to form, so stick with it even when progress feels slow.</p>
              </div>
              
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <DollarSign className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Track your savings</h3>
                <p className="text-sm text-black/70">Use money tracking to see the financial benefits of breaking negative habits like smoking or impulse shopping.</p>
              </div>
              
              <div className="p-5 border border-black/10 rounded-lg bg-black/5 flex flex-col items-start">
                <Book className="h-8 w-8 text-black mb-4" />
                <h3 className="text-lg font-medium mb-2">Keep a journal</h3>
                <p className="text-sm text-black/70">Record your thoughts and feelings about your habits to gain deeper insights and increase your success rate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="bg-black/10 text-black hover:bg-black/20 border-none mb-3">SUCCESS STORIES</Badge>
            <h2 className="text-3xl font-bold mb-4">Real people, real results</h2>
            <p className="text-black/70">
              See how HabitFlow has helped people transform their lives through consistent habit building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-black/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black/10 mb-4 flex items-center justify-center">
                    <span className="text-2xl">👩</span>
                  </div>
                  <p className="text-black/80 mb-4 italic">
                    "I've tried dozens of habit trackers, but HabitFlow actually helped me stick with my meditation practice for over 100 days now. The simple interface makes daily tracking effortless."
                  </p>
                  <p className="font-medium">Sarah K.</p>
                  <p className="text-sm text-black/60">100+ day meditation streak</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-black/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black/10 mb-4 flex items-center justify-center">
                    <span className="text-2xl">👨</span>
                  </div>
                  <p className="text-black/80 mb-4 italic">
                    "The negative habit tracking helped me reduce my social media use from 3+ hours to just 30 minutes daily. I've reclaimed so much time for reading and exercise."
                  </p>
                  <p className="font-medium">Michael T.</p>
                  <p className="text-sm text-black/60">Reduced screen time by 85%</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-black/10">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black/10 mb-4 flex items-center justify-center">
                    <span className="text-2xl">👩‍🦱</span>
                  </div>
                  <p className="text-black/80 mb-4 italic">
                    "The 30-day challenge feature helped me complete a full month of daily workouts. The visual progress bars kept me motivated throughout the entire journey."
                  </p>
                  <p className="font-medium">Jessica M.</p>
                  <p className="text-sm text-black/60">Completed 30-day fitness challenge</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your habits?</h2>
            <p className="text-white/70 text-lg">
              Join thousands of people building better habits with HabitFlow. Start for free today.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white text-black hover:bg-white/90 flex items-center gap-2 h-12 px-6">
                  Start for free <MoveRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-4">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <img src="/habiterlogo.svg" alt="HabitFlow" height={20} style={{ height: 20, width: 'auto' }} />
              {/* <p className="text-black/50 text-xs">
                © 2024 HabitFlow
              </p> */}
            </div>
            <div className="flex gap-4 text-xs text-black/70">
              <Link to="/privacy" className="hover:text-black transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-black transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
