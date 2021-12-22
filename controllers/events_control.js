import {response} from 'express'
import Calendar from '../database/models/calendar.js'

export const get_events = async (req = response,res = response) => {

    const get_data = await Calendar.find()

    res.status(200).json({
        ok:true,
        get_data
    })
}

export const send_events = async (req = response,res = response) => {

    const add_calendar = new Calendar(req.body)

    try {
        
        const save_data = await add_calendar.save()

        res.status(200).json({
            ok:true,
            msg:save_data
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"error"
        })
    }

}

export const update_events = async (req = response,res = response) => {

    const id = req.params.id

    try {

        const query = await Calendar.findById( id)

        if (!query) {
            return res.status(404).json({
                ok:false,
                msg:"not exist"
            }) 
        }

        const change = {
            ...req.body
        }

        const eventUpdate = await Calendar.findByIdAndUpdate(id,change)
        
        res.status(200).json({
            ok:true,
            eventUpdate
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"error"
        })
    }

}

export const delete_events = async (req = response,res = response) => {

    const id = req.params.id

    try {

        const query = await Calendar.findById(id)

        if (!query) {
            return res.status(404).json({
                ok:false,
                msg:"no exist event"
            })
        }

        await Calendar.findByIdAndDelete(id)
        
        res.status(200).json({
            ok:true,
            msg:"eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok:true,
            msg:"eliminar no se puede "
        })
    }

}