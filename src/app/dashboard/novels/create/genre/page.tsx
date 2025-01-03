'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, Rocket, Search, Book, Heart, Zap, Ghost, Clock, Mountain, Home, PenTool, Glasses, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useGenreStore } from '@/store/useGenreStore';
import { useWorkflowNavigation } from '@/hooks/useWorkflowNavigation';
import { useWorkflowAutoSave } from '@/hooks/useWorkflowAutoSave';

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

interface GenreState {
  selectedGenre: string | null;
  selectedSubgenre: string | null;
  selectedBlend: string | null;
  selectedApproach: string | null;
}

// Genre data structure
const genres: Record<string, Genre> = {
  fantasy: {
    icon: Sparkles,
    title: 'Fantasy',
    description: 'Stories with magical or supernatural elements',
    variations: [
      { name: 'Epic Fantasy', description: 'Vast worlds, grand quests' },
      { name: 'Urban Fantasy', description: 'Magical elements in modern settings' },
      { name: 'Dark Fantasy', description: 'Grim themes, darker elements' }
    ],
    blends: [
      { name: 'Fantasy Romance', description: 'Magical love stories' },
      { name: 'Fantasy Mystery', description: 'Magical detective work' },
      { name: 'Science Fantasy', description: 'Magic meets technology' }
    ],
    approaches: [
      { name: 'Mythological Fantasy', description: 'Based on myths/legends' },
      { name: 'Character-Driven Fantasy', description: 'Personal journeys' },
      { name: 'Political Fantasy', description: 'Focus on power dynamics' }
    ]
  },
  scifi: {
    icon: Rocket,
    title: 'Science Fiction',
    description: 'Futuristic or scientific exploration',
    variations: [
      { name: 'Hard Science Fiction', description: 'Scientifically rigorous' },
      { name: 'Space Opera', description: 'Grand space adventures' },
      { name: 'Cyberpunk', description: 'High tech, low life' }
    ],
    blends: [
      { name: 'Science Fiction Romance', description: 'Love in future settings' },
      { name: 'Science Fiction Horror', description: 'Space/tech horror' },
      { name: 'Military Science Fiction', description: 'Future warfare' }
    ],
    approaches: [
      { name: 'First Contact', description: 'Alien encounters' },
      { name: 'Time Travel', description: 'Temporal exploration' },
      { name: 'Post-Apocalyptic', description: 'After civilization falls' }
    ]
  },
  mystery: {
    icon: Search,
    title: 'Mystery',
    description: 'Focus on solving crimes or puzzles',
    variations: [
      { name: 'Cozy Mystery', description: 'Light, often humorous' },
      { name: 'Hardboiled', description: 'Gritty, realistic' },
      { name: 'Procedural', description: 'Focus on investigation process' }
    ],
    blends: [
      { name: 'Historical Mystery', description: 'Past settings' },
      { name: 'Supernatural Mystery', description: 'Paranormal elements' },
      { name: 'Tech Mystery', description: 'Cybercrime/modern tech' }
    ],
    approaches: [
      { name: 'Amateur Sleuth', description: 'Non-professional detective' },
      { name: 'Multiple POV Mystery', description: 'Various perspectives' },
      { name: 'Locked Room Mystery', description: 'Impossible crimes' }
    ]
  },
  literary: {
    icon: Book,
    title: 'Literary Fiction',
    description: 'Character-driven, emphasis on style',
    variations: [
      { name: 'Psychological Literary', description: 'Internal struggles' },
      { name: 'Social Commentary', description: 'Society examination' },
      { name: 'Experimental Literary', description: 'Innovative forms' }
    ],
    blends: [
      { name: 'Historical Literary', description: 'Past with literary style' },
      { name: 'Magical Realism', description: 'Subtle magic elements' },
      { name: 'Literary Thriller', description: 'Sophisticated suspense' }
    ],
    approaches: [
      { name: 'Stream of Consciousness', description: 'Internal monologue' },
      { name: 'Minimalist Literary', description: 'Sparse, precise' },
      { name: 'Epistolary', description: 'Letters/documents format' }
    ]
  },
  romance: {
    icon: Heart,
    title: 'Romance',
    description: 'Focus on romantic relationships',
    variations: [
      { name: 'Contemporary Romance', description: 'Modern settings' },
      { name: 'Historical Romance', description: 'Past settings' },
      { name: 'Paranormal Romance', description: 'Supernatural elements' }
    ],
    blends: [
      { name: 'Romantic Suspense', description: 'Love and danger' },
      { name: 'Romantic Comedy', description: 'Humorous love' },
      { name: 'Romantic Fantasy', description: 'Magical love' }
    ],
    approaches: [
      { name: 'Slow Burn Romance', description: 'Gradual development' },
      { name: 'Second Chance Romance', description: 'Reunited lovers' },
      { name: 'Enemies to Lovers', description: 'Conflict to love' }
    ]
  },
  thriller: {
    icon: Zap,
    title: 'Thriller',
    description: 'Suspense-driven narratives',
    variations: [
      { name: 'Psychological Thriller', description: 'Mental tension' },
      { name: 'Legal Thriller', description: 'Courtroom/legal focus' },
      { name: 'Medical Thriller', description: 'Healthcare settings' }
    ],
    blends: [
      { name: 'Techno-Thriller', description: 'Technology focus' },
      { name: 'Supernatural Thriller', description: 'Paranormal elements' },
      { name: 'Political Thriller', description: 'Government intrigue' }
    ],
    approaches: [
      { name: 'Domestic Thriller', description: 'Family/home setting' },
      { name: 'Action Thriller', description: 'Fast-paced adventure' },
      { name: 'Conspiracy Thriller', description: 'Hidden plots' }
    ]
  },
  horror: {
    icon: Ghost,
    title: 'Horror',
    description: 'Intended to frighten or disturb',
    variations: [
      { name: 'Psychological Horror', description: 'Mental terror' },
      { name: 'Body Horror', description: 'Physical transformation' },
      { name: 'Gothic Horror', description: 'Classic dark elements' }
    ],
    blends: [
      { name: 'Cosmic Horror', description: 'Existential dread' },
      { name: 'Science Fiction Horror', description: 'Tech terror' },
      { name: 'Folk Horror', description: 'Cultural/rural horror' }
    ],
    approaches: [
      { name: 'Supernatural Horror', description: 'Ghostly/demonic' },
      { name: 'Survival Horror', description: 'Fighting to live' },
      { name: 'Quiet Horror', description: 'Subtle dread' }
    ]
  },
  historical: {
    icon: Clock,
    title: 'Historical Fiction',
    description: 'Set in past historical periods',
    variations: [
      { name: 'Ancient Historical', description: 'Pre-medieval' },
      { name: 'Medieval Historical', description: 'Middle ages' },
      { name: 'Modern Historical', description: 'Recent past' }
    ],
    blends: [
      { name: 'Historical Romance', description: 'Past love stories' },
      { name: 'Historical Fantasy', description: 'Magical history' },
      { name: 'Historical Mystery', description: 'Past crimes' }
    ],
    approaches: [
      { name: 'Biographical Historical', description: 'Real people' },
      { name: 'Alternative History', description: 'What-if scenarios' },
      { name: 'Historical Epic', description: 'Sweeping narratives' }
    ]
  },
  adventure: {
    icon: Mountain,
    title: 'Adventure',
    description: 'Action-focused journeys',
    variations: [
      { name: 'Exploration Adventure', description: 'Discovery' },
      { name: 'Survival Adventure', description: 'Against nature' },
      { name: 'Quest Adventure', description: 'Specific goal' }
    ],
    blends: [
      { name: 'Historical Adventure', description: 'Past excitement' },
      { name: 'Science Fiction Adventure', description: 'Future thrills' },
      { name: 'Fantasy Adventure', description: 'Magical journeys' }
    ],
    approaches: [
      { name: 'Character-Driven Adventure', description: 'Personal growth' },
      { name: 'Action-Adventure', description: 'Combat/excitement' },
      { name: 'Mystery Adventure', description: 'Solving while moving' }
    ]
  },
  contemporary: {
    icon: Home,
    title: 'Contemporary Fiction',
    description: 'Modern-day realistic stories',
    variations: [
      { name: 'Domestic Fiction', description: 'Family/home life' },
      { name: 'Urban Fiction', description: 'City life' },
      { name: 'Rural Fiction', description: 'Country life' }
    ],
    blends: [
      { name: 'Contemporary Romance', description: 'Modern love' },
      { name: 'Contemporary Mystery', description: 'Current crimes' },
      { name: 'Contemporary Fantasy', description: 'Modern magic' }
    ],
    approaches: [
      { name: 'Slice of Life', description: 'Daily experiences' },
      { name: 'Social Issues', description: 'Current problems' },
      { name: 'Coming of Age', description: 'Growth stories' }
    ]
  },
  satire: {
    icon: PenTool,
    title: 'Satire',
    description: 'Social commentary through humor',
    variations: [
      { name: 'Political Satire', description: 'Government critique' },
      { name: 'Social Satire', description: 'Society critique' },
      { name: 'Cultural Satire', description: 'Customs critique' }
    ],
    blends: [
      { name: 'Science Fiction Satire', description: 'Future critique' },
      { name: 'Fantasy Satire', description: 'Magical critique' },
      { name: 'Horror Satire', description: 'Dark humor' }
    ],
    approaches: [
      { name: 'Dark Satire', description: 'Cynical approach' },
      { name: 'Light Satire', description: 'Gentle mockery' },
      { name: 'Absurdist Satire', description: 'Extreme situations' }
    ]
  },
  speculative: {
    icon: FlaskConical,
    title: 'Speculative Fiction',
    description: 'Alternative realities',
    variations: [
      { name: 'Alternate History', description: 'Changed past' },
      { name: 'Dystopian', description: 'Failed society' },
      { name: 'Utopian', description: 'Perfect society' }
    ],
    blends: [
      { name: 'Speculative Romance', description: 'Alternate love' },
      { name: 'Speculative Mystery', description: 'Strange cases' },
      { name: 'Speculative Horror', description: 'Alternate fears' }
    ],
    approaches: [
      { name: 'Philosophical Speculation', description: 'Idea exploration' },
      { name: 'Social Speculation', description: 'Society focus' },
      { name: 'Technical Speculation', description: 'Science focus' }
    ]
  }
};

export default function GenrePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const novelId = searchParams.get('id');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Get state and actions from store
  const {
    primaryGenre,
    subgenre,
    genreBlend,
    genreApproach,
    setPrimaryGenre,
    setSubgenre,
    setGenreBlend,
    setGenreApproach,
    canContinue
  } = useGenreStore();

  // Navigation protection
  useWorkflowNavigation();

  // Auto-save
  useWorkflowAutoSave();

  const handleContinue = async () => {
    if (!canContinue()) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      router.push(`/dashboard/novels/create/setting?id=${novelId}`);
    } catch (error) {
      console.error('Failed to save genre:', error);
      setSaveError('Failed to save genre');
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenreSelect = (genre: string) => {
    setPrimaryGenre(genre);
  };

  const handleSubgenreSelect = (subgenre: string) => {
    setSubgenre(subgenre);
  };

  const handleBlendSelect = (blend: string) => {
    setGenreBlend(blend);
  };

  const handleApproachSelect = (approach: string) => {
    setGenreApproach(approach);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-slate-950">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-gray-500" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 dark:from-gray-400 dark:to-slate-400 bg-clip-text text-transparent">
                  Create Your Novel
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-gradient-to-r from-gray-500 to-slate-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Error Display */}
        {saveError && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <p className="text-sm text-red-500 dark:text-red-400">
              {saveError}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Genre Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(genres).map(([id, genre]) => (
              <motion.button
                key={id}
                onClick={() => handleGenreSelect(id)}
                className={`p-6 rounded-2xl border ${
                  primaryGenre === id
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <genre.icon className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{genre.title}</h3>
                <p className="text-sm text-gray-600">{genre.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Subgenre Selection */}
          {primaryGenre && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Select Subgenre</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {genres[primaryGenre].variations.map((variation) => (
                  <motion.button
                    key={variation.name}
                    onClick={() => handleSubgenreSelect(variation.name)}
                    className={`p-4 rounded-xl border ${
                      subgenre === variation.name
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <h4 className="font-medium mb-1">{variation.name}</h4>
                    <p className="text-sm text-gray-600">{variation.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Genre Blend Selection */}
          {subgenre && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Optional: Select Genre Blend</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {primaryGenre && genres[primaryGenre].blends.map((blend: Subgenre) => (
                  <motion.button
                    key={blend.name}
                    onClick={() => handleBlendSelect(blend.name)}
                    className={`p-4 rounded-xl border ${
                      genreBlend === blend.name
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <h4 className="font-medium mb-1">{blend.name}</h4>
                    <p className="text-sm text-gray-600">{blend.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Genre Approach Selection */}
          {subgenre && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Optional: Select Genre Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {primaryGenre && genres[primaryGenre].approaches.map((approach: Subgenre) => (
                  <motion.button
                    key={approach.name}
                    onClick={() => handleApproachSelect(approach.name)}
                    className={`p-4 rounded-xl border ${
                      genreApproach === approach.name
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <h4 className="font-medium mb-1">{approach.name}</h4>
                    <p className="text-sm text-gray-600">{approach.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-12"
          >
            <motion.button
              onClick={() => router.push(`/dashboard/novels/create?id=${novelId}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Setup
            </motion.button>

            <motion.button
              onClick={handleContinue}
              disabled={!canContinue()}
              whileHover={{ scale: canContinue() ? 1.02 : 1 }}
              whileTap={{ scale: canContinue() ? 0.98 : 1 }}
              className={`inline-flex items-center px-6 py-2 rounded-lg ${
                canContinue()
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              } gap-2 transition-colors duration-200`}
            >
              Continue to Setting
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 