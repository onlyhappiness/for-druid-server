import { Module } from '@nestjs/common';
import { S3Controller } from './controller/s3.controller';
import { S3Service } from './service/s3.service';

@Module({
  controllers: [S3Controller],
  providers: [S3Service],
})
export class S3Module {}
