import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/jwt";


const router = Router();

//rutas

//get all user
router.get('/',[checkJwt],UserController.getAll);// se coloca el middleware, si todo va bien ejecuta el metodo getall

//get one user
router.get('/:id',[checkJwt],UserController.getById);

//create a new user
router.post('/',[checkJwt],UserController.newUser);

//edit User
router.patch('/:id',[checkJwt],UserController.editUser);

//delete user
router.delete('/:id',[checkJwt],UserController.deleteUser);

export default router;