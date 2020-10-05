const creerQuestion = () => {
    const num1 = randomNumber();
    const num2 = randomNumber();
    const op = '*';

    const expression = `${num1}  ${op} ${num2}`;

    return {
        expression: expression,
        resultat: eval(expression),
    }
}

const randomNumber = () => {
    return Math.floor(Math.random() * 10);
}

module.exports = {
    creerQuestion,
    randomNumber,

}