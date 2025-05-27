"use client";

import React, { useState, useEffect } from "react";
import LandingHero from "@/components/LandingHero";
import PricingSection from "@/components/PricingSection";
import FreeDemoSection from "@/components/FreeDemoSection";
import TradesTable from "@/components/TradesTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function Home() {
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

  // Auto-refresh trades every 60 seconds
  useEffect(() => {
    fetchTrades(); // Initial fetch

    const refreshInterval = setInterval(() => {
      fetchTrades();
    }, 60000); // Refresh every 60 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  // Handle manual refresh
  const handleRefresh = () => {
    fetchTrades();
  };

  // Handle navigation to login/signup pages
  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToSignup = () => {
    router.push("/signup");
  };

  // Handle trade row click
  const handleTradeClick = (trade) => {
    router.push(`/stock/${trade.ticker}`);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
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
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={navigateToLogin}>
              Log In
            </Button>
            <Button size="sm" onClick={navigateToSignup}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <LandingHero />

      {/* Live Trades Section */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Live Congressional Trades</h2>
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
        <TradesTable trades={trades} onRowClick={handleTradeClick} />
      </section>

      {/* Free Demo Section */}
      <FreeDemoSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col md:flex-row justify-between py-8 px-4 md:px-6">
          <div className="flex flex-col space-y-4 mb-8 md:mb-0">
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
            <p className="text-sm text-muted-foreground max-w-xs">
              Track congressional stock trades and make more informed investment
              decisions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-6">
            <p className="text-sm text-muted-foreground">
              © 2024 CongressTracker. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
