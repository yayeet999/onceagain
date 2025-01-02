'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, Box, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function SettingSelectionPage() {
  const router = useRouter();
  const [selectedSetting, setSelectedSetting] = useState<'contained' | 'expansive' | null>(null);

  const settings = {
    contained: {
      icon: Box,
      title: 'Contained Settings',
      description: 'Focused environments with clear boundaries and defined spaces',
      examples: ['Single Building', 'Small Town', 'Isolated Island', 'Space Station', 'University Campus'],
      benefits: ['Intimate character dynamics', 'Detailed environment exploration', 'Focused narrative scope']
    },
    expansive: {
      icon: Globe,
      title: 'Expansive Settings',
      description: 'Vast worlds and realms with broad scope and extensive reach',
      examples: ['Multiple Kingdoms', 'Entire Planets', 'Parallel Universes', 'Sprawling Cities', 'Connected Realms'],
      benefits: ['Epic world-building potential', 'Multiple location exploration', 'Grand-scale adventures']
    }
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
                <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
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
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Choose Your Setting Type
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start by selecting the broad category of your world's setting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(Object.entries(settings) as [keyof typeof settings, typeof settings[keyof typeof settings]][]).map(([key, setting]) => (
              <motion.div
                key={key}
                onClick={() => setSelectedSetting(key)}
                className={`
                  relative rounded-3xl border-2 overflow-hidden cursor-pointer backdrop-blur-sm
                  ${selectedSetting === key
                    ? 'border-blue-400/50 bg-white/90 shadow-2xl ring-4 ring-blue-500/20'
                    : 'border-gray-200/60 bg-white/80 hover:bg-white/90 hover:shadow-xl hover:border-blue-200/40'
                  }
                  transition-all duration-300 group
                `}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative p-8">
                  <div className="flex items-start gap-4 mb-8">
                    <div className={`
                      p-4 rounded-2xl shadow-lg
                      ${selectedSetting === key
                        ? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40'
                        : 'bg-gray-100/80 dark:bg-gray-800/40 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-indigo-900/20'
                      }
                      transition-all duration-300
                    `}>
                      <setting.icon className={`
                        w-10 h-10
                        ${selectedSetting === key
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                        }
                        transition-colors duration-300
                      `} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{setting.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">{setting.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {setting.examples.map((example) => (
                          <span
                            key={example}
                            className={`
                              px-4 py-2 rounded-xl text-sm font-medium
                              ${selectedSetting === key
                                ? 'bg-blue-100/80 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                                : 'bg-gray-100/80 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300'
                              }
                              transition-colors duration-300
                            `}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Benefits
                      </h4>
                      <ul className="space-y-3">
                        {setting.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                            <div className={`
                              w-2 h-2 rounded-full
                              ${selectedSetting === key
                                ? 'bg-blue-500 dark:bg-blue-400'
                                : 'bg-gray-400 dark:bg-gray-500'
                              }
                            `} />
                            <span className="text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-12"
          >
            <motion.button
              onClick={() => router.push('/dashboard/novels/create/genre')}
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Genre
            </motion.button>

            <motion.button
              onClick={() => router.push(`/dashboard/novels/create/setting/${selectedSetting}`)}
              disabled={!selectedSetting}
              className={`
                group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
                ${selectedSetting
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:shadow-xl'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }
                transition-all duration-300
              `}
              whileHover={selectedSetting ? { x: 5, scale: 1.02 } : {}}
              whileTap={selectedSetting ? { scale: 0.98 } : {}}
            >
              Continue
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return <DashboardLayout>{content}</DashboardLayout>;
} 