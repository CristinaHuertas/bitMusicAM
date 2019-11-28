const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CancionSchema = new Schema({
    titulo: String,
    numeroCancion: String,
    duracionCancion: String,
    urlCancion: String,
    generoCancion: String,
    artista: String,
    album: String
});

// module.exports = mongoose.model('nombre de la colección en la BD', Schema que se creo)
module.exports = mongoose.model('Musica', CancionSchema);