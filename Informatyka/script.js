document.addEventListener("DOMContentLoaded", () => {
  const quizzes = document.querySelectorAll(".quiz-block");

  quizzes.forEach((quiz) => {
    const button = quiz.querySelector(".check-btn");
    const result = quiz.querySelector(".result");

    button.addEventListener("click", () => {
      const questions = quiz.querySelectorAll(".question");
      let score = 0;

      questions.forEach((question) => {
        const selected = question.querySelector('input[type="radio"]:checked');
        if (!selected) {
          return;
        }

        const correctAnswer = selected.value === "a";
        if (correctAnswer) {
          score += 1;
        }
      });

      const total = questions.length;
      const percent = Math.round((score / total) * 100);

      result.classList.remove("success", "error");

      if (percent >= 70) {
        result.textContent = `Вітаємо! Ви набрали ${score} з ${total} балів (${percent}%).`;
        result.classList.add("success");
      } else if (percent >= 40) {
        result.textContent = `Непогано! Ви набрали ${score} з ${total} балів (${percent}%). Повторіть тему перед наступним тестом.`;
        result.classList.add("error");
      } else {
        result.textContent = `Результат: ${score} з ${total} балів (${percent}%). Потрібно повторити правила тем.`;
        result.classList.add("error");
      }
    });
  });
});

const topics = [
  {
    id: 1,
    title: "HTML: основи",
    description: "HTML — це мова розмітки, за допомогою якої створюють структуру веб-сторінки: заголовки, абзаци, кнопки, списки, таблиці та інші елементи.",
    explanation: "HTML задає структуру сторінки. Він не відповідає за стиль, а за будову контенту. Кожен тег описує тип елемента: заголовок, текст, посилання, зображення або кнопка.",
    rules: [
      "HTML складається з тегів.",
      "Тег відкривається і закривається, якщо це потрібно.",
      "HTML описує структуру, а не стиль сторінки."
    ],
    help: "Розуміння HTML допомагає розміщувати контент, створювати сторінки та будувати основу сайту.",
    summary: "HTML — це основа будь-якого сайту. Без нього сторінка не матиме структури і змісту.",
    questions: [
      { prompt: "Що таке HTML?", options: ["Мова розмітки веб-сторінок", "Мова програмування для баз даних", "Операційна система", "Графічний редактор"], answer: 0 },
      { prompt: "Для чого потрібні теги в HTML?", options: ["Щоб описати структуру сторінки", "Щоб редагувати відео", "Щоб запускати комп'ютер", "Щоб зберігати файли"], answer: 0 },
      { prompt: "Що найчастіше задає HTML?", options: ["Структуру контенту", "Колір фону", "Швидкість Інтернету", "Розмір монітора"], answer: 0 }
    ]
  },
  {
    id: 2,
    title: "HTML: заголовки й абзаци",
    description: "На сторінці використовують заголовки для структури тексту. Абзаци потрібні для основного контенту, а заголовки допомагають швидко орієнтуватися в тексті.",
    explanation: "Теги h1-h6 відображають заголовки різного рівня. Заголовок h1 найголовніший, а h6 — найменший. Параграф p використовується для звичайного тексту.",
    rules: [
      "h1 — головний заголовок сторінки.",
      "p використовується для абзаців.",
      "Заголовки допомагають структурувати інформацію."
    ],
    help: "Правильна структура тексту робить сайт зрозумілішим і зручнішим для користувача.",
    summary: "Заголовки й абзаци — основні інструменти розмітки тексту в HTML.",
    questions: [
      { prompt: "Який тег найчастіше використовують для головного заголовка?", options: ["<h1>", "<p>", "<img>", "<button>"], answer: 0 },
      { prompt: "Для чого використовують <p>?", options: ["Для абзацу тексту", "Для картинки", "Для таблиці", "Для підключення стилів"], answer: 0 },
      { prompt: "Що означає h2?", options: ["Заголовок другого рівня", "Параграф", "Кнопку", "Поле вводу"], answer: 0 }
    ]
  },
  {
    id: 3,
    title: "HTML: посилання та зображення",
    description: "Посилання дозволяють переходити між сторінками й ресурсами, а зображення додають візуальний контент до сайту.",
    explanation: "Тег a створює посилання, а атрибут href вказує адресу, на яку перейти. Тег img вставляє картинку, а alt задає підпис для зображення.",
    rules: [
      "href вказує адресу посилання.",
      "img додає зображення до сторінки.",
      "alt пояснює, що зображено на картинці."
    ],
    help: "Посилання й зображення роблять сайт цікавішим і зручнішим для користувача.",
    summary: "Посилання та картинки — це базові елементи веб-сторінки.",
    questions: [
      { prompt: "Який атрибут вказує адресу посилання?", options: ["href", "src", "alt", "class"], answer: 0 },
      { prompt: "Який тег потрібен для картинки?", options: ["<img>", "<a>", "<table>", "<ul>"], answer: 0 },
      { prompt: "Для чого потрібен alt?", options: ["Щоб пояснити зміст картинки", "Щоб зробити текст жирним", "Щоб додати фон", "Щоб відкрити сайт"], answer: 0 }
    ]
  },
  {
    id: 4,
    title: "HTML: списки й таблиці",
    description: "Списки використовують для переліку елементів. Таблиці застосовують для показу даних у колонках і рядках.",
    explanation: "Список ul містить список пунктів li, а ol — упорядкований список. Таблиця table складається з рядків tr, комірок td та заголовків th.",
    rules: [
      "ul — маркований список.",
      "ol — нумерований список.",
      "table використовується для даних у вигляді таблиці."
    ],
    help: "Списки й таблиці роблять інформацію структурованою і легкою для читання.",
    summary: "Списки і таблиці — важливі елементи для подання інформації.",
    questions: [
      { prompt: "Який тег створює список з маркерами?", options: ["<ul>", "<table>", "<img>", "<p>"], answer: 0 },
      { prompt: "Для чого потрібен <table>?", options: ["Для відображення даних у табличному вигляді", "Для зображення", "Для тексту", "Для посилань"], answer: 0 },
      { prompt: "Що таке <li>?", options: ["Пункт списку", "Список", "Таблиця", "Заголовок"], answer: 0 }
    ]
  },
  {
    id: 5,
    title: "HTML: форми",
    description: "Форми використовують для введення даних: імен, паролів, пошти, повідомлень, пошуку тощо.",
    explanation: "Тег form створює форму, а input — поле для введення. Кнопка submit відправляє дані. Форми використовують на сторінках входу, реєстрації та пошуку.",
    rules: [
      "form — це контейнер для форми.",
      "input — поле для вводу.",
      "button або submit відправляє дані."
    ],
    help: "Форми дозволяють взаємодіяти з користувачем і збирати інформацію.",
    summary: "Без форм сайти не могли б збирати дані від користувачів.",
    questions: [
      { prompt: "Для чого потрібні форми?", options: ["Для введення даних користувачем", "Для розміщення картинок", "Для редагування відео", "Для створення списку"], answer: 0 },
      { prompt: "Який тег створює поле для введення?", options: ["<input>", "<p>", "<img>", "<div>"], answer: 0 },
      { prompt: "Що таке submit?", options: ["Кнопка відправлення форми", "Заголовок", "Пункт списку", "Посилання"], answer: 0 }
    ]
  },
  {
    id: 6,
    title: "HTML: семантичні теги",
    description: "Семантичні теги описують зміст частини сторінки: шапка, основний блок, навігація, підвал, стаття.",
    explanation: "header, nav, main, article, section, footer — це семантичні теги. Вони роблять код зрозумілішим і покращують доступність сайту.",
    rules: [
      "header — верхня частина сторінки.",
      "nav — навігація.",
      "main — основний контент, footer — підвал."
    ],
    help: "Семантичні теги полегшують читання коду та роботу пошукових систем.",
    summary: "Семантичні теги роблять HTML більш зрозумілим і якісним.",
    questions: [
      { prompt: "Що означає тег <header>?", options: ["Шапка сайту", "Таблиця", "Зображення", "Список"], answer: 0 },
      { prompt: "Для чого потрібен <nav>?", options: ["Для навігаційного меню", "Для тексту", "Для картинок", "Для форми"], answer: 0 },
      { prompt: "Що містить <main>?", options: ["Основний вміст сторінки", "Підвал", "Логотип", "Тільки посилання"], answer: 0 }
    ]
  },
  {
    id: 7,
    title: "CSS: основи",
    description: "CSS — це мова стилів. За її допомогою задають колір, відступи, шрифти, розміри, фони і розташування елементів.",
    explanation: "CSS працює через правила: селектор і властивості. Селектор вказує, який елемент стилізувати, а властивості — що змінити.",
    rules: [
      "CSS задає стилізацію.",
      "Селектор знаходить елемент.",
      "Властивості описують зовнішній вигляд."
    ],
    help: "CSS робить сайт красивим, зручним і професійним за виглядом.",
    summary: "Без CSS сторінка була б просто текстом і блоками без стилю.",
    questions: [
      { prompt: "Що робить CSS?", options: ["Стилізує веб-сторінку", "Додає таблиці", "Керує файлами", "Видає звуки"], answer: 0 },
      { prompt: "Що таке селектор у CSS?", options: ["Той елемент, який стилізують", "Кнопка на сторінці", "Таблиця даних", "Папка з файлами"], answer: 0 },
      { prompt: "Навіщо потрібні властивості CSS?", options: ["Щоб задавати колір, розмір і відступи", "Щоб запускати комп'ютер", "Щоб створити базу даних", "Щоб писати текст"], answer: 0 }
    ]
  },
  {
    id: 8,
    title: "CSS: селектори",
    description: "Селектори допомагають вибрати певні елементи сторінки та застосувати до них стиль.",
    explanation: "Існують селектори за тегом, класом і id. Наприклад, p вибирає всі абзаци, .card — всі елементи з класом card, а #title — конкретний елемент з id title.",
    rules: [
      "Tеговий селектор вибирає всі однакові теги.",
      "Клас вибирає групу елементів.",
      "id — унікальний ідентифікатор."
    ],
    help: "Селектори дозволяють стилізувати сторінку точно і без зайвих змін.",
    summary: "Селектори — це спосіб вибрати потрібні елементи для стилізації.",
    questions: [
      { prompt: "Що таке клас у CSS?", options: ["Спосіб вибрати групу елементів", "Назва картинки", "Тег таблиці", "Кнопка форми"], answer: 0 },
      { prompt: "Що робить селектор p?", options: ["Вибирає всі абзаци", "Вибирає всі картинки", "Вибирає всі форми", "Вибирає заголовки"], answer: 0 },
      { prompt: "Чим відрізняється id від class?", options: ["id унікальний, class може повторюватися", "id завжди повторюється", "class не має значення", "id не можна використовувати зовсім"], answer: 0 }
    ]
  },
  {
    id: 9,
    title: "CSS: box model",
    description: "Box model описує, як елемент складається з контенту, внутрішніх відступів, рамок і зовнішніх відступів.",
    explanation: "Кожен HTML-елемент має ширину, висоту, padding, border і margin. Вони впливають на розмір і відстань між блоками.",
    rules: [
      "content — вміст елемента.",
      "padding — внутрішній відступ.",
      "margin — зовнішній відступ."
    ],
    help: "Розуміння box model допомагає точно розташовувати елементи на сторінці.",
    summary: "Box model — основа грамотного оформлення блоків.",
    questions: [
      { prompt: "Що таке padding?", options: ["Внутрішній відступ", "Зовнішній відступ", "Рамка", "Колір"], answer: 0 },
      { prompt: "Що таке margin?", options: ["Відстань зовні від елемента", "Сам текст", "Фон", "Шрифт"], answer: 0 },
      { prompt: "Що входить у box model?", options: ["Контент, padding, border, margin", "Лише колір і фон", "Музика і відео", "Текст і кнопки"], answer: 0 }
    ]
  },
  {
    id: 10,
    title: "CSS: кольори та фони",
    description: "Кольори й фони роблять сторінку привабливою. Їх можна задавати за допомогою назв, HEX-кодів або RGB.",
    explanation: "Властивості color, background та background-color дозволяють змінювати зовнішній вигляд. Це важливий елемент дизайну веб-сторінки.",
    rules: [
      "color — колір тексту.",
      "background задає фон.",
      "Фон може бути однотонним або градієнтним."
    ],
    help: "Колірна гама впливає на сприйняття сайту і його стиль.",
    summary: "Кольори роблять сайт привабливим і зрозумілим.",
    questions: [
      { prompt: "Для чого потрібна властивість color?", options: ["Щоб задати колір тексту", "Щоб зробити кнопку", "Щоб додати картинку", "Щоб відкрити посилання"], answer: 0 },
      { prompt: "Що таке background?", options: ["Фон елемента", "Назва елемента", "Значення в Input", "Посилання"], answer: 0 },
      { prompt: "Які варіанти кольорів використовують у CSS?", options: ["Назви, HEX, RGB", "Лише годинник", "Лише текст", "Лише цифри"], answer: 0 }
    ]
  },
  {
    id: 11,
    title: "CSS: flexbox",
    description: "Flexbox — це спосіб вирівнювання елементів в одному рядку або колонці. Він дуже зручний для меню, карток і контейнерів.",
    explanation: "display: flex; створює flex-контейнер. За допомогою justify-content і align-items можна вирівнювати елементи горизонтально та вертикально.",
    rules: [
      "display: flex; включає flexbox.",
      "justify-content вирівнює по горизонталі.",
      "align-items вирівнює по вертикалі."
    ],
    help: "Flexbox дозволяє швидко і красиво розміщувати елементи на сторінці.",
    summary: "Flexbox — один із найзручніших способів створення сучасного макета.",
    questions: [
      { prompt: "Що дає display: flex;?", options: ["Розташування елементів у контейнері", "Створення форми", "Видалення тексту", "Зміна шрифту"], answer: 0 },
      { prompt: "Що робить justify-content?", options: ["Вирівнює елементи по головній осі", "Змінює фон", "Запускає анімацію", "Додає рамку"], answer: 0 },
      { prompt: "Для чого використовується align-items?", options: ["Для вирівнювання по поперечній осі", "Для відправлення форми", "Для створення таблиці", "Для посилання"], answer: 0 }
    ]
  },
  {
    id: 12,
    title: "CSS: grid",
    description: "CSS Grid дозволяє створювати складні макети з колонками і рядками. Це зручно для карток, сайдбарів і головних секцій популярних сайтів.",
    explanation: "Grid дає змогу задавати структуру сторінки у вигляді сітки. Елементи можуть займати кілька колонок або рядків, що дуже зручно для дизайну.",
    rules: [
      "display: grid; створює сітку.",
      "grid-template-columns задає колонки.",
      "grid-template-rows задає рядки."
    ],
    help: "Grid допомагає будувати складні і професійні макети без зайвого коду.",
    summary: "CSS Grid — потужний інструмент для сучасних веб-сторінок.",
    questions: [
      { prompt: "Що таке CSS Grid?", options: ["Сітка для макету сторінки", "Кнопка", "Таблиця", "Формат файлу"], answer: 0 },
      { prompt: "Що задає grid-template-columns?", options: ["Кількість колонок", "Колір тексту", "Підпис картинки", "Ширину кнопки"], answer: 0 },
      { prompt: "Для чого використовують grid?", options: ["Для складних макетів", "Для підключення CSS", "Для створення форм", "Для пошуку"], answer: 0 }
    ]
  },
  {
    id: 13,
    title: "CSS: шрифти та текст",
    description: "Шрифти, розмір, жирність, міжрядковий інтервал і вирівнювання впливають на читабельність тексту.",
    explanation: "font-size, font-weight, line-height, text-align і letter-spacing допомагають контролювати зовнішній вигляд письма на сторінці.",
    rules: [
      "font-size змінює розмір тексту.",
      "font-weight робить текст жирнішим.",
      "text-align рівняє текст."
    ],
    help: "Правильно оформлений текст легше читати і краще сприймається користувачами.",
    summary: "Текст — це головний елемент сайту, тому його стилізація дуже важлива.",
    questions: [
      { prompt: "Що робить font-size?", options: ["Змінює розмір тексту", "Змінює фон", "Додає кнопку", "Сховані стилі"], answer: 0 },
      { prompt: "Для чого використовується text-align?", options: ["Для вирівнювання тексту", "Для встановлення фону", "Для створення форми", "Для формул"], answer: 0 },
      { prompt: "Що дає font-weight?", options: ["Жирність тексту", "Колір фону", "Розмір картки", "Ширину блоків"], answer: 0 }
    ]
  },
  {
    id: 14,
    title: "CSS: адаптивний дизайн",
    description: "Адаптивний дизайн робить сайт зручним на комп'ютері, планшеті та телефоні.",
    explanation: "За допомогою медіа-запитів CSS може змінювати стилі залежно від ширини екрана. Це потрібно для якісної роботи мобільних пристроїв.",
    rules: [
      "@media використовується для адаптації.",
      "Сайт повинен добре виглядати на різних екранах.",
      "Мобільний дизайн — важливий для користувачів."
    ],
    help: "Адаптивний дизайн робить сайт зручнішим і сучаснішим.",
    summary: "Сучасний сайт повинен гарно виглядати на будь-якому пристрої.",
    questions: [
      { prompt: "Що таке адаптивний дизайн?", options: ["Дизайн, який підлаштовується під різні екрани", "Музичний стиль", "Тип бази даних", "Формат зображення"], answer: 0 },
      { prompt: "Для чого потрібні медіа-запити?", options: ["Щоб змінювати стилі під різні пристрої", "Щоб відправляти форми", "Щоб писати текст", "Щоб зберігати файли"], answer: 0 },
      { prompt: "Чому важливий адаптивний дизайн?", options: ["Бо користувачі відкривають сайти з різних пристроїв", "Бо він не потрібен", "Бо це лише естетика", "Бо лише для десктопів"], answer: 0 }
    ]
  },
  {
    id: 15,
    title: "JavaScript: синтаксис",
    description: "JavaScript — мова сценаріїв, яка додає динамічність і інтерактивність сайту: кнопки, меню, валідацію і анімації.",
    explanation: "У JS використовують змінні, оператори, функції та об'єкти. Програма виконується в браузері і реагує на дії користувача.",
    rules: [
      "JS додає інтерактивність сайту.",
      "Код виконується послідовно.",
      "JS працює разом з HTML і CSS."
    ],
    help: "JavaScript робить сайт живим. Без нього сторінки були б статичними.",
    summary: "JavaScript — це мова поведінки веб-сторінки.",
    questions: [
      { prompt: "Що дає JavaScript?", options: ["Інтерактивність сайту", "Лише зображення", "Підпис до кнопок", "Шрифт"], answer: 0 },
      { prompt: "З чим працює JavaScript?", options: ["З HTML і CSS", "Лише з папками", "Тільки з базами даних", "Тільки з текстом"], answer: 0 },
      { prompt: "Яка роль JavaScript на сайті?", options: ["Додає поведінку та взаємодію", "Робить сайт статичним", "Видаляє інші мови", "Змінює апаратне забезпечення"], answer: 0 }
    ]
  },
  {
    id: 16,
    title: "JavaScript: змінні та типи даних",
    description: "Змінні зберігають дані: числа, рядки, булеві значення або списки.",
    explanation: "let і const використовуються для створення змінних. Числа, рядки і булеві значення — основні типи даних у JavaScript.",
    rules: [
      "let і const зберігають значення.",
      "String — рядок, Number — число, Boolean — правда/неправда.",
      "Змінні можна використовувати повторно."
    ],
    help: "Змінні потрібні для зберігання інформації в програмі.",
    summary: "Змінні — основа програмування в JavaScript.",
    questions: [
      { prompt: "Для чого потрібні змінні?", options: ["Щоб зберігати дані", "Щоб створювати стилі", "Щоб редагувати картинки", "Щоб писати HTML"], answer: 0 },
      { prompt: "Який тип даних є рядок?", options: ["String", "Number", "Boolean", "Array"], answer: 0 },
      { prompt: "Яка команда створює змінну?", options: ["let name = 'Іван';", "<p>", "img src", "color: red;"], answer: 0 }
    ]
  },
  {
    id: 17,
    title: "JavaScript: умови та цикли",
    description: "Умови дозволяють перевіряти ситуації, а цикли повторювати дії кілька разів.",
    explanation: "if перевіряє умову, а else виконує іншу дію. Цикл for повторює код певну кількість разів.",
    rules: [
      "if перевіряє умову.",
      "else виконується, якщо умова не справдилася.",
      "for повторює дію кілька разів."
    ],
    help: "Умови та цикли роблять програму логічною і автоматизованою.",
    summary: "Логіка умов і циклів — це фундамент програмування.",
    questions: [
      { prompt: "Для чого потрібен if?", options: ["Для перевірки умов", "Для стилізації тексту", "Для створення таблиці", "Для вставки картинок"], answer: 0 },
      { prompt: "Що робить цикл for?", options: ["Повторює дію кілька разів", "Міняє фон", "Видаляє картинку", "Складає таблицю"], answer: 0 },
      { prompt: "Що відбувається в else?", options: ["Виконується інша дія, якщо умова не вірна", "Спрацьовує лише при помилці", "Змінює стиль сторінки", "Нічого не відбувається"], answer: 0 }
    ]
  },
  {
    id: 18,
    title: "JavaScript: функції та події",
    description: "Функції дозволяють повторно використовувати код, а події реагують на кліки, наведення і введення даних користувачем.",
    explanation: "Функція об'єднує кілька дій в один блок. addEventListener() стежить за подіями, наприклад click, і запускає певну дію.",
    rules: [
      "Функція дозволяє повторно використовувати код.",
      "Події відбуваються після дії користувача.",
      "addEventListener() обробляє події."
    ],
    help: "Функції та події роблять сторінку інтерактивною і зручною в користуванні.",
    summary: "Функції і події — основа взаємодії користувача зі сторінкою.",
    questions: [
      { prompt: "Що таке функція в JavaScript?", options: ["Блок коду, який можна викликати повторно", "Заголовок сторінки", "Таблиця даних", "Кнопка форми"], answer: 0 },
      { prompt: "Для чого потрібне addEventListener()?", options: ["Щоб реагувати на кліки та інші дії", "Щоб змінювати CSS", "Щоб записувати текст", "Щоб створити таблицю"], answer: 0 },
      { prompt: "Що означає подія click?", options: ["Клік мишею", "Зміна кольору", "Випадкова дія", "Видалення файлу"], answer: 0 }
    ]
  },
  {
    id: 19,
    title: "JavaScript: DOM",
    description: "DOM — це модель HTML-елементів, яку можна змінювати через JavaScript: міняти текст, стилі, додавати і видаляти блоки.",
    explanation: "document.querySelector() знаходить потрібний елемент, а .textContent або .style дозволяють змінювати його вміст та вигляд.",
    rules: [
      "DOM це структура HTML.",
      "JavaScript може змінювати DOM.",
      "querySelector() знаходить елемент."
    ],
    help: "DOM дозволяє робити сторінку живою: змінювати текст, кнопки, блоки й стилі.",
    summary: "DOM — це зв'язок між HTML і JavaScript.",
    questions: [
      { prompt: "Що таке DOM?", options: ["Модель HTML-елементів сторінки", "Тип бази даних", "Пошуковий запит", "Графічний редактор"], answer: 0 },
      { prompt: "Для чого використовують querySelector()?", options: ["Щоб знайти елемент в HTML", "Щоб видалити текст", "Щоб створити фон", "Щоб відкрити браузер"], answer: 0 },
      { prompt: "Що можна змінювати через DOM?", options: ["Текст, стилі та структуру сторінки", "Лише мишку", "Лише шрифти", "Лише кольори"], answer: 0 }
    ]
  },
  {
    id: 20,
    title: "Практика: міні-проєкт",
    description: "Остання тема об'єднує HTML, CSS і JavaScript у один невеликий проєкт: сторінку з кнопкою, текстом і стилями.",
    explanation: "У міні-проєкті можна створити карточку, кнопку, блок з текстом і дію при натисканні. Так ти побачиш, як усі три технології працюють разом.",
    rules: [
      "HTML задає структуру.",
      "CSS робить сторінку красивою.",
      "JavaScript додає інтерактивність."
    ],
    help: "Практика допомагає застосувати знання на реальному прикладі і краще запам'ятати матеріал.",
    summary: "Веб-розробка — це синтез HTML, CSS і JavaScript в одному проєкті.",
    questions: [
      { prompt: "Що відповідає за структуру сторінки?", options: ["HTML", "JavaScript", "CSS", "USB"], answer: 0 },
      { prompt: "Що відповідає за стиль і дизайн?", options: ["CSS", "HTML", "Python", "База даних"], answer: 0 },
      { prompt: "Що робить JavaScript?", options: ["Додає інтерактивність", "Створює текстові теги", "Називає форми", "Редагує шрифти"], answer: 0 }
    ]
  }
];

const finalTest = [
  { prompt: "Що таке HTML?", options: ["Мова розмітки веб-сайту", "Мова баз даних", "Операційна система", "Формат відео"], answer: 0 },
  { prompt: "Для чого потрібен CSS?", options: ["Для стилізації сторінки", "Для збереження файлів", "Для створення бази даних", "Для навігації по комп'ютеру"], answer: 0 },
  { prompt: "Що таке JavaScript?", options: ["Мова інтерактивності веб-сторінки", "Тег HTML", "Файл зображення", "Шрифт"], answer: 0 },
  { prompt: "Який тег створює абзац?", options: ["<p>", "<img>", "<ul>", "<button>"], answer: 0 },
  { prompt: "Для чого потрібен href?", options: ["Щоб вказати адресу посилання", "Щоб змінити колір", "Щоб додати картинку", "Щоб створити форму"], answer: 0 },
  { prompt: "Що дає display: flex;?", options: ["Розміщення елементів у контейнері", "Відправку форми", "Створення заголовка", "Пошук картинки"], answer: 0 },
  { prompt: "Що означає if в JavaScript?", options: ["Перевірка умови", "Стилізація елемента", "Пошук кнопки", "Створення таблиці"], answer: 0 },
  { prompt: "Що робить function?", options: ["Створює повторюваний блок коду", "Видаляє текст", "Додає фон", "Розташовує зображення"], answer: 0 },
  { prompt: "Що таке DOM?", options: ["Модель HTML-елементів сторінки", "Колір тексту", "Функція обробки даних", "Лінія у CSS"], answer: 0 },
  { prompt: "Що описує HTML?", options: ["Структуру сторінки", "Тільки стиль", "Тільки анімації", "Тільки бази даних"], answer: 0 },
  { prompt: "Який атрибут додає зображенню опис?", options: ["alt", "href", "src", "type"], answer: 0 },
  { prompt: "Яка властивість CSS змінює колір тексту?", options: ["color", "margin", "padding", "width"], answer: 0 },
  { prompt: "Що робить border-radius?", options: ["Заокруглює кути елемента", "Задає фоновий колір", "Видаляє рамку", "Робить текст жирним"], answer: 0 },
  { prompt: "Що таке медіа-запит @media?", options: ["Правило для стилів під різні екрани", "Тег картинок", "Тип бази даних", "Команда JavaScript"], answer: 0 },
  { prompt: "Яка з вивчених мов часто використовується для автоматизації та обробки даних?", options: ["Python", "HTML", "CSS", "SQL"], answer: 0 },
  { prompt: "Який результат дасть print(5 + 2)?", options: ["7", "5", "2", "10"], answer: 0 },
  { prompt: "Яке значення має вираз 10 > 6 у Python?", options: ["True", "False", "10", "6"], answer: 0 },
  { prompt: "Який тег створює кнопку в HTML?", options: ["<button>", "<input>", "<a>", "<p>"], answer: 0 },
  { prompt: "Що дає оператор === в JavaScript?", options: ["Перевіряє рівність без приведення типів", "Додає два числа", "Створює функцію", "Змінює колір"], answer: 0 },
  { prompt: "Яка команда в Python виводить текст?", options: ["print()", "input()", "read()", "write()"], answer: 0 },
  { prompt: "Для чого потрібен список у Python?", options: ["Щоб зберігати кілька значень", "Щоб стилізувати сторінку", "Щоб створювати теги", "Щоб малювати графіку"], answer: 0 },
  { prompt: "Що означає цикл for?", options: ["Повторення коду кілька разів", "Підключення стилів", "Відкриття сайту", "Завантаження даних"], answer: 0 }
];

const finalAssessmentThreshold = 16;

const topicCodeChallenges = {
  1: {
    prompt: "Який результат виведе цей код?\nprint(5 + 2)",
    options: ["7", "5", "2", "10"],
    answer: 0,
    explanation: "Плюс додає числа: 5 + 2 = 7."
  },
  2: {
    prompt: "Який результат виведе цей код?\nprint(10 - 4)",
    options: ["4", "6", "14", "10"],
    answer: 1,
    explanation: "10 - 4 = 6."
  },
  3: {
    prompt: "Який результат виведе цей код?\nprint(3 * 4)",
    options: ["12", "7", "9", "4"],
    answer: 0,
    explanation: "Множення 3 * 4 дорівнює 12."
  },
  4: {
    prompt: "Який результат виведе цей код?\nprint(8 / 2)",
    options: ["4.0", "8", "2", "16"],
    answer: 0,
    explanation: "У Python оператор / виконує звичайне ділення, тому результат виводиться як 4.0."
  },
  5: {
    prompt: "Який результат виведе цей код?\nprint(2 + 2 * 2)",
    options: ["8", "6", "4", "2"],
    answer: 1,
    explanation: "Спочатку виконується множення: 2 * 2 = 4, потім 2 + 4 = 6."
  },
  6: {
    prompt: "Який результат виведе цей код?\nprint(15 % 4)",
    options: ["3", "4", "15", "1"],
    answer: 0,
    explanation: "15 % 4 = 3, бо 4 * 3 = 12, а залишок 3."
  },
  7: {
    prompt: "Який результат виведе цей код?\nprint(7 > 5)",
    options: ["True", "False", "7", "5"],
    answer: 0,
    explanation: "7 більше 5, тому результат — True."
  },
  8: {
    prompt: "Який результат виведе цей код?\nprint(10 == 10)",
    options: ["True", "False", "10", "0"],
    answer: 0,
    explanation: "10 дорівнює 10, тому умова істинна."
  },
  9: {
    prompt: "Який результат виведе цей код?\nprint(4 < 2)",
    options: ["False", "True", "4", "2"],
    answer: 0,
    explanation: "4 менше 2 — це неправда, тому False."
  },
  10: {
    prompt: "Який результат виведе цей код?\nprint(5 + 3 == 8)",
    options: ["True", "False", "8", "3"],
    answer: 0,
    explanation: "5 + 3 = 8, тому вираз вірний і дає True."
  },
  11: {
    prompt: "Який результат виведе цей код?\nfor i in range(3):\n    print(i)",
    options: ["0, 1, 2", "1, 2, 3", "0, 1, 2, 3", "3, 2, 1"],
    answer: 0,
    explanation: "range(3) дає числа 0, 1, 2."
  },
  12: {
    prompt: "Який результат виведе цей код?\nfor i in range(2):\n    print(i + 1)",
    options: ["1, 2", "0, 1", "2, 3", "1, 1"],
    answer: 0,
    explanation: "Спочатку i = 0 => 1, потім i = 1 => 2."
  },
  13: {
    prompt: "Який результат виведе цей код?\nname = \"Іван\"\nprint(name)",
    options: ["Іван", "name", "І", "Ivan"],
    answer: 0,
    explanation: "Змінна name зберігає рядок \"Іван\" і виводиться як є."
  },
  14: {
    prompt: "Який результат виведе цей код?\na = [1, 2, 3]\nprint(len(a))",
    options: ["3", "2", "1", "6"],
    answer: 0,
    explanation: "У списку 3 елементи, отже довжина дорівнює 3."
  },
  15: {
    prompt: "Який результат виведе цей код?\nnums = [10, 20, 30]\nprint(nums[1])",
    options: ["20", "10", "30", "1"],
    answer: 0,
    explanation: "Індекс 1 в списку означає другий елемент, тобто 20."
  },
  16: {
    prompt: "Що поверне цей код?\ndef add(a, b):\n    return a + b\nprint(add(2, 3))",
    options: ["5", "2", "3", "6"],
    answer: 0,
    explanation: "Функція повертає суму 2 + 3 = 5."
  },
  17: {
    prompt: "Який результат виведе цей код?\nnumber = 9\nif number > 5:\n    print(\"ok\")",
    options: ["ok", "9", "5", "error"],
    answer: 0,
    explanation: "9 > 5, тому виконується блок if і виводиться ok."
  },
  18: {
    prompt: "Який результат виведе цей код?\npassword = \"12345\"\nif len(password) >= 5:\n    print(\"Пароль підходить\")",
    options: ["Пароль підходить", "12345", "False", "error"],
    answer: 0,
    explanation: "Довжина рядка 5, а 5 >= 5, тому умова вірна."
  },
  19: {
    prompt: "Який результат виведе цей код?\nfor i in range(1, 4):\n    print(i)",
    options: ["1, 2, 3", "0, 1, 2", "1, 2, 3, 4", "2, 3, 4"],
    answer: 0,
    explanation: "range(1, 4) дає числа 1, 2, 3."
  },
  20: {
    prompt: "Який результат виведе цей код?\nresult = 2 * 3 + 4\nprint(result)",
    options: ["10", "14", "8", "6"],
    answer: 0,
    explanation: "Спочатку 2 * 3 = 6, потім 6 + 4 = 10."
  }
};

const STORAGE_KEY = "informatika-progress";
const state = {
  selectedTopicId: 1,
  completedTopics: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
};

const pageMode = window.location.pathname.toLowerCase().includes("lesson.html") ? "lesson" : "home";

const topicList = document.getElementById("topicList");
const topicDetail = document.getElementById("topicDetail");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completedTopics));
}

function updateProgress() {
  const completed = state.completedTopics.length;
  const percent = Math.round((completed / topics.length) * 100);
  if (progressText) progressText.textContent = `${completed}/${topics.length} тем`;
  if (progressBar) progressBar.style.width = `${percent}%`;
}

function getInitialTopic() {
  const params = new URLSearchParams(window.location.search);
  const topicFromUrl = Number(params.get("topic"));
  if (topicFromUrl && topicFromUrl >= 1 && topicFromUrl <= topics.length) {
    return topicFromUrl;
  }
  return 1;
}

if (pageMode === "lesson") {
  state.selectedTopicId = getInitialTopic();
}

function renderTopicList(justCompletedTopicId = null) {
  if (!topicList) return;

  topicList.innerHTML = topics
    .map((topic) => {
      const isDone = state.completedTopics.includes(topic.id);
      const isActive = topic.id === state.selectedTopicId;
      return `
        <button class="topic-button ${isDone ? "done" : ""} ${isActive ? "active" : ""} ${topic.id === justCompletedTopicId ? "just-completed" : ""}" data-topic-id="${topic.id}">
          <div class="topic-button-header">
            <strong>Тема ${topic.id}</strong>
            <small aria-label="${isDone ? "Виконано" : "Не пройдено"}">${isDone ? "✓" : "•"}</small>
          </div>
          <div>${topic.title}</div>
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".topic-button").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTopicId = Number(button.dataset.topicId);
      state.selectedTopicId = nextTopicId;
      const url = new URL(window.location.href);
      url.searchParams.set("topic", String(nextTopicId));
      window.history.pushState({}, "", url);
      renderTopicList();
      renderTopicDetail();
    });
  });
}

function renderTopicDetail() {
  const topic = topics.find((item) => item.id === state.selectedTopicId);
  if (!topic) return;

  const isDone = state.completedTopics.includes(topic.id);
  const nextTopic = topics.find((item) => item.id === topic.id + 1);
  const prevTopic = topics.find((item) => item.id === topic.id - 1);

  const questionsMarkup = topic.questions
    .map((question, index) => {
      return `
        <div class="question-block" data-question="${index}">
          <p>${index + 1}. ${question.prompt}</p>
          ${question.options
            .map((option, optionIndex) => {
              return `
                <label>
                  <input type="radio" name="topic-${topic.id}-q-${index}" value="${optionIndex}" />
                  ${option}
                </label>
              `;
            })
            .join("")}
        </div>
      `;
    })
    .join("");

  const challenge = topicCodeChallenges[topic.id];
  const challengeMarkup = challenge ? `
    <div class="practice-box lesson-section">
      <h4>7. Кодинг-задача</h4>
      <pre>${challenge.prompt}</pre>
      <div class="code-options">
        ${challenge.options
          .map((option, optionIndex) => `
            <label>
              <input type="radio" name="topic-code-${topic.id}" value="${optionIndex}" />
              ${option}
            </label>
          `)
          .join("")}
      </div>
      <div class="topic-actions">
        <button class="check-btn" type="button" data-code-check="${topic.id}">Перевірити код</button>
      </div>
      <div class="topic-result topic-code-result"></div>
    </div>
  ` : "";

  topicDetail.innerHTML = `
    <div class="topic-header">
      <div>
        <span class="topic-badge">Тема ${topic.id}</span>
        <h3>${topic.title}</h3>
      </div>
    </div>

    <div class="lesson-flow">
      <div class="lesson-section">
        <h4>1. Тема</h4>
        <p>${topic.description}</p>
      </div>

      <div class="lesson-section">
        <h4>2. Правила</h4>
        <ul class="rules-list">
          ${topic.rules.map((rule) => `<li>${rule}</li>`).join("")}
        </ul>
      </div>

      <div class="lesson-section">
        <h4>3. Пояснення</h4>
        <p>${topic.explanation}</p>
      </div>

      <div class="lesson-section">
        <h4>4. Як це допоможе</h4>
        <p>${topic.help}</p>
      </div>

      <div class="lesson-section">
        <h4>5. Висновок</h4>
        <p>${topic.summary}</p>
      </div>

      <div class="practice-box lesson-section">
        <h4>6. Контрольні запитання</h4>
        ${questionsMarkup}
        <div class="topic-actions">
          <button class="check-btn" type="button" data-topic-id="${topic.id}">Перевірити</button>
          ${isDone ? `<button class="next-btn" type="button" data-next-topic="${nextTopic ? nextTopic.id : ""}">${nextTopic ? "Наступна тема" : "Кінець курсу"}</button>` : ""}
        </div>
        <div class="topic-result"></div>
      </div>

      ${challengeMarkup}

      <div class="lesson-section next-topic-block">
        <div class="next-topic-nav">
          ${prevTopic ? `<button class="secondary-btn nav-btn" type="button" data-prev-topic="${prevTopic.id}">Назад</button>` : ""}
          ${nextTopic ? `<button class="next-btn nav-btn" type="button" data-next-topic="${nextTopic.id}">Наступна тема</button>` : `<button class="primary-btn finish-course-btn" type="button">Завершити курс</button>`}
        </div>
      </div>
    </div>
  `;

  topicDetail.classList.remove("is-visible");
  void topicDetail.offsetWidth;
  topicDetail.classList.add("is-visible");

  const checkButton = topicDetail.querySelector(".check-btn[data-topic-id]");
  const result = topicDetail.querySelector(".topic-result");

  checkButton?.addEventListener("click", () => {
    let score = 0;
    const total = topic.questions.length;
    const wrongQuestions = [];
    const unansweredQuestions = [];

    topic.questions.forEach((question, index) => {
      const block = topicDetail.querySelector(`.question-block[data-question="${index}"]`);
      const selected = topicDetail.querySelector(`input[name="topic-${topic.id}-q-${index}"]:checked`);
      const options = block.querySelectorAll('input[type="radio"]');

      block.classList.remove("correct", "incorrect", "missed");
      options.forEach((option) => {
        const label = option.closest("label");
        label.classList.remove("correct-option", "wrong-option");
      });

      if (!selected) {
        unansweredQuestions.push(index + 1);
        block.classList.add("missed");
        return;
      }

      if (Number(selected.value) === question.answer) {
        score += 1;
        block.classList.add("correct");
        const correctLabel = Array.from(options).find((option) => Number(option.value) === question.answer)?.closest("label");
        if (correctLabel) {
          correctLabel.classList.add("correct-option");
        }
        return;
      }

      wrongQuestions.push(index + 1);
      block.classList.add("incorrect");
      const selectedLabel = selected.closest("label");
      if (selectedLabel) {
        selectedLabel.classList.add("wrong-option");
      }

      const correctLabel = Array.from(options).find((option) => Number(option.value) === question.answer)?.closest("label");
      if (correctLabel) {
        correctLabel.classList.add("correct-option");
      }
    });

    const percent = Math.round((score / total) * 100);
    result.classList.remove("success", "error");

    if (percent >= 70) {
      result.textContent = `Правильно! Ти відповів на ${score}/${total} питань (${percent}%).`;
      result.classList.add("success");
      if (!state.completedTopics.includes(topic.id)) {
        state.completedTopics.push(topic.id);
        state.completedTopics.sort((a, b) => a - b);
        saveProgress();
        updateProgress();
        renderTopicList(topic.id);
        renderTopicDetail();
      }
    } else {
      const details = [];
      if (wrongQuestions.length) details.push(`помилки в питаннях ${wrongQuestions.join(", ")}`);
      if (unansweredQuestions.length) details.push(`не відповіли на ${unansweredQuestions.join(", ")}`);
      result.textContent = `Не все вірно. Ти набрав ${score}/${total}. ${details.length ? `Переглянь: ${details.join("; ")}.` : "Спробуй ще раз."}`;
      result.classList.add("error");
    }
  });

  const codeCheckButton = topicDetail.querySelector("[data-code-check]");
  const codeResult = topicDetail.querySelector(".topic-code-result");

  codeCheckButton?.addEventListener("click", () => {
    if (!challenge || !codeResult) return;

    const selected = topicDetail.querySelector(`input[name="topic-code-${topic.id}"]:checked`);
    if (!selected) {
      codeResult.textContent = "Спочатку вибери відповідь.";
      codeResult.classList.add("error");
      return;
    }

    const isCorrect = Number(selected.value) === challenge.answer;
    codeResult.classList.remove("success", "error");

    if (isCorrect) {
      codeResult.textContent = `Правильно! ${challenge.explanation}`;
      codeResult.classList.add("success");
    } else {
      codeResult.textContent = `Неправильно. ${challenge.explanation}`;
      codeResult.classList.add("error");
    }
  });

  const finishButton = topicDetail.querySelector(".finish-course-btn");
  if (finishButton) {
    finishButton.addEventListener("click", () => {
      if (state.completedTopics.length !== topics.length) {
        alert("Спочатку пройди всі теми, щоб відкрити підсумковий тест.");
        return;
      }
      window.location.href = "index.html#final-test";
    });
  }

  const nextButtons = topicDetail.querySelectorAll("[data-next-topic]");
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextId = Number(button.dataset.nextTopic);
      if (nextId) {
        state.selectedTopicId = nextId;
        const url = new URL(window.location.href);
        url.searchParams.set("topic", String(nextId));
        window.history.pushState({}, "", url);
        renderTopicList();
        renderTopicDetail();
      }
    });
  });

  const prevButtons = topicDetail.querySelectorAll("[data-prev-topic]");
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const prevId = Number(button.dataset.prevTopic);
      if (prevId) {
        state.selectedTopicId = prevId;
        const url = new URL(window.location.href);
        url.searchParams.set("topic", String(prevId));
        window.history.pushState({}, "", url);
        renderTopicList();
        renderTopicDetail();
      }
    });
  });
}

function renderFinalTest() {
  const target = document.getElementById("final-test");
  if (!target) return;

  const allDone = state.completedTopics.length === topics.length;
  target.innerHTML = allDone ? `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Фінальний контроль</p>
        <h2>Загальний тест по всіх темах</h2>
      </div>
      <div class="final-test-box">
        <div class="quiz-block final-quiz">
          ${finalTest
            .map((question, index) => {
              return `
                <div class="question-block">
                  <p>${index + 1}. ${question.prompt}</p>
                  ${question.options
                    .map((option, optionIndex) => {
                      return `
                        <label>
                          <input type="radio" name="final-q-${index}" value="${optionIndex}" />
                          ${option}
                        </label>
                      `;
                    })
                    .join("")}
                </div>
              `;
            })
            .join("")}
          <div class="test-actions">
            <button class="check-btn" type="button" id="finalTestBtn">Підсумковий тест</button>
          </div>
          <div class="test-result" id="finalTestResult"></div>
        </div>
      </div>
    </div>
  ` : `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Фінальний контроль</p>
        <h2>Загальний тест по всіх темах</h2>
      </div>
      <div class="final-test-box locked-box">
        <p>Щоб відкрити підсумковий тест, потрібно пройти всі 20 тем.</p>
      </div>
    </div>
  `;

  if (allDone) {
    document.getElementById("finalTestBtn").addEventListener("click", () => {
      const result = document.getElementById("finalTestResult");
      let score = 0;
      finalTest.forEach((question, index) => {
        const selected = document.querySelector(`input[name="final-q-${index}"]:checked`);
        if (!selected) return;
        if (Number(selected.value) === question.answer) score += 1;
      });

      const total = finalTest.length;
      const percent = Math.round((score / total) * 100);
      const passed = score >= finalAssessmentThreshold;
      result.classList.remove("success", "error");

      if (passed) {
        result.textContent = `Вітаємо! Ти пройшов підсумковий тест: ${score}/${total} (${percent}%).`;
        result.classList.add("success");

        const cta = document.createElement("div");
        cta.className = "course-2-cta";
        cta.innerHTML = `
          <a class="primary-btn" href="#course-2">Почати курс №2</a>
        `;

        const existingCta = document.querySelector(".course-2-cta");
        if (!existingCta) {
          result.insertAdjacentElement("afterend", cta);
        }

        showCourseFeedbackModal({ score, total, passed: true });
      } else {
        result.textContent = `Результат: ${score}/${total} (${percent}%). Повторно вивчи теми і спробуй ще раз.`;
        result.classList.add("error");
        showCourseFeedbackModal({ score, total, passed: false });
      }
    });
  }
}

function openResultShare(app, message) {
  const shareText = encodeURIComponent(message);
  const safeUrl = "https://example.com/informatika-course";

  if (app === "telegram") {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(safeUrl)}&text=${shareText}`, "_blank", "noopener,noreferrer");
    return;
  }

  if (app === "viber") {
    window.open(`viber://forward?text=${shareText}`, "_blank", "noopener,noreferrer");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(message);
  }
}

function showCourseFeedbackModal(options = {}) {
  if (localStorage.getItem("course-feedback-done") === "true") {
    return;
  }

  if (document.querySelector(".feedback-modal-overlay")) {
    return;
  }

  const { score, total, passed } = options;
  const isFinalAssessment = typeof score === "number" && typeof total === "number";
  const shouldShowShareButtons = isFinalAssessment;

  const shareText = isFinalAssessment
    ? `Я завершив підсумковий тест з інформатики: ${score}/${total}. ${passed ? `Мій результат — ${score} балів. Я пройшов тест.` : "Мені треба ще повторити тему."}`
    : "Я завершив курс з інформатики.";

  const finalSummary = isFinalAssessment
    ? passed
      ? `Ти пройшов тест! Твій результат: ${score}/${total}. Ти набрав ${score} балів.`
      : `Твій результат: ${score}/${total}. Результат можна покращити.`
    : "Ти пройшов курс з HTML, CSS, JavaScript і Python. Як тобі було навчатися?";

  const teacherMessage = passed && score >= 21
    ? "Вчитель: ти показав дуже високий результат. Це сильний рівень знань із веб-розробки та логіки. Ти готовий до наступного кроку!"
    : "";

  const extraQuestions = [
    { prompt: "1. Напиши HTML-код для заголовка першого рівня з текстом 'Мій сайт'.", type: "code" },
    { prompt: "2. Створи HTML-код для кнопки з текстом 'Натисни мене'.", type: "code" },
    { prompt: "3. Напиши HTML-код для посилання, яке веде на https://example.com.", type: "code" },
    { prompt: "4. Створи HTML-список із 3 пунктами: HTML, CSS, JavaScript.", type: "code" },
    { prompt: "5. Напиши HTML-форму з полем для імені та кнопкою 'Відправити'.", type: "code" },
    { prompt: "6. Напиши CSS, який зробить текст червоним і розміром 24px.", type: "code" },
    { prompt: "7. Напиши CSS для кнопки з синім фоном, білим текстом і заокругленими краями.", type: "code" },
    { prompt: "8. Напиши CSS, який створить блок шириною 300px, висотою 120px і синім фоном.", type: "code" },
    { prompt: "9. Напиши CSS для центрування блоку по центру сторінки.", type: "code" },
    { prompt: "10. Напиши CSS, який зробить рамку 2px solid black і відступи 20px.", type: "code" },
    { prompt: "11. Напиши JavaScript, де змінна a = 10, b = 5, а потім виведи їх суму в консоль.", type: "code" },
    { prompt: "12. Напиши JS-код, який перевіряє, чи число 18 більше 10, і виводить 'Вірно'.", type: "code" },
    { prompt: "13. Напиши функцію в JavaScript, яка повертає добуток двох чисел.", type: "code" },
    { prompt: "14. Напиши JS-код, який змінює текст у кнопці на 'Готово' після кліку.", type: "code" },
    { prompt: "15. Напиши цикл for, який виводить числа 1, 2, 3, 4, 5.", type: "code" },
    { prompt: "16. У чому різниця між let і const у JavaScript? Напиши коротко.", type: "text" },
    { prompt: "17. Чому важливий CSS Flexbox для розміщення блоків на сайті?", type: "text" },
    { prompt: "18. Яка роль атрибута alt у тега <img>?", type: "text" },
    { prompt: "19. Напиши Python-код, який виводить 'Привіт, світ!'.", type: "code" },
    { prompt: "20. Напиши Python-код, який запитує ім'я користувача і виводить 'Привіт, {ім'я}'.", type: "code" },
    { prompt: "21. Напиши Python-код, який перевіряє, чи число більше 10, і виводить відповідне повідомлення.", type: "code" },
    { prompt: "22. Напиши Python-функцію, яка повертає квадрат числа.", type: "code" },
    { prompt: "23. Розв'яжи задачу: у списку [2, 4, 6, 8] знайди суму всіх чисел і напиши відповідь.", type: "text" },
    { prompt: "24. Напиши коротку задачу на JavaScript або Python, де використані умова, цикл і функція разом.", type: "code" }
  ];

  const overlay = document.createElement("div");
  overlay.className = "feedback-modal-overlay";
  overlay.innerHTML = `
    <div class="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <button class="feedback-close" type="button" aria-label="Закрити">×</button>
      <h3 id="feedback-title">${passed && score >= 21 ? "Це надзвичайний результат!" : passed ? "Ти пройшов тест!" : "Дякуємо тобі за навчання!"}</h3>
      <p>${finalSummary}</p>
      ${teacherMessage ? `<p class="teacher-note">${teacherMessage}</p>` : ""}
      ${shouldShowShareButtons ? `
        <div class="share-row">
          <button class="secondary-btn" type="button" data-share="telegram">Поділитися в Telegram</button>
          <button class="secondary-btn" type="button" data-share="viber">Поділитися у Viber</button>
          <button class="secondary-btn" type="button" data-share="copy">Скопіювати результат</button>
        </div>
      ` : ""}

      <div class="rating-row">
        ${[1, 2, 3, 4, 5]
          .map(
            (value) => `
              <label class="rating-item">
                <input type="radio" name="course-rating" value="${value}" />
                <span>${value}</span>
              </label>
            `
          )
          .join("")}
      </div>

      <div class="feedback-actions">
        <button class="primary-btn" type="button" id="submitCourseRating">Надіслати оцінку</button>
        <button class="secondary-btn" type="button" id="extraQuestionsBtn">Додаткові запитання</button>
      </div>

      <div id="courseFeedbackExtra" class="feedback-extra hidden">
        <div class="extra-questions-list">
          ${extraQuestions
            .map(
              (item, index) => `
                <div class="extra-question">
                  <label for="extra-question-${index}">${item.prompt}</label>
                  ${item.type === "code"
                    ? `<textarea id="extra-question-${index}" rows="3" placeholder="Відповідь..."></textarea>`
                    : `<textarea id="extra-question-${index}" rows="2" placeholder="Відповідь..."></textarea>`}
                </div>
              `
            )
            .join("")}
        </div>
        <button class="primary-btn" type="button" id="sendExtraFeedback">Відправити відповіді</button>
      </div>

      <div id="courseFeedbackResult" class="feedback-result"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector(".feedback-close");
  closeBtn.addEventListener("click", () => overlay.remove());

  const submitBtn = overlay.querySelector("#submitCourseRating");
  const result = overlay.querySelector("#courseFeedbackResult");

  submitBtn.addEventListener("click", () => {
    const selected = overlay.querySelector('input[name="course-rating"]:checked');

    if (!selected) {
      result.textContent = "Оберіть оцінку від 1 до 5.";
      result.classList.add("error");
      return;
    }

    result.textContent = `Дякуємо! Ти поставив оцінку ${selected.value}/5.`;
    result.classList.remove("error");
    result.classList.add("success");
    localStorage.setItem("course-feedback-done", "true");
  });

  const extraQuestionsBtn = overlay.querySelector("#extraQuestionsBtn");
  const extraPanel = overlay.querySelector("#courseFeedbackExtra");
  extraQuestionsBtn.addEventListener("click", () => {
    extraPanel.classList.toggle("hidden");
  });

  overlay.querySelector("#sendExtraFeedback").addEventListener("click", () => {
    const answered = extraQuestions.filter((_, index) => {
      const value = overlay.querySelector(`#extra-question-${index}`)?.value.trim();
      return value && value.length > 0;
    }).length;

    if (answered === 0) {
      result.textContent = "Напиши хоча б одну відповідь, щоб відправити додаткові запитання.";
      result.classList.add("error");
      return;
    }

    result.textContent = `Дякуємо! Ти відповів на ${answered} з ${extraQuestions.length} додаткових запитань.`;
    result.classList.remove("error");
    result.classList.add("success");
    localStorage.setItem("course-feedback-done", "true");
  });

  if (shouldShowShareButtons) {
    overlay.querySelectorAll("[data-share]").forEach((button) => {
      button.addEventListener("click", () => {
        const app = button.dataset.share;
        openResultShare(app, shareText);
      });
    });
  }
}

function setupHomeAnimations() {
  const animatedCards = document.querySelectorAll(
    ".info-card, .roadmap-step, .tech-topic, .tech-intro p, .hero-card, .final-test-box"
  );
  const counters = document.querySelectorAll("[data-count]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal(element) {
    element.classList.add("is-revealed");
    element.querySelectorAll("[data-count]").forEach((counter) => {
      if (counter.dataset.counted) return;
      counter.dataset.counted = "true";
      const target = Number(counter.dataset.count);
      if (reducedMotion) {
        counter.textContent = String(target);
        return;
      }

      const duration = 900;
      const start = performance.now();
      const updateCounter = () => {
        const now = performance.now();
        const progress = Math.min((now - start) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        counter.textContent = String(Math.round(target * easedProgress));
        if (progress >= 1) {
          window.clearInterval(counter.dataset.counterTimer);
          delete counter.dataset.counterTimer;
        }
      };

      counter.dataset.counterTimer = String(window.setInterval(updateCounter, 16));
      updateCounter();
    });
  }

  animatedCards.forEach((card) => card.classList.add("reveal-on-scroll"));

  counters.forEach((counter) => {
    if (!counter.closest(".hero-card")) {
      counter.textContent = counter.dataset.count;
    }
  });

  const revealVisibleCards = () => {
    animatedCards.forEach((card) => {
      if (card.classList.contains("is-revealed")) return;
      const bounds = card.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0) {
        reveal(card);
      }
    });
  };

  window.addEventListener("scroll", revealVisibleCards, { passive: true });
  window.addEventListener("resize", revealVisibleCards);
  revealVisibleCards();
}

function setupTechReferences() {
  const htmlBase = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/";
  const cssBase = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  const javascriptBase = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/";
  const pythonBase = "https://docs.python.org/3/";
  const references = {
    CSS: {
      "display: flex": `${cssBase}display`,
    },
    JavaScript: {
      "let / const": `${javascriptBase}Statements/let`,
      function: `${javascriptBase}Statements/function`,
      "if ... else": `${javascriptBase}Statements/if...else`,
      for: `${javascriptBase}Statements/for`,
      while: `${javascriptBase}Statements/while`,
      "alert()": `${javascriptBase}Global_Objects/alert`,
      "document.queryselector()": `${javascriptBase}Global_Objects/Document/querySelector`,
      "addeventlistener()": `${javascriptBase}Global_Objects/EventTarget/addEventListener`,
      "console.log()": `${javascriptBase}Global_Objects/console/log`,
    },
    Python: {
      "print()": `${pythonBase}library/functions.html#print`,
      "input()": `${pythonBase}library/functions.html#input`,
      if: `${pythonBase}reference/compound_stmts.html#if`,
      for: `${pythonBase}reference/compound_stmts.html#for`,
      while: `${pythonBase}reference/compound_stmts.html#while`,
      def: `${pythonBase}reference/compound_stmts.html#function-definitions`,
      list: `${pythonBase}library/stdtypes.html#list`,
      dict: `${pythonBase}library/stdtypes.html#mapping-types-dict`,
      "len()": `${pythonBase}library/functions.html#len`,
      return: `${pythonBase}reference/simple_stmts.html#the-return-statement`,
    },
  };

  document.querySelectorAll(".tech-topic").forEach((topic) => {
    const heading = topic.querySelector("h3")?.textContent || "";
    const language = ["HTML", "CSS", "JavaScript", "Python"].find((name) => heading.startsWith(name));
    if (!language) return;

    topic.querySelectorAll(".tech-table tbody tr").forEach((row) => {
      const cell = row.querySelector("td");
      if (!cell || cell.querySelector("a")) return;

      const label = cell.textContent.trim();
      let url;
      if (language === "HTML") {
        const tag = label.match(/^<\s*([a-z][a-z0-9]*)\s*>/i)?.[1];
        if (tag) url = `${htmlBase}${tag}`;
      } else {
        url = references[language][label.toLowerCase()];
        if (language === "CSS" && !url) {
          url = `${cssBase}${label.toLowerCase()}`;
        }
      }
      if (!url) return;

      const link = document.createElement("a");
      link.className = "tech-reference-link";
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.title = `Відкрити пояснення: ${label}`;
      link.textContent = label;
      cell.replaceChildren(link);
    });
  });
}

if (pageMode === "lesson") {
  renderTopicList();
  renderTopicDetail();
} else {
  updateProgress();
  renderFinalTest();
  setupHomeAnimations();
  setupTechReferences();
}

window.addEventListener("load", () => {
  if (pageMode === "home") {
    // The final knowledge test is opened only after all topics are completed.
  }
});
