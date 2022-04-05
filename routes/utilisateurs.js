var express = require('express');
var router = express.Router();
const Utilisateurs = require("../models/utilisateur");
// Page racine
router.get("/", async function (req, res, next) {
Utilisateurs.find({}, function (err, result) {
if (err) {
res.send(err);
} else {
res.render("utilisateurs", {
title: "Générateur QR Code",
 utilisateurs: result });
}
});
});
module.exports = router;
