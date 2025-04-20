export class CreateJobDto {
  title: string;
  location: string;
  employmentType: string;
  experience?: string;
  description: string;
  responsibilities?: string;
  requirements?: string;
  skills?: string[];
  salary?: string;
  startDate?: Date;
  remote?: boolean;
  companyId: number;
}
