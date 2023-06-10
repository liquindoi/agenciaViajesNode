import { Viaje } from '../models/Viaje.js'; // Importamos los campos
import { Testimoniales } from '../models/Testimoniales.js'; // Importamos los campos

const paginaInicio = async (req, res) => {

    // consultar 3 modelos del modelo Viaje
    // const viajes = await Viaje.findAll({ limit: 3});
    
    // Cuando tenemos que realizar varias consultas, como el await para
    // la ejecución, y no pasa a la siguiente linea, lo que podemos hacer es
    // usar un PROMISE en lugar de await. Para ello creamos un array donde
    // almacenamos los resultados de las consultas

    const promiseDB = [];

    promiseDB.push( Viaje.findAll({ limit: 3}) );
    promiseDB.push( Testimoniales.findAll({ limit: 3}) );



    try {
        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}


const paginaViajes =  async (req, res) => {
    // Vamos a recuperar los datos de la DDBB, por lo que
    // lo primero es añadir el async a la arrow function 

    // Ya que usamos Sequalize, las consultas se llevan a cabo mediante
    // la llamada a las funciones propias de sequalize, como findAll
    const viajes =  await Viaje.findAll();

    //console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos viajes',
        viajes: viajes
    });
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch(error) {
        console.log(error);
    }

}

// Muesta un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug }});
        res.render('viaje', {
            pagina: 'Información Viaje', 
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export { 
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
 }