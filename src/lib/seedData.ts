import { ReflectionPrompt, Quote } from './types';

export const reflectionPrompts: ReflectionPrompt[] = [
  // Identity prompts
  {
    id: 'identity-1',
    question: 'How does your current behavior align with the type of person you want to become?',
    category: 'identity'
  },
  {
    id: 'identity-2',
    question: 'What small changes could you make to better align your actions with your desired identity?',
    category: 'identity'
  },
  {
    id: 'identity-3',
    question: 'How would the person you aspire to be handle a challenging situation you are facing?',
    category: 'identity'
  },
  
  // Progress prompts
  {
    id: 'progress-1',
    question: 'What small wins have you achieved this week that you might be overlooking?',
    category: 'progress'
  },
  {
    id: 'progress-2',
    question: 'How has your perspective on your habits changed since you started tracking them?',
    category: 'progress'
  },
  {
    id: 'progress-3',
    question: 'What habit has been most challenging to maintain, and what have you learned from that struggle?',
    category: 'progress'
  },
  
  // Obstacles prompts
  {
    id: 'obstacles-1',
    question: 'What environmental factors are making your good habits harder than they need to be?',
    category: 'obstacles'
  },
  {
    id: 'obstacles-2',
    question: 'When you failed to perform a habit recently, what was the trigger or cause?',
    category: 'obstacles'
  },
  {
    id: 'obstacles-3',
    question: 'What beliefs or stories might you be telling yourself that are holding you back?',
    category: 'obstacles'
  },
  
  // Environment prompts
  {
    id: 'environment-1',
    question: 'How could you redesign your physical space to make good habits more obvious and bad habits more difficult?',
    category: 'environment'
  },
  {
    id: 'environment-2',
    question: 'What cues in your environment are triggering your unwanted habits?',
    category: 'environment'
  },
  {
    id: 'environment-3',
    question: 'How might you add friction to bad habits to make them less convenient?',
    category: 'environment'
  },
  
  // Motivation prompts
  {
    id: 'motivation-1',
    question: 'What are the deeper reasons behind why you want to build or break this habit?',
    category: 'motivation'
  },
  {
    id: 'motivation-2',
    question: 'How will your life be different one year from now if you successfully maintain this habit?',
    category: 'motivation'
  },
  {
    id: 'motivation-3',
    question: 'What would make your habit more enjoyable or satisfying in the moment?',
    category: 'motivation'
  }
];

export const quotes: Quote[] = [
  // Atomic Habits quotes
  {
    id: 'ah-1',
    text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'identity'
  },
  {
    id: 'ah-2',
    text: 'Every action you take is a vote for the type of person you wish to become.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'identity'
  },
  {
    id: 'ah-3',
    text: 'Habits are the compound interest of self-improvement.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'motivation'
  },
  {
    id: 'ah-4',
    text: 'The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'identity'
  },
  {
    id: 'ah-5',
    text: 'Your habits shape your identity, and your identity shapes your habits.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'identity'
  },
  {
    id: 'ah-6',
    text: 'The most practical way to change who you are is to change what you do.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'environment'
  },
  {
    id: 'ah-7',
    text: 'Environment is the invisible hand that shapes human behavior.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'environment'
  },
  {
    id: 'ah-8',
    text: 'Make it obvious. Make it attractive. Make it easy. Make it satisfying.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'environment'
  },
  {
    id: 'ah-9',
    text: 'The ultimate form of intrinsic motivation is when a habit becomes part of your identity.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'motivation'
  },
  {
    id: 'ah-10',
    text: 'Success is the product of daily habits—not once-in-a-lifetime transformations.',
    author: 'James Clear',
    source: 'atomic_habits',
    category: 'motivation'
  },
  
  // Alan Carr quotes
  {
    id: 'ac-1',
    text: 'The main reason that people struggle to quit is that they believe they are making a sacrifice.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'craving'
  },
  {
    id: 'ac-2',
    text: 'You did not decide to fall into this trap, but you can decide to escape it.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'motivation'
  },
  {
    id: 'ac-3',
    text: 'The beautiful truth is: once you have escaped, you will be no more deprived than a non-smoker.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'reward'
  },
  {
    id: 'ac-4',
    text: 'The whole business of smoking is like forcing yourself to wear tight shoes just to get the pleasure of taking them off.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'craving'
  },
  {
    id: 'ac-5',
    text: 'You are not giving up anything because cigarettes do absolutely nothing for you at all. They provide you with no genuine pleasure or crutch, and once you realize this you will shed your fear of living without them.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'craving'
  },
  {
    id: 'ac-6',
    text: 'There is absolutely nothing to give up... there is no genuine pleasure or crutch in smoking. It is just an illusion, like banging your head against a wall to make it pleasant when you stop.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'craving'
  },
  {
    id: 'ac-7',
    text: 'The real problem is your belief that smoking provides some sort of pleasure or support.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'identity'
  },
  {
    id: 'ac-8',
    text: 'Once you realize that there is nothing to give up and there is no genuine pleasure to lose, it becomes easy to get free.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'reward'
  },
  {
    id: 'ac-9',
    text: 'The key is to remove the desire to smoke. If you have no desire to smoke, you will not need willpower not to do so.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'craving'
  },
  {
    id: 'ac-10',
    text: 'The key to being free is realizing that you are not making a sacrifice. You are not giving anything up.',
    author: 'Allen Carr',
    source: 'alan_carr',
    category: 'motivation'
  }
]; 