import { Injectable } from '@nestjs/common';
import { CreateJobSaverDto } from './dto/create-job-saver.dto';
import { UpdateJobSaverDto } from './dto/update-job-saver.dto';
import { isValideDto } from './utils/isValid.data';

@Injectable()
export class JobSaverService {
  create(createJobSaverDto: CreateJobSaverDto) {
    try {
      isValideDto(createJobSaverDto);
      return {
        success: true,
        data: createJobSaverDto,
      };
    } catch (error) {
      throw error;
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
