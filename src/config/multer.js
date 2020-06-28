import multer from 'multer';

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be of image type'));
        }
        cb(undefined, true);
    }
});

export default upload;