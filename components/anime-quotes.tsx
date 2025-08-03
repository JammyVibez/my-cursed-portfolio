"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Quote } from "lucide-react"

const animeQuotes = [
  {
    text: "Throughout heaven and earth, I alone am the honored one.",
    author: "Gojo Satoru",
    anime: "Jujutsu Kaisen",
  },
  {
    text: "I'll show you the difference in our abilities.",
    author: "Ryomen Sukuna",
    anime: "Jujutsu Kaisen",
  },
  {
    text: "A lesson without pain is meaningless.",
    author: "Edward Elric",
    anime: "Fullmetal Alchemist",
  },
  {
    text: "The only way to truly escape the mundane is for you to constantly be evolving.",
    author: "Izuku Midoriya",
    anime: "My Hero Academia",
  },
  {
    text: "Code is poetry written in logic.",
    author: "Anonymous Developer",
    anime: "Real Life",
  },
  {
    text: "In a world of infinite possibilities, we choose to create.",
    author: "Tech Visionary",
    anime: "Developer's Journey",
  },
]

export function AnimeQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const randomIndex = Math.floor(Math.random() * animeQuotes.length)
    setCurrentQuote(randomIndex)

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % animeQuotes.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-4 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-foreground leading-relaxed mb-2">"{animeQuotes[currentQuote].text}"</p>
                <div className="text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{animeQuotes[currentQuote].author}</span>
                  {" • "}
                  <span>{animeQuotes[currentQuote].anime}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
