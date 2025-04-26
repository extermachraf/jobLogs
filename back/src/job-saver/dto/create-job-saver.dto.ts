import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Company {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties: string[];
}

class Job {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  @IsIn(['CDI', 'CDD', 'freelence', ''], {
    message: 'employment type must be one of : CDI, CDD, freelence',
  })
  employmentType?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  experience?: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsOptional()
  @IsBoolean()
  remote?: boolean;

  @IsOptional()
  @IsNotEmpty()
  companyId: number;
}

export class CreateJobSaverDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => Company) // Add this decorator
  company?: Company;

  @ValidateNested()
  @Type(() => Job) // Add this decorator
  job: Job;

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true }) // Modified email validation
  email?: string[];

  @IsOptional()
  @IsArray()
  profileUrl?: string[]; // Make it optional with ?
}
