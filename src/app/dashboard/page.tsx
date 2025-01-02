'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import {
  PenTool,
  BookOpen,
  Sparkles,
  Zap,
  Star,
  Bell,
  ChevronRight,
  Lightbulb,
  Target,
  Clock,
  ArrowRight,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Writer';

  const stats = [
    { label: 'Stories Created', value: '0', icon: BookOpen },
    { label: 'Words Written', value: '0', icon: PenTool },
    { label: 'Writing Streak', value: '0', icon: Zap },
    { label: 'Time Writing', value: '0h', icon: Clock },
  ];

  const recentProjects = [];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <motion.div 
              className="flex items-center justify-between"
              {...fadeInUp}
            >
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Welcome back, {firstName}
              </h1>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 border border-slate-200/60 dark:border-gray-700/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <stat.icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Start Writing */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* New Story Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                  <div className="relative p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Start Creating
                    </h2>
                    <p className="text-slate-300 mb-6 max-w-xl">
                      Begin your creative journey with our AI-powered writing tools.
                      Choose your preferred format and let your imagination flow.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/dashboard/blogs/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <PenTool className="w-5 h-5" />
                        Blog Post
                      </Link>
                      <Link
                        href="/dashboard/novels/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <BookOpen className="w-5 h-5" />
                        Novel
                      </Link>
                      <Link
                        href="/dashboard/stories/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <Sparkles className="w-5 h-5" />
                        Short Story
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm">
                  <div className="flex items-center justify-between p-6 border-b border-slate-200/60 dark:border-gray-700/40">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                      Recent Projects
                    </h2>
                    <Link
                      href="/dashboard/projects"
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="p-6">
                    {recentProjects.length > 0 ? (
                      <div className="space-y-4">
                        {/* Project items would go here */}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">
                          You haven't created any projects yet.
                          <br />
                          Start writing your first story today!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Tools & Resources */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {/* AI Writing Assistant */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Sparkles className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        AI Writing Assistant
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get help with your writing
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Generate plot ideas
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Create character profiles
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Expand scene descriptions
                    </button>
                  </div>
                </div>

                {/* Writing Goals */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Target className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        Writing Goals
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Track your progress
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Daily Goal</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">0/1000 words</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-slate-600 dark:bg-slate-400 h-2 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Writing Prompts */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Lightbulb className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        Writing Prompts
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get inspired
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left">
                    Click to generate a new writing prompt...
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 