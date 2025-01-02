'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, Search, Book, Heart, Zap, Ghost, Clock, Mountain, Home, PenTool, Glasses, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useRouter } from 'next/navigation';

interface Subgenre {
  name: string;
  description: string;
}

interface Genre {
  icon: any; // Using any for Lucide icons
  title: string;
  description: string;
  variations: Subgenre[];
  blends: Subgenre[];
  approaches: Subgenre[];
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

// Add genre-specific color mappings
const genreColors = {
  fantasy: { from: 'from-purple-500', to: 'to-indigo-500', light: 'from-purple-50', lightTo: 'to-indigo-50' },
  scifi: { from: 'from-cyan-500', to: 'to-blue-500', light: 'from-cyan-50', lightTo: 'to-blue-50' },
  mystery: { from: 'from-amber-500', to: 'to-orange-500', light: 'from-amber-50', lightTo: 'to-orange-50' },
  literary: { from: 'from-emerald-500', to: 'to-green-500', light: 'from-emerald-50', lightTo: 'to-green-50' },
  romance: { from: 'from-pink-500', to: 'to-rose-500', light: 'from-pink-50', lightTo: 'to-rose-50' },
  thriller: { from: 'from-red-500', to: 'to-orange-500', light: 'from-red-50', lightTo: 'to-orange-50' },
  horror: { from: 'from-slate-500', to: 'to-gray-500', light: 'from-slate-50', lightTo: 'to-gray-50' },
  historical: { from: 'from-amber-500', to: 'to-yellow-500', light: 'from-amber-50', lightTo: 'to-yellow-50' },
  adventure: { from: 'from-lime-500', to: 'to-green-500', light: 'from-lime-50', lightTo: 'to-green-50' },
  contemporary: { from: 'from-blue-500', to: 'to-indigo-500', light: 'from-blue-50', lightTo: 'to-indigo-50' },
  satire: { from: 'from-violet-500', to: 'to-purple-500', light: 'from-violet-50', lightTo: 'to-purple-50' },
  speculative: { from: 'from-teal-500', to: 'to-cyan-500', light: 'from-teal-50', lightTo: 'to-cyan-50' }
};

export default function GenreSelectionPage() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedSubgenres, setSelectedSubgenres] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectedGenre(null);
        setSelectedSubgenres([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? null : genre);
    setSelectedSubgenres([]);
  };

  const handleSubgenreSelect = (subgenre: string) => {
    setSelectedSubgenres(prev => {
      if (prev.includes(subgenre)) {
        return prev.filter(s => s !== subgenre);
      }
      if (prev.length >= 2) {
        return [...prev.slice(1), subgenre];
      }
      return [...prev, subgenre];
    });
  };

  const content = (
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
                <div className="w-2/4 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6" ref={containerRef}>
        <div className="space-y-6">
          <AnimatePresence mode="sync">
            {Object.entries(genres).map(([key, genre]) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  height: 'auto',
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    mass: 1
                  }
                }}
                exit={{ opacity: 0, y: -20 }}
                className={`
                  relative rounded-xl border overflow-hidden
                  ${selectedGenre === key 
                    ? `border-${genreColors[key as keyof typeof genreColors].from.replace('from-', '')}-200 bg-white shadow-lg ring-2 ring-${genreColors[key as keyof typeof genreColors].from.replace('from-', '')}-500/30` 
                    : 'border-gray-200 bg-white/50 hover:bg-white hover:shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                  }
                  transition-all duration-300
                `}
                onClick={() => handleGenreSelect(key)}
              >
                <motion.div 
                  className="p-6 flex items-start gap-4"
                  layout="position"
                >
                  <motion.div 
                    className={`
                      rounded-lg p-3
                      ${selectedGenre === key 
                        ? `bg-gradient-to-br ${genreColors[key as keyof typeof genreColors].light} ${genreColors[key as keyof typeof genreColors].lightTo} shadow-sm` 
                        : 'bg-gradient-to-br from-gray-50 to-white'
                      }
                      transition-colors duration-300
                    `}
                    layout
                  >
                    <genre.icon className={`
                      w-6 h-6
                      ${selectedGenre === key 
                        ? `text-${genreColors[key as keyof typeof genreColors].from.replace('from-', '')}-500` 
                        : 'text-gray-500'
                      }
                      transition-colors duration-300
                    `} />
                  </motion.div>
                  <div>
                    <motion.h2 
                      className={`
                        text-xl font-medium
                        ${selectedGenre === key 
                          ? `text-${genreColors[key as keyof typeof genreColors].from.replace('from-', '')}-700` 
                          : 'text-gray-900'
                        }
                      `}
                      layout="position"
                    >
                      {genre.title}
                    </motion.h2>
                    <motion.p 
                      className="text-gray-500 mt-1"
                      layout="position"
                    >
                      {genre.description}
                    </motion.p>
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  {selectedGenre === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: 'auto',
                        transition: {
                          duration: 0.3,
                          ease: 'easeOut'
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        transition: {
                          duration: 0.2,
                          ease: 'easeIn'
                        }
                      }}
                      className="px-6 pb-6"
                    >
                      <div className="space-y-6">
                        {['variations', 'blends', 'approaches'].map((category, categoryIndex) => (
                          <motion.div 
                            key={category} 
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: {
                                delay: categoryIndex * 0.1
                              }
                            }}
                          >
                            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                              {category.replace(/([A-Z])/g, ' $1').trim()}
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                              {genre[category as keyof Genre].map((subgenre: Subgenre, index: number) => (
                                <motion.button
                                  key={subgenre.name}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ 
                                    opacity: 1, 
                                    scale: 1,
                                    transition: { 
                                      delay: categoryIndex * 0.1 + index * 0.05,
                                      type: 'spring',
                                      stiffness: 400,
                                      damping: 25
                                    }
                                  }}
                                  whileHover={{ 
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                  className={`
                                    p-4 rounded-lg text-left transition-all
                                    ${selectedSubgenres.includes(subgenre.name)
                                      ? `bg-gradient-to-br ${genreColors[key as keyof typeof genreColors].from} ${genreColors[key as keyof typeof genreColors].to} text-white shadow-lg`
                                      : 'bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 text-gray-900 border border-gray-100'
                                    }
                                  `}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSubgenreSelect(subgenre.name);
                                  }}
                                >
                                  <div className="font-medium">{subgenre.name}</div>
                                  <div className="text-sm mt-1 opacity-80">
                                    {subgenre.description}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-12"
          >
            <motion.button
              onClick={() => router.push('/dashboard/novels/create')}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Setup
            </motion.button>

            <motion.button
              onClick={() => router.push('/dashboard/novels/create/setting')}
              disabled={!selectedGenre}
              className={`
                group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                ${selectedGenre
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:shadow-xl'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }
                transition-all duration-300
              `}
              whileHover={selectedGenre ? { x: 5, scale: 1.02 } : {}}
              whileTap={selectedGenre ? { scale: 0.98 } : {}}
            >
              Continue to Setting
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
} 