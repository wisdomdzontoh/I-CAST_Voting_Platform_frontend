"use client"

import React, { useState } from "react"
import Header from '../../components/dashboard/header'
import Sidebar from '../../components/dashboard/sidebar'
import { VotingSessionList } from "../../components/voting-session/voting-session-list"
import { VotingSessionToggle } from "../../components/voting-session/voting-session-toggle"
import { AddVotingSessionButton } from "../../components/voting-session/voting-session-button"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { BarChart, Users, Vote } from "lucide-react"

const VotingSessionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeFilter, setActiveFilter] = useState<"active" | "all" | "expired">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  // Mock data for statistics
  const stats = [
    { title: "Total Sessions", value: 12, icon: BarChart },
    { title: "Active Sessions", value: 3, icon: Vote },
    { title: "Total Participants", value: 1024, icon: Users },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
            <h1 className="text-3xl font-bold">Voting Sessions</h1>
            <AddVotingSessionButton />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
            <VotingSessionToggle activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <div className="w-full md:w-1/3">
              <Input
                type="search"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Voting Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <VotingSessionList filter={activeFilter} searchQuery={searchQuery} />
            </CardContent>
          </Card>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

export default VotingSessionPage