import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'image-repo',
    serverSideEncryption: 'AES256',
    key: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});