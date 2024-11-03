// components/ui/DropdownSelect.tsx
"use client";

import React from "react";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./select";

interface DropdownSelectProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function DropdownSelect({ label, options, selectedValue, onSelect }: DropdownSelectProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-semibold mb-2">{label}</label>
      <Select onValueChange={onSelect} value={selectedValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
