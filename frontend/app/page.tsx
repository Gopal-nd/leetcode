"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Users, Trophy, Play, ChevronRight, Star, ArrowRight } from "lucide-react"

import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle"
import InteractiveGrid from "@/components/BackgrundGrid"

export default function LandingPage() {
  const [stats, setStats] = useState({
    users: 50000,
    problems: 1200,
    submissions: 2500000,
  })

  // Simulate real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: prev.users + Math.floor(Math.random() * 3),
        problems: prev.problems,
        submissions: prev.submissions + Math.floor(Math.random() * 10),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const languages = [
    { name: "JavaScript", color: "bg-yellow-500" },
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Python", color: "bg-green-500" },
    { name: "Java", color: "bg-orange-500" },
    { name: "C#", color: "bg-purple-500" },
    { name: "PHP", color: "bg-indigo-500" },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <InteractiveGrid />
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">LeetLab</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Problems
            </Link>
            <Link href="/editor" className="text-sm font-medium hover:text-primary transition-colors">
              Editor
            </Link>
            <Link href="/dashboard/collab" className="text-sm font-medium hover:text-primary transition-colors">
              Collaborate
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 animate-pulse">
              <Star className="h-4 w-4 mr-1" />
              {stats.users.toLocaleString()}+ developers online
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Master Coding Interviews
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Practice with LeetCode-style problems, code in real-time with others, and ace your technical interviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/editor">
                <Button size="lg" className="text-lg px-8 group">
                  <Play className="h-5 w-5 mr-2" />
                  Start Coding
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/dashboard/collab">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent group">
                  <Users className="h-5 w-5 mr-2" />
                  Collaborate Live
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Language Support */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {languages.map((lang, index) => (
                <Badge
                  key={lang.name}
                  variant="secondary"
                  className="px-3 py-1 hover:scale-105 transition-transform cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-2 h-2 rounded-full ${lang.color} mr-2`} />
                  {lang.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground">Simple, powerful tools for interview success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Code2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Online Editor</h3>
                <p className="text-muted-foreground mb-4">
                  Code in 6+ languages with syntax highlighting and instant execution
                </p>
                <Link href="/editor">
                  <Button variant="outline" size="sm">
                    Try Editor <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Collaboration</h3>
                <p className="text-muted-foreground mb-4">
                  Code together in real-time with voice chat and shared cursors
                </p>
                <Link href="/dashboard/collab">
                  <Button variant="outline" size="sm">
                    Start Session <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">LeetCode Problems</h3>
                <p className="text-muted-foreground mb-4">1200+ curated problems from easy to hard difficulty</p>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Browse Problems <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary animate-pulse">{stats.users.toLocaleString()}+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{stats.problems.toLocaleString()}+</div>
              <div className="text-muted-foreground">Problems Solved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary animate-pulse">{stats.submissions.toLocaleString()}+</div>
              <div className="text-muted-foreground">Code Submissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers preparing for their dream jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/editor">
                <Button size="lg" className="text-lg px-8">
                  Start Coding Free
                </Button>
              </Link>
              <Link href="/collab">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Try Collaboration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
