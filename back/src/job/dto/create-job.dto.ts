export class CreateJobDto {
  title: string;
  location: string;
  employmentType: string;
  experience?: string;
  description: string;
  skills?: string[];
  salary?: string;
  remote?: boolean;
  companyId: number;
}
