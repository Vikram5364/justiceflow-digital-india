
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Import correct DayPicker component types
import { DayContentProps } from "react-day-picker";

// Mock data
const hearings = [
  {
    id: "h1",
    caseNumber: "CR-2024-0156",
    date: "2024-05-25",
    time: "10:00 AM",
    courtroom: "3A",
    type: "Criminal",
  },
  {
    id: "h2",
    caseNumber: "TX-2024-0892",
    date: "2024-05-28",
    time: "11:30 AM",
    courtroom: "5B",
    type: "Tax",
  },
  {
    id: "h3",
    caseNumber: "CV-2024-0325",
    date: "2024-06-05",
    time: "2:00 PM",
    courtroom: "2A",
    type: "Civil",
  },
  {
    id: "h4",
    caseNumber: "BK-2024-0218",
    date: "2024-05-22",
    time: "9:00 AM",
    courtroom: "1A",
    type: "Banking",
  },
  {
    id: "h5",
    caseNumber: "FM-2024-0422",
    date: "2024-05-30",
    time: "3:30 PM",
    courtroom: "2C",
    type: "Family",
  },
  {
    id: "h6",
    caseNumber: "CV-2024-0238",
    date: "2024-06-10",
    time: "1:00 PM",
    courtroom: "4B",
    type: "Civil",
  },
  {
    id: "h7",
    caseNumber: "CR-2024-0189",
    date: "2024-05-20",
    time: "10:30 AM",
    courtroom: "3B",
    type: "Criminal",
  },
  {
    id: "h8",
    caseNumber: "PR-2024-0125",
    date: "2024-06-15",
    time: "11:00 AM",
    courtroom: "5C",
    type: "Property",
  },
];

// Check if date has a hearing
const hasHearings = (date: Date) => {
  return hearings.some((hearing) =>
    isSameDay(new Date(hearing.date), date)
  );
};

const Schedule = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [selectedType, setSelectedType] = useState<string>("All");
  const [filteredHearings, setFilteredHearings] = useState(hearings);

  // Filter hearings by type
  const filterHearings = (type: string) => {
    setSelectedType(type);
    if (type === "All") {
      setFilteredHearings(hearings);
    } else {
      const filtered = hearings.filter((hearing) => hearing.type === type);
      setFilteredHearings(filtered);
    }
  };

  // Get hearings for selected date
  const selectedDateHearings = filteredHearings.filter((hearing) =>
    isSameDay(new Date(hearing.date), selected as Date)
  );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hearing Schedule</h1>
            <p className="text-muted-foreground">
              View and manage upcoming court hearings
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Hearing
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar Card */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Hearing Schedule</CardTitle>
            <CardDescription>View and manage upcoming court hearings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  className="rounded-md border"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground",
                  }}
                  modifiers={{
                    hasHearing: (date) => hasHearings(date),
                  }}
                  components={{
                    Day: (props: DayContentProps) => {
                      if (!props || !props.date) {
                        return null;
                      }
                      
                      return (
                        <div
                          className={cn("relative", props.className)}
                        >
                          {props.children}
                          {hasHearings(props.date) && (
                            <div className="absolute w-1 h-1 bg-primary rounded-full bottom-1 left-1/2 transform -translate-x-1/2" />
                          )}
                        </div>
                      );
                    },
                  }}
                />
              </div>
              
              {/* Hearings List */}
              <div className="md:w-64">
                <h3 className="text-sm font-medium mb-2">
                  Hearings on{" "}
                  {selected ? format(selected, "MMMM dd, yyyy") : "Select a date"}
                </h3>
                <Separator />
                <div className="mt-4 space-y-2">
                  {selectedDateHearings.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No hearings scheduled for this day.
                    </p>
                  ) : (
                    selectedDateHearings.map((hearing) => (
                      <div
                        key={hearing.id}
                        className="flex items-center justify-between border rounded-md p-2"
                      >
                        <div>
                          <p className="text-sm font-medium">{hearing.time}</p>
                          <p className="text-xs text-muted-foreground">
                            {hearing.caseNumber} - Courtroom {hearing.courtroom}
                          </p>
                        </div>
                        <Badge variant="secondary">{hearing.type}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Upcoming Hearings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Hearings</CardTitle>
              <CardDescription>Filter by case type</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={filterHearings} defaultValue="All">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Criminal">Criminal</SelectItem>
                  <SelectItem value="Tax">Tax</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="Banking">Banking</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Property">Property</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Hearings</CardTitle>
              <CardDescription>Next 5 hearings</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredHearings.slice(0, 5).map((hearing) => (
                <div
                  key={hearing.id}
                  className="flex items-center justify-between border rounded-md p-2 mb-2 last:mb-0"
                >
                  <div>
                    <p className="text-sm font-medium">{hearing.time}</p>
                    <p className="text-xs text-muted-foreground">
                      {hearing.caseNumber} - Courtroom {hearing.courtroom}
                    </p>
                  </div>
                  <Badge variant="secondary">{hearing.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
