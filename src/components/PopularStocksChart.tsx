"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { BarChart, Activity, PieChart } from "lucide-react";

interface PopularStocksChartProps {
  data?: {
    symbol: string;
    companyName: string;
    transactionCount: number;
    totalValue: number;
  }[];
  onSelectStock?: (symbol: string) => void;
}

const PopularStocksChart = ({
  data = [
    {
      symbol: "AAPL",
      companyName: "Apple Inc.",
      transactionCount: 24,
      totalValue: 1250000,
    },
    {
      symbol: "MSFT",
      companyName: "Microsoft Corporation",
      transactionCount: 18,
      totalValue: 980000,
    },
    {
      symbol: "AMZN",
      companyName: "Amazon.com Inc.",
      transactionCount: 15,
      totalValue: 870000,
    },
    {
      symbol: "GOOGL",
      companyName: "Alphabet Inc.",
      transactionCount: 12,
      totalValue: 750000,
    },
    {
      symbol: "META",
      companyName: "Meta Platforms Inc.",
      transactionCount: 10,
      totalValue: 620000,
    },
    {
      symbol: "NVDA",
      companyName: "NVIDIA Corporation",
      transactionCount: 9,
      totalValue: 580000,
    },
    {
      symbol: "TSLA",
      companyName: "Tesla Inc.",
      transactionCount: 8,
      totalValue: 520000,
    },
  ],
  onSelectStock = () => {},
}: PopularStocksChartProps) => {
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [sortBy, setSortBy] = useState<"count" | "value">("count");

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "count") {
      return b.transactionCount - a.transactionCount;
    } else {
      return b.totalValue - a.totalValue;
    }
  });

  // Calculate max value for scaling the bars
  const maxValue = Math.max(
    ...sortedData.map((item) =>
      sortBy === "count" ? item.transactionCount : item.totalValue,
    ),
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full h-full bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Most Popular Stocks</CardTitle>
            <CardDescription>
              Most frequently traded stocks by government officials
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
            >
              <BarChart className="h-4 w-4 mr-1" />
              Bar
            </Button>
            <Button
              variant={chartType === "pie" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("pie")}
            >
              <PieChart className="h-4 w-4 mr-1" />
              Pie
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="count" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="count" onClick={() => setSortBy("count")}>
              By Transaction Count
            </TabsTrigger>
            <TabsTrigger value="value" onClick={() => setSortBy("value")}>
              By Total Value
            </TabsTrigger>
          </TabsList>

          <TabsContent value="count" className="w-full">
            {chartType === "bar" ? (
              <div className="space-y-4">
                {sortedData.map((stock) => (
                  <div key={stock.symbol} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-left"
                        onClick={() => onSelectStock(stock.symbol)}
                      >
                        {stock.symbol} - {stock.companyName}
                      </Button>
                      <span className="text-sm font-medium">
                        {stock.transactionCount} trades
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${(stock.transactionCount / maxValue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-64 h-64">
                  {/* Simple pie chart visualization */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {
                      sortedData.reduce(
                        (acc, stock, index) => {
                          const total = sortedData.reduce(
                            (sum, s) => sum + s.transactionCount,
                            0,
                          );
                          const percentage = stock.transactionCount / total;
                          const previousEndAngle = acc.endAngle;
                          const startAngle = previousEndAngle;
                          const endAngle = startAngle + percentage * 360;

                          // Calculate SVG arc path
                          const startAngleRad =
                            ((startAngle - 90) * Math.PI) / 180;
                          const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

                          const x1 = 50 + 40 * Math.cos(startAngleRad);
                          const y1 = 50 + 40 * Math.sin(startAngleRad);
                          const x2 = 50 + 40 * Math.cos(endAngleRad);
                          const y2 = 50 + 40 * Math.sin(endAngleRad);

                          const largeArcFlag = percentage > 0.5 ? 1 : 0;

                          const pathData = [
                            `M 50 50`,
                            `L ${x1} ${y1}`,
                            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`,
                          ].join(" ");

                          const colors = [
                            "#3b82f6",
                            "#ef4444",
                            "#10b981",
                            "#f59e0b",
                            "#8b5cf6",
                            "#ec4899",
                            "#06b6d4",
                          ];

                          acc.elements.push(
                            <path
                              key={stock.symbol}
                              d={pathData}
                              fill={colors[index % colors.length]}
                              stroke="#fff"
                              strokeWidth="0.5"
                              onClick={() => onSelectStock(stock.symbol)}
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            />,
                          );

                          return { elements: acc.elements, endAngle };
                        },
                        { elements: [] as React.ReactNode[], endAngle: 0 },
                      ).elements
                    }
                  </svg>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="value" className="w-full">
            {chartType === "bar" ? (
              <div className="space-y-4">
                {sortedData.map((stock) => (
                  <div key={stock.symbol} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-left"
                        onClick={() => onSelectStock(stock.symbol)}
                      >
                        {stock.symbol} - {stock.companyName}
                      </Button>
                      <span className="text-sm font-medium">
                        {formatCurrency(stock.totalValue)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{
                          width: `${(stock.totalValue / maxValue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <div className="relative w-64 h-64">
                  {/* Simple pie chart visualization */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {
                      sortedData.reduce(
                        (acc, stock, index) => {
                          const total = sortedData.reduce(
                            (sum, s) => sum + s.totalValue,
                            0,
                          );
                          const percentage = stock.totalValue / total;
                          const previousEndAngle = acc.endAngle;
                          const startAngle = previousEndAngle;
                          const endAngle = startAngle + percentage * 360;

                          // Calculate SVG arc path
                          const startAngleRad =
                            ((startAngle - 90) * Math.PI) / 180;
                          const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

                          const x1 = 50 + 40 * Math.cos(startAngleRad);
                          const y1 = 50 + 40 * Math.sin(startAngleRad);
                          const x2 = 50 + 40 * Math.cos(endAngleRad);
                          const y2 = 50 + 40 * Math.sin(endAngleRad);

                          const largeArcFlag = percentage > 0.5 ? 1 : 0;

                          const pathData = [
                            `M 50 50`,
                            `L ${x1} ${y1}`,
                            `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            `Z`,
                          ].join(" ");

                          const colors = [
                            "#3b82f6",
                            "#ef4444",
                            "#10b981",
                            "#f59e0b",
                            "#8b5cf6",
                            "#ec4899",
                            "#06b6d4",
                          ];

                          acc.elements.push(
                            <path
                              key={stock.symbol}
                              d={pathData}
                              fill={colors[index % colors.length]}
                              stroke="#fff"
                              strokeWidth="0.5"
                              onClick={() => onSelectStock(stock.symbol)}
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            />,
                          );

                          return { elements: acc.elements, endAngle };
                        },
                        { elements: [] as React.ReactNode[], endAngle: 0 },
                      ).elements
                    }
                  </svg>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {chartType === "pie" && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {sortedData.map((stock, index) => {
              const colors = [
                "#3b82f6",
                "#ef4444",
                "#10b981",
                "#f59e0b",
                "#8b5cf6",
                "#ec4899",
                "#06b6d4",
              ];
              return (
                <div key={stock.symbol} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs font-medium"
                    onClick={() => onSelectStock(stock.symbol)}
                  >
                    {stock.symbol}
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopularStocksChart;
