"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Zap } from "lucide-react"

interface AnimeLoadingScreenProps {
  theme: "gojo" | "sukuna"
  soundEnabled: boolean
}

export function AnimeLoadingScreen({ theme, soundEnabled }: AnimeLoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showEye, setShowEye] = useState(false)

  useEffect(() => {
    // Show eye animation first
    const eyeTimer = setTimeout(() => {
      setShowEye(true)
    }, 500)

    // Hide loading screen
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    // Play sound effect if enabled
    if (soundEnabled) {
      // You can add audio here
      // const audio = new Audio('/sounds/domain-expansion.mp3')
      // audio.play().catch(() => {})
    }

    return () => {
      clearTimeout(eyeTimer)
      clearTimeout(loadingTimer)
    }
  }, [soundEnabled])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              {theme === "gojo" ? (
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Eye className="w-16 h-16 text-white" />
                </div>
              ) : (
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white" />
                </div>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron mb-4"
            >
              {theme === "gojo" ? "Domain Expansion" : "Malevolent Shrine"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-muted-foreground"
            >
              {theme === "gojo" ? "Infinite Void Loading..." : "Cursed Energy Awakening..."}
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-8 max-w-xs mx-auto"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
