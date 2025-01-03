'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, User, ChevronLeft, ChevronRight, X, Crown, BookOpen, Heart, Zap, SmilePlus, CircleDot, Star, Shield, Plus, Users, UserMinus } from 'lucide-react';
import { useCharacterStore } from '@/store/useCharacterStore';
import type { WorkflowStep, NovelWorkflowStep } from '@/types/workflow';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CharacterData {
  role: string | null;
  name: string;
  age: number;
  gender: string;
  description: string;
  archetype: string | null;
  backgroundEvents: BackgroundEvent[];
  personalityTraits: { title: string; description: string }[];
  traits: string[];
  motivations: string[];
  goals: string[];
  characterType: string;
}

interface BackgroundEvent {
  id: number;
  type: EventType;
  age: number;
  description: string;
}

type EventType = 'Early Life' | 'Defining Moment' | 'Major Victory' | 'Significant Loss';

interface CharacterSlotsStepProps {
  setCurrentWorkflowStep: (step: NovelWorkflowStep) => void;
  setCurrentStep: (step: NovelWorkflowStep) => void;
}

export const CharacterSlotsStep = ({ setCurrentWorkflowStep, setCurrentStep }: CharacterSlotsStepProps) => {
  const { characters } = useCharacterStore();
  const [selectedSlot, setSelectedSlot] = React.useState<number | null>(null);
  const [modalStep, setModalStep] = React.useState(1);
  const [characterData, setCharacterData] = React.useState<{ [key: number]: CharacterData }>({});

  // Create an array of 6 slots
  const slots = Array.from({ length: 6 }, (_, i) => i + 1);

  const handleCharacterClick = (slotNumber: number) => {
    if (!characterData[slotNumber]) {
      setCharacterData(prev => ({
        ...prev,
        [slotNumber]: {
          role: null,
          name: '',
          age: 25,
          gender: '',
          description: '',
          archetype: null,
          backgroundEvents: [],
          personalityTraits: [],
          traits: [],
          motivations: [],
          goals: [],
          characterType: 'primary'
        }
      }));
    }
    setSelectedSlot(slotNumber);
    setModalStep(1);
  };

  const handleCloseCharacter = () => {
    setSelectedSlot(null);
    setModalStep(1);
  };

  const canContinue = Object.keys(characters).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-slate-600 dark:text-slate-300" />
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Create Your Characters
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="w-4/6 h-full bg-slate-600 dark:bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      >
        {/* Description */}
        <div className="max-w-2xl">
          <p className="text-slate-600 dark:text-slate-300">
            Create up to six characters for your story. Each character can be customized with unique traits, backgrounds, and relationships.
          </p>
        </div>

        {/* Character Slots Grid */}
        <div className="grid grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {slots.map((slotNumber) => {
            const character = characters[slotNumber];
            return (
              <motion.div
                key={slotNumber}
                onClick={() => handleCharacterClick(slotNumber)}
                className={`
                  relative group h-[144px] p-4 rounded-lg text-left
                  bg-slate-50 dark:bg-slate-900/80
                  border border-slate-200 dark:border-slate-800
                  shadow-sm hover:shadow-md
                  transition-all duration-200
                  cursor-pointer
                `}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col h-full justify-center items-center text-center">
                  <UserPlus className="w-8 h-8 text-slate-400 dark:text-slate-600 mb-2" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Add Character
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Character Creation Modal */}
        <AnimatePresence>
          {selectedSlot !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <Card className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 pointer-events-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 pb-4 z-40">
                  <button
                    onClick={handleCloseCharacter}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                  {modalStep === 1 && (
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">Basic Information</h3>
                      <p className="text-gray-600 dark:text-gray-400">Define your character's core attributes and role in the story</p>
                    </div>
                  )}
                  {modalStep === 2 && (
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">Backstory</h3>
                      <p className="text-gray-600 dark:text-gray-400">Shape your character's history through key life events</p>
                    </div>
                  )}
                  {modalStep === 3 && (
                    <div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">Personality</h3>
                      <p className="text-gray-600 dark:text-gray-400">Define your character's core personality traits</p>
                    </div>
                  )}
                  {modalStep === 4 && (
                    <div className="p-6 pt-2">
                      <div className="flex justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          onClick={() => setModalStep(2)}
                          variant="outline"
                          className="flex items-center gap-2 px-6"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous Step
                        </Button>
                        <Button
                          onClick={() => setModalStep(4)}
                          className="flex items-center gap-2 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 pt-2">
                  {/* Step 1: Basic Information */}
                  {modalStep === 1 && (
                    <div className="space-y-6">
                      {/* Name Input */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Character Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={characterData[selectedSlot]?.name || ''}
                          onChange={(e) => setCharacterData(prev => ({
                            ...prev,
                            [selectedSlot]: {
                              ...prev[selectedSlot],
                              name: e.target.value
                            }
                          }))}
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter character name"
                        />
                      </div>

                      {/* Role Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Character Role
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {/* Protagonist */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'protagonist'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'protagonist'
                                ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/30'
                                : 'border-gray-200 hover:border-yellow-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Crown className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'protagonist'
                                  ? 'text-yellow-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Protagonist</div>
                              <div className="text-xs text-gray-500">Main character</div>
                            </div>
                          </div>

                          {/* Antagonist */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'antagonist'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'antagonist'
                                ? 'bg-red-50 border-red-500 dark:bg-red-900/30'
                                : 'border-gray-200 hover:border-red-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Shield className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'antagonist'
                                  ? 'text-red-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Antagonist</div>
                              <div className="text-xs text-gray-500">Main opposition</div>
                            </div>
                          </div>

                          {/* Mentor */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'mentor'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'mentor'
                                ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                                : 'border-gray-200 hover:border-blue-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <BookOpen className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'mentor'
                                  ? 'text-blue-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Mentor</div>
                              <div className="text-xs text-gray-500">Guide</div>
                            </div>
                          </div>

                          {/* Confidant */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'confidant'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'confidant'
                                ? 'bg-green-50 border-green-500 dark:bg-green-900/30'
                                : 'border-gray-200 hover:border-green-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Heart className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'confidant'
                                  ? 'text-green-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Confidant</div>
                              <div className="text-xs text-gray-500">Trusted ally</div>
                            </div>
                          </div>

                          {/* Catalyst */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'catalyst'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'catalyst'
                                ? 'bg-purple-50 border-purple-500 dark:bg-purple-900/30'
                                : 'border-gray-200 hover:border-purple-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Zap className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'catalyst'
                                  ? 'text-purple-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Catalyst</div>
                              <div className="text-xs text-gray-500">Change agent</div>
                            </div>
                          </div>

                          {/* Comic Relief */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                role: 'comic-relief'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.role === 'comic-relief'
                                ? 'bg-pink-50 border-pink-500 dark:bg-pink-900/30'
                                : 'border-gray-200 hover:border-pink-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <SmilePlus className={`w-6 h-6 mb-2 ${
                                characterData[selectedSlot]?.role === 'comic-relief'
                                  ? 'text-pink-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="font-semibold mb-1">Comic Relief</div>
                              <div className="text-xs text-gray-500">Humor</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Age Slider */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Age: <span className="text-base">{characterData[selectedSlot]?.age || 25}</span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={characterData[selectedSlot]?.age || 25}
                          onChange={(e) => setCharacterData(prev => ({
                            ...prev,
                            [selectedSlot]: {
                              ...prev[selectedSlot],
                              age: parseInt(e.target.value)
                            }
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-end text-sm text-gray-500 mt-1">
                          <span>100</span>
                        </div>
                      </div>

                      {/* Character Type */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Character Type
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {/* Primary */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                characterType: 'primary'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.characterType === 'primary'
                                ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30'
                                : 'border-gray-200 hover:border-indigo-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-5 h-5 mb-1.5 ${
                                characterData[selectedSlot]?.characterType === 'primary'
                                  ? 'text-indigo-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-sm font-medium">Primary</div>
                            </div>
                          </div>

                          {/* Secondary */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                characterType: 'secondary'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.characterType === 'secondary'
                                ? 'bg-violet-50 border-violet-500 dark:bg-violet-900/30'
                                : 'border-gray-200 hover:border-violet-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-5 h-5 mb-1.5 ${
                                characterData[selectedSlot]?.characterType === 'secondary'
                                  ? 'text-violet-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-sm font-medium">Secondary</div>
                            </div>
                          </div>

                          {/* Supporting */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                characterType: 'supporting'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.characterType === 'supporting'
                                ? 'bg-teal-50 border-teal-500 dark:bg-teal-900/30'
                                : 'border-gray-200 hover:border-teal-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-5 h-5 mb-1.5 ${
                                characterData[selectedSlot]?.characterType === 'supporting'
                                  ? 'text-teal-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-sm font-medium">Supporting</div>
                            </div>
                          </div>

                          {/* Minor */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                characterType: 'minor'
                              }
                            }))}
                            className={`cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.characterType === 'minor'
                                ? 'bg-amber-50 border-amber-500 dark:bg-amber-900/30'
                                : 'border-gray-200 hover:border-amber-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-5 h-5 mb-1.5 ${
                                characterData[selectedSlot]?.characterType === 'minor'
                                  ? 'text-amber-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-sm font-medium">Minor</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Gender Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Gender
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                          {/* Male */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                gender: 'male'
                              }
                            }))}
                            className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.gender === 'male'
                                ? 'bg-sky-50 border-sky-500 dark:bg-sky-900/30'
                                : 'border-gray-200 hover:border-sky-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-4 h-4 mb-1 ${
                                characterData[selectedSlot]?.gender === 'male'
                                  ? 'text-sky-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-xs font-medium">Male</div>
                            </div>
                          </div>

                          {/* Female */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                gender: 'female'
                              }
                            }))}
                            className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.gender === 'female'
                                ? 'bg-rose-50 border-rose-500 dark:bg-rose-900/30'
                                : 'border-gray-200 hover:border-rose-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-4 h-4 mb-1 ${
                                characterData[selectedSlot]?.gender === 'female'
                                  ? 'text-rose-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-xs font-medium">Female</div>
                            </div>
                          </div>

                          {/* Non-Binary */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                gender: 'non-binary'
                              }
                            }))}
                            className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.gender === 'non-binary'
                                ? 'bg-purple-50 border-purple-500 dark:bg-purple-900/30'
                                : 'border-gray-200 hover:border-purple-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-4 h-4 mb-1 ${
                                characterData[selectedSlot]?.gender === 'non-binary'
                                  ? 'text-purple-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-xs font-medium">Non-Binary</div>
                            </div>
                          </div>

                          {/* Object */}
                          <div
                            onClick={() => setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                gender: 'object'
                              }
                            }))}
                            className={`cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                              characterData[selectedSlot]?.gender === 'object'
                                ? 'bg-orange-50 border-orange-500 dark:bg-orange-900/30'
                                : 'border-gray-200 hover:border-orange-300 dark:border-gray-700'
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <Users className={`w-4 h-4 mb-1 ${
                                characterData[selectedSlot]?.gender === 'object'
                                  ? 'text-orange-500'
                                  : 'text-gray-400'
                              }`} />
                              <div className="text-xs font-medium">Object</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Character Description
                        </label>
                        <textarea
                          id="description"
                          value={characterData[selectedSlot]?.description || ''}
                          onChange={(e) => setCharacterData(prev => ({
                            ...prev,
                            [selectedSlot]: {
                              ...prev[selectedSlot],
                              description: e.target.value
                            }
                          }))}
                          rows={4}
                          className="w-full px-3 py-2 text-base border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          placeholder="Describe your character's appearance, personality, and notable features..."
                        />
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-end pt-4">
                        <Button
                          onClick={() => {
                            if (characterData[selectedSlot]?.name && 
                                characterData[selectedSlot]?.role && 
                                characterData[selectedSlot]?.description) {
                              setModalStep(2);
                            }
                          }}
                          disabled={!characterData[selectedSlot]?.name || !characterData[selectedSlot]?.role || !characterData[selectedSlot]?.description}
                          className={`px-6 py-2 text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${
                            characterData[selectedSlot]?.name && characterData[selectedSlot]?.role && characterData[selectedSlot]?.description
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Backstory */}
                  {modalStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <label className="block text-base font-semibold text-gray-700 dark:text-gray-300">
                              Background Events
                            </label>
                            <Button
                              onClick={() => {
                                const newEvent = {
                                  id: Date.now(),
                                  type: 'Early Life' as EventType,
                                  age: 0,
                                  description: ''
                                };
                                setCharacterData(prev => ({
                                  ...prev,
                                  [selectedSlot]: {
                                    ...prev[selectedSlot],
                                    backgroundEvents: [...(prev[selectedSlot]?.backgroundEvents || []), newEvent]
                                  }
                                }));
                              }}
                              variant="outline"
                              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <Plus className="w-4 h-4" />
                              Add Event
                            </Button>
                          </div>

                          <div className="space-y-4">
                            {(characterData[selectedSlot]?.backgroundEvents || []).length === 0 ? (
                              <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <CircleDot className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400">No background events added yet</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">Click "Add Event" to start building your character's history</p>
                              </div>
                            ) : (
                              (characterData[selectedSlot]?.backgroundEvents || []).map((event, index) => (
                                <div 
                                  key={event.id} 
                                  className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-4">
                                      <div className="flex flex-wrap gap-3">
                                        <div className="flex gap-3 w-full mb-2">
                                          <button
                                            onClick={() => {
                                              const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                              updatedEvents[index] = { ...event, type: 'Early Life' };
                                              setCharacterData(prev => ({
                                                ...prev,
                                                [selectedSlot]: {
                                                  ...prev[selectedSlot],
                                                  backgroundEvents: updatedEvents
                                                }
                                              }));
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                                              event.type === 'Early Life'
                                                ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-emerald-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                            }`}
                                          >
                                            <CircleDot className="w-4 h-4" />
                                            Early Life
                                          </button>

                                          <button
                                            onClick={() => {
                                              const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                              updatedEvents[index] = { ...event, type: 'Defining Moment' };
                                              setCharacterData(prev => ({
                                                ...prev,
                                                [selectedSlot]: {
                                                  ...prev[selectedSlot],
                                                  backgroundEvents: updatedEvents
                                                }
                                              }));
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                                              event.type === 'Defining Moment'
                                                ? 'bg-blue-50 text-blue-700 border-2 border-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
                                                : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-blue-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                            }`}
                                          >
                                            <Star className="w-4 h-4" />
                                            Defining Moment
                                          </button>

                                          <button
                                            onClick={() => {
                                              const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                              updatedEvents[index] = { ...event, type: 'Major Victory' };
                                              setCharacterData(prev => ({
                                                ...prev,
                                                [selectedSlot]: {
                                                  ...prev[selectedSlot],
                                                  backgroundEvents: updatedEvents
                                                }
                                              }));
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                                              event.type === 'Major Victory'
                                                ? 'bg-green-50 text-green-700 border-2 border-green-500 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-green-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                            }`}
                                          >
                                            <Crown className="w-4 h-4" />
                                            Major Victory
                                          </button>

                                          <button
                                            onClick={() => {
                                              const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                              updatedEvents[index] = { ...event, type: 'Significant Loss' };
                                              setCharacterData(prev => ({
                                                ...prev,
                                                [selectedSlot]: {
                                                  ...prev[selectedSlot],
                                                  backgroundEvents: updatedEvents
                                                }
                                              }));
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                                              event.type === 'Significant Loss'
                                                ? 'bg-red-50 text-red-700 border-2 border-red-500 dark:bg-red-900/30 dark:text-red-400'
                                                : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-red-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                            }`}
                                          >
                                            <Shield className="w-4 h-4" />
                                            Significant Loss
                                          </button>
                                        </div>
                                      </div>

                                      <div className="flex flex-col gap-1 w-full">
                                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Age: {event.age}</label>
                                        <input
                                          type="range"
                                          min="1"
                                          max={characterData[selectedSlot]?.age || 25}
                                          value={event.age}
                                          onChange={(e) => {
                                            const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                            updatedEvents[index] = { ...event, age: parseInt(e.target.value) || 0 };
                                            setCharacterData(prev => ({
                                              ...prev,
                                              [selectedSlot]: {
                                                ...prev[selectedSlot],
                                                backgroundEvents: updatedEvents
                                              }
                                            }));
                                          }}
                                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                          <span>1</span>
                                          <span>{characterData[selectedSlot]?.age || 25}</span>
                                        </div>
                                      </div>

                                      <textarea
                                        value={event.description}
                                        onChange={(e) => {
                                          const updatedEvents = [...(characterData[selectedSlot]?.backgroundEvents || [])];
                                          updatedEvents[index] = { ...event, description: e.target.value };
                                          setCharacterData(prev => ({
                                            ...prev,
                                            [selectedSlot]: {
                                              ...prev[selectedSlot],
                                              backgroundEvents: updatedEvents
                                            }
                                          }));
                                        }}
                                        rows={3}
                                        className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Describe what happened during this event and how it shaped your character..."
                                      />
                                    </div>

                                    <button
                                      onClick={() => {
                                        const updatedEvents = (characterData[selectedSlot]?.backgroundEvents || []).filter(e => e.id !== event.id);
                                        setCharacterData(prev => ({
                                          ...prev,
                                          [selectedSlot]: {
                                            ...prev[selectedSlot],
                                            backgroundEvents: updatedEvents
                                          }
                                        }));
                                      }}
                                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          onClick={() => setModalStep(1)}
                          variant="outline"
                          className="flex items-center gap-2 px-6"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous Step
                        </Button>
                        <Button
                          onClick={() => setModalStep(3)}
                          className="flex items-center gap-2 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Personality */}
                  {modalStep === 3 && (
                    <div className="p-6 pt-2">
                      <div className="flex justify-between pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          onClick={() => setModalStep(2)}
                          variant="outline"
                          className="flex items-center gap-2 px-6"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous Step
                        </Button>
                        <Button
                          onClick={() => setModalStep(4)}
                          className="flex items-center gap-2 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center pt-12"
        >
          <motion.button
            onClick={() => {
              setCurrentWorkflowStep('plot-structure' as WorkflowStep);
              setCurrentStep('plot-structure' as WorkflowStep);
            }}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
            whileHover={{ x: -5 }}
          >
            <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Plot Structure
          </motion.button>

          <motion.button
            onClick={() => {
              if (canContinue) {
                setCurrentWorkflowStep('relationships');
                setCurrentStep('relationships');
              }
            }}
            disabled={!canContinue}
            className={`
              group flex items-center gap-2 px-8 py-4 rounded-2xl font-medium shadow-lg
              ${canContinue
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }
              transition-all duration-300
            `}
            whileHover={canContinue ? { x: 5, scale: 1.02 } : {}}
            whileTap={canContinue ? { scale: 0.98 } : {}}
          >
            Continue to Relationships
            <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}; 