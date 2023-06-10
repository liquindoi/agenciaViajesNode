// Importamos los campos de la tabla testimoniales
import { Testimoniales } from '../models/Testimoniales.js'; 

const guardarTestimonial = async (req, res) => {
    
    // Validar...

    const { nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje : 'El nombre está vacío'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje : 'El Correo está vacío'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje : 'El Mensaje está vacío'});
    }

    if(errores.length > 0) {
      // Consultar testimoniales existentes para evitar el error del length
      const testimoniales = await Testimoniales.findAll();  
      // Volver a mostrar la vista con los errores  
      res.render('testimoniales', {
        pagina: 'Testimoniales',
        errores,
        nombre,
        correo,
        mensaje,
        testimoniales
      })
    } else {
        // Almacenar los valores en la BBDD
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }

    }
}


export {
    guardarTestimonial
}