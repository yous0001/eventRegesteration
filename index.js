import { config } from "dotenv"
import express from "express"
import db_connection from "./DB/connection.js"

config()
const app = express()
const port =process.env.PORT 
app.use(express.json())

db_connection()
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})