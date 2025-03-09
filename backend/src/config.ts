import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT ? process.env.PORT : 8080;
export const DOCS_BASE_URL = process.env.DOCS_BASE_URL ? process.env.DOCS_BASE_URL : '/docs';
export const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY ? process.env.FAST2SMS_API_KEY : '';