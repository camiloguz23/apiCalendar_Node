import {response} from 'express'
import jwt from 'jsonwebtoken'

export const valid_token = (req = response,res = response,next) => {

    const token = req.header("x-token")

    if (!token) {

        return res.status(401).json({
            ok:false,
            msg:"no correct"
        })
        
    }

    try {

        const payload = jwt.verify(token,process.env.PRIMARYKEY)
        console.log(payload)

        req.uid= payload.id
        req.name = payload.name
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:"Token invalid"
        })
    }

    console.log(token)
    next()
}