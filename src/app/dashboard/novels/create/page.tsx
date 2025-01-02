'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { BookOpen, Clock, FileText, Sparkles, ChevronRight } from 'lucide-react';

const NovelSetupPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [title, setTitle] = useState('');
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedStructure, setSelectedStructure] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedStructure('');
  }, [selectedLength]);

  const handleSubmit = async () => {
    if (!title || !selectedLength || !selectedStructure || isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('novels').insert({
        user_id: user.id,
        title,
        length: selectedLength,
        structure: selectedStructure,
        status: 'draft'
      });

      if (error) throw error;

      router.push('/dashboard/novels/create/genre');
    } catch (error) {
      console.error('Error creating novel:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <DashboardLayout>
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
              onChange={(e) => setTitle(e.target.value)}
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
                  onClick={() => setSelectedLength(length.id)}
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
                    onClick={() => setSelectedStructure(structure.id)}
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
              onClick={handleSubmit}
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
    </DashboardLayout>
  );
};

export default NovelSetupPage; 