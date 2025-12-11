import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"
import { devConfig } from "../../config/local.config"

export const generateToken = ({payload , options } : {
    payload : object,
    options? : SignOptions
})=>{
    return jwt.sign(payload , devConfig.JWT_SECRET , options) 
}

export const verifyToken = (token : string)=>{
    return jwt.verify(token , devConfig.JWT_SECRET) as JwtPayload
}