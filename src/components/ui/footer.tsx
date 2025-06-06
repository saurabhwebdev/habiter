import React, { useState } from 'react';
import { Heart, MessageSquare, Bug, Lightbulb, ArrowUpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Define the feedback form schema
const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  feedback_type: z.enum(['general', 'bug', 'feature_request', 'improvement'], {
    required_error: "Please select a feedback type",
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const Footer = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: '',
      email: '',
      feedback_type: 'general',
      message: '',
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Insert feedback into Supabase
      const { error } = await supabase
        .from('feedback')
        .insert([
          { 
            name: data.name,
            email: data.email,
            feedback_type: data.feedback_type,
            message: data.message,
          },
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
      });
      
      form.reset();
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const feedbackTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4" />;
      case 'feature_request':
        return <Lightbulb className="h-4 w-4" />;
      case 'improvement':
        return <ArrowUpCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <>
      <footer className="border-t border-black/10 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-sm text-black/70">
              Made with <Heart className="inline-block h-4 w-4 text-red-500 fill-red-500" /> in India 
              <span className="ml-1">🇮🇳</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-sm text-black/70"
              onClick={() => setShowFeedbackForm(true)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Feedback
            </Button>
          </div>
        </div>
      </footer>

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackForm} onOpenChange={setShowFeedbackForm}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <div className="absolute right-4 top-4 z-50">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 rounded-full p-0 hover:bg-black/10"
              onClick={() => setShowFeedbackForm(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4 pr-8">
            <DialogTitle>Send Feedback</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="border-black/20 focus:border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Your email address" 
                        {...field} 
                        className="border-black/20 focus:border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Feedback Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-black/5">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general" className="flex items-center cursor-pointer">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            General Feedback
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-black/5">
                          <RadioGroupItem value="bug" id="bug" />
                          <Label htmlFor="bug" className="flex items-center cursor-pointer">
                            <Bug className="h-4 w-4 mr-2" />
                            Report Bug
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-black/5">
                          <RadioGroupItem value="feature_request" id="feature_request" />
                          <Label htmlFor="feature_request" className="flex items-center cursor-pointer">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Feature Request
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-black/5">
                          <RadioGroupItem value="improvement" id="improvement" />
                          <Label htmlFor="improvement" className="flex items-center cursor-pointer">
                            <ArrowUpCircle className="h-4 w-4 mr-2" />
                            Improvement
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormDescription>
                      {form.watch('feedback_type') === 'bug' 
                        ? 'Please describe the bug in detail. Include steps to reproduce if possible.' 
                        : form.watch('feedback_type') === 'feature_request'
                        ? 'Describe the feature you would like to see added to the app.'
                        : form.watch('feedback_type') === 'improvement'
                        ? 'Describe how we can improve an existing feature.'
                        : 'Share your thoughts, suggestions, or general feedback.'}
                    </FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder={
                          form.watch('feedback_type') === 'bug' 
                            ? 'I encountered a bug when...' 
                            : form.watch('feedback_type') === 'feature_request'
                            ? 'I would like to suggest a feature that...'
                            : form.watch('feedback_type') === 'improvement'
                            ? 'I think this feature could be improved by...'
                            : 'I wanted to share my thoughts about...'
                        }
                        {...field} 
                        className="border-black/20 focus:border-black min-h-[150px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="submit" 
                  className="bg-black text-white hover:bg-black/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}; 