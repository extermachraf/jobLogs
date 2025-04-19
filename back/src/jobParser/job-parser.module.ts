import { Module } from '@nestjs/common';
import { JobParserService } from './job-parser.service';
import { HttpModule } from '@nestjs/axios';
import { JobParserController } from './job-parser.controller';

@Module({
  imports: [HttpModule],
  controllers: [JobParserController],
  providers: [JobParserService],
})
export class JobParserModule {}
