import getQuiz from './quiz.js';

const score = document.getElementById('score');
const quizContainer = document.querySelector('.quiz-wrapper');
const h2 = document.createElement('h2');
const quizOpt = document.createElement('ul');
const answerContainer = document.querySelector('.answer-wrapper');
const checkBtn = document.getElementById('check-btn');
const playBtn = document.getElementById('play-btn');

let currentScore = 0;
let questionCount = 1;
let currentQuiz;

function displayQuiz(quiz) {
    currentQuiz = quiz;
    h2.innerHTML = `Q.${questionCount}: ` + quiz.question;
    quizOpt.innerHTML = '';
    const options = quiz.incorrect_answers.concat(quiz.correct_answer);
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const li = document.createElement('li');
        li.innerHTML = option;

        li.addEventListener('click', () => {
            quizOpt.childNodes.forEach(item => {
                item.style.backgroundColor = '';
                item.style.color = '';
                item.classList.remove('selected');
            });
            li.style.backgroundColor = 'lightblue';
            li.classList.add('selected');
        });
        quizOpt.appendChild(li);
    });
    quizContainer.innerHTML = '';
    quizContainer.append(h2, quizOpt);
}

function checkAnswer() {
    const correctAnswer = currentQuiz.correct_answer;
    checkBtn.disabled = true;
    let selectedAnswer = quizOpt.querySelector('.selected');
    if (!selectedAnswer) {
        return;
    }
    selectedAnswer = selectedAnswer.textContent;
    console.log(selectedAnswer);

    if (selectedAnswer == correctAnswer) {
        answerContainer.innerHTML = '<i class="fa-solid fa-circle-check"></i> Correct!';
        currentScore++;
        score.innerHTML = currentScore;
    } else {
        answerContainer.innerHTML = `
        <i class="fa-solid fa-circle-xmark"></i> Incorrect! The correct answer is: ${correctAnswer}
        `;
    }
    
    quizOpt.childNodes.forEach(item => {
        if (item.textContent == correctAnswer) {
            item.style.backgroundColor = 'lightgreen';
            item.style.color = 'black';
        } else {
            item.style.backgroundColor = 'lightcoral';
            item.style.color = 'black';
        }
    });
}

async function startQuiz() {
    const quizData = await getQuiz();
    quizData.forEach(quiz => displayQuiz(quiz));
    score.innerHTML = currentScore;

    checkBtn.addEventListener('click', async () => {
        const selectedAnswer = quizOpt.querySelector('.selected');
        if (!selectedAnswer) {
            return;
        }
        questionCount++;
        checkAnswer();

        setTimeout(async () => {
            answerContainer.innerHTML = '';
            checkBtn.disabled = false;

            if (questionCount  <= 10) {
                const nextQuizData = await getQuiz();
                displayQuiz(nextQuizData[0]);
            } else {
                quizContainer.innerHTML = '';
                answerContainer.innerHTML = 'Quiz completed!';
                checkBtn.style.display = 'none';
            }
        }, 2000);
    });

    playBtn.addEventListener('click', async () => {
        currentScore = 0;
        questionCount = 1;
        checkBtn.style.display = 'block';
        answerContainer.innerHTML = '';
        const quizData = await getQuiz();
        quizData.forEach(quiz => displayQuiz(quiz));
        score.innerHTML = currentScore;
    });
}

export default startQuiz;