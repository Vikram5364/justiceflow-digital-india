
import { toast } from "sonner";

export interface Case {
  id: string;
  title: string;
  number: string;
  priority: "high" | "medium" | "low";
  status: "active" | "scheduled" | "pending" | "closed";
  type: string;
  date: string;
  description?: string;
  plaintiff?: string;
  defendant?: string;
  judge?: string;
  courtroom?: string;
  nextHearingDate?: string;
  documents?: { id: string; title: string; date: string; type: string }[];
}

// Mock data
let allCases: Case[] = [
  {
    id: "1",
    title: "State of Maharashtra vs. Sharma",
    number: "CR-2024-0156",
    priority: "high",
    status: "active",
    type: "Criminal",
    date: "May 12, 2024",
    description: "Criminal case involving allegations of financial fraud and misappropriation of public funds. The defendant is charged under sections 420 and 409 of the IPC.",
    plaintiff: "State of Maharashtra",
    defendant: "Rajesh Sharma",
    judge: "Justice A. Patel",
    courtroom: "Courtroom 3A",
    nextHearingDate: "May 25, 2024",
    documents: [
      { id: "d1", title: "Charge Sheet", date: "April 15, 2024", type: "Legal Document" },
      { id: "d2", title: "Evidence Report", date: "April 30, 2024", type: "Evidence" },
      { id: "d3", title: "Witness Statement", date: "May 5, 2024", type: "Testimony" }
    ],
  },
  {
    id: "2",
    title: "Patel Industries vs. Gujarat Tax Authority",
    number: "TX-2024-0892",
    priority: "medium",
    status: "scheduled",
    type: "Tax",
    date: "May 10, 2024",
    description: "Tax dispute regarding GST calculation and input credit claims. Petitioner challenges the assessment order dated January 15, 2024.",
    plaintiff: "Patel Industries Ltd.",
    defendant: "Gujarat Tax Authority",
    judge: "Justice S. Kumar",
    courtroom: "Courtroom 5B",
    nextHearingDate: "May 28, 2024",
    documents: [
      { id: "d4", title: "Assessment Order", date: "January 15, 2024", type: "Legal Document" },
      { id: "d5", title: "Tax Return Filings", date: "February 2, 2024", type: "Financial Document" },
      { id: "d6", title: "Expert Opinion", date: "March 10, 2024", type: "Expert Report" }
    ],
  },
  {
    id: "3",
    title: "Sharma vs. Delhi Municipal Corporation",
    number: "CV-2024-0325",
    priority: "low",
    status: "pending",
    type: "Civil",
    date: "May 8, 2024",
    description: "Civil dispute regarding property demolition by municipal authorities. The petitioner claims lack of proper notice and violation of due process.",
    plaintiff: "Vikram Sharma",
    defendant: "Delhi Municipal Corporation",
    judge: "Justice M. Singh",
    courtroom: "Courtroom 2A",
    nextHearingDate: "June 5, 2024",
    documents: [
      { id: "d7", title: "Property Documents", date: "March 5, 2024", type: "Legal Document" },
      { id: "d8", title: "Demolition Notice", date: "April 1, 2024", type: "Legal Document" },
      { id: "d9", title: "Site Photographs", date: "April 10, 2024", type: "Evidence" }
    ],
  },
  {
    id: "4",
    title: "United Bank vs. Mehta Enterprises",
    number: "BK-2024-0218",
    priority: "high",
    status: "active",
    type: "Banking",
    date: "May 7, 2024",
    description: "Banking case regarding loan default and recovery proceedings. The bank seeks to enforce security interests against the defaulting business.",
    plaintiff: "United Bank of India",
    defendant: "Mehta Enterprises",
    judge: "Justice D. Gupta",
    courtroom: "Courtroom 1A",
    nextHearingDate: "May 22, 2024",
    documents: [
      { id: "d10", title: "Loan Agreement", date: "January 10, 2023", type: "Contract" },
      { id: "d11", title: "Default Notices", date: "December 5, 2023", type: "Legal Document" },
      { id: "d12", title: "Collateral Valuation", date: "February 15, 2024", type: "Financial Document" }
    ],
  },
  {
    id: "5",
    title: "Kumar vs. Kumar (Divorce)",
    number: "FM-2024-0422",
    priority: "medium",
    status: "scheduled",
    type: "Family",
    date: "May 5, 2024",
    description: "Family matter regarding divorce and custody arrangements for two minor children. The parties are disputing property division and alimony.",
    plaintiff: "Priya Kumar",
    defendant: "Ajay Kumar",
    judge: "Justice M. Reddy",
    courtroom: "Courtroom 2C",
    nextHearingDate: "May 30, 2024",
    documents: [
      { id: "d13", title: "Marriage Certificate", date: "July 15, 2010", type: "Legal Document" },
      { id: "d14", title: "Property Inventory", date: "March 20, 2024", type: "Financial Document" },
      { id: "d15", title: "Counselor's Report", date: "April 25, 2024", type: "Expert Report" }
    ],
  },
  {
    id: "6",
    title: "Reddy vs. Chennai Municipal Authority",
    number: "CV-2024-0238",
    priority: "medium",
    status: "pending",
    type: "Civil",
    date: "May 4, 2024",
    description: "Civil case regarding water supply disruption to residential area. The petitioner represents a resident welfare association seeking reliefs.",
    plaintiff: "Anand Reddy",
    defendant: "Chennai Municipal Authority",
    judge: "Justice K. Nair",
    courtroom: "Courtroom 4B",
    nextHearingDate: "June 10, 2024",
    documents: [
      { id: "d16", title: "Previous Complaints", date: "February 10, 2024", type: "Legal Document" },
      { id: "d17", title: "Water Quality Report", date: "March 5, 2024", type: "Expert Report" },
      { id: "d18", title: "Municipal Response", date: "April 2, 2024", type: "Legal Document" }
    ],
  },
  {
    id: "7",
    title: "State of Tamil Nadu vs. Krishnan",
    number: "CR-2024-0189",
    priority: "high",
    status: "active",
    type: "Criminal",
    date: "May 3, 2024",
    description: "Criminal case involving allegations of corporate espionage and data theft. The case involves sensitive trade secrets of a technology company.",
    plaintiff: "State of Tamil Nadu",
    defendant: "Ramesh Krishnan",
    judge: "Justice B. Iyer",
    courtroom: "Courtroom 3B",
    nextHearingDate: "May 20, 2024",
    documents: [
      { id: "d19", title: "Forensic Analysis", date: "April 5, 2024", type: "Expert Report" },
      { id: "d20", title: "Search Warrant", date: "March 15, 2024", type: "Legal Document" },
      { id: "d21", title: "Data Recovery Report", date: "April 10, 2024", type: "Evidence" }
    ],
  },
  {
    id: "8",
    title: "ABD Industries vs. Singh Enterprises",
    number: "CM-2024-0452",
    priority: "low",
    status: "closed",
    type: "Commercial",
    date: "May 2, 2024",
    description: "Commercial dispute over breach of contract for supply of manufacturing components. The case was settled through mediation.",
    plaintiff: "ABD Industries Ltd.",
    defendant: "Singh Enterprises",
    judge: "Justice P. Sharma",
    courtroom: "Courtroom 6A",
    documents: [
      { id: "d22", title: "Supply Agreement", date: "October 10, 2023", type: "Contract" },
      { id: "d23", title: "Quality Inspection Report", date: "December 5, 2023", type: "Expert Report" },
      { id: "d24", title: "Settlement Agreement", date: "April 28, 2024", type: "Legal Document" }
    ],
  },
  {
    id: "9",
    title: "Mumbai Housing Authority vs. Desai",
    number: "PR-2024-0125",
    priority: "medium",
    status: "pending",
    type: "Property",
    date: "May 1, 2024",
    description: "Property dispute regarding land acquisition for public infrastructure project. The respondent challenges the compensation amount.",
    plaintiff: "Mumbai Housing Authority",
    defendant: "Sanjay Desai",
    judge: "Justice A. Khan",
    courtroom: "Courtroom 5C",
    nextHearingDate: "June 15, 2024",
    documents: [
      { id: "d25", title: "Land Records", date: "January 20, 2024", type: "Legal Document" },
      { id: "d26", title: "Acquisition Notice", date: "February 15, 2024", type: "Legal Document" },
      { id: "d27", title: "Valuation Report", date: "March 25, 2024", type: "Expert Report" }
    ],
  },
  {
    id: "10",
    title: "National Bank vs. Joshi Holdings",
    number: "BK-2024-0326",
    priority: "high",
    status: "closed",
    type: "Banking",
    date: "April 30, 2024",
    description: "Banking case related to loan restructuring for a business affected by economic downturn. The parties reached a settlement agreement.",
    plaintiff: "National Bank",
    defendant: "Joshi Holdings",
    judge: "Justice R. Menon",
    courtroom: "Courtroom 1B",
    documents: [
      { id: "d28", title: "Loan Documents", date: "June 5, 2022", type: "Contract" },
      { id: "d29", title: "Financial Statements", date: "January 10, 2024", type: "Financial Document" },
      { id: "d30", title: "Restructuring Agreement", date: "April 25, 2024", type: "Legal Document" }
    ],
  },
];

// Map of related case IDs
const relatedCasesMap: Record<string, string[]> = {
  "1": ["7", "10"],  // Related criminal and banking cases
  "2": ["6", "9"],   // Related civil and property cases
  "3": ["6", "9"],   // Related civil cases
  "4": ["10", "8"],  // Related banking and commercial cases
  "5": [],           // No related cases for this family case
  "6": ["3", "9"],   // Related civil cases
  "7": ["1"],        // Related criminal case
  "8": ["4"],        // Related commercial case
  "9": ["3", "6"],   // Related property and civil cases
  "10": ["4", "1"],  // Related banking cases
};

// Simulated interval for updating data in real time
let updateInterval: number | null = null;

// Function to get all cases
export const getCases = () => {
  return [...allCases];
};

// Function to get case details by ID
export const getCaseById = (id: string): Case | undefined => {
  return allCases.find(c => c.id === id);
};

// Function to get related cases by ID
export const getRelatedCases = (id: string): Case[] => {
  const relatedIds = relatedCasesMap[id] || [];
  return allCases.filter(c => relatedIds.includes(c.id));
};

// Function to simulate real-time updates
export const startRealTimeUpdates = (callback: () => void) => {
  // Clear any existing interval
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  // Set up a new interval for real-time updates every 30 seconds
  updateInterval = window.setInterval(() => {
    // Simulate a random update to a case
    const randomCaseIndex = Math.floor(Math.random() * allCases.length);
    const randomCase = allCases[randomCaseIndex];

    // Clone the cases array
    const updatedCases = [...allCases];
    
    // Simulate different types of updates
    const updateType = Math.floor(Math.random() * 3);
    const updatedCase = { ...randomCase };
    
    switch (updateType) {
      case 0: 
        // Update status
        const statusOptions: ("active" | "scheduled" | "pending" | "closed")[] = ["active", "scheduled", "pending", "closed"];
        const newStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
        if (newStatus !== updatedCase.status) {
          updatedCase.status = newStatus;
          updatedCases[randomCaseIndex] = updatedCase;
          toast.info(`Case ${updatedCase.number} status updated to ${newStatus}`);
        }
        break;
      case 1: 
        // Update priority
        const priorityOptions: ("high" | "medium" | "low")[] = ["high", "medium", "low"];
        const newPriority = priorityOptions[Math.floor(Math.random() * priorityOptions.length)];
        if (newPriority !== updatedCase.priority) {
          updatedCase.priority = newPriority;
          updatedCases[randomCaseIndex] = updatedCase;
          toast.info(`Case ${updatedCase.number} priority updated to ${newPriority}`);
        }
        break;
      case 2:
        // Update next hearing date
        if (updatedCase.status !== "closed") {
          const today = new Date();
          const nextMonth = new Date();
          nextMonth.setMonth(today.getMonth() + 1);
          
          // Random date within next month
          const randomDays = Math.floor(Math.random() * 30);
          const newDate = new Date(today);
          newDate.setDate(today.getDate() + randomDays);
          
          const formattedDate = newDate.toLocaleString('en-US', {
            month: 'long', 
            day: 'numeric', 
            year: 'numeric'
          });
          
          updatedCase.nextHearingDate = formattedDate;
          updatedCases[randomCaseIndex] = updatedCase;
          toast.info(`Case ${updatedCase.number} next hearing updated to ${formattedDate}`);
        }
        break;
    }
    
    // Update the cases data
    allCases = updatedCases;
    
    // Trigger the callback to update UI
    callback();
  }, 30000); // Update every 30 seconds
  
  return () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  };
};

// Function to stop real-time updates
export const stopRealTimeUpdates = () => {
  if (updateInterval) {
    clearInterval(updateInterval);
    updateInterval = null;
  }
};
