'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Info, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';

export default function CulturalElementsPage() {
  const router = useRouter();
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  
  const categories = {
    historical: {
      title: "Historical Elements",
      description: "Ancient civilizations and historical periods that influenced culture and society",
      tooltip: "Draw from rich historical periods to add authenticity and depth to your world. Great for building social structures, architecture, and traditions.",
      color: "amber",
      elements: [
        { id: 'ancient-egyptian', name: 'Ancient Egyptian', description: 'Pyramids, pharaohs, and hieroglyphics' },
        { id: 'ancient-roman', name: 'Ancient Roman', description: 'Legions, aqueducts, and marble columns' },
        { id: 'medieval-european', name: 'Medieval European', description: 'Castles, knights, and feudal society' },
        { id: 'feudal-japanese', name: 'Feudal Japanese', description: 'Samurai, shogunate, and zen gardens' },
        { id: 'viking-norse', name: 'Viking/Norse', description: 'Longships, raiders, and Nordic traditions' },
        { id: 'ancient-greek', name: 'Ancient Greek', description: 'Philosophy, democracy, and classical architecture' }
      ]
    },
    fantasy: {
      title: "Fantasy Elements",
      description: "Magical and mythological elements from various cultural traditions",
      tooltip: "Incorporate mystical and supernatural elements to create wonder and enchantment. Perfect for magical systems and otherworldly creatures.",
      color: "emerald",
      elements: [
        { id: 'high-fantasy', name: 'High Fantasy', description: 'Magic, dragons, and epic quests' },
        { id: 'norse-mythology', name: 'Norse Mythology', description: 'Gods of Asgard, Yggdrasil, and runes' },
        { id: 'greek-mythology', name: 'Greek Mythology', description: 'Olympian gods, heroes, and monsters' },
        { id: 'celtic-mythology', name: 'Celtic Mythology', description: 'Fae folk, druids, and ancient mysteries' },
        { id: 'oriental-mythology', name: 'Oriental Mythology', description: 'Eastern legends, spirits, and folklore' },
        { id: 'eldritch-cosmic', name: 'Eldritch/Cosmic', description: 'Ancient cosmic entities and otherworldly horror' }
      ]
    },
    scifi: {
      title: "Sci-fi Elements",
      description: "Futuristic and technological themes across different sci-fi subgenres",
      tooltip: "Build advanced technological societies and explore future possibilities. Excellent for creating unique technological systems and societal structures.",
      color: "indigo",
      elements: [
        { id: 'cyberpunk', name: 'Cyberpunk', description: 'High tech, low life, digital rebellion' },
        { id: 'space-opera', name: 'Space Opera', description: 'Interstellar empires and epic space adventures' },
        { id: 'alien-civilization', name: 'Alien Civilization', description: 'Advanced extraterrestrial societies' },
        { id: 'post-apocalyptic', name: 'Post-Apocalyptic', description: 'Survival in a collapsed civilization' },
        { id: 'biopunk', name: 'Biopunk', description: 'Genetic engineering and biological technology' },
        { id: 'solarpunk', name: 'Solarpunk', description: 'Sustainable future and ecological harmony' }
      ]
    },
    contemporary: {
      title: "Contemporary Elements",
      description: "Modern cultural influences from around the world",
      tooltip: "Blend modern cultural elements to create relevant and relatable settings. Great for exploring current themes and social dynamics.",
      color: "rose",
      elements: [
        { id: 'modern-western', name: 'Modern Western', description: 'Contemporary Western society and values' },
        { id: 'urban-culture', name: 'Urban Culture', description: 'City life, street art, and modern trends' },
        { id: 'eastern-influence', name: 'Eastern Influence', description: 'Modern Asian cultural elements' },
        { id: 'latin-culture', name: 'Latin Culture', description: 'Latin American traditions and lifestyle' },
        { id: 'african-culture', name: 'African Culture', description: 'African traditions and modern influences' },
        { id: 'middle-eastern', name: 'Middle Eastern', description: 'Middle Eastern customs and society' }
      ]
    }
  };

  const toggleElement = (elementId: string) => {
    setSelectedElements(prev => 
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const getColorClasses = (category: string, isSelected: boolean) => {
    const colorMap = {
      amber: {
        selected: 'bg-amber-500 text-white',
        unselected: 'bg-amber-50 hover:bg-amber-100 text-amber-900',
        card: 'border-amber-200'
      },
      emerald: {
        selected: 'bg-emerald-500 text-white',
        unselected: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900',
        card: 'border-emerald-200'
      },
      indigo: {
        selected: 'bg-indigo-500 text-white',
        unselected: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900',
        card: 'border-indigo-200'
      },
      rose: {
        selected: 'bg-rose-500 text-white',
        unselected: 'bg-rose-50 hover:bg-rose-100 text-rose-900',
        card: 'border-rose-200'
      }
    };

    return isSelected ? colorMap[category as keyof typeof colorMap].selected : colorMap[category as keyof typeof colorMap].unselected;
  };

  interface CategoryCardProps {
    category: string;
    data: {
      title: string;
      description: string;
      tooltip: string;
      color: string;
      elements: Array<{
        id: string;
        name: string;
        description: string;
      }>;
    };
  }

  const CategoryCard = ({ category, data }: CategoryCardProps) => (
    <div className={`mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border ${getColorClasses(data.color, false)}`}>
      <div className="flex items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{data.title}</h2>
        <div className="relative ml-2 group">
          <Info size={18} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-help" />
          <div className="hidden group-hover:block absolute z-10 w-72 p-3 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-md -left-20 top-6">
            <p className="mb-2">{data.description}</p>
            <p className="text-gray-300 text-xs">{data.tooltip}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
        {data.elements.map(element => (
          <button
            key={element.id}
            onClick={() => toggleElement(element.id)}
            className={`
              p-3 rounded-lg text-left transition-all duration-200
              ${getColorClasses(data.color, selectedElements.includes(element.id))}
              ${selectedElements.includes(element.id) ? 'shadow-md transform scale-102' : ''}
            `}
          >
            <div className="font-medium text-sm mb-1">{element.name}</div>
            <div className={`text-xs ${selectedElements.includes(element.id) ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
              {element.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Select Cultural Elements</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Choose elements to shape your world. Selected: {selectedElements.length} elements
            </p>
          </div>
          
          {Object.entries(categories).map(([category, data]) => (
            <CategoryCard key={category} category={category} data={data} />
          ))}
          
          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center pt-12"
          >
            <motion.button
              onClick={() => router.push('/dashboard/novels/create/parameters')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white gap-2 transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Parameters
            </motion.button>

            {selectedElements.length > 0 && (
              <motion.button
                onClick={() => router.push('/dashboard/novels/create/characters')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-white gap-2 transition-colors duration-200"
              >
                Continue to Characters
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
} 