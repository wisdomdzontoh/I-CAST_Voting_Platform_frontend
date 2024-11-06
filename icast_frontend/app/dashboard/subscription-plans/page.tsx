// app/subscription/page.tsx

"use client";

import Header from "@/app/components/dashboard/header";
import Sidebar from "@/app/components/dashboard/sidebar";
import React, { useState } from "react";
import CurrentSubscriptionCard from "@/app/components/subscription-plans/CurrentSubscriptionCard";
import BillingHistoryCard from "@/app/components/subscription-plans/BillingHistoryCard";
import UsageOverviewCard from "@/app/components/subscription-plans/UsageOverviewCard";

const SubscriptionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const currentPlan = {
    name: "Pro Plan",
    status: "Active",
    renewalDate: "2024-11-30",
    features: ["Unlimited Access", "Priority Support", "Custom Integrations"],
    cost: "$19.99/month",
  };

  const billingHistory = [
    { date: "2024-10-30", amount: "$19.99", status: "Paid" },
    { date: "2024-09-30", amount: "$19.99", status: "Paid" },
  ];

  const usage = {
    limit: 1000,
    used: 600,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <h1 className="text-2xl font-bold">Subscription Page</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            <CurrentSubscriptionCard plan={currentPlan} />
            <BillingHistoryCard history={billingHistory} />
            <UsageOverviewCard usage={usage} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SubscriptionPage;
