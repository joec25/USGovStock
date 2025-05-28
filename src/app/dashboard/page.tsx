"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TradesTable from "@/components/TradesTable";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { RefreshCw, LogOut, Bell, Settings, Newspaper } from "lucide-react";
import Link from "next/link";
import PopularStocksChart from "@/components/PopularStocksChart";

export default function Dashboard() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [trades, setTrades] = useState([]);

  // Function to simulate fetching trades data
  const fetchTrades = () => {
    setIsRefreshing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Sample data - in a real app, this would be an API call
      const sampleTrades = [
        {
          id: "1",
          politician: "Nancy Pelosi",
          ticker: "AAPL",
          companyName: "Apple Inc.",
          transactionDate: "2024-06-15",
          transactionType: "buy",
          amount: "$100,000 - $250,000",
          performance: 12.5,
        },
        {
          id: "2",
          politician: "Mitch McConnell",
          ticker: "MSFT",
          companyName: "Microsoft Corporation",
          transactionDate: "2024-06-10",
          transactionType: "buy",
          amount: "$50,000 - $100,000",
          performance: 8.3,
        },
        {
          id: "3",
          politician: "Elizabeth Warren",
          ticker: "AMZN",
          companyName: "Amazon.com Inc.",
          transactionDate: "2024-06-05",
          transactionType: "sell",
          amount: "$250,000 - $500,000",
          performance: -3.2,
        },
        {
          id: "4",
          politician: "Ted Cruz",
          ticker: "TSLA",
          companyName: "Tesla, Inc.",
          transactionDate: "2024-06-01",
          transactionType: "buy",
          amount: "$15,000 - $50,000",
          performance: 22.7,
        },
        {
          id: "5",
          politician: "Bernie Sanders",
          ticker: "GOOGL",
          companyName: "Alphabet Inc.",
          transactionDate: "2024-05-28",
          transactionType: "sell",
          amount: "$100,000 - $250,000",
          performance: -1.8,
        },
        {
          id: "6",
          politician: "Marco Rubio",
          ticker: "NFLX",
          companyName: "Netflix, Inc.",
          transactionDate: "2024-05-25",
          transactionType: "buy",
          amount: "$50,000 - $100,000",
          performance: 15.4,
        },
        {
          id: "7",
          politician: "Alexandria Ocasio-Cortez",
          ticker: "DIS",
          companyName: "The Walt Disney Company",
          transactionDate: "2024-05-20",
          transactionType: "buy",
          amount: "$15,000 - $50,000",
          performance: 5.2,
        },
      ];

      // Sort trades by date (most recent first)
      const sortedTrades = sampleTrades.sort((a, b) => {
        return (
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
        );
      });

      setTrades(sortedTrades);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto-refresh trades every 30 seconds
  useEffect(() => {
    fetchTrades(); // Initial fetch

    const refreshInterval = setInterval(() => {
      fetchTrades();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchTrades();
  };

  // Handle logout
  const handleLogout = () => {
    router.push("/");
  };

  // Handle trade row click
  const handleTradeClick = (trade) => {
    router.push(`/stock/${trade.ticker}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M18 21H8a2 2 0 0 1-2-2V7h14v12a2 2 0 0 1-2 2z" />
              <path d="M4 15h2M4 10h2M4 5h2" />
              <path d="M9 21V7" />
              <path d="M4 3h16a2 2 0 0 1 2 2v2H2V5a2 2 0 0 1 2-2z" />
            </svg>
            <span className="font-bold">CongressTracker</span>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div className="relative w-64">
              <SearchBar placeholder="Search stocks or politicians..." />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/news">
                <Newspaper className="mr-2 h-4 w-4" />
                Senator News
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border p-4 col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Popular Stocks Among Officials
            </h2>
            <PopularStocksChart />
          </div>
          <div className="bg-card rounded-lg border p-4">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <span>Total Trades (30 days)</span>
                <span className="font-bold">247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <span>Most Active Politician</span>
                <span className="font-bold">Nancy Pelosi</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <span>Most Traded Stock</span>
                <span className="font-bold">AAPL</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                <span>Avg. Transaction Size</span>
                <span className="font-bold">$75,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Trades</h2>
          <TradesTable trades={trades} onRowClick={handleTradeClick} />
        </div>
      </main>
    </div>
  );
}
