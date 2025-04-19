export class CreateCompanyDto {
  name: string;
  description?: string;
  location?: string;
  size?: string;
  specialties?: string[];
}
