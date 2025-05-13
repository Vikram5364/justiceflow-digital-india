
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Plus, Gavel, Upload, Video, User } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const QuickActions = () => {
  const handleUpload = () => {
    toast.info("Document upload functionality would appear here");
  };

  const handleNewCase = () => {
    toast.info("New case form would appear here");
  };

  const handleJudgment = () => {
    toast.info("Record judgment form would appear here");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and actions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          onClick={handleNewCase}
        >
          <Plus className="h-5 w-5" />
          <span>New Case</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          as={Link}
          to="/schedule"
        >
          <Calendar className="h-5 w-5" />
          <span>Schedule Hearing</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          onClick={handleUpload}
        >
          <Upload className="h-5 w-5" />
          <span>Upload Document</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          onClick={handleJudgment}
        >
          <Gavel className="h-5 w-5" />
          <span>Record Judgment</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          as={Link}
          to="/virtual-courtroom"
        >
          <Video className="h-5 w-5" />
          <span>Virtual Courtroom</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex flex-col p-4 items-center gap-2 w-[calc(50%-4px)]"
          as={Link}
          to="/personal"
        >
          <User className="h-5 w-5" />
          <span>My Portal</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
