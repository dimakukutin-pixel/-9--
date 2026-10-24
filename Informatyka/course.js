const requestedGrade = new URLSearchParams(window.location.search).get("grade");
const grade = ["6", "7", "8"].includes(requestedGrade)
  ? requestedGrade
  : document.body.dataset.grade || (window.location.pathname.toLowerCase().includes("lesson10.html") ? "10" : "9");
const isMiddleGrade = ["6", "7", "8"].includes(grade);
const gradeConfig = grade === "10"
  ? {
      label: "10 клас",
      progressKey: "informatika-grade10-web-progress",
      listId: "grade10TopicList",
      detailId: "grade10TopicDetail",
      progressTextId: "grade10ProgressText",
      progressFillId: "grade10ProgressFill",
      finalTestId: "courseFinalTest",
      planUrl: "plan.html?grade=10",
      threshold: 28
    }
  : {
      label: `${grade} клас`,
      progressKey: `informatika-grade${grade}-progress`,
      listId: "topicList",
      detailId: "topicDetail",
      progressTextId: "grade9ProgressText",
      progressFillId: "grade9ProgressFill",
      finalTestId: "courseFinalTest",
      planUrl: `plan.html?grade=${grade}`,
      threshold: isMiddleGrade ? 32 : 28
    };

const sections = window.COURSE_SECTIONS;
const topics = sections.flatMap((section) => section.lessons.map((lesson) => ({ ...lesson, sectionId: section.id, sectionTitle: section.title })));
const list = document.getElementById(gradeConfig.listId);
const detail = document.getElementById(gradeConfig.detailId);
const progressText = gradeConfig.progressTextId ? document.getElementById(gradeConfig.progressTextId) : null;
const progressFill = gradeConfig.progressFillId ? document.getElementById(gradeConfig.progressFillId) : null;
const progressBar = progressFill?.closest(".progress-bar");
const finalTest = document.getElementById(gradeConfig.finalTestId);
const savedProgress = JSON.parse(localStorage.getItem(gradeConfig.progressKey) || "[]");
const completedTopics = Array.isArray(savedProgress)
  ? [...new Set(savedProgress.filter((id) => Number.isInteger(id) && id >= 1 && id <= topics.length))].sort((a, b) => a - b)
  : [];
let selectedTopicId = getInitialTopic();

if (isMiddleGrade) {
  document.title = `Навчання | Інформатика ${grade} клас`;
  document.querySelector(".brand").textContent = `Інформатика ${grade}`;
  document.querySelector(".grade10-intro .eyebrow").textContent = `Навчальний курс · ${grade} клас · НУШ`;
  document.querySelector(".grade10-intro h1").textContent = `Інформатика · ${grade} клас`;
  document.getElementById("courseDescription").textContent = "22 теми в кожному семестрі, підсумкова контрольна робота (тема 45) та фінальний тест.";
  document.getElementById("grade9ProgressText").textContent = "0 із 45 тем";
  document.querySelector(".grade10-intro .progress-bar").setAttribute("aria-valuemax", "45");
  document.querySelector(".lesson-sidebar-top h2").textContent = `План тем ${grade} класу`;
  document.querySelector(".lesson-back-wrap a").href = gradeConfig.planUrl;
  document.querySelector(".lesson-back-wrap a").textContent = "Назад до плану курсу";
  document.querySelector(".progress-bar").setAttribute("aria-label", `Прогрес курсу ${grade} класу`);
  const planNavLink = document.querySelector('.nav a[href="plan.html?grade=9"]');
  const classNavLink = document.querySelector('.nav a[href="plan.html?grade=10"]');
  planNavLink.href = gradeConfig.planUrl;
  planNavLink.textContent = "План навчання";
  classNavLink.href = "select-class.html";
  classNavLink.textContent = "Змінити клас";
  const footer = document.querySelector(".footer .container");
  if (footer) footer.textContent = `Навчальний курс з інформатики · ${grade} клас`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderReferenceTable(table) {
  if (!table) return "";
  return `
    <div class="lesson-section">
      <h4>4. Довідкова таблиця: ${escapeHTML(table.title)}</h4>
      <div class="tech-table-wrap">
        <table class="tech-table">
          <thead><tr>${table.headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead>
          <tbody>${table.rows.map((row) => `
            <tr>${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join("")}</tr>
          `).join("")}</tbody>
        </table>
      </div>
    </div>
  `;
}

function linkReferenceTerms(table, language) {
  if (!table) return;
  const htmlBase = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/";
  const cssBase = "https://developer.mozilla.org/en-US/docs/Web/CSS/";
  const javascriptBase = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/";
  const pythonBase = "https://docs.python.org/3/";
  const references = {
    javascript: {
      "let / const": `${javascriptBase}Statements/let`,
      function: `${javascriptBase}Statements/function`,
      "if ... else": `${javascriptBase}Statements/if...else`,
      for: `${javascriptBase}Statements/for`,
      while: `${javascriptBase}Statements/while`,
      "alert()": `${javascriptBase}Global_Objects/alert`,
      "document.queryselector()": `${javascriptBase}Global_Objects/Document/querySelector`,
      "addeventlistener()": `${javascriptBase}Global_Objects/EventTarget/addEventListener`,
      "console.log()": `${javascriptBase}Global_Objects/console/log`
    },
    python: {
      "print()": `${pythonBase}library/functions.html#print`,
      "input()": `${pythonBase}library/functions.html#input`,
      if: `${pythonBase}reference/compound_stmts.html#if`,
      for: `${pythonBase}reference/compound_stmts.html#for`,
      while: `${pythonBase}reference/compound_stmts.html#while`,
      def: `${pythonBase}reference/compound_stmts.html#function-definitions`,
      list: `${pythonBase}library/stdtypes.html#list`,
      dict: `${pythonBase}library/stdtypes.html#mapping-types-dict`,
      "len()": `${pythonBase}library/functions.html#len`,
      return: `${pythonBase}reference/simple_stmts.html#the-return-statement`
    }
  };

  table.querySelectorAll("tbody tr").forEach((row) => {
    const cell = row.querySelector("td");
    const label = cell?.textContent.trim();
    if (!cell || !label) return;

    let url;
    if (language === "html") {
      const tag = label.match(/^<\s*([a-z][a-z0-9]*)\s*>/i)?.[1];
      if (tag) url = `${htmlBase}${tag}`;
    } else if (language === "css") {
      const property = label.toLowerCase().startsWith("display:") ? "display" : label.toLowerCase();
      url = `${cssBase}${property}`;
    } else {
      url = references[language]?.[label.toLowerCase()];
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
}

function getInitialTopic() {
  const topicId = Number(new URLSearchParams(window.location.search).get("topic"));
  return Number.isInteger(topicId) && topicId >= 1 && topicId <= topics.length ? topicId : 1;
}

function saveProgress() {
  localStorage.setItem(gradeConfig.progressKey, JSON.stringify(completedTopics));
}

function updateProgress() {
  if (!progressText || !progressFill || !progressBar) return;
  progressText.textContent = `${completedTopics.length} із ${topics.length} тем`;
  progressFill.style.width = `${Math.round((completedTopics.length / topics.length) * 100)}%`;
  progressBar.setAttribute("aria-valuenow", String(completedTopics.length));
}

function renderTopicList(justCompletedTopicId = null) {
  list.innerHTML = sections.map((section) => {
    const sectionTopics = topics
      .map((topic, index) => ({ ...topic, id: index + 1 }))
      .filter((topic) => topic.sectionId === section.id);
    const completedInSection = sectionTopics.filter((topic) => completedTopics.includes(topic.id)).length;

    return `
      <section class="course-topic-group" aria-labelledby="group-${section.id}">
        <div class="course-topic-group-heading">
          <h3 id="group-${section.id}">${section.title}</h3>
          <span>${completedInSection}/${sectionTopics.length}</span>
        </div>
        <p class="course-topic-group-subtitle">${section.subtitle}</p>
        <div class="course-topic-group-list">
          ${sectionTopics.map((topic) => {
            const isDone = completedTopics.includes(topic.id);
            const isActive = topic.id === selectedTopicId;
            return `
              <button
                class="topic-button ${isDone ? "done" : ""} ${isActive ? "active" : ""} ${topic.id === justCompletedTopicId ? "just-completed" : ""}"
                type="button"
                data-topic-id="${topic.id}"
                aria-current="${isActive ? "step" : "false"}"
              >
                <div class="topic-button-header">
                  <strong>Тема ${topic.id}</strong>
                  <small aria-label="${isDone ? "Виконано" : "Не пройдено"}">${isDone ? "✓" : "•"}</small>
                </div>
                <div>${topic.title}</div>
              </button>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");

  list.querySelectorAll("[data-topic-id]").forEach((button) => {
    button.addEventListener("click", () => selectTopic(Number(button.dataset.topicId)));
  });
}

function selectTopic(topicId, updateHistory = true) {
  if (!Number.isInteger(topicId) || topicId < 1 || topicId > topics.length) return;
  selectedTopicId = topicId;
  if (updateHistory) {
    const url = new URL(window.location.href);
    url.searchParams.set("topic", String(topicId));
    window.history.pushState({}, "", url);
  }
  renderTopicList();
  renderTopicDetail();
}

document.querySelector("[data-open-study-assistant]")?.addEventListener("click", (event) => {
  const assistant = detail.querySelector("#studyAssistant");
  if (!assistant) return;

  event.preventDefault();
  assistant.scrollIntoView({ behavior: "smooth", block: "center" });
  window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}#studyAssistant`);
  window.setTimeout(() => assistant.querySelector("input")?.focus({ preventScroll: true }), 350);
});

function renderTopicDetail() {
  const topic = topics[selectedTopicId - 1];
  const sectionIndex = sections.findIndex((section) => section.id === topic.sectionId);
  const sectionTopicNumber = selectedTopicId - sections.slice(0, sectionIndex).reduce((sum, section) => sum + section.lessons.length, 0);
  const sectionTopicCount = sections[sectionIndex].lessons.length;
  const questions = topic.questions.map((item, questionIndex) => `
    <div class="question-block" data-question="${questionIndex}">
      <p>${questionIndex + 1}. ${item.prompt}</p>
      ${item.options.map((option, optionIndex) => `
        <label>
          <input type="radio" name="course-${grade}-q-${selectedTopicId}-${questionIndex}" value="${optionIndex}" />
          ${option}
        </label>
      `).join("")}
    </div>
  `).join("");
  const previousId = selectedTopicId - 1;
  const nextId = selectedTopicId + 1;

  detail.innerHTML = `
    <div class="topic-header">
      <div>
        <span class="topic-badge">${gradeConfig.label} · ${topic.sectionTitle} ${sectionTopicNumber}/${sectionTopicCount}</span>
        <h3>${topic.title}</h3>
      </div>
      ${completedTopics.includes(selectedTopicId) ? '<span class="grade10-complete-badge">✓ Пройдено</span>' : ""}
    </div>
    <div class="lesson-flow">
      <div class="lesson-section">
        <h4>1. Про що ця тема</h4>
        <p>${topic.description}</p>
      </div>
      <div class="lesson-section">
        <h4>2. Головне</h4>
        <ul class="rules-list">${topic.rules.map((rule) => `<li>${rule}</li>`).join("")}</ul>
      </div>
      <div class="lesson-section">
        <h4>3. Пояснення</h4>
        <p>${topic.explanation}</p>
      </div>
      ${renderReferenceTable(topic.referenceTable)}
      <div id="studyAssistant" class="study-assistant-container"></div>
      <div class="practice-box lesson-section">
        <h4>${topic.referenceTable ? "5" : "4"}. Перевір себе</h4>
        ${questions}
        <div class="topic-actions">
          <button class="check-btn" id="courseCheck" type="button">Перевірити відповіді</button>
        </div>
        <div class="topic-result" id="courseResult" aria-live="polite"></div>
      </div>
      <div class="lesson-section next-topic-block">
        <div class="next-topic-nav">
          <a class="secondary-btn nav-btn" href="${gradeConfig.planUrl}">План навчання</a>
          ${previousId >= 1 ? `<button class="secondary-btn nav-btn" type="button" data-go-topic="${previousId}">← Попередня тема</button>` : ""}
          ${nextId <= topics.length ? `<button class="next-btn nav-btn" type="button" data-go-topic="${nextId}">Наступна тема →</button>` : '<a class="primary-btn nav-btn" href="#courseFinalTest">До підсумкового тесту</a>'}
        </div>
      </div>
    </div>
  `;

  detail.classList.remove("is-visible");
  void detail.offsetWidth;
  detail.classList.add("is-visible");
  linkReferenceTerms(detail.querySelector(".tech-table"), topic.sectionId);
  window.StudyAssistant.init(detail.querySelector("#studyAssistant"), { ...topic, id: selectedTopicId }, topics);

  detail.querySelectorAll("[data-go-topic]").forEach((button) => {
    button.addEventListener("click", () => selectTopic(Number(button.dataset.goTopic)));
  });
  document.getElementById("courseCheck").addEventListener("click", () => checkTopic(topic));
}

function checkTopic(topic) {
  let score = 0;
  let unanswered = false;
  topic.questions.forEach((item, questionIndex) => {
    const block = detail.querySelector(`[data-question="${questionIndex}"]`);
    const selected = block.querySelector('input[type="radio"]:checked');
    block.classList.remove("correct", "incorrect", "missed");
    block.querySelectorAll("label").forEach((label) => label.classList.remove("correct-option", "wrong-option"));

    if (!selected) {
      unanswered = true;
      block.classList.add("missed");
      return;
    }

    const selectedIndex = Number(selected.value);
    const selectedLabel = selected.closest("label");
    const correctLabel = block.querySelector(`input[value="${item.answer}"]`).closest("label");
    if (selectedIndex === item.answer) {
      score += 1;
      block.classList.add("correct");
      correctLabel.classList.add("correct-option");
    } else {
      block.classList.add("incorrect");
      selectedLabel.classList.add("wrong-option");
      correctLabel.classList.add("correct-option");
    }
  });

  const result = document.getElementById("courseResult");
  result.classList.remove("success", "error");
  if (score >= 2 && !unanswered) {
    result.textContent = `Правильно: ${score} із ${topic.questions.length}. Тему зараховано!`;
    result.classList.add("success");
    if (!completedTopics.includes(selectedTopicId)) {
      completedTopics.push(selectedTopicId);
      completedTopics.sort((a, b) => a - b);
      saveProgress();
      updateProgress();
      renderTopicList(selectedTopicId);
      renderTopicDetail();
      renderFinalTest();
      const completionMessage = document.getElementById("courseResult");
      completionMessage.textContent = `Правильно: ${score} із ${topic.questions.length}. Тему зараховано!`;
      completionMessage.classList.add("success");
    }
  } else {
    result.textContent = `Твій результат: ${score} із ${topic.questions.length}. ${unanswered ? "Відповідай на всі запитання." : "Потрібно щонайменше 2 правильні відповіді. Повтори тему й спробуй ще раз."}`;
    result.classList.add("error");
  }
}

function renderFinalTest() {
  if (completedTopics.length < topics.length) {
    finalTest.innerHTML = `
      <div class="final-test-box locked-box">
        <p class="eyebrow">Фінальний виклик · ${gradeConfig.label}</p>
        <h2>Підсумковий тест</h2>
        <p>Пройди всі ${topics.length} тем, щоб відкрити тест. Зараз завершено ${completedTopics.length} із ${topics.length}.</p>
      </div>
    `;
    return;
  }

  const questions = topics.map((topic) => topic.questions[2]);
  finalTest.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Фінальний виклик · ${gradeConfig.label}</p>
      <h2>Підсумковий тест</h2>
      <p>${questions.length} запитань — по одному з кожної теми. Для успіху потрібно набрати щонайменше ${gradeConfig.threshold} балів.</p>
    </div>
    <div class="final-test-box">
      <div class="quiz-block">
        ${questions.map((item, index) => `
          <div class="question-block">
            <p>${index + 1}. ${item.prompt}</p>
            ${item.options.map((option, optionIndex) => `
              <label>
                <input type="radio" name="course-${grade}-final-${index}" value="${optionIndex}" />
                ${option}
              </label>
            `).join("")}
          </div>
        `).join("")}
        <div class="test-actions">
          <button class="check-btn" id="courseFinalCheck" type="button">Перевірити тест</button>
        </div>
        <div class="test-result" id="courseFinalResult" aria-live="polite"></div>
      </div>
    </div>
  `;

  document.getElementById("courseFinalCheck").addEventListener("click", () => {
    let score = 0;
    let unanswered = false;
    questions.forEach((item, index) => {
      const selected = finalTest.querySelector(`input[name="course-${grade}-final-${index}"]:checked`);
      if (!selected) unanswered = true;
      else if (Number(selected.value) === item.answer) score += 1;
    });

    const result = document.getElementById("courseFinalResult");
    result.classList.remove("success", "error");
    if (unanswered) {
      result.textContent = "Дай відповідь на всі запитання, перш ніж перевірити тест.";
      result.classList.add("error");
    } else if (score >= gradeConfig.threshold) {
      result.textContent = `Вітаю! Тест складено: ${score} із ${questions.length} правильних відповідей.`;
      result.classList.add("success");
    } else {
      result.textContent = `Твій результат: ${score} із ${questions.length}. Повтори теми та спробуй ще раз.`;
      result.classList.add("error");
    }
  });
}

window.addEventListener("popstate", () => {
  selectedTopicId = getInitialTopic();
  renderTopicList();
  renderTopicDetail();
});

renderTopicList();
renderTopicDetail();
updateProgress();
renderFinalTest();
