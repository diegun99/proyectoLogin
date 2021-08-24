import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";


const router = Router();

//rutas

//get all user
router.get('/',[checkJwt,checkRole(['admin'])],UserController.getAll);// se coloca el middleware, si todo va bien ejecuta el metodo getall

//get one user
router.get('/:id',[checkJwt,checkRole(['admin'])],UserController.getById);

//create a new user
router.post('/',[checkJwt, checkRole(['admin'])],UserController.newUser);// el middleware se puede colocar en las rutas que uno desee 

//edit User
router.patch('/:id',[checkJwt,checkRole(['admin'])],UserController.editUser);

//delete user
router.delete('/:id',[checkJwt,checkRole(['admin'])],UserController.deleteUser);

export default router;