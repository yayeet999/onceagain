'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Settings,
  LogOut,
  PenTool,
  BookMarked,
  Sparkles,
  Brain,
  Users,
  MessageSquare,
  LayoutGrid,
  ChevronLeft,
  Bell,
  Search,
  User,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', icon: LayoutGrid, href: '/dashboard' },
    ]
  },
  {
    title: 'Author Tools',
    items: [
      { name: 'Blog Writer', icon: PenTool, href: '/dashboard/blogs' },
      { name: 'Story Writer', icon: BookOpen, href: '/dashboard/stories' },
      { name: 'Novel Workshop', icon: BookMarked, href: '/dashboard/novels' },
      { name: 'Interactive AI', icon: Brain, href: '/dashboard/interactive' },
    ]
  },
  {
    title: 'Community',
    items: [
      { name: 'Writers Circle', icon: Users, href: '/dashboard/community' },
      { name: 'Discussions', icon: MessageSquare, href: '/dashboard/discussions' },
    ]
  },
  {
    title: 'Settings & Support',
    items: [
      { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ]
  }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Prevent unwanted navigation resets
  useEffect(() => {
    const handleFocus = () => {
      // Store the current path in sessionStorage
      sessionStorage.setItem('lastPath', pathname);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const lastPath = sessionStorage.getItem('lastPath');
        if (lastPath && lastPath !== pathname) {
          router.push(lastPath);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Store initial path
    sessionStorage.setItem('lastPath', pathname);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, router]);

  const isRouteActive = (href: string) => {
    // Exact match for dashboard home
    if (href === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    
    // For nested routes, check if the current path starts with the href
    // This ensures routes like /dashboard/novels/create still highlight /dashboard/novels
    if (href !== '/dashboard') {
      // Special handling for novel creation workflow
      if (pathname.startsWith('/dashboard/novels/create') && href === '/dashboard/novels') {
        return true;
      }
      return pathname.startsWith(href);
    }
    
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <header className="fixed top-0 right-0 left-0 z-20 bg-white dark:bg-gray-800 border-b border-slate-200/60 dark:border-gray-700/40 shadow-sm backdrop-blur-lg bg-white/80 dark:bg-gray-800/80">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Narrately
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-transparent rounded-xl focus:border-slate-300 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-800 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-slate-600 rounded-full" />
            </button>
            <button className="flex items-center gap-2 p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-10 bg-white dark:bg-gray-800 border-r border-slate-200/60 dark:border-gray-700/40 shadow-lg transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-[280px]'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-4 top-4 p-2 bg-white dark:bg-gray-800 border border-slate-200/60 dark:border-gray-700/40 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="w-4 h-4 text-slate-500" />
            </motion.div>
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {menuItems.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex !== 0 ? 'mt-6' : ''}>
                {!isCollapsed && (
                  <h3 className="px-3 mb-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = isRouteActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                          ${isActive 
                            ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' 
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }
                        `}
                      >
                        <div className="transition-transform duration-200 ease-out group-hover:scale-105">
                          <item.icon className={`
                            w-5 h-5
                            ${isActive 
                              ? 'text-slate-900 dark:text-white' 
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                            }
                          `} />
                        </div>
                        {!isCollapsed && (
                          <span>{item.name}</span>
                        )}
                        {isActive && !isCollapsed && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-xl bg-slate-100 dark:bg-slate-800 -z-10"
                            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 mt-auto border-t border-slate-200/60 dark:border-gray-700/40">
            <button
              className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 group"
            >
              <div className="transition-transform duration-200 ease-out group-hover:scale-105">
                <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-red-600 dark:group-hover:text-red-400" />
              </div>
              {!isCollapsed && (
                <span>Sign Out</span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 ${isCollapsed ? 'pl-20' : 'pl-[280px]'} transition-all duration-300`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
} 