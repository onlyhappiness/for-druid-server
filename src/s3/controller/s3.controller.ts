import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { S3Service } from '../service/s3.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Upload')
@Controller('upload')
export class S3Controller {
  constructor(private readonly S3Service: S3Service) {}

  // @Post('')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() image) {
  //   // console.log('image: ', image);
  //   return await this.S3Service.uploadFile(image);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMultiFile(@UploadedFiles() images) {
    return await this.S3Service.uploadFiles(images);
  }
}
