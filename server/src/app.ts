import express from 'express'
import cors from 'cors'
import httpLogger from '../utils/morgan.js'
import { corsOptions } from './config/corsOptions.js'
import cookieParser from 'cookie-parser'



export const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(httpLogger)
app.use(cookieParser())