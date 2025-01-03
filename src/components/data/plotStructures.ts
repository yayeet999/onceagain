import {
  Layout,
  Compass,
  Timer,
  GitBranch,
  Cat,
  TrendingUp,
  Clock,
  PlayCircle
} from 'lucide-react';

export const plotStructures = {
  'three-act': {
    icon: Layout,
    title: 'Three-Act Structure',
    description: 'Classic beginning, middle, and end structure',
    bestFor: ['Fantasy', 'Mystery', 'Romance'],
  },
  'heros-journey': {
    icon: Compass,
    title: "Hero's Journey",
    description: 'Mythical cycle of adventure and transformation',
    bestFor: ['Epic Fantasy', 'Science Fiction', 'Adventure'],
  },
  'five-act': {
    icon: Timer,
    title: 'Five-Act Structure',
    description: 'Dramatic structure with multiple turning points',
    bestFor: ['Literary Fiction', 'Drama', 'Historical Fiction'],
  },
  'seven-point': {
    icon: GitBranch,
    title: 'Seven-Point Story',
    description: 'Plot-focused structure with key story beats',
    bestFor: ['Thriller', 'Mystery', 'Science Fiction'],
  },
  'save-the-cat': {
    icon: Cat,
    title: 'Save the Cat',
    description: 'Modern beat sheet for engaging storytelling',
    bestFor: ['Contemporary Fiction', 'YA', 'Romance'],
  },
  'fichtean-curve': {
    icon: TrendingUp,
    title: 'Fichtean Curve',
    description: 'Rising action with multiple crises',
    bestFor: ['Thriller', 'Horror', 'Mystery'],
  },
  'multiple-timelines': {
    icon: Clock,
    title: 'Multiple Timelines',
    description: 'Parallel or interwoven story threads',
    bestFor: ['Literary Fiction', 'Historical Fiction', 'Mystery'],
  },
  'in-media-res': {
    icon: PlayCircle,
    title: 'In Media Res',
    description: 'Start in the middle of the action',
    bestFor: ['Action', 'Thriller', 'Science Fiction'],
  }
}; 