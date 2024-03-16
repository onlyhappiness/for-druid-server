import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
  private readonly config = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  };

  private readonly s3 = new S3(this.config);

  async uploadFile(image) {
    try {
      if (!image) return;

      const key = uuidv4();
      const response = await this.s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
          Body: image.buffer,
          ContentType: 'image/jpeg',
        })
        .promise();

      return response?.Location;
    } catch (error) {
      console.log('error: ', error);
      throw new InternalServerErrorException('S3 업로드 실패');
    }
  }

  async uploadFiles(images) {
    console.log('images: ', images);

    const urls = await Promise.all(
      images.map((image) =>
        this.uploadFile(image).catch((error) => {
          console.error('S3 업로드 실패:', error);
          return null; // 업로드 실패 시 null 반환
        }),
      ),
    );

    return urls.filter((url) => url); // 성공적으로 업로드된 파일의 URL만 반환
  }

  // async uploadFiles(images) {
  //   console.log('images: ', images);

  //   const urls = [];

  //   await Promise.all(
  //     images.map(async (image) => {
  //       const url = await this.uploadFile(image);
  //       urls.push(url);
  //     }),
  //   );

  //   return urls;
  // }
}
