
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import CaseTable from "@/components/Dashboard/CaseTable";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data
const allCases = [
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
  {
    id: "6",
    title: "Reddy vs. Chennai Municipal Authority",
    number: "CV-2024-0238",
    priority: "medium" as const,
    status: "pending" as const,
    type: "Civil",
    date: "May 4, 2024",
  },
  {
    id: "7",
    title: "State of Tamil Nadu vs. Krishnan",
    number: "CR-2024-0189",
    priority: "high" as const,
    status: "active" as const,
    type: "Criminal",
    date: "May 3, 2024",
  },
  {
    id: "8",
    title: "ABD Industries vs. Singh Enterprises",
    number: "CM-2024-0452",
    priority: "low" as const,
    status: "closed" as const,
    type: "Commercial",
    date: "May 2, 2024",
  },
  {
    id: "9",
    title: "Mumbai Housing Authority vs. Desai",
    number: "PR-2024-0125",
    priority: "medium" as const,
    status: "pending" as const,
    type: "Property",
    date: "May 1, 2024",
  },
  {
    id: "10",
    title: "National Bank vs. Joshi Holdings",
    number: "BK-2024-0326",
    priority: "high" as const,
    status: "closed" as const,
    type: "Banking",
    date: "April 30, 2024",
  },
];

const activeCases = allCases.filter(c => c.status === "active");
const scheduledCases = allCases.filter(c => c.status === "scheduled");
const pendingCases = allCases.filter(c => c.status === "pending");
const closedCases = allCases.filter(c => c.status === "closed");

const typeFilters = [
  "Criminal",
  "Civil",
  "Family",
  "Tax",
  "Banking",
  "Commercial",
  "Property",
];

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Case Management</h1>
          <p className="text-muted-foreground">View and manage all cases</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Case</span>
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <form onSubmit={handleSearch} className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search case number, title, parties..."
                className="pl-9 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    {selectedTypes.length > 0 && (
                      <Badge variant="secondary" className="ml-1 rounded-full px-1 py-0 text-xs">
                        {selectedTypes.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Case Types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {typeFilters.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => handleTypeFilter(type)}
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedTypes.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <Button 
                        variant="ghost" 
                        className="w-full text-xs justify-center h-8" 
                        onClick={() => setSelectedTypes([])}
                      >
                        Clear filters
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All Cases <Badge variant="secondary" className="ml-1">{allCases.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active <Badge variant="secondary" className="ml-1">{activeCases.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scheduled">
            Scheduled <Badge variant="secondary" className="ml-1">{scheduledCases.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending <Badge variant="secondary" className="ml-1">{pendingCases.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed <Badge variant="secondary" className="ml-1">{closedCases.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all">
            <CaseTable 
              cases={allCases} 
              title="All Cases" 
              description={`${allCases.length} cases in total`} 
            />
          </TabsContent>
          <TabsContent value="active">
            <CaseTable 
              cases={activeCases} 
              title="Active Cases" 
              description={`${activeCases.length} active cases`} 
            />
          </TabsContent>
          <TabsContent value="scheduled">
            <CaseTable 
              cases={scheduledCases} 
              title="Scheduled Cases" 
              description={`${scheduledCases.length} cases with scheduled hearings`} 
            />
          </TabsContent>
          <TabsContent value="pending">
            <CaseTable 
              cases={pendingCases} 
              title="Pending Cases" 
              description={`${pendingCases.length} cases pending action`} 
            />
          </TabsContent>
          <TabsContent value="closed">
            <CaseTable 
              cases={closedCases} 
              title="Closed Cases" 
              description={`${closedCases.length} resolved cases`} 
            />
          </TabsContent>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default Cases;
