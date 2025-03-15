import { config } from "dotenv"
import express from "express"
import db_connection from "./DB/connection.js"
import authRouter from "./Routes/auth.routes.js"

config()
const app = express()
const port =process.env.PORT 
app.use(express.json())
app.use('/auth',authRouter)
db_connection()
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})