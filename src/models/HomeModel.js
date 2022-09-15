const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    descricao: String
})

const HomeModel = mongoose.model('Model', HomeSchema);

module.exports = HomeModel;