const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CancionSchema = new Schema({
    titulo: String,
    numero: String,
    duracion: String,
    url: String,
    genero: String,
    artista: String,
    album: String
});

// module.exports = mongoose.model('nombre de la colección en la BD', Schema que se creo)
module.exports = mongoose.model('Musica', CancionSchema);