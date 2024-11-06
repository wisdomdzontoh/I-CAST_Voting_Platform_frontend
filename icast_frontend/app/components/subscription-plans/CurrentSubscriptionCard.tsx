// components/CurrentSubscriptionCard.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

type CurrentSubscriptionCardProps = {
  plan: {
    name: string;
    status: string;
    renewalDate: string;
    features: string[];
    cost: string;
  };
};

const CurrentSubscriptionCard: React.FC<CurrentSubscriptionCardProps> = ({ plan }) => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle className="text-xl">Current Subscription</CardTitle>
      <CardDescription>Your current subscription plan details.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{plan.name}</p>
        <Badge variant="success">{plan.status}</Badge>
      </div>
      <p>Renewal Date: {plan.renewalDate}</p>
      <p>Cost: {plan.cost}</p>
      <Separator />
      <ul className="list-disc pl-5 space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </CardContent>
    <CardFooter className="flex justify-end">
      <Button variant="primary">Upgrade Plan</Button>
    </CardFooter>
  </Card>
);

export default CurrentSubscriptionCard;
