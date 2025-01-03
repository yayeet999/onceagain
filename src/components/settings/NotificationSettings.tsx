'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'story-updates',
      title: 'Story Updates',
      description: 'Get notified about your story progress and AI suggestions',
      icon: Star,
      enabled: true,
    },
    {
      id: 'writing-reminders',
      title: 'Writing Reminders',
      description: 'Receive reminders to maintain your writing streak',
      icon: Zap,
      enabled: true,
    },
    {
      id: 'comments',
      title: 'Comments & Feedback',
      description: 'Notifications about comments on your stories',
      icon: MessageSquare,
      enabled: true,
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      description: 'Weekly updates and writing tips',
      icon: Mail,
      enabled: false,
    },
  ]);

  const handleToggle = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement notification preferences update logic
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3">
        <Bell className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notification Settings</h2>
      </div>

      <div className="space-y-6">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-1">
                  <Label>{notification.title}</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {notification.description}
                  </p>
                </div>
              </div>
              <Switch
                checked={notification.enabled}
                onCheckedChange={() => handleToggle(notification.id)}
              />
            </div>
          );
        })}

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 