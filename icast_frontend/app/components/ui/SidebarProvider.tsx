// SidebarProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the sidebar context
interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Initialize the context with a default value of `null`
const SidebarContext = createContext<SidebarContextProps | null>(null);

// Custom hook to use the Sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// SidebarProvider component to wrap around components that need access to the sidebar state
interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/closed state
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
