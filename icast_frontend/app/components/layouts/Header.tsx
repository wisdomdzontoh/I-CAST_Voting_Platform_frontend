'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-95 shadow-md backdrop-blur-lg transition-all duration-300 ease-in-out`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.png?height=40&width=40"
              alt="I-CAST Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>I-CAST ONLINE VOTING</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out`}
                aria-expanded={isDropdownOpen}
              >
                Start Voting
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg py-1 z-10`}>
                  <Link href="/voting/current" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-blue-100'}`}>
                    Current Elections
                  </Link>
                  <Link href="/voting/upcoming" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-blue-100'}`}>
                    Upcoming Elections
                  </Link>
                  <Link href="/voting/past" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-blue-100'}`}>
                    Past Elections
                  </Link>
                </div>
              )}
            </div>
            <Link href="/results" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}>
              Results
            </Link>
            <Link href="/about" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}>
              About
            </Link>
            <Link href="/faq" className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'} px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}>
              FAQ
            </Link>
            <Link
              href="/login"
              className={`text-white ${isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out shadow-md`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`${isDarkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-800' : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'} bg-transparent border px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
            >
              Register
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'} transition-colors duration-200`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </nav>
          <button
            onClick={toggleMenu}
            type="button"
            className={`md:hidden inline-flex items-center justify-center p-2 rounded-md ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150 ease-in-out`}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        id="mobile-menu"
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <button
            onClick={toggleDropdown}
            className={`${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 rounded-md text-base font-medium w-full text-left transition duration-150 ease-in-out`}
          >
            Start Voting
          </button>
          {isDropdownOpen && (
            <div className="pl-4">
              <Link
                href="/voting/current"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} block px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out`}
              >
                Current Elections
              </Link>
              <Link
                href="/voting/upcoming"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} block px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out`}
              >
                Upcoming Elections
              </Link>
              <Link
                href="/voting/past"
                className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-blue-600'} block px-3 py-2 rounded-md text-sm transition duration-150 ease-in-out`}
              >
                Past Elections
              </Link>
            </div>
          )}
          <Link
            href="/results"
            className={`${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out`}
          >
            Results
          </Link>
          <Link
            href="/about"
            className={`${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out`}
          >
            About
          </Link>
          <Link
            href="/faq"
            className={`${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600'} block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out`}
          >
            FAQ
          </Link>
          <Link
            href="/login"
            className={`text-white ${isDarkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} block px-4 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out shadow-md`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`${isDarkMode ? 'text-blue-400 border-blue-400 hover:bg-blue-800' : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'} bg-transparent border block px-4 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out`}
          >
            Register
          </Link>
          <button
            onClick={toggleTheme}
            className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${isDarkMode ? 
              'text-yellow-400 hover:bg-gray-700' :
              'text-gray-700 hover:text-blue-600'
            } transition duration-150 ease-in-out`}
          >
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  )
}