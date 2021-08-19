import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

import { validate } from "class-validator";// funciona para hacer las validaciones de los campos

export class UserController {

static getAll = async(req:Request,res:Response)=>{
    const  userRepository = getRepository(User);// guardar el usuario entity USER
    try{
        const users = await userRepository.find();

        if(User.length > 0){
            res.send(users);
        }else{
            res.status(404).json({message:'No result'});
        }

    }
    catch(e){
       res.status(404).json({message:'No result'});
    }


}

static getById = async(req: Request,res:Response)=>{

    const {id} = req.params;// desde nuestro frontend vendra un ud que podemos recuperar desde params.
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOneOrFail(id);
        res.send(user);
    } catch (error) {
        res.status(404).json({message:'No result'});
    }
}

static newUser = async(req:Request,res:Response)=>{
    const {username,password,role}= req.body;

    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    //validate
    const errors = await validate(user);
        if (errors.length>0) {
            return res.status(400).json(errors);
        }

        //TODO hash Password

        const userRepository = getRepository(User);
        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(409).json({message:'Username already exist'});
        }
        //all ok
        res.send('user Created');
}

static editUser = async(req:Request,res:Response)=>{
    let user;
    const {id} = req.params;
    const {username,role} = req.body;

    const userRespository = getRepository(User);
    //try get user
    try {
        user = await userRespository.findOneOrFail(id);
        user.username = username;
        user.role = role;
    } catch (error) {
        res.status(404).json({message: 'no encontrado'});
    }



    const errors =await validate(user);
    if (errors.length >0) {
        return res.status(400).json(errors);
    }

    //try to save users
    try {
        await userRespository.save(user);
    } catch (error) {
        
    }

}
    
    /* Métodos predeterminados por el orm
    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }*/

}