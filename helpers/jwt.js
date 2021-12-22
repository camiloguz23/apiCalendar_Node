import jwt from 'jsonwebtoken'

export const generarJWT = (id,name) => {

    return new Promise ((resolver,reject) => {

        const payload = {id,name}

        jwt.sign(payload,process.env.PRIMARYKEY, {
            expiresIn:"2h"
        },(error,token) => {

            if (error) {
                console.log(error)
                reject("no se puede hacer el token")
            }

            resolver(token)
        })
    })

}