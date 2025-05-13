
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  ChevronLeft,
  FileText,
  Users,
  Gavel,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Case, getCaseById, getRelatedCases } from "@/services/caseService";
import CaseTable from "@/components/Dashboard/CaseTable";

// Status and priority styling
const statusClass = {
  active: "bg-blue-100 text-blue-800",
  scheduled: "bg-purple-100 text-purple-800",
  pending: "bg-gray-100 text-gray-800",
  closed: "bg-green-100 text-green-800",
};

const statusLabel = {
  active: "In Progress",
  scheduled: "Scheduled",
  pending: "Pending",
  closed: "Closed",
};

const priorityClass = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-green-100 text-green-800",
};

const priorityLabel = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const CaseDetails = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const [caseDetails, setCaseDetails] = useState<Case | null>(null);
  const [relatedCases, setRelatedCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (caseId) {
      // Get case details
      const details = getCaseById(caseId);
      if (details) {
        setCaseDetails(details);
        // Get related cases
        const related = getRelatedCases(caseId);
        setRelatedCases(related);
      }
      setLoading(false);
    }
  }, [caseId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading case details...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!caseDetails) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <h2 className="text-xl font-bold">Case Not Found</h2>
          <p className="text-muted-foreground">
            The case you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate("/cases")}>Back to Cases</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{caseDetails.title}</h1>
            <p className="text-muted-foreground">#{caseDetails.number}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(priorityClass[caseDetails.priority])}
            >
              {priorityLabel[caseDetails.priority]} Priority
            </Badge>
            <Badge
              variant="outline"
              className={cn(statusClass[caseDetails.status])}
            >
              {statusLabel[caseDetails.status]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Case Information</CardTitle>
            <CardDescription>
              Case opened on {caseDetails.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-muted-foreground">
                  {caseDetails.description || "No description available."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Parties
                    </h4>
                    <div className="mt-2 text-sm">
                      <div className="mb-2">
                        <span className="font-medium">Plaintiff:</span>{" "}
                        {caseDetails.plaintiff}
                      </div>
                      <div>
                        <span className="font-medium">Defendant:</span>{" "}
                        {caseDetails.defendant}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Gavel className="h-4 w-4" />
                      Court Assignment
                    </h4>
                    <div className="mt-2 text-sm">
                      <div className="mb-2">
                        <span className="font-medium">Judge:</span>{" "}
                        {caseDetails.judge || "Not assigned"}
                      </div>
                      <div>
                        <span className="font-medium">Courtroom:</span>{" "}
                        {caseDetails.courtroom || "Not assigned"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Schedule
                    </h4>
                    <div className="mt-2 text-sm">
                      <div>
                        <span className="font-medium">Next Hearing:</span>{" "}
                        {caseDetails.nextHearingDate || "Not scheduled"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Case Type
                    </h4>
                    <div className="mt-2 text-sm">
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {caseDetails.type}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Cases */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Related Cases
            </CardTitle>
            <CardDescription>
              Cases related to this matter
            </CardDescription>
          </CardHeader>
          <CardContent>
            {relatedCases.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No related cases found
              </p>
            ) : (
              <ul className="space-y-4">
                {relatedCases.map((relatedCase) => (
                  <li
                    key={relatedCase.id}
                    className="border rounded-md p-3 hover:bg-muted/50 transition-colors"
                  >
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium justify-start text-left"
                      onClick={() => navigate(`/cases/${relatedCase.id}`)}
                    >
                      {relatedCase.title}
                    </Button>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">
                        #{relatedCase.number}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(statusClass[relatedCase.status], "text-xs")}
                      >
                        {statusLabel[relatedCase.status]}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">Case History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Case Documents</CardTitle>
                <CardDescription>
                  All documents related to this case
                </CardDescription>
              </CardHeader>
              <CardContent>
                {caseDetails.documents && caseDetails.documents.length > 0 ? (
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-3 text-left font-medium">Title</th>
                          <th className="pb-3 text-left font-medium">Type</th>
                          <th className="pb-3 text-left font-medium">Date</th>
                          <th className="pb-3 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {caseDetails.documents.map((doc) => (
                          <tr key={doc.id} className="border-b last:border-0">
                            <td className="py-3">{doc.title}</td>
                            <td className="py-3">{doc.type}</td>
                            <td className="py-3">{doc.date}</td>
                            <td className="py-3 text-right">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">
                    No documents available for this case
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Case History</CardTitle>
                <CardDescription>Timeline of events for this case</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Case history will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Case Notes</CardTitle>
                <CardDescription>Private notes for this case</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Case notes will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </DashboardLayout>
  );
};

export default CaseDetails;
