"use client";

import { useState } from "react";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  // Since everything is now free, we'll modify this section to show a single free plan
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
              Free Access to All Features
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              CongressTracker is now completely free to use
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <PricingCard
            title="Free Access"
            price="Free"
            description="Full access to all CongressTracker features"
            features={[
              { name: "Unlimited trade history", included: true },
              { name: "Comprehensive stock performance data", included: true },
              { name: "Advanced data visualization", included: true },
              { name: "Unlimited date range filtering", included: true },
              { name: "Detailed stock analysis", included: true },
              { name: "Custom alerts", included: true },
              { name: "Historical data access", included: true },
              { name: "Senator news updates", included: true },
            ]}
            buttonText="Go to Dashboard"
            buttonVariant="default"
            onButtonClick={handleStartFreeTrial}
            buttonHref="/dashboard"
            popular={true}
          />
        </div>
      </div>
    </div>
  );
}
