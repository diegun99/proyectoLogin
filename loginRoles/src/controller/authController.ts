import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {User} from '../entity/User'

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

        res.send(user);

    };
}

export default AuthController;