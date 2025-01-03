'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, UserPlus, User, Crown, Sword, BookOpen, MessageCircle, Zap, SmilePlus, Plus, X, Star, Trophy, CircleDot, Clock, LucideIcon, Shield, Target, Scale, Heart, Users, UserMinus } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { StrengthsAndFlaws } from '@/components/strengths-and-flaws';
import { MotivationsAndGoals } from '@/components/motivations/MotivationsAndGoals';
import { Button } from "@/components/ui/button";

interface BackgroundEvent {
  id: number;
  type: 'Early Life' | 'Defining Moment' | 'Major Victory' | 'Significant Loss';
  age: number;
  description: string;
}

interface Trait {
  id: string
  title: string
  description: string
  type: 'strength' | 'flaw'
  severity: 'major' | 'minor'
  impact: string
  example: string
}

interface CharacterData {
  role: string | null;
  name: string;
  age: number;
  gender: string;
  description: string;
  archetype: string | null;
  backgroundEvents?: BackgroundEvent[];
  traits?: Trait[];
  motivations?: string[];
  goals?: { id: string; text: string; }[];
  characterType?: 'main' | 'supporting' | 'minor' | 'background';
}

interface BackgroundStoryProps {
  events: BackgroundEvent[];
  onEventsChange: (events: BackgroundEvent[]) => void;
  characterAge: number;
}

interface TypeSelectorProps {
  type: EventType;
  details: {
    color: string;
    borderColor: string;
    icon: LucideIcon;
  };
}

type EventType = 'Early Life' | 'Defining Moment' | 'Major Victory' | 'Significant Loss';

interface EventTypes {
  [key: string]: {
    color: string;
    borderColor: string;
    icon: LucideIcon;
  };
}

interface CompletedCharacter {
  role: string;
  archetype: string;
}

export default function CharactersHubPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const novelId = searchParams.get('id');
  const [characters, setCharacters] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Store data for each character slot
  const [characterData, setCharacterData] = useState<{ [key: number]: CharacterData }>({});
  const [completedCharacters, setCompletedCharacters] = useState<{ [key: number]: CompletedCharacter }>({});

  // Redirect if no valid novelId
    useEffect(() => {
    if (!novelId || novelId === 'null') {
      router.push('/dashboard/novels');
      return;
    }
  }, [novelId, router]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // TODO: Replace with Zustand state management
      router.push(`/dashboard/novels/create/relationships?id=${novelId}`);
    } catch (error) {
      console.error('Failed to save characters:', error);
      setSaveError('Failed to save characters');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCharacterClick = (slotNumber: number) => {
    // Initialize character data if it doesn't exist
    if (!characterData[slotNumber]) {
    setCharacterData(prev => ({
      ...prev,
        [slotNumber]: {
          role: null,
          name: '',
          age: 0,
          gender: '',
          description: '',
          archetype: null,
          backgroundEvents: [],
          traits: [],
          motivations: [],
          goals: []
      }
    }));
    }
    setSelectedSlot(slotNumber);
    setCurrentStep(1);
  };

  const handleCloseCharacter = () => {
    setSelectedSlot(null);
    setCurrentStep(1);
  };

  const characterSlots = Array.from({ length: 6 }, (_, i) => i + 1);

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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Characters</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Define the key characters in your story
            </p>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {characterSlots.map((slotNumber) => {
              const isCompleted = completedCharacters[slotNumber];
              const character = characterData[slotNumber];

              return (
              <motion.div 
                  key={slotNumber}
                whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card
                    className={`h-48 cursor-pointer transition-all duration-200 ${
                      isCompleted ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                    }`}
                    onClick={() => handleCharacterClick(slotNumber)}
                  >
                    {isCompleted ? (
                      <div className="p-4 h-full">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {character?.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {character?.role === 'protagonist' && <Crown className="w-4 h-4 text-yellow-500" />}
                            {character?.role === 'antagonist' && <Sword className="w-4 h-4 text-red-500" />}
                            {character?.role === 'mentor' && <BookOpen className="w-4 h-4 text-blue-500" />}
                            {character?.role === 'confidant' && <MessageCircle className="w-4 h-4 text-green-500" />}
                            {character?.role === 'catalyst' && <Zap className="w-4 h-4 text-purple-500" />}
                            {character?.role === 'comic-relief' && <SmilePlus className="w-4 h-4 text-pink-500" />}
                    </div>
                    </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {character?.description}
                      </p>
                    </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <UserPlus className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">Add Character</p>
                  </div>
                    )}
                  </Card>
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
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
              >
                <div className="absolute inset-0 bg-black/50" onClick={handleCloseCharacter} />
                <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
                  <button
                    onClick={handleCloseCharacter}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                  <div className="p-6">
                    {/* Character Creation Steps */}
                    {currentStep === 1 && (
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold mb-6">Basic Information</h3>
                        
                        {/* Name Input */}
                  <div>
                          <label htmlFor="name" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter character name"
                          />
                  </div>

                        {/* Role Selection */}
                        <div>
                          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Character Role
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'protagonist'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'protagonist'
                                  ? 'bg-yellow-50 border-yellow-500 dark:bg-yellow-900/30'
                                  : 'border-gray-200 hover:border-yellow-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Crown className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'protagonist'
                                    ? 'text-yellow-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Protagonist</div>
                                <div className="text-xs text-gray-500">Main character driving the story</div>
                </div>
              </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'antagonist'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'antagonist'
                                  ? 'bg-red-50 border-red-500 dark:bg-red-900/30'
                                  : 'border-gray-200 hover:border-red-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Sword className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'antagonist'
                                    ? 'text-red-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Antagonist</div>
                                <div className="text-xs text-gray-500">Primary opposition force</div>
                      </div>
                    </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'mentor'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'mentor'
                                  ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                                  : 'border-gray-200 hover:border-blue-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <BookOpen className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'mentor'
                                    ? 'text-blue-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Mentor</div>
                                <div className="text-xs text-gray-500">Guides and teaches</div>
                </div>
              </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'confidant'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'confidant'
                                  ? 'bg-green-50 border-green-500 dark:bg-green-900/30'
                                  : 'border-gray-200 hover:border-green-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Heart className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'confidant'
                                    ? 'text-green-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Confidant</div>
                                <div className="text-xs text-gray-500">Trusted friend and advisor</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'catalyst'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'catalyst'
                                  ? 'bg-purple-50 border-purple-500 dark:bg-purple-900/30'
                                  : 'border-gray-200 hover:border-purple-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Zap className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'catalyst'
                                    ? 'text-purple-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Catalyst</div>
                                <div className="text-xs text-gray-500">Triggers important events</div>
                              </div>
                              </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  role: 'comic-relief'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.role === 'comic-relief'
                                  ? 'bg-pink-50 border-pink-500 dark:bg-pink-900/30'
                                  : 'border-gray-200 hover:border-pink-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <SmilePlus className={`w-8 h-8 mb-2 ${
                                  characterData[selectedSlot]?.role === 'comic-relief'
                                    ? 'text-pink-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-semibold mb-1">Comic Relief</div>
                                <div className="text-xs text-gray-500">Provides humor</div>
                            </div>
                            </div>
                          </div>
                        </div>

                        {/* Character Type Selection */}
                        <div>
                          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Character Type
                          </label>
                          <div className="grid grid-cols-4 gap-4">
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  characterType: 'main'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.characterType === 'main'
                                  ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30'
                                  : 'border-gray-200 hover:border-indigo-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Target className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.characterType === 'main'
                                    ? 'text-indigo-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Main</div>
                                <div className="text-xs text-gray-500">Central to plot</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  characterType: 'supporting'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.characterType === 'supporting'
                                  ? 'bg-teal-50 border-teal-500 dark:bg-teal-900/30'
                                  : 'border-gray-200 hover:border-teal-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Users className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.characterType === 'supporting'
                                    ? 'text-teal-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Supporting</div>
                                <div className="text-xs text-gray-500">Aids story</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  characterType: 'minor'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.characterType === 'minor'
                                  ? 'bg-amber-50 border-amber-500 dark:bg-amber-900/30'
                                  : 'border-gray-200 hover:border-amber-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <UserMinus className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.characterType === 'minor'
                                    ? 'text-amber-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Minor</div>
                                <div className="text-xs text-gray-500">Brief appearance</div>
                                  </div>
                    </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  characterType: 'background'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.characterType === 'background'
                                  ? 'bg-violet-50 border-violet-500 dark:bg-violet-900/30'
                                  : 'border-gray-200 hover:border-violet-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <Users className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.characterType === 'background'
                                    ? 'text-violet-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Background</div>
                                <div className="text-xs text-gray-500">World building</div>
                              </div>
                            </div>
                          </div>
                          </div>

                        {/* Age Slider */}
                          <div>
                          <label htmlFor="age" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Age: <span className="text-blue-600 dark:text-blue-400">{characterData[selectedSlot]?.age || 25}</span>
                            </label>
                            <input
                              type="range"
                              id="age"
                            min="1"
                              max="150"
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
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>1</span>
                            <span>75</span>
                            <span>150</span>
                          </div>
                          </div>

                        {/* Gender Selection */}
                          <div>
                          <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              Gender
                            </label>
                            <div className="grid grid-cols-4 gap-4">
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  gender: 'Male'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.gender === 'Male'
                                  ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30'
                                  : 'border-gray-200 hover:border-blue-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center">
                                <User className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.gender === 'Male'
                                    ? 'text-blue-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Male</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  gender: 'Female'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.gender === 'Female'
                                  ? 'bg-pink-50 border-pink-500 dark:bg-pink-900/30'
                                  : 'border-gray-200 hover:border-pink-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center">
                                <User className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.gender === 'Female'
                                    ? 'text-pink-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Female</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  gender: 'Non-Binary'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.gender === 'Non-Binary'
                                  ? 'bg-purple-50 border-purple-500 dark:bg-purple-900/30'
                                  : 'border-gray-200 hover:border-purple-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center">
                                <User className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.gender === 'Non-Binary'
                                    ? 'text-purple-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Non-Binary</div>
                              </div>
                            </div>
                            <div
                              onClick={() => setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                  ...prev[selectedSlot],
                                  gender: 'Object'
                                }
                              }))}
                              className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                                characterData[selectedSlot]?.gender === 'Object'
                                  ? 'bg-green-50 border-green-500 dark:bg-green-900/30'
                                  : 'border-gray-200 hover:border-green-300 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex flex-col items-center">
                                <Star className={`w-6 h-6 mb-2 ${
                                  characterData[selectedSlot]?.gender === 'Object'
                                    ? 'text-green-500'
                                    : 'text-gray-400'
                                }`} />
                                <div className="font-medium">Object</div>
                              </div>
                            </div>
                            </div>
                          </div>

                        {/* Description */}
                          <div>
                          <label htmlFor="description" className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
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
                            rows={6}
                            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
                                setCurrentStep(2);
                              }
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              Next Step
                          </Button>
                        </div>
                      </div>
                    )}
                {currentStep === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">Backstory</h3>
                            <p className="text-gray-600 dark:text-gray-400">Shape your character's history through key life events</p>
                          </div>
                        </div>
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
                                  <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
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
                                                  ? 'bg-yellow-50 text-yellow-700 border-2 border-yellow-500 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                  : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:border-yellow-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                                              }`}
                                            >
                                              <Trophy className="w-4 h-4" />
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
                            onClick={() => setCurrentStep(1)}
                            variant="outline"
                            className="flex items-center gap-2 px-6"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            Previous Step
                          </Button>
                          <Button
                          onClick={() => setCurrentStep(3)}
                            className="flex items-center gap-2 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                {currentStep === 3 && (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold mb-2">Personality</h3>
                          <p className="text-gray-600 dark:text-gray-400">Define your character's core personality traits and behaviors</p>
                        </div>
                        <MotivationsAndGoals 
                          onComplete={(data) => {
                              setCharacterData(prev => ({
                                ...prev,
                                [selectedSlot]: {
                                    ...prev[selectedSlot],
                                  motivations: data.motivations,
                                  goals: data.goals
                                }
                              }));
                                setCompletedCharacters(prev => ({
                                  ...prev,
                                  [selectedSlot]: {
                                    role: characterData[selectedSlot]?.role || '',
                                    archetype: characterData[selectedSlot]?.archetype || ''
                                  }
                                }));
                                handleCloseCharacter();
                              }}
                            />
                        <div className="flex justify-between mt-6">
                          <Button
                            onClick={() => setCurrentStep(2)}
                            variant="outline"
                          >
                            Previous Step
                          </Button>
                          <Button
                          onClick={() => setCurrentStep(4)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          </Button>
                        </div>
                  </div>
                )}
                {currentStep === 4 && (
                      <div>
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold mb-2">Strengths & Flaws</h3>
                          <p className="text-gray-600 dark:text-gray-400">Balance your character with unique abilities and limitations</p>
                    </div>
                    <StrengthsAndFlaws
                      strengths={characterData[selectedSlot]?.traits?.filter(t => t.type === 'strength') || []}
                      flaws={characterData[selectedSlot]?.traits?.filter(t => t.type === 'flaw') || []}
                          onAddStrength={(trait) => {
                            const newTrait: Trait = { ...trait, id: Date.now().toString(), type: 'strength' };
                            const updatedTraits = [...(characterData[selectedSlot]?.traits || []), newTrait];
                            setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                traits: updatedTraits
                              }
                            }));
                          }}
                          onAddFlaw={(trait) => {
                            const newTrait: Trait = { ...trait, id: Date.now().toString(), type: 'flaw' };
                            const updatedTraits = [...(characterData[selectedSlot]?.traits || []), newTrait];
                            setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                traits: updatedTraits
                              }
                            }));
                          }}
                          onRemoveTrait={(id) => {
                            const updatedTraits = characterData[selectedSlot]?.traits?.filter(t => t.id !== id) || [];
                            setCharacterData(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                ...prev[selectedSlot],
                                traits: updatedTraits
                              }
                            }));
                          }}
                          strengthOptions={[]}
                          flawOptions={[]}
                        />
                        <div className="flex justify-between mt-6">
                          <Button
                            onClick={() => setCurrentStep(3)}
                            variant="outline"
                          >
                            Previous Step
                          </Button>
                          <Button
                          onClick={() => setCurrentStep(5)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Next Step
                          </Button>
                        </div>
                  </div>
                )}
                {currentStep === 5 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Motivations & Goals</h3>
                    <MotivationsAndGoals 
                      onComplete={(data) => {
                          setCharacterData(prev => ({
                            ...prev,
                            [selectedSlot]: {
                                ...prev[selectedSlot],
                              motivations: data.motivations,
                              goals: data.goals
                            }
                          }));
                            setCompletedCharacters(prev => ({
                              ...prev,
                              [selectedSlot]: {
                                role: characterData[selectedSlot]?.role || '',
                                archetype: characterData[selectedSlot]?.archetype || ''
                              }
                            }));
                            handleCloseCharacter();
                          }}
                        />
                        <div className="flex justify-between mt-6">
                          <Button
                            onClick={() => setCurrentStep(4)}
                            variant="outline"
                          >
                            Previous Step
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
              onClick={() => router.push(`/dashboard/novels/create/cultural?id=${novelId}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Cultural Elements
            </motion.button>

              <motion.button
              onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
              >
              Continue to Relationships
                <ChevronRight className="w-5 h-5" />
              </motion.button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 