"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, Flame } from "lucide-react"

interface DomainExpansionProps {
  theme: "gojo" | "sukuna"
  soundEnabled: boolean
}

const domainInfo = {
  gojo: {
    name: "UNLIMITED VOID",
    description: "Infinite information processing overwhelms the target",
    technique: "Limitless + Six Eyes",
    effect: "Paralyzes enemies with infinite knowledge",
    quote: "You can see and feel everything, but you can't do anything.",
    stats: {
      range: "Infinite",
      power: "∞",
      duration: "0.2 seconds (feels like eternity)",
      lethality: "Non-lethal (Mental overload)",
    },
  },
  sukuna: {
    name: "MALEVOLENT SHRINE",
    description: "A Buddhist shrine that slices everything within its range",
    technique: "Cleave + Dismantle",
    effect: "Automatic slashing attacks on all targets",
    quote: "Bow down! You are in the presence of the King of Curses!",
    stats: {
      range: "200 meters",
      power: "Maximum",
      duration: "Until all enemies are eliminated",
      lethality: "Absolute (Guaranteed kill)",
    },
  },
}

export function DomainExpansion({ theme, soundEnabled }: DomainExpansionProps) {
  const [isActive, setIsActive] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  const currentDomain = domainInfo[theme]

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)())
    }
  }, [])

  const playDomainSound = () => {
    if (!soundEnabled || !audioContext) return

    // Create a more complex domain expansion sound
    const oscillator1 = audioContext.createOscillator()
    const oscillator2 = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (theme === "gojo") {
      oscillator1.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator2.frequency.setValueAtTime(880, audioContext.currentTime)
      oscillator1.type = "sine"
      oscillator2.type = "triangle"
    } else {
      oscillator1.frequency.setValueAtTime(220, audioContext.currentTime)
      oscillator2.frequency.setValueAtTime(110, audioContext.currentTime)
      oscillator1.type = "sawtooth"
      oscillator2.type = "square"
    }

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3)

    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 3)
    oscillator2.stop(audioContext.currentTime + 3)
  }

  const activateDomain = () => {
    setIsActive(true)
    setShowInfo(true)
    playDomainSound()

    // Auto-deactivate after 8 seconds
    setTimeout(() => {
      setIsActive(false)
      setShowInfo(false)
    }, 8000)
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Button
          onClick={activateDomain}
          disabled={isActive}
          className={`px-6 py-3 font-bold transition-all duration-300 ${
            theme === "gojo"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
          }`}
        >
          {theme === "gojo" ? <Eye className="w-5 h-5 mr-2" /> : <Flame className="w-5 h-5 mr-2" />}
          {isActive ? "EXPANDING..." : "DOMAIN EXPANSION"}
        </Button>
      </div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none"
          >
            {theme === "gojo" ? <GojoInfiniteVoid /> : <SukunaMalevolentShrine />}

            {/* Domain Expansion Text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white font-orbitron mb-4">DOMAIN EXPANSION</h1>
                <h2
                  className={`text-3xl md:text-5xl font-bold mb-6 ${
                    theme === "gojo" ? "text-blue-300" : "text-red-300"
                  }`}
                >
                  {currentDomain.name}
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="bg-black/60 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                >
                  <p className="text-lg text-white/90 mb-4 italic">"{currentDomain.quote}"</p>
                  <p className="text-white/80 mb-4">{currentDomain.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Range:</span>
                      <span className="text-white ml-2">{currentDomain.stats.range}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Power:</span>
                      <span className="text-white ml-2">{currentDomain.stats.power}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Duration:</span>
                      <span className="text-white ml-2">{currentDomain.stats.duration}</span>
                    </div>
                    <div>
                      <span className="text-white/60">Lethality:</span>
                      <span className="text-white ml-2">{currentDomain.stats.lethality}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function GojoInfiniteVoid() {
  return (
    <div className="gojo-infinite-void absolute inset-0 bg-black/95">
      {/* Infinite Blue Fractals */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 3, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Slow Motion Orbs */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -200, 200, 0],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Information Overload Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse" />
    </div>
  )
}

function SukunaMalevolentShrine() {
  return (
    <div className="sukuna-malevolent-shrine absolute inset-0 bg-black/95">
      {/* Red Cursed Marks */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-2xl md:text-4xl font-bold opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          {["呪", "斬", "解", "王"][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      {/* Slashing Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`slash-${i}`}
          className="absolute h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Pulsing Red Energy */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20"
        animate={{
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  )
}
