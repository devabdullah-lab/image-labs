import { config } from 'dotenv';

config({ path: './.env' });

export const {
    PORT,

    ARCJET_KEY,
    ARCJET_ENV,

    RAILWAY_VOLUME_MOUNT_PATH,
    ALLOWED_ORIGINS,
    API_KEY,
    CDN_LINK,

} = process.env;