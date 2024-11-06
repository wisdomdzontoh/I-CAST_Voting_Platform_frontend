// components/UsageOverviewCard.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import ProgressBar from "@/app/components/ui/ProgressBar"; // Corrected import for the ProgressBar component

type UsageOverviewCardProps = {
  usage: {
    limit: number;
    used: number;
  };
};

const UsageOverviewCard: React.FC<UsageOverviewCardProps> = ({ usage }) => {
  const usagePercentage = (usage.used / usage.limit) * 100;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-xl">Usage Overview</CardTitle>
        <CardDescription>Your current usage for this billing cycle.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <p>{usage.used} / {usage.limit} API Calls Used</p>
          <p>{usagePercentage.toFixed(2)}%</p>
        </div>
        <ProgressBar value={usagePercentage} />
      </CardContent>
    </Card>
  );
};

export default UsageOverviewCard;
