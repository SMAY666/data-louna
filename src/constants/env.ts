import 'dotenv/config.js'
import {cleanEnv, num, str} from 'envalid';

export const ENV = cleanEnv(
    process.env, {
        HOST: str(),
        PORT: num(),
        DB_HOST: num(),
        DB_PORT: num(),
        DB_NAME: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),

        SALT: str(),
        SESSION_SECRET: str(),

        REDIS_HOST: str(),
        REDIS_PORT: num(),
    });
