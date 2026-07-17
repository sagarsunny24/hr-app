import jwt  from 'jsonwebtoken'
import { AuthPayload } from '@hr-app/shared'

export default function verifyJWT(token:string) {
  const secret = process.env.ACCESS_TOKEN_SECRET!
  const decoded = jwt.verify(token,secret) as AuthPayload
  return decoded;
}
