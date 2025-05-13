
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { getCases, startRealTimeUpdates } from "@/services/caseService";

// Case status data for charts
const caseStatusData = [
  { name: "Active", value: 42, color: "#3b82f6" },
  { name: "Scheduled", value: 28, color: "#8b5cf6" },
  { name: "Pending", value: 63, color: "#6b7280" },
  { name: "Closed", value: 37, color: "#10b981" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentCases, setRecentCases] = useState([]);
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);

  useEffect(() => {
    // Get initial data
    const cases = getCases();
    setRecentCases(cases.slice(0, 5));
    
    // Extract upcoming hearings from cases with nextHearingDate
    const hearings = cases
      .filter(c => c.nextHearingDate && c.status !== 'closed')
      .slice(0, 3)
      .map(c => ({
        id: c.id,
        caseNumber: c.number,
        caseTitle: c.title,
        date: c.nextHearingDate?.split(' at')[0] || '',
        time: c.nextHearingDate?.split(' at')[1]?.trim() || '10:00 AM',
        courtroom: c.courtroom || 'TBD',
        judge: c.judge || 'TBD',
        type: c.type || 'Hearing',
      }));
    
    setUpcomingHearings(hearings);

    // Notify user that real-time updates are available
    setTimeout(() => {
      toast.info(
        "Real-time updates are available for this dashboard", 
        { 
          description: "Click 'Enable' to see live case updates.",
          action: {
            label: "Enable",
            onClick: () => {
              setRealTimeEnabled(true);
              toast.success("Real-time updates enabled");
              // Start the real-time updates
              const cleanup = startRealTimeUpdates(() => {
                // Refresh data when updates happen
                const updatedCases = getCases();
                setRecentCases(updatedCases.slice(0, 5));
                
                // Extract updated upcoming hearings
                const updatedHearings = updatedCases
                  .filter(c => c.nextHearingDate && c.status !== 'closed')
                  .slice(0, 3)
                  .map(c => ({
                    id: c.id,
                    caseNumber: c.number,
                    caseTitle: c.title,
                    date: c.nextHearingDate?.split(' at')[0] || '',
                    time: c.nextHearingDate?.split(' at')[1]?.trim() || '10:00 AM',
                    courtroom: c.courtroom || 'TBD',
                    judge: c.judge || 'TBD',
                    type: c.type || 'Hearing',
                  }));
                
                setUpcomingHearings(updatedHearings);
              });
              
              return () => cleanup();
            }
          }
        }
      );
    }, 2000);
    
    // If real-time is enabled already, start updates
    if (realTimeEnabled) {
      const cleanup = startRealTimeUpdates(() => {
        // Refresh data when updates happen
        const updatedCases = getCases();
        setRecentCases(updatedCases.slice(0, 5));
        
        // Extract updated upcoming hearings
        const updatedHearings = updatedCases
          .filter(c => c.nextHearingDate && c.status !== 'closed')
          .slice(0, 3)
          .map(c => ({
            id: c.id,
            caseNumber: c.number,
            caseTitle: c.title,
            date: c.nextHearingDate?.split(' at')[0] || '',
            time: c.nextHearingDate?.split(' at')[1]?.trim() || '10:00 AM',
            courtroom: c.courtroom || 'TBD',
            judge: c.judge || 'TBD',
            type: c.type || 'Hearing',
          }));
        
        setUpcomingHearings(updatedHearings);
      });
      
      return () => cleanup();
    }
  }, [realTimeEnabled]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Justice Patel
            {realTimeEnabled && <span className="ml-2 text-green-500">(Live Updates Enabled)</span>}
          </p>
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
                <CaseTable 
                  cases={recentCases} 
                  title="Recent Cases"
                  description={realTimeEnabled ? "Live updates enabled" : "Review and manage your most recent cases"}
                />
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
