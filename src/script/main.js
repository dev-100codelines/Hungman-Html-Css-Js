const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const backdrop = document.getElementById('backdrop');
const finalMsg = document.getElementById('final-msg');
const msgInfo = document.getElementById('msg-info');
const playBtn = document.getElementById('play');
const indication = document.getElementById('indication');
const bodyParts = document.getElementsByClassName('body-part');
const wordList = [
    'code-Programs are made of _____', 'kids-Similar word for children', 'baby-Similar word for the infant', 'done-Similar word for completed', 'beach-This place is next to ocean', 'house-Other word for home', 'apple-This is a red colour fruit'];
let selectedWord = null;
let incorrectCount = 0;
const correctLetters = [];
const incorrectLetters = [];
let gWord,hint;

function initializeWord() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    const myArray = selectedWord.split("-");
    gWord = myArray[0];
    hint = myArray[1];
    const noOfLetters = gWord.length;
    document.getElementById("hints").innerText= "Hint : " +hint;
    for (let i = 0; i < noOfLetters; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add('letter');
        word.append(listItem);
    }}
function displayIndication() {
    indication.classList.add('visible');
    setTimeout(() => {
        indication.classList.remove('visible');
    }, 2400);
}
function updateFigure() {
    try {
        bodyParts[incorrectCount].style.display = 'block';
        incorrectCount++;
    } catch (error) {}
}
function successState() {
    setTimeout(() => {
        backdrop.classList.add('visible');
        finalMsg.classList.add('visible');
        msgInfo.textContent = 'Hurrah! You won.';
    }, 400);}
function failureState() {
    setTimeout(() => {
        backdrop.classList.add('visible');
        finalMsg.classList.add('visible');
        msgInfo.textContent = "Oops! You lost. The right word is " + gWord;
    }, 400);}
function check(ev) {
    const letterElements = document.querySelectorAll('.word .letter');
    const character = ev.key;
    if (
        !backdrop.classList.contains('visible') &&
        !indication.classList.contains('visible') &&
        ev.keyCode >= 65 && ev.keyCode <= 90
    ) {
        if (gWord.includes(character)) {
            if (correctLetters.includes(character)) {
                displayIndication();
            } else {
                correctLetters.push(character);
                const indexes = [];
                [...gWord].forEach((value, index) => {
                    if (value === character) {
                        indexes.push(index);
                    }});
                indexes.forEach((value) => {
                    letterElements[value].textContent = character;
                });}
        } else {
            if (incorrectLetters.includes(character)) {
                displayIndication();
            } else {
                incorrectLetters.push(character);
                if (!incorrect.classList.contains('visible')) {
                    incorrect.classList.add('visible');
                }
                incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
                updateFigure();
            }}}
    let formedWord = '';
    letterElements.forEach((value) => {
        formedWord += value.textContent;
    });
    if (formedWord === gWord) {
        successState();
    }
    if (incorrectCount >= 6) {
        failureState();
    }}
function startNewGame() {
    selectedWord = null;
    incorrectCount = 0;
    correctLetters.splice(0);
    incorrectLetters.splice(0);
    word.innerHTML = '';
    Array.from(bodyParts).forEach((value) => {
        value.style.display = 'none';
    });
    incorrect.classList.remove('visible');
    backdrop.classList.remove('visible');
    finalMsg.classList.remove('visible');
    initializeWord();
}
initializeWord();
window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);
