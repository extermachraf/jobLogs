import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobSaverDto } from './dto/create-job-saver.dto';
import { UpdateJobSaverDto } from './dto/update-job-saver.dto';
import { isValideDto } from './utils/isValid.data';
import { CompanyService } from '../company/company.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { profile } from 'console';
import { IsEmail } from 'class-validator';

@Injectable()
export class JobSaverService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly prisma: PrismaService,
  ) {}
  async create(createJobSaverDto: CreateJobSaverDto) {
    try {
      isValideDto(createJobSaverDto);

      let companyId: number;
      if (createJobSaverDto.company) {
        let company = await this.companyService.findByName(
          createJobSaverDto.company.name,
        );

        if (!company) {
          try {
            company = (
              await this.companyService.create(createJobSaverDto.company)
            ).data;
          } catch (error) {
            throw new BadRequestException('cant create the job');
          }
        }
        companyId = company.id;
      }

      const {
        title,
        location,
        employmentType,
        description,
        skills,
        experience,
        salary,
        remote,
      } = createJobSaverDto.job;

      //filter existing emails
      //handle the job
      const job = await this.prisma.job.create({
        data: {
          title,
          location,
          employmentType,
          description,
          skills,
          experience,
          salary,
          remote,
          companyId,
          emails: {
            create:
              createJobSaverDto.email?.map((email) => ({
                email,
              })) || [],
          },
          linkedIns: {
            create:
              createJobSaverDto.profileUrl?.map((url) => ({
                profileUrl: url,
              })) || [],
          },
        },
        include: {
          company: true,
          emails: true,
          linkedIns: true,
        },
      });

      return {
        success: true,
        data: job,
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException({
        success: false,
        error: error.message || 'failed to create job',
      });
    }
  }

  findAll() {
    return `This action returns all jobSaver`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobSaver`;
  }

  update(id: number, updateJobSaverDto: UpdateJobSaverDto) {
    return `This action updates a #${id} jobSaver`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobSaver`;
  }
}
