import { PartialType } from '@nestjs/swagger';
import { CreateJobSaverDto } from './create-job-saver.dto';

export class UpdateJobSaverDto extends PartialType(CreateJobSaverDto) {}
