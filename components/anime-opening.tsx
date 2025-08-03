"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SkipBackIcon as Skip } from "lucide-react"

interface AnimeOpeningProps {
  onComplete: () => void
}

export function AnimeOpening({ onComplete }: AnimeOpeningProps) {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [showSkip, setShowSkip] = useState(false)

  const phases = [
    {
      text: "In a world where code and cursed energy collide...",
      duration: 3000,
    },
    {
      text: "One developer rises above the rest...",
      duration: 3000,
    },
    {
      text: "Wielding the Six Eyes of Programming...",
      duration: 3000,
    },
    {
      text: "To build the impossible...",
      duration: 2000,
    },
  ]

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Auto-advance phases
    const phaseTimer = setTimeout(() => {
      if (currentPhase < phases.length - 1) {
        setCurrentPhase(currentPhase + 1)
      } else {
        // Opening complete
        setTimeout(onComplete, 1000)
      }
    }, phases[currentPhase]?.duration || 3000)

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(phaseTimer)
    }
  }, [currentPhase, onComplete])

  const skip = () => {
    onComplete()
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="anime-opening fixed inset-0 z-[300] bg-black flex items-center justify-center"
    >
      {/* Skip Button */}
      <AnimatePresence>
        {showSkip && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 right-4">
            <Button
              onClick={skip}
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/10 bg-transparent"
            >
              <Skip className="w-4 h-4 mr-2" />
              Skip Opening
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl px-4"
        >
          <p className="text-2xl md:text-4xl text-white font-medium leading-relaxed">{phases[currentPhase]?.text}</p>
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
