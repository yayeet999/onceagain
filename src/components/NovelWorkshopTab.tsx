'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Book,
  ChevronRight,
  Sparkles,
  BookOpen,
  Clock,
  FileText,
  PenTool,
  ChevronLeft,
  Search,
  Rocket,
  Heart,
  Zap,
  Ghost,
  Mountain,
  Home,
  Glasses,
  FlaskConical,
  Bookmark,
  Shield,
  Globe,
  Network,
  Layout,
  Compass,
  Timer,
  GitBranch,
  Cat,
  TrendingUp,
  PlayCircle,
  Users,
  Brain,
  MessageSquare,
  BookMarked
} from 'lucide-react';
import { useNovelStore } from '@/store/useNovelStore';
import { useWorkflowNavigation } from '@/hooks/useWorkflowNavigation';
import { useGenreStore } from '@/store/useGenreStore';
import { useWorldSettingsStore } from '@/store/useWorldSettingsStore';
import { useWorkflowAutoSave } from '@/hooks/useWorkflowAutoSave';
import type { WorkflowStep, NovelWorkflowStep } from '@/types/workflow';
import { usePlotStructureStore } from '@/store/usePlotStructureStore';
import { PlotStructureType } from '@/store/usePlotStructureStore';
import { PlotStructureStep } from './PlotStructureStep';
import { CharacterSlotsStep } from './CharacterSlotsStep';

interface Subgenre {
  name: string;
  description: string;
}

interface Genre {
  icon: any;
  title: string;
  description: string;
  variations: Subgenre[];
  blends: Subgenre[];
  approaches: Subgenre[];
}

interface SettingOption {
  name: string;
  description: string;
}

const settingOptions: Record<string, SettingOption[]> = {
  contained: [
    { name: 'Single Community', description: 'Focused on one area' },
    { name: 'Private Estate', description: 'Enclosed property' },
    { name: 'Educational Institution', description: 'Learning environment' },
    { name: 'Isolated Location', description: 'Remote setting' },
    { name: 'Hidden Sanctuary', description: 'Secret place' },
    { name: 'Central Building', description: 'Main structure' },
    { name: 'Enclosed Facility', description: 'Controlled space' },
    { name: 'Small District', description: 'Local neighborhood' },
    { name: 'Private Retreat', description: 'Secluded area' },
    { name: 'Protected Compound', description: 'Secured location' }
  ],
  expansive: [
    { name: 'Multiple Territories', description: 'Various regions' },
    { name: 'Connected Worlds', description: 'Linked realms' },
    { name: 'Vast Wilderness', description: 'Open landscapes' },
    { name: 'Trading Networks', description: 'Commerce routes' },
    { name: 'Ancient Lands', description: 'Historic regions' },
    { name: 'Scattered Settlements', description: 'Dispersed communities' },
    { name: 'Open Frontiers', description: 'Unexplored areas' },
    { name: 'Diverse Regions', description: 'Different zones' },
    { name: 'Unexplored Realms', description: 'Unknown territories' },
    { name: 'Borderless Domains', description: 'Limitless spaces' }
  ],
  interwoven: [
    { name: 'Hub & Branches', description: 'Central with offshoots' },
    { name: 'Core & Outskirts', description: 'Center and edges' },
    { name: 'Central & Satellites', description: 'Main and subsidiaries' },
    { name: 'Heights & Depths', description: 'Vertical spaces' },
    { name: 'Inner & Outer Circles', description: 'Layered zones' },
    { name: 'Crossroads & Paths', description: 'Connected routes' },
    { name: 'Nexus & Networks', description: 'Linked systems' },
    { name: 'Gateway & Realms', description: 'Connected worlds' },
    { name: 'Heart & Arteries', description: 'Core and connections' },
    { name: 'Anchor & Tributaries', description: 'Main and branches' }
  ]
};

// Genre data structure
const genres: Record<string, Genre> = {
  fantasy: {
    icon: Sparkles,
    title: 'Fantasy',
    description: 'Stories with magical or supernatural elements',
    variations: [
      { name: 'Epic Fantasy', description: 'Vast worlds, grand quests' },
      { name: 'Urban Fantasy', description: 'Magical elements in modern settings' },
      { name: 'Dark Fantasy', description: 'Grim themes, darker elements' },
      { name: 'High Fantasy', description: 'Complex magic systems, mythical races' },
      { name: 'Low Fantasy', description: 'Subtle magic in realistic worlds' },
      { name: 'Portal Fantasy', description: 'Travel between worlds' }
    ],
    blends: [
      { name: 'Fantasy Romance', description: 'Magical love stories' },
      { name: 'Fantasy Mystery', description: 'Magical detective work' },
      { name: 'Science Fantasy', description: 'Magic meets technology' },
      { name: 'Historical Fantasy', description: 'Magic in historical settings' },
      { name: 'Fantasy Horror', description: 'Supernatural horror elements' },
      { name: 'Fantasy Adventure', description: 'Action-packed magical journeys' }
    ],
    approaches: [
      { name: 'Mythological Fantasy', description: 'Based on myths/legends' },
      { name: 'Character-Driven Fantasy', description: 'Personal journeys' },
      { name: 'Political Fantasy', description: 'Focus on power dynamics' },
      { name: 'Coming-of-Age Fantasy', description: 'Growth and discovery' },
      { name: 'Multi-POV Fantasy', description: 'Multiple character perspectives' },
      { name: 'Quest-Based Fantasy', description: 'Journey-focused narrative' }
    ]
  },
  scifi: {
    icon: Rocket,
    title: 'Science Fiction',
    description: 'Futuristic or scientific exploration',
    variations: [
      { name: 'Hard Science Fiction', description: 'Scientifically rigorous' },
      { name: 'Space Opera', description: 'Grand space adventures' },
      { name: 'Cyberpunk', description: 'High tech, low life' },
      { name: 'Biopunk', description: 'Biological technology focus' },
      { name: 'Solarpunk', description: 'Eco-friendly future vision' },
      { name: 'Near-Future SF', description: 'Immediate future possibilities' }
    ],
    blends: [
      { name: 'Science Fiction Romance', description: 'Love in future settings' },
      { name: 'Science Fiction Horror', description: 'Space/tech horror' },
      { name: 'Military Science Fiction', description: 'Future warfare' },
      { name: 'Social Science Fiction', description: 'Society and technology' },
      { name: 'Science Fiction Mystery', description: 'Future detective work' },
      { name: 'Science Fiction Thriller', description: 'High-stakes future tension' }
    ],
    approaches: [
      { name: 'First Contact', description: 'Alien encounters' },
      { name: 'Time Travel', description: 'Temporal exploration' },
      { name: 'Post-Apocalyptic', description: 'After civilization falls' },
      { name: 'Generation Ship', description: 'Long-term space travel' },
      { name: 'Alternate History', description: 'What-if scenarios' },
      { name: 'Technological Singularity', description: 'AI advancement focus' }
    ]
  },
  mystery: {
    icon: Search,
    title: 'Mystery',
    description: 'Focus on solving crimes or puzzles',
    variations: [
      { name: 'Cozy Mystery', description: 'Light, often humorous' },
      { name: 'Hardboiled', description: 'Gritty, realistic' },
      { name: 'Procedural', description: 'Focus on investigation process' },
      { name: 'Amateur Sleuth', description: 'Non-professional detective' },
      { name: 'Private Eye', description: 'Professional investigator' },
      { name: 'True Crime Style', description: 'Based on real crime format' }
    ],
    blends: [
      { name: 'Historical Mystery', description: 'Past settings' },
      { name: 'Supernatural Mystery', description: 'Paranormal elements' },
      { name: 'Tech Mystery', description: 'Cybercrime/modern tech' },
      { name: 'Romantic Mystery', description: 'Love and investigation' },
      { name: 'Medical Mystery', description: 'Healthcare-focused crimes' },
      { name: 'Legal Mystery', description: 'Law and investigation' }
    ],
    approaches: [
      { name: 'Whodunit', description: 'Classic mystery format' },
      { name: 'Multiple POV Mystery', description: 'Various perspectives' },
      { name: 'Locked Room Mystery', description: 'Impossible crimes' },
      { name: 'Inverted Mystery', description: 'Known criminal perspective' },
      { name: 'Cold Case', description: 'Old unsolved cases' },
      { name: 'Psychological Mystery', description: 'Mental aspects focus' }
    ]
  },
  romance: {
    icon: Heart,
    title: 'Romance',
    description: 'Focus on love and relationships',
    variations: [
      { name: 'Contemporary Romance', description: 'Modern-day love stories' },
      { name: 'Historical Romance', description: 'Past era love stories' },
      { name: 'Paranormal Romance', description: 'Supernatural love' },
      { name: 'Romantic Comedy', description: 'Humorous love stories' },
      { name: 'Erotic Romance', description: 'Passionate relationships' },
      { name: 'Sweet Romance', description: 'Clean, wholesome love' }
    ],
    blends: [
      { name: 'Romantic Suspense', description: 'Love and danger' },
      { name: 'Romantic Fantasy', description: 'Magical love stories' },
      { name: 'Time Travel Romance', description: 'Cross-time love' },
      { name: 'Medical Romance', description: 'Healthcare setting' },
      { name: 'Sports Romance', description: 'Athletic backdrop' },
      { name: 'Gothic Romance', description: 'Dark, mysterious love' }
    ],
    approaches: [
      { name: 'Slow Burn', description: 'Gradual relationship development' },
      { name: 'Enemies to Lovers', description: 'From conflict to love' },
      { name: 'Friends to Lovers', description: 'Friendship becomes more' },
      { name: 'Second Chance', description: 'Rekindled love' },
      { name: 'Forbidden Love', description: 'Prohibited relationships' },
      { name: 'Marriage of Convenience', description: 'Practical arrangement to love' }
    ]
  },
  thriller: {
    icon: Zap,
    title: 'Thriller',
    description: 'High-stakes tension and suspense',
    variations: [
      { name: 'Psychological Thriller', description: 'Mental manipulation' },
      { name: 'Legal Thriller', description: 'Courtroom drama' },
      { name: 'Medical Thriller', description: 'Healthcare crisis' },
      { name: 'Political Thriller', description: 'Government intrigue' },
      { name: 'Techno-thriller', description: 'Technology-based threats' },
      { name: 'Spy Thriller', description: 'Espionage and secrets' }
    ],
    blends: [
      { name: 'Romantic Thriller', description: 'Love and danger' },
      { name: 'Supernatural Thriller', description: 'Paranormal threats' },
      { name: 'Historical Thriller', description: 'Past-era suspense' },
      { name: 'Science Fiction Thriller', description: 'Future tension' },
      { name: 'Crime Thriller', description: 'Criminal perspective' },
      { name: 'Eco-thriller', description: 'Environmental threats' }
    ],
    approaches: [
      { name: 'Conspiracy', description: 'Hidden truths and plots' },
      { name: 'Cat and Mouse', description: 'Chase and pursuit' },
      { name: 'Race Against Time', description: 'Deadline-driven tension' },
      { name: 'Multiple POV', description: 'Various perspectives' },
      { name: 'Unreliable Narrator', description: 'Questionable perspective' },
      { name: 'Psychological Suspense', description: 'Mental tension focus' }
    ]
  },
  horror: {
    icon: Ghost,
    title: 'Horror',
    description: 'Focus on fear and the supernatural',
    variations: [
      { name: 'Supernatural Horror', description: 'Ghostly/demonic threats' },
      { name: 'Psychological Horror', description: 'Mental terror' },
      { name: 'Body Horror', description: 'Physical transformation' },
      { name: 'Gothic Horror', description: 'Dark, atmospheric' },
      { name: 'Cosmic Horror', description: 'Existential dread' },
      { name: 'Folk Horror', description: 'Cultural/rural horror' }
    ],
    blends: [
      { name: 'Horror Romance', description: 'Love and terror' },
      { name: 'Science Fiction Horror', description: 'Future/tech horror' },
      { name: 'Historical Horror', description: 'Past-era terror' },
      { name: 'Comedy Horror', description: 'Humorous scares' },
      { name: 'Mystery Horror', description: 'Investigation and fear' },
      { name: 'Action Horror', description: 'Combat with horror' }
    ],
    approaches: [
      { name: 'Slow Burn Horror', description: 'Gradual terror build' },
      { name: 'Jump Scare', description: 'Sudden frights' },
      { name: 'Atmospheric Horror', description: 'Environment-based fear' },
      { name: 'Found Footage Style', description: 'Documentary approach' },
      { name: 'Psychological Suspense', description: 'Mental tension' },
      { name: 'Monster-Focused', description: 'Creature feature style' }
    ]
  },
  literary: {
    icon: Book,
    title: 'Literary Fiction',
    description: 'Character-driven, emphasis on style',
    variations: [
      { name: 'Contemporary Literary', description: 'Modern life exploration' },
      { name: 'Historical Literary', description: 'Past-era focus' },
      { name: 'Experimental', description: 'Innovative storytelling' },
      { name: 'Psychological Literary', description: 'Mental exploration' },
      { name: 'Social Commentary', description: 'Society critique' },
      { name: 'Cultural Literary', description: 'Identity and heritage' }
    ],
    blends: [
      { name: 'Literary Thriller', description: 'Sophisticated suspense' },
      { name: 'Magical Realism', description: 'Subtle supernatural' },
      { name: 'Literary Mystery', description: 'Artistic investigation' },
      { name: 'Literary Romance', description: 'Complex relationships' },
      { name: 'Literary Science Fiction', description: 'Philosophical SF' },
      { name: 'Literary Horror', description: 'Artistic terror' }
    ],
    approaches: [
      { name: 'Stream of Consciousness', description: 'Internal monologue' },
      { name: 'Multiple Timelines', description: 'Complex chronology' },
      { name: 'Metafiction', description: 'Self-referential' },
      { name: 'Minimalist', description: 'Spare, focused writing' },
      { name: 'Epistolary', description: 'Letters/documents format' },
      { name: 'Nonlinear Narrative', description: 'Complex time structure' }
    ]
  },
  historical: {
    icon: Clock,
    title: 'Historical Fiction',
    description: 'Stories set in the past',
    variations: [
      { name: 'Ancient History', description: 'Pre-medieval era' },
      { name: 'Medieval', description: 'Middle Ages focus' },
      { name: 'Renaissance', description: '14th-17th century' },
      { name: 'Victorian', description: '19th century' },
      { name: 'World War Era', description: '20th century wars' },
      { name: 'Modern Historical', description: 'Recent past' }
    ],
    blends: [
      { name: 'Historical Romance', description: 'Past-era love' },
      { name: 'Historical Mystery', description: 'Past investigation' },
      { name: 'Historical Fantasy', description: 'Magic in history' },
      { name: 'Historical Thriller', description: 'Past-era suspense' },
      { name: 'Historical Horror', description: 'Historical terror' },
      { name: 'Alternative History', description: 'Changed past events' }
    ],
    approaches: [
      { name: 'Biographical Fiction', description: 'Based on real people' },
      { name: 'Military Focus', description: 'War and conflict' },
      { name: 'Social History', description: 'Society and culture' },
      { name: 'Political Focus', description: 'Power and governance' },
      { name: 'Domestic Focus', description: 'Daily life emphasis' },
      { name: 'Multiple Timeline', description: 'Past and present linked' }
    ]
  },
  adventure: {
    icon: Mountain,
    title: 'Adventure',
    description: 'Action-packed journeys and quests',
    variations: [
      { name: 'Action Adventure', description: 'High-energy quests' },
      { name: 'Survival Adventure', description: 'Against nature' },
      { name: 'Exploration', description: 'Discovery focus' },
      { name: 'Lost World', description: 'Hidden places' },
      { name: 'Maritime Adventure', description: 'Sea-based stories' },
      { name: 'Treasure Hunt', description: 'Search and discovery' }
    ],
    blends: [
      { name: 'Historical Adventure', description: 'Past-era action' },
      { name: 'Science Fiction Adventure', description: 'Future quests' },
      { name: 'Fantasy Adventure', description: 'Magical journeys' },
      { name: 'Mystery Adventure', description: 'Investigation quest' },
      { name: 'Romance Adventure', description: 'Love and action' },
      { name: 'Horror Adventure', description: 'Scary journeys' }
    ],
    approaches: [
      { name: 'Quest Structure', description: 'Goal-oriented journey' },
      { name: 'Team-Based', description: 'Group dynamics' },
      { name: 'Solo Journey', description: 'Individual focus' },
      { name: 'Multiple POV', description: 'Various perspectives' },
      { name: 'Coming of Age', description: 'Growth through adventure' },
      { name: 'Environmental Focus', description: 'Nature emphasis' }
    ]
  },
  contemporary: {
    icon: Home,
    title: 'Contemporary Fiction',
    description: 'Modern-day realistic stories',
    variations: [
      { name: 'Domestic Fiction', description: 'Family/home focus' },
      { name: 'Urban Fiction', description: 'City life stories' },
      { name: 'Rural Fiction', description: 'Country life focus' },
      { name: 'Social Issues', description: 'Current problems' },
      { name: 'Workplace Fiction', description: 'Professional life' },
      { name: 'Coming of Age', description: 'Growth stories' }
    ],
    blends: [
      { name: 'Contemporary Romance', description: 'Modern love' },
      { name: 'Contemporary Mystery', description: 'Current investigation' },
      { name: 'Contemporary Fantasy', description: 'Modern magic' },
      { name: 'Contemporary Thriller', description: 'Present-day tension' },
      { name: 'Contemporary Horror', description: 'Modern fears' },
      { name: 'Slice of Life', description: 'Daily experiences' }
    ],
    approaches: [
      { name: 'Multiple POV', description: 'Various perspectives' },
      { name: 'Family Saga', description: 'Generational stories' },
      { name: 'Social Commentary', description: 'Society critique' },
      { name: 'Character Study', description: 'Deep personality focus' },
      { name: 'Realistic Style', description: 'True-to-life approach' },
      { name: 'Issue-Driven', description: 'Problem-focused' }
    ]
  },
  youngadult: {
    icon: Bookmark,
    title: 'Young Adult',
    description: 'Stories focused on teenage protagonists and coming-of-age themes',
    variations: [
      { name: 'Contemporary YA', description: 'Modern teen life and issues' },
      { name: 'YA Fantasy', description: 'Magic and supernatural for teens' },
      { name: 'YA Science Fiction', description: 'Future and tech for young readers' },
      { name: 'YA Mystery', description: 'Teen detectives and mysteries' },
      { name: 'Social Issues YA', description: 'Tackling important teen topics' },
      { name: 'YA Dystopian', description: 'Future societies and teen rebellion' }
    ],
    blends: [
      { name: 'YA Romance Fantasy', description: 'Magical teen love stories' },
      { name: 'YA Thriller', description: 'High-stakes teen suspense' },
      { name: 'YA Historical', description: 'Teen stories in past settings' },
      { name: 'YA Sports Drama', description: 'Athletics and teen life' },
      { name: 'YA Paranormal Romance', description: 'Supernatural teen love' },
      { name: 'YA Adventure Mystery', description: 'Teen quests with puzzles' }
    ],
    approaches: [
      { name: 'First Person Present', description: 'Immediate teen perspective' },
      { name: 'Dual Timeline', description: 'Past and present narrative' },
      { name: 'Multiple POV', description: 'Various teen perspectives' },
      { name: 'Issue-Focused', description: 'Centered on specific challenges' },
      { name: 'Friend Group Dynamic', description: 'Ensemble teen cast' },
      { name: 'Coming of Age Journey', description: 'Personal growth focus' }
    ]
  },
  crime: {
    icon: Shield,
    title: 'Crime Fiction',
    description: 'Stories centered around criminal activities and investigations',
    variations: [
      { name: 'Police Procedural', description: 'Law enforcement perspective' },
      { name: 'Detective Fiction', description: 'Private investigator focus' },
      { name: 'True Crime Style', description: 'Based on real crime format' },
      { name: 'Organized Crime', description: 'Criminal empire stories' },
      { name: 'Heist Story', description: 'Complex theft planning' },
      { name: 'Cold Case', description: 'Old unsolved mysteries' }
    ],
    blends: [
      { name: 'Crime Thriller', description: 'High-tension criminal plots' },
      { name: 'Historical Crime', description: 'Past-era investigations' },
      { name: 'Crime Romance', description: 'Love amid investigation' },
      { name: 'Supernatural Crime', description: 'Paranormal elements' },
      { name: 'Tech Crime', description: 'Digital age criminal plots' },
      { name: 'Crime Horror', description: 'Dark criminal elements' }
    ],
    approaches: [
      { name: 'Multiple Timeline', description: 'Past and present investigation' },
      { name: 'Psychological Focus', description: 'Criminal mind exploration' },
      { name: 'Forensic Detail', description: 'Scientific investigation' },
      { name: 'Criminal POV', description: 'Perpetrator perspective' },
      { name: 'Team Investigation', description: 'Group detective work' },
      { name: 'Social Commentary', description: 'Crime and society focus' }
    ]
  }
};

const plotStructures = {
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

export default function NovelWorkshopTab() {
  const [currentStep, setCurrentWorkflowStep] = useState<NovelWorkflowStep>('start');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { title, length: selectedLength, structure: selectedStructure } = useNovelStore(
    (state) => state.basicInfo
  );
  const updateBasicInfo = useNovelStore((state) => state.updateBasicInfo);
  const setCurrentStep = useNovelStore((state) => state.setCurrentStep);
  const { hasUnsavedChanges } = useWorkflowNavigation();
  useWorkflowAutoSave();

  // Genre store state and actions
  const {
    primaryGenre,
    subgenre,
    genreBlend,
    genreApproach,
    setPrimaryGenre,
    setSubgenre,
    setGenreBlend,
    setGenreApproach,
    canContinue: genreCanContinue
  } = useGenreStore();

  // World Settings store state and actions
  const {
    settingType,
    selectedSetting,
    setSettingType,
    setSelectedSetting,
    canContinue: settingsCanContinue
  } = useWorldSettingsStore();

  const novelLengths = [
    {
      id: 'short',
      title: 'Short',
      pages: '200-250 pages',
      words: '50-62.5K words',
      description: 'Perfect for focused, concise storytelling'
    },
    {
      id: 'medium',
      title: 'Medium',
      pages: '250-350 pages',
      words: '62.5-87.5K words',
      description: 'Ideal for most novels and stories'
    },
    {
      id: 'long',
      title: 'Long',
      pages: '350-500 pages',
      words: '87.5-125K words',
      description: 'Great for epic, detailed narratives'
    }
  ];

  const getChapterStructures = (lengthId: string) => {
    const lengthTitle = lengthId.charAt(0).toUpperCase() + lengthId.slice(1);
    return [
      {
        id: `${lengthId}-concise`,
        title: `${lengthTitle} Concise`,
        chapters: lengthId === 'short' ? '15-20 chapters' : 
                 lengthId === 'medium' ? '20-25 chapters' : 
                 '25-30 chapters',
        words: lengthId === 'short' ? '3000-4000 words each' : 
               lengthId === 'medium' ? '3500-4500 words each' : 
               '4000-5000 words each',
        description: 'More chapters, shorter length each'
      },
      {
        id: `${lengthId}-standard`,
        title: `${lengthTitle} Standard`,
        chapters: lengthId === 'short' ? '12-15 chapters' : 
                 lengthId === 'medium' ? '15-20 chapters' : 
                 '20-25 chapters',
        words: lengthId === 'short' ? '4000-5000 words each' : 
               lengthId === 'medium' ? '4500-5500 words each' : 
               '5000-6000 words each',
        description: 'Balanced chapter length'
      },
      {
        id: `${lengthId}-extended`,
        title: `${lengthTitle} Extended`,
        chapters: lengthId === 'short' ? '8-12 chapters' : 
                 lengthId === 'medium' ? '12-15 chapters' : 
                 '15-20 chapters',
        words: lengthId === 'short' ? '5000-7500 words each' : 
               lengthId === 'medium' ? '5500-8000 words each' : 
               '6000-8500 words each',
        description: 'Fewer chapters, longer length each'
      }
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Update input handlers
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBasicInfo({ title: e.target.value });
  };

  const handleLengthSelect = (lengthId: string) => {
    updateBasicInfo({ length: lengthId, structure: '' });
  };

  const handleStructureSelect = (structureId: string) => {
    updateBasicInfo({ structure: structureId });
  };

  const handleBasicInfoSubmit = async () => {
    if (!title || !selectedLength || !selectedStructure || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setCurrentStep('genre');
      setCurrentWorkflowStep('genre');
    } catch (error) {
      console.error('Error moving to next step:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'start':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Novel Workshop
                </h1>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/80 rounded-xl p-8 border border-blue-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-slate-800/[0.02] bg-[size:20px_20px]" />
              <div className="relative space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Create Your Novel
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Begin your creative journey with AI assistance. Start crafting your novel with our AI-powered writing tools.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Structure</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Set up your novel's foundation</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">World</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Develop your story's universe</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                    <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Characters</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create memorable personas</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    onClick={() => {
                      setCurrentWorkflowStep('basic-info');
                      setCurrentStep('basic-info');
                    }}
                    className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Novel
                    <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Additional Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Writing Assistant */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">AI Writing Assistant</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get intelligent suggestions and overcome writer's block</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>Plot development assistance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>Character arc suggestions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                    <span>Scene expansion ideas</span>
                  </div>
                </div>
              </div>

              {/* Writing Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Writing Progress</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Track your novel's development journey</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Daily Goal</span>
                      <span className="text-gray-900 dark:text-white font-medium">2,000 words</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-600 dark:bg-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>1,500 words written</span>
                    <span>500 words remaining</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Writing Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Writing Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Daily writing prompts and creative exercises</p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Community</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connect with other writers and share ideas</p>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700">
                <BookMarked className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Resources</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Access writing guides and tutorials</p>
              </div>
            </div>
          </motion.div>
        );
      case 'basic-info':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      Create Your Novel
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
            >
              {/* Title Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">What's your novel called?</h2>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter a captivating title..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
                />
              </motion.div>

              {/* Novel Length Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How long should it be?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {novelLengths.map((length) => (
                    <motion.button
                      key={length.id}
                      onClick={() => handleLengthSelect(length.id)}
                      className={`p-6 rounded-2xl border ${
                        selectedLength === length.id
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800/50 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10'
                      } transition-all duration-200 text-left group relative overflow-hidden`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative z-10">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{length.title}</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <BookOpen className="w-4 h-4" />
                            <p className="text-sm font-medium">{length.pages}</p>
                          </div>
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <Clock className="w-4 h-4" />
                            <p className="text-sm font-medium">{length.words}</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                            {length.description}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Chapter Structure Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How should chapters be structured?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedLength ? (
                    getChapterStructures(selectedLength).map((structure) => (
                      <motion.button
                        key={structure.id}
                        onClick={() => handleStructureSelect(structure.id)}
                        className={`p-6 rounded-2xl border ${
                          selectedStructure === structure.id
                            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-blue-200 dark:hover:border-blue-800/50 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10'
                        } transition-all duration-200 text-left group relative overflow-hidden`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative z-10">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{structure.title}</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                              <BookOpen className="w-4 h-4" />
                              <p className="text-sm font-medium">{structure.chapters}</p>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                              <Clock className="w-4 h-4" />
                              <p className="text-sm font-medium">{structure.words}</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                              {structure.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8 text-gray-500 dark:text-gray-400">
                      Select a novel length to see available chapter structures
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end items-center pt-12"
              >
                <motion.button
                  onClick={handleBasicInfoSubmit}
                  disabled={!title || !selectedLength || !selectedStructure || isSubmitting}
                  className={`
                    group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                    ${title && selectedLength && selectedStructure && !isSubmitting
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }
                    transition-all duration-300
                  `}
                  whileHover={title && selectedLength && selectedStructure && !isSubmitting ? { x: 5, scale: 1.02 } : {}}
                  whileTap={title && selectedLength && selectedStructure && !isSubmitting ? { scale: 0.98 } : {}}
                >
                  Continue to Genre
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'genre':
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-8 h-8 text-purple-500" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                      Choose Your Genre
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-2/6 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10"
            >
              {/* Primary Genre Section */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Book className="w-6 h-6 text-purple-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Primary Genre</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(genres).map(([id, genre]) => {
                    const Icon = genre.icon;
                    return (
                      <motion.button
                        key={id}
                        onClick={() => {
                          setPrimaryGenre(id);
                        }}
                        className={`p-5 rounded-2xl border ${
                          primaryGenre === id
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-purple-200 dark:hover:border-purple-800/50'
                        } transition-all duration-200 text-left group relative overflow-hidden`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${primaryGenre === id ? 'bg-purple-500 text-white' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{genre.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{genre.description}</p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Subgenre Section */}
              {primaryGenre && genres[primaryGenre] && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Choose a Subgenre</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {genres[primaryGenre].variations.map((variation) => (
                      <motion.button
                        key={variation.name}
                        onClick={() => setSubgenre(variation.name)}
                        className={`p-4 rounded-xl border ${
                          subgenre === variation.name
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-purple-200 dark:hover:border-purple-800/50'
                        } transition-all duration-200 text-left`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{variation.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{variation.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Genre Blend Section */}
              {primaryGenre && genres[primaryGenre] && subgenre && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-purple-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Optional: Add a Genre Blend</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {genres[primaryGenre].blends.map((blend) => (
                      <motion.button
                        key={blend.name}
                        onClick={() => setGenreBlend(genreBlend === blend.name ? null : blend.name)}
                        className={`p-4 rounded-xl border ${
                          genreBlend === blend.name
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-purple-200 dark:hover:border-purple-800/50'
                        } transition-all duration-200 text-left`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{blend.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{blend.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Genre Approach Section */}
              {primaryGenre && genres[primaryGenre] && subgenre && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PenTool className="w-6 h-6 text-purple-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Optional: Choose an Approach</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {genres[primaryGenre].approaches.map((approach) => (
                      <motion.button
                        key={approach.name}
                        onClick={() => setGenreApproach(genreApproach === approach.name ? null : approach.name)}
                        className={`p-4 rounded-xl border ${
                          genreApproach === approach.name
                            ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-purple-200 dark:hover:border-purple-800/50'
                        } transition-all duration-200 text-left`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{approach.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{approach.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center pt-12"
              >
                <motion.button
                  onClick={() => {
                    setCurrentWorkflowStep('basic-info');
                    setCurrentStep('basic-info');
                  }}
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  whileHover={{ x: -5 }}
                >
                  <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Basic Info
                </motion.button>

                <motion.button
                  onClick={() => {
                    if (settingsCanContinue()) {
                      setCurrentWorkflowStep('plot-structure');
                      setCurrentStep('plot-structure');
                    }
                  }}
                  disabled={!settingsCanContinue()}
                  className={`
                    group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                    ${settingsCanContinue()
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }
                    transition-all duration-300
                  `}
                  whileHover={settingsCanContinue() ? { x: 5, scale: 1.02 } : {}}
                  whileTap={settingsCanContinue() ? { scale: 0.98 } : {}}
                >
                  Continue to Plot Structure
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'world-settings':
        return (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-teal-950">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-8 h-8 text-emerald-500" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                      World Settings
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-3/6 h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
            >
              {/* Setting Type Selection */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Choose Your World Type</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.button
                    onClick={() => setSettingType('contained')}
                    className={`p-4 rounded-xl border ${
                      settingType === 'contained'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                    } transition-all duration-200 text-left`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${settingType === 'contained' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400'}`}>
                        <Home className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Contained</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Intimate, focused environments</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setSettingType('expansive')}
                    className={`p-4 rounded-xl border ${
                      settingType === 'expansive'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                    } transition-all duration-200 text-left`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${settingType === 'expansive' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400'}`}>
                        <Globe className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Expansive</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Vast, sprawling worlds</p>
                  </motion.button>

                  <motion.button
                    onClick={() => setSettingType('interwoven')}
                    className={`p-4 rounded-xl border ${
                      settingType === 'interwoven'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                    } transition-all duration-200 text-left`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${settingType === 'interwoven' ? 'bg-emerald-500 text-white' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400'}`}>
                        <Network className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">Interwoven</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Naturally connected spaces</p>
                  </motion.button>
                </div>
              </motion.div>

              {/* Setting Options */}
              {settingType && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-6 h-6 text-emerald-500" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Select Your Setting</h2>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {settingOptions[settingType].map((option) => (
                      <motion.button
                        key={option.name}
                        onClick={() => setSelectedSetting(option.name)}
                        className={`p-3 rounded-lg border ${
                          selectedSetting === option.name
                            ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-emerald-200 dark:hover:border-emerald-800/50'
                        } transition-all duration-200 text-left`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{option.name}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{option.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between items-center pt-12"
              >
                <motion.button
                  onClick={() => {
                    setCurrentWorkflowStep('genre');
                    setCurrentStep('genre');
                  }}
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  whileHover={{ x: -5 }}
                >
                  <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  Back to Genre
                </motion.button>

                <motion.button
                  onClick={() => {
                    if (settingsCanContinue()) {
                      setCurrentWorkflowStep('plot-structure');
                      setCurrentStep('plot-structure');
                    }
                  }}
                  disabled={!settingsCanContinue()}
                  className={`
                    group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                    ${settingsCanContinue()
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:shadow-xl'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }
                    transition-all duration-300
                  `}
                  whileHover={settingsCanContinue() ? { x: 5, scale: 1.02 } : {}}
                  whileTap={settingsCanContinue() ? { scale: 0.98 } : {}}
                >
                  Continue to Plot Structure
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        );
      case 'plot-structure':
        return (
          <PlotStructureStep
            setCurrentWorkflowStep={setCurrentWorkflowStep}
            setCurrentStep={setCurrentStep}
          />
        );
      case 'characters':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CharacterSlotsStep 
              setCurrentWorkflowStep={setCurrentWorkflowStep}
              setCurrentStep={setCurrentStep}
            />
          </motion.div>
        );
      case 'relationships':
        // Import and render RelationshipsPage content
        return <div>Relationships Step</div>;
      case 'timeline':
        // Import and render TimelinePage content
        return <div>Timeline Step</div>;
      case 'parameters':
        // Import and render ParametersPage content
        return <div>Parameters Step</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
      <div className="px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
} 