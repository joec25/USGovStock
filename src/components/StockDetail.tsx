"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  User,
  ArrowRightLeft,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

interface StockDetailProps {
  ticker?: string;
  companyName?: string;
  politician?: string;
  transactionDate?: string;
  transactionType?: "buy" | "sell";
  amount?: string;
  performanceSinceTransaction?: number;
  historicalData?: Array<{ date: string; price: number }>;
  onBack?: () => void;
}

const StockDetail = ({
  ticker = "AAPL",
  companyName = "Apple Inc.",
  politician = "Jane Smith",
  transactionDate = "2023-05-15",
  transactionType = "buy",
  amount = "$10,000 - $50,000",
  performanceSinceTransaction = 12.5,
  historicalData = [
    { date: "2023-05-15", price: 150 },
    { date: "2023-06-15", price: 155 },
    { date: "2023-07-15", price: 160 },
    { date: "2023-08-15", price: 158 },
    { date: "2023-09-15", price: 165 },
    { date: "2023-10-15", price: 170 },
    { date: "2023-11-15", price: 168 },
    { date: "2023-12-15", price: 175 },
    { date: "2024-01-15", price: 180 },
    { date: "2024-02-15", price: 185 },
    { date: "2024-03-15", price: 190 },
  ],
  onBack = () => {},
}: StockDetailProps) => {
  // Calculate chart dimensions
  const chartWidth = 1000;
  const chartHeight = 300;
  const padding = 40;
  const dataPoints = historicalData.length;

  // Calculate scales for the chart
  const prices = historicalData.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;

  // Generate SVG path for the chart line
  const generatePath = () => {
    return historicalData
      .map((point, i) => {
        const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
        const y =
          chartHeight -
          padding -
          ((point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Generate points for the chart
  const generatePoints = () => {
    return historicalData.map((point, i) => {
      const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
      const y =
        chartHeight -
        padding -
        ((point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
      return { x, y, ...point };
    });
  };

  const chartPoints = generatePoints();

  return (
    <div className="bg-background p-6 rounded-lg w-full max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" onClick={onBack} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
        <h1 className="text-3xl font-bold">{ticker}</h1>
        <span className="text-muted-foreground ml-3 text-xl">
          {companyName}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Performance Since Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {performanceSinceTransaction >= 0 ? (
                <TrendingUp className="h-10 w-10 text-green-500 mr-3" />
              ) : (
                <TrendingDown className="h-10 w-10 text-red-500 mr-3" />
              )}
              <div>
                <p
                  className={`text-3xl font-bold ${performanceSinceTransaction >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performanceSinceTransaction >= 0 ? "+" : ""}
                  {performanceSinceTransaction}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Since {transactionDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" /> Politician
                </span>
                <span className="font-medium">{politician}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" /> Date
                </span>
                <span className="font-medium">{transactionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center text-muted-foreground">
                  <ArrowRightLeft className="h-4 w-4 mr-2" /> Type
                </span>
                <Badge
                  variant={
                    transactionType === "buy" ? "default" : "destructive"
                  }
                >
                  {transactionType.toUpperCase()}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-2" /> Amount
                </span>
                <span className="font-medium">{amount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-primary mr-2" />
              <p className="text-3xl font-bold">
                {historicalData[historicalData.length - 1].price.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              As of {historicalData[historicalData.length - 1].date}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Price History</CardTitle>
          <CardDescription>
            Stock performance since transaction date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <TabsContent value="chart" className="pt-4">
              <div className="relative h-[400px] w-full">
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* X and Y axes */}
                  <line
                    x1={padding}
                    y1={chartHeight - padding}
                    x2={chartWidth - padding}
                    y2={chartHeight - padding}
                    stroke="currentColor"
                    strokeOpacity="0.2"
                  />
                  <line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={chartHeight - padding}
                    stroke="currentColor"
                    strokeOpacity="0.2"
                  />

                  {/* Chart line */}
                  <path
                    d={generatePath()}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />

                  {/* Data points */}
                  {chartPoints.map((point, i) => (
                    <circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill="hsl(var(--primary))"
                    />
                  ))}

                  {/* Price labels (y-axis) */}
                  <text
                    x={padding - 10}
                    y={padding}
                    textAnchor="end"
                    fontSize="12"
                    fill="currentColor"
                  >
                    ${maxPrice}
                  </text>
                  <text
                    x={padding - 10}
                    y={chartHeight - padding}
                    textAnchor="end"
                    fontSize="12"
                    fill="currentColor"
                  >
                    ${minPrice}
                  </text>

                  {/* Date labels (x-axis) - show first, middle and last */}
                  <text
                    x={padding}
                    y={chartHeight - padding + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {historicalData[0].date}
                  </text>
                  <text
                    x={chartWidth / 2}
                    y={chartHeight - padding + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {historicalData[Math.floor(dataPoints / 2)].date}
                  </text>
                  <text
                    x={chartWidth - padding}
                    y={chartHeight - padding + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fill="currentColor"
                  >
                    {historicalData[dataPoints - 1].date}
                  </text>
                </svg>
              </div>
            </TabsContent>
            <TabsContent value="table">
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Date</th>
                      <th className="text-right p-3">Price</th>
                      <th className="text-right p-3">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalData.map((data, index) => {
                      const prevPrice =
                        index > 0
                          ? historicalData[index - 1].price
                          : data.price;
                      const change = data.price - prevPrice;
                      const changePercent = (change / prevPrice) * 100;

                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3">{data.date}</td>
                          <td className="text-right p-3">
                            ${data.price.toFixed(2)}
                          </td>
                          <td
                            className={`text-right p-3 ${change >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(2)} ({change >= 0 ? "+" : ""}
                            {changePercent.toFixed(2)}%)
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Transactions</CardTitle>
          <CardDescription>
            Other politicians who traded {ticker}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                date: "2023-04-10",
                type: "buy",
                amount: "$1,000 - $15,000",
              },
              {
                name: "Sarah Johnson",
                date: "2023-06-22",
                type: "sell",
                amount: "$15,000 - $50,000",
              },
              {
                name: "Robert Williams",
                date: "2023-08-05",
                type: "buy",
                amount: "$50,000 - $100,000",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-md"
              >
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant={
                      transaction.type === "buy" ? "default" : "destructive"
                    }
                  >
                    {transaction.type.toUpperCase()}
                  </Badge>
                  <span>{transaction.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Related Transactions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StockDetail;
