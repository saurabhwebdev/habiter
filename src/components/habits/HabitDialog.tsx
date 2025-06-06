import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HabitForm } from '@/components/habits/HabitForm';
import { Habit } from '@/types/habit';

interface HabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: Habit;
  onSuccess: () => void;
}

export const HabitDialog: React.FC<HabitDialogProps> = ({ 
  open, 
  onOpenChange, 
  habit, 
  onSuccess 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] max-h-[90vh] overflow-y-auto p-4">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
          <DialogTitle>{habit ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
        </DialogHeader>
        <HabitForm 
          habit={habit}
          onSuccess={onSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}; 