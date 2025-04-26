import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.prisma.company.create({
        data: createCompanyDto,
        include: {
          jobs: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });

      return {
        status: 'success',
        message: 'Company created successfully',
        data: company,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Company with this name already exists');
      }
      throw new BadRequestException(
        'Failed to create company: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      const companies = await this.prisma.company.findMany({
        include: {
          jobs: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });

      return {
        status: 'success',
        count: companies.length,
        data: companies,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch companies');
    }
  }

  async findOne(id: number) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id },
        include: {
          jobs: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });

      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }

      return {
        status: 'success',
        data: company,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch company');
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      const exists = await this.prisma.company.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }

      const company = await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
        include: {
          jobs: {
            select: {
              id: true,
              title: true,
              description: true,
            },
          },
        },
      });

      return {
        status: 'success',
        message: 'Company updated successfully',
        data: company,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Company with this name already exists');
      }
      throw new BadRequestException('Failed to update company');
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.prisma.company.findUnique({
        where: { id },
      });

      if (!exists) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }

      await this.prisma.company.delete({
        where: { id },
      });

      return {
        status: 'success',
        message: 'Company deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete company');
    }
  }

  async findByName(companyName: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { name: companyName },
      });
      if (!company) null;
      return company;
    } catch (error) {
      throw new BadRequestException('failed to find company');
    }
  }
}
