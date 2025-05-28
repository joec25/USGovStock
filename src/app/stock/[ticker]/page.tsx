"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import StockDetail from "@/components/StockDetail";

export default function StockPage() {
  const params = useParams();
  const router = useRouter();
  const ticker = params.ticker as string;

  // All features are now free
  const isPremium = true;

  // In a real app, you would fetch the stock data based on the ticker
  // For now, we'll use sample data
  const stockData = {
    ticker: ticker.toUpperCase(),
    companyName: getCompanyName(ticker),
    politician: "Nancy Pelosi",
    transactionDate: "2024-05-15",
    transactionType: "buy",
    amount: "$50,000 - $100,000",
    performanceSinceTransaction: 8.7,
    historicalData: [
      { date: "2024-05-15", price: 150 },
      { date: "2024-05-22", price: 155 },
      { date: "2024-05-29", price: 160 },
      { date: "2024-06-05", price: 158 },
      { date: "2024-06-12", price: 165 },
      { date: "2024-06-19", price: 170 },
    ],
    isPremium: isPremium, // Set based on user's premium status
  };

  const handleBack = () => {
    router.back();
  };

  return <StockDetail {...stockData} onBack={handleBack} />;
}

// Helper function to get company name from ticker
function getCompanyName(ticker: string): string {
  const companies: Record<string, string> = {
    AAPL: "Apple Inc.",
    MSFT: "Microsoft Corporation",
    GOOGL: "Alphabet Inc.",
    AMZN: "Amazon.com Inc.",
    META: "Meta Platforms Inc.",
    TSLA: "Tesla, Inc.",
    NVDA: "NVIDIA Corporation",
    NFLX: "Netflix, Inc.",
    DIS: "The Walt Disney Company",
  };

  return companies[ticker.toUpperCase()] || `${ticker.toUpperCase()} Corp.`;
}
