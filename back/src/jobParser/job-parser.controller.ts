import { Controller, Post, Body } from '@nestjs/common';
import { JobParserService } from './job-parser.service';

@Controller('job-parser')
export class JobParserController {
  constructor(private readonly jobParserService: JobParserService) {}

  @Post()
  async processJob(@Body() jobData: { description: string }) {
    try {
      const parsedJob = await this.jobParserService.parseJob(
        jobData.description,
      );
      return { success: true, data: parsedJob };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
