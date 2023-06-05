const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = 3005;

// Middleware pour parser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Connexion à la base de données MongoDB
mongoose
    .connect("mongodb+srv://Cleolyoen:oldschool@cluster0.xgoatx4.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connecté à MongoDB"))
    .catch(err => console.log(err));

// Schéma du formulaire
const formulaireSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

// Modèle du formulaire
const Formulaire = mongoose.model('Formulaire', formulaireSchema);

// Route pour la soumission du formulaire
app.post('/submit', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    // Créer une instance du modèle Formulaire avec les données du formulaire
    const formulaire = new Formulaire({
        name: name,
        email: email,
        phone: phone,
        message: message
    });

    // Enregistrer l'instance du formulaire dans la base de données
    formulaire.save()
        .then(() => {
            res.send('Formulaire soumis avec succès');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Une erreur est survenue lors de la soumission du formulaire');
        });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});