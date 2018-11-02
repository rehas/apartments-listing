import * as jwt from 'jsonwebtoken'

export const secret = process.env.JWT_SECRET || 'asdfhjkl123jksfdt98*(&*%T$#hsfjk'
const ttl = 3600 * 12 // our JWT tokens are valid for 12 hours

interface JwtPayload {
  id: number
}

export const sign = (data: JwtPayload) =>
  jwt.sign(data, secret, { expiresIn: ttl })

export const verify = (token: string): JwtPayload =>
  jwt.verify(token, secret) as JwtPayload