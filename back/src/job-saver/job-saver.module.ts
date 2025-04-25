import { Module } from '@nestjs/common';
import { JobSaverService } from './job-saver.service';
import { JobSaverController } from './job-saver.controller';

@Module({
  controllers: [JobSaverController],
  providers: [JobSaverService],
})
export class JobSaverModule {}
