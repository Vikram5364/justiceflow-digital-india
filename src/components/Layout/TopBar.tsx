
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/use-language";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex md:w-64 lg:w-96">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="w-full bg-background pl-8 md:max-w-sm lg:max-w-md"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSelector />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[calc(20rem-2rem)] overflow-auto">
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div>
                    <p className="font-medium">Upcoming Hearing</p>
                    <p className="text-sm text-muted-foreground">
                      Sharma vs. Delhi Municipal Corporation - 2:00 PM Today
                    </p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div>
                    <p className="font-medium">Document Approved</p>
                    <p className="text-sm text-muted-foreground">
                      Property deed verification has been approved
                    </p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3">
                  <div>
                    <p className="font-medium">New Case Assignment</p>
                    <p className="text-sm text-muted-foreground">
                      You've been assigned to case #CR-2024-0182
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="Justice Patel" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Justice M. Patel</p>
                  <p className="text-xs text-muted-foreground">
                    justice.patel@judiciary.gov.in
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
