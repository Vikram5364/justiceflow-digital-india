
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Plus, Gavel, Upload } from "lucide-react";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and actions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="outline" className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]">
          <Plus className="h-5 w-5" />
          <span>New Case</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]">
          <Calendar className="h-5 w-5" />
          <span>Schedule Hearing</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]">
          <Upload className="h-5 w-5" />
          <span>Upload Document</span>
        </Button>
        <Button variant="outline" className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]">
          <Gavel className="h-5 w-5" />
          <span>Record Judgment</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
