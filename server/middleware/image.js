const {Storage} = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(process.env.CLOUD_BUCKET);

getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;


const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        console.log('gak ada req file')
        return next();
    };
    console.log('masuk ke sendupload')
    const bucketName = process.env.CLOUD_BUCKET
    const original = path.parse(req.file.originalname).name;
    const gcsname = `upload/${original}-${Date.now()}`;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', (err) => {
        console.log(err);
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname;
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(bucketName, gcsname);
            next();
        });
    });

    stream.end(req.file.buffer);
};


const upload = multer({
    storage: multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
      }
});

module.exports={
    sendUploadToGCS, upload
}