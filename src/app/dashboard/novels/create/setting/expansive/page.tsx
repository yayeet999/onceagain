'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Mountain, Castle, Wand2, Rocket, 
  Network, Globe2, ChevronLeft, ChevronRight
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface SettingCategory {
  icon: any;
  title: string;
  description: string;
  color: {
    light: string;
    dark: string;
    text: string;
    border: string;
    gradient: string;
  };
}

export default function ExpansiveSettingsPage() {
  const router = useRouter();
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [hoveredSetting, setHoveredSetting] = useState<string | null>(null);

  const settingCategories: SettingCategory[] = [
    {
      icon: Mountain,
      title: 'Untamed Frontiers',
      description: 'Raw wilderness and natural domains where survival is a constant challenge',
      color: {
        light: 'from-slate-50 to-gray-50',
        dark: 'from-slate-900/20 to-gray-900/20',
        text: 'text-slate-600 dark:text-slate-400',
        border: 'border-slate-200 dark:border-slate-800',
        gradient: 'from-slate-500 to-gray-500'
      }
    },
    {
      icon: Castle,
      title: 'Settled Kingdoms',
      description: 'Civilized realms shaped by society, culture, and organized life',
      color: {
        light: 'from-zinc-50 to-stone-50',
        dark: 'from-zinc-900/20 to-stone-900/20',
        text: 'text-zinc-600 dark:text-zinc-400',
        border: 'border-zinc-200 dark:border-zinc-800',
        gradient: 'from-zinc-500 to-stone-500'
      }
    },
    {
      icon: Wand2,
      title: 'Magical Territories',
      description: "Supernatural realms where magic defines reality and ordinary rules don't apply",
      color: {
        light: 'from-neutral-50 to-gray-50',
        dark: 'from-neutral-900/20 to-gray-900/20',
        text: 'text-neutral-600 dark:text-neutral-400',
        border: 'border-neutral-200 dark:border-neutral-800',
        gradient: 'from-neutral-500 to-gray-500'
      }
    },
    {
      icon: Rocket,
      title: 'Future Horizons',
      description: 'Advanced worlds of technology, science, and human progress',
      color: {
        light: 'from-stone-50 to-zinc-50',
        dark: 'from-stone-900/20 to-zinc-900/20',
        text: 'text-stone-600 dark:text-stone-400',
        border: 'border-stone-200 dark:border-stone-800',
        gradient: 'from-stone-500 to-zinc-500'
      }
    },
    {
      icon: Network,
      title: 'Shifting Realms',
      description: 'Places where reality bends and multiple dimensions intersect',
      color: {
        light: 'from-gray-50 to-slate-50',
        dark: 'from-gray-900/20 to-slate-900/20',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-200 dark:border-gray-800',
        gradient: 'from-gray-500 to-slate-500'
      }
    },
    {
      icon: Globe2,
      title: 'Blended Domains',
      description: 'Mixed territories where different types of worlds and rules combine',
      color: {
        light: 'from-neutral-50 to-stone-50',
        dark: 'from-neutral-900/20 to-stone-900/20',
        text: 'text-neutral-600 dark:text-neutral-400',
        border: 'border-neutral-200 dark:border-neutral-800',
        gradient: 'from-neutral-500 to-stone-500'
      }
    }
  ];

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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Choose Your Setting Category
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Select the type of expansive environment that will define your story's world and scope
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingCategories.map((category, index) => (
                <motion.button
                  key={category.title}
                  onClick={() => setSelectedSetting(category.title)}
                  onHoverStart={() => setHoveredSetting(category.title)}
                  onHoverEnd={() => setHoveredSetting(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className={`
                    relative p-8 rounded-3xl border-2 text-left transition-all duration-300
                    ${selectedSetting === category.title
                      ? `${category.color.border} bg-white/90 shadow-2xl ring-4 ring-${category.color.text}/20`
                      : 'border-gray-200/60 bg-white/80 hover:bg-white/90 hover:shadow-xl'
                    }
                    group overflow-hidden
                  `}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Gradient Effect */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${category.color.light} dark:${category.color.dark}
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  `} />

                  {/* Decorative Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className={`
                      absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${category.color.gradient}
                      opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl
                    `} />
                    <div className={`
                      absolute -left-16 -bottom-16 w-32 h-32 rounded-full bg-gradient-to-br ${category.color.gradient}
                      opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl
                    `} />
                  </div>

                  {/* Content */}
                  <div className="relative space-y-4">
                    <div className={`
                      p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg
                      ${selectedSetting === category.title ? category.color.text : 'text-gray-400'}
                      group-hover:${category.color.text} transition-colors duration-300
                      w-fit
                    `}>
                      <category.icon className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {selectedSetting === category.title && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute top-4 right-4 w-8 h-8 rounded-full ${category.color.text} bg-current opacity-20`}
                      >
                        <motion.div
                          className={`absolute inset-1 rounded-full ${category.color.text} bg-current`}
                        />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center pt-12"
            >
              <motion.button
                onClick={() => router.push('/dashboard/novels/create/setting')}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Setting Type
              </motion.button>

              <motion.button
                onClick={() => router.push('/dashboard/novels/create/timeline')}
                disabled={!selectedSetting}
                className={`
                  group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                  ${selectedSetting
                    ? 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white hover:shadow-xl'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }
                  transition-all duration-300
                `}
                whileHover={selectedSetting ? { x: 5, scale: 1.02 } : {}}
                whileTap={selectedSetting ? { scale: 0.98 } : {}}
              >
                Continue to Timeline
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 