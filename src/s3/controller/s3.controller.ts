import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3Service } from '../service/s3.service';

@ApiTags('Upload')
@Controller('upload')
export class S3Controller {
  constructor(private readonly S3Service: S3Service) {}
}
