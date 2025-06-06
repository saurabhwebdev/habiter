import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Save, Trash2, AlertTriangle, InfoIcon } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { habitService } from '@/lib/habitService';
import { Habit } from '@/types/habit';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from '@/lib/supabase';

const Settings = () => {
  const { user, updateEmail, updatePassword, signOut } = useAuth();
  
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);
  const [habitToDelete, setHabitToDelete] = useState<Habit | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Fetch habits on component mount
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoadingHabits(true);
        const habitsData = await habitService.getHabits();
        setHabits(habitsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load habits",
          variant: "destructive",
        });
      } finally {
        setIsLoadingHabits(false);
      }
    };
    
    fetchHabits();
  }, []);

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Email cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUpdatingEmail(true);
      await updateEmail(email);
      toast({
        title: "Success",
        description: "Email updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update email",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUpdatingPassword(true);
      await updatePassword(currentPassword, newPassword);
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };
  
  const handleDeleteHabit = async () => {
    if (!habitToDelete) return;
    
    try {
      setIsDeleting(true);
      await habitService.deleteHabit(habitToDelete.id);
      setHabits(habits.filter(h => h.id !== habitToDelete.id));
      toast({
        title: "Success",
        description: `${habitToDelete.name} has been deleted`,
      });
      setHabitToDelete(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete habit",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast({
        title: "Error",
        description: "Please type DELETE to confirm",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsDeletingAccount(true);
      
      // First delete habits (which will cascade to logs, streaks, etc.)
      await Promise.all(habits.map(habit => habitService.deleteHabit(habit.id)));
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!user || !user.id) {
        throw new Error('You must be logged in to delete your account');
      }
      
      // Call our Edge Function to properly delete the user account
      const response = await fetch('https://yfhfjeknlapdbzrvlfre.supabase.co/functions/v1/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaGZqZWtubGFwZGJ6cnZsZnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA5NjQsImV4cCI6MjA2NDc2Njk2NH0.jCbYeYOlQk6FN0xsyogMUi-SXSZRAlkO9UiqNcQDoXI'}`
        },
        body: JSON.stringify({
          userId: user.id
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error('Delete account error details:', result);
        throw new Error(result.error || 'Failed to delete account');
      }
      
      // Sign out locally
      await signOut();
      
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
      
      // Redirect to home page
      window.location.href = '/';
      
    } catch (error: any) {
      console.error('Error deleting account:', error);
      
      toast({
        title: "Error",
        description: error.message || "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteAccountDialog(false);
    }
  };

  return (
    <Layout>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Account Settings Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">Account Settings</h2>
            
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Email Address</CardTitle>
                <CardDescription>Update your email address</CardDescription>
              </CardHeader>
              <form onSubmit={handleEmailUpdate}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-black/20 focus:border-black"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-black text-white hover:bg-black/90"
                    disabled={isUpdatingEmail || email === user?.email}
                  >
                    {isUpdatingEmail ? "Updating..." : "Update Email"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Separator className="my-6 bg-black/10" />

            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordUpdate}>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="border-black/20 focus:border-black"
                        placeholder="Current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border-black/20 focus:border-black"
                        placeholder="New password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-black/20 focus:border-black"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-black text-white hover:bg-black/90"
                    disabled={isUpdatingPassword || !currentPassword || !newPassword || !confirmPassword}
                  >
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          {/* Habit Management Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">Habit Management</h2>
            
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Manage Habits</CardTitle>
                <CardDescription>View and delete your habits</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHabits ? (
                  <div className="py-4 text-center text-black/70">Loading habits...</div>
                ) : habits.length === 0 ? (
                  <div className="py-4 text-center text-black/70">You don't have any habits yet</div>
                ) : (
                  <div className="space-y-4">
                    {habits.map((habit) => (
                      <div 
                        key={habit.id} 
                        className="flex items-center justify-between p-3 border border-black/10 rounded-md"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{habit.icon || '📝'}</span>
                          <div>
                            <p className="font-medium">{habit.name}</p>
                            <p className="text-xs text-black/70">
                              {habit.type === 'positive' ? 'Positive' : 'Negative'} • 
                              Goal: {habit.daily_goal} {habit.unit}{habit.daily_goal > 1 ? 's' : ''} per day
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setHabitToDelete(habit)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* App Preferences Section */}
          <div>
            <h2 className="text-2xl font-light mb-6">App Preferences</h2>
            
            <Card className="border-black/10">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Coming soon</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black/70">
                  Push notification preferences will be available in a future update. Stay tuned!
                </p>
                <div className="mt-4 flex items-center space-x-2 bg-blue-50 text-blue-800 p-3 rounded-md">
                  <InfoIcon className="h-4 w-4" />
                  <p className="text-sm">We're working on bringing you timely reminders for your habits.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-2xl font-light mb-6 text-red-600">Danger Zone</h2>
            
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-black/70">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => setShowDeleteAccountDialog(true)}
                >
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Delete Habit Confirmation Dialog */}
      <AlertDialog open={!!habitToDelete} onOpenChange={(open) => !open && setHabitToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Habit
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{habitToDelete?.name}</strong>? This action cannot be undone
              and will remove all associated logs and streak data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-black/20">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteHabit}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Habit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-4">
                Are you sure you want to delete your account? This action <strong>cannot be undone</strong>.
                All your data, including habits, logs, and streaks will be permanently deleted.
              </p>
              <div className="bg-red-50 p-3 rounded-md text-red-800 mb-4">
                <p className="text-sm font-medium">To confirm, type "DELETE" in the field below:</p>
              </div>
              <Input
                className="border-red-300 focus:border-red-500"
                placeholder="Type DELETE to confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-black/20">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={isDeletingAccount || deleteConfirmText !== 'DELETE'}
            >
              {isDeletingAccount ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Settings; 