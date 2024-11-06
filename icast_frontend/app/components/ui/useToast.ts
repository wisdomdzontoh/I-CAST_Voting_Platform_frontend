"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as BaseToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";

type ToastData = {
  id: number;
  title?: string;
  description?: string;
  action?: React.ReactNode;
};

interface ToastContextType {
  showToast: (title: string, description?: string, action?: React.ReactNode) => void;
  toasts: ToastData[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [nextId, setNextId] = useState(0);

  const showToast = (title: string, description?: string, action?: React.ReactNode) => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    setToasts((prev) => [...prev, { id, title, description, action }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      <BaseToastProvider>{children}</BaseToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
