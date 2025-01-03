'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import AIWritingGuide from '@/components/discussions/AIWritingGuide';
import { MessageSquare, Send, Settings, User, ChevronDown, BookOpen, CreditCard, Bug, MessageCircle, HelpCircle, Lightbulb, Clock, Target, PenTool, Sparkles, Zap, Star, Bell, ArrowRight, Search } from 'lucide-react';
import NovelWorkshopTab from '@/components/NovelWorkshopTab';
import InteractiveAITab from '@/components/interactive/InteractiveAITab';
import StoryWriterTab from '@/components/story/StoryWriterTab';
import ProfileTab from '@/components/ProfileTab';

// Helper functions
const getPlaceholderText = (type: string): string => {
  switch (type) {
    case 'feature':
      return "Describe the feature you'd like to see...";
    case 'bug':
      return "Describe what happened and what you expected...";
    case 'feedback':
      return "Share your thoughts and suggestions...";
    case 'question':
      return "What would you like to know?";
    default:
      return "Share your thoughts, ideas, or report an issue...";
  }
};

const getFeedbackTypeLabel = (type: string): string => {
  switch (type) {
    case 'feature':
      return "Feature Request";
    case 'bug':
      return "Bug Report";
    case 'feedback':
      return "Feedback";
    case 'question':
      return "Question";
    default:
      return "Feedback";
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Writer';
  const [activeSection, setActiveSection] = useState('dashboard');
  const [feedbackType, setFeedbackType] = useState('feature');
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState('');

  const stats = [
    { label: 'Stories Created', value: '0', icon: BookOpen },
    { label: 'Words Written', value: '0', icon: PenTool },
    { label: 'Writing Streak', value: '0', icon: Zap },
    { label: 'Time Writing', value: '0h', icon: Clock },
  ];

  const recentProjects = [];

  const handleTabClick = (href: string) => {
    if (href === '#writing-guide') {
      setActiveSection('writing-guide');
    } else if (href === '#discussions') {
      setActiveSection('discussions');
    } else if (href === '#novel-workshop') {
      setActiveSection('novel-workshop');
    } else if (href === '#settings') {
      setActiveSection('settings');
    } else if (href === '#blogs') {
      setActiveSection('blogs');
    } else if (href === '#stories') {
      setActiveSection('stories');
    } else if (href === '#interactive') {
      setActiveSection('interactive');
    } else if (href === '#profile') {
      setActiveSection('profile');
    } else {
      setActiveSection('dashboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle form submission in a real implementation
    console.log('Feedback submitted:', message);
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#writing-guide') {
        setActiveSection('writing-guide');
      } else if (window.location.hash === '#discussions') {
        setActiveSection('discussions');
      } else if (window.location.hash === '#novel-workshop') {
        setActiveSection('novel-workshop');
      } else if (window.location.hash === '#settings') {
        setActiveSection('settings');
      } else if (window.location.hash === '#blogs') {
        setActiveSection('blogs');
      } else if (window.location.hash === '#stories') {
        setActiveSection('stories');
      } else if (window.location.hash === '#interactive') {
        setActiveSection('interactive');
      } else if (window.location.hash === '#profile') {
        setActiveSection('profile');
      } else {
        setActiveSection('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'writing-guide':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AIWritingGuide />
          </motion.div>
        );
      case 'discussions':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Help & Feedback
              </h1>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Getting Started */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === 'getting-started' ? '' : 'getting-started')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Getting Started</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === 'getting-started' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === 'getting-started' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to navigate the dashboard</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Use the sidebar menu to access different sections. The dashboard shows your writing stats, goals, and quick actions.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Understanding the writing guide</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Access writing tips, best practices, and AI assistance guidelines in the Writing Guide tab.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Using the feedback system</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Submit bug reports, feature requests, or ask questions through the Discussions tab.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basic keyboard shortcuts</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            • Ctrl/Cmd + S: Save work<br />
                            • Ctrl/Cmd + Enter: Generate AI response<br />
                            • Esc: Close current dialog
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Writing Features */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === 'writing-features' ? '' : 'writing-features')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <PenTool className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Writing Features</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === 'writing-features' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === 'writing-features' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Using AI assistance effectively</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Get smart suggestions for plot development, character arcs, and writing style improvements.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Saving your work</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Your work is automatically saved every few minutes. Manual save with Ctrl/Cmd + S.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Word count tracking</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your progress with real-time word count and writing statistics.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Daily writing goals</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Set and track daily word count goals to maintain consistent writing habits.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Assistance */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === 'ai-assistance' ? '' : 'ai-assistance')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">AI Assistance</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === 'ai-assistance' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === 'ai-assistance' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">What can AI help with?</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">AI can assist with brainstorming, plot development, character creation, and writing refinement.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to write better prompts</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Be specific, provide context, and clearly state your desired outcome for better AI responses.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Understanding AI limitations</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">AI is a tool to enhance your writing, not replace your creativity. It works best with clear guidance.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Common AI issues and solutions</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            • Vague responses: Be more specific in prompts<br />
                            • Repetitive suggestions: Vary your input<br />
                            • Off-topic results: Provide more context
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setExpandedFaq(expandedFaq === 'billing' ? '' : 'billing')}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Billing & Subscription</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedFaq === 'billing' ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === 'billing' && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Free vs Pro features</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pro unlocks advanced AI features, unlimited stories, and priority support.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">How to upgrade/downgrade</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Manage your subscription in Settings {'>'}  Subscription. Changes take effect at the next billing cycle.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Refund policy</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Contact support within 7 days of purchase for refund requests.</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Payment security</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">All payments are processed securely through Stripe with bank-level encryption.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Feedback Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <button 
                onClick={() => setFeedbackType('feature')}
                className={`p-4 flex flex-col items-center gap-2 rounded-xl border ${
                  feedbackType === 'feature' 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Lightbulb className={`w-6 h-6 ${
                  feedbackType === 'feature' ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  feedbackType === 'feature' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
                }`}>Feature Request</span>
              </button>

              <button 
                onClick={() => setFeedbackType('bug')}
                className={`p-4 flex flex-col items-center gap-2 rounded-xl border ${
                  feedbackType === 'bug' 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Bug className={`w-6 h-6 ${
                  feedbackType === 'bug' ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  feedbackType === 'bug' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
                }`}>Bug Report</span>
              </button>

              <button 
                onClick={() => setFeedbackType('feedback')}
                className={`p-4 flex flex-col items-center gap-2 rounded-xl border ${
                  feedbackType === 'feedback' 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <MessageCircle className={`w-6 h-6 ${
                  feedbackType === 'feedback' ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  feedbackType === 'feedback' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
                }`}>General Feedback</span>
              </button>

              <button 
                onClick={() => setFeedbackType('question')}
                className={`p-4 flex flex-col items-center gap-2 rounded-xl border ${
                  feedbackType === 'question' 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <HelpCircle className={`w-6 h-6 ${
                  feedbackType === 'question' ? 'text-indigo-600' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium ${
                  feedbackType === 'question' ? 'text-indigo-600' : 'text-gray-700 dark:text-gray-300'
                }`}>Question</span>
              </button>
            </div>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                {/* Title Field */}
                <div>
                  <label 
                    htmlFor="title" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder={`Enter your ${feedbackType} title`}
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder={getPlaceholderText(feedbackType)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit {getFeedbackTypeLabel(feedbackType)}
              </button>
            </form>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Settings
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Settings Content */}
            <div className="space-y-6">
              {/* Profile & Security Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Section */}
                <div className="lg:col-span-1 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile</h2>
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                          <PenTool className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Profile Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                          value={user?.user_metadata?.full_name || ''}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white"
                          value={user?.user_metadata?.username || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Security</h2>
                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="space-y-4 max-w-lg">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">Change Password</h3>
                      <div>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          placeholder="Current password"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                          placeholder="New password"
                        />
                      </div>
                      <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                        Update Password
                      </button>
                    </div>

                    {/* 2FA */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email & Subscription Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Email Section */}
                <div className="lg:col-span-1 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Primary Email
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                          value={user?.email || ''}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-700 dark:text-green-400">Verified</span>
                    </div>
                    <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                      Update Email
                    </button>
                  </div>
                </div>

                {/* Subscription Section */}
                <div className="lg:col-span-2 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Subscription</h2>
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Pro Plan</h3>
                          <p className="text-sm text-indigo-700 dark:text-indigo-300">$9.99/month • Renews Sep 1, 2024</p>
                        </div>
                        <span className="mt-2 sm:mt-0 inline-flex px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900/40 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                          Change Plan
                        </button>
                        <button className="px-4 py-2 text-indigo-600 hover:text-indigo-700 border border-indigo-200 dark:border-indigo-800 font-medium rounded-lg transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Payment Method</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center">
                            <span className="text-xs font-medium text-white">VISA</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">•••• 4242</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Expires 12/24</p>
                          </div>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Deletion - Full width */}
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="max-w-2xl">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Delete Account</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'novel-workshop':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NovelWorkshopTab />
          </motion.div>
        );
      case 'blogs':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PenTool className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Blog Writer
                </h1>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                <PenTool className="w-4 h-4" />
                Create New Post
              </button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Blog Posts List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Create and manage your blog posts with AI assistance. Write engaging content, optimize for SEO, and maintain a consistent publishing schedule.
                    </p>
                  </div>
                  <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent">
                    <option value="all">All Posts</option>
                    <option value="draft">Drafts</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                {/* Posts Container */}
                <div className="space-y-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Posts</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Showing all posts
                    </div>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PenTool className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Start Writing
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      Create your first blog post to get started
                    </p>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                      <PenTool className="w-4 h-4" />
                      Create New Post
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Generate Ideas</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get AI-powered topic suggestions</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                      <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <PenTool className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Draft Outline</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Structure your post</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-left">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <Target className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">SEO Helper</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Optimize your content</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Writing Tips</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Start with a compelling hook</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Break content into sections</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Include relevant examples</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">End with a clear call-to-action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'interactive':
        return <InteractiveAITab />;
      case 'stories':
        return <StoryWriterTab />;
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileTab />
          </motion.div>
        );
      default:
        return (
          <>
            {/* Welcome Section */}
            <motion.div 
              className="flex items-center justify-between"
              {...fadeInUp}
            >
              <h1 className="text-3xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Welcome back, {firstName}
              </h1>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 border border-slate-200/60 dark:border-gray-700/40 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <stat.icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Start Writing */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {/* New Story Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                  <div className="relative p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Start Creating
                    </h2>
                    <p className="text-slate-300 mb-6 max-w-xl">
                      Begin your creative journey with our AI-powered writing tools.
                      Choose your preferred format and let your imagination flow.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="/dashboard/blogs/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <PenTool className="w-5 h-5" />
                        Blog Post
                      </Link>
                      <Link
                        href="/dashboard/novels/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <BookOpen className="w-5 h-5" />
                        Novel
                      </Link>
                      <Link
                        href="/dashboard/stories/new"
                        className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <Sparkles className="w-5 h-5" />
                        Short Story
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm">
                  <div className="flex items-center justify-between p-6 border-b border-slate-200/60 dark:border-gray-700/40">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                      Recent Projects
                    </h2>
                    <Link
                      href="/dashboard/projects"
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      View all
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="p-6">
                    {recentProjects.length > 0 ? (
                      <div className="space-y-4">
                        {/* Project items would go here */}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">
                          You haven't created any projects yet.
                          <br />
                          Start writing your first story today!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Tools & Resources */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {/* AI Writing Assistant */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Sparkles className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        AI Writing Assistant
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get help with your writing
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Generate plot ideas
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Create character profiles
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors text-sm text-slate-600 dark:text-slate-300">
                      Expand scene descriptions
                    </button>
                  </div>
                </div>

                {/* Writing Goals */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Target className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        Writing Goals
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Track your progress
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600 dark:text-slate-300">Daily Goal</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-white">0/1000 words</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-slate-600 dark:bg-slate-400 h-2 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Writing Prompts */}
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-gray-700/40 shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <Lightbulb className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        Writing Prompts
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Get inspired
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-left">
                    Click to generate a new writing prompt...
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        );
    }
  };

  return (
    <DashboardLayout onTabClick={handleTabClick}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90">
        <div className="px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 