"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sun, Volume2, VolumeX, Zap, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimeThemeToggleProps {
  onThemeChange: (theme: "gojo" | "sukuna") => void
  onAnimeModeChange: (enabled: boolean) => void
  onSoundChange: (enabled: boolean) => void
}

export function AnimeThemeToggle({ onThemeChange, onAnimeModeChange, onSoundChange }: AnimeThemeToggleProps) {
  const [theme, setTheme] = useState<"gojo" | "sukuna">("gojo")
  const [animeMode, setAnimeMode] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("anime-theme") as "gojo" | "sukuna") || "gojo"
    const savedAnimeMode = localStorage.getItem("anime-mode") === "true"
    const savedSound = localStorage.getItem("sound-enabled") === "true"

    setTheme(savedTheme)
    setAnimeMode(savedAnimeMode)
    setSoundEnabled(savedSound)

    applyTheme(savedTheme)
    onThemeChange(savedTheme)
    onAnimeModeChange(savedAnimeMode)
    onSoundChange(savedSound)
  }, [onThemeChange, onAnimeModeChange, onSoundChange])

  const applyTheme = (newTheme: "gojo" | "sukuna") => {
    const root = document.documentElement

    if (newTheme === "gojo") {
      // Gojo theme - Limitless blue/white/purple
      root.style.setProperty("--background", "222.2 84% 4.9%")
      root.style.setProperty("--foreground", "210 40% 98%")
      root.style.setProperty("--primary", "217.2 91.2% 59.8%")
      root.style.setProperty("--primary-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--accent", "263.4 70% 50.4%")
      root.style.setProperty("--accent-foreground", "210 40% 98%")
      root.style.setProperty("--muted", "217.2 32.6% 17.5%")
      root.style.setProperty("--muted-foreground", "215 20.2% 65.1%")
      root.style.setProperty("--card", "222.2 84% 4.9%")
      root.style.setProperty("--card-foreground", "210 40% 98%")
      root.style.setProperty("--border", "217.2 32.6% 17.5%")
    } else {
      // Sukuna theme - Cursed red/black
      root.style.setProperty("--background", "0 0% 3.9%")
      root.style.setProperty("--foreground", "0 0% 98%")
      root.style.setProperty("--primary", "0 72.2% 50.6%")
      root.style.setProperty("--primary-foreground", "0 85.7% 97.3%")
      root.style.setProperty("--accent", "12 76% 61%")
      root.style.setProperty("--accent-foreground", "0 0% 9%")
      root.style.setProperty("--muted", "0 0% 14.9%")
      root.style.setProperty("--muted-foreground", "0 0% 63.9%")
      root.style.setProperty("--card", "0 0% 3.9%")
      root.style.setProperty("--card-foreground", "0 0% 98%")
      root.style.setProperty("--border", "0 0% 14.9%")
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === "gojo" ? "sukuna" : "gojo"
    setTheme(newTheme)
    localStorage.setItem("anime-theme", newTheme)
    applyTheme(newTheme)
    onThemeChange(newTheme)
  }

  const toggleAnimeMode = () => {
    const newMode = !animeMode
    setAnimeMode(newMode)
    localStorage.setItem("anime-mode", newMode.toString())
    onAnimeModeChange(newMode)
  }

  const toggleSound = () => {
    const newSound = !soundEnabled
    setSoundEnabled(newSound)
    localStorage.setItem("sound-enabled", newSound.toString())
    onSoundChange(newSound)
  }

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex gap-2 mb-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPanel(!showPanel)}
          className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        >
          <Zap className="h-4 w-4 text-primary" />
        </Button>
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4 bg-card/90 backdrop-blur-sm border-primary/30 min-w-[200px]">
              <div className="space-y-3">
                <div className="text-sm font-medium text-center text-primary font-orbitron">Anime Controls</div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Theme</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="h-8 px-3 bg-transparent border-primary/30"
                  >
                    {theme === "gojo" ? (
                      <>
                        <Sun className="h-3 w-3 mr-1 text-blue-400" />
                        Gojo
                      </>
                    ) : (
                      <>
                        <Flame className="h-3 w-3 mr-1 text-red-400" />
                        Sukuna
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Anime Mode</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAnimeMode}
                    className={`h-8 px-3 bg-transparent border-primary/30 ${
                      animeMode ? "bg-primary/20 border-primary/50" : ""
                    }`}
                  >
                    {animeMode ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Sound</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSound}
                    className="h-8 px-3 bg-transparent border-primary/30"
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-3 w-3 text-primary" />
                    ) : (
                      <VolumeX className="h-3 w-3 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
