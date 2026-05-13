import { type TableCardProps } from "@/entities/table/model/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

export function TableCard({ tableData }: TableCardProps) {
  const { capacity, number, status } = tableData;
  return (
    <Card className="hover:border-primary transition-colors cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Стіл {number}</CardTitle>
          <Badge variant="secondary">{capacity} місця</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      </CardContent>
    </Card>
  );
}
