// components/BillingHistoryCard.tsx

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";

type BillingRecord = {
  date: string;
  amount: string;
  status: string;
};

type BillingHistoryCardProps = {
  history: BillingRecord[];
};

const BillingHistoryCard: React.FC<BillingHistoryCardProps> = ({ history }) => (
  <Card className="flex-1">
    <CardHeader>
      <CardTitle className="text-xl">Billing History</CardTitle>
      <CardDescription>Your past subscription payments.</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((bill, index) => (
            <TableRow key={index}>
              <TableCell>{bill.date}</TableCell>
              <TableCell>{bill.amount}</TableCell>
              <TableCell>
                <Badge variant={bill.status === "Paid" ? "success" : "destructive"}>{bill.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default BillingHistoryCard;
