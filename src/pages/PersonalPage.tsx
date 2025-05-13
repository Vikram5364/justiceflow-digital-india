
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Settings,
  Bell,
  FileText,
  Calendar,
  Shield,
  ChevronRight,
  MessageSquare,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const PersonalPage = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [notificationCount, setNotificationCount] = useState<number>(3);
  
  const clearNotifications = () => {
    setNotificationCount(0);
    toast.success("All notifications marked as read");
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Portal</h1>
        <p className="text-muted-foreground">
          Manage your account, cases, and notifications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex flex-col items-center py-4">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" />
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Arun Patel</h3>
              <p className="text-muted-foreground">Plaintiff</p>
            </div>
            
            <Separator className="my-4" />
            
            <nav className="space-y-1">
              <Button 
                variant={activeTab === "profile" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
              <Button 
                variant={activeTab === "cases" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("cases")}
              >
                <FileText className="mr-2 h-4 w-4" />
                My Cases
              </Button>
              <Button 
                variant={activeTab === "hearings" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("hearings")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                My Hearings
              </Button>
              <Button 
                variant={activeTab === "notifications" ? "secondary" : "ghost"} 
                className="w-full justify-start flex items-center" 
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                <span className="flex-1 text-left">Notifications</span>
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="ml-auto">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
              <Button 
                variant={activeTab === "settings" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Main content */}
        <Card className="lg:col-span-3">
          <TabsContent value="profile" className="m-0" active={activeTab === "profile"}>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Full Name</h3>
                  <p>Arun Patel</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Email Address</h3>
                  <p>arun.patel@example.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Phone Number</h3>
                  <p>+91 9876543210</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Address</h3>
                  <p>123 Main Street, Mumbai, Maharashtra</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Identity Verification</h3>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <p>Your identity has been verified</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit Profile</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="cases" className="m-0" active={activeTab === "cases"}>
            <CardHeader>
              <CardTitle>My Cases</CardTitle>
              <CardDescription>
                Track and manage your legal cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Card>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Patel vs. Gujarat Tax Authority</CardTitle>
                        <CardDescription>TX-2024-0892 • Tax Dispute</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">Scheduled</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm mb-2">
                      <span className="font-medium">Next Hearing:</span> May 28, 2024
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Judge:</span> Justice S. Kumar
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex gap-2 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Join Virtual Hearing
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Patel vs. Mumbai Housing Society</CardTitle>
                        <CardDescription>CV-2023-1245 • Civil Dispute</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm mb-2">
                      <span className="font-medium">Next Hearing:</span> June 12, 2024
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Judge:</span> Justice A. Kapoor
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 flex gap-2 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Counsel
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All Cases</Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="hearings" className="m-0" active={activeTab === "hearings"}>
            <CardHeader>
              <CardTitle>My Hearings</CardTitle>
              <CardDescription>
                Upcoming and past hearing sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Upcoming Hearings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">May 28, 2024 at 10:00 AM</p>
                        <p className="text-sm text-muted-foreground">TX-2024-0892 • Courtroom 5B</p>
                      </div>
                      <Button size="sm">
                        <Video className="mr-2 h-4 w-4" />
                        Join Virtual
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">June 12, 2024 at 2:30 PM</p>
                        <p className="text-sm text-muted-foreground">CV-2023-1245 • Courtroom 3A</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Past Hearings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">April 15, 2024 at 11:30 AM</p>
                        <p className="text-sm text-muted-foreground">TX-2024-0892 • Courtroom 5B</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Summary
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="notifications" className="m-0" active={activeTab === "notifications"}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Alerts and updates about your cases and hearings
                </CardDescription>
              </div>
              {notificationCount > 0 && (
                <Button variant="outline" onClick={clearNotifications}>
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {notificationCount === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    You have no unread notifications
                  </p>
                ) : (
                  <>
                    <div className="flex items-start p-3 border-l-2 border-blue-500 bg-blue-50/50 rounded-sm">
                      <Bell className="h-5 w-5 mr-3 mt-0.5 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Virtual Hearing Reminder</p>
                        <p className="text-sm text-muted-foreground">Your hearing for case TX-2024-0892 is scheduled for tomorrow at 10:00 AM.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-start p-3 border-l-2 border-green-500 bg-green-50/50 rounded-sm">
                      <FileText className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">Document Uploaded</p>
                        <p className="text-sm text-muted-foreground">New document "Tax Assessment Report" has been added to your case.</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-start p-3 border-l-2 border-amber-500 bg-amber-50/50 rounded-sm">
                      <Calendar className="h-5 w-5 mr-3 mt-0.5 text-amber-500" />
                      <div className="flex-1">
                        <p className="font-medium">Hearing Date Changed</p>
                        <p className="text-sm text-muted-foreground">The hearing for case CV-2023-1245 has been rescheduled to June 12, 2024.</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="settings" className="m-0" active={activeTab === "settings"}>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-3">Notification Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <p>Email notifications</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <p>SMS alerts</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <p>Push notifications</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Account Security</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <p>Change password</p>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <p>Two-factor authentication</p>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Privacy Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <p>Data sharing preferences</p>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PersonalPage;
