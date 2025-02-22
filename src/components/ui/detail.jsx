import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const DetailItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <Label className="text-sm font-medium text-muted-foreground">
      {label}
    </Label>
    <p className="text-sm font-semibold">{value || "-"}</p>
  </div>
);

export const DetailSection = ({ label, value }) => (
  <Card className="p-4 bg-muted/50">
    <div className="space-y-2">
      <h4 className="font-medium text-sm text-muted-foreground">{label}</h4>
      <p className="text-sm whitespace-pre-wrap">{value || "No data"}</p>
    </div>
  </Card>
);