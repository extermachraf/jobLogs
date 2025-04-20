"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useJobContext } from "./JobContext";

interface CompanyForm {
  name: string;
  description: string;
  location: string;
  size: string;
  specialties: string[];
}

interface JobForm {
  title: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  skills: string[];
  salary: string;
  startDate: string;
  remote: boolean;
}

type Tab = "company" | "job";

export default function ManualJobGenerator() {
  const { jobData } = useJobContext();
  const [activeTab, setActiveTab] = useState<Tab>("company");
  const [company, setCompany] = useState<CompanyForm>({
    name: "",
    description: "",
    location: "",
    size: "",
    specialties: [],
  });

  const [job, setJob] = useState<JobForm>({
    title: "",
    location: "",
    employmentType: "",
    experience: "",
    description: "",
    skills: [],
    salary: "",
    startDate: "",
    remote: false,
  });

  // Update form when AI generates data
  useEffect(() => {
    if (jobData) {
      setCompany({
        name: jobData.company.name || "",
        description: jobData.company.description || "",
        location: jobData.company.location || "",
        size: jobData.company.size || "",
        specialties: jobData.company.specialties || [],
      });

      setJob({
        title: jobData.job.title || "",
        location: jobData.job.location || "",
        employmentType: jobData.job.employmentType || "",
        experience: jobData.job.experience || "",
        description: jobData.job.description || "",
        skills: jobData.job.skills || [],
        salary: jobData.job.salary || "",
        startDate: jobData.job.startDate || "",
        remote: jobData.job.remote || false,
      });
    }
  }, [jobData]);

  const [isLoading, setIsLoading] = useState(false);

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (value: string, field: "specialties" | "skills") => {
    const array = value.split(",").map((item) => item.trim());
    if (field === "specialties") {
      setCompany((prev) => ({ ...prev, specialties: array }));
    } else {
      setJob((prev) => ({ ...prev, skills: array }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your submission logic here
    setTimeout(() => setIsLoading(false), 1000);
  };

  const FormInput = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = "",
    required = false,
    rows = undefined,
    className = "",
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    className?: string;
  }) => {
    const Component = rows ? "textarea" : "input";
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          {label}
        </label>
        <Component
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className="w-full px-3 py-2 border border-input rounded-md shadow-sm 
                   focus:ring-2 focus:ring-primary focus:border-primary 
                   bg-background text-foreground placeholder:text-muted-foreground/50
                   transition-colors duration-200"
        />
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card shadow-lg rounded-lg overflow-hidden">
        <div className="flex border-b border-input">
          <button
            onClick={() => setActiveTab("company")}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium focus:outline-none transition-colors duration-200",
              activeTab === "company"
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:bg-primary/5"
            )}
          >
            Company Details
          </button>
          <button
            onClick={() => setActiveTab("job")}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium focus:outline-none transition-colors duration-200",
              activeTab === "job"
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:bg-primary/5"
            )}
          >
            Job Details
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {activeTab === "company" && (
            <div className="space-y-4 animate-in slide-in-from-left duration-300">
              {/* Two inputs per row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company Name"
                  name="name"
                  value={company.name}
                  onChange={handleCompanyChange}
                  required
                />
                <FormInput
                  label="Location"
                  name="location"
                  value={company.location}
                  onChange={handleCompanyChange}
                />
              </div>

              <FormInput
                label="Description"
                name="description"
                value={company.description}
                onChange={handleCompanyChange}
                rows={3}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Company Size"
                  name="size"
                  value={company.size}
                  onChange={handleCompanyChange}
                  placeholder="e.g., 51-200 employés"
                />
                <FormInput
                  label="Specialties (comma-separated)"
                  name="specialties"
                  value={company.specialties.join(", ")}
                  onChange={(e) =>
                    handleArrayInput(e.target.value, "specialties")
                  }
                  placeholder="e.g., Cloud, Cybersecurity, AI"
                />
              </div>
            </div>
          )}

          {activeTab === "job" && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Job Title"
                  name="title"
                  value={job.title}
                  onChange={handleJobChange}
                  required
                />
                <FormInput
                  label="Job Location"
                  name="location"
                  value={job.location}
                  onChange={handleJobChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Employment Type"
                  name="employmentType"
                  value={job.employmentType}
                  onChange={handleJobChange}
                  placeholder="e.g., CDI, Temps plein"
                />
                <FormInput
                  label="Experience Required"
                  name="experience"
                  value={job.experience}
                  onChange={handleJobChange}
                  placeholder="e.g., 2 ans et plus"
                />
              </div>

              <FormInput
                label="Job Description"
                name="description"
                value={job.description}
                onChange={handleJobChange}
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Skills (comma-separated)"
                  name="skills"
                  value={job.skills.join(", ")}
                  onChange={(e) => handleArrayInput(e.target.value, "skills")}
                  placeholder="e.g., React, Node.js, TypeScript"
                />
                <FormInput
                  label="Salary"
                  name="salary"
                  value={job.salary}
                  onChange={handleJobChange}
                  placeholder="e.g., 45000 MAD"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={job.startDate}
                  onChange={handleJobChange}
                />

                <div className="flex items-center space-x-2 self-end pb-2">
                  <input
                    type="checkbox"
                    id="remote"
                    name="remote"
                    checked={job.remote}
                    onChange={(e) =>
                      setJob((prev) => ({ ...prev, remote: e.target.checked }))
                    }
                    className="h-4 w-4 border border-input rounded 
                             focus:ring-2 focus:ring-primary accent-primary"
                  />
                  <label
                    htmlFor="remote"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Remote Work Available
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-input">
            <div className="flex space-x-4">
              {activeTab === "company" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("job")}
                  className="flex-1 py-2 px-4 rounded-md bg-primary/10 text-primary
                           hover:bg-primary/20 transition-colors duration-200"
                >
                  Next: Job Details
                </button>
              )}

              {activeTab === "job" && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveTab("company")}
                    className="flex-1 py-2 px-4 rounded-md border border-input
                             text-muted-foreground hover:bg-primary/5 transition-colors duration-200"
                  >
                    Back to Company
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md shadow-sm text-sm font-medium transition-colors duration-200",
                      isLoading
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      "Create Job"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
