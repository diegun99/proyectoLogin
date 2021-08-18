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
            
        } catch (error) {
            
        }

    }
}