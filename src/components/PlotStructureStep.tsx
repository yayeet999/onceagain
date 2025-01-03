import React from 'react';
import { motion } from 'framer-motion';
import {
  Layout,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { usePlotStructureStore } from '@/store/usePlotStructureStore';
import type { NovelWorkflowStep } from '@/types/workflow';
import { plotStructures } from '@/components/data/plotStructures';
import type { PlotStructureType } from '@/store/usePlotStructureStore';
import { ThreeActStructureVisual } from './visualizations/ThreeActStructureVisual';

interface PlotStructureStepProps {
  setCurrentWorkflowStep: (step: NovelWorkflowStep) => void;
  setCurrentStep: (step: NovelWorkflowStep) => void;
}

interface PlotStructure {
  icon: React.FC<any>;
  title: string;
  description: string;
  bestFor: string[];
}

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

export const PlotStructureStep: React.FC<PlotStructureStepProps> = ({
  setCurrentWorkflowStep,
  setCurrentStep,
}) => {
  const {
    selectedStructure,
    isDetailsOpen,
    setSelectedStructure,
    openDetails,
    closeDetails,
    canContinue: plotStructureCanContinue
  } = usePlotStructureStore();

  const structures = plotStructures as Record<PlotStructureType, PlotStructure>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-orange-950">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout className="w-8 h-8 text-amber-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Choose Your Plot Structure
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="w-4/6 h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      >
        {/* Plot Structure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(structures).map(([id, structure]) => {
            const Icon = structure.icon;
            return (
              <motion.button
                key={id}
                onClick={() => {
                  setSelectedStructure(id as PlotStructureType);
                  openDetails();
                }}
                className={`p-6 rounded-2xl border ${
                  selectedStructure === id
                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/50 hover:border-amber-200 dark:hover:border-amber-800/50'
                } transition-all duration-200 text-left group relative overflow-hidden`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      selectedStructure === id 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{structure.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{structure.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {structure.bestFor.map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Structure Details Popup */}
        {isDetailsOpen && selectedStructure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 flex items-center justify-center">
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeDetails} />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-4xl w-full p-8"
              >
                {/* Close Button */}
                <button
                  onClick={closeDetails}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                      {structures[selectedStructure].icon && (
                        <div className="w-8 h-8 text-amber-600 dark:text-amber-400">
                          {React.createElement(structures[selectedStructure].icon)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {structures[selectedStructure].title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {structures[selectedStructure].description}
                      </p>
                    </div>
                  </div>

                  {/* Structure-Specific Animation */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                    {selectedStructure === 'three-act' && (
                      <ThreeActStructureVisual />
                    )}
                    {selectedStructure !== 'three-act' && (
                      <div className="h-96 bg-gray-100 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          Animation placeholder for {structures[selectedStructure].title}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Details - These will be populated later */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Elements</h3>
                      <div className="space-y-2">
                        <p className="text-gray-500 dark:text-gray-400">Placeholder for key elements</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Examples</h3>
                      <div className="space-y-2">
                        <p className="text-gray-500 dark:text-gray-400">Placeholder for examples</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center pt-12"
        >
          <motion.button
            onClick={() => {
              setCurrentWorkflowStep('world-settings');
              setCurrentStep('world-settings');
            }}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to World Settings
          </motion.button>

          <motion.button
            onClick={() => {
              if (plotStructureCanContinue()) {
                setCurrentWorkflowStep('characters');
                setCurrentStep('characters');
              }
            }}
            disabled={!plotStructureCanContinue()}
            className={`
              group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
              ${plotStructureCanContinue()
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:shadow-xl'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }
              transition-all duration-300
            `}
            whileHover={plotStructureCanContinue() ? { x: 5, scale: 1.02 } : {}}
            whileTap={plotStructureCanContinue() ? { scale: 0.98 } : {}}
          >
            Continue to Characters
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}; 