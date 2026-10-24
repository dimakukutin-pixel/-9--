(() => {
  const titles = {
    topics: {
      title: "Теми курсу",
      description: "Усі 40 тем курсу, згруповані за напрямами.",
      countLabel: "тем"
    },
    rules: {
      title: "Правила курсу",
      description: "Короткі правила й основні тези для повторення кожної теми.",
      countLabel: "правил"
    },
    tests: {
      title: "Тестові запитання",
      description: "Запитання для самоперевірки. Правильні відповіді тут не позначені й не показуються.",
      countLabel: "запитань"
    }
  };
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const requestedGrade = params.get("grade");
  const grade = ["6", "7", "8", "10"].includes(requestedGrade) ? requestedGrade : "9";
  const isSemesterCourse = ["6", "7", "8"].includes(grade);
  const gradeLabel = `${grade} клас`;
  const courseUrl = grade === "10" ? "lesson10.html" : "lesson.html";
  const courseTopicUrl = (topicId = 1) => {
    const gradeParameter = ["6", "7", "8"].includes(grade) ? `grade=${grade}&` : "";
    return `${courseUrl}?${gradeParameter}topic=${topicId}`;
  };
  const selectedType = Object.hasOwn(titles, type) ? type : "topics";
  const config = titles[selectedType];
  const sections = window.COURSE_SECTIONS;
  const lessons = sections.flatMap((section) => section.lessons.map((lesson, index) => ({
    ...lesson,
    section,
    topicId: sections.slice(0, sections.indexOf(section)).reduce((count, item) => count + item.lessons.length, 0) + index + 1
  })));
  const title = document.getElementById("catalogTitle");
  const description = document.getElementById("catalogDescription");
  const content = document.getElementById("catalogContent");
  const gradeLabelElement = document.getElementById("catalogGradeLabel");
  const planLink = document.getElementById("catalogPlanLink");
  const courseLink = document.getElementById("catalogCourseLink");

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function renderTopic(lesson) {
    return `
      <article class="catalog-card">
        <div class="catalog-card-heading">
          <span class="catalog-topic-number">Тема ${lesson.topicId}</span>
          <span class="catalog-section-label">${escapeHTML(lesson.section.title)}</span>
        </div>
        <h3>${escapeHTML(lesson.title)}</h3>
        <p>${escapeHTML(lesson.description)}</p>
        <a class="secondary-btn" href="${courseTopicUrl(lesson.topicId)}">Перейти до теми</a>
      </article>
    `;
  }

  function renderRules(lesson) {
    return `
      <article class="catalog-card">
        <div class="catalog-card-heading">
          <span class="catalog-topic-number">Тема ${lesson.topicId}</span>
          <span class="catalog-section-label">${escapeHTML(lesson.section.title)}</span>
        </div>
        <h3>${escapeHTML(lesson.title)}</h3>
        <ul class="catalog-list">${lesson.rules.map((rule) => `<li>${escapeHTML(rule)}</li>`).join("")}</ul>
      </article>
    `;
  }

  function renderQuestion(lesson, question, questionNumber) {
    return `
      <article class="catalog-card catalog-question">
        <div class="catalog-card-heading">
          <span class="catalog-topic-number">Запитання ${questionNumber}</span>
          <span class="catalog-section-label">Тема ${lesson.topicId} · ${escapeHTML(lesson.section.title)}</span>
        </div>
        <h3>${escapeHTML(question.prompt)}</h3>
        <ol class="catalog-options" type="A">${question.options.map((option) => `<li>${escapeHTML(option)}</li>`).join("")}</ol>
      </article>
    `;
  }

  const itemCount = selectedType === "topics"
    ? lessons.length
    : selectedType === "rules"
      ? lessons.reduce((count, lesson) => count + lesson.rules.length, 0)
      : lessons.reduce((count, lesson) => count + lesson.questions.length, 0);

  title.textContent = config.title;
  const gradeDescription = isSemesterCourse
    ? "Курс містить 45 тем: по 22 навчальні теми в кожному семестрі та контрольну роботу."
    : config.description;
  description.textContent = `${gradeDescription} Матеріали курсу ${gradeLabel}.`;
  gradeLabelElement.textContent = `Довідник курсу · ${gradeLabel}`;
  planLink.href = `plan.html?grade=${grade}`;
  courseLink.href = courseTopicUrl();
  document.querySelectorAll("[data-catalog-grade]").forEach((link) => {
    link.href = `catalog.html?grade=${link.dataset.catalogGrade}&type=${selectedType}`;
    if (link.dataset.catalogGrade === grade) link.setAttribute("aria-current", "page");
  });
  document.querySelectorAll("[data-catalog-type]").forEach((link) => {
    link.href = `catalog.html?grade=${grade}&type=${link.dataset.catalogType}`;
    if (link.dataset.catalogType !== selectedType) return;
    link.setAttribute("aria-current", "page");
  });
  content.innerHTML = `
    <p class="catalog-count">Усього: <strong>${itemCount}</strong> ${config.countLabel}</p>
    ${sections.map((section) => {
      const sectionLessons = lessons.filter((lesson) => lesson.section.id === section.id);
      const sectionItems = selectedType === "topics"
        ? sectionLessons.map(renderTopic)
        : selectedType === "rules"
          ? sectionLessons.flatMap(renderRules)
          : sectionLessons.flatMap((lesson) => lesson.questions.map((question) => {
            const questionNumber = lessons.slice(0, lessons.indexOf(lesson)).reduce((count, previous) => count + previous.questions.length, 0)
              + lesson.questions.indexOf(question) + 1;
            return renderQuestion(lesson, question, questionNumber);
          }));
      return `
        <section class="catalog-section" aria-labelledby="catalog-${escapeHTML(section.id)}">
          <div class="catalog-section-heading">
            <h2 id="catalog-${escapeHTML(section.id)}">${escapeHTML(section.title)}</h2>
            <p>${escapeHTML(section.subtitle)}</p>
          </div>
          <div class="catalog-grid">${sectionItems.join("")}</div>
        </section>
      `;
    }).join("")}
  `;
})();
