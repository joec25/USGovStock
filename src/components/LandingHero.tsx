import { ArrowRight, BarChart3, Bell, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

export default function LandingHero() {
  return (
    <div className="py-12 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Congressional Stock Trading Tracker
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Gain insights from government officials' stock trades and make
              more informed investment decisions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="gap-1" asChild>
              <a href="#demo">
                Try Free Version <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#pricing">View Pricing</a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="flex flex-col items-center p-6 bg-background rounded-lg border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Performance</h3>
            <p className="text-center text-muted-foreground">
              See how stocks perform after politicians trade them and identify
              potential opportunities
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-background rounded-lg border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
            <p className="text-center text-muted-foreground">
              Explore interactive charts showing the most commonly traded stocks
              among officials
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-background rounded-lg border shadow-sm">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Alerts</h3>
            <p className="text-center text-muted-foreground">
              Get notified when specific politicians make new trades to never
              miss an opportunity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
