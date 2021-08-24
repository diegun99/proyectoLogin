import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {User} from '../entity/User'
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from "class-validator";

class AuthController {
    static login = async (req: Request,res : Response)=>{
        const {username, password} = req.body;
        if (!(username && password)) {// en caso de no tener username ni password
            return res.status(400).json({message: 'username & password are required '})
        }

        const userRepository = getRepository(User);
        let user : User;
        try {
            user = await userRepository.findOneOrFail({where: {username}});// buscar el username
        } catch (error) {
            return  res.status(400).json({message : 'Username or password are invalid'});
        };

        //check password
        if(!user.checkPassword(password)){// en caso de que no sea true
            res.status(400).json({message : 'User or password are incorrect login'});
        }

        const token = jwt.sign({userId : user.id, username: user.username},config.jwtSecret,{expiresIn : '1h'});

        res.json({message : 'ok', token});

    };

    static changePassword = async (req : Request, res: Response)=>{// cambiar contraseña
        const {userId} = res.locals.jwtPayload;//destructurar
        const {oldPassword,newPassword} = req.body;// el usuario debe enviar la contraseña antigua y la nueva
        if(!(oldPassword && newPassword)){// si esas dos propiedades no estan
            res.status(400).json({mesage: 'se requiere antiguo y nuevo password adecuado'});
        }

        const userRepository = getRepository(User);
        let user : User;

        try{
        user = await userRepository.findOneOrFail(userId);
            }
            catch(e){
                res.status(400).json({message:'algo salió mal'});
            }

            if(!user.checkPassword(oldPassword)){
                    return res.status(401).json({message : 'revisa tu antiguo password'});
            }

            user.password = newPassword;
            const validationopt = {validationError : {target : false, value : false}};
            const errors = await validate(user,validationopt);
    }
}

export default AuthController;