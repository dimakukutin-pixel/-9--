const requestedGrade = new URLSearchParams(window.location.search).get("grade");
const grade = ["6", "7", "8", "10"].includes(requestedGrade) ? requestedGrade : "9";
const planTitle = document.getElementById("planTitle");
const planBrand = document.getElementById("planBrand");
const planSections = document.getElementById("planSections");
const reviewedCheckbox = document.getElementById("planReviewed");
const startButton = document.getElementById("startCourse");
const isSemesterCourse = ["6", "7", "8"].includes(grade);

if (isSemesterCourse) {
  if (window.COURSE_SECTIONS.length !== 3
    || window.COURSE_SECTIONS[0].lessons.length !== 22
    || window.COURSE_SECTIONS[1].lessons.length !== 22
    || window.COURSE_SECTIONS[2].lessons.length !== 1) {
    throw new Error("План НУШ має містити 22 теми в кожному семестрі та контрольну тему.");
  }
} else if (window.COURSE_SECTIONS.length !== 4 || window.COURSE_SECTIONS.some((section) => section.lessons.length !== 10)) {
  throw new Error("Навчальний план має містити чотири розділи рівно по десять тем.");
}

document.title = `План навчання · ${grade} клас | Інформатика`;
planTitle.textContent = `План навчання · ${grade} клас`;
planBrand.textContent = `Інформатика ${grade}`;
document.getElementById("planDescription").textContent = ["6", "7", "8"].includes(grade)
  ? "22 теми в кожному семестрі, підсумкова контрольна робота та фінальний тест. Розподіл тем НУШ може відрізнятися залежно від модельної програми школи."
  : "40 тем у чотирьох розділах. Переглянь план, щоб знати, що вивчатимеш далі.";
startButton.href = grade === "10"
  ? "lesson10.html?topic=1"
  : grade === "9"
    ? "lesson.html?topic=1"
    : `lesson.html?grade=${grade}&topic=1`;

const planSummary = document.querySelector(".plan-summary");
if (isSemesterCourse) {
  planSummary.innerHTML = "<span>І семестр · 22 теми</span><span>ІІ семестр · 22 теми</span><span>Тема 45 · контрольна робота</span>";
}

let topicNumber = 0;
const formatTopicCount = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  const word = lastDigit === 1 && lastTwoDigits !== 11
    ? "тема"
    : lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)
      ? "теми"
      : "тем";
  return `${count} ${word}`;
};
planSections.innerHTML = window.COURSE_SECTIONS.map((section, sectionIndex) => `
  <section class="plan-section-card" aria-labelledby="plan-${section.id}">
    <div class="plan-section-heading">
      <span class="plan-section-number">${String(sectionIndex + 1).padStart(2, "0")}</span>
      <div>
        <h2 id="plan-${section.id}">${section.title}</h2>
        <p>${section.subtitle}</p>
      </div>
      <span class="plan-section-count">${formatTopicCount(section.lessons.length)}</span>
    </div>
    <ol class="plan-topic-list">
      ${section.lessons.map((lesson) => {
        topicNumber += 1;
        return `
        <li>
          <span class="plan-topic-number">${topicNumber}</span>
          <span>${lesson.title}</span>
        </li>
      `;
      }).join("")}
    </ol>
  </section>
`).join("");

reviewedCheckbox.addEventListener("change", () => {
  startButton.hidden = !reviewedCheckbox.checked;
});
