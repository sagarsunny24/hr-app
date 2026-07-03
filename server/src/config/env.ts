import 'dotenv/config'
import {z} from 'zod'

export const envSchema = z.object({
DB_TYPE:z.enum(['postgres']),
DB_HOST: z.string(),
DB_PORT: z.coerce.number(),
DB_USERNAME: z.string(),
DB_NAME: z.string(),
DB_PASSWORD:z.string(),
}).parse(process.env)

export const PORT = z.coerce.number(process.env.PORT)