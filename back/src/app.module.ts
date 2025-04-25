import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobParserModule } from './jobParser/job-parser.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { JobSaverModule } from './job-saver/job-saver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JobParserModule,
    CompanyModule,
    JobModule,
    JobSaverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
