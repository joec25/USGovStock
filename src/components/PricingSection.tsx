"use client";

import { useState } from "react";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const handleStartFreeTrial = () => {
    // Handle free trial logic
    console.log("Starting free trial");
  };

  const handleSubscribe = () => {
    // Handle subscription logic
    console.log("Subscribing to premium");
  };

  return (
    <div className="py-12 bg-background" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="inline-flex items-center rounded-full border p-1 bg-muted">
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full text-sm ${isAnnual ? "bg-background shadow" : ""}`}
            >
              Annual
              {isAnnual && (
                <span className="ml-2 text-xs text-primary">Save 20%</span>
              )}
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full text-sm ${!isAnnual ? "bg-background shadow" : ""}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PricingCard
            title="Free"
            price="Free"
            description="Basic access to track congressional trades"
            features={[
              { name: "View recent trades (limited to 10)", included: true },
              { name: "Basic stock performance data", included: true },
              { name: "Popular stocks overview", included: true },
              { name: "Limited date range filtering", included: true },
              { name: "Detailed stock analysis", included: false },
              { name: "Custom alerts", included: false },
              { name: "Historical data access", included: false },
              { name: "Export functionality", included: false },
            ]}
            buttonText="Get Started"
            buttonVariant="outline"
            onButtonClick={handleStartFreeTrial}
          />

          <PricingCard
            title="Premium"
            price={isAnnual ? "$99" : "$12.99"}
            description="Full access to all features and data"
            features={[
              { name: "Unlimited trade history", included: true },
              { name: "Comprehensive stock performance data", included: true },
              { name: "Advanced data visualization", included: true },
              { name: "Unlimited date range filtering", included: true },
              { name: "Detailed stock analysis", included: true },
              { name: "Custom alerts (unlimited)", included: true },
              { name: "Historical data access", included: true },
              { name: "Export functionality", included: true },
            ]}
            buttonText="Subscribe Now"
            onButtonClick={handleSubscribe}
            popular={true}
          />

          <PricingCard
            title="Enterprise"
            price="Custom"
            description="Custom solutions for organizations"
            features={[
              { name: "All Premium features", included: true },
              { name: "API access", included: true },
              { name: "Custom integrations", included: true },
              { name: "Dedicated support", included: true },
              { name: "Team management", included: true },
              { name: "Custom reporting", included: true },
              { name: "Training sessions", included: true },
              { name: "Service level agreement", included: true },
            ]}
            buttonText="Contact Sales"
            buttonVariant="outline"
            onButtonClick={() => console.log("Contact sales")}
          />
        </div>
      </div>
    </div>
  );
}
