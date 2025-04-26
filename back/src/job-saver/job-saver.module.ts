import { Module } from '@nestjs/common';
import { JobSaverService } from './job-saver.service';
import { JobSaverController } from './job-saver.controller';
import { CompanyModule } from '../company/company.module';
import { CompanyService } from '../company/company.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [CompanyModule, PrismaModule],
  controllers: [JobSaverController],
  providers: [JobSaverService, CompanyService],
})
export class JobSaverModule {}
