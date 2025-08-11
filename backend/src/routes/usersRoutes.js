import express from 'express'
import {register,login, deleteUser}from '../controllers/usersControllers.js'

const router = express.Router();

router.post('/login',login);
router.post('/register',register)
router.delete('/delete/:id',deleteUser)

export default router;