const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/'); // Folder where files will be stored
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	}
});

// Filter to allow only images and videos
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type, only images and videos are allowed!'), false);
	}
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
