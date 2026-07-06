import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js'
export const app = express()

app.use(express.json())

app.use(cors(corsOptions))