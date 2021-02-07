import multer from 'multer';

const uploadProcess = {
  limits: 1024 * 1024 * 1,
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(null, false);
    }
  },
};

export const uploadGallery = multer({
  uploadProcess,
}).array('images', 20);

export const uploadAvatar = multer({
  uploadProcess,
}).single('avatar');
