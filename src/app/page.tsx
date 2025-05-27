import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import DateRangePicker from "@/components/DateRangePicker";
import TradesTable from "@/components/TradesTable";
import PopularStocksChart from "@/components/PopularStocksChart";
import AlertsManager from "@/components/AlertsManager";

export default function Home() {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  return (
    <main className="flex min-h-screen flex-col p-6 bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Congressional Stock Trading Tracker
        </h1>
        <div className="flex items-center gap-4">
          {/* Theme switcher would go here */}
        </div>
      </div>

      <Tabs defaultValue="trades" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="popular">Popular Stocks</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="trades" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Filter Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Politician
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Politicians" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Politicians</SelectItem>
                      <SelectItem value="pelosi">Nancy Pelosi</SelectItem>
                      <SelectItem value="cruz">Ted Cruz</SelectItem>
                      <SelectItem value="warren">Elizabeth Warren</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <DateRangePicker
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Trade Size
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Size</SelectItem>
                      <SelectItem value="small">Small ($1K - $15K)</SelectItem>
                      <SelectItem value="medium">
                        Medium ($15K - $50K)
                      </SelectItem>
                      <SelectItem value="large">Large ($50K+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search politicians or stocks..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <TradesTable />
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Most Commonly Traded Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <PopularStocksChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Manage Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <AlertsManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
