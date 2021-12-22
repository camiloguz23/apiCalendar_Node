import {response} from 'express'
import User_db from '../database/models/user.js'
import bcrypt from 'bcryptjs'
import {generarJWT} from '../helpers/jwt.js'


export const user = async (req,res=response) => {

    const {name,email,password} = req.body

    try {

        let consulta = await User_db.findOne( { email } )
        
        if (consulta) {

            return res.status(400).json({
                ok:false,
                msg:`User already has been created `
            })
            
        }
        
        const usercreacted = new User_db(req.body)

        //^ encrypt password 

        const salt = bcrypt.genSaltSync() //^ number round is better maximun 10 defect or until 12
        usercreacted.password = bcrypt.hashSync(password,salt) //^ here it getting encrypt

        await usercreacted.save()

        //^ JWT 

        const Jtoken = await generarJWT(usercreacted.id,usercreacted.name)
    
        res.status(201).json({
            ok: true,
            msg:"new event",
            uid:usercreacted.id,
            name,
            email,
            Jtoken
        })

    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg:"error"
        })
    }
}

export const loginUSer = async (req,res = response) => {

    const {email,password} = req.body

    try {

        let query = await User_db.findOne({email})
        console.log(query)

        if (!query) {
            return {
                ok:true,
                msg:"user incorrect"
            }
        }

        const contra = bcrypt.compareSync(password, query.password)

        if (contra) {
            const {name} = query

            const Jtoken = await generarJWT(query.id,query.name)
            
            return res.status(200).json(
                {
                    ok:true,
                    msg:{
                        uid:query.id,
                        name,
                        email,
                        Jtoken
                    }
                }
            )
        }
    
        return res.status(400).json({
            ok:false,
            msg:`User not has been created `
        })

        
    } catch (error) {

        console.log(error)

        return res.status(400).json({
            ok:false,
            msg:"error"
        })
        
    }

    
}


export const revalidarToken = async (req,res = response) => {

    const uid = req.uid
    const name = req.name

    //^ generar un nuevo token

    const token = await generarJWT(uid,name)
  
    res.json({
        ok:true,
        msg:{
            uid,
            name,
            token
        }
    })
}