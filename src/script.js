const startBtn = document.getElementById('start-btn');
const startPage = document.querySelector('.start-page');
const testPage = document.querySelector('.test-page');
const resultsPage = document.querySelector('.results-page');
const questionBoard = document.getElementById('question-board');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const answersContainer = document.getElementById('answers');
const backBtn = document.getElementById('back-btn');
const nextBtn = document.getElementById('next-btn');
const resultsText = document.getElementById('results-text');

let currentQuestionIndex = 0;

// Вопросы для теста
const questions = [
    {
        text: "Какой четверти пространства принадлежит точка B?",
        image: "img/zd1.png",
        answers: ["1 четверти", "2 четверти", "3 четверти", "4 четверти"],
        correct: [1] // индексы правильных ответов, начиная с 0. нет
    },
    {
        text: "Какая из точек, изображенных на рисунке, лежит на плоскости П2?",
        image: "img/zd2.png",
        answers: ["точка A", "точка B", "точка C", "точка D", "точка F"],
        correct: [2]
    },
    {
        text: "Какая из прямых изображенных на рисунке является профильной проецирующей прямой?",
        image: "img/zd3.png",
        answers: ["прямая h", "прямая a", "прямая d", "прямая c", "прямая l"],
        correct: [0]
    }
];

// Массив для ответов пользователя
const userAnswers = questions.map(() => []);

// Функция для переключения между страницами
function showSection(section) {
    startPage.classList.add('hidden');
    testPage.classList.add('hidden');
    resultsPage.classList.add('hidden');

    section.classList.remove('hidden');
}

// Инициализация доски вопросов (кнопки для каждого вопроса)
function initQuestionBoard() {
    questionBoard.innerHTML = "";
    questions.forEach((_, index) => {
        const button = document.createElement('button');
        button.textContent = index + 1;
        button.onclick = () => {
            currentQuestionIndex = index;
            loadQuestion(index);
        };
        button.classList.toggle('answered', userAnswers[index].length > 0);
        questionBoard.appendChild(button);
    });
}

// Загрузка вопроса
function loadQuestion(index) {
    const question = questions[index];
    questionNumber.textContent = `Вопрос ${index + 1}`;
    questionText.textContent = question.text;
    questionImage.src = question.image;
    answersContainer.innerHTML = "";

    question.answers.forEach((answer, i) => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.textContent = `${i + 1}. ${answer}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = userAnswers[index].includes(i);
        checkbox.onclick = () => {
            if (checkbox.checked) {
                userAnswers[index].push(i);
            } else {
                const idx = userAnswers[index].indexOf(i);
                if (idx > -1) userAnswers[index].splice(idx, 1);
            }
            initQuestionBoard();
        };

        label.prepend(checkbox);
        answersContainer.appendChild(label);
    });

    backBtn.classList.toggle('hidden', index === 0);
    nextBtn.textContent = index === questions.length - 1 ? "Сохранить" : "Далее";
}

// Обработка кнопки "Начать"
startBtn.addEventListener('click', () => {
    showSection(testPage);
    initQuestionBoard();
    loadQuestion(currentQuestionIndex);
});

// Обработка кнопки "Назад"
backBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

// Обработка кнопки "Далее" или "Сохранить"
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
});

// Функция для показа результатов
function showResults() {
    const correctAnswers = questions.map(q => q.correct.sort().toString());
    const userAnswersSorted = userAnswers.map(answers => answers.sort().toString());

    const score = userAnswersSorted.reduce(
        (acc, answer, i) => acc + (answer === correctAnswers[i] ? 1 : 0),
        0
    );
    const total = questions.length;

    resultsText.textContent = `Вы ответили правильно на ${score} из ${total} вопросов.`;
    showSection(resultsPage);
}
