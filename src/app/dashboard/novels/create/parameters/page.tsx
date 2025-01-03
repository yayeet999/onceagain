'use client';

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams();
  const novelId = searchParams.get('id');
  const [magicLevel, setMagicLevel] = useState(false);
  const [technologyLevel, setTechnologyLevel] = useState(50);
  const [socialComplexity, setSocialComplexity] = useState(50);
  const [environmentalDiversity, setEnvironmentalDiversity] = useState(50);
  const [culturalRange, setCulturalRange] = useState(50);
  const [supernaturalPresence, setSupernaturalPresence] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // TODO: Replace with Zustand state initialization
  useEffect(() => {
    if (!novelId || novelId === 'null') {
      router.push('/dashboard/novels');
    }
  }, [novelId, router]);

  const handleContinue = async () => {
    if (!novelId) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // TODO: Replace with Zustand state management
      router.push(`/dashboard/novels/create/cultural?id=${novelId}`);
    } catch (error) {
      console.error('Failed to save parameters:', error);
      setSaveError('Failed to save parameters');
    } finally {
      setIsSaving(false);
    }
  };

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

        {/* Save Error Display */}
        {saveError && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <p className="text-sm text-red-500 dark:text-red-400">
              {saveError}
            </p>
          </div>
        )}

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

            {/* Magic Level */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wand2 className="w-6 h-6 text-purple-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Magic Level</h3>
                      <p className="text-sm text-gray-500">Does your world have magic?</p>
                    </div>
                  </div>
                  <Switch
                    checked={magicLevel}
                    onCheckedChange={(checked) => {
                      setMagicLevel(checked);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technology Level */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Technology Level</h3>
                      <p className="text-sm text-gray-500">How advanced is your world's technology?</p>
                    </div>
                  </div>
                  <Slider
                    value={[technologyLevel]}
                    onValueChange={(value) => {
                      setTechnologyLevel(value[0]);
                    }}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Complexity */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Social Complexity</h3>
                      <p className="text-sm text-gray-500">How intricate are your world's social structures?</p>
                    </div>
                  </div>
                  <Slider
                    value={[socialComplexity]}
                    onValueChange={(value) => {
                      setSocialComplexity(value[0]);
                    }}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Environmental Diversity */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Trees className="w-6 h-6 text-emerald-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Environmental Diversity</h3>
                      <p className="text-sm text-gray-500">How varied are your world's environments?</p>
                    </div>
                  </div>
                  <Slider
                    value={[environmentalDiversity]}
                    onValueChange={(value) => {
                      setEnvironmentalDiversity(value[0]);
                    }}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cultural Range */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-indigo-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Cultural Range</h3>
                      <p className="text-sm text-gray-500">How diverse are your world's cultures?</p>
                    </div>
                  </div>
                  <Slider
                    value={[culturalRange]}
                    onValueChange={(value) => {
                      setCulturalRange(value[0]);
                    }}
                    max={100}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Supernatural Presence */}
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-amber-500" />
                    <div>
                      <h3 className="text-lg font-semibold">Supernatural Presence</h3>
                      <p className="text-sm text-gray-500">Are there supernatural elements beyond magic?</p>
                    </div>
                  </div>
                  <Switch
                    checked={supernaturalPresence}
                    onCheckedChange={(checked) => {
                      setSupernaturalPresence(checked);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center pt-12"
            >
              <motion.button
                onClick={() => router.push(`/dashboard/novels/create/genre?id=${novelId}`)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Genre
              </motion.button>

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
              >
                Continue to Cultural
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </DashboardLayout>
  )
} 