"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Play, Eye } from "lucide-react"
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
}

interface ProjectCardProps {
  project: Project
  index: number
}

const typeIcons = {
  web: ExternalLink,
  "3d": Eye,
  dashboard: Play,
  mobile: ExternalLink,
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const TypeIcon = typeIcons[project.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group"
    >
      <Card className="overflow-hidden bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 h-full">
        <div className="relative overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={400}
            height={300}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
              {project.type.toUpperCase()}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-primary/20 hover:bg-primary/30 backdrop-blur-sm"
              asChild
            >
              <Link href={project.link}>
                <TypeIcon className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="sm" variant="secondary" className="bg-accent/20 hover:bg-accent/30 backdrop-blur-sm" asChild>
              <Link href="#">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors font-orbitron">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
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
        </CardContent>
      </Card>
    </motion.div>
  )
}
