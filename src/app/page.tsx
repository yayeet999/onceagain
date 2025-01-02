"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Brain, Layout, Sparkles, Star, Zap, Shield, ArrowRight, ChevronRight, MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Testimonials
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button>Sign up</Button>
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
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Testimonials
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/login">
                  <Button variant="ghost" className="w-full">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full">Sign up</Button>
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
    <main className="flex min-h-screen flex-col items-center bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto relative"
          >
            {/* Background Decoration */}
            <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 leading-tight">
              Craft Your Story with AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Transform your ideas into captivating novels, blogs, and interactive narratives with the power of AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="rounded-full">
                Start Creating <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Learn More <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Enhanced Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24 max-w-7xl mx-auto px-4">
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="AI Novel Generation"
              description="Create full-length, high-quality novels tailored to your vision and style"
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8" />}
              title="SEO-Friendly Blogs"
              description="Generate engaging blog content optimized for search engines"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Interactive Stories"
              description="Experience dynamic narratives that adapt to your choices"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Create your masterpiece in three simple steps</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  title: "Choose Your Style",
                  description: "Select from various genres and writing styles to match your vision"
                },
                {
                  step: "2",
                  title: "Customize Details",
                  description: "Fine-tune characters, plot elements, and narrative structure"
                },
                {
                  step: "3",
                  title: "Generate & Edit",
                  description: "Let AI create your story and make adjustments as needed"
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
                  className="relative"
                >
                  <div className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-8 relative z-10">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple Pricing</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Choose the perfect plan for your creative needs</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "Free",
                  features: ["3 Short Stories/month", "Basic Editing Tools", "Community Support"]
                },
                {
                  name: "Pro",
                  price: "$29/mo",
                  features: ["Unlimited Stories", "Advanced AI Tools", "Priority Support", "Custom Genres"]
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: ["Custom AI Models", "API Access", "Dedicated Support", "Custom Integration"]
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
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl ${
                    index === 1 ? "border-2 border-indigo-600 transform md:-translate-y-4" : ""
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold text-indigo-600 mb-6">{plan.price}</p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Zap className="w-5 h-5 text-indigo-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-full font-semibold ${
                      index === 1
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    } transition-all`}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">Join thousands of satisfied writers</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Published Author",
                  content: "This platform transformed my writing process. The AI understands exactly what I want to create."
                },
                {
                  name: "Michael Chen",
                  role: "Content Creator",
                  content: "The SEO optimization features have helped my blog reach a wider audience than ever before."
                },
                {
                  name: "Emily Davis",
                  role: "Indie Writer",
                  content: "The interactive story features opened up entirely new possibilities for my narrative writing."
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
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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

        {/* Footer */}
        <footer className="w-full py-12 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">StoryForge AI</h3>
                <p className="text-gray-600 dark:text-gray-300">Empowering creativity through artificial intelligence</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Features</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Blog</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center text-gray-600 dark:text-gray-300">
              © 2024 StoryForge AI. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
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