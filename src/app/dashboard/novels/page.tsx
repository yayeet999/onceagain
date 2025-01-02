'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  Lightbulb,
  BookMarked,
  Wand2,
  Brain,
  Target,
  Compass,
  Palette,
  Layers,
  Plus,
  Pen,
  Workflow,
  Zap,
  Book,
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function NovelWorkshopPage() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/dashboard/novels/create"
                className="block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl group"
              >
                <div className="relative p-8">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                  <div className="relative space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                        <Book className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Create Your Novel</h2>
                        <p className="text-slate-300">Begin your creative journey with AI assistance</p>
                      </div>
                    </div>
                    <p className="text-slate-300 max-w-2xl">
                      Start crafting your novel with our AI-powered writing tools. Set up your novel's structure,
                      develop your world and characters, and let your creativity flow.
                    </p>
                    <div className="flex justify-end">
                      <motion.div
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Create Novel
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 