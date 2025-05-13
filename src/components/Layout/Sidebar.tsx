
import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart2,
  Video,
  User,
  Scale,
  Book,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/use-language";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    {
      title: t("dashboard"),
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/",
    },
    {
      title: t("cases"),
      icon: <FileText className="h-5 w-5" />,
      href: "/cases",
    },
    {
      title: t("schedule"),
      icon: <Calendar className="h-5 w-5" />,
      href: "/schedule",
    },
    {
      title: t("analytics"),
      icon: <BarChart2 className="h-5 w-5" />,
      href: "/analytics",
    },
    {
      title: t("virtualCourtroom"),
      icon: <Video className="h-5 w-5" />,
      href: "/virtual-courtroom",
    },
    {
      title: "Legal Research",
      icon: <Book className="h-5 w-5" />,
      href: "/legal-research",
    },
    {
      title: t("personal"),
      icon: <User className="h-5 w-5" />,
      href: "/personal",
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-background border-r transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center px-4 border-b">
        <Link to="/" className="flex items-center">
          {isOpen ? (
            <>
              <Scale className="h-6 w-6 text-primary mr-2" />
              <span className="font-bold text-lg">Nyay Portal</span>
            </>
          ) : (
            <Scale className="h-6 w-6 text-primary mx-auto" />
          )}
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col p-2">
          {navItems.map((item) => (
            <Tooltip key={item.href} delayDuration={!isOpen ? 100 : 1000000}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "",
                    !isOpen && "justify-center px-0"
                  )}
                >
                  {item.icon}
                  {isOpen && <span>{item.title}</span>}
                </Link>
              </TooltipTrigger>
              {!isOpen && <TooltipContent side="right">{item.title}</TooltipContent>}
            </Tooltip>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-center",
            isOpen && "justify-between"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <span className="sr-only">Collapse</span>
              <ChevronLeft className="h-5 w-5" />
            </>
          ) : (
            <>
              <span className="sr-only">Expand</span>
              <ChevronRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
