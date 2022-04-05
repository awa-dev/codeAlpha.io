var express = require('express');
var router = express.Router();
var qrcode = require("qrcode");
const nodemailer = require("nodemailer");
const interventions = require("../models/intervention");


/* OBTENIR la page d'accueil. */
router.get('/', function(req, res, next) {
  res.render('createqr', { 
      title: 'Générateur QR CODE',
      saisie: true
    });
});

// permet de générer le qrcode
router.post("/scan", (req, res, next) => {
    let input_identite = req.body.identite;
    let input_code = req.body.code;
    let input_salle = req.body.salle;
    let input_datePrevionnelle = req.body.datePrevionnelle;
    let input_heurePrevisionnelle = req.body.heurePrevisionnelle;
    let input_heureEntree = req.body.heureEntree;
    let input_heureFin = req.body.heureFin;
    let contenuQR = input_identite + "\n" + input_code +
                    "\n" + input_salle + "\n" + input_datePrevionnelle + "\n" +
                    input_heurePrevisionnelle + "\n" + 
                    input_heureEntree + "\n" + input_heureFin; //concaténé

//création de la collection
    const intervention = new interventions({
        codeIntervenant: input_code,
        salle: input_salle,
        datePrevionnelle: input_datePrevionnelle,
        heurePrevisionnelle: input_heurePrevisionnelle,
        heureEntree: input_heureEntree,
        heureFin: input_heureFin,
       
      });
    
      intervention.save((err, result) => {
        if (err) console.log(err);
        console.log(result);
      });
    
      //envoi du qrcode par mail
    qrcode.toDataURL(contenuQR, (err, src) => {
        if (err) res.send("Un problème est survenu !!!");
        res.render("createqr", { //me rend 
        title: "Générateur QR Code",
        saisie: false,
        qr_code: src
        });

    //création un objet transporteur réutilisable à l'aide du transport SMTP par défaut et y connecter avec les identifiant 
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                // Vos identifiants à mettre...
                user: "6197b00cd23ab2",
                pass: "622d8b42616dc2"
              }
        }); 
        //mail qu'il envoi, les destinataires du message et le contenu de notre message.
        let mailOptions = {
            from: 'qrident@exemple.com',
            to: input_code+'@gmail.com',
            subject: "QRCode",
            text: "Envoi de QRCode",
            html: 'QRCode de "'+input_identite+'" : <img src="'+src+'"/>',
            attachments: [{
                filename: src,
                cid: src // Mettre à l'identique img src
            }]
        };
        // l'envoi du mail avec sendMail
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error("mail pas bien envoyé");
                console.log(error);
            } else {
                logger.info("mail bien envoyé");
                console.log('Email sent: ' + info.response);
            }
        });

    });
});

module.exports = router;
