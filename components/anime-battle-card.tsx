"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play, Eye, Zap, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  link: string
  type: "web" | "3d" | "dashboard" | "mobile"
  power?: number
  rarity?: "common" | "rare" | "epic" | "legendary"
}

interface AnimeBattleCardProps {
  project: Project
  index: number
  animeMode: boolean
}

const typeIcons = {
  web: ExternalLink,
  "3d": Eye,
  dashboard: Play,
  mobile: ExternalLink,
}

const rarityColors = {
  common: "border-gray-400 bg-gray-400/10",
  rare: "border-blue-400 bg-blue-400/10",
  epic: "border-purple-400 bg-purple-400/10",
  legendary: "border-yellow-400 bg-yellow-400/10",
}

export function AnimeBattleCard({ project, index, animeMode }: AnimeBattleCardProps) {
  const TypeIcon = typeIcons[project.type]
  const rarity = project.rarity || "rare"
  const power = project.power || Math.floor(Math.random() * 50) + 50

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -15,
        scale: animeMode ? 1.05 : 1.02,
        rotateY: animeMode ? 5 : 0,
        transition: { duration: 0.3 },
      }}
      className="group perspective-1000"
    >
      <Card
        className={`overflow-hidden bg-card/60 backdrop-blur-sm border-2 transition-all duration-500 h-full transform-gpu ${rarityColors[rarity]} hover:shadow-2xl hover:shadow-primary/20`}
      >
        {/* Power Level Badge */}
        <div className="absolute top-2 left-2 z-20">
          <Badge className="bg-primary/90 text-white font-bold px-2 py-1">
            <Zap className="w-3 h-3 mr-1" />
            {power}
          </Badge>
        </div>

        {/* Rarity Badge */}
        <div className="absolute top-2 right-2 z-20">
          <Badge variant="outline" className={`${rarityColors[rarity]} border-2 font-bold uppercase text-xs`}>
            {rarity}
          </Badge>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Anime-style overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Holographic effect */}
          {animeMode && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          {/* Action buttons */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button size="sm" className="bg-primary/90 hover:bg-primary backdrop-blur-sm" asChild>
              <Link href={project.link}>
                <TypeIcon className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="sm" variant="secondary" className="bg-accent/90 hover:bg-accent backdrop-blur-sm" asChild>
              <Link href="#">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors font-orbitron">
              {project.title}
            </h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(power / 20) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                />
              ))}
            </div>
          </div>

          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <Badge
                key={techIndex}
                variant="outline"
                className="text-xs bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Battle stats */}
          {animeMode && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 rounded bg-primary/10">
                <div className="font-bold text-primary">ATK</div>
                <div>{Math.floor(power * 0.8)}</div>
              </div>
              <div className="text-center p-2 rounded bg-accent/10">
                <div className="font-bold text-accent">DEF</div>
                <div>{Math.floor(power * 0.6)}</div>
              </div>
              <div className="text-center p-2 rounded bg-primary/10">
                <div className="font-bold text-primary">SPD</div>
                <div>{Math.floor(power * 0.9)}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
