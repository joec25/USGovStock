"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  compact?: boolean;
}

const popularStocks = [
  { ticker: "AAPL", name: "Apple Inc." },
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "GOOGL", name: "Alphabet Inc." },
  { ticker: "AMZN", name: "Amazon.com Inc." },
  { ticker: "META", name: "Meta Platforms Inc." },
  { ticker: "TSLA", name: "Tesla, Inc." },
  { ticker: "NVDA", name: "NVIDIA Corporation" },
  { ticker: "JPM", name: "JPMorgan Chase & Co." },
  { ticker: "V", name: "Visa Inc." },
  { ticker: "WMT", name: "Walmart Inc." },
];

export default function SearchBar({
  className = "",
  placeholder = "Search stocks...",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (ticker: string) => {
    if (ticker.trim()) {
      router.push(`/stock/${ticker.trim().toUpperCase()}`);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <form onSubmit={handleSubmit}>
              <Input
                ref={inputRef}
                type="search"
                placeholder={placeholder}
                className={`${compact ? "w-[200px]" : "w-full"} pl-9`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsOpen(e.target.value.length > 0);
                }}
                onFocus={() => setIsOpen(searchQuery.length > 0)}
              />
            </form>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <div className="p-4">
            {searchQuery.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Search Results</h4>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleSearch(searchQuery)}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search for "{searchQuery.toUpperCase()}"
                </Button>
              </div>
            ) : null}
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Popular Stocks</h4>
              <div className="space-y-1">
                {popularStocks.map((stock) => (
                  <Button
                    key={stock.ticker}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleSearch(stock.ticker)}
                  >
                    <span className="font-medium mr-2">{stock.ticker}</span>
                    <span className="text-muted-foreground text-sm">
                      {stock.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
