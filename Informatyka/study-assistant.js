(() => {
  const stopWords = new Set([
    "а", "але", "без", "би", "був", "була", "було", "в", "ви", "від", "він",
    "вона", "воно", "вони", "для", "до", "є", "з", "за", "і", "із", "й",
    "на", "не", "про", "це", "ця", "ці", "чи", "що", "як", "який", "яка",
    "яке", "які"
  ]);

  function tokenize(value) {
    return String(value).toLowerCase().match(/[a-zа-яіїєґ0-9_#.-]+/g)
      ?.filter((word) => word.length > 1 && !stopWords.has(word)) || [];
  }

  function topicText(topic) {
    const tableText = topic.referenceTable
      ? [topic.referenceTable.title, ...topic.referenceTable.headers, ...topic.referenceTable.rows.flat()].join(" ")
      : "";
    const questionText = topic.questions.map((item) => `${item.prompt} ${item.options.join(" ")}`).join(" ");
    return [topic.title, topic.description, topic.explanation, ...topic.rules, tableText, questionText].join(" ");
  }

  function scoreText(queryWords, text) {
    const textWords = tokenize(text);
    return queryWords.reduce((score, queryWord) => {
      if (textWords.includes(queryWord)) return score + 2;
      if (queryWord.length >= 4 && textWords.some((word) => word.startsWith(queryWord) || queryWord.startsWith(word))) {
        return score + 1;
      }
      return score;
    }, 0);
  }

  function getUkrainianVoice() {
    if (typeof window.speechSynthesis === "undefined" || typeof window.speechSynthesis.getVoices !== "function") return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find((voice) => voice.lang.toLowerCase() === "uk-ua" && voice.localService)
      || voices.find((voice) => voice.lang.toLowerCase() === "uk-ua")
      || voices.find((voice) => voice.lang.toLowerCase().startsWith("uk") && voice.localService)
      || voices.find((voice) => voice.lang.toLowerCase().startsWith("uk"))
      || null;
  }

  function speechAvailable() {
    return typeof window.speechSynthesis !== "undefined"
      && typeof window.SpeechSynthesisUtterance !== "undefined"
      && typeof window.speechSynthesis.speak === "function"
      && Boolean(getUkrainianVoice());
  }

  function addSpeakerControl(reply) {
    if (!speechAvailable() || reply.querySelector(".study-assistant-speak")) return;
    const message = reply.querySelector(".study-assistant-message");
    if (!message) return;

    const speak = document.createElement("button");
    speak.className = "study-assistant-speak";
    speak.type = "button";
    speak.textContent = "🔊";
    speak.setAttribute("aria-label", "Озвучити відповідь");
    speak.title = "Прослухати відповідь";
    speak.addEventListener("click", () => {
      const ukrainianVoice = getUkrainianVoice();
      if (!ukrainianVoice) {
        speak.title = "У браузері не знайдено українського голосу";
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(message.textContent);
      utterance.lang = "uk-UA";
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.voice = ukrainianVoice;
      speak.disabled = true;
      speak.textContent = "…";
      utterance.onend = () => {
        speak.disabled = false;
        speak.textContent = "🔊";
      };
      utterance.onerror = () => {
        speak.disabled = false;
        speak.textContent = "🔊";
        speak.title = "Не вдалося озвучити відповідь у цьому браузері";
      };
      window.speechSynthesis.speak(utterance);
    });
    reply.append(speak);
  }

  function findMatch(query, topics, currentTopicId) {
    const queryWords = tokenize(query);
    if (queryWords.length === 0) return null;

    return topics
      .map((topic) => ({
        topic,
        score: scoreText(queryWords, topicText(topic)) + (topic.id === currentTopicId ? 1 : 0)
      }))
      .sort((left, right) => right.score - left.score)[0];
  }

  function addMessage(messages, text, sender) {
    const message = document.createElement("p");
    message.className = `study-assistant-message ${sender}`;
    message.textContent = text;
    if (sender === "assistant") {
      const reply = document.createElement("div");
      reply.className = "study-assistant-reply";
      reply.append(message);
      addSpeakerControl(reply);
      messages.append(reply);
    } else {
      messages.append(message);
    }
    messages.scrollTop = messages.scrollHeight;
  }

  if (typeof window.speechSynthesis !== "undefined" && typeof window.speechSynthesis.addEventListener === "function") {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      document.querySelectorAll(".study-assistant-reply").forEach(addSpeakerControl);
    });
  }

  function addQuiz(messages, topic) {
    const item = topic.questions[Math.floor(Math.random() * topic.questions.length)];
    addMessage(messages, `Перевірмо тему «${topic.title}».\n${item.prompt}`, "assistant");

    const answer = document.createElement("p");
    answer.className = "study-assistant-answer";
    answer.hidden = true;
    answer.textContent = `Правильна відповідь: ${item.options[item.answer]}`;

    const reveal = document.createElement("button");
    reveal.className = "secondary-btn";
    reveal.type = "button";
    reveal.textContent = "Показати відповідь";
    reveal.addEventListener("click", () => {
      answer.hidden = false;
      reveal.remove();
    });

    const quiz = document.createElement("div");
    quiz.className = "study-assistant-quiz";
    quiz.append(reveal, answer);
    messages.append(quiz);
    messages.scrollTop = messages.scrollHeight;
  }

  function respond(query, topics, currentTopicId, messages) {
    const normalized = query.toLowerCase();
    const currentTopic = topics.find((topic) => topic.id === currentTopicId);
    if (["тест", "перевір", "запитай", "вікторин", "quiz"].some((word) => normalized.includes(word))) {
      addQuiz(messages, currentTopic);
      return;
    }

    const explanation = ["приклад", "приклади", "покажи", "код"].some((word) => normalized.includes(word));
    const simpler = ["простіш", "простими", "поясни", "розкажи", "що таке"].some((word) => normalized.includes(word));
    if (simpler && normalized.includes("цю тему")) {
      addMessage(messages, `Простими словами: ${currentTopic.description}\n\n${currentTopic.explanation}\n\nГоловне: ${currentTopic.rules[0]}`, "assistant");
      return;
    }
    if (explanation && normalized.includes("цієї теми")) {
      const table = currentTopic.referenceTable;
      const row = table?.rows[0];
      const example = row ? `Наприклад, ${row[2]} — ${row[3].toLowerCase()}.` : currentTopic.explanation;
      addMessage(messages, `Приклад із теми «${currentTopic.title}»:\n${example}`, "assistant");
      return;
    }

    const match = findMatch(query, topics, currentTopicId);
    if (!match || match.score < 2) {
      addMessage(messages, "Не знайшов відповіді в матеріалах курсу. Спробуй запитати про конкретну тему, тег, CSS-властивість або команду.", "assistant");
      return;
    }

    const { topic } = match;
    if (explanation && topic.referenceTable) {
      const queryWords = tokenize(query);
      const row = topic.referenceTable.rows
        .map((cells) => ({ cells, score: scoreText(queryWords, cells.join(" ")) }))
        .sort((left, right) => right.score - left.score)[0];
      addMessage(messages, `Приклад із теми «${topic.title}»:\n${row.cells[2]}\n${row.cells[3]}`, "assistant");
      return;
    }

    if (topic.referenceTable) {
      const queryWords = tokenize(query);
      const row = topic.referenceTable.rows
        .map((cells) => ({ cells, score: scoreText(queryWords, cells.join(" ")) }))
        .sort((left, right) => right.score - left.score)[0];
      if (row.score >= 2) {
        addMessage(messages, `${row.cells[0]} — ${row.cells[1]}.\nПриклад: ${row.cells[2]}\n${row.cells[3]}.`, "assistant");
        return;
      }
    }

    const intro = simpler ? "Простими словами: " : "";
    addMessage(messages, `${intro}${topic.explanation}\n\nГоловне: ${topic.rules[0]}`, "assistant");
  }

  function init(container, currentTopic, topics) {
    const indexedTopics = topics.map((topic, index) => ({ ...topic, id: index + 1 }));
    container.innerHTML = `
      <section class="study-assistant" aria-labelledby="studyAssistantTitle">
        <div class="study-assistant-header">
          <div>
            <p class="eyebrow">Працює локально · без реєстрації</p>
            <h4 id="studyAssistantTitle">Помічник навчання</h4>
          </div>
          <span class="study-assistant-icon" aria-hidden="true">✦</span>
        </div>
        <p class="study-assistant-intro">Поясню матеріал цієї теми або знайду відповідь у курсі. Напиши запитання чи обери підказку.</p>
        <div class="study-assistant-prompts">
          <button class="secondary-btn" type="button" data-assistant-prompt="Поясни цю тему простіше">Поясни простіше</button>
          <button class="secondary-btn" type="button" data-assistant-prompt="Наведи приклад з цієї теми">Наведи приклад</button>
          <button class="secondary-btn" type="button" data-assistant-prompt="Перевір мене">Перевір мене</button>
        </div>
        <div class="study-assistant-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
        <form class="study-assistant-form">
          <label class="sr-only" for="studyAssistantInput">Твоє запитання помічнику</label>
          <input id="studyAssistantInput" name="question" type="text" maxlength="300" autocomplete="off" placeholder="Наприклад: для чого потрібен тег img?" />
          <button class="primary-btn" type="submit">Запитати</button>
        </form>
        <p class="study-assistant-note">Відповіді формуються з матеріалів курсу на цьому пристрої. Кнопка озвучення з’явиться лише якщо браузер має доступний голос.</p>
      </section>
    `;

    const messages = container.querySelector(".study-assistant-messages");
    const form = container.querySelector(".study-assistant-form");
    const input = form.elements.question;
    addMessage(messages, `Вітаю! Допоможу розібратися з темою «${currentTopic.title}».`, "assistant");

    function ask(query) {
      const cleaned = query.trim();
      if (!cleaned) return;
      addMessage(messages, cleaned, "student");
      respond(cleaned, indexedTopics, currentTopic.id, messages);
      input.value = "";
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      ask(input.value);
    });
    container.querySelectorAll("[data-assistant-prompt]").forEach((button) => {
      button.addEventListener("click", () => ask(button.dataset.assistantPrompt));
    });
  }

  window.StudyAssistant = { init };
})();
