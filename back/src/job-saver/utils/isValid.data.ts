import { BadRequestException } from '@nestjs/common';
import { CreateJobSaverDto } from '../dto/create-job-saver.dto';
import { UpdateJobSaverDto } from '../dto/update-job-saver.dto';

export function isValideDto(dto: any): boolean {
  try {
    // Check if dto is undefined or null
    if (!dto) {
      throw new BadRequestException({
        success: false,
        message: 'No data provided',
      });
    }

    // Check if dto is an empty object
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException({
        success: false,
        message: 'Empty data object provided',
      });
    }

    // Check if required job property exists
    if (!dto.job) {
      throw new BadRequestException({
        success: false,
        message: 'Job data is required',
      });
    }

    return true;
  } catch (error) {
    throw error;
  }
}
