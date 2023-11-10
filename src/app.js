//DEPENDENCIAS
import envConfig from './config/env.config.js';
import express from "express"
import { __src } from "./utils/utils.js";
import handlebars from "express-handlebars";
import appRouter from "./routes/app.router.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import setupSocket from "./chat/socket.js";
import cors from 'cors'
import compression from "express-compression";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import addLogger from './middlewares/logger.middleware.js';


//-----------------Comienzo configuracion de la app

//EXPRESS - Definimos el servidor y su config
const PORT = envConfig.server.PORT
const app = express()
app.use(cors())
const httpserver = app.listen(PORT, () => console.log("Server up."))

//JSON REQUEST - Agregamos el middleware de parseo de las request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//MONGO - Habilitamos conexion a nuestra db
mongoose.set('strictQuery', false) 
const connection = mongoose.connect(envConfig.mongo.URL,
    { useNewUrlParser: true, useUnifiedTopology: true }) 

//SESSIONS - Indicamos el uso de sessions y su config
app.use(session({
    store: MongoStore.create({
        mongoUrl: envConfig.mongo.URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 5000
    }),
    secret: envConfig.sessions.SECRET,
    resave: true,
    saveUninitialized: false
}))

//ROUTER con Brotli- Manejador de rutas de toda el servidor
app.use(compression({ brotli: { enabled: true, zlib: {} } })); 
app.use("/", appRouter)

//HANDLEBARS - Indicamos el uso de handlebars
app.engine('handlebars', handlebars.engine()) 
app.set('views', __src + '/views') 
app.set('view engine', 'handlebars') 
app.use(express.static(__src + '/public')) 

//PASSPORT - Indicamos el uso de passport
initPassport()
app.use(passport.initialize())
app.use(passport.session())

//LOGGER - Indicamos el uso del logger
app.use(addLogger)

//SOCKET IO - Instanciamos el socket en nuestro server
setupSocket(httpserver)

//---------------final del inicio de App

//SWAGGER Documentacion de API

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API Doc',
            description: 'Here you can find my API documentation.',
            version: '1.0.0',
            contact: {
                name: 'Carlos Alfredo',
                url: 'www.linkedin.com/in/carlos-alfredo-gomez-5239a726',
            }
        }
    },
    apis: [`${__src}/docs/*.yaml`]
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))

//---------------final swagger doc