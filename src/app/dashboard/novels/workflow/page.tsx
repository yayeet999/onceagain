'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Wand2,
  Target,
  Palette,
  Pen,
  ChevronRight,
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function NovelWorkflowPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-white dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-900">
        <div className="px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link
                  href="/dashboard/novels"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-2 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Back to Novel Workshop
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Novel Creation Journey
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Your guided path to crafting a compelling story
                </p>
              </div>

              <Link
                href="/dashboard/novels/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-sm hover:shadow group"
              >
                Continue to AI Studio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Process Steps */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[2.25rem] top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden lg:block" />
              
              <div className="space-y-6">
                {[
                  {
                    title: "Story Foundation",
                    description: "Begin with your core story elements",
                    icon: Target,
                    color: "blue",
                    steps: [
                      "Define your genre and target audience",
                      "Establish main themes and messages",
                      "Set the tone and writing style",
                      "Choose your narrative perspective"
                    ]
                  },
                  {
                    title: "World Building",
                    description: "Create the universe of your story",
                    icon: Palette,
                    color: "purple",
                    steps: [
                      "Design your story's setting and time period",
                      "Establish world rules and systems",
                      "Create locations and environments",
                      "Define cultural and social elements"
                    ]
                  },
                  {
                    title: "Character Development",
                    description: "Bring your characters to life",
                    icon: Pen,
                    color: "pink",
                    steps: [
                      "Create detailed character profiles",
                      "Define character relationships",
                      "Establish character arcs",
                      "Design character dialogue styles"
                    ]
                  }
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="lg:grid lg:grid-cols-8 lg:gap-8">
                      {/* Number and Line */}
                      <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${section.color}-500 to-${section.color}-600 text-white flex items-center justify-center font-semibold text-lg shadow-lg`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="lg:col-span-7">
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br from-${section.color}-500/10 to-${section.color}-600/10 text-${section.color}-600 dark:text-${section.color}-400 lg:hidden`}>
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-${section.color}-500 to-${section.color}-600 text-white flex items-center justify-center font-semibold text-sm">
                                {index + 1}
                              </div>
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                                {section.title}
                                <section.icon className={`w-5 h-5 text-${section.color}-500`} />
                              </h2>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {section.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {section.steps.map((step, stepIndex) => (
                              <div
                                key={stepIndex}
                                className={`flex items-center gap-2 p-3 rounded-xl bg-${section.color}-50 dark:bg-${section.color}-900/20 group transition-colors`}
                              >
                                <ChevronRight className={`w-4 h-4 text-${section.color}-500`} />
                                <span className={`text-sm text-${section.color}-700 dark:text-${section.color}-300 font-medium`}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 