import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertTriangle, Check, Info, Star } from 'lucide-react'
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

interface AddTraitDialogProps {
  type: 'strength' | 'flaw'
  onAdd: (trait: Omit<Trait, 'id' | 'type'>) => void
  existingTraits: Trait[]
  traitOptions: Trait[]
  children: React.ReactNode
}

interface CompactTraitCardProps {
  trait: Trait
  isSelected: boolean
  onClick: () => void
}

function CompactTraitCard({ trait, isSelected, onClick }: CompactTraitCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className={cn(
          "cursor-pointer transition-all hover:shadow-md w-[90%] mx-auto",
          isSelected ? "ring-2 ring-blue-500" : "",
          trait.type === 'strength' ? "bg-emerald-50" : "bg-red-50"
        )}
        onClick={onClick}
      >
        <CardContent className="p-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              {trait.type === 'strength' ? (
                <Star className="w-3 h-3 text-emerald-500" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-red-500" />
              )}
              <h3 className="text-xs font-semibold">{trait.title}</h3>
            </div>
            <Badge 
              variant={trait.severity === 'major' ? 'default' : 'secondary'}
              className={cn(
                "text-[10px] px-1 py-0",
                trait.severity === 'major' 
                  ? "bg-indigo-100 text-indigo-800" 
                  : "bg-gray-100 text-gray-800"
              )}
            >
              {trait.severity}
            </Badge>
          </div>
          <p className="text-[10px] text-gray-600 mb-1">{trait.description}</p>
          <div className="text-[10px] space-y-0.5">
            <div className="flex items-start gap-1">
              <Info className="w-2 h-2 text-blue-500 mt-0.5 flex-shrink-0" />
              <span><strong>Impact:</strong> {trait.impact}</span>
            </div>
            <div className="flex items-start gap-1">
              <Check className="w-2 h-2 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong>Example:</strong> {trait.example}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AddTraitDialog({ type, onAdd, existingTraits, traitOptions, children }: AddTraitDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedTrait, setSelectedTrait] = React.useState<Trait | null>(null)
  const [customTitle, setCustomTitle] = React.useState('')
  const [customDescription, setCustomDescription] = React.useState('')
  const [customSeverity, setCustomSeverity] = React.useState<'major' | 'minor'>('major')
  const [customImpact, setCustomImpact] = React.useState('')
  const [customExample, setCustomExample] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedTrait) {
      onAdd({ 
        title: selectedTrait.title, 
        description: selectedTrait.description, 
        severity: selectedTrait.severity,
        impact: selectedTrait.impact,
        example: selectedTrait.example
      })
    } else if (customTitle && customDescription) {
      onAdd({ 
        title: customTitle, 
        description: customDescription, 
        severity: customSeverity,
        impact: customImpact,
        example: customExample
      })
    }
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setSelectedTrait(null)
    setCustomTitle('')
    setCustomDescription('')
    setCustomSeverity('major')
    setCustomImpact('')
    setCustomExample('')
  }

  const availableTraits = traitOptions.filter(
    t => !existingTraits.some(et => et.title === t.title)
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new {type}</DialogTitle>
          <DialogDescription>
            Choose from predefined {type}s or create your own custom {type}.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="predefined" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="predefined">Predefined</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
          <TabsContent value="predefined" className="mt-4">
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-1">
                {availableTraits.map((trait) => (
                  <CompactTraitCard
                    key={trait.id}
                    trait={trait}
                    isSelected={selectedTrait?.id === trait.id}
                    onClick={() => setSelectedTrait(trait)}
                  />
                ))}
              </div>
            </ScrollArea>
            <Button 
              onClick={handleSubmit}
              className="w-full mt-4"
              disabled={!selectedTrait}
            >
              Add {selectedTrait ? selectedTrait.title : type}
            </Button>
          </TabsContent>
          <TabsContent value="custom" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom-title">Title</Label>
                <Input
                  id="custom-title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder={`Enter ${type} title`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-description">Description</Label>
                <Textarea
                  id="custom-description"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder={`Describe this ${type}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-severity">Severity</Label>
                <Select value={customSeverity} onValueChange={(value: 'major' | 'minor') => setCustomSeverity(value)}>
                  <SelectTrigger id="custom-severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-impact">Impact</Label>
                <Textarea
                  id="custom-impact"
                  value={customImpact}
                  onChange={(e) => setCustomImpact(e.target.value)}
                  placeholder={`Describe the impact of this ${type}`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-example">Example</Label>
                <Textarea
                  id="custom-example"
                  value={customExample}
                  onChange={(e) => setCustomExample(e.target.value)}
                  placeholder={`Provide an example of this ${type} in action`}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={!customTitle || !customDescription}
              >
                Add custom {type}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 