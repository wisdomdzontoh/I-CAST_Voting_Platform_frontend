'use client'

import { useState } from 'react'
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
  User,
  Settings,
  Bell,
  BarChart2,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  List,
  Sun,
  Moon
} from 'lucide-react'

const sidebarLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/organization", icon: Users, label: "Organizations" },
  { href: "/dashboard/contact-persons", icon: User, label: "Contact Persons" },
  { href: "/dashboard/subscriptions", icon: ClipboardCheck, label: "Subscriptions" },
  { href: "/dashboard/voting-sessions", icon: List, label: "Voting Sessions" },
  { href: "/dashboard/positions", icon: List, label: "Positions" },
  { href: "/dashboard/candidates", icon: FileText, label: "Candidates" },
  { href: "/dashboard/voters", icon: Users, label: "Voters" },
  { href: "/dashboard/reports", icon: BarChart2, label: "Reports" },
  { href: "/dashboard/activity-log", icon: MessageSquare, label: "Activity Log" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
  { href: "/dashboard/feedbacks", icon: HelpCircle, label: "Feedbacks" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={cn(
      "flex flex-col h-screen border-r transition-all duration-300",
      isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900",
      isOpen ? "w-64" : "w-[70px]"
    )}>
      <div className="p-4 flex justify-between items-center border-b">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-6 w-6" />
        </Button>
        {isOpen && <h2 className="text-2xl font-semibold">I-CAST</h2>}
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 mt-2">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => (
            <TooltipProvider key={link.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-md transition-colors",
                      pathname === link.href
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-secondary hover:text-secondary-foreground text-muted-foreground",
                      !isOpen && "justify-center"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {isOpen && <span>{link.label}</span>}
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
      <div className="p-4 border-t text-center">
        <Button variant="ghost" onClick={toggleTheme} className="w-full">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
