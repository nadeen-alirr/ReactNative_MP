const multer = require('multer');

const storage = multer.memoryStorage(); // Store file in memory

const courseMulter = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
}).fields([
  { name: 'image', maxCount: 1 }, // For course image
  { name: 'lessons[0][image]', maxCount: 1 }, // For lessons' images
  { name: 'lessons[1][image]', maxCount: 1 },
 
]);

module.exports = courseMulter;