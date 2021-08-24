import {Request, Response,NextFunction} from 'express'
import { removeListener } from 'process';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';

export const checkRole = (roles : Array<string>)=>{

        return async (req: Request, res: Response, next : NextFunction)=>{
            const {userId} = res.locals.jwtPayload;
            const userRepository = getRepository(User);
            let user : User;

            try{
                user = await userRepository.findOneOrFail(userId);
            }
            catch(err){
                    return res.status(401).json({message: ' no autorizado'});
            }

            //check si el rol del usuario coincide
            const {role} = user;// extraer la propiedad role
            if(roles.includes(role)){// pegunta si coincide
                next();
                
            }else{
                res.status(401).json({message: 'no autorizado'});
            }


        }
}