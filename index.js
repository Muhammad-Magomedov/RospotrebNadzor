const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const { URL, PORT } = require("./src/config/config")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const start = async () => {
    try {
       await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log("Сервер запущен на порте ", PORT)
        })
    } catch (e) {
        console.log("Ошибка подключения ", e.message)
    }
}

start()