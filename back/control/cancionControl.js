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
    cancion.numeroCancion = parametros.numeroCancion;
    cancion.duracionCancion = parametros.duracionCancion;
    cancion.urlCancion = null;
    cancion.generoCancion = parametros.generoCancion;
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



/*
function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Buscamos al usuario a través del correo. Usamos toLowerCase() para evitar problemas de datos
    Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor!!"
            });
        }else {
            if(!usuarioLogueado){
                res.status(404).send({
                    message: "No has podido iniciar sesión. Verifica que tus datos sean correctos"
                });
            }else{
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(404).send({
                        message: "Contraseña incorrecta!"
                    });
                } else{
                    res.status(200).send({
                        usuario: usuarioLogueado
                    });
                }
            }
        }
    });
}


function actualizarUsuario(req, res){
    var usuarioId = req.params.id;
    var datosUsuarioActualizar = req.body;

    // db.coleccion.findByIdAndUpdate('a quien quiero actualizar', 'que campos / datos vas a modificar')
    Usuario.findByIdAndUpdate(usuarioId, datosUsuarioActualizar, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({
                message: "Error en el servidor"
            });
        }else{
            if(!usuarioActualizado){
                res.status(404).send({
                    message: "No se pudo actualizar"
                });
            } else{
                res.status(200).send({
                    usuario: usuarioActualizado
                });
            }
        }
    });
} */

module.exports = {
    crearCancion,
    /*login,
    actualizarUsuario*/
};