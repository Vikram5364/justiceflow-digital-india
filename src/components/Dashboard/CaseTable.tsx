
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Case {
  id: string;
  title: string;
  number: string;
  priority: "high" | "medium" | "low";
  status: "active" | "scheduled" | "pending" | "closed";
  type: string;
  date: string;
}

interface CaseTableProps {
  cases: Case[];
  title?: string;
  description?: string;
}

const priorityLabel = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const priorityClass = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-green-100 text-green-800",
};

const statusClass = {
  active: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  pending: "bg-gray-100 text-gray-800",
  closed: "bg-green-100 text-green-800",
};

const statusLabel = {
  active: "In Progress",
  scheduled: "Scheduled",
  pending: "Pending",
  closed: "Closed",
};

const CaseTable = ({ 
  cases, 
  title = "Recent Cases", 
  description = "Review and manage your most recent cases" 
}: CaseTableProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronDown className="h-3.5 w-3.5" />
            <span>Sort by</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium">Case Details</th>
                <th className="pb-3 text-left font-medium">Type</th>
                <th className="pb-3 text-left font-medium">Priority</th>
                <th className="pb-3 text-left font-medium">Status</th>
                <th className="pb-3 text-left font-medium">Last Updated</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem.id} className="border-b last:border-0">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{caseItem.title}</div>
                      <div className="text-muted-foreground text-xs">
                        #{caseItem.number}
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{caseItem.type}</td>
                  <td className="py-3">
                    <Badge 
                      variant="outline" 
                      className={cn(priorityClass[caseItem.priority])}
                    >
                      {priorityLabel[caseItem.priority]}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge 
                      variant="outline"
                      className={cn(statusClass[caseItem.status])}
                    >
                      {statusLabel[caseItem.status]}
                    </Badge>
                  </td>
                  <td className="py-3">{caseItem.date}</td>
                  <td className="py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/cases/${caseItem.id}`)}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Schedule hearing</DropdownMenuItem>
                        <DropdownMenuItem>Add document</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {cases.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No cases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseTable;
