import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

const ASW_S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME ?? '';
const AWS_S3_REGION = process.env.NEXT_PUBLIC_S3_REGION ?? '';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? '';
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? '';

const AWS_S3_BASE_URL =
  ASW_S3_BUCKET_NAME && AWS_S3_REGION
    ? `https://${ASW_S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com`
    : undefined;

const s3 = new S3Client({
  region: AWS_S3_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const awsS3List = async (Prefix: string) => {
  const response = await s3.send(
    new ListObjectsV2Command({
      Bucket: ASW_S3_BUCKET_NAME,
      Prefix,
    }),
  );

  if (!response.Contents) {
    return [];
  }

  console.log('called awsS3List');
  return response.Contents.reduce((keys: string[], content) => {
    if (content.Size !== 0) {
      keys.push(content.Key!);
    }
    return keys;
  }, []);
};

export const awsS3Put = async (Key: string, Body: Buffer) => {
  const response = await s3.send(
    new PutObjectCommand({
      Bucket: ASW_S3_BUCKET_NAME,
      Key,
      Body,
    }),
  );
};
