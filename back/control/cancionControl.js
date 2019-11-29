// Importando el modelo usuario para interactuar con el
const Cancion = require('../modelo/cancion');

// req - request - peticion / res - response - respuesta
function crearCancion(req, res){
    // instanciar - usar el objeto modelo Usuario
    var cancion = new Cancion();
    // guardar el cuerpo de la peticion en una variable
    // para mejor acceso a los datos que el usuario está enviando
    var parametros = req.body;

    // Para mayor organización de código vamos a guardar cada propiedad
    // del cuerpo de la petición en la variable usuario
    cancion.titulo = parametros.titulo;
    cancion.numero = parametros.numero;
    cancion.duracion = parametros.duracion;
    cancion.url = null;
    cancion.genero = parametros.genero;
    cancion.artista = parametros.artista;
    cancion.album = parametros.album;

    cancion.save((err, cancionNueva)=>{
        if(err){
            // estado de la respuesta del servidor
            // 500 -> errores propios del servidor
            res.status(500).send({
                message: "Error en el servidor :´("
            });
        } else{
            if(!cancionNueva){
                // 404 -> Página no encontrada 
                res.status(404).send({
                    message: "No se pudo crear la canción"
                });
            } else{
                // 200 -> OK
                res.status(200).send({
                    // modelo Cancion : Nuevo Cancion que se va a guardar
                    cancion: cancionNueva
                });
            }
        }
    });
}

function buscarCancion(req, res){
    var parametros = req.body;
    var titulo = parametros.titulo;

    Cancion.findOne({titulo: titulo}, (err, cancionEncontrada)=>{
        if (err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!cancionEncontrada){
                res.status(404).send({
                    message: "Canción no encontrada"
                });
            }else{
            res.status(200).send({
                cancion: cancionEncontrada
            });
        }
    }
});
}

function buscarGenero(req, res){
    var parametros = req.body;
    var generoCanciones = parametros.genero;

    Cancion.find({genero: generoCanciones.toLowerCase()}, (err, cancionEncontrada)=>{
        if (err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!cancionEncontrada){
                res.status(404).send({
                    message: "Canción no encontrada"
                });
            }else{
            res.status(200).send({
                cancion: cancionEncontrada
            });
        }
    }
});

}

function actualizarCancion(req, res){
    var cancionId = req.params.id;
    var actualizarCancion = req.body;

    // db.coleccion.findByIdAndUpdate('a quien quiero actualizar', 'que campos / datos vas a modificar')
    Cancion.findByIdAndUpdate(cancionId, actualizarCancion, (err, cancionActualizada)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!cancionActualizada){
                res.status(404).send({
                    message: "No se pudo actualizar la canción"
                });
            } else{
                res.status(200).send({
                    cancion: cancionActualizada
                });
            }
        }
    });
} 

function eliminarCancion(req, res){
    var cancionId = req.params.id;

    Cancion.findByIdAndDelete(cancionId, (err, cancionEliminada)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!usuarioActualizado){
                res.status(404).send({
                    message: "No se pudo eliminar la canción"
                });
            } else{
                res.status(200).send({
                    cancion: cancionEliminada
                });
            }
        }
    });
}  


module.exports = {
    crearCancion,
    buscarCancion,
    buscarGenero,
    actualizarCancion,
    eliminarCancion
};