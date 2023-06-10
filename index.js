// forma antigua
//const express = require('express');

// forma nueva y además hay que añadir en el package.json
// type:module
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config';

console.log(process.env.DB_HOST);

const app = express();


// conectar la base de datos

db.authenticate()
.then( () => console.log('Base de datos conectada'))
.catch( error => console.log(error));

const port = process.env.PORT || 4000;

// Habilitar PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    return next(); // Hay que añadir next xq de lo contrario, no continua la ejecución de la aplicación
})


// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));
// Definir la carpeta publica (imagenes y css)
app.use(express.static('public'));



app.use('/', router);


app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})