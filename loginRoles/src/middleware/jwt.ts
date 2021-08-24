import {Request,Response,NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req:Request,res:Response,next : NextFunction)=>{

    const token = <string>req.headers['auth'];// esperar un parametro que llamaremos 'auth
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token,config.jwtSecret);
        res.locals.jwtPayload= jwtPayload;
    }
    catch(e){

        return res.status(401).json({message: ' no authorized'});
    }

    const {userId, username} = jwtPayload;// extraemos el userId y el username
    const newToken = jwt.sign({userId, username},config.jwtSecret, {expiresIn: '1h'});// devuelve el token generado
    res.setHeader('token',newToken);
    // CALL NEXT
    next();
}