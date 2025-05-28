"use client";

import React from "react";
import NewsSection from "@/components/NewsSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
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
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Senator News</h1>
        </div>

        <NewsSection />
      </main>
    </div>
  );
}
