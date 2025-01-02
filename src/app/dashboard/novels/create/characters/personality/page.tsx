'use client'

import { PersonalityTraitCards } from "@/components/personality-traits/PersonalityTraitCards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PersonalityPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Character Personality</CardTitle>
          <Sparkles className="w-6 h-6" />
        </CardHeader>
        <CardContent>
          <p className="text-sm font-medium">Define your character's core personality traits and inner workings</p>
        </CardContent>
      </Card>

      <PersonalityTraitCards />

      <div className="flex justify-end">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Next Step
          <span className="ml-2">→</span>
        </Button>
      </div>
    </div>
  )
} 