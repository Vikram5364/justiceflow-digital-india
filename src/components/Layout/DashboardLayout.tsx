
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
