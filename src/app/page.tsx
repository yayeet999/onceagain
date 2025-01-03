"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { BookOpen, Brain, Layout, Sparkles, Star, Zap, Shield, ArrowRight, ChevronRight, MessageSquare, Menu, X, Palette, Wand2 } from "lucide-react";
import { PenNib } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function AnimatedGradient() {
  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl transform rotate-12 scale-150" />
      <div className="absolute inset-0 bg-gradient-to-l from-blue-500/10 to-pink-500/20 blur-3xl -rotate-12 scale-150" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/80 dark:to-gray-900/80" />
    </motion.div>
  );
}

function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { icon: <Sparkles className="w-6 h-6" />, delay: 0 },
        { icon: <BookOpen className="w-6 h-6" />, delay: 1 },
        { icon: <Brain className="w-6 h-6" />, delay: 2 }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-indigo-600/30 dark:text-indigo-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: 10,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 h-16">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Narrately
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost" className="px-6 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors duration-200">
                Log in
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-200">
                Sign up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                How It Works
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/login">
                  <Button variant="ghost" className="w-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors duration-200">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-200">
                    Sign up
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white dark:bg-gray-900">
      <Header />
      <div className="w-full flex-1 mt-16">
        {/* Hero Section */}
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <AnimatedGradient />
          <FloatingIcons />
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-4xl mx-auto relative z-10 py-16"
          >
            <motion.div
              variants={floatingAnimation}
              className="mb-8 relative"
            >
              <div className="relative">
                <Sparkles className="w-16 h-16 mx-auto mb-6 text-indigo-600 dark:text-indigo-400" />
                <motion.div
                  className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            <motion.div className="relative">
              <motion.div
                className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 leading-tight relative"
              >
                Craft Your Story with AI
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              Transform your ideas into captivating novels, blogs, and interactive narratives with the power of AI
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                size="lg"
                className="rounded-full text-lg px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <span className="relative flex items-center">
                  Start Creating
                  <PenNib className="w-5 h-5 ml-2" weight="bold" />
                </span>
              </Button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12 px-4"
            >
              {[
                { value: "100K+", label: "Active Writers" },
                { value: "1M+", label: "Stories Created" },
                { value: "50+", label: "AI Models" },
                { value: "4.9", label: "User Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <motion.div
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: index * 0.1 + 0.5
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    className="text-gray-600 dark:text-gray-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Create Your Masterpiece</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Three simple steps to bring your story to life</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-200 dark:via-indigo-800 to-transparent -translate-y-1/2 hidden md:block" />
              
              {[
                {
                  step: "1",
                  title: "Choose Your Style",
                  description: "Select from various genres and writing styles to match your vision",
                  icon: <Palette className="w-6 h-6" />
                },
                {
                  step: "2",
                  title: "Customize Details",
                  description: "Fine-tune characters, plot elements, and narrative structure",
                  icon: <Brain className="w-6 h-6" />
                },
                {
                  step: "3",
                  title: "Generate & Edit",
                  description: "Let AI create your story and make adjustments as needed",
                  icon: <Wand2 className="w-6 h-6" />
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
                  }}
                  className="relative group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl relative z-10 h-full border border-gray-200 dark:border-gray-700
                               transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-24 bg-muted relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 opacity-50" />
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Pricing
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Choose the perfect plan for your creative journey</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  description: "Perfect for trying out our platform",
                  features: [
                    "3 Short Stories/month",
                    "Basic Editing Tools",
                    "Community Support",
                    "1GB Storage"
                  ]
                },
                {
                  name: "Pro",
                  price: "$29",
                  period: "per month",
                  description: "Everything you need for serious writing",
                  features: [
                    "Unlimited Stories",
                    "Advanced AI Tools",
                    "Priority Support",
                    "Custom Genres",
                    "50GB Storage",
                    "Analytics Dashboard"
                  ],
                  popular: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For professional authors and teams",
                  features: [
                    "Custom AI Models",
                    "API Access",
                    "Dedicated Support",
                    "Custom Integration",
                    "Unlimited Storage",
                    "Advanced Analytics",
                    "Team Collaboration"
                  ]
                }
              ].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
                  }}
                  className={`relative group ${
                    plan.popular ? "md:-mt-4 md:mb-4" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <span className="inline-block px-4 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className={`h-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300
                                 group-hover:shadow-2xl group-hover:-translate-y-1 relative
                                 ${plan.popular ? "border-2 border-indigo-600" : "border border-gray-200 dark:border-gray-700"}`}>
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                      <div className="flex items-end gap-2 mb-6">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                        {plan.period && (
                          <span className="text-gray-600 dark:text-gray-400 mb-1">{plan.period}</span>
                        )}
                      </div>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                          <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      className={`w-full rounded-xl ${
                        plan.popular
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Join thousands of satisfied writers</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Published Author",
                  content: "This platform transformed my writing process. The AI understands exactly what I want to create.",
                  image: "https://i.pravatar.cc/100?img=1"
                },
                {
                  name: "Michael Chen",
                  role: "Content Creator",
                  content: "The SEO optimization features have helped my blog reach a wider audience than ever before.",
                  image: "https://i.pravatar.cc/100?img=2"
                },
                {
                  name: "Emily Davis",
                  role: "Indie Writer",
                  content: "The interactive story features opened up entirely new possibilities for my narrative writing.",
                  image: "https://i.pravatar.cc/100?img=3"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0, transition: { delay: index * 0.2 } }
                  }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300
                           border border-gray-200 dark:border-gray-700 relative group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 relative">
                    <span className="absolute -top-4 -left-2 text-4xl text-indigo-200 dark:text-indigo-800">"</span>
                    {testimonial.content}
                    <span className="absolute -bottom-4 -right-2 text-4xl text-indigo-200 dark:text-indigo-800">"</span>
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">StoryForge AI</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Empowering creativity through artificial intelligence
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "twitter", href: "#" },
                  { icon: "github", href: "#" },
                  { icon: "linkedin", href: "#" }
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center
                             hover:bg-indigo-500 dark:hover:bg-indigo-600 text-gray-600 dark:text-gray-300
                             hover:text-white transition-colors"
                  >
                    <i className={`fab fa-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "API", "Documentation"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                               transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                               transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Security", "Cookies"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                               transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                © 2024 StoryForge AI. All rights reserved.
              </p>
              <div className="flex gap-4 text-sm">
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Privacy Policy
                </a>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
} 