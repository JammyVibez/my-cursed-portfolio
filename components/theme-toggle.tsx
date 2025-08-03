"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Volume2, VolumeX } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"gojo" | "sukuna">("gojo")
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as "gojo" | "sukuna") || "gojo"
    const savedSound = localStorage.getItem("soundEnabled") === "true"
    setTheme(savedTheme)
    setSoundEnabled(savedSound)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: "gojo" | "sukuna") => {
    const root = document.documentElement

    if (newTheme === "gojo") {
      // Gojo theme - Limitless blue/white/purple
      root.style.setProperty("--background", "222.2 84% 4.9%")
      root.style.setProperty("--foreground", "210 40% 98%")
      root.style.setProperty("--primary", "217.2 91.2% 59.8%") // Bright blue
      root.style.setProperty("--primary-foreground", "222.2 84% 4.9%")
      root.style.setProperty("--accent", "263.4 70% 50.4%") // Purple
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
      root.style.setProperty("--primary", "0 72.2% 50.6%") // Deep red
      root.style.setProperty("--primary-foreground", "0 85.7% 97.3%")
      root.style.setProperty("--accent", "12 76% 61%") // Orange-red
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
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const toggleSound = () => {
    const newSound = !soundEnabled
    setSoundEnabled(newSound)
    localStorage.setItem("soundEnabled", newSound.toString())
  }

  if (!mounted) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleSound}
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
      >
        {soundEnabled ? (
          <Volume2 className="h-4 w-4 text-primary" />
        ) : (
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="sr-only">Toggle sound</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
        title={theme === "gojo" ? "Switch to Sukuna theme" : "Switch to Gojo theme"}
      >
        {theme === "gojo" ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-primary" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
