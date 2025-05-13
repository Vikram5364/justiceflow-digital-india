
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

// Mock data
const hearings = [
  {
    id: "1",
    caseNumber: "CR-2024-0156",
    caseTitle: "State of Maharashtra vs. Sharma",
    date: new Date(2024, 4, 14), // May 14, 2024
    time: "10:30 AM",
    courtroom: "Courtroom 3A",
    judge: "Justice A. Patel",
    type: "Trial",
  },
  {
    id: "2",
    caseNumber: "TX-2024-0892",
    caseTitle: "Patel Industries vs. Gujarat Tax Authority",
    date: new Date(2024, 4, 15), // May 15, 2024
    time: "2:00 PM",
    courtroom: "Courtroom 5B",
    judge: "Justice S. Kumar",
    type: "Hearing",
  },
  {
    id: "3",
    caseNumber: "FM-2024-0422",
    caseTitle: "Kumar vs. Kumar (Divorce)",
    date: new Date(2024, 4, 16), // May 16, 2024
    time: "11:00 AM",
    courtroom: "Courtroom 2C",
    judge: "Justice M. Reddy",
    type: "Conference",
  },
  {
    id: "4",
    caseNumber: "CV-2024-0325",
    caseTitle: "Sharma vs. Delhi Municipal Corporation",
    date: new Date(2024, 4, 17), // May 17, 2024
    time: "10:00 AM",
    courtroom: "Courtroom 4A",
    judge: "Justice B. Singh",
    type: "Motion",
  },
  {
    id: "5",
    caseNumber: "CR-2024-0189",
    caseTitle: "State of Tamil Nadu vs. Krishnan",
    date: new Date(2024, 4, 17), // May 17, 2024
    time: "2:30 PM",
    courtroom: "Courtroom 3B",
    judge: "Justice A. Patel",
    type: "Trial",
  },
  {
    id: "6",
    caseNumber: "BK-2024-0218",
    caseTitle: "United Bank vs. Mehta Enterprises",
    date: new Date(2024, 4, 20), // May 20, 2024
    time: "11:30 AM",
    courtroom: "Courtroom 1A",
    judge: "Justice D. Gupta",
    type: "Hearing",
  },
];

// Function to get hearings for a specific date
const getHearingsForDate = (date: Date) => {
  return hearings.filter(hearing => {
    const hearingDate = new Date(hearing.date);
    return (
      hearingDate.getDate() === date.getDate() &&
      hearingDate.getMonth() === date.getMonth() &&
      hearingDate.getFullYear() === date.getFullYear()
    );
  });
};

// Function to check if a date has hearings
const hasHearings = (date: Date) => {
  return getHearingsForDate(date).length > 0;
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

const Schedule = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedJudge, setSelectedJudge] = useState<string>("all");
  const [selectedCourtroom, setSelectedCourtroom] = useState<string>("all");

  const dateHearings = getHearingsForDate(selectedDate);

  // Filter hearings based on judge and courtroom
  const filteredHearings = dateHearings.filter(hearing => {
    const judgeMatch = selectedJudge === "all" || hearing.judge.includes(selectedJudge);
    const courtroomMatch = selectedCourtroom === "all" || hearing.courtroom === selectedCourtroom;
    return judgeMatch && courtroomMatch;
  });

  // Get unique judges and courtrooms for filters
  const uniqueJudges = Array.from(new Set(hearings.map(h => h.judge)));
  const uniqueCourtrooms = Array.from(new Set(hearings.map(h => h.courtroom)));

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Court Schedule</h1>
          <p className="text-muted-foreground">Manage hearings and court calendar</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Schedule Hearing</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view hearings</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || today)}
              className="w-full"
              modifiersStyles={{
                selected: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                },
              }}
              modifiers={{
                hasHearing: (date) => hasHearings(date),
              }}
              styles={{
                day: (date) => {
                  if (hasHearings(date)) {
                    return {
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        bottom: "2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "hsl(var(--primary))",
                      },
                    };
                  }
                  return {};
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Daily Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>{formatDate(selectedDate)}</CardTitle>
                <CardDescription>
                  {filteredHearings.length} hearing{filteredHearings.length !== 1 ? "s" : ""} scheduled
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => {
                  const previousDay = new Date(selectedDate);
                  previousDay.setDate(previousDay.getDate() - 1);
                  setSelectedDate(previousDay);
                }}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  const nextDay = new Date(selectedDate);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setSelectedDate(nextDay);
                }}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Judge</label>
                <Select value={selectedJudge} onValueChange={setSelectedJudge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Judge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Judges</SelectItem>
                      {uniqueJudges.map((judge, index) => (
                        <SelectItem key={index} value={judge}>{judge}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium block mb-2">Courtroom</label>
                <Select value={selectedCourtroom} onValueChange={setSelectedCourtroom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Courtroom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All Courtrooms</SelectItem>
                      {uniqueCourtrooms.map((courtroom, index) => (
                        <SelectItem key={index} value={courtroom}>{courtroom}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredHearings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No hearings scheduled for this date</p>
                </div>
              ) : (
                filteredHearings.map(hearing => (
                  <Card key={hearing.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-lg">{hearing.time}</h3>
                            <Badge className={cn("bg-purple-100 text-purple-800")}>
                              {hearing.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{hearing.courtroom}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <p className="font-medium">{hearing.caseTitle}</p>
                        <p className="text-sm text-muted-foreground">#{hearing.caseNumber}</p>
                      </div>

                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Judge:</span> {hearing.judge}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
