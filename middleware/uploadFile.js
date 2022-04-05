const multer = require('multer');

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

const uploadGallery = multer({
  uploadProcess,
}).array('images', 20);

const uploadAvatar = multer({
  uploadProcess,
}).single('avatar');

module.exports = { uploadAvatar, uploadGallery };
