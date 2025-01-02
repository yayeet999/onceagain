'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, UserPlus, User, Crown, Sword, BookOpen, MessageCircle, Zap, SmilePlus, Plus, X, Star, Trophy, CircleDot, Clock, LucideIcon, Shield, Target, Scale, Heart } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { StrengthsAndFlaws } from '@/components/strengths-and-flaws';
import { PersonalityTraitCards } from "@/components/personality-traits/PersonalityTraitCards";
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
  const [characters, setCharacters] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Store data for each character slot
  const [characterData, setCharacterData] = useState<{ [key: number]: CharacterData }>({});
  const [completedCharacters, setCompletedCharacters] = useState<{ [key: number]: CompletedCharacter }>({});

  // Helper function to get or initialize character data
  const getCharacterData = (slot: number): CharacterData => {
    return characterData[slot] || {
      role: null,
      name: '',
      age: 0,
      gender: '',
      description: '',
      archetype: null
    };
  };

  // Update character data for current slot
  const updateCharacterData = (data: Partial<CharacterData>) => {
    if (selectedSlot === null) return;
    
    setCharacterData(prev => ({
      ...prev,
      [selectedSlot]: {
        ...getCharacterData(selectedSlot),
        ...data
      }
    }));
  };

  const currentCharacter = selectedSlot !== null ? getCharacterData(selectedSlot) : null;

  const characterRoles = [
    { 
      id: 'protagonist', 
      icon: Crown, 
      title: 'Protagonist', 
      description: 'Main driver of the story',
      traits: ['Determined', 'Complex', 'Relatable']
    },
    { 
      id: 'antagonist', 
      icon: Sword, 
      title: 'Antagonist', 
      description: 'Primary opposing force',
      traits: ['Challenging', 'Powerful', 'Compelling']
    },
    { 
      id: 'mentor', 
      icon: BookOpen, 
      title: 'Mentor', 
      description: 'Guide or teacher',
      traits: ['Wise', 'Supportive', 'Experienced']
    },
    { 
      id: 'catalyst', 
      icon: Zap, 
      title: 'Catalyst', 
      description: 'Triggers major change/events',
      traits: ['Dynamic', 'Impactful', 'Transformative']
    },
    { 
      id: 'confidant', 
      icon: MessageCircle, 
      title: 'Confidant', 
      description: 'Trusted ally/advisor',
      traits: ['Loyal', 'Empathetic', 'Trustworthy']
    },
    { 
      id: 'comic-relief', 
      icon: SmilePlus, 
      title: 'Comic Relief', 
      description: 'Tension breaker',
      traits: ['Humorous', 'Light-hearted', 'Engaging']
    },
  ];

  const isFormComplete = (slot: number) => {
    const data = getCharacterData(slot);
    
    switch (currentStep) {
      case 1:
        return data.role !== null;
      case 2:
        return data.name.trim() !== '' && 
               data.age > 0 && 
               data.gender !== '' && 
               data.description.trim() !== '';
      case 3:
        return data.backgroundEvents && data.backgroundEvents.length > 0;
      case 4:
        return data.traits && data.traits.length > 0;
      default:
        return false;
    }
  };

  const archetypes = [
    { id: 'hero', title: 'Hero', description: 'A brave and moral protagonist who rises to meet challenges' },
    { id: 'sage', title: 'Sage', description: 'A wise guide who shares knowledge and wisdom' },
    { id: 'rebel', title: 'Rebel', description: 'One who challenges the established order' },
    { id: 'caregiver', title: 'Caregiver', description: 'Protects and nurtures others' },
    { id: 'trickster', title: 'Trickster', description: 'Uses wit and deception to achieve goals' },
    { id: 'explorer', title: 'Explorer', description: 'Seeks out new experiences and challenges' },
  ];

  const traitOptions: Trait[] = [
    {
      id: 'courageous',
      title: 'Courageous',
      description: 'Shows bravery in the face of adversity',
      type: 'strength',
      severity: 'major',
      impact: 'Influences decision-making in critical moments',
      example: 'Stands up against overwhelming odds to protect others'
    },
    {
      id: 'empathetic',
      title: 'Empathetic',
      description: 'Deeply understands and shares others\' feelings',
      type: 'strength',
      severity: 'major',
      impact: 'Builds strong relationships and understanding',
      example: 'Connects with and helps characters in emotional distress'
    },
    {
      id: 'strategic',
      title: 'Strategic',
      description: 'Plans ahead and thinks through consequences',
      type: 'strength',
      severity: 'major',
      impact: 'Makes calculated decisions that benefit long-term goals',
      example: 'Develops complex plans to overcome challenges'
    },
    {
      id: 'stubborn',
      title: 'Stubborn',
      description: 'Refuses to change opinion or course of action',
      type: 'flaw',
      severity: 'major',
      impact: 'Can lead to conflicts and missed opportunities',
      example: 'Ignores advice that could prevent problems'
    },
    {
      id: 'impulsive',
      title: 'Impulsive',
      description: 'Acts without thinking things through',
      type: 'flaw',
      severity: 'major',
      impact: 'Makes rash decisions that cause complications',
      example: 'Rushes into dangerous situations without planning'
    },
    {
      id: 'arrogant',
      title: 'Arrogant',
      description: 'Displays excessive pride and self-importance',
      type: 'flaw',
      severity: 'major',
      impact: 'Alienates others and underestimates threats',
      example: 'Dismisses warnings due to overconfidence'
    }
  ];

  const BackgroundStory: React.FC<BackgroundStoryProps> = ({ events: initialEvents, onEventsChange, characterAge }) => {
    const [events, setEvents] = useState<BackgroundEvent[]>(initialEvents);
    const [showForm, setShowForm] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Omit<BackgroundEvent, 'id'>>({
      type: 'Early Life' as EventType,
      age: 0,
      description: ''
    });

    const eventTypes: Record<EventType, { color: string; borderColor: string; icon: LucideIcon }> = {
      'Early Life': {
        color: 'bg-slate-50 text-slate-700',
        borderColor: 'border-slate-200',
        icon: Clock
      },
      'Defining Moment': {
        color: 'bg-blue-50 text-blue-700',
        borderColor: 'border-blue-200',
        icon: Star
      },
      'Major Victory': {
        color: 'bg-emerald-50 text-emerald-700',
        borderColor: 'border-emerald-200',
        icon: Trophy
      },
      'Significant Loss': {
        color: 'bg-slate-50 text-slate-700',
        borderColor: 'border-slate-200',
        icon: CircleDot
      }
    };

    useEffect(() => {
      const handleEventsChange = () => {
        if (JSON.stringify(events) !== JSON.stringify(initialEvents)) {
          onEventsChange(events);
        }
      };
      handleEventsChange();
    }, [events, initialEvents]);

    const handleAddEvent = () => {
      if (currentEvent.description.trim()) {
        const newEvent: BackgroundEvent = { ...currentEvent, id: Date.now() };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        setCurrentEvent({ type: 'Early Life' as EventType, age: 0, description: '' });
        setShowForm(false);
      }
    };

    const TypeSelector: React.FC<TypeSelectorProps> = ({ type, details }) => {
      const Icon = details.icon;
      return (
        <button
          onClick={() => setCurrentEvent({ ...currentEvent, type })}
          className={`group relative w-full p-3 rounded-lg border transition-all duration-200 
                     ${currentEvent.type === type 
                       ? `${details.color} ${details.borderColor} border-2 shadow-sm` 
                       : 'border-gray-200 hover:bg-gray-50/50'}`}
        >
          <div className="flex items-center gap-2">
            <Icon size={18} className="text-gray-500" />
            <span className="font-medium text-sm">{type}</span>
          </div>
        </button>
      );
    };

    return (
      <Card className="w-full max-w-4xl mx-auto bg-white overflow-hidden">
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-900">Background Story</h1>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm 
                         bg-gray-800 text-white rounded-md hover:bg-gray-900 
                         transition-all duration-200"
              >
                <Plus size={16} />
                Add Event
              </button>
            )}
          </div>

          {showForm && (
            <div className="animate-[slideDown_0.2s_ease-out]">
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(eventTypes as Record<EventType, { color: string; borderColor: string; icon: LucideIcon }>).map(([type, details]) => (
                    <TypeSelector key={type} type={type as EventType} details={details} />
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-600">Age</label>
                    <span className="text-sm text-gray-500">{currentEvent.age} years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={characterAge || 150}
                    value={currentEvent.age}
                    onChange={(e) => setCurrentEvent({
                      ...currentEvent,
                      age: parseInt(e.target.value)
                    })}
                    className="w-full h-1 bg-gray-200 rounded-full appearance-none 
                             cursor-pointer accent-gray-800"
                  />
                </div>

                <div>
                  <textarea
                    value={currentEvent.description}
                    onChange={(e) => setCurrentEvent({
                      ...currentEvent,
                      description: e.target.value
                    })}
                    placeholder="Describe the event and its significance..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md 
                             placeholder:text-gray-400 focus:ring-1 focus:ring-gray-800 
                             focus:border-gray-800 transition-all duration-200 resize-none
                             text-sm"
                  />
                </div>

                <div className="flex justify-end items-center gap-2">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 
                             transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    disabled={!currentEvent.description.trim()}
                    className="px-3 py-1.5 text-sm bg-gray-800 text-white rounded-md
                             hover:bg-gray-900 transition-all duration-200 
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Timeline
                  </button>
                </div>
              </div>
            </div>
          )}

          {events.length > 0 && (
            <div className="space-y-2">
              {events.map((event) => {
                const Icon = eventTypes[event.type].icon;
                return (
                  <div
                    key={event.id}
                    className={`group relative p-3 rounded-md border transition-all duration-200
                               ${eventTypes[event.type].color} ${eventTypes[event.type].borderColor}
                               animate-[fadeIn_0.2s_ease-out] hover:shadow-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} className="text-gray-500" />
                      <span className="text-sm font-medium">{event.type}</span>
                      <span className="text-xs text-gray-500 font-medium">• Age {event.age}</span>
                      <button
                        onClick={() => setEvents(events.filter(e => e.id !== event.id))}
                        className="ml-auto opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-200 text-gray-400 
                                 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-6">{event.description}</p>
                  </div>
                );
              })}
            </div>
          )}

          {!showForm && events.length === 0 && (
            <div className="text-center py-6 px-4 border border-dashed border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">
                Begin documenting key moments in your character's history
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const handleAddStrength = (trait: Omit<Trait, 'id' | 'type'>) => {
    if (selectedSlot === null) return;
    
    const newTrait: Trait = {
      ...trait,
      id: Math.random().toString(36).substr(2, 9),
      type: 'strength'
    };
    
    setCharacterData(prev => ({
      ...prev,
      [selectedSlot]: {
        ...prev[selectedSlot],
        traits: [...(prev[selectedSlot]?.traits || []), newTrait]
      }
    }));
  };

  const handleAddFlaw = (trait: Omit<Trait, 'id' | 'type'>) => {
    if (selectedSlot === null) return;
    
    const newTrait: Trait = {
      ...trait,
      id: Math.random().toString(36).substr(2, 9),
      type: 'flaw'
    };
    
    setCharacterData(prev => ({
      ...prev,
      [selectedSlot]: {
        ...prev[selectedSlot],
        traits: [...(prev[selectedSlot]?.traits || []), newTrait]
      }
    }));
  };

  const handleRemoveTrait = (id: string) => {
    if (selectedSlot === null) return;
    
    setCharacterData(prev => ({
      ...prev,
      [selectedSlot]: {
        ...prev[selectedSlot],
        traits: prev[selectedSlot]?.traits?.filter(trait => trait.id !== id) || []
      }
    }));
  };

  const handleCompleteCharacter = (slot: number) => {
    const character = characterData[slot];
    if (!character) return;

    setCompletedCharacters(prev => ({
      ...prev,
      [slot]: {
        role: character.role || '',
        archetype: character.archetype || ''
      }
    }));
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
                  <div className="w-5/6 h-full bg-gradient-to-r from-gray-500 to-slate-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Refined Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Characters</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Create and manage your story's characters
            </p>
          </div>

          {/* Fixed 2x3 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {/* Character Slots */}
            {[...Array(6)].map((_, index) => (
              <motion.div 
                key={index} 
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedSlot(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  completedCharacters[index] 
                    ? 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' 
                    : 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
                } rounded-lg transition-all duration-200 ${
                  selectedSlot === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                }`} />
                <div className={`relative h-full border ${
                  completedCharacters[index]
                    ? 'border-blue-200 dark:border-blue-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow overflow-hidden`}>
                  {completedCharacters[index] && (
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      {(() => {
                        const character = completedCharacters[index];
                        if (!character) return null;

                        const roleIcon = {
                          'protagonist': Crown,
                          'antagonist': Sword,
                          'mentor': BookOpen,
                          'catalyst': Zap,
                          'confidant': MessageCircle,
                          'comic-relief': SmilePlus
                        }[character.role] || User;
                        
                        const archetypeIcon = {
                          'hero': Crown,
                          'sage': BookOpen,
                          'rebel': Zap,
                          'caregiver': Heart,
                          'trickster': SmilePlus,
                          'explorer': Target
                        }[character.archetype] || Shield;

                        const RoleIcon = roleIcon;
                        const ArchetypeIcon = archetypeIcon;

                        return (
                          <>
                            <RoleIcon className="w-4 h-4 text-blue-500" />
                            <ArchetypeIcon className="w-4 h-4 text-purple-500" />
                          </>
                        );
                      })()}
                    </div>
                  )}
                  <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${
                    selectedSlot === index 
                      ? 'bg-blue-500 dark:bg-blue-400' 
                      : completedCharacters[index]
                        ? 'bg-purple-400 dark:bg-purple-500'
                        : 'bg-gray-200 group-hover:bg-gray-300 dark:bg-gray-600 dark:group-hover:bg-gray-500'
                  }`} />
                  <div className="px-5 py-4 flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors duration-200">
                      <User size={20} className="text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-0.5 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                        {characterData[index]?.name || `Character ${index + 1}`}
                      </h3>
                      <p className="text-gray-400 dark:text-gray-500 text-xs group-hover:text-gray-500 dark:group-hover:text-gray-400">
                        {completedCharacters[index] ? 'Character Complete' : 'Ready to be filled'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Character Creation Steps */}
          {selectedSlot !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Character {selectedSlot + 1} Creation</h2>
                    <p className="text-gray-600 dark:text-gray-400">Step {currentStep} of 6</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative mb-12">
                <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
                <div className="relative flex justify-between max-w-4xl mx-auto">
                  {['Role & Basic Info', 'Archetype', 'Background', 'Traits', 'Personality', 'Motivations'].map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300 ${index + 1 === currentStep ? 'bg-blue-500 text-white scale-110' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {index + 1}
                      </div>
                      <span className={`text-sm transition-all duration-300 ${index + 1 === currentStep ? 'text-blue-500 font-medium scale-105' : 'text-gray-500 dark:text-gray-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }}
                    className="max-w-4xl mx-auto"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Character Role</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {characterRoles.map((role) => {
                        const Icon = role.icon;
                        const isSelected = characterData[selectedSlot]?.role === role.id;
                        return (
                          <motion.button
                            key={role.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateCharacterData({ role: role.id })}
                            className={`flex flex-col p-4 rounded-lg border ${
                              isSelected 
                                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-gray-800'
                            } group transition-colors`}
                          >
                            <div className="flex items-center mb-3">
                              <div className={`mr-4 p-2 rounded-lg ${
                                isSelected 
                                  ? 'bg-blue-100 dark:bg-blue-800' 
                                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'
                              }`}>
                                <Icon className={`w-6 h-6 ${
                                  isSelected 
                                    ? 'text-blue-500 dark:text-blue-400' 
                                    : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                                }`} />
                              </div>
                              <div className="flex-grow text-left">
                                <h4 className={`font-medium ${
                                  isSelected 
                                    ? 'text-blue-500 dark:text-blue-400' 
                                    : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                                }`}>{role.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
                              </div>
                            </div>
                            <AnimatePresence mode="wait">
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ 
                                    opacity: 1, 
                                    height: 'auto',
                                    transition: {
                                      height: { duration: 0.3, ease: "easeOut" },
                                      opacity: { duration: 0.2, delay: 0.1 }
                                    }
                                  }}
                                  exit={{ 
                                    opacity: 0,
                                    height: 0,
                                    transition: {
                                      height: { duration: 0.2, ease: "easeIn" },
                                      opacity: { duration: 0.1 }
                                    }
                                  }}
                                  className="mt-2 border-t border-gray-100 dark:border-gray-700 pt-3 overflow-hidden"
                                >
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Typical traits:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {role.traits.map((trait, index) => (
                                      <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ 
                                          opacity: 1, 
                                          y: 0,
                                          transition: {
                                            duration: 0.2,
                                            delay: index * 0.1
                                          }
                                        }}
                                        className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300"
                                      >
                                        {trait}
                                      </motion.span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Basic Information Form */}
                    {characterData[selectedSlot]?.role && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic Information</h3>
                        
                        <div className="space-y-6">
                          {/* Character Name */}
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Character Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={characterData[selectedSlot]?.name}
                              onChange={(e) => updateCharacterData({ name: e.target.value })}
                              placeholder="Enter character name"
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                          </div>

                          {/* Age */}
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Age ({characterData[selectedSlot]?.age})
                            </label>
                            <input
                              type="range"
                              id="age"
                              min="0"
                              max="150"
                              value={characterData[selectedSlot]?.age}
                              onChange={(e) => updateCharacterData({ age: parseInt(e.target.value) })}
                              className="w-full"
                            />
                          </div>

                          {/* Gender */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Gender
                            </label>
                            <div className="grid grid-cols-4 gap-4">
                              {['Male', 'Female', 'Non-binary', 'Other'].map((gender) => (
                                <button
                                  key={gender}
                                  onClick={() => updateCharacterData({ gender })}
                                  className={`px-4 py-2 rounded-lg border ${
                                    characterData[selectedSlot]?.gender === gender
                                      ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-300'
                                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                  } transition-colors`}
                                >
                                  {gender}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Initial Description */}
                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Initial Description
                            </label>
                            <textarea
                              id="description"
                              value={characterData[selectedSlot]?.description}
                              onChange={(e) => updateCharacterData({ description: e.target.value })}
                              placeholder="Add a brief description or concept for your character"
                              rows={4}
                              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                          </div>
                        </div>

                        {/* Next Step Button */}
                        {isFormComplete(selectedSlot) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-end mt-8"
                          >
                            <motion.button
                              onClick={() => setCurrentStep(2)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-6 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] flex items-center gap-2"
                            >
                              Next Step
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }}
                    className="max-w-4xl mx-auto"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Character Archetype</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {archetypes.map((archetype) => (
                        <motion.button
                          key={archetype.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateCharacterData({ archetype: archetype.id })}
                          className={`p-4 rounded-lg border text-left ${
                            characterData[selectedSlot]?.archetype === archetype.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <h4 className={`text-lg font-medium mb-1 ${
                            characterData[selectedSlot]?.archetype === archetype.id
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}>
                            {archetype.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{archetype.description}</p>
                        </motion.button>
                      ))}
                    </div>

                    {characterData[selectedSlot]?.archetype && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end mt-8"
                      >
                        <motion.button
                          onClick={() => setCurrentStep(3)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] flex items-center gap-2"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }}
                    className="max-w-4xl mx-auto"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Character Background</h3>
                    
                    <BackgroundStory 
                      events={characterData[selectedSlot]?.backgroundEvents || []}
                      onEventsChange={(events) => updateCharacterData({ backgroundEvents: events })}
                      characterAge={characterData[selectedSlot]?.age || 0}
                    />

                    {(characterData[selectedSlot]?.backgroundEvents?.length ?? 0) > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end mt-8"
                      >
                        <motion.button
                          onClick={() => setCurrentStep(4)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] flex items-center gap-2"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-5 h-5 text-purple-500" />
                      <h2 className="text-xl font-semibold">Character Traits</h2>
                    </div>
                    
                    <StrengthsAndFlaws
                      strengths={characterData[selectedSlot]?.traits?.filter(t => t.type === 'strength') || []}
                      flaws={characterData[selectedSlot]?.traits?.filter(t => t.type === 'flaw') || []}
                      onAddStrength={handleAddStrength}
                      onAddFlaw={handleAddFlaw}
                      onRemoveTrait={handleRemoveTrait}
                      strengthOptions={traitOptions.filter(t => t.type === 'strength')}
                      flawOptions={traitOptions.filter(t => t.type === 'flaw')}
                    />
                    
                    {(characterData[selectedSlot]?.traits?.length ?? 0) > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-end mt-8"
                      >
                        <motion.button
                          onClick={() => setCurrentStep(5)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] flex items-center gap-2"
                        >
                          Next Step
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                )}

                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } }}
                    className="max-w-4xl mx-auto"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Character Personality</h3>
                    
                    <PersonalityTraitCards />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-end mt-8"
                    >
                      <motion.button
                        onClick={() => setCurrentStep(6)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2 rounded-lg bg-[#8B5CF6] text-white hover:bg-[#7C3AED] flex items-center gap-2"
                      >
                        Next Step
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}

                {currentStep === 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <MotivationsAndGoals 
                      onComplete={(data) => {
                        const currentChar = characterData[selectedSlot];
                        if (currentChar) {
                          setCharacterData(prev => ({
                            ...prev,
                            [selectedSlot]: {
                              ...currentChar,
                              motivations: data.motivations,
                              goals: data.goals
                            }
                          }));
                        }
                      }} 
                    />
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => {
                          if (selectedSlot !== null) {
                            handleCompleteCharacter(selectedSlot);
                            setCurrentStep(1); // Reset to first step
                            setSelectedSlot(null); // Deselect current character
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                      >
                        {selectedSlot !== null && completedCharacters[selectedSlot] ? 'Update Character' : 'Complete Character'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-6"
          >
            <motion.button
              onClick={() => router.push('/dashboard/novels/create/cultural')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Cultural Elements
            </motion.button>

            {characters.length > 0 && (
              <motion.button
                onClick={() => router.push('/dashboard/novels/create/plot')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
              >
                Continue to Plot
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 