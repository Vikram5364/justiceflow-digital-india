
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Hearing {
  id: string;
  caseNumber: string;
  caseTitle: string;
  date: string;
  time: string;
  courtroom: string;
  judge: string;
  type: string;
}

interface UpcomingHearingsProps {
  hearings: Hearing[];
}

const UpcomingHearings = ({ hearings }: UpcomingHearingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Hearings</CardTitle>
        <CardDescription>Scheduled hearings for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {hearings.length === 0 ? (
            <li className="text-center text-muted-foreground py-6">
              No upcoming hearings
            </li>
          ) : (
            hearings.map((hearing) => (
              <li key={hearing.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{hearing.caseTitle}</h4>
                    <p className="text-xs text-muted-foreground">#{hearing.caseNumber}</p>
                  </div>
                  <Badge variant="outline" className={cn("bg-purple-100 text-purple-800")}>
                    {hearing.type}
                  </Badge>
                </div>

                <div className="text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{hearing.date} at {hearing.time}</span>
                  </div>
                  <div className="grid grid-cols-2 mt-1">
                    <div>
                      <span className="text-xs text-muted-foreground">Courtroom</span>
                      <p className="text-sm font-medium">{hearing.courtroom}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Judge</span>
                      <p className="text-sm font-medium">{hearing.judge}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UpcomingHearings;
