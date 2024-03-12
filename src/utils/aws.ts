import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
const { AWS_REGION, AWS_ACCESS_ID, AWS_SECRET_KEY, AWS_S3_BUCKET } =
  process.env;

const awsRegion = process.env.AWS_REGION;

const s3 = new S3({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export const uploadFile = async (image) => {
  if (!image) return null;

  console.log('awsRegion::: ', awsRegion);

  // console.log('s3::: ', s3);

  const key = uuidv4();
  const response = await s3
    .upload({
      Bucket: AWS_S3_BUCKET,
      Key: uuidv4(),
      Body: image.buffer,
      ContentType: 'image/jpeg', // MIME 타입은 'image/jpeg'이 일반적입니다.
    })
    .promise();

  return response.Location;
};

export const uploadFiles = async (images) => {
  const urls = await Promise.all(
    images.map((image) =>
      uploadFile(image).catch((error) => {
        console.error('S3 업로드 실패:', error);
        return null; // 업로드 실패 시 null 반환
      }),
    ),
  );

  return urls.filter((url) => url); // 성공적으로 업로드된 파일의 URL만 반환
};
