"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Shirt } from "lucide-react"
import Image from "next/image"

const avatarMessages = [
  "Yo! I'm Hamza, your coding senpai 👁️",
  "Scroll down to see my legendary projects!",
  "My cursed techniques are unmatched in the dev world!",
  "Want to see some real Six Eyes programming?",
  "Domain Expansion: Infinite Code incoming...",
  "Let's build something impossible together!",
  "I can debug any code with my Six Eyes 🐛",
  "Ready to witness limitless possibilities?",
  "From marketing to coding - what a journey!",
  "Anime + Tech = My secret formula ⚡",
]

const personalInfo = [
  "🎂 Age: 18 | Born to code with cursed energy",
  "🎓 3MTT Graduate | Jujutsu Tech Alumni",
  "💼 3+ Years wielding development techniques",
  "🌍 Based in Nigeria | Building global dreams",
  "🎮 Anime enthusiast | JJK is life",
  "☕ Powered by coffee and determination",
]

const outfits = [
  {
    name: "Gojo Mode",
    color: "from-blue-400 to-purple-400",
    image: "gojo 2.jpg",
    personality: "Confident and limitless",
  },
  {
    name: "Sukuna Mode",
    color: "from-red-400 to-orange-400",
    image: "hd-sakuna.jpg",
    personality: "Powerful and dominant",
  },
  {
    name: "Developer Mode",
    color: "from-green-400 to-blue-400",
    image: "/placeholder.svg?height=60&width=60&text=Dev",
    personality: "Focused and innovative",
  },
  {
    name: "Hamza Mode",
    color: "from-purple-400 to-pink-400",
    image: "/placeholder.svg?height=60&width=60&text=Hamza",
    personality: "Authentic and creative",
  },
]

interface TalkingAvatarProps {
  soundEnabled: boolean
}

export function TalkingAvatar({ soundEnabled }: TalkingAvatarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("")
  const [currentOutfit, setCurrentOutfit] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    // Show random greeting after 3 seconds
    const timer = setTimeout(() => {
      showRandomMessage()
    }, 3000)

    // Random messages every 30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        showRandomMessage()
      }
    }, 30000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const showRandomMessage = () => {
    const message = avatarMessages[Math.floor(Math.random() * avatarMessages.length)]
    setCurrentMessage(message)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 4000)
  }

  const changeOutfit = () => {
    setCurrentOutfit((prev) => (prev + 1) % outfits.length)
  }

  const currentOutfitData = outfits[currentOutfit]

  return (
    <div className="fixed bottom-20 left-4 z-40">
      {/* Avatar */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentOutfitData.color} flex items-center justify-center cursor-pointer shadow-lg shadow-primary/30 border-2 border-primary/50 overflow-hidden`}
        >
          <Image
            src={currentOutfitData.image || "/placeholder.svg"}
            alt={currentOutfitData.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </motion.div>

        {/* Floating Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-full left-0 mb-2 w-64"
            >
              <Card className="p-3 bg-card/90 backdrop-blur-sm border-primary/30 relative">
                <p className="text-sm text-foreground leading-relaxed">{currentMessage}</p>
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-card border-r border-b border-primary/30 transform rotate-45" />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Avatar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-2 w-80"
          >
            <Card className="p-4 bg-card/90 backdrop-blur-sm border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-primary font-orbitron">Hamza AI Assistant</h3>
                <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary/30">
                    <Image
                      src={currentOutfitData.image || "/placeholder.svg"}
                      alt={currentOutfitData.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium">{currentOutfitData.name}</p>
                  <p className="text-xs text-muted-foreground">{currentOutfitData.personality}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={changeOutfit} className="flex-1 bg-primary/20 hover:bg-primary/30">
                    <Shirt className="w-3 h-3 mr-1" />
                    Change
                  </Button>
                  <Button size="sm" onClick={showRandomMessage} className="flex-1 bg-accent/20 hover:bg-accent/30">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Talk
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowInfo(!showInfo)}
                  className="w-full border-primary/30"
                >
                  {showInfo ? "Hide Info" : "About Hamza"}
                </Button>

                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1"
                    >
                      {personalInfo.map((info, index) => (
                        <p key={index} className="text-xs text-muted-foreground">
                          {info}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-xs text-muted-foreground text-center">Click me for tips and encouragement!</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
