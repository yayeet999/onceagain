import React, { useState } from 'react';
import { Shield, Trophy, Crown, BookOpen, Scale, Heart, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Goal {
  id: string;
  text: string;
}

interface MotivationsAndGoalsProps {
  onComplete: (data: { motivations: string[], goals: Goal[] }) => void;
}

export const MotivationsAndGoals: React.FC<MotivationsAndGoalsProps> = ({ onComplete }) => {
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const motivations = [
    { id: 'survival', label: 'Survival', icon: <Shield className="w-5 h-5" />, activeColor: 'bg-gray-100' },
    { id: 'achievement', label: 'Achievement', icon: <Trophy className="w-5 h-5 text-emerald-500" />, activeColor: 'bg-emerald-50' },
    { id: 'recognition', label: 'Recognition', icon: <Crown className="w-5 h-5 text-yellow-500" />, activeColor: 'bg-yellow-50' },
    { id: 'power', label: 'Power', icon: <Zap className="w-5 h-5 text-red-500" />, activeColor: 'bg-red-50' },
    { id: 'knowledge', label: 'Knowledge', icon: <BookOpen className="w-5 h-5 text-blue-500" />, activeColor: 'bg-blue-50' },
    { id: 'justice', label: 'Justice', icon: <Scale className="w-5 h-5 text-purple-500" />, activeColor: 'bg-purple-50' },
    { id: 'love', label: 'Love', icon: <Heart className="w-5 h-5 text-pink-500" />, activeColor: 'bg-pink-50' },
    { id: 'freedom', label: 'Freedom', icon: <Target className="w-5 h-5 text-cyan-500" />, activeColor: 'bg-cyan-50' },
  ];

  const toggleMotivation = (id: string) => {
    setSelectedMotivations(prev => {
      if (prev.includes(id)) {
        return prev.filter(m => m !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals(prev => [...prev, { id: Date.now().toString(), text: newGoal.trim() }]);
      setNewGoal('');
    }
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Motivations & Goals</h2>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Primary Motivation (Select up to 3)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {motivations.map(motivation => (
              <button
                key={motivation.id}
                onClick={() => toggleMotivation(motivation.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 
                  ${selectedMotivations.includes(motivation.id) 
                    ? `${motivation.activeColor} ring-2 ring-offset-2 ring-blue-500 border-transparent` 
                    : 'bg-white border-gray-200 hover:border-blue-500'}`}
              >
                <div className={`p-2 rounded-lg ${selectedMotivations.includes(motivation.id) ? motivation.activeColor : 'bg-gray-50'}`}>
                  {motivation.icon}
                </div>
                <span className="font-medium text-gray-700">{motivation.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-700">Character Goals</h3>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter a new goal..."
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && goals.length < 5 && newGoal.trim()) {
                  addGoal();
                }
              }}
            />
            <Button
              onClick={() => {
                if (goals.length < 5 && newGoal.trim()) {
                  addGoal();
                }
              }}
              className="flex items-center space-x-2"
              variant="outline"
            >
              Add Goal
            </Button>
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500">Add goals to define your character's motivations</p>
          </div>
        ) : (
          <div className="space-y-3">
            {goals.map(goal => (
              <div
                key={goal.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200"
              >
                <span className="text-gray-700">{goal.text}</span>
                <Button
                  onClick={() => removeGoal(goal.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 