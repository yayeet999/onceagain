'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ChevronLeft } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function DetailsPage() {
  const router = useRouter();

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
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
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
                Final Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add the finishing touches to your novel setup
              </p>
            </div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-center pt-12"
            >
              <motion.button
                onClick={() => router.back()}
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Settings
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 