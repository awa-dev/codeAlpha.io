var express = require('express');
var router = express.Router();
const Interventions = require("../models/intervention");
// Page racine
router.get("/", async function (req, res, next) {
Interventions.find({}, function (err, result) {
if (err) {
res.send(err);
} else {
res.render("interventions", {
title: "Générateur QR Code",
 interventions: result });
}
});
});
module.exports = router;
