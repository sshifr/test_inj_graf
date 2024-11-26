const startBtn = document.getElementById("start-btn");
const startPage = document.querySelector(".start-page");
const testPage = document.querySelector(".test-page");
const resultsPage = document.querySelector(".results-page");
const questionBoard = document.getElementById("question-board");
const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const answersContainer = document.getElementById("answers");
const backBtn = document.getElementById("back-btn");
const nextBtn = document.getElementById("next-btn");
const resultsText = document.getElementById("results-text");

let currentQuestionIndex = 0;

// Вопросы для теста
const questions = [
  {
    text: "Какой четверти пространства принадлежит точка B?",
    image: "img/zd1.png",
    answers: ["1 четверти", "2 четверти", "3 четверти", "4 четверти"],
    correct: [1], // индексы правильных ответов, начиная с 0
  },
  {
    text: "Какая из точек, изображенных на рисунке, лежит на плоскости П2?",
    image: "img/zd2.png",
    answers: ["точка A", "точка B", "точка C", "точка D", "точка F"],
    correct: [2],
  },
  {
    text: "Какая из прямых изображенных на рисунке является профильной проецирующей прямой?",
    image: "img/zd3.png",
    answers: ["прямая h", "прямая a", "прямая d", "прямая c", "прямая l"],
    correct: [0],
  },
  {
    text: "Какие из изображенных на рисунке прямых не пересекаются между собой?",
    image: "img/zd5.png",
    answers: [
      "прямые a и b",
      "прямые l и m",
      "прямые c и d",
      "прямые l и n",
      "прямые h и f",
    ],
    correct: [2, 4],
  },
  {
    text: "На рисунке изображены различные варианты задания плоскости. Укажите варианты задания плоскости тремя точками",
    image: "img/zd6.png",
    answers: ["а.", "б.", "в.", "г.", "Нет верного вариант"],
    correct: [0],
  },
  {
    text: "На рисунке изображены четыре плоскости, заданные разными способами. Укажите горизонтально проецирующую плоскость.",
    image: "img/zd7.png",
    answers: ["а.", "б.", "в.", "г."],
    correct: [3],
  },
  {
    text: `Укажите обычную последовательность построений для определения точки пересечений прямой l с плоскостью 🔼
    1. определяем видимость прямой относительно плоскости 🔼
    2. строим точку пересечений прямой l с линией пересечения вспомогательной плоскости и заданной 🔼
    3. проводим через прямую l вспомогатеьную плокость, обычно плоскость общего пложения.
    4. проводим через прямую l вспомогательную плоскость, обычно проецирующую.
    5. строим линию пересечения вспомогательной плоскости с заданной 🔼`,
    image: "",
    answers: ["3-5-2-1", "1-4-5-2", "4-5-2-1", "5-2-1-4", "4-5-1-2"],
    correct: [2],
  },
  {
    text: "На рисунке изображены четыре плоскости, каждая пересекается прямой l. На каком рисунке в качестве вспомогательной плоскости применена горизонтальная проецирующая плоскость.",
    image: "img/zd10.png",
    answers: ["а.", "б.", "в.", "г.", "на всех рисунках"],
    correct: [1],
  },
  {
    text: "На рисунке изображены четыре плоскости каждая пересекается прямой l и построены точки пересечения. На каких рисунках при решении задачи применена горизонтально проецирующая плоскость.",
    image: "img/zd11.png",
    answers: [
      "а.",
      "б.",
      "в.",
      "г.",
      "На приведенных присунках горизонтально проецирующая не применялась",
    ],
    correct: [1],
  },
  {
    text: "На рисунке представлено решение одной и той же задачи, построения линии двух плоскостей общего положения KN. Приемы решения на рис.а и б разные. Укажите какая вспомогательная плоскость использовалась при решении задачи на рис.а для построения точки К.",
    image: "img/zd12.png",
    answers: [
      "горизонтально проецирующая плоскость, проведенная через сторону ED",
      "фронтально проецирующая плоскость, проведенная через сторону ED",
      "горизонтально проецирующая плоскость, проведенную через сторону TD",
      "фронтально поецирующую плоскость, проведенную через TD",
    ],
    correct: [1],
  },
  {
    text: "На рисунке представлены варианты построения расстояния от точки S до плосксти 🔼(h1, f2). Укажите рисунок соответствующий правильному решению.",
    image: "img/zd13.png",
    answers: ["а.", "б.", "в.", "г.", "д"],
    correct: [4],
  },
  {
    text: "Укажите условия перпендикулярности на чертеже прямой к плоскости.",
    image: "",
    answers: [
      "горизонтальная проекция прямой перпендикулярна на чертеже горизонтальной проекции любой прямой принадлежащей плоскости.",
      "горизонтальная проекция прямой перпендикулярна на чертеже горизонтальной проекции горизонтали плоскости.",
      "фронтальная проекция прямой перпендикулярная на чертеже фронтальной проекции любой прямой принадлежащей плоскости",
      "фронтальная проекция прямой перпендикулярна на чертеже фронтальной проекции фронтали плоскости",
    ],
    correct: [1, 3],
  },
  {
    text: "Укажите способы преобразования чертежа при котором положение плоскостей проекций изменяется.",
    image: "",
    answers: [
      "Способ вращения вокруг проецирующей оси",
      "Способ замены плоскостей проекций",
      "Способ плоскопараллельного перемещения",
      "Способ вращения вокруг линии уровня",
    ],
    correct: [1],
  },
  {
    text: "При использовании метода вращения в качестве осей обычно используют",
    image: "",
    answers: [
      "Проецирующие прямые",
      "Прямые общего положения",
      "Прямые уровня",
      "Следы плоскостей",
    ],
    correct: [0, 2, 3],
  },
  {
    text: "Укажите способы преобразования чертежа при котором положения плоскостей проекций не изменятся",
    image: "",
    answers: [
      "Способ вращения вокруг проецирующей оси",
      "Способ замены плоскостей проекций",
      "Способ плоскопараллельного перемещения",
      "Способ вращения вокруг линии уровня",
    ],
    correct: [0, 2, 3],
  },
  {
    text: "Какое общее определение можно дать пирамиде?",
    image: "",
    answers: [
      "Пирамида - многогранник, у которого в основании многоугольник, а боковые грани - треугольники",
      "Пирамида - многогранник, у которого в основании многоугольник, а боковые грани - параллелограммы",
      "Пирамида - многогранник, у которого в основании четырехугольник, а боковые грани - параллелограммы",
      "Пирамида - многогранник, у которого все грани многоугольники, боковые грани - также многоугольники",
      "Пирамида - многогранник, полученный в результате пересечения многогранного пространственного угла плоскости",
    ],
    correct: [0],
  },
  {
    text: "На рисунке указан способ задания поверхности",
    image: "img/zd35.png",
    answers: ["Аналитический", "Графический", "Кинематический", "Каркасный"],
    correct: [3],
  },
  {
    text: "Кинематический способ задания поверхности",
    image: "",
    answers: [
      "Поверхность образована непрерывной линией в пространстве линии или на поверхности",
      "Поверхность образована непрерывным перемещением линии или поверхности",
      "Поверхность образована непрерывным перемещением в пространстве линии или поверхности по определенному закону",
      "Поверхность образована непрерывным перемещением в пространстве линии или поверхности",
    ],
    correct: [2],
  },
  {
    text: "Выберете правильное определение цилиндра",
    image: "",
    answers: [
      "Поверхность, образованная движением образующей параллельной некоторому направлению и пересекающую направляющую",
      "Поверхность, образоованная движением прямой, параллельной некоторому направлению, и пересекающую прямую",
      "Поверхность, образованная движением прямой, параллельной некоторому направлению, и пересекающую кривую",
      "Поверхность, образованная движением образующей, параллельной кривой, и пересекающую прямую",
    ],
    correct: [0],
  },
  {
    text: "Выберете правильное определение параллели поверхности вращения",
    image: "",
    answers: [
      "Сечение поверхности вращения плоскостью, перпендикулярной ее меридиане",
      "Линии на поверхности вращения, параллельные между собой",
      "Сечение поверхности вращения плоскостью, перпендикулярной ее оси вращения",
    ],
    correct: [2],
  },
  {
    text: "Выберете правильный ответ: на рисунке изображен эпюр поверхности",
    image: "img/zd40.png",
    answers: ["Открытый тор", "Закрытый тор", "Коноид", "Сфера"],
    correct: [0],
  },
  {
    text: "На рисунке изображены различные криые поверхности. Укажите, на каком рисунке изображен цилиндр",
    image: "img/zd41.png",
    answers: ["а.", "б.", "в.", "г.", "д."],
    correct: [2],
  },
  {
    text: "На рисунке изображены поверхности, пересеченные плоскостями. Укажите рисунок, на котором цилиндр пересекается горизонтально проецирующей плоскостью.",
    image: "img/zd42.png",
    answers: ["б.", "в.", "г.", "д."],
    correct: [3],
  },
  {
    text: "На рисунке изображены конусы, пересеченные различными плоскостями. На каком рисунке линия пересечения представляет собой эллипс.",
    image: "img/zd43.png",
    answers: ["а.", "в.", "г.", "д."],
    correct: [1],
  },
  {
    text: "На рисунке изображены различные кривые поверхности пересеченные прямыми. Укажите риунки, где изображены прямые уровня",
    image: "img/zd44.png",
    answers: ["а.", "б.", "в.", "г.", "д."],
    correct: [3, 4],
  },
];

// Массив для ответов пользователя
const userAnswers = questions.map(() => []);

// Функция для переключения видимой страницы
function showSection(section) {
    // Скрыть все страницы
    startPage.classList.add("hidden");
    testPage.classList.add("hidden");
    resultsPage.classList.add("hidden");
  
    // Показать нужную страницу
    section.classList.remove("hidden");
  }

// Инициализация доски вопросов (кнопки для каждого вопроса)
function initQuestionBoard() {
  questionBoard.innerHTML = "";
  questions.forEach((_, index) => {
    const button = document.createElement("button");
    button.textContent = index + 1;
    button.onclick = () => {
      currentQuestionIndex = index;
      loadQuestion(index);
    };
    button.classList.toggle("answered", userAnswers[index].length > 0);
    questionBoard.appendChild(button);
  });

  const buttons = questionBoard.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    if (idx === currentQuestionIndex) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
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
    const label = document.createElement("label");
    label.style.display = "block";
    label.textContent = `${i + 1}. ${answer}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
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

  backBtn.classList.toggle("hidden", index === 0);
  nextBtn.textContent = index === questions.length - 1 ? "Сохранить" : "Далее";

 
  const buttons = questionBoard.querySelectorAll("button");
  buttons.forEach((btn, idx) => {
    btn.classList.remove("active");  
    if (idx === index) {
      btn.classList.add("active");  
    }
  });
}


// Обработка кнопки "Начать"
startBtn.addEventListener("click", () => {
  showSection(testPage);
  initQuestionBoard();
  loadQuestion(currentQuestionIndex);
});

// Обработка кнопки "Назад"
backBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
  }
});

// Обработка кнопки "Далее" или "Сохранить"
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
  } else {
    showResults();
  }
});

// Функция для показа результатов
function showResults() {
  const correctAnswers = questions.map((q) => q.correct.sort().toString());
  const userAnswersSorted = userAnswers.map((answers) =>
    answers.sort().toString()
  );

  const score = userAnswersSorted.reduce(
    (acc, answer, i) => acc + (answer === correctAnswers[i] ? 1 : 0),
    0
  );
  const total = questions.length;

  resultsText.textContent = `Вы ответили правильно на ${score} из ${total} вопросов.`;
  showSection(resultsPage);
}
