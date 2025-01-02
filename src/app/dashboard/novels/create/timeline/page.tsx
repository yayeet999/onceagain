'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, ChevronLeft, ChevronRight, Calendar, Clock,
  Clock1, Clock3, Clock4, Clock2,
  CalendarDays, CalendarRange, CalendarClock, CalendarCheck,
  CalendarPlus, CalendarMinus, CalendarX, CalendarOff
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

interface TimelineOption {
  icon: any;
  title: string;
  description: string;
}

interface DetailedTimelineOption {
  icon: any;
  title: string;
  description: string[];
}

export default function TimelinePage() {
  const router = useRouter();
  const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
  const [selectedDetailedOption, setSelectedDetailedOption] = useState<string | null>(null);

  const timelineOptions: TimelineOption[] = [
    {
      icon: Calendar,
      title: 'Linear Timeline',
      description: 'Sequential progression through specific time periods'
    },
    {
      icon: Clock,
      title: 'Non-Linear Timeline',
      description: 'Complex time structures with multiple periods or alternative histories'
    }
  ];

  const linearOptions: TimelineOption[] = [
    { icon: CalendarDays, title: 'Prehistoric', description: 'Before 3000 BCE' },
    { icon: CalendarRange, title: 'Ancient', description: '3000 BCE - 500 BCE' },
    { icon: CalendarClock, title: 'Classical', description: '500 BCE - 500 CE' },
    { icon: CalendarCheck, title: 'Medieval', description: '500 - 1500 CE' },
    { icon: CalendarPlus, title: 'Early Modern', description: '1500 - 1800' },
    { icon: CalendarMinus, title: 'Modern', description: '1800 - Present' },
    { icon: CalendarX, title: 'Near Future', description: 'Next 100 years' },
    { icon: CalendarOff, title: 'Far Future', description: 'Beyond 100 years' }
  ];

  const nonLinearOptions: DetailedTimelineOption[] = [
    {
      icon: Clock1,
      title: 'PARALLEL PATHS',
      description: [
        'Multiple storylines running simultaneously',
        'Different characters/places at same time',
        'Stories that intersect and diverge',
        'Example: Multiple family members\' stories happening concurrently'
      ]
    },
    {
      icon: Clock2,
      title: 'MEMORY WEAVE',
      description: [
        'Present-day framework with flashbacks',
        'Past events revealing current mysteries',
        'Memories triggered by present events',
        'Example: Character uncovering past through memories'
      ]
    },
    {
      icon: Clock3,
      title: 'TIME JUMPS',
      description: [
        'Large gaps between story segments',
        'Significant time skips forward/backward',
        'Connected but distant time periods',
        'Example: Story showing key moments across decades'
      ]
    },
    {
      icon: Clock4,
      title: 'CONVERGING TIMELINES',
      description: [
        'Multiple timelines that merge',
        'Different starting points meeting at key moment',
        'Stories colliding at crucial point',
        'Example: Different character journeys leading to one event'
      ]
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
                Choose Your Timeline Structure
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {timelineOptions.map((option, index) => (
                <motion.button
                  key={option.title}
                  onClick={() => {
                    setSelectedTimeline(option.title);
                    setSelectedDetailedOption(null);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  className={`
                    relative p-8 rounded-3xl text-left transition-all duration-300
                    ${selectedTimeline === option.title
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
                      ${selectedTimeline === option.title 
                        ? 'from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400'
                        : 'from-gray-400 to-slate-400 dark:from-gray-500 dark:to-slate-500 group-hover:from-indigo-500 group-hover:to-blue-500 dark:group-hover:from-indigo-400 dark:group-hover:to-blue-400'
                      }
                      transition-all duration-200
                    `}>
                      <div className="flex items-center justify-center w-full h-full rounded-xl bg-white dark:bg-gray-900">
                        <option.icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        font-semibold text-xl mb-2 truncate
                        ${selectedTimeline === option.title
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-gray-900 dark:text-white'
                        }
                      `}>
                        {option.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detailed Options */}
            <AnimatePresence mode="wait">
              {selectedTimeline && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {selectedTimeline === 'Linear Timeline' ? (
                      // Linear Timeline Options
                      linearOptions.map((option, index) => (
                        <motion.button
                          key={option.title}
                          onClick={() => setSelectedDetailedOption(option.title)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.05 }
                          }}
                          className={`
                            relative p-5 rounded-2xl text-left transition-all duration-300
                            ${selectedDetailedOption === option.title
                              ? 'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/50 dark:to-indigo-900/50 shadow-lg shadow-violet-100/50 dark:shadow-violet-900/20 border-2 border-violet-100 dark:border-violet-800'
                              : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 hover:from-violet-50 hover:to-indigo-50 dark:hover:from-violet-900/30 dark:hover:to-indigo-900/30 border-2 border-transparent hover:border-violet-100 dark:hover:border-violet-800 hover:shadow-md hover:shadow-violet-100/30 dark:hover:shadow-violet-900/10'
                            }
                            group
                          `}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <div className={`
                              flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br p-0.5
                              ${selectedDetailedOption === option.title 
                                ? 'from-violet-500 to-indigo-500 dark:from-violet-400 dark:to-indigo-400'
                                : 'from-gray-400 to-slate-400 dark:from-gray-500 dark:to-slate-500 group-hover:from-violet-500 group-hover:to-indigo-500 dark:group-hover:from-violet-400 dark:group-hover:to-indigo-400'
                              }
                              transition-all duration-200
                            `}>
                              <div className="flex items-center justify-center w-full h-full rounded-lg bg-white dark:bg-gray-900">
                                <option.icon className="w-5 h-5" />
                              </div>
                            </div>
                            <h4 className={`
                              font-medium text-base truncate
                              ${selectedDetailedOption === option.title
                                ? 'text-violet-600 dark:text-violet-400'
                                : 'text-gray-900 dark:text-white'
                              }
                            `}>
                              {option.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm pl-14">
                            {option.description}
                          </p>
                        </motion.button>
                      ))
                    ) : (
                      // Non-Linear Timeline Options
                      nonLinearOptions.map((option, index) => (
                        <motion.button
                          key={option.title}
                          onClick={() => setSelectedDetailedOption(option.title)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.1 }
                          }}
                          className={`
                            relative p-6 rounded-2xl text-left transition-all duration-300 col-span-1 sm:col-span-2
                            ${selectedDetailedOption === option.title
                              ? 'bg-gradient-to-br from-fuchsia-50 to-violet-50 dark:from-fuchsia-900/50 dark:to-violet-900/50 shadow-lg shadow-fuchsia-100/50 dark:shadow-fuchsia-900/20 border-2 border-fuchsia-100 dark:border-fuchsia-800'
                              : 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 hover:from-fuchsia-50 hover:to-violet-50 dark:hover:from-fuchsia-900/30 dark:hover:to-violet-900/30 border-2 border-transparent hover:border-fuchsia-100 dark:hover:border-fuchsia-800 hover:shadow-md hover:shadow-fuchsia-100/30 dark:hover:shadow-fuchsia-900/10'
                            }
                            group
                          `}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`
                              flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br p-0.5
                              ${selectedDetailedOption === option.title 
                                ? 'from-fuchsia-500 to-violet-500 dark:from-fuchsia-400 dark:to-violet-400'
                                : 'from-gray-400 to-slate-400 dark:from-gray-500 dark:to-slate-500 group-hover:from-fuchsia-500 group-hover:to-violet-500 dark:group-hover:from-fuchsia-400 dark:group-hover:to-violet-400'
                              }
                              transition-all duration-200
                            `}>
                              <div className="flex items-center justify-center w-full h-full rounded-lg bg-white dark:bg-gray-900">
                                <option.icon className="w-6 h-6" />
                              </div>
                            </div>
                            <h4 className={`
                              font-medium text-lg truncate
                              ${selectedDetailedOption === option.title
                                ? 'text-fuchsia-600 dark:text-fuchsia-400'
                                : 'text-gray-900 dark:text-white'
                              }
                            `}>
                              {option.title}
                            </h4>
                          </div>
                          <ul className="space-y-2 pl-16">
                            {option.description.map((item, i) => (
                              <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/50 dark:bg-fuchsia-500/50 mt-1.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center pt-12 max-w-4xl mx-auto"
            >
              <motion.button
                onClick={() => router.push('/dashboard/novels/create/setting')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Setting
              </motion.button>

              {selectedDetailedOption && (
                <motion.button
                  onClick={() => router.push('/dashboard/novels/create/parameters')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
                >
                  Continue to Settings Parameters
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