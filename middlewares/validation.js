import {response} from 'express'
import { validationResult } from 'express-validator'

export const validation = (req,res=response, next) => {

    const errros = validationResult(req)

    if(!errros.isEmpty()){

        return res.status(400).json({
            ok:false,
            msg:errros.mapped()
        })
    }


    next()
}