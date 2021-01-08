import multer from 'multer';

export const uploadGallery = multer({
  limits: 1024 * 1024 * 2,
  fileFilter: (req, file, next) => {
    if (file.mimetype.startsWith('image/')) {
      next(null, true);
    } else {
      next(null, false);
    }
  },
}).array('images', 10);
