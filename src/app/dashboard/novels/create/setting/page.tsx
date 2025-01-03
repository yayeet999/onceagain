'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ChevronLeft, ChevronRight, Box, Globe } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useSettingsStore } from '@/store/useSettingsStore';

export default function SettingTypePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const novelId = searchParams.get('id');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Get state and actions from store
  const { settingType, setSettingType } = useSettingsStore();

  const handleTypeSelect = (type: 'contained' | 'expansive') => {
    setSettingType(type);
  };

  const handleContinue = async () => {
    if (!settingType) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      router.push(`/dashboard/novels/create/setting/${settingType}?id=${novelId}`);
    } catch (error) {
      console.error('Failed to update setting type:', error);
      setSaveError('Failed to update setting type');
    } finally {
      setIsSaving(false);
    }
  };

  const settingTypes = [
    {
      icon: Box,
      title: 'Contained',
      description: 'A focused, intimate setting where the story unfolds within defined boundaries. Perfect for character-driven narratives and intense personal stories.',
      examples: ['A single household', 'A small town', 'A school campus', 'A remote facility']
    },
    {
      icon: Globe,
      title: 'Expansive',
      description: 'A vast, sprawling setting that spans multiple locations or realms. Ideal for epic adventures and stories with broad scope.',
      examples: ['Multiple countries', 'Different worlds', 'Vast empires', 'Interconnected realms']
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Choose Your Setting Type
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Select the scope of your story's world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {settingTypes.map((type, index) => (
                <motion.button
                  key={type.title}
                  onClick={() => handleTypeSelect(type.title.toLowerCase() as 'contained' | 'expansive')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className={`
                    relative p-8 rounded-3xl text-left transition-all duration-300
                    ${settingType === type.title.toLowerCase()
                      ? 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/50 dark:to-blue-900/50 shadow-xl shadow-indigo-100/50 dark:shadow-indigo-900/20 border-2 border-indigo-100 dark:border-indigo-800'
                      : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 hover:from-indigo-50 hover:to-blue-50 dark:hover:from-indigo-900/30 dark:hover:to-blue-900/30 border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-indigo-100/30 dark:hover:shadow-indigo-900/10'
                    }
                    group
                  `}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative flex items-start gap-6">
                    <div className={`
                      flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br p-0.5
                      ${settingType === type.title.toLowerCase()
                        ? 'from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400'
                        : 'from-gray-400 to-slate-400 dark:from-gray-500 dark:to-slate-500 group-hover:from-indigo-500 group-hover:to-blue-500 dark:group-hover:from-indigo-400 dark:group-hover:to-blue-400'
                      }
                      transition-all duration-200
                    `}>
                      <div className="flex items-center justify-center w-full h-full rounded-xl bg-white dark:bg-gray-900">
                        <type.icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        font-semibold text-xl mb-2 truncate
                        ${settingType === type.title.toLowerCase()
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {type.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4">
                        {type.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-sm bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center pt-12 max-w-4xl mx-auto"
            >
              <motion.button
                onClick={() => router.push(`/dashboard/novels/create/genre?id=${novelId}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Genre
              </motion.button>

              {settingType && (
                <motion.button
                  onClick={handleContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
                >
                  Continue to Setting Details
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 