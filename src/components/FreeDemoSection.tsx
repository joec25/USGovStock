"use client";

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TradesTable from "./TradesTable";
import PopularStocksChart from "./PopularStocksChart";
import AlertsManager from "./AlertsManager";
import { Button } from "./ui/button";
import { Lock } from "lucide-react";

export default function FreeDemoSection() {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // Limited data for free version
  const limitedTrades = [
    {
      id: "1",
      politician: "Nancy Pelosi",
      ticker: "AAPL",
      companyName: "Apple Inc.",
      transactionDate: "2023-06-15",
      transactionType: "buy",
      amount: "$100,000 - $250,000",
      performance: 12.5,
    },
    {
      id: "2",
      politician: "Mitch McConnell",
      ticker: "MSFT",
      companyName: "Microsoft Corporation",
      transactionDate: "2023-06-10",
      transactionType: "buy",
      amount: "$50,000 - $100,000",
      performance: 8.3,
    },
    {
      id: "3",
      politician: "Elizabeth Warren",
      ticker: "AMZN",
      companyName: "Amazon.com Inc.",
      transactionDate: "2023-06-05",
      transactionType: "sell",
      amount: "$250,000 - $500,000",
      performance: -3.2,
    },
  ];

  const handleRowClick = () => {
    setShowUpgradePrompt(true);
  };

  return (
    <div className="py-12 bg-muted/30" id="demo">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Try Our Free Demo
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Experience a preview of our platform's capabilities
          </p>
        </div>

        <Tabs defaultValue="trades" className="w-full">
          <TabsList className="mb-6 justify-center">
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="popular">Popular Stocks</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="trades" className="space-y-6">
            {showUpgradePrompt ? (
              <UpgradePrompt onClose={() => setShowUpgradePrompt(false)} />
            ) : (
              <>
                <Card className="bg-card p-4">
                  <CardContent className="p-0">
                    <div className="text-center p-4 text-muted-foreground">
                      <p>
                        Free version shows limited trade data (3 of 100+ trades)
                      </p>
                      <p className="text-sm">
                        Upgrade for full access to all trades and advanced
                        filtering
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <TradesTable
                  trades={limitedTrades}
                  onRowClick={handleRowClick}
                  currentPage={1}
                  totalPages={1}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            {showUpgradePrompt ? (
              <UpgradePrompt onClose={() => setShowUpgradePrompt(false)} />
            ) : (
              <>
                <Card className="bg-card p-4">
                  <CardContent className="p-0">
                    <div className="text-center p-4 text-muted-foreground">
                      <p>Free version shows basic visualization</p>
                      <p className="text-sm">
                        Upgrade for interactive charts and detailed analysis
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <div className="max-w-3xl mx-auto">
                  <PopularStocksChart onSelectStock={handleRowClick} />
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            {showUpgradePrompt ? (
              <UpgradePrompt onClose={() => setShowUpgradePrompt(false)} />
            ) : (
              <>
                <Card className="bg-card p-4">
                  <CardContent className="p-0">
                    <div className="text-center p-4 text-muted-foreground">
                      <p>Alert creation requires a premium subscription</p>
                      <p className="text-sm">
                        Upgrade to create custom alerts for politician trades
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <div className="relative max-w-3xl mx-auto">
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <div className="text-center p-6">
                      <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        Premium Feature
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Create custom alerts to get notified when politicians
                        make new trades
                      </p>
                      <Button>Upgrade to Premium</Button>
                    </div>
                  </div>
                  <AlertsManager />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function UpgradePrompt({ onClose }: { onClose: () => void }) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Lock className="h-12 w-12 mx-auto text-primary" />
          <h3 className="text-2xl font-bold">Premium Feature</h3>
          <p className="text-muted-foreground">
            Detailed stock information is only available with a premium
            subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button>Upgrade to Premium</Button>
            <Button variant="outline" onClick={onClose}>
              Return to Demo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
