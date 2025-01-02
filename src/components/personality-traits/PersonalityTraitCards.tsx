'use client'

import React, { useState } from 'react';
import { Sparkles, Target, Users, Heart, RefreshCw, X, Leaf, Crown, Brain } from 'lucide-react';

interface MiniCardData {
  title: string;
  description: string;
}

interface Trait {
  title: string;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
  miniCards: MiniCardData[];
}

interface MiniCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  trait: Trait;
  miniCards: MiniCardData[];
  color: string;
  selectedCards: number[];
  onCardSelect: (index: number) => void;
}

interface TraitCardProps {
  trait: Trait;
  onClick: () => void;
}

// Custom Wave Icon Component
const WaveIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// MiniCard Component for trait details
const MiniCard: React.FC<MiniCardProps> = ({ title, description, isSelected, onClick }) => (
  <div 
    className={`p-4 rounded-lg shadow-sm cursor-pointer transition-all duration-200 
      ${isSelected ? 'bg-white ring-2 ring-blue-500' : 'bg-white/90 hover:bg-white'}`}
    onClick={onClick}
  >
    <h4 className="text-sm font-medium text-gray-800">{title}</h4>
    <p className="text-xs text-gray-600 mt-1">{description}</p>
  </div>
);

// Modal Component for detailed trait view
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, trait, miniCards, color, selectedCards, onCardSelect }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`relative w-full max-w-lg rounded-xl ${color} p-6 shadow-xl max-h-[90vh] overflow-y-auto`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-lg bg-white/80 mr-3 flex items-center justify-center">
            {trait.icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{trait.title}</h3>
        </div>
        <div className="space-y-3">
          {miniCards.map((card, index) => (
            <MiniCard 
              key={index} 
              {...card} 
              isSelected={selectedCards.includes(index)}
              onClick={() => onCardSelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// TraitCard Component for main grid
const TraitCard: React.FC<TraitCardProps> = ({ trait, onClick }) => (
  <div 
    className={`p-6 rounded-xl ${trait.color} transition-all duration-200 hover:shadow-lg cursor-pointer h-[96px] flex flex-col justify-between`}
    onClick={onClick}
  >
    <div className="flex items-start space-x-3">
      <div className="p-2 rounded-lg bg-white/80 flex items-center justify-center flex-shrink-0">
        {trait.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{trait.title}</h3>
        <p className="text-sm text-gray-600">{trait.subtitle}</p>
      </div>
    </div>
  </div>
);

// Main Component
export const PersonalityTraitCards: React.FC = () => {
  const [selectedTrait, setSelectedTrait] = useState<Trait | null>(null);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleCardSelect = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  };

  const traits: Trait[] = [
    {
      title: "Inner Conflict",
      subtitle: "Internal Struggles and Contradictions",
      color: "bg-slate-50",
      icon: <div className="w-6 h-6 text-slate-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3L4 21h16L12 3z" />
          <path d="M12 12v5" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </div>,
      miniCards: [
        { title: "Self-Doubt", description: "Persistent questioning of own abilities and decisions" },
        { title: "Cognitive Dissonance", description: "Holding contradictory beliefs or values" },
        { title: "Analysis Paralysis", description: "Overthinking leading to decision-making difficulty" },
        { title: "Value Conflict", description: "Struggling between competing personal principles" },
        { title: "Identity Uncertainty", description: "Questioning core aspects of self-definition" }
      ]
    },
    {
      title: "Shadow Aspects",
      subtitle: "Hidden or Suppressed Traits",
      color: "bg-zinc-50",
      icon: <div className="w-6 h-6 text-zinc-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path d="M12 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M15 12a3 3 0 006 0 3 3 0 00-6 0z" />
        </svg>
      </div>,
      miniCards: [
        { title: "Repressed Emotions", description: "Difficulty acknowledging certain feelings" },
        { title: "Defense Mechanisms", description: "Unconscious strategies to avoid discomfort" },
        { title: "Hidden Motivations", description: "Unacknowledged drivers of behavior" },
        { title: "Projection Patterns", description: "Attributing own traits to others" },
        { title: "Masked Vulnerabilities", description: "Concealed sensitivities and insecurities" }
      ]
    },
    {
      title: "Openness",
      subtitle: "Exploration and Discovery",
      color: "bg-orange-50",
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      miniCards: [
        { title: "Creative Expression", description: "Seeks artistic and innovative outlets" },
        { title: "Intellectual Curiosity", description: "Passionate about learning and understanding" },
        { title: "Adventure Seeking", description: "Embraces new experiences and challenges" },
        { title: "Cultural Appreciation", description: "Values diverse perspectives and traditions" },
        { title: "Imaginative Thinking", description: "Explores abstract and unconventional ideas" }
      ]
    },
    {
      title: "Conscientiousness",
      subtitle: "Structure and Achievement",
      color: "bg-green-50",
      icon: <Target className="w-6 h-6 text-green-500" />,
      miniCards: [
        { title: "Goal Oriented", description: "Sets and pursues clear objectives" },
        { title: "Detail Focused", description: "Attentive to precision and accuracy" },
        { title: "Responsible", description: "Fulfills commitments reliably" },
        { title: "Organized", description: "Maintains systematic approach to tasks" },
        { title: "Self-Disciplined", description: "Exercises consistent self-control" }
      ]
    },
    {
      title: "Extraversion",
      subtitle: "Connection and Expression",
      color: "bg-yellow-50",
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      miniCards: [
        { title: "Social Energy", description: "Thrives in group interactions" },
        { title: "Expressive", description: "Communicates thoughts and feelings openly" },
        { title: "Enthusiastic", description: "Shows high energy and excitement" },
        { title: "Network Builder", description: "Actively creates social connections" },
        { title: "Action Oriented", description: "Prefers activity and engagement" }
      ]
    },
    {
      title: "Agreeableness",
      subtitle: "Harmony and Empathy",
      color: "bg-pink-50",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      miniCards: [
        { title: "Compassionate", description: "Shows concern for others' welfare" },
        { title: "Cooperative", description: "Works well in team settings" },
        { title: "Trusting", description: "Believes in others' good intentions" },
        { title: "Helpful", description: "Readily assists others in need" },
        { title: "Peace-Making", description: "Seeks harmony in conflicts" }
      ]
    },
    {
      title: "Neuroticism",
      subtitle: "Emotional Response",
      color: "bg-violet-50",
      icon: <WaveIcon />,
      miniCards: [
        { title: "Emotional Depth", description: "Experiences feelings intensely" },
        { title: "Self-Aware", description: "Conscious of personal states" },
        { title: "Sensitive", description: "Responsive to environmental cues" },
        { title: "Cautious", description: "Carefully considers consequences" },
        { title: "Reflective", description: "Processes experiences deeply" }
      ]
    },
    {
      title: "Adaptability",
      subtitle: "Growth and Resilience",
      color: "bg-teal-50",
      icon: <RefreshCw className="w-6 h-6 text-teal-500" />,
      miniCards: [
        { title: "Flexible Thinking", description: "Adjusts to new situations readily" },
        { title: "Resilient", description: "Bounces back from setbacks" },
        { title: "Growth Mindset", description: "Sees challenges as opportunities" },
        { title: "Quick Learning", description: "Rapidly absorbs new information" },
        { title: "Problem Solver", description: "Finds creative solutions" }
      ]
    },
    {
      title: "Emotional Awareness",
      subtitle: "Understanding and Processing Feelings",
      color: "bg-indigo-50",
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      miniCards: [
        { title: "Self-Reflection", description: "Deep understanding of personal emotions" },
        { title: "Empathetic Response", description: "Ability to sense and relate to others' feelings" },
        { title: "Emotional Regulation", description: "Skillful management of emotional states" },
        { title: "Intuitive Understanding", description: "Natural grasp of emotional undercurrents" },
        { title: "Emotional Intelligence", description: "Navigating social-emotional complexity" }
      ]
    },
    {
      title: "Nature & Balance",
      subtitle: "Harmony with Natural World",
      color: "bg-emerald-50",
      icon: <Leaf className="w-6 h-6 text-emerald-500" />,
      miniCards: [
        { title: "Environmental Connection", description: "Deep bond with natural surroundings" },
        { title: "Sustainable Living", description: "Commitment to ecological balance" },
        { title: "Natural Wisdom", description: "Learning from natural patterns" },
        { title: "Holistic Perspective", description: "Understanding interconnectedness" },
        { title: "Ecological Awareness", description: "Conscious of environmental impact" }
      ]
    },
    {
      title: "Power & Authority",
      subtitle: "Leadership and Influence",
      color: "bg-purple-50",
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      miniCards: [
        { title: "Strategic Leadership", description: "Ability to guide and direct others" },
        { title: "Decisive Action", description: "Confident decision-making ability" },
        { title: "Authority Management", description: "Responsible use of power" },
        { title: "Influence Skills", description: "Capacity to shape outcomes" },
        { title: "Command Presence", description: "Natural leadership aura" }
      ]
    },
    {
      title: "Spiritual Awareness",
      subtitle: "Metaphysical Understanding",
      color: "bg-rose-50",
      icon: <div className="w-6 h-6 text-rose-500">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 18l-2-2 2-2 2 2-2 2z" />
          <path d="M12 6v4" />
          <path d="M8 12h8" />
        </svg>
      </div>,
      miniCards: [
        { title: "Inner Wisdom", description: "Connection to deeper understanding and insight" },
        { title: "Cosmic Perspective", description: "Views life through a universal lens" },
        { title: "Sacred Connection", description: "Relationship with higher purpose or meaning" },
        { title: "Mystical Experience", description: "Openness to transcendent moments" },
        { title: "Spiritual Practice", description: "Cultivation of spiritual growth and awareness" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-2 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traits.map((trait, index) => (
          <TraitCard
            key={index}
            trait={trait}
            onClick={() => {
              setSelectedTrait(trait);
              setSelectedCards([]);
            }}
          />
        ))}
      </div>
      <Modal
        isOpen={selectedTrait !== null}
        onClose={() => setSelectedTrait(null)}
        trait={selectedTrait || traits[0]}
        miniCards={selectedTrait?.miniCards || []}
        color={selectedTrait?.color || ''}
        selectedCards={selectedCards}
        onCardSelect={handleCardSelect}
      />
    </div>
  );
}; 