import { DataSource } from "typeorm";
import { envSchema } from "./env.js";
import {Users,Employee,Attendance ,LeaveRequests} from '../entities/index.js'
import { Companies } from "@/entities/Companies.js";


export const AppDataSource = new DataSource({
   type:envSchema.DB_TYPE,
    host:envSchema.DB_HOST,
    port:envSchema.DB_PORT,
    username: envSchema.DB_USERNAME,
    password:envSchema.DB_PASSWORD ,
    database: envSchema.DB_NAME,
    entities: [Employee,Users,Attendance,LeaveRequests,Companies],
    synchronize: false,
    migrations: ['src/migrations/*.ts']
})