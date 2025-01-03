'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, Shield, CheckCircle2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function BillingSettings() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual data from your backend
  const subscription = {
    plan: 'Pro',
    status: 'Active',
    nextBilling: 'July 1, 2024',
    amount: '$29.00',
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3">
        <CreditCard className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Billing Settings</h2>
      </div>

      <div className="space-y-8">
        {/* Current Plan */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Current Plan</h3>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  {subscription.plan}
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {subscription.status} • {subscription.amount}/month
                </p>
              </div>
              <Button variant="outline">Change Plan</Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              Next billing date: {subscription.nextBilling}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h3>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {method.type} •••• {method.last4}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Expires {method.expiry}
                      {method.isDefault && (
                        <span className="ml-2 text-indigo-600 dark:text-indigo-400">Default</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Billing History</h3>
          </div>

          <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No billing history available yet</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 