
import DashboardLayout from "@/components/Layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const caseProcessingData = [
  { month: "Jan", criminal: 45, civil: 32, family: 22 },
  { month: "Feb", criminal: 52, civil: 36, family: 18 },
  { month: "Mar", criminal: 48, civil: 39, family: 24 },
  { month: "Apr", criminal: 61, civil: 42, family: 30 },
  { month: "May", criminal: 55, civil: 48, family: 27 },
  { month: "Jun", criminal: 67, civil: 45, family: 26 },
  { month: "Jul", criminal: 72, civil: 53, family: 30 },
  { month: "Aug", criminal: 68, civil: 49, family: 22 },
  { month: "Sep", criminal: 75, civil: 55, family: 35 },
  { month: "Oct", criminal: 80, civil: 59, family: 32 },
  { month: "Nov", criminal: 87, civil: 62, family: 38 },
  { month: "Dec", criminal: 75, civil: 57, family: 35 },
];

const caseClearanceData = [
  { month: "Jan", clearance: 0.85 },
  { month: "Feb", clearance: 0.92 },
  { month: "Mar", clearance: 0.88 },
  { month: "Apr", clearance: 0.95 },
  { month: "May", clearance: 1.02 },
  { month: "Jun", clearance: 0.98 },
  { month: "Jul", clearance: 1.05 },
  { month: "Aug", clearance: 1.12 },
  { month: "Sep", clearance: 1.08 },
  { month: "Oct", clearance: 1.15 },
  { month: "Nov", clearance: 1.18 },
  { month: "Dec", clearance: 1.10 },
];

const caseByTypeData = [
  { type: "Criminal", count: 320 },
  { type: "Civil", count: 240 },
  { type: "Family", count: 180 },
  { type: "Tax", count: 120 },
  { type: "Banking", count: 90 },
  { type: "Property", count: 140 },
  { type: "Commercial", count: 110 },
];

const districtPerformanceData = [
  { district: "Delhi North", clearance: 1.12, backlog: 320, avgDuration: 165 },
  { district: "Delhi South", clearance: 0.98, backlog: 410, avgDuration: 182 },
  { district: "Mumbai Central", clearance: 1.05, backlog: 280, avgDuration: 155 },
  { district: "Mumbai Suburban", clearance: 0.92, backlog: 350, avgDuration: 175 },
  { district: "Chennai East", clearance: 1.18, backlog: 190, avgDuration: 142 },
  { district: "Chennai West", clearance: 1.08, backlog: 210, avgDuration: 160 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Judicial performance metrics and insights</p>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Data Range</CardTitle>
                <CardDescription>Filter the analytics data</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                <Select defaultValue="2024">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="case-processing">Case Processing</TabsTrigger>
          <TabsTrigger value="district-performance">District Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Case Clearance Rate</CardTitle>
                <CardDescription>
                  Ratio of cases disposed to cases filed (target value: 1.0+)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={caseClearanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0.8, 1.2]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="clearance"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#10b981"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cases by Type</CardTitle>
                <CardDescription>Distribution across categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={caseByTypeData}
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="type" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Case Processing</CardTitle>
                <CardDescription>Cases processed by category over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={caseProcessingData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="criminal" stackId="a" fill="#ef4444" />
                    <Bar dataKey="civil" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="family" stackId="a" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="case-processing">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Processing Metrics</CardTitle>
                <CardDescription>Detailed analysis of case processing times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-2">
                <p className="text-center text-muted-foreground">
                  Detailed case processing analytics would be displayed here
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="district-performance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>District Performance Comparison</CardTitle>
                <CardDescription>Comparative analysis of judicial districts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 pt-2">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium">District</th>
                        <th className="text-left py-3 font-medium">Clearance Rate</th>
                        <th className="text-left py-3 font-medium">Case Backlog</th>
                        <th className="text-left py-3 font-medium">Avg. Duration (Days)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {districtPerformanceData.map((district, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="py-4">{district.district}</td>
                          <td className={`py-4 ${district.clearance >= 1.0 ? "text-green-600" : "text-amber-600"}`}>
                            {district.clearance.toFixed(2)}
                          </td>
                          <td className="py-4">{district.backlog}</td>
                          <td className="py-4">{district.avgDuration} days</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Analytics;
