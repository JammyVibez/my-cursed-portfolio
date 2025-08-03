"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, Mail, Eye, Settings, User, Briefcase, Zap, Crown } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

// Mock data - replace with real Supabase data
const mockProjects = [
  {
    id: 1,
    title: "Anime Streaming Platform",
    description: "Full-stack streaming platform with real-time chat and AI recommendations",
    tech: ["Next.js", "Supabase", "WebRTC"],
    type: "web",
    image: "/placeholder.svg?height=200&width=300&text=Streaming+Platform",
    link: "#",
    power: 95,
    rarity: "legendary",
  },
  {
    id: 2,
    title: "Domain Expansion: Code Realm",
    description: "3D visualization tool for code complexity analysis",
    tech: ["Three.js", "React", "WebGL"],
    type: "3d",
    image: "/placeholder.svg?height=200&width=300&text=3D+Code+Realm",
    link: "#",
    power: 88,
    rarity: "epic",
  },
]

const mockMessages = [
  {
    id: 1,
    name: "Yuji Itadori",
    email: "yuji@jujutsu-tech.com",
    subject: "Collaboration Request - Cursed Energy Project",
    message:
      "Your cursed techniques are incredible! I'd love to team up and build something amazing together. Maybe we can create a platform for sorcerers?",
    date: "2024-01-15",
    status: "unread",
  },
  {
    id: 2,
    name: "Megumi Fushiguro",
    email: "megumi@shadow-technique.com",
    subject: "Domain Expansion Inquiry",
    message:
      "I'm interested in learning your infinite void technique for debugging. Could you mentor me in the ways of cursed energy development?",
    date: "2024-01-14",
    status: "read",
  },
  {
    id: 3,
    name: "Nobara Kugisaki",
    email: "nobara@straw-doll.dev",
    subject: "Frontend Collaboration",
    message:
      "Your UI designs are as sharp as my nails! Want to collaborate on a project that combines cursed techniques with modern web development?",
    date: "2024-01-13",
    status: "unread",
  },
]

const adminStats = {
  totalProjects: 12,
  totalMessages: 47,
  domainExpansions: 156,
  cursedEnergyLevel: 9001,
  activeVisitors: 23,
  githubStars: 89,
}

// Admin passwords (in real app, use proper authentication)
const ADMIN_PASSWORDS = ["domainexpansion", "malevolentshrine", "infinitevoid", "sixeyes", "cursedtechnique"]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [projects, setProjects] = useState(mockProjects)
  const [messages, setMessages] = useState(mockMessages)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
    type: "web",
    image: "",
    link: "",
    power: 50,
    rarity: "common",
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (ADMIN_PASSWORDS.includes(password.toLowerCase())) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
    } else {
      alert(
        "Your cursed technique is too weak! Try: domainexpansion, malevolentshrine, infinitevoid, sixeyes, or cursedtechnique",
      )
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAddProject = () => {
    const project = {
      id: Date.now(),
      ...newProject,
      tech: newProject.tech.split(",").map((t) => t.trim()),
      power: Number.parseInt(newProject.power.toString()) || 50,
    }
    setProjects([...projects, project])
    setNewProject({
      title: "",
      description: "",
      tech: "",
      type: "web",
      image: "",
      link: "",
      power: 50,
      rarity: "common",
    })
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const markMessageAsRead = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg)))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-2 border-primary/40 shadow-2xl shadow-primary/20">
            <CardHeader className="text-center pb-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
              >
                <Crown className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
                Admin Domain
              </CardTitle>
              <p className="text-muted-foreground mt-2">Only the strongest sorcerers may enter</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary">Cursed Technique Password</label>
                  <Input
                    type="password"
                    placeholder="Try: domainexpansion, malevolentshrine, infinitevoid..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary transition-all duration-300"
                  />
                  <p className="text-xs text-muted-foreground">Hint: Use any JJK domain expansion or technique name</p>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 py-3 font-bold text-lg"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Activate Domain
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50">
              <Image
                src="/placeholder.svg?height=64&width=64&text=Hamza+Admin"
                alt="Admin Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-orbitron">
                Sorcerer's Control Panel
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Welcome back, Hamza! Manage your cursed energy portfolio
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false)
              localStorage.removeItem("adminAuth")
            }}
            className="border-primary/30 hover:border-primary/50 bg-transparent backdrop-blur-sm px-6 py-3"
          >
            <Crown className="w-4 h-4 mr-2" />
            Exit Domain
          </Button>
        </motion.div>

        {/* Admin Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {Object.entries(adminStats).map(([key, value], index) => (
            <Card key={key} className="p-4 bg-card/60 backdrop-blur-sm border-primary/30">
              <CardContent className="p-0 text-center">
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/60 backdrop-blur-sm border border-primary/20">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Battle Cards
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              Summons ({messages.filter((m) => m.status === "unread").length})
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium"
            >
              <User className="w-4 h-4 mr-2" />
              Character
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary font-medium"
            >
              <Settings className="w-4 h-4 mr-2" />
              Domain
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-card/60 backdrop-blur-sm border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary font-orbitron">
                    <Plus className="w-5 h-5" />
                    Forge New Battle Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <select
                      value={newProject.type}
                      onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                      className="px-3 py-2 bg-background/50 border border-primary/30 rounded-md text-foreground focus:border-primary"
                    >
                      <option value="web">Web Technique</option>
                      <option value="3d">3D Domain</option>
                      <option value="dashboard">Data Shrine</option>
                      <option value="mobile">Mobile Curse</option>
                    </select>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Project Link"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <Input
                      placeholder="Image URL"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <select
                      value={newProject.rarity}
                      onChange={(e) => setNewProject({ ...newProject, rarity: e.target.value })}
                      className="px-3 py-2 bg-background/50 border border-primary/30 rounded-md text-foreground focus:border-primary"
                    >
                      <option value="common">Common</option>
                      <option value="rare">Rare</option>
                      <option value="epic">Epic</option>
                      <option value="legendary">Legendary</option>
                    </select>
                  </div>
                  <Textarea
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Technologies (comma separated)"
                      value={newProject.tech}
                      onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        Power Level: {newProject.power}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={newProject.power}
                        onChange={(e) => setNewProject({ ...newProject, power: Number.parseInt(e.target.value) })}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddProject} className="w-full bg-primary hover:bg-primary/90 py-3 font-bold">
                    <Save className="w-4 h-4 mr-2" />
                    Manifest Battle Card
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid gap-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-primary font-orbitron">{project.title}</h3>
                            <Badge variant="outline" className="text-xs border-accent/50 text-accent uppercase">
                              {project.rarity}
                            </Badge>
                            <Badge className="bg-primary/20 text-primary font-bold">
                              <Zap className="w-3 h-3 mr-1" />
                              {project.power}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech: string, techIndex: number) => (
                              <Badge
                                key={techIndex}
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/30"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary/30 hover:border-primary/50 bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-accent/30 hover:border-accent/50 bg-transparent"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteProject(project.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary font-orbitron">
                  <Mail className="w-5 h-5" />
                  Incoming Summons ({messages.filter((m) => m.status === "unread").length} unread)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`p-4 border transition-colors cursor-pointer ${
                          message.status === "unread"
                            ? "bg-primary/5 border-primary/40 hover:border-primary/60"
                            : "bg-background/30 border-primary/20 hover:border-primary/40"
                        }`}
                        onClick={() => markMessageAsRead(message.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                              <span className="text-sm font-bold">
                                {message.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary flex items-center gap-2">
                                {message.name}
                                {message.status === "unread" && (
                                  <Badge className="bg-accent/20 text-accent text-xs">NEW</Badge>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground">{message.email}</p>
                              <p className="text-sm font-medium text-accent mt-1">{message.subject}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                            {message.date}
                          </span>
                        </div>
                        <p className="text-sm text-foreground bg-primary/5 p-3 rounded border-l-4 border-primary/30">
                          {message.message}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary font-orbitron">Character Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50">
                    <Image
                      src="/placeholder.svg?height=80&width=80&text=Hamza"
                      alt="Profile Avatar"
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Hamza - Cursed Energy Developer</h3>
                    <p className="text-muted-foreground">Level 99 Full Stack Sorcerer</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Sorcerer Name</label>
                  <Input
                    defaultValue="Hamza - The Six Eyes Developer"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Character Bio</label>
                  <Textarea
                    defaultValue="I'm a passionate developer who codes with cursed energy, wielding the Six Eyes of programming to see through any codebase. From marketing sorcerer to full-stack developer, my journey has been one of constant evolution and limitless possibilities."
                    rows={4}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Avatar URL</label>
                  <Input
                    placeholder="https://your-avatar-url.com/image.jpg"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Cursed Technique Specialty</label>
                  <Input
                    defaultValue="Domain Expansion: Infinite Code - Can debug any application within a 200-meter radius"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Contact Information</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Email"
                      defaultValue="hamza.dev@cursed-energy.com"
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                    <Input
                      placeholder="GitHub Username"
                      defaultValue="hamza-cursed-dev"
                      className="bg-background/50 border-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Update Character Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-primary font-orbitron">Domain Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Domain Name</label>
                  <Input
                    defaultValue="Hamza's Cursed Energy Portfolio"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Startup/Company Name</label>
                  <Input
                    placeholder="Your Anime-Tech Company"
                    defaultValue="Infinite Void Technologies"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Company Mission</label>
                  <Textarea
                    defaultValue="Building a creative tech company that bridges anime culture with cutting-edge technology. Our mission is to create limitless digital experiences that inspire and connect people worldwide through the power of cursed energy development."
                    rows={4}
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Default Theme</label>
                  <select className="w-full px-3 py-2 bg-background/50 border border-primary/30 rounded-md text-foreground focus:border-primary">
                    <option value="gojo">Gojo (Limitless Blue)</option>
                    <option value="sukuna">Sukuna (Malevolent Red)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Admin Passwords</label>
                  <div className="text-xs text-muted-foreground mb-2">
                    Current valid passwords: {ADMIN_PASSWORDS.join(", ")}
                  </div>
                  <Input
                    placeholder="Add new admin password"
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Domain Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
