"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label: string;
}

export function DatePicker({ date, setDate, label }: DatePickerProps) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DateRangePickerProps {
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export default function DateRangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: DateRangePickerProps) {
  return (
    <>
      <DatePicker date={startDate} setDate={setStartDate} label="Start Date" />
      <DatePicker date={endDate} setDate={setEndDate} label="End Date" />
    </>
  );
}
