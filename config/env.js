import { config } from 'dotenv';

config({ path: './.env' });

export const {
    PORT,

    RAILWAY_VOLUME_MOUNT_PATH,
    ALLOWED_ORIGINS,
    API_KEY,
    CDN_LINK,

} = process.env;
