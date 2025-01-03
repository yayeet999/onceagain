'use client'

import * as React from "react"
import type { LucideProps } from 'lucide-react'
import { 
  Sparkles, Shield, Zap, Brain, Heart, Star, 
  Sword, Target, Crown, Flame, Eye, 
  Cloud, Anchor, Clock, Bomb, X,
  Skull, Ghost, Footprints, Check
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type TraitOption = Omit<Trait, 'id' | 'type'> & {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};

const strengthOptions: TraitOption[] = [
  // Major Strengths
  {
    title: "Combat Mastery",
    description: "Exceptional fighting skills",
    severity: "major" as const,
    icon: Sword,
    impact: "High combat effectiveness",
    example: "Masterful swordplay in battle"
  },
  {
    title: "Genius Intellect",
    description: "Brilliant strategic mind",
    severity: "major" as const,
    icon: Brain,
    impact: "Superior problem-solving",
    example: "Solving complex puzzles effortlessly"
  },
  {
    title: "Natural Leader",
    description: "Born to command",
    severity: "major" as const,
    icon: Crown,
    impact: "Strong team coordination",
    example: "Rallying troops in battle"
  },
  {
    title: "Supernatural Power",
    description: "Mystical abilities",
    severity: "major" as const,
    icon: Zap,
    impact: "Magical advantage",
    example: "Casting powerful spells"
  },
  // Minor Strengths
  {
    title: "Quick Reflexes",
    description: "Fast reaction time",
    severity: "minor" as const,
    icon: Target,
    impact: "Better defensive ability",
    example: "Dodging unexpected attacks"
  },
  {
    title: "Empathetic",
    description: "Understanding of others",
    severity: "minor" as const,
    icon: Heart,
    impact: "Strong relationships",
    example: "Connecting with allies"
  },
  {
    title: "Resourceful",
    description: "Makes the most of anything",
    severity: "minor" as const,
    icon: Star,
    impact: "Creative solutions",
    example: "Improvising with limited resources"
  },
  {
    title: "Determined",
    description: "Never gives up",
    severity: "minor" as const,
    icon: Anchor,
    impact: "Persistent progress",
    example: "Pushing through hardship"
  }
];

const flawOptions: TraitOption[] = [
  // Major Flaws
  {
    title: "Tragic Past",
    description: "Haunted by memories",
    severity: "major" as const,
    icon: Ghost,
    impact: "Emotional vulnerability",
    example: "Freezing during triggered moments"
  },
  {
    title: "Vengeful",
    description: "Consumed by revenge",
    severity: "major" as const,
    icon: Flame,
    impact: "Clouded judgment",
    example: "Making rash decisions"
  },
  {
    title: "Cursed",
    description: "Supernatural affliction",
    severity: "major" as const,
    icon: Skull,
    impact: "Constant hindrance",
    example: "Periodic magical backlash"
  },
  {
    title: "Betrayer",
    description: "Cannot be trusted",
    severity: "major" as const,
    icon: Bomb,
    impact: "Weak alliances",
    example: "Allies doubting loyalty"
  },
  // Minor Flaws
  {
    title: "Impulsive",
    description: "Acts without thinking",
    severity: "minor" as const,
    icon: Footprints,
    impact: "Poor planning",
    example: "Rushing into danger"
  },
  {
    title: "Arrogant",
    description: "Overconfident",
    severity: "minor" as const,
    icon: Crown,
    impact: "Underestimating threats",
    example: "Ignoring warnings"
  },
  {
    title: "Fearful",
    description: "Easily frightened",
    severity: "minor" as const,
    icon: Eye,
    impact: "Hesitation in crisis",
    example: "Backing down from challenges"
  },
  {
    title: "Indecisive",
    description: "Struggles with choices",
    severity: "minor" as const,
    icon: Clock,
    impact: "Missed opportunities",
    example: "Taking too long to act"
  }
];

interface Trait {
  id: string
  title: string
  description: string
  type: 'strength' | 'flaw'
  severity: 'major' | 'minor'
  impact: string
  example: string
}

interface StrengthsAndFlawsProps {
  strengths: Trait[];
  flaws: Trait[];
  onAddStrength: (trait: Omit<Trait, 'id' | 'type'>) => void;
  onAddFlaw: (trait: Omit<Trait, 'id' | 'type'>) => void;
  onRemoveTrait: (id: string) => void;
  strengthOptions: Trait[];
  flawOptions: Trait[];
}

export function StrengthsAndFlaws({
  strengths,
  flaws,
  onAddStrength,
  onAddFlaw,
  onRemoveTrait,
}: StrengthsAndFlawsProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Strengths Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Strengths</h3>
        </div>
        <div className="h-[500px] overflow-y-auto pr-2 space-y-6">
          {/* Major Strengths */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Major Strengths</h4>
            {strengthOptions
              .filter(option => option.severity === 'major')
              .map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    onClick={() => onAddStrength(option)}
                    className={`relative flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      strengths.some(s => s.title === option.title)
                        ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/30 dark:border-emerald-500'
                        : 'bg-white border-gray-200 hover:border-emerald-300 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      strengths.some(s => s.title === option.title)
                        ? 'text-emerald-500'
                        : 'text-gray-400'
                    }`} />
                    <div className="flex-1 pr-10">
                      <h4 className="text-base font-medium mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                    <div className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      strengths.some(s => s.title === option.title)
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {strengths.some(s => s.title === option.title) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                );
            })}
          </div>

          {/* Minor Strengths */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Minor Strengths</h4>
            {strengthOptions
              .filter(option => option.severity === 'minor')
              .map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    onClick={() => onAddStrength(option)}
                    className={`relative flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      strengths.some(s => s.title === option.title)
                        ? 'bg-emerald-50/50 border-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-400'
                        : 'bg-white border-gray-200 hover:border-emerald-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      strengths.some(s => s.title === option.title)
                        ? 'text-emerald-400'
                        : 'text-gray-400'
                    }`} />
                    <div className="flex-1 pr-10">
                      <h4 className="text-base font-medium mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                    <div className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      strengths.some(s => s.title === option.title)
                        ? 'border-emerald-300 bg-emerald-300'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {strengths.some(s => s.title === option.title) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>

      {/* Flaws Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flaws</h3>
        </div>
        <div className="h-[500px] overflow-y-auto pr-2 space-y-6">
          {/* Major Flaws */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Major Flaws</h4>
            {flawOptions
              .filter(option => option.severity === 'major')
              .map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    onClick={() => onAddFlaw(option)}
                    className={`relative flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      flaws.some(f => f.title === option.title)
                        ? 'bg-red-50 border-red-500 dark:bg-red-900/30 dark:border-red-500'
                        : 'bg-white border-gray-200 hover:border-red-300 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      flaws.some(f => f.title === option.title)
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }`} />
                    <div className="flex-1 pr-10">
                      <h4 className="text-base font-medium mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                    <div className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      flaws.some(f => f.title === option.title)
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {flaws.some(f => f.title === option.title) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                );
            })}
          </div>

          {/* Minor Flaws */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Minor Flaws</h4>
            {flawOptions
              .filter(option => option.severity === 'minor')
              .map((option) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.title}
                    onClick={() => onAddFlaw(option)}
                    className={`relative flex items-start p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      flaws.some(f => f.title === option.title)
                        ? 'bg-red-50/50 border-red-300 dark:bg-red-900/20 dark:border-red-400'
                        : 'bg-white border-gray-200 hover:border-red-200 dark:bg-gray-800 dark:border-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      flaws.some(f => f.title === option.title)
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`} />
                    <div className="flex-1 pr-10">
                      <h4 className="text-base font-medium mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                    </div>
                    <div className={`absolute right-4 top-4 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                      flaws.some(f => f.title === option.title)
                        ? 'border-red-300 bg-red-300'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {flaws.some(f => f.title === option.title) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 
