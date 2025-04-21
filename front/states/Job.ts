import { create } from "zustand";

interface JobForm {
  id?: number;
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

interface JobState {
  job: JobForm | null;
  setJob: (job: JobForm | null) => void;
  resetJob: () => void;
}

const defaultJob: JobForm = {
  title: "",
  location: "",
  employmentType: "",
  experience: "",
  description: "",
  skills: [],
  salary: "",
  startDate: "",
  remote: false,
};

const useJobState = create<JobState>()((set) => ({
  job: defaultJob,
  setJob: (newJob: JobForm | null) => set({ job: newJob }),
  resetJob: () => set({ job: null }),
}));

export default useJobState;
