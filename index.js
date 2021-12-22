import express from "express";
import dotenv from 'dotenv'
import route from './routes/routes.js'
import route_event from "./routes/events.js";
import { dbConnect } from "./database/config.js";
import cors from 'cors'

dotenv.config()



//^ create a server with express
const app = express() 

//^database

dbConnect()

//^ CORS

app.use(cors())

//^ file public

app.use(express.static("public"))

//^ read of body for JSON format

app.use(express.json())

//^ Routes

app.use("/user", route )
app.use("/calendar", route_event)

//^ listen the server
app.listen(process.env.PORT,() => {
    console.log(`already run server ${process.env.PORT}`)
})