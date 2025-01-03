'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Sparkles, FileText, Clock, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoryWriterTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-4 sm:p-6"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Story Writer
          </h1>
        </div>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Story
        </Button>
      </div>

      {/* Quick Start Section */}
      <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 rounded-xl p-4 sm:p-6 border border-blue-100 dark:border-blue-900">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Start Writing</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose a story type to begin</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { title: "Quick Story", description: "1-2k words", icon: FileText },
            { title: "Short Story", description: "2-5k words", icon: BookOpen },
            { title: "Scene Practice", description: "Single scene", icon: Sparkles },
            { title: "Free Writing", description: "No limits", icon: Plus }
          ].map((type) => (
            <Button
              key={type.title}
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <type.icon className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{type.title}</span>
              <span className="text-xs text-gray-500">{type.description}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Stories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 gap-4 sm:gap-0">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Stories</h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="text-gray-600">
              <Search className="w-4 h-4" />
            </Button>
            <select className="px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm w-full sm:w-auto">
              <option>Recent</option>
              <option>Title</option>
            </select>
          </div>
        </div>
        
        {/* Empty State */}
        <div className="p-6 sm:p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No stories yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Create your first story to get started
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Story
          </Button>
        </div>
      </div>

      {/* Quick Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { title: "AI Plot Help", icon: Sparkles, status: "Available" },
          { title: "Name Generator", icon: Plus, status: "Ready" },
          { title: "Quick Save", icon: FileText, status: "Enabled" },
          { title: "Word Count", icon: Clock, status: "0 words" }
        ].map((tool) => (
          <div
            key={tool.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <tool.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{tool.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{tool.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 