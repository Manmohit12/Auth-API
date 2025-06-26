import express from 'express'
import { registerUser, loginUser, getUsers, handleGetUserById } from '../userController/index.js'
import { userRegisterValidate, userLoginValidate } from '../utils/userValidation.js'
import { ensureAuthenticated } from '../utils/auth.js'
const routes=express.Router()

routes.post('/register',userRegisterValidate,registerUser)
routes.post('/login',userLoginValidate,loginUser)
routes.get('/users',ensureAuthenticated,getUsers)
routes.get('/users/:id', handleGetUserById)
export  default routes;