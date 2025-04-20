"use client";
import { createContext, useContext, useState } from "react";

interface CompanyData {
  name: string;
  description: string | null;
  location: string;
  size: string | null;
  specialties: string[];
}

interface JobData {
  title: string;
  location: string;
  employmentType: string;
  experience: string | null;
  description: string;
  skills: string[];
  salary: string | null;
  startDate: string | null;
  remote: boolean;
}

interface JobContextType {
  jobData: {
    company: CompanyData;
    job: JobData;
  } | null;
  setJobData: (data: { company: CompanyData; job: JobData } | null) => void;
}

const JobContext = createContext<JobContextType>({
  jobData: null,
  setJobData: () => {},
});

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobData, setJobData] = useState<{
    company: CompanyData;
    job: JobData;
  } | null>(null);

  return (
    <JobContext.Provider value={{ jobData, setJobData }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobContext = () => useContext(JobContext);
