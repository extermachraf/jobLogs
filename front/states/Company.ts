import { create } from "zustand";

export interface Company {
  id?: number;
  name?: string;
  location?: string;
  description?: string;
  specialities?: string[];
}

export interface CompanyState {
  company: Company | null;
  setCompany: (company: Company | null) => void;
  resetCompany: () => void;
}

const defaultCompany: Company = {
  name: "",
  location: "",
  description: "",
  specialities: [],
};

const useCompanyState = create<CompanyState>((set) => ({
  company: defaultCompany,
  setCompany: (newCompany: Company | null) => set({ company: newCompany }),
  resetCompany: () => set({ company: defaultCompany }),
}));

export default useCompanyState;
