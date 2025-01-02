import * as React from "react"
import { AlertTriangle, Star, X, Info, Check } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"

interface Trait {
  id: string
  title: string
  description: string
  type: 'strength' | 'flaw'
  severity: 'major' | 'minor'
  impact: string
  example: string
}

interface TraitCardProps {
  trait: Trait
  onRemove: () => void
}

export function TraitCard({ trait, onRemove }: TraitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "transition-all hover:shadow-md relative group",
        trait.type === 'strength' ? "bg-white border-emerald-200" : "bg-white border-red-200"
      )}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {trait.type === 'strength' ? (
                <Star className="w-5 h-5 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <CardTitle className="text-lg font-semibold">{trait.title}</CardTitle>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge 
                    variant={trait.severity === 'major' ? 'default' : 'secondary'}
                    className={cn(
                      "text-xs",
                      trait.severity === 'major' 
                        ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" 
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    )}
                  >
                    {trait.severity}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trait.severity === 'major' ? 'Significantly impacts the character' : 'Minor character trait'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm mb-2">{trait.description}</CardDescription>
          <div className="space-y-1 text-sm">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <span><strong>Impact:</strong> {trait.impact}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span><strong>Example:</strong> {trait.example}</span>
            </div>
          </div>
        </CardContent>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    </motion.div>
  )
} 