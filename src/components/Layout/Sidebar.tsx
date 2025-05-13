
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Gavel, 
  Calendar, 
  BarChart3, 
  Settings,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  isOpen: boolean;
}

const SidebarItem = ({ icon, label, href, isActive, isOpen }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        {icon}
      </div>
      {isOpen && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar transition-all duration-300",
          isOpen ? "w-64" : "w-20",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <Gavel className="h-5 w-5 text-primary" />
            </div>
            {isOpen && (
              <span className="justice-flow-logo text-xl font-bold text-sidebar-foreground">
                JusticeFlow
              </span>
            )}
          </div>
          <button 
            className="hidden lg:block text-sidebar-foreground hover:text-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Dashboard"
              href="/"
              isActive={pathname === "/"}
              isOpen={isOpen}
            />
            <SidebarItem 
              icon={<FileText className="h-5 w-5" />}
              label="Cases"
              href="/cases"
              isActive={pathname === "/cases"}
              isOpen={isOpen}
            />
            <SidebarItem 
              icon={<Calendar className="h-5 w-5" />}
              label="Schedule"
              href="/schedule"
              isActive={pathname === "/schedule"}
              isOpen={isOpen}
            />
            <SidebarItem 
              icon={<Users className="h-5 w-5" />}
              label="Personnel"
              href="/personnel"
              isActive={pathname === "/personnel"}
              isOpen={isOpen}
            />
            <SidebarItem 
              icon={<BarChart3 className="h-5 w-5" />}
              label="Analytics"
              href="/analytics"
              isActive={pathname === "/analytics"}
              isOpen={isOpen}
            />
          </div>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-sidebar-border py-4 px-3">
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            href="/settings"
            isActive={pathname === "/settings"}
            isOpen={isOpen}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
