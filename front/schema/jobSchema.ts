import { z } from "zod";

export const jobtSchema = z.object({
  company: z.object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    size: z.string(),
    specialties: z.array(z.string()),
  }),
  job: z.object({
    title: z.string(),
    location: z.string(),
    employmentType: z.string(),
    experience: z.string(),
    description: z.string(),
    skills: z.array(z.string()),
    salary: z.string(),
    startDate: z.string(),
    remote: z.boolean(),
  }),
  linkdinEmail: z.object({
    email: z.array(z.string()),
    linkdin: z.array(z.string()),
  }),
});

export type jobtSchema = z.infer<typeof jobtSchema>;
