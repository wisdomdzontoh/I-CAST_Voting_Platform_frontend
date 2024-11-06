"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "../../components/ui/button"
import { Calendar } from "../ui/calender"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { Input } from "../ui/input"

interface DateTimePickerProps {
  date: Date
  setDate: (date: Date) => void
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date>(date)

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const newDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        selectedDateTime.getHours(),
        selectedDateTime.getMinutes()
      )
      setSelectedDateTime(newDateTime)
      setDate(newDateTime)
    }
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(':').map(Number)
    const newDateTime = new Date(selectedDateTime)
    newDateTime.setHours(hours)
    newDateTime.setMinutes(minutes)
    setSelectedDateTime(newDateTime)
    setDate(newDateTime)
  }

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDateTime ? format(selectedDateTime, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDateTime}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={format(selectedDateTime, "HH:mm")}
        onChange={handleTimeChange}
        className="w-[120px]"
      />
    </div>
  )
}