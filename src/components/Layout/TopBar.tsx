
import { Bell, Search, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="hidden md:flex">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search cases, people, documents..."
                className="h-9 rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">Notifications</span>
                <Button variant="ghost" size="sm" className="text-xs">
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">New case assigned</span>
                      <span className="text-xs text-muted-foreground">2h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Case #23456 has been assigned to you</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Hearing rescheduled</span>
                      <span className="text-xs text-muted-foreground">5h ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Case #12345 hearing moved to May 15th</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Document uploaded</span>
                      <span className="text-xs text-muted-foreground">1d ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Evidence document for Case #34567 uploaded</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full h-8 w-8 bg-navy-100 text-navy-800"
              >
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="rounded-full h-8 w-8 bg-navy-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-navy-800" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Justice Patel</span>
                  <span className="text-xs text-muted-foreground">judge@courts.gov.in</span>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border-t md:hidden px-4 py-2">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search cases, people, documents..."
            className="h-9 rounded-md border border-input bg-background px-9 py-2 text-sm w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default TopBar;
