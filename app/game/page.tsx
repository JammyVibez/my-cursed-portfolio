"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, Heart } from "lucide-react"
import Link from "next/link"

interface GameState {
  score: number
  health: number
  level: number
  cursedOrbs: number
  gameOver: boolean
  paused: boolean
}

interface Enemy {
  id: number
  x: number
  y: number
  type: "bug" | "error" | "crash"
  speed: number
}

interface Orb {
  id: number
  x: number
  y: number
}

const GAME_WIDTH = 800
const GAME_HEIGHT = 600

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    health: 100,
    level: 1,
    cursedOrbs: 0,
    gameOver: false,
    paused: false,
  })

  const [playerPos, setPlayerPos] = useState({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 })
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [orbs, setOrbs] = useState<Orb[]>([])
  const [keys, setKeys] = useState<Set<string>>(new Set())

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((prev) => new Set(prev).add(e.key))
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const newKeys = new Set(prev)
        newKeys.delete(e.key)
        return newKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.paused) return

    const gameLoop = setInterval(() => {
      // Move player
      setPlayerPos((prev) => {
        let newX = prev.x
        let newY = prev.y

        if (keys.has("ArrowLeft") || keys.has("a")) newX = Math.max(0, prev.x - 5)
        if (keys.has("ArrowRight") || keys.has("d")) newX = Math.min(GAME_WIDTH - 50, prev.x + 5)
        if (keys.has("ArrowUp") || keys.has("w")) newY = Math.max(0, prev.y - 5)
        if (keys.has("ArrowDown") || keys.has("s")) newY = Math.min(GAME_HEIGHT - 50, prev.y + 5)

        return { x: newX, y: newY }
      })

      // Spawn enemies
      if (Math.random() < 0.02 + gameState.level * 0.005) {
        const newEnemy: Enemy = {
          id: Date.now(),
          x: Math.random() * (GAME_WIDTH - 40),
          y: -40,
          type: Math.random() < 0.5 ? "bug" : Math.random() < 0.8 ? "error" : "crash",
          speed: 1 + Math.random() * 2 + gameState.level * 0.2,
        }
        setEnemies((prev) => [...prev, newEnemy])
      }

      // Spawn orbs
      if (Math.random() < 0.01) {
        const newOrb: Orb = {
          id: Date.now(),
          x: Math.random() * (GAME_WIDTH - 20),
          y: -20,
        }
        setOrbs((prev) => [...prev, newOrb])
      }

      // Move enemies
      setEnemies((prev) =>
        prev.map((enemy) => ({ ...enemy, y: enemy.y + enemy.speed })).filter((enemy) => enemy.y < GAME_HEIGHT + 40),
      )

      // Move orbs
      setOrbs((prev) => prev.map((orb) => ({ ...orb, y: orb.y + 2 })).filter((orb) => orb.y < GAME_HEIGHT + 20))

      // Check collisions
      setEnemies((prev) => {
        const remainingEnemies = prev.filter((enemy) => {
          const collision =
            playerPos.x < enemy.x + 40 &&
            playerPos.x + 50 > enemy.x &&
            playerPos.y < enemy.y + 40 &&
            playerPos.y + 50 > enemy.y

          if (collision) {
            setGameState((prevState) => ({
              ...prevState,
              health: Math.max(0, prevState.health - (enemy.type === "crash" ? 30 : enemy.type === "error" ? 20 : 10)),
            }))
            return false
          }
          return true
        })
        return remainingEnemies
      })

      // Check orb collection
      setOrbs((prev) => {
        const remainingOrbs = prev.filter((orb) => {
          const collision =
            playerPos.x < orb.x + 20 && playerPos.x + 50 > orb.x && playerPos.y < orb.y + 20 && playerPos.y + 50 > orb.y

          if (collision) {
            setGameState((prevState) => ({
              ...prevState,
              score: prevState.score + 10,
              cursedOrbs: prevState.cursedOrbs + 1,
            }))
            return false
          }
          return true
        })
        return remainingOrbs
      })

      // Update game state
      setGameState((prev) => {
        const newLevel = Math.floor(prev.score / 100) + 1
        const gameOver = prev.health <= 0

        return {
          ...prev,
          level: newLevel,
          gameOver,
        }
      })
    }, 16) // ~60 FPS

    return () => clearInterval(gameLoop)
  }, [keys, playerPos, gameState.gameOver, gameState.paused, gameState.level])

  const resetGame = () => {
    setGameState({
      score: 0,
      health: 100,
      level: 1,
      cursedOrbs: 0,
      gameOver: false,
      paused: false,
    })
    setPlayerPos({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 100 })
    setEnemies([])
    setOrbs([])
  }

  const togglePause = () => {
    setGameState((prev) => ({ ...prev, paused: !prev.paused }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="border-primary/30 bg-transparent">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
                Cursed Code Cleaner
              </h1>
              <p className="text-muted-foreground">Dodge bugs and collect cursed orbs!</p>
            </div>
          </div>

          <Button onClick={togglePause} className="bg-primary hover:bg-primary/90">
            {gameState.paused ? "Resume" : "Pause"}
          </Button>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-card/60 backdrop-blur-sm border-primary/30">
            <CardContent className="p-0 text-center">
              <div className="text-2xl font-bold text-primary">{gameState.score}</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-card/60 backdrop-blur-sm border-accent/30">
            <CardContent className="p-0">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium">Health</span>
              </div>
              <Progress value={gameState.health} className="h-2" />
            </CardContent>
          </Card>

          <Card className="p-4 bg-card/60 backdrop-blur-sm border-primary/30">
            <CardContent className="p-0 text-center">
              <div className="text-2xl font-bold text-accent">{gameState.level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-card/60 backdrop-blur-sm border-accent/30">
            <CardContent className="p-0 text-center">
              <div className="text-2xl font-bold text-yellow-400">{gameState.cursedOrbs}</div>
              <div className="text-sm text-muted-foreground">Orbs</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <Card className="relative overflow-hidden bg-card/60 backdrop-blur-sm border-primary/30">
          <div
            className="relative bg-gradient-to-b from-background/50 to-primary/10"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT, margin: "0 auto" }}
          >
            {/* Player */}
            <motion.div
              className="absolute w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold"
              style={{ left: playerPos.x, top: playerPos.y }}
              animate={{
                rotate: keys.has("ArrowLeft") || keys.has("a") ? -10 : keys.has("ArrowRight") || keys.has("d") ? 10 : 0,
              }}
            >
              👨‍💻
            </motion.div>

            {/* Enemies */}
            {enemies.map((enemy) => (
              <motion.div
                key={enemy.id}
                className={`absolute w-10 h-10 rounded flex items-center justify-center text-white font-bold ${
                  enemy.type === "crash" ? "bg-red-500" : enemy.type === "error" ? "bg-orange-500" : "bg-yellow-500"
                }`}
                style={{ left: enemy.x, top: enemy.y }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {enemy.type === "crash" ? "💥" : enemy.type === "error" ? "❌" : "🐛"}
              </motion.div>
            ))}

            {/* Orbs */}
            {orbs.map((orb) => (
              <motion.div
                key={orb.id}
                className="absolute w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                style={{ left: orb.x, top: orb.y }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-full h-full flex items-center justify-center text-xs">⚡</div>
              </motion.div>
            ))}

            {/* Game Over Overlay */}
            <AnimatePresence>
              {gameState.gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center"
                >
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-red-400 mb-4 font-orbitron">GAME OVER</h2>
                    <p className="text-xl text-white mb-2">Final Score: {gameState.score}</p>
                    <p className="text-lg text-accent mb-6">Cursed Orbs Collected: {gameState.cursedOrbs}</p>
                    <Button onClick={resetGame} className="bg-primary hover:bg-primary/90">
                      <Zap className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pause Overlay */}
            <AnimatePresence>
              {gameState.paused && !gameState.gameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-primary mb-4 font-orbitron">PAUSED</h2>
                    <p className="text-white">Click Resume to continue</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* Controls */}
        <Card className="mt-6 p-4 bg-card/60 backdrop-blur-sm border-primary/30">
          <CardContent className="p-0">
            <h3 className="font-bold text-primary mb-2">Controls:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Move:</strong> Arrow Keys or WASD
              </div>
              <div>
                <strong>Goal:</strong> Avoid bugs and errors
              </div>
              <div>
                <strong>Collect:</strong> Yellow cursed orbs
              </div>
              <div>
                <strong>Survive:</strong> As long as possible!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
