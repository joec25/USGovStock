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
import { Newspaper, RefreshCw, ExternalLink } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

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

  const filteredArticles =
    activeTab === "all"
      ? articles
      : articles.filter((article) => article.category === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Senator News</h2>
          <p className="text-muted-foreground">
            Latest news and updates about US Senators
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchNews}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
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
              {filteredArticles.length > 0 ? (
                <div className="grid gap-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {article.title}
                            </CardTitle>
                            <CardDescription>
                              Senator: {article.senator} • {article.date} •{" "}
                              {article.source}
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
                    There are no news articles in this category at the moment.
                  </p>
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
