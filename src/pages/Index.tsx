import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-black/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Habiter</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline" className="border-black/20 hover:bg-black hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-black text-white hover:bg-black/90">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-light tracking-wide">
              Build better habits, one tap at a time
            </h2>
            <p className="text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              Track, reduce bad habits, and build good ones with our simple, minimalist approach
            </p>
          </div>

          <div className="pt-8">
            <Link to="/signup">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="track" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="track">Tap-to-Track</TabsTrigger>
              <TabsTrigger value="chr">CHR System</TabsTrigger>
              <TabsTrigger value="streak">Streak Tracking</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="track" className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium mb-2">Effortless Habit Tracking</h3>
              <p className="text-black/70 max-w-2xl mx-auto">
                Track your habits with a single tap. Whether you're reducing cigarettes or increasing water intake, our simple interface makes logging effortless.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-black/10">
                <CardHeader>
                  <Badge className="w-fit bg-black text-white hover:bg-black/90">Positive Habit</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <span>💧</span> Drink Water
                  </CardTitle>
                  <CardDescription>Goal: Min 8 glasses daily</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-medium">5/8</p>
                      <p className="text-xs text-black/50">Today's progress</p>
                    </div>
                    <Button size="icon" className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/90">+</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10">
                <CardHeader>
                  <Badge className="w-fit bg-black text-white hover:bg-black/90">Negative Habit</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <span>🚬</span> Smoking
                  </CardTitle>
                  <CardDescription>Goal: Max 5 cigarettes daily</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-medium">3/5</p>
                      <p className="text-xs text-black/50">Today's progress</p>
                    </div>
                    <Button size="icon" className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/90">+</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10">
                <CardHeader>
                  <Badge className="w-fit bg-black text-white hover:bg-black/90">Positive Habit</Badge>
                  <CardTitle className="flex items-center gap-2">
                    <span>🚶</span> Walking
                  </CardTitle>
                  <CardDescription>Goal: Min 30 minutes daily</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-medium">15/30</p>
                      <p className="text-xs text-black/50">Today's progress</p>
                    </div>
                    <Button size="icon" className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/90">+</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="chr" className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium mb-2">Cue-Habit-Reward System</h3>
              <p className="text-black/70 max-w-2xl mx-auto">
                Understand the triggers behind your habits and the rewards they provide to create lasting behavior change.
              </p>
            </div>
            
            <Card className="border border-black/10 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🚬</span> Smoking CHR Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 border border-black/10 rounded-md">
                    <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Cue</h4>
                    <p className="mt-2">Feeling stressed at work</p>
                  </div>
                  <div className="p-4 border border-black/10 rounded-md">
                    <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Habit</h4>
                    <p className="mt-2">Smoke a cigarette</p>
                  </div>
                  <div className="p-4 border border-black/10 rounded-md">
                    <h4 className="text-sm font-medium uppercase tracking-wide text-black/70">Reward</h4>
                    <p className="mt-2">Temporary relief from stress</p>
                  </div>
                </div>
                <p className="text-sm text-black/70 mt-4">
                  By understanding this pattern, you can develop alternative responses to the same cue that provide similar rewards.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="streak" className="space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium mb-2">Streak Tracking</h3>
              <p className="text-black/70 max-w-2xl mx-auto">
                Build momentum and stay motivated with visual streak tracking for each of your habits.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>💧</span> Water Intake
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-light">🔥</span>
                    <p className="text-3xl font-medium mt-2">7 Days</p>
                    <p className="text-sm text-black/70">Current Streak</p>
                  </div>
                  <p className="text-xs text-black/50">Longest streak: 14 days</p>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🚬</span> Smoking Reduction
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-light">🔥</span>
                    <p className="text-3xl font-medium mt-2">5 Days</p>
                    <p className="text-sm text-black/70">Current Streak</p>
                  </div>
                  <p className="text-xs text-black/50">Longest streak: 10 days</p>
                </CardContent>
              </Card>
              
              <Card className="border border-black/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>🚶</span> Daily Walking
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-light">🔥</span>
                    <p className="text-3xl font-medium mt-2">3 Days</p>
                    <p className="text-sm text-black/70">Current Streak</p>
                  </div>
                  <p className="text-xs text-black/50">Longest streak: 21 days</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Features Overview */}
      <section className="bg-black/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-medium text-center mb-12">Key Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-black flex items-center justify-center text-white rounded-full">
                <span className="text-xl">👆</span>
              </div>
              <h4 className="text-lg font-medium">Tap-to-Track</h4>
              <p className="text-black/60">Log habits with a single tap for effortless tracking</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-black flex items-center justify-center text-white rounded-full">
                <span className="text-xl">🧠</span>
              </div>
              <h4 className="text-lg font-medium">CHR System</h4>
              <p className="text-black/60">Understand the psychology behind your habits</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-black flex items-center justify-center text-white rounded-full">
                <span className="text-xl">🔥</span>
              </div>
              <h4 className="text-lg font-medium">Streaks</h4>
              <p className="text-black/60">Build momentum with visual streak tracking</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-black flex items-center justify-center text-white rounded-full">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="text-lg font-medium">Insights</h4>
              <p className="text-black/60">Track progress with weekly and monthly trends</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-light">Ready to transform your habits?</h3>
          <p className="text-black/70 max-w-2xl mx-auto">
            Join Habiter today and start building better habits, one day at a time.
          </p>
          <div className="pt-4">
            <Link to="/signup">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 px-8">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-black/50 text-sm">
              © 2024 Habiter. Build better habits, one day at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
