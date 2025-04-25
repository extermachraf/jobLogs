import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobSaverService } from './job-saver.service';
import { CreateJobSaverDto } from './dto/create-job-saver.dto';
import { UpdateJobSaverDto } from './dto/update-job-saver.dto';

@Controller('job-saver')
export class JobSaverController {
  constructor(private readonly jobSaverService: JobSaverService) {}

  @Post()
  create(@Body() createJobSaverDto: CreateJobSaverDto) {
    return this.jobSaverService.create(createJobSaverDto);
  }

  @Get()
  findAll() {
    return this.jobSaverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobSaverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobSaverDto: UpdateJobSaverDto,
  ) {
    return this.jobSaverService.update(+id, updateJobSaverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobSaverService.remove(+id);
  }
}
