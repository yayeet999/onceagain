'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Map, MessageSquare, GitBranch, Settings, Play, Crown, Sparkles, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InteractiveAITab() {
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
          <Globe className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Interactive Worlds
          </h1>
        </div>
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          <Crown className="w-4 h-4 mr-2" />
          Create New World
        </Button>
      </div>

      {/* Active Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Featured World Card */}
        <div className="col-span-full bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950 dark:to-sky-950 rounded-xl p-4 sm:p-6 border border-blue-100 dark:border-blue-900">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome to Interactive AI</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create and join interactive story worlds</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <BookOpen className="w-4 h-4" />
              Join Story
            </Button>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Users className="w-4 h-4" />
              Create Character
            </Button>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Map className="w-4 h-4" />
              Explore Worlds
            </Button>
          </div>
        </div>

        {/* World Cards */}
        {[
          {
            title: "Murder at Blackwood Manor",
            description: "Uncover dark secrets in a Victorian mansion",
            participants: 0,
            status: "Ready to start",
            icon: "🔍",
            difficulty: "Challenging",
            duration: "2-3 hours"
          },
          {
            title: "The Silent Witness",
            description: "Solve a cold case in modern-day London",
            participants: 0,
            status: "Ready to start",
            icon: "🗝️",
            difficulty: "Moderate",
            duration: "1-2 hours"
          },
          {
            title: "Death in the Archives",
            description: "Navigate through historical mysteries",
            participants: 0,
            status: "Ready to start",
            icon: "📜",
            difficulty: "Complex",
            duration: "2-4 hours"
          }
        ].map((world, index) => (
          <motion.div
            key={world.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3 sm:gap-0">
              <div className="flex gap-3 w-full sm:w-auto">
                <span className="text-2xl" role="img" aria-label="mystery icon">{world.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{world.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{world.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">{world.difficulty}</span>
                    <span className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">{world.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3 sm:gap-0">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{world.participants}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <GitBranch className="w-4 h-4" />
                  <span>{world.status}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 shadow-sm w-full sm:w-auto"
              >
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Users, label: "Characters", value: "0 Active" },
          { icon: Map, label: "Worlds", value: "3 Available" },
          { icon: MessageSquare, label: "Interactions", value: "Ready" },
          { icon: Settings, label: "Settings", value: "Configured" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 