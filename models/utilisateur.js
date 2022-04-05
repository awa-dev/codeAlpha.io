//chargé de la description (schéma) de l’enregistrement à sauvegarder (c’est une base ou exemple) 

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    let Utilisateur = new Schema({
        //les 3 identités
    identite: String, //contient le nom et prénom
    code: String, //code sécur de la personne
    mail:String,
    poste: String, //nature du poste de la personne
    });
    module.exports = mongoose.model('Utilisateurs', Utilisateur);