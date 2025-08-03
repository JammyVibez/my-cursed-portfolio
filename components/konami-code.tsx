"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

export function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([])
  const [overdrive, setOverdrive] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const newSequence = [...prev, e.code].slice(-KONAMI_CODE.length)

        // Check if sequence matches Konami code
        if (
          newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, index) => key === KONAMI_CODE[index])
        ) {
          activateOverdrive()
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const activateOverdrive = () => {
    setOverdrive(true)

    // Auto-deactivate after 10 seconds
    setTimeout(() => {
      setOverdrive(false)
    }, 10000)
  }

  return (
    <AnimatePresence>
      {overdrive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="konami-overdrive fixed inset-0 z-[250] pointer-events-none"
        >
          {/* Screen Shake Effect */}
          <motion.div
            animate={{
              x: [0, -5, 5, -5, 5, 0],
              y: [0, -5, 5, -5, 5, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="absolute inset-0"
          >
            {/* Gojo vs Sukuna Clash */}
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-8xl"
              >
                👁️
              </motion.div>
              <div className="text-center text-blue-400 font-bold mt-2">GOJO</div>
            </div>

            <div className="absolute right-1/4 top-1/2 -translate-y-1/2">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-8xl"
              >
                👹
              </motion.div>
              <div className="text-center text-red-400 font-bold mt-2">SUKUNA</div>
            </div>

            {/* Energy Clash */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{
                  scale: [1, 2, 1],
                  rotate: [0, 360],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-20 h-20 bg-gradient-to-r from-blue-400 to-red-400 rounded-full blur-lg"
              />
            </div>
          </motion.div>

          {/* Overdrive Text */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center"
          >
            <h1 className="text-6xl font-bold text-white font-orbitron mb-4">SHONEN OVERDRIVE</h1>
            <p className="text-2xl text-primary">MAXIMUM POWER ACTIVATED!</p>
          </motion.div>

          {/* Anime-style UI Lights */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random(),
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
