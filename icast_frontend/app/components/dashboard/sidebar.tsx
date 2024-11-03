'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import {
  Menu,
  Home,
  Users,
  ClipboardCheck,
  FileText,
  Settings,
  Bell,
  BarChart2,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  List,
  Sun,
  Moon,
  Building,
  Vote,
  UserCheck,
  Award,
  Inbox,
  AlertTriangle,
  FileBarChart,
  Activity
} from 'lucide-react'

const sidebarLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/organization", icon: Building, label: "Organizations" },
  { href: "/dashboard/subscription-plans", icon: ClipboardCheck, label: "Subscription Plans" },
  { href: "/dashboard/voting-sessions", icon: Vote, label: "Voting Sessions" },
  { href: "/dashboard/positions", icon: Award, label: "Positions" },
  { href: "/dashboard/candidates", icon: UserCheck, label: "Candidates" },
  { href: "/dashboard/voters", icon: Users, label: "Voters" },
  { href: "/dashboard/ballots", icon: FileText, label: "Ballots" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  { href: "/dashboard/feedback", icon: MessageSquare, label: "Feedback" },
  { href: "/dashboard/reports", icon: FileBarChart, label: "Reports" },
  { href: "/dashboard/audit-logs", icon: Activity, label: "Audit Logs" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setIsDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark', newDarkMode)
  }

  return (
    <div className={cn(
      "flex flex-col h-screen border-r transition-all duration-300",
      "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
      isOpen ? "w-64" : "w-[70px]"
    )}>
      <div className="p-4 flex justify-between items-center border-b">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </Button>
        {isOpen && <h2 className="text-2xl font-semibold">I-CAST</h2>}
      </div>
      <ScrollArea className="flex-1 mt-2">
        <nav className="space-y-1 px-2">
          {sidebarLinks.map((link) => (
            <TooltipProvider key={link.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      pathname === link.href
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-secondary hover:text-secondary-foreground text-muted-foreground",
                      !isOpen && "justify-center"
                    )}
                  >
                    <link.icon className="h-5 w-5 flex-shrink-0" />
                    {isOpen && <span className="text-sm">{link.label}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("bg-popover text-popover-foreground", isOpen && "hidden")}>
                  {link.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-full justify-start">
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              {isOpen && "Light Mode"}
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              {isOpen && "Dark Mode"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar