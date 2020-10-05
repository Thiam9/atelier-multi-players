const userEl = document.getElementById('user');
const submissionEl = document.getElementById('submission');
const introEl = document.getElementById('intro');
const jeuxEl = document.getElementById('jeu');
const questionEl = document.getElementById('question');
const joueurClassementEl = document.getElementById('joueurClassement');


let socket;

userEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = e.target['nom'].value;

    if (nom) {

        socket = window.io();




        socket.emit('utilisateur', nom);

        startGame()
    }
});

const startGame = () => {
    introEl.classList.add('hidden');
    jeuxEl.classList.remove('hidden');

    socket.on('question', (question) => {
        questionEl.innerText = `${question} = ?`;

    });

    socket.on('joueurClassement', (joueurClassement) => {
        joueurClassementEl.innerHTML = ` 
        ${joueurClassement.map((joueur) => `<li class="flex justify-between"><strong class=" mr-4 text-green-600"> ${joueur.nom} </strong>  <strong class=" text-red-400">${joueur.points} </strong> 
        </li>`).join('')}`;

    });
}

submissionEl.addEventListener('submit', e => {
    e.preventDefault();

    const reponse = e.target['reponse'].value;

    if (reponse) {
        socket.emit('reponse', reponse);
        //vider 
        e.target['reponse'].value = '';
    }
})
