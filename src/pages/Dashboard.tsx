import DashboardLayout from "@/components/Layout/DashboardLayout";
import StatCard from "@/components/Dashboard/StatCard";
import CaseTable from "@/components/Dashboard/CaseTable";
import QuickActions from "@/components/Dashboard/QuickActions";
import CaseProgressChart from "@/components/Dashboard/CaseProgressChart";
import UpcomingHearings from "@/components/Dashboard/UpcomingHearings";
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

// Mock data
const recentCases = [
  {
    id: "1",
    title: "State of Maharashtra vs. Sharma",
    number: "CR-2024-0156",
    priority: "high" as const,
    status: "active" as const,
    type: "Criminal",
    date: "May 12, 2024",
  },
  {
    id: "2",
    title: "Patel Industries vs. Gujarat Tax Authority",
    number: "TX-2024-0892",
    priority: "medium" as const,
    status: "scheduled" as const,
    type: "Tax",
    date: "May 10, 2024",
  },
  {
    id: "3",
    title: "Sharma vs. Delhi Municipal Corporation",
    number: "CV-2024-0325",
    priority: "low" as const,
    status: "pending" as const,
    type: "Civil",
    date: "May 8, 2024",
  },
  {
    id: "4",
    title: "United Bank vs. Mehta Enterprises",
    number: "BK-2024-0218",
    priority: "high" as const,
    status: "active" as const,
    type: "Banking",
    date: "May 7, 2024",
  },
  {
    id: "5",
    title: "Kumar vs. Kumar (Divorce)",
    number: "FM-2024-0422",
    priority: "medium" as const,
    status: "scheduled" as const,
    type: "Family",
    date: "May 5, 2024",
  },
];

const caseStatusData = [
  { name: "Active", value: 42, color: "#3b82f6" },
  { name: "Scheduled", value: 28, color: "#8b5cf6" },
  { name: "Pending", value: 63, color: "#6b7280" },
  { name: "Closed", value: 37, color: "#10b981" },
];

const upcomingHearings = [
  {
    id: "1",
    caseNumber: "CR-2024-0156",
    caseTitle: "State of Maharashtra vs. Sharma",
    date: "May 14, 2024",
    time: "10:30 AM",
    courtroom: "Courtroom 3A",
    judge: "Justice A. Patel",
    type: "Trial",
  },
  {
    id: "2",
    caseNumber: "TX-2024-0892",
    caseTitle: "Patel Industries vs. Gujarat Tax Authority",
    date: "May 15, 2024",
    time: "2:00 PM",
    courtroom: "Courtroom 5B",
    judge: "Justice S. Kumar",
    type: "Hearing",
  },
  {
    id: "3",
    caseNumber: "FM-2024-0422",
    caseTitle: "Kumar vs. Kumar (Divorce)",
    date: "May 16, 2024",
    time: "11:00 AM",
    courtroom: "Courtroom 2C",
    judge: "Justice M. Reddy",
    type: "Conference",
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Justice Patel</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6">
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Active Cases"
                value="170"
                icon={<FileText className="h-6 w-6" />}
                trend={{ value: 12, isPositive: false }}
              />
              <StatCard
                title="Cases Resolved (MTD)"
                value="37"
                icon={<BarChart3 className="h-6 w-6" />}
                trend={{ value: 8, isPositive: true }}
              />
              <StatCard
                title="Upcoming Hearings"
                value="24"
                icon={<Calendar className="h-6 w-6" />}
                description="Next 7 days"
              />
              <StatCard
                title="Avg. Case Duration"
                value="183 days"
                icon={<Clock className="h-6 w-6" />}
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CaseTable cases={recentCases} />
              </div>

              <div className="space-y-6">
                <QuickActions />
                <UpcomingHearings hearings={upcomingHearings} />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CaseProgressChart data={caseStatusData} />
              <Card className="h-[300px]">
                <CardHeader>
                  <CardTitle>Case Resolution Time</CardTitle>
                  <CardDescription>Average time to resolve cases by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Analytics data visualization would be shown here
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Judicial Efficiency</CardTitle>
                <CardDescription>Case clearance rates and processing efficiency</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <p className="text-center text-muted-foreground">
                  Advanced analytics dashboard would be displayed here
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
