import { Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonVariant?: "default" | "outline";
  onButtonClick?: () => void;
  popular?: boolean;
  buttonHref?: string;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  onButtonClick,
  popular = false,
  buttonHref,
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}
    >
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && (
            <span className="text-muted-foreground ml-1">/month</span>
          )}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check
                className={`mr-2 h-5 w-5 ${feature.included ? "text-primary" : "text-muted-foreground opacity-50"}`}
              />
              <span className={feature.included ? "" : "text-muted-foreground"}>
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onButtonClick}
          variant={buttonVariant}
          className="w-full"
          asChild={!!buttonHref}
        >
          {buttonHref ? <a href={buttonHref}>{buttonText}</a> : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
