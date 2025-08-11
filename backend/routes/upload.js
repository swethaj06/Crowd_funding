const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const auth = require('../middleware/auth');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload photo/video for fundraiser
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });
    const result = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) return res.status(500).json({ message: 'Upload error' });
      res.json({ url: result.secure_url });
    }).end(file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
