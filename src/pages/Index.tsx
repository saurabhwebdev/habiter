import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-black/5 py-4">
        <div className="container px-4 mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HabitFlow</h1>
          <div className="flex gap-2">
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
      </header>

      {/* Hero Section - Simplified */}
      <section className="container px-4 mx-auto py-10 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <Badge className="bg-black/10 text-black hover:bg-black/20 border-none">Track. Build. Improve.</Badge>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            Better habits, <span className="text-black/50">better life</span>
          </h2>
          <p className="text-base text-black/70 max-w-md leading-relaxed">
            Simple, minimal habit tracking to help you build good habits and break bad ones.
          </p>
          <Link to="/signup" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-black text-white hover:bg-black/80 mt-2 flex items-center gap-2">
              Get started <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section - Mobile First */}
      <section className="py-10 md:py-16 bg-black/5">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-medium">How it works</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mb-2">
                  <span>1</span>
                </div>
                <CardTitle className="text-lg">Track daily</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-black/70">
                Simple one-tap tracking for both positive and negative habits. Just tap to log your progress.
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mb-2">
                  <span>2</span>
                </div>
                <CardTitle className="text-lg">Build streaks</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-black/70">
                Watch your streaks grow day by day. Stay motivated with visual progress indicators.
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white mb-2">
                  <span>3</span>
                </div>
                <CardTitle className="text-lg">See insights</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-black/70">
                Understand your patterns with simple analytics that help you improve over time.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Habits Section */}
      <section className="container px-4 mx-auto py-10 md:py-16">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-medium mb-2">Simple habit tracking</h3>
          <p className="text-black/70 text-sm max-w-md mx-auto">
            Track both good habits you want to build and bad habits you want to break
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Card className="border border-black/5 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Positive</Badge>
                <span className="text-xl">💧</span>
              </div>
              <CardTitle className="text-base mt-2">Drink Water</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">5/8</p>
                  <div className="w-full bg-black/10 h-1.5 rounded-full mt-1.5 mb-1">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '62.5%' }}></div>
                  </div>
                  <p className="text-xs text-black/50">Today's progress</p>
                </div>
                <Button size="sm" className="h-8 w-8 rounded-full bg-green-500 text-white hover:bg-green-600 p-0">+</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-black/5 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Negative</Badge>
                <span className="text-xl">🚬</span>
              </div>
              <CardTitle className="text-base mt-2">Smoking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">3/5</p>
                  <div className="w-full bg-black/10 h-1.5 rounded-full mt-1.5 mb-1">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-black/50">Today's progress</p>
                </div>
                <Button size="sm" className="h-8 w-8 rounded-full bg-red-500 text-white hover:bg-red-600 p-0">+</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials/Benefits */}
      <section className="bg-black text-white py-10 md:py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-medium">Why people love HabitFlow</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <p className="font-medium">Simple tracking</p>
              </div>
              <p className="text-sm text-white/70 pl-6">No complicated features, just what you need</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <p className="font-medium">Motivational insights</p>
              </div>
              <p className="text-sm text-white/70 pl-6">Stay motivated with streaks and progress tracking</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <p className="font-medium">Habit psychology</p>
              </div>
              <p className="text-sm text-white/70 pl-6">Built on proven behavioral science principles</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto py-10 md:py-16">
        <div className="max-w-md mx-auto text-center space-y-4">
          <h3 className="text-xl md:text-2xl font-medium">Ready to start?</h3>
          <p className="text-sm text-black/70">
            Join thousands of people building better habits with HabitFlow
          </p>
          <div className="pt-2 flex justify-center">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-black text-white hover:bg-black/80">
                Create free account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-black/50 text-sm">
              © 2024 HabitFlow
            </p>
            <div className="flex gap-4 text-sm text-black/70">
              <Link to="/privacy" className="hover:text-black">Privacy</Link>
              <Link to="/terms" className="hover:text-black">Terms</Link>
              <Link to="/help" className="hover:text-black">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
