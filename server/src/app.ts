import express from 'express'
import cors from 'cors'
import httpLogger from './utils/morgan.js'
import { corsOptions } from './config/corsOptions.js'
import cookieParser from 'cookie-parser'
import { expressMiddleware } from '@as-integrations/express5'
// import auth from './routes/auth.routes.js'
import errorHandler from './middleware/errorHandler.js'
import server from './graphql/server.js'
import type { Response,Request } from 'express'
import { GraphQLError } from 'graphql'
import verifyJWT from './middleware/verifyJwt.js'
import { Context } from '@hr-app/shared'

export const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(httpLogger)
app.use(cookieParser())
app.use('/graphql',expressMiddleware(server,{
  context: async({req,res}):Promise<Context> => {
    req.user = null;
    const authHeader = req.headers['authorization']
    if(authHeader?.startsWith('Bearer ')){
      
    
      const token = authHeader.split(" ")[1]
      try{
 if(typeof token === 'string'){
 const user = verifyJWT(token)
      req.user = user
      }
      } catch{
        req.user = null
      }
     
     
    }

   return {req,res}
  }
})

)


//Auth Setup
app.use(errorHandler)