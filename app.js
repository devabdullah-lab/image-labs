import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { API_KEY, CDN_LINK, RAILWAY_VOLUME_MOUNT_PATH, PORT } from './config/env.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';

const app = express();

const apiKey = API_KEY;
app.use(express.json());
app.use(arcjetMiddleware);
app.use(cors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

// استخدام متغير RAILWAY_VOLUME_MOUNT_PATH للوصول إلى مجلد الـ volume
const uploadPath = RAILWAY_VOLUME_MOUNT_PATH || '/app/files';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

app.use('/files', express.static(uploadPath));

function generateRandomString() {
    let result = uuidv4(); // استخدام uuidv4 لتوليد اسم فريد
    return result;
}

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }, // 10MB كحد أقصى
});

// التحقق من الـ API Key في رأس الطلب
function verifyApiKey(req, res, next) {
    const requestApiKey = req.headers['x-api-key'];
    if (!requestApiKey || requestApiKey !== apiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
    next();
}

app.post('/upload', verifyApiKey, upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const { fileTypeFromBuffer } = await import('file-type');

        const type = await fileTypeFromBuffer(req.file.buffer);
        if (!type || !type.mime.startsWith('image/')) {
            return res.status(400).json({ error: 'The file is not a valid image.' });
        }

        const randomLetters = generateRandomString();
        const filePath = path.join(uploadPath, `images/${randomLetters}.webp`);

        await sharp(req.file.buffer)
            .resize(1024, 1024, { fit: 'inside' })
            .toFormat('webp')
            .toFile(filePath);
        
        res.status(200).json({
            filePath: `${CDN_LINK}/files/${randomLetters}.webp`,
            message: 'Image uploaded and processed successfully.',
        });
    } catch (error) {
        console.error('Error processing the image:', error);
        res.status(500).json({ error: 'An error occurred while processing the image.' });
    }
});

app.use('/files', express.static(uploadPath));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
