
import { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LegalChatbot from "@/components/LegalAssistant/LegalChatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { File, Upload, Download, Book, Archive } from "lucide-react";

const recentDocuments = [
  { id: "1", name: "State vs. Patel - Case Brief.pdf", size: "2.4 MB", date: "May 10, 2025" },
  { id: "2", name: "Property Dispute Evidence.docx", size: "1.8 MB", date: "May 9, 2025" },
  { id: "3", name: "Witness Statement - Sharma.pdf", size: "3.1 MB", date: "May 7, 2025" },
  { id: "4", name: "Contract Analysis.pdf", size: "1.2 MB", date: "May 5, 2025" },
];

const savedResearches = [
  { id: "1", title: "Precedents for property boundary disputes", date: "May 8, 2025" },
  { id: "2", title: "Recent judgments on domestic violence act", date: "May 6, 2025" },
  { id: "3", title: "Analysis of traffic violation penalties", date: "May 2, 2025" },
];

interface DocumentCardProps {
  name: string;
  size: string;
  date: string;
}

const DocumentCard = ({ name, size, date }: DocumentCardProps) => (
  <Card className="mb-3">
    <CardContent className="p-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-primary/10 p-2 rounded mr-3">
          <File className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">
            {size} • {date}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <Download className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const LegalResearch = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold">Legal Research Assistant</h1>
            <p className="text-muted-foreground">
              AI-powered research with multilingual document analysis
            </p>
          </div>
          <div className="mt-2 md:mt-0">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LegalChatbot />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>
                Documents you've recently worked with
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <ScrollArea className="h-[220px]">
                {recentDocuments.map((doc) => (
                  <DocumentCard 
                    key={doc.id} 
                    name={doc.name} 
                    size={doc.size} 
                    date={doc.date} 
                  />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Saved Research</CardTitle>
              <CardDescription>
                Your saved research queries and results
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <ScrollArea className="h-[160px]">
                {savedResearches.map((research) => (
                  <Card key={research.id} className="mb-3">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-secondary/20 p-2 rounded mr-3">
                          <Book className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{research.title}</p>
                          <p className="text-xs text-muted-foreground">{research.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LegalResearch;
