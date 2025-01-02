'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Cpu, Users, Trees, Globe, Wand2, ChevronLeft, ChevronRight, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function ParametersPage() {
  const router = useRouter();
  const [magicLevel, setMagicLevel] = useState(false)
  const [technologyLevel, setTechnologyLevel] = useState(50)
  const [socialComplexity, setSocialComplexity] = useState(50)
  const [environmentalDiversity, setEnvironmentalDiversity] = useState(50)
  const [culturalRange, setCulturalRange] = useState(50)
  const [supernaturalPresence, setSupernaturalPresence] = useState(false)

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
        <TooltipProvider>
          <div className="max-w-4xl mx-auto p-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Configure World System Parameters</h2>
            </motion.div>

            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8 space-y-10 bg-white dark:bg-gray-900">
                {/* Magic Level */}
                <ParameterControl
                  icon={<Sparkles className="w-6 h-6 text-purple-500" />}
                  title="Magic Level"
                  description="Toggle the presence of magic in your world"
                  control={
                    <Switch
                      checked={magicLevel}
                      onCheckedChange={setMagicLevel}
                      className="data-[state=checked]:bg-purple-500"
                    />
                  }
                  value={magicLevel ? "Magical world" : "No magic, purely mundane world"}
                />

                {/* Technology Level */}
                <ParameterControl
                  icon={<Cpu className="w-6 h-6 text-blue-500" />}
                  title="Technology Level"
                  description="Set the technological advancement of your world"
                  control={
                    <Slider
                      value={[technologyLevel]}
                      onValueChange={(value) => setTechnologyLevel(value[0])}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  }
                  value={`${technologyLevel}% - ${getTechnologyDescription(technologyLevel)}`}
                />

                {/* Social Complexity */}
                <ParameterControl
                  icon={<Users className="w-6 h-6 text-green-500" />}
                  title="Social Complexity"
                  description="Define the intricacy of social structures and organizations"
                  control={
                    <Slider
                      value={[socialComplexity]}
                      onValueChange={(value) => setSocialComplexity(value[0])}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  }
                  value={`${socialComplexity}% - ${getSocialComplexityDescription(socialComplexity)}`}
                />

                {/* Environmental Diversity */}
                <ParameterControl
                  icon={<Trees className="w-6 h-6 text-emerald-500" />}
                  title="Environmental Diversity"
                  description="Set the variety of ecosystems and climates"
                  control={
                    <Slider
                      value={[environmentalDiversity]}
                      onValueChange={(value) => setEnvironmentalDiversity(value[0])}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  }
                  value={`${environmentalDiversity}% - ${getEnvironmentalDiversityDescription(environmentalDiversity)}`}
                />

                {/* Cultural Range */}
                <ParameterControl
                  icon={<Globe className="w-6 h-6 text-orange-500" />}
                  title="Cultural Range"
                  description="Define the diversity of customs, beliefs, and traditions"
                  control={
                    <Slider
                      value={[culturalRange]}
                      onValueChange={(value) => setCulturalRange(value[0])}
                      max={100}
                      step={1}
                      className="cursor-pointer"
                    />
                  }
                  value={`${culturalRange}% - ${getCulturalRangeDescription(culturalRange)}`}
                />

                {/* Supernatural Presence */}
                <ParameterControl
                  icon={<Wand2 className="w-6 h-6 text-violet-500" />}
                  title="Supernatural Presence"
                  description="Toggle the existence of supernatural elements"
                  control={
                    <Switch
                      checked={supernaturalPresence}
                      onCheckedChange={setSupernaturalPresence}
                      className="data-[state=checked]:bg-violet-500"
                    />
                  }
                  value={supernaturalPresence ? "Supernatural elements present" : "No supernatural elements"}
                />
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center pt-12"
            >
              <motion.button
                onClick={() => router.push('/dashboard/novels/create/timeline')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Timeline
              </motion.button>

              <motion.button
                onClick={() => router.push('/dashboard/novels/create/cultural')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
              >
                Continue to Cultural Elements
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </DashboardLayout>
  )
}

interface ParameterControlProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  control: React.ReactNode;
  value: string;
}

function ParameterControl({ icon, title, description, control, value }: ParameterControlProps) {
  return (
    <motion.div 
      className="flex items-start space-x-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mt-1">{icon}</div>
      <div className="flex-grow space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                <Info className="w-4 h-4" />
                <span className="sr-only">More info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="w-full max-w-sm">{control}</div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[120px] text-right">{value}</div>
        </div>
      </div>
    </motion.div>
  )
}

function getTechnologyDescription(level: number): string {
  if (level < 20) return "Stone Age"
  if (level < 40) return "Bronze Age"
  if (level < 60) return "Industrial Age"
  if (level < 80) return "Information Age"
  return "Future Tech"
}

function getSocialComplexityDescription(level: number): string {
  if (level < 20) return "Tribal"
  if (level < 40) return "Chiefdom"
  if (level < 60) return "State-level"
  if (level < 80) return "Complex state"
  return "Global society"
}

function getEnvironmentalDiversityDescription(level: number): string {
  if (level < 20) return "Uniform"
  if (level < 40) return "Low diversity"
  if (level < 60) return "Moderate diversity"
  if (level < 80) return "High diversity"
  return "Extreme diversity"
}

function getCulturalRangeDescription(level: number): string {
  if (level < 20) return "Monoculture"
  if (level < 40) return "Low diversity"
  if (level < 60) return "Moderate diversity"
  if (level < 80) return "High diversity"
  return "Extreme diversity"
} 