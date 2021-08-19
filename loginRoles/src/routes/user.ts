import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router();

//rutas

//get all user
router.get('/',UserController.getAll);

//get one user
router.get('/:id',UserController.getById);

//create a new user
router.post('/',UserController.newUser);

//edit User
router.patch('/:id',UserController.editUser);

//delete user
router.delete('/:id',UserController.deleteUser);

export default router;