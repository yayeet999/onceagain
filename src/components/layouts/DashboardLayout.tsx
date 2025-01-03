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
      { name: 'Dashboard', icon: LayoutGrid, href: '#dashboard' },
    ]
  },
  {
    title: 'Author Tools',
    items: [
      { name: 'Blog Writer', icon: PenTool, href: '#blogs' },
      { name: 'Story Writer', icon: BookOpen, href: '#stories' },
      { name: 'Novel Workshop', icon: BookMarked, href: '#novel-workshop' },
      { name: 'Interactive AI', icon: Brain, href: '#interactive' },
    ]
  },
  {
    title: 'Community',
    items: [
      { name: 'Writing Guide', icon: Sparkles, href: '#writing-guide' },
      { name: 'Discussions', icon: MessageSquare, href: '#discussions' },
    ]
  },
  {
    title: 'Profile & Settings',
    items: [
      { name: 'Profile', icon: User, href: '#profile' },
      { name: 'Settings', icon: Settings, href: '#settings' },
    ]
  }
];

export default function DashboardLayout({ 
  children,
  onTabClick
}: { 
  children: React.ReactNode;
  onTabClick?: (href: string) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash);

    // Update hash on change
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
    // Handle hash-based tabs
    if (href.startsWith('#')) {
      // Dashboard is active when there's no hash or #dashboard
      if (href === '#dashboard') {
        return !currentHash || currentHash === '#dashboard';
      }
      // Other tabs are active when their hash matches
      return currentHash === href;
    }
    
    // For nested routes (blogs, stories, etc)
    return pathname.startsWith(href);
  };

  const handleTabClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      // For dashboard tab, clear hash if it's already active
      if (href === '#dashboard' && (currentHash === '#dashboard' || !currentHash)) {
        window.location.hash = '';
      } else {
        window.location.hash = href;
      }
      onTabClick?.(href);
    } else {
      router.push(href);
    }
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
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Profile</span>
              </button>

              {/* Profile Menu - Not functional yet */}
              {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      View Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      Settings
                    </button>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
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
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleTabClick(e, item.href)}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                          ${isRouteActive(item.href)
                            ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800' 
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }
                        `}
                      >
                        <div className="transition-transform duration-200 ease-out group-hover:scale-105">
                          <item.icon className={`
                            w-5 h-5
                            ${isRouteActive(item.href)
                              ? 'text-slate-900 dark:text-white' 
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                            }
                          `} />
                        </div>
                        {!isCollapsed && (
                          <span>{item.name}</span>
                        )}
                        {isRouteActive(item.href) && !isCollapsed && (
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