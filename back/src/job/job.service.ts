import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: createJobDto.companyId },
      });

      if (!company) {
        throw new BadRequestException(
          `Company with ID ${createJobDto.companyId} not found`,
        );
      }

      const job = await this.prisma.job.create({
        data: createJobDto,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      });

      return {
        status: 'success',
        message: 'Job created successfully',
        data: job,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create job: ' + error.message);
    }
  }

  async findAll() {
    try {
      const jobs = await this.prisma.job.findMany({
        include: {
          company: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
        orderBy: {
          postedAt: 'desc',
        },
      });

      return {
        status: 'success',
        count: jobs.length,
        data: jobs,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch jobs');
    }
  }

  async findOne(id: number) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      });

      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      return {
        status: 'success',
        data: job,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch job');
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    try {
      const existingJob = await this.prisma.job.findUnique({
        where: { id },
      });

      if (!existingJob) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      if (updateJobDto.companyId) {
        const company = await this.prisma.company.findUnique({
          where: { id: id },
        });

        if (!company) {
          throw new BadRequestException(
            `Company with ID ${updateJobDto.companyId} not found`,
          );
        }
      }

      const job = await this.prisma.job.update({
        where: { id },
        data: updateJobDto,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      });

      return {
        status: 'success',
        message: 'Job updated successfully',
        data: job,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update job');
    }
  }

  async remove(id: number) {
    try {
      const job = await this.prisma.job.findUnique({
        where: { id },
      });

      if (!job) {
        throw new NotFoundException(`Job with ID ${id} not found`);
      }

      await this.prisma.job.delete({
        where: { id },
      });

      return {
        status: 'success',
        message: 'Job deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete job');
    }
  }
}
