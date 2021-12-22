import mongoose from "mongoose";

export const dbConnect = async () => {

    try {
        
        await mongoose.connect(process.env.DB_URL)

        console.log("DB online")

    } catch (error) {
        console.log(`not connect bd`)
    }
}