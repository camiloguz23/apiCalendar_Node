import {Router} from "express";
import { user,loginUSer,revalidarToken } from "../controllers/auth.js";
import { check} from 'express-validator'
import { validation } from "../middlewares/validation.js";
import {valid_token} from '../middlewares/valid_token.js'

const route = Router()

route.get("/", (req,res) => {
    res.json({
        ok:"server"
    })
})

route.post(
    "/new-user",
    [
        check("name","The name is important").not().isEmpty(),
        check("email","The email is important").isEmail(),
        check("password","the password minimin is of 6 caracters").isLength( { min:6 } ),
        validation
    ], 
    user
)

route.post(
    "/login-user",
    [
        check("email","the email is incorrect").isEmail(),
        check("password","The password is correct").isLength( { min:6 } ),
        validation
    ], 
    loginUSer
)

route.get("/validarToken",[valid_token],revalidarToken)

export default route