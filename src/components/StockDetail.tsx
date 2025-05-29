"use client";

import React, { useState, useEffect } from "react";
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
  Newspaper,
  AlertCircle,
  BarChart3,
  RefreshCw,
  LineChart,
  Candlestick,
  Activity,
  Gauge,
  Layers,
  Zap,
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

interface StockDetailProps {
  ticker?: string;
  companyName?: string;
  politician?: string;
  transactionDate?: string;
  transactionType?: "buy" | "sell";
  amount?: string;
  performanceSinceTransaction?: number;
  historicalData?: Array<{ date: string; price: number; volume?: number; open?: number; high?: number; low?: number; close?: number }>;
  onBack?: () => void;
  isPremium?: boolean;
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
    { date: "2023-05-15", price: 150, volume: 32000000, open: 148, high: 151, low: 147, close: 150 },
    { date: "2023-06-15", price: 155, volume: 28000000, open: 153, high: 157, low: 152, close: 155 },
    { date: "2023-07-15", price: 160, volume: 35000000, open: 156, high: 162, low: 155, close: 160 },
    { date: "2023-08-15", price: 158, volume: 30000000, open: 161, high: 163, low: 157, close: 158 },
    { date: "2023-09-15", price: 165, volume: 38000000, open: 159, high: 166, low: 158, close: 165 },
    { date: "2023-10-15", price: 170, volume: 42000000, open: 166, high: 172, low: 165, close: 170 },
    { date: "2023-11-15", price: 168, volume: 36000000, open: 171, high: 173, low: 167, close: 168 },
    { date: "2023-12-15", price: 175, volume: 40000000, open: 169, high: 176, low: 168, close: 175 },
    { date: "2024-01-15", price: 180, volume: 45000000, open: 176, high: 182, low: 175, close: 180 },
    { date: "2024-02-15", price: 185, volume: 38000000, open: 181, high: 187, low: 180, close: 185 },
    { date: "2024-03-15", price: 190, volume: 43000000, open: 186, high: 192, low: 185, close: 190 },
  ],
  onBack = () => {},
  isPremium = true,
}: StockDetailProps) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [newsArticles, setNewsArticles] = useState<
    Array<{ title: string; source: string; date: string; url: string }>
  >([]);
  const [isLoadingNews, setIsLoadingNews] = useState<boolean>(false);
  const [chartType, setChartType] = useState<string>("line");
  const [timeRange, setTimeRange] = useState<string>("1y");
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [showIndicators, setShowIndicators] = useState<boolean>(true);
  const [indicatorType, setIndicatorType] = useState<string>("sma");
  const [forecastDays, setForecastDays] = useState<number>(30);
  const [isLoadingForecast, setIsLoadingForecast] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<Array<{ date: string; price: number; isProjected: boolean }>>([]);
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
  const generatePath = (data = historicalData, isProjected = false) => {
    return data
      .map((point, i) => {
        const x = padding + (i / (data.length - 1)) * (chartWidth - 2 * padding);
        const y =
          chartHeight -
          padding -
          ((point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };
  
  // Generate SVG path for the forecast line
  const generateForecastPath = () => {
    if (forecastData.length === 0) return "";
    
    const combinedData = [...historicalData, ...forecastData.filter(d => d.isProjected)];
    const prices = combinedData.map(d => d.price);
    const localMinPrice = Math.min(...prices);
    const localMaxPrice = Math.max(...prices);
    const localPriceRange = localMaxPrice - localMinPrice;
    
    return forecastData
      .map((point, i) => {
        const x = padding + ((historicalData.length - 1 + i) / (historicalData.length + forecastData.length - 2)) * (chartWidth - 2 * padding);
        const y =
          chartHeight -
          padding -
          ((point.price - localMinPrice) / localPriceRange) * (chartHeight - 2 * padding);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Generate points for the chart
  const generatePoints = (data = historicalData) => {
    return data.map((point, i) => {
      const x = padding + (i / (data.length - 1)) * (chartWidth - 2 * padding);
      const y =
        chartHeight -
        padding -
        ((point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
      return { x, y, ...point };
    });
  };

  const chartPoints = generatePoints();
  
  // Generate candlestick data for the chart
  const generateCandlesticks = () => {
    return historicalData.map((point, i) => {
      if (!point.open || !point.close || !point.high || !point.low) return null;
      
      const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
      const candleWidth = 8;
      
      const openY = chartHeight - padding - ((point.open - minPrice) / priceRange) * (chartHeight - 2 * padding);
      const closeY = chartHeight - padding - ((point.close - minPrice) / priceRange) * (chartHeight - 2 * padding);
      const highY = chartHeight - padding - ((point.high - minPrice) / priceRange) * (chartHeight - 2 * padding);
      const lowY = chartHeight - padding - ((point.low - minPrice) / priceRange) * (chartHeight - 2 * padding);
      
      const isUp = point.close >= point.open;
      
      return {
        x,
        openY,
        closeY,
        highY,
        lowY,
        candleWidth,
        isUp,
        ...point
      };
    }).filter(Boolean);
  };
  
  const candlestickData = generateCandlesticks();
  
  // Calculate Simple Moving Average (SMA)
  const calculateSMA = (period = 20) => {
    const smaData = [];
    
    for (let i = 0; i < historicalData.length; i++) {
      if (i < period - 1) {
        smaData.push(null);
        continue;
      }
      
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += historicalData[i - j].price;
      }
      
      const sma = sum / period;
      smaData.push({
        date: historicalData[i].date,
        price: sma
      });
    }
    
    return smaData.filter(Boolean);
  };
  
  // Calculate Exponential Moving Average (EMA)
  const calculateEMA = (period = 20) => {
    const emaData = [];
    const multiplier = 2 / (period + 1);
    
    // First EMA is SMA
    let sum = 0;
    for (let i = 0; i < period; i++) {
      sum += historicalData[i].price;
    }
    let prevEma = sum / period;
    
    for (let i = 0; i < historicalData.length; i++) {
      if (i < period - 1) {
        emaData.push(null);
        continue;
      }
      
      if (i === period - 1) {
        emaData.push({
          date: historicalData[i].date,
          price: prevEma
        });
        continue;
      }
      
      const ema = (historicalData[i].price - prevEma) * multiplier + prevEma;
      prevEma = ema;
      
      emaData.push({
        date: historicalData[i].date,
        price: ema
      });
    }
    
    return emaData.filter(Boolean);
  };
  
  // Calculate Relative Strength Index (RSI)
  const calculateRSI = (period = 14) => {
    const rsiData = [];
    const gains = [];
    const losses = [];
    
    // Calculate initial gains and losses
    for (let i = 1; i < historicalData.length; i++) {
      const change = historicalData[i].price - historicalData[i-1].price;
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? Math.abs(change) : 0);
      
      if (i < period) {
        rsiData.push(null);
        continue;
      }
      
      if (i === period) {
        const avgGain = gains.slice(0, period).reduce((sum, val) => sum + val, 0) / period;
        const avgLoss = losses.slice(0, period).reduce((sum, val) => sum + val, 0) / period;
        
        const rs = avgGain / (avgLoss === 0 ? 0.001 : avgLoss);
        const rsi = 100 - (100 / (1 + rs));
        
        rsiData.push({
          date: historicalData[i].date,
          value: rsi
        });
        continue;
      }
      
      const lastRsi = rsiData[rsiData.length - 1];
      if (!lastRsi) continue;
      
      const lastAvgGain = (lastRsi.value / (100 - lastRsi.value)) * (period - 1);
      const currentGain = gains[gains.length - 1];
      const newAvgGain = (lastAvgGain * (period - 1) + currentGain) / period;
      
      const lastAvgLoss = (period - 1) / (lastRsi.value / (100 - lastRsi.value));
      const currentLoss = losses[losses.length - 1];
      const newAvgLoss = (lastAvgLoss * (period - 1) + currentLoss) / period;
      
      const rs = newAvgGain / (newAvgLoss === 0 ? 0.001 : newAvgLoss);
      const rsi = 100 - (100 / (1 + rs));
      
      rsiData.push({
        date: historicalData[i].date,
        value: rsi
      });
    }
    
    return rsiData.filter(Boolean);
  };
  
  const smaData = calculateSMA();
  const emaData = calculateEMA();
  const rsiData = calculateRSI();
  
  // Generate forecast data
  const generateForecast = () => {
    setIsLoadingForecast(true);
    
    // Simulate API delay
    setTimeout(() => {
      const lastDate = new Date(historicalData[historicalData.length - 1].date);
      const lastPrice = historicalData[historicalData.length - 1].price;
      
      const forecast = [];
      
      // Add the last actual data point as the first forecast point (not projected)
      forecast.push({
        date: lastDate.toISOString().split('T')[0],
        price: lastPrice,
        isProjected: false
      });
      
      // Generate forecast data points
      for (let i = 1; i <= forecastDays; i++) {
        const forecastDate = new Date(lastDate);
        forecastDate.setDate(lastDate.getDate() + i);
        
        // Simple forecasting algorithm (in reality would use more sophisticated models)
        const randomFactor = 0.98 + Math.random() * 0.04; // Random factor between 0.98 and 1.02
        const trendFactor = 1 + (performanceSinceTransaction / 100) * (i / forecastDays) * 0.5;
        const projectedPrice = lastPrice * randomFactor * trendFactor;
        
        forecast.push({
          date: forecastDate.toISOString().split('T')[0],
          price: projectedPrice,
          isProjected: true
        });
      }
      
      setForecastData(forecast);
      setIsLoadingForecast(false);
    }, 1500);
  };

  // Simulate fetching AI analysis
  const fetchAiAnalysis = () => {
    setIsLoadingAnalysis(true);
    // Simulate API delay
    setTimeout(() => {
      setAiAnalysis(
        `Based on recent news and trading patterns, ${companyName} (${ticker}) has shown ${performanceSinceTransaction > 0 ? "positive" : "negative"} momentum following the ${transactionType} transaction by ${politician}. The company recently announced strong quarterly earnings, exceeding analyst expectations by 8%. Technical indicators suggest a potential ${performanceSinceTransaction > 0 ? "continued uptrend" : "reversal"} in the short term. Institutional investors have ${performanceSinceTransaction > 0 ? "increased" : "decreased"} their positions by approximately 3.5% over the past month. The stock's current valuation metrics are slightly ${performanceSinceTransaction > 0 ? "above" : "below"} the sector average, with a P/E ratio of ${Math.round(22 + performanceSinceTransaction / 2)}. Market sentiment remains ${performanceSinceTransaction > 0 ? "bullish" : "cautious"} due to broader economic factors and industry-specific developments.`,
      );
      setIsLoadingAnalysis(false);
    }, 2000);
  };

  // Simulate fetching news articles
  const fetchNewsArticles = () => {
    setIsLoadingNews(true);
    // Simulate API delay
    setTimeout(() => {
      setNewsArticles([
        {
          title: `${companyName} Reports Strong Q2 Earnings, Beats Expectations`,
          source: "Financial Times",
          date: "2024-06-12",
          url: "#",
        },
        {
          title: `Analyst Upgrades ${ticker} Stock to "Buy" Rating`,
          source: "Bloomberg",
          date: "2024-06-08",
          url: "#",
        },
        {
          title: `${companyName} Announces New Product Line, Shares Jump 3%`,
          source: "CNBC",
          date: "2024-06-03",
          url: "#",
        },
        {
          title: `Institutional Investors Increase Stakes in ${ticker}`,
          source: "Wall Street Journal",
          date: "2024-05-28",
          url: "#",
        },
        {
          title: `${companyName} CEO Discusses Future Growth Strategy in Interview`,
          source: "Reuters",
          date: "2024-05-22",
          url: "#",
        },
      ]);
      setIsLoadingNews(false);
    }, 1500);
  };

  // Load AI analysis, news, and forecast on component mount
  useEffect(() => {
    if (isPremium) {
      fetchAiAnalysis();
      fetchNewsArticles();
      generateForecast();
    }
  }, [isPremium]);

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Advanced Chart Analysis</CardTitle>
              <CardDescription>
                Stock performance with forecasting and technical indicators
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="candlestick">Candlestick</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={indicatorType} onValueChange={setIndicatorType}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Indicator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sma">SMA</SelectItem>
                  <SelectItem value="ema">EMA</SelectItem>
                  <SelectItem value="rsi">RSI</SelectItem>
                  <SelectItem value="macd">MACD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-volume" checked={showVolume} onCheckedChange={setShowVolume} />
              <Label htmlFor="show-volume">Show Volume</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="show-indicators" checked={showIndicators} onCheckedChange={setShowIndicators} />
              <Label htmlFor="show-indicators">Show Indicators</Label>
            </div>
            
            <div className="flex flex-col space-y-1 min-w-[200px]">
              <div className="flex justify-between">
                <Label htmlFor="forecast-days">Forecast Days: {forecastDays}</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateForecast} 
                  disabled={isLoadingForecast}
                  className="h-6 px-2"
                >
                  <RefreshCw className={`h-3 w-3 mr-1 ${isLoadingForecast ? "animate-spin" : ""}`} />
                  Update
                </Button>
              </div>
              <Slider 
                id="forecast-days"
                min={7} 
                max={90} 
                step={1} 
                value={[forecastDays]} 
                onValueChange={(value) => setForecastDays(value[0])} 
              />
            </div>
          </div>
          
          <Tabs defaultValue="chart">
            <TabsList className="mb-4">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
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

                  {/* Volume bars (if enabled) */}
                  {showVolume && historicalData.map((point, i) => {
                    if (!point.volume) return null;
                    const x = padding + (i / (dataPoints - 1)) * (chartWidth - 2 * padding);
                    const maxVolume = Math.max(...historicalData.map(d => d.volume || 0));
                    const volumeHeight = ((point.volume / maxVolume) * (chartHeight / 4));
                    return (
                      <rect
                        key={`vol-${i}`}
                        x={x - 4}
                        y={chartHeight - padding - volumeHeight}
                        width={8}
                        height={volumeHeight}
                        fill="hsl(var(--primary))"
                        fillOpacity="0.2"
                      />
                    );
                  })}

                  {/* Chart visualization based on type */}
                  {chartType === 'line' && (
                    <path
                      d={generatePath()}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                  )}
                  
                  {chartType === 'area' && (
                    <>
                      <path
                        d={`${generatePath()} L ${chartWidth - padding} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`}
                        fill="hsl(var(--primary))"
                        fillOpacity="0.1"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                      />
                    </>
                  )}
                  
                  {chartType === 'candlestick' && candlestickData.map((candle, i) => {
                    if (!candle) return null;
                    return (
                      <g key={`candle-${i}`}>
                        {/* Wick */}
                        <line
                          x1={candle.x}
                          y1={candle.highY}
                          x2={candle.x}
                          y2={candle.lowY}
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                        {/* Candle body */}
                        <rect
                          x={candle.x - candle.candleWidth / 2}
                          y={candle.isUp ? candle.closeY : candle.openY}
                          width={candle.candleWidth}
                          height={Math.abs(candle.closeY - candle.openY) || 1}
                          fill={candle.isUp ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                        />
                      </g>
                    );
                  })}

                  {/* Technical indicators */}
                  {showIndicators && indicatorType === 'sma' && (
                    <path
                      d={generatePath(smaData)}
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}
                  
                  {showIndicators && indicatorType === 'ema' && (
                    <path
                      d={generatePath(emaData)}
                      fill="none"
                      stroke="#FF6B6B"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}

                  {/* Data points for line chart */}
                  {chartType === 'line' && chartPoints.map((point, i) => (
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
              
              {indicatorType === 'rsi' && showIndicators && (
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Relative Strength Index (RSI)</h4>
                  <div className="relative h-[100px] w-full">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox={`0 0 ${chartWidth} 100`}
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* RSI reference lines */}
                      <line x1={padding} y1={30} x2={chartWidth - padding} y2={30} stroke="#FFD700" strokeOpacity="0.5" strokeDasharray="2,2" />
                      <line x1={padding} y1={70} x2={chartWidth - padding} y2={70} stroke="#FF6B6B" strokeOpacity="0.5" strokeDasharray="2,2" />
                      
                      {/* RSI line */}
                      <path
                        d={rsiData.map((point, i) => {
                          if (!point) return "";
                          const x = padding + (i / (rsiData.length - 1)) * (chartWidth - 2 * padding);
                          const y = 100 - point.value;
                          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                        }).join(" ")}
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="2"
                      />
                      
                      {/* Y-axis labels */}
                      <text x={padding - 5} y={30} textAnchor="end" fontSize="10" fill="currentColor">70</text>
                      <text x={padding - 5} y={70} textAnchor="end" fontSize="10" fill="currentColor">30</text>
                    </svg>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="forecast" className="pt-4">
              <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">AI-Powered Price Forecast</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  This forecast uses historical data and market trends to predict potential future price movements.
                  The projection is based on technical analysis and should be used for informational purposes only.
                </p>
              </div>
              
              {isLoadingForecast ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Generating forecast...</p>
                </div>
              ) : (
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
                    
                    {/* Historical data line */}
                    <path
                      d={generatePath()}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                    />
                    
                    {/* Forecast line */}
                    <path
                      d={generateForecastPath()}
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                    
                    {/* Vertical line separating historical and forecast data */}
                    {forecastData.length > 0 && (
                      <line
                        x1={padding + ((historicalData.length - 1) / (historicalData.length + forecastData.length - 2)) * (chartWidth - 2 * padding)}
                        y1={padding}
                        x2={padding + ((historicalData.length - 1) / (historicalData.length + forecastData.length - 2)) * (chartWidth - 2 * padding)}
                        y2={chartHeight - padding}
                        stroke="#FFD700"
                        strokeDasharray="4,4"
                      />
                    )}
                    
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
                    
                    {/* Forecast points */}
                    {forecastData.filter(d => d.isProjected).map((point, i) => {
                      const x = padding + ((historicalData.length + i) / (historicalData.length + forecastData.length - 1)) * (chartWidth - 2 * padding);
                      const y = chartHeight - padding - ((point.price - minPrice) / priceRange) * (chartHeight - 2 * padding);
                      return (
                        <circle
                          key={`forecast-${i}`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#FFD700"
                        />
                      );
                    })}
                    
                    {/* Labels */}
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
                    
                    {/* Date labels */}
                    <text
                      x={padding}
                      y={chartHeight - padding + 20}
                      textAnchor="middle"
                      fontSize="12"
                      fill="currentColor"
                    >
                      {historicalData[0].date}
                    </text>
                    
                    {forecastData.length > 0 && (
                      <>
                        <text
                          x={padding + ((historicalData.length - 1) / (historicalData.length + forecastData.length - 2)) * (chartWidth - 2 * padding)}
                          y={chartHeight - padding + 20}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#FFD700"
                        >
                          Today
                        </text>
                        
                        <text
                          x={chartWidth - padding}
                          y={chartHeight - padding + 20}
                          textAnchor="middle"
                          fontSize="12"
                          fill="#FFD700"
                        >
                          {forecastData[forecastData.length - 1].date}
                        </text>
                      </>
                    )}
                  </svg>
                </div>
              )}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Projected Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingForecast ? (
                      <div className="flex items-center justify-center h-10">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      </div>
                    ) : forecastData.length > 0 ? (
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-yellow-500 mr-2" />
                        <span className="text-2xl font-bold">
                          {forecastData[forecastData.length - 1].price.toFixed(2)}
                        </span>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Projected Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingForecast ? (
                      <div className="flex items-center justify-center h-10">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      </div>
                    ) : forecastData.length > 0 ? (
                      <div className="flex items-center">
                        {forecastData[forecastData.length - 1].price > historicalData[historicalData.length - 1].price ? (
                          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className={`text-2xl font-bold ${forecastData[forecastData.length - 1].price > historicalData[historicalData.length - 1].price ? 'text-green-500' : 'text-red-500'}`}>
                          {((forecastData[forecastData.length - 1].price / historicalData[historicalData.length - 1].price - 1) * 100).toFixed(2)}%
                        </span>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Confidence Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingForecast ? (
                      <div className="flex items-center justify-center h-10">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Gauge className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="text-2xl font-bold">
                          {Math.round(65 + Math.random() * 20)}%
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
                            {change.toFixed(2)} ({change >= 0 ? "+" : ""
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

      {/* AI Analysis Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                AI-Powered Stock Analysis
              </CardTitle>
              <CardDescription>
                Insights based on recent news and market data
              </CardDescription>
            </div>
            {isPremium && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Premium Feature
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!isPremium ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-center">
                Premium Feature
              </h3>
              <p className="text-center text-muted-foreground max-w-md">
                Upgrade to CongressTracker Premium to access AI-powered stock
                analysis and insights based on recent news and market data.
              </p>
              <Button>Upgrade to Premium</Button>
            </div>
          ) : isLoadingAnalysis ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Generating AI analysis...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>AI-Generated Analysis</AlertTitle>
                <AlertDescription>
                  This analysis is generated by AI based on recent news and
                  market data. Always conduct your own research before making
                  investment decisions.
                </AlertDescription>
              </Alert>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm leading-relaxed">{aiAnalysis}</p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAiAnalysis}
                  disabled={isLoadingAnalysis}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoadingAnalysis ? "animate-spin" : ""}`}
                  />
                  Refresh Analysis
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* News Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Newspaper className="mr-2 h-5 w-5" />
                Recent News
              </CardTitle>
              <CardDescription>
                Latest news articles about {companyName} from the past 30 days
              </CardDescription>
            </div>
            {isPremium && (
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Premium Feature
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!isPremium ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold text-center">
                Premium Feature
              </h3>
              <p className="text-center text-muted-foreground max-w-md">
                Upgrade to CongressTracker Premium to access the latest news and
                articles about stocks traded by government officials.
              </p>
              <Button>Upgrade to Premium</Button>
            </div>
          ) : isLoadingNews ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading news articles...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {newsArticles.map((article, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium">
                    <a href={article.url} className="hover:underline">
                      {article.title}
                    </a>
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <span>{article.source}</span>
                    <span className="mx-2">•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchNewsArticles}
                  disabled={isLoadingNews}
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoadingNews ? "animate-spin" : ""}`}
                  />
                  Refresh News
                </Button>
              </div>
            </div>
          )}
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