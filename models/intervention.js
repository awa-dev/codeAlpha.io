//chargé de la description (schéma) de l’enregistrement à sauvegarder (c’est une base ou exemple) 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// la Collection Intervention
let Intervention = new Schema({
  codeIntervenant: String,
  salle: String,
  datePrevionnelle: String,
  heurePrevisionnelle: String,
  dateDebut: String,
  heureDebut: String,
  dateFin: String,
  heureFin: String,
});

module.exports = mongoose.model('interventions', Intervention);

