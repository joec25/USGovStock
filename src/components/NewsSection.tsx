"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Newspaper,
  RefreshCw,
  ExternalLink,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  url: string;
  senator: string;
  category: "policy" | "financial" | "general";
}

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSenators, setSelectedSenators] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Simulate fetching news data
  const fetchNews = () => {
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const mockArticles: NewsArticle[] = [
        {
          id: "1",
          title: "Senator Warren Proposes New Financial Regulation Bill",
          description:
            "Senator Elizabeth Warren introduced a new bill aimed at increasing oversight of major financial institutions.",
          source: "Financial Times",
          date: "2024-06-15",
          url: "#",
          senator: "Elizabeth Warren",
          category: "policy",
        },
        {
          id: "2",
          title: "Senator Sanders Calls for Medicare Expansion",
          description:
            "In a recent town hall, Senator Bernie Sanders emphasized the need to expand Medicare coverage to all Americans.",
          source: "Healthcare Daily",
          date: "2024-06-14",
          url: "#",
          senator: "Bernie Sanders",
          category: "policy",
        },
        {
          id: "3",
          title: "Senator Cruz Discusses Energy Policy at Industry Conference",
          description:
            "Senator Ted Cruz outlined his vision for American energy independence during his keynote speech at the annual Energy Summit.",
          source: "Energy Report",
          date: "2024-06-12",
          url: "#",
          senator: "Ted Cruz",
          category: "policy",
        },
        {
          id: "4",
          title:
            "Senator Schumer Announces Infrastructure Funding for New York",
          description:
            "Senate Majority Leader Chuck Schumer revealed a new $500 million infrastructure package for New York State.",
          source: "NY Times",
          date: "2024-06-10",
          url: "#",
          senator: "Chuck Schumer",
          category: "financial",
        },
        {
          id: "5",
          title: "Senator McConnell's Stock Portfolio Shows Significant Growth",
          description:
            "Recent financial disclosures show Senator Mitch McConnell's investment portfolio has grown by 12% over the past year.",
          source: "Market Watch",
          date: "2024-06-08",
          url: "#",
          senator: "Mitch McConnell",
          category: "financial",
        },
        {
          id: "6",
          title: "Senator Rubio Advocates for Small Business Tax Cuts",
          description:
            "In a series of public appearances, Senator Marco Rubio has been pushing for new tax incentives for small businesses.",
          source: "Business Insider",
          date: "2024-06-05",
          url: "#",
          senator: "Marco Rubio",
          category: "financial",
        },
        {
          id: "7",
          title: "Senator Klobuchar Completes Book Tour for New Memoir",
          description:
            "Senator Amy Klobuchar wrapped up her nationwide book tour promoting her new memoir 'The Path Forward'.",
          source: "Literary Review",
          date: "2024-06-03",
          url: "#",
          senator: "Amy Klobuchar",
          category: "general",
        },
        {
          id: "8",
          title: "Senator Romney Announces He Won't Seek Re-election",
          description:
            "In a surprise announcement, Senator Mitt Romney stated he will not run for re-election when his term ends.",
          source: "Political Daily",
          date: "2024-06-01",
          url: "#",
          senator: "Mitt Romney",
          category: "general",
        },
      ];

      setArticles(mockArticles);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Get unique senators from articles
  const senators = [
    ...new Set(articles.map((article) => article.senator)),
  ].sort();

  // Filter articles based on all criteria
  const filteredArticles = articles.filter((article) => {
    // Filter by category tab
    if (activeTab !== "all" && article.category !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !(
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.senator.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    // Filter by selected senators
    if (
      selectedSenators.length > 0 &&
      !selectedSenators.includes(article.senator)
    )
      return false;

    // Filter by date range
    if (dateRange !== "all") {
      const articleDate = new Date(article.date);
      const today = new Date();

      if (
        dateRange === "week" &&
        today.getTime() - articleDate.getTime() > 7 * 24 * 60 * 60 * 1000
      )
        return false;
      if (
        dateRange === "month" &&
        today.getTime() - articleDate.getTime() > 30 * 24 * 60 * 60 * 1000
      )
        return false;
      if (
        dateRange === "quarter" &&
        today.getTime() - articleDate.getTime() > 90 * 24 * 60 * 60 * 1000
      )
        return false;
    }

    return true;
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "senator") {
      return a.senator.localeCompare(b.senator);
    } else {
      return 0;
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Senator News</h2>
            <p className="text-muted-foreground">
              Latest news and updates about US Senators
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNews}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news articles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="senator">By Senator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showFilters && (
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Filter by Senator</h3>
                  </div>
                  <ScrollArea className="h-[150px] border rounded-md p-2">
                    <div className="space-y-2">
                      {senators.map((senator) => (
                        <div
                          key={senator}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`senator-${senator}`}
                            checked={selectedSenators.includes(senator)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSenators([
                                  ...selectedSenators,
                                  senator,
                                ]);
                              } else {
                                setSelectedSenators(
                                  selectedSenators.filter((s) => s !== senator),
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`senator-${senator}`}>
                            {senator}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  {selectedSenators.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {selectedSenators.map((senator) => (
                        <Badge
                          key={senator}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {senator}
                          <button
                            onClick={() =>
                              setSelectedSenators(
                                selectedSenators.filter((s) => s !== senator),
                              )
                            }
                            className="ml-1 h-3 w-3 rounded-full hover:bg-muted"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => setSelectedSenators([])}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">Date Range</h3>
                  </div>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Past Week</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                      <SelectItem value="quarter">Past 3 Months</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">Categories</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={activeTab === "all" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setActiveTab("all")}
                      >
                        All
                      </Badge>
                      <Badge
                        variant={activeTab === "policy" ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setActiveTab("policy")}
                      >
                        Policy
                      </Badge>
                      <Badge
                        variant={
                          activeTab === "financial" ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => setActiveTab("financial")}
                      >
                        Financial
                      </Badge>
                      <Badge
                        variant={
                          activeTab === "general" ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => setActiveTab("general")}
                      >
                        General
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading news articles...</p>
            </div>
          ) : (
            <ScrollArea className="h-[600px] pr-4">
              {sortedArticles.length > 0 ? (
                <div className="grid gap-4">
                  {sortedArticles.map((article) => (
                    <Card key={article.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {article.title}
                            </CardTitle>
                            <CardDescription className="flex items-center flex-wrap gap-1">
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />{" "}
                                {article.senator}
                              </span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />{" "}
                                {article.date}
                              </span>
                              <span>•</span>
                              <span>{article.source}</span>
                              <Badge
                                variant="outline"
                                className={`ml-2 ${article.category === "policy" ? "bg-blue-100" : article.category === "financial" ? "bg-green-100" : "bg-gray-100"}`}
                              >
                                {article.category}
                              </Badge>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{article.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-auto flex items-center gap-2"
                          asChild
                        >
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Read Full Article
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] border rounded-lg p-6">
                  <Newspaper className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No news found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    No articles match your current filters. Try adjusting your
                    search criteria.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSenators([]);
                      setDateRange("all");
                      setActiveTab("all");
                      setSortBy("newest");
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
