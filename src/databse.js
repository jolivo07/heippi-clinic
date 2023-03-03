import mongoose from 'mongoose'
(async () => {
    try {
        mongoose.set("strictQuery", true);
        const db = await mongoose.connect("mongodb://127.0.0.1:27017/heippi")
        console.log("DB conected to", db.connection.name)
    } catch (error) {
        console.log("error conecting db:",error)
    }
})()