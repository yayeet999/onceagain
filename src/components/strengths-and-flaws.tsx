'use client'

import * as React from "react"
import { Sparkles, ShieldCheck, AlertTriangle, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { TraitCard } from "./TraitCard"
import { AddTraitDialog } from "./AddTraitDialog"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

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
  strengthOptions,
  flawOptions
}: StrengthsAndFlawsProps) {
  const traitBalance = ((strengths.length / (strengths.length + flaws.length)) * 100) || 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Character Traits</CardTitle>
          <Sparkles className="w-6 h-6" />
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">Balance traits for a well-rounded character</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Trait Balance</span>
              <span>{traitBalance.toFixed(0)}% Strengths</span>
            </div>
            <Progress value={traitBalance} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <TraitSection
          type="strength"
          traits={strengths}
          onDelete={onRemoveTrait}
          onAdd={onAddStrength}
          existingTraits={[...strengths, ...flaws]}
          traitOptions={strengthOptions}
        />
        <TraitSection
          type="flaw"
          traits={flaws}
          onDelete={onRemoveTrait}
          onAdd={onAddFlaw}
          existingTraits={[...strengths, ...flaws]}
          traitOptions={flawOptions}
        />
      </div>
    </div>
  );
}

interface TraitSectionProps {
  type: 'strength' | 'flaw'
  traits: Trait[]
  onDelete: (id: string) => void
  onAdd: (trait: Omit<Trait, 'type' | 'id'>) => void
  existingTraits: Trait[]
  traitOptions: Trait[]
}

function TraitSection({ type, traits, onDelete, onAdd, existingTraits, traitOptions }: TraitSectionProps) {
  return (
    <Card className={cn(
      type === 'strength' ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          {type === 'strength' ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600" />
          )}
          {type === 'strength' ? "Strengths" : "Flaws"}
          <span className="text-sm font-normal text-gray-500">({traits.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence>
            {traits.map((trait) => (
              <motion.div
                key={trait.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <TraitCard trait={trait} onRemove={() => onDelete(trait.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        <AddTraitDialog 
          type={type}
          onAdd={onAdd}
          existingTraits={existingTraits}
          traitOptions={traitOptions}
        >
          <Button
            variant="outline"
            className={cn(
              "w-full mt-4",
              type === 'strength' ? "text-emerald-600 hover:bg-emerald-50" : "text-red-600 hover:bg-red-50"
            )}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {type}
          </Button>
        </AddTraitDialog>
      </CardContent>
    </Card>
  )
} 