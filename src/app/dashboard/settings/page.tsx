'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Palette,
  Shield,
  Globe,
  CreditCard,
  Mail,
  Key,
  Smartphone,
} from 'lucide-react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const settingsSections = [
  {
    title: 'Account',
    items: [
      {
        icon: User,
        title: 'Profile Information',
        description: 'Update your personal information and bio',
      },
      {
        icon: Mail,
        title: 'Email Settings',
        description: 'Manage your email preferences and notifications',
      },
      {
        icon: Key,
        title: 'Password & Security',
        description: 'Change password and security settings',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        icon: Bell,
        title: 'Notifications',
        description: 'Configure how you want to receive updates',
      },
      {
        icon: Palette,
        title: 'Appearance',
        description: 'Customize your writing environment',
      },
      {
        icon: Globe,
        title: 'Language & Region',
        description: 'Set your preferred language and timezone',
      },
    ],
  },
  {
    title: 'Billing & Privacy',
    items: [
      {
        icon: CreditCard,
        title: 'Subscription & Billing',
        description: 'Manage your subscription and payment methods',
      },
      {
        icon: Shield,
        title: 'Privacy & Data',
        description: 'Control your data and privacy settings',
      },
      {
        icon: Smartphone,
        title: 'Connected Devices',
        description: 'Manage devices connected to your account',
      },
    ],
  },
];

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-8 space-y-8">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
} 