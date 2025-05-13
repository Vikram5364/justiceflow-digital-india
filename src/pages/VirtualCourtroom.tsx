
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Phone,
  MessageSquare,
  Users,
  FileText,
  Gavel,
  Clock,
} from "lucide-react";

const VirtualCourtroom = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("meeting");
  const [isWaitingRoom, setIsWaitingRoom] = useState(true);

  // Mock case data
  const caseDetails = {
    id: "3",
    title: "Sharma vs. Delhi Municipal Corporation",
    number: "CV-2024-0325",
    type: "Civil",
    judge: "Justice M. Singh",
    startTime: "10:00 AM",
    duration: "45 minutes",
    status: "pending",
  };

  const joinSession = () => {
    setIsWaitingRoom(false);
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    // In a real app, this would close the connection
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Virtual Courtroom</h1>
            <p className="text-muted-foreground">
              Remote hearing session for domestic and civil cases
            </p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            {isSessionActive ? (
              <Button variant="destructive" onClick={endSession}>
                <Phone className="mr-2 h-4 w-4" />
                End Session
              </Button>
            ) : (
              <Button
                onClick={joinSession}
                disabled={!isWaitingRoom}
              >
                <Video className="mr-2 h-4 w-4" />
                Join Session
              </Button>
            )}
          </div>
        </div>
      </div>

      {isWaitingRoom ? (
        <Card className="mb-6">
          <CardHeader className="bg-muted">
            <CardTitle>Waiting Room</CardTitle>
            <CardDescription>
              You'll be able to join the virtual courtroom when the judge allows
              entry
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid gap-1">
                <h3 className="font-medium">Case Details</h3>
                <p>
                  <span className="font-medium">Case Number:</span> {caseDetails.number}
                </p>
                <p>
                  <span className="font-medium">Title:</span> {caseDetails.title}
                </p>
                <p>
                  <span className="font-medium">Type:</span>{" "}
                  <Badge variant="outline">{caseDetails.type}</Badge>
                </p>
              </div>

              <Separator />

              <div className="grid gap-1">
                <h3 className="font-medium">Hearing Information</h3>
                <p>
                  <span className="font-medium">Judge:</span> {caseDetails.judge}
                </p>
                <p>
                  <span className="font-medium">Start Time:</span>{" "}
                  {caseDetails.startTime}
                </p>
                <p>
                  <span className="font-medium">Expected Duration:</span>{" "}
                  {caseDetails.duration}
                </p>
              </div>

              <div className="flex items-center p-4 bg-blue-50 text-blue-800 rounded-md">
                <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  Your hearing is scheduled to begin shortly. Please ensure your
                  camera and microphone are working properly before joining.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted/50">
            <Button variant="outline" onClick={() => window.history.back()}>
              Return to Dashboard
            </Button>
            <Button onClick={joinSession}>
              <Video className="mr-2 h-4 w-4" />
              Join Now
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main video area */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center">
                  {isSessionActive ? (
                    <div className="relative w-full h-full">
                      {/* This would be replaced with actual video component */}
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-red-500">LIVE</Badge>
                      </div>
                      <div className="flex items-center justify-center h-full text-white">
                        <p>Video Stream Would Appear Here</p>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={joinSession}>
                      <Video className="mr-2 h-4 w-4" />
                      Join Session
                    </Button>
                  )}
                </div>
              </Card>

              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="participants" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Docs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="participants">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle>Participants (5)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center mr-3">
                              <Gavel className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Justice M. Singh</p>
                              <p className="text-xs text-muted-foreground">Judge</p>
                            </div>
                          </div>
                          <Badge>Speaking</Badge>
                        </div>

                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center mr-3">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Vikram Sharma</p>
                              <p className="text-xs text-muted-foreground">Plaintiff</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center mr-3">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Representative</p>
                              <p className="text-xs text-muted-foreground">Delhi Municipal Corp</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="chat">
                  <Card className="h-[400px] flex flex-col">
                    <CardHeader className="py-3">
                      <CardTitle>Session Chat</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                      <div className="p-3 space-y-4">
                        <div className="flex flex-col">
                          <p className="text-xs text-muted-foreground">Justice M. Singh</p>
                          <div className="bg-muted p-2 rounded-md mt-1">
                            <p className="text-sm">Let's begin the proceedings for case CV-2024-0325.</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-3">
                      <div className="relative w-full">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="w-full p-2 pr-12 border rounded-md"
                        />
                        <Button className="absolute right-1 top-1" size="sm">
                          Send
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle>Case Documents</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-3" />
                            <p className="text-sm">Property Documents</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-3" />
                            <p className="text-sm">Demolition Notice</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        <div className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-3" />
                            <p className="text-sm">Site Photographs</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle>Case Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Case Number</p>
                    <p className="text-sm">{caseDetails.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Title</p>
                    <p className="text-sm">{caseDetails.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-sm">{caseDetails.type}</p>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Case Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default VirtualCourtroom;
