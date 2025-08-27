/*
 * Licensed under the MIT License. See LICENSE file in the project root for full license text.
 */

"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../../assets/assets'
import Image from 'next/image'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Always use dark theme for loading screen
    setIsDark(true)

    // Simulate loading progress with smoother animation
    const duration = 1500 // 1.5 seconds total
    const steps = 100
    const stepDuration = duration / steps
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500)
          return 100
        }
        // Smooth increment to ensure we reach 100%
        const increment = 100 / steps
        return Math.min(prev + increment, 100)
      })
    }, stepDuration)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
                 style={{
           background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)'
         }}
      >
        <div className="text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-24 h-24 mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-transparent border-t-blue-900 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 border-4 border-transparent border-t-purple-700 rounded-full"
              />
                             <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                 <span className="text-2xl font-bold text-gray-800 dark:text-white font-mozilla-headline">MZ</span>
               </div>
            </div>
          </motion.div>

          {/* Name Animation */}
                     <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
                          className="text-3xl font-bold mb-2 font-mozilla-headline"
              style={{ color: '#ffffff' }}
           >
             Mohamed Zakaria Cherki
           </motion.h1>

                     <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5, duration: 0.8 }}
                          className="text-lg mb-8 font-mozilla-text"
              style={{ color: '#9ca3af' }}
           >
             Software Engineer
           </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
                         className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-700 to-purple-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Progress Text */}
                     <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.9, duration: 0.8 }}
                          className="text-sm font-mozilla-text"
              style={{ color: '#9ca3af' }}
           >
             Loading... {Math.round(progress)}%
           </motion.p>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {['React', 'Next.js', 'Node.js', 'MongoDB', 'Laravel', 'Angular'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                                 className="absolute text-xs font-mozilla-text"
                                 style={{
                   left: `${20 + (index * 15)}%`,
                   top: `${30 + (index * 10)}%`,
                   color: '#6b7280'
                 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoadingScreen
