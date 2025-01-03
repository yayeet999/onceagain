'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Heart, Users, Crown, Sword, BookOpen, MessageCircle, Zap, SmilePlus, User, Shield, Target } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

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

interface BackgroundEvent {
  id: number;
  type: 'Early Life' | 'Defining Moment' | 'Major Victory' | 'Significant Loss';
  age: number;
  description: string;
}

interface Trait {
  id: string;
  title: string;
  description: string;
  type: 'strength' | 'flaw';
  severity: 'major' | 'minor';
  impact: string;
  example: string;
}

interface Relationship {
  id: string;
  character1: string;
  character2: string;
  description: string;
  strength: number; // 1-5
  dynamics: string[];
}

export default function RelationshipsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const novelId = searchParams.get('id');
  
  const [characterData, setCharacterData] = useState<{ [key: number]: CharacterData }>({});
  const [completedCharacters, setCompletedCharacters] = useState<{ [key: number]: { role: string; archetype: string; } }>({});
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update relationships data
  const updateRelationships = async (data: Relationship[]) => {
    if (!novelId) return;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // TODO: Replace with Zustand state management
      setRelationships(data);
    } catch (error) {
      console.error('Failed to update relationships:', error);
      setSaveError('Failed to save relationships');
    } finally {
      setIsSaving(false);
    }
  };

  // Update relationships when they change
  useEffect(() => {
    updateRelationships(relationships);
  }, [relationships]);

  // Fetch novel data on mount
  useEffect(() => {
    const fetchNovelData = async () => {
      if (!novelId) {
        router.push('/dashboard/novels');
        return;
      }

      try {
        // TODO: Replace with Zustand state management
        // For now, just set loading to false
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching novel data:', error);
        setIsLoading(false);
      }
    };

    fetchNovelData();
  }, [novelId, router]);

  const getRoleIcon = (role: string) => {
    const icons = {
      'protagonist': Crown,
      'antagonist': Sword,
      'mentor': BookOpen,
      'catalyst': Zap,
      'confidant': MessageCircle,
      'comic-relief': SmilePlus
    };
    return icons[role as keyof typeof icons] || User;
  };

  const getArchetypeIcon = (archetype: string) => {
    const icons = {
      'hero': Crown,
      'sage': BookOpen,
      'rebel': Zap,
      'caregiver': Heart,
      'trickster': SmilePlus,
      'explorer': Target
    };
    return icons[archetype as keyof typeof icons] || Shield;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

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

        {/* Save Status */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          {isSaving && (
            <p className="text-sm text-blue-500 dark:text-blue-400">
              Saving changes...
            </p>
          )}
          {saveError && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {saveError}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Character Relationships</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Define and manage the connections between your characters
            </p>
          </div>

          {/* Character Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(characterData).map(([id, character]) => {
              if (!completedCharacters[Number(id)]) return null;
              
              const RoleIcon = getRoleIcon(character.role || '');
              const ArchetypeIcon = getArchetypeIcon(character.archetype || '');
              
              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg" />
                  <div className="relative h-full border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow overflow-hidden">
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <RoleIcon className="w-4 h-4 text-blue-500" />
                      <ArchetypeIcon className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-400 dark:bg-purple-500" />
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-500" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {character.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {character.age} years old • {character.gender}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                            {character.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Relationship Map Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Character Relationship Map
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Select character pairs and define their relationships to build your story's relationship web
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-6"
          >
            <motion.button
              onClick={() => router.push(`/dashboard/novels/create/characters?id=${novelId}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Characters
            </motion.button>

            <motion.button
              onClick={() => router.push(`/dashboard/novels/create/plot?id=${novelId}`)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
            >
              Continue to Plot
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 