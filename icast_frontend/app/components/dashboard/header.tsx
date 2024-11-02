'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, Search, User, Sun, Moon } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            E-CAST Dashboard
          </Link>
          <nav className="hidden md:flex space-x-6">
            {['Organizations', 'Voting Sessions', 'Reports'].map((item, idx) => (
              <Link
                key={idx}
                href={`/dashboard/${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar, Notifications, and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden md:block w-full md:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </form>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-semibold text-gray-800 dark:text-gray-200">
                user@example.com
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Search className="mr-2 h-4 w-4" />
                <span>Search</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
