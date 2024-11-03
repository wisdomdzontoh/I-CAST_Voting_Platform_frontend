// components/DashboardChart.tsx
"use client";

import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "../ui/select";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const barDataTemplate = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Votes",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "#60A5FA",
    },
  ],
};

const lineDataTemplate = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sessions",
      data: [33, 53, 85, 41, 44, 65],
      borderColor: "#34D399",
      fill: false,
    },
  ],
};

export function DashboardChart() {
  // Dropdown filter states
  const [barFilter, setBarFilter] = useState("2023");
  const [lineFilter, setLineFilter] = useState("2023");

  // Mock function to update data based on filter selection
  const getFilteredData = (filter: string, type: "bar" | "line") => {
    if (type === "bar") {
      // Custom logic for bar data based on filter
      return { ...barDataTemplate };
    } else {
      // Custom logic for line data based on filter
      return { ...lineDataTemplate };
    }
  };

  // Retrieve the data according to the filter
  const barData = getFilteredData(barFilter, "bar");
  const lineData = getFilteredData(lineFilter, "line");

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
      <div className="flex flex-col w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Votes Bar Chart</h2>
        <Select onValueChange={setBarFilter} value={barFilter}>
          <SelectTrigger className="mb-4 w-48">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
        <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
      <div className="flex flex-col w-full lg:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Sessions Line Graph</h2>
        <Select onValueChange={setLineFilter} value={lineFilter}>
          <SelectTrigger className="mb-4 w-48">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2021">2021</SelectItem>
          </SelectContent>
        </Select>
        <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}
