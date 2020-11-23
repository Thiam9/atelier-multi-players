const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const http = require('http').Server(app);
const io = require('socket.io')(http);

const { creerQuestion } = require('./indexAssisFunct');

let joueurs = [];

let question = creerQuestion();
console.log(question);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {

    socket.on('utilisateur', (nom) => {

        const joueur = {
            id: socket.id,
            nom,
            points: 0,
        }

        joueurs.push(joueur);

        updateJeu();
    });

    socket.on('reponse', (reponse) => {

        // Verifions réponse et question 
        if (parseInt(reponse) === question.resultat) {
            question = creerQuestion();

            increasePoints(socket.id);

            updateJeu();
        }
    });


    socket.on('disconnect', () => {
        // Supression de joueur de l'array
        joueurs = [...joueurs.filter(joueur => joueur.id !== socket.id)];

        // console.log(' jouer est deconnecté');
    });
});

const increasePoints = (id) => {
    joueurs = joueurs.map((joueur) => {
        if (joueur.id === id) {
            return {
                ...joueur,
                points: joueur.points + 1,
            }
        } else {
            return joueur;
        }
    })
}

const updateJeu = () => {
    const joueurClassement = joueurs.sort((a, b) => b.points - a.points).
        slice(0, 10);

    io.emit('question', question.expression);
    io.emit('joueurClassement', joueurClassement);

}

http.listen(port, () => console.log(`Serveur démarre sur le port ${port}`));


