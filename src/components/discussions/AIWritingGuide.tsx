'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TipSection {
  title: string;
  tips: string[];
  icon: React.ElementType;
}

const tipSections: TipSection[] = [
  {
    title: 'Best Practices',
    icon: CheckCircle2,
    tips: [
      'Be specific and detailed in your prompts',
      'Break down complex tasks into smaller steps',
      'Review and edit AI-generated content carefully',
      'Maintain your unique voice and style',
      'Use AI as a tool, not a replacement',
    ],
  },
  {
    title: 'Pro Tips',
    icon: Lightbulb,
    tips: [
      'Start with a clear outline before generating content',
      'Use AI for brainstorming and ideation',
      'Combine multiple prompts for better results',
      'Save successful prompts for future use',
      'Experiment with different writing styles',
    ],
  },
  {
    title: 'Common Pitfalls',
    icon: AlertCircle,
    tips: [
      'Avoid vague or ambiguous prompts',
      'Don\'t rely solely on AI-generated content',
      'Check facts and references independently',
      'Be mindful of potential biases',
      'Don\'t forget to add your personal touch',
    ],
  },
];

export default function AIWritingGuide() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Writing Guide</h2>
      </div>

      {/* Introduction */}
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to our AI Writing Guide! Here you'll find essential tips and best practices
          to help you make the most of our AI writing tools. Whether you're writing a novel,
          blog post, or story, these guidelines will help you achieve better results.
        </p>
      </div>

      {/* Tips Sections */}
      <div className="grid gap-6">
        {tipSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.title;

          return (
            <motion.div
              key={section.title}
              layout
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.title)}
                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isExpanded ? 'Click to collapse' : 'Click to expand'}
                    </p>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-6"
                >
                  <ul className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                        {tip}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Additional Resources */}
      <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Need More Help?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Check out our detailed documentation and tutorials for more advanced tips and techniques.
        </p>
        <Button variant="outline">
          View Documentation
        </Button>
      </div>
    </motion.div>
  );
}
