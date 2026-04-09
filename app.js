// ============================================================
// SWE MASTERY — Main Application Logic
// ============================================================

// ─── State ───
const STATE = {
  completedTopics: JSON.parse(localStorage.getItem('swe_completed_topics') || '[]'),
  solvedProblems: JSON.parse(localStorage.getItem('swe_solved_problems') || '[]'),
  sectionProgress: JSON.parse(localStorage.getItem('swe_section_progress') || '{}'),
  streak: parseInt(localStorage.getItem('swe_streak') || '0'),
  lastVisit: localStorage.getItem('swe_last_visit') || null,
  startDate: localStorage.getItem('swe_start_date') || null,
};

function saveState() {
  localStorage.setItem('swe_completed_topics', JSON.stringify(STATE.completedTopics));
  localStorage.setItem('swe_solved_problems', JSON.stringify(STATE.solvedProblems));
  localStorage.setItem('swe_section_progress', JSON.stringify(STATE.sectionProgress));
  localStorage.setItem('swe_streak', STATE.streak.toString());
  localStorage.setItem('swe_last_visit', STATE.lastVisit);
  localStorage.setItem('swe_start_date', STATE.startDate);
}

function markSectionRead(topicId, sectionIndex) {
  if (!STATE.sectionProgress[topicId]) {
    STATE.sectionProgress[topicId] = [];
  }
  if (!STATE.sectionProgress[topicId].includes(sectionIndex)) {
    STATE.sectionProgress[topicId].push(sectionIndex);
    saveState();
  }
}

function getSectionsRead(topicId) {
  return STATE.sectionProgress[topicId] || [];
}

// Initialize start date on first visit
if (!STATE.startDate) {
  STATE.startDate = new Date().toISOString().split('T')[0];
  saveState();
}

// Update streak
(function updateStreak() {
  const today = new Date().toISOString().split('T')[0];
  if (STATE.lastVisit === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (STATE.lastVisit === yesterday) {
    STATE.streak++;
  } else if (STATE.lastVisit !== today) {
    STATE.streak = 1;
  }
  STATE.lastVisit = today;
  saveState();
})();

// ─── Navigation ───
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.dataset.page;
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    pages.forEach(p => {
      p.classList.toggle('active', p.id === `page-${target}`);
    });
    window.scrollTo(0, 0);
  });
});

// ─── Code Editor ───
let editor;
let currentProblem = null;

function initEditor() {
  editor = CodeMirror(document.getElementById('code-editor'), {
    value: '// Select a problem to start coding\n',
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    tabSize: 2,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
  });
}

document.getElementById('language-select').addEventListener('change', (e) => {
  const lang = e.target.value;
  editor.setOption('mode', lang === 'python' ? 'python' : 'javascript');
  if (currentProblem) {
    editor.setValue(lang === 'python' ? currentProblem.starterPY : currentProblem.starterJS);
  }
});

// ─── Run & Submit ───
document.getElementById('run-btn').addEventListener('click', () => {
  if (!currentProblem) return;
  runCode(false);
});

document.getElementById('submit-btn').addEventListener('click', () => {
  if (!currentProblem) return;
  runCode(true);
});

function runCode(isSubmit) {
  const code = editor.getValue();
  const output = document.getElementById('output');
  const lang = document.getElementById('language-select').value;

  if (lang === 'python') {
    output.innerHTML = '<span class="output-info">Python execution is simulated. For full Python support, use LeetCode or a local environment.\nShowing your code for review:</span>\n\n' + code;
    return;
  }

  const problem = currentProblem;
  let results = [];
  let allPassed = true;

  // Handle special test cases
  if (problem.testCases[0] && problem.testCases[0].customCheck) {
    try {
      eval(code);
      if (problem.id === 'p8') {
        const fn = eval(`(${getFunctionName(code)})`);
        const result = fn(["eat","tea","tan","ate","nat","bat"]);
        const sorted = result.map(g => g.sort().join(',')).sort();
        const expected = [["ate","eat","tea"],["nat","tan"],["bat"]].map(g => g.sort().join(',')).sort();
        if (JSON.stringify(sorted) === JSON.stringify(expected)) {
          results.push({ passed: true, msg: 'Test 1: PASSED ✓' });
        } else {
          results.push({ passed: false, msg: `Test 1: FAILED ✗\n  Expected groups of anagrams\n  Got: ${JSON.stringify(result)}` });
          allPassed = false;
        }
      } else if (problem.id === 'p16') {
        eval(code);
        const cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        let r1 = cache.get(1);
        cache.put(3, 3);
        let r2 = cache.get(2);
        cache.put(4, 4);
        let r3 = cache.get(1);
        let r4 = cache.get(3);
        let r5 = cache.get(4);
        const pass = r1 === 1 && r2 === -1 && r3 === -1 && r4 === 3 && r5 === 4;
        if (pass) {
          results.push({ passed: true, msg: 'LRU Cache Test: PASSED ✓' });
        } else {
          results.push({ passed: false, msg: `LRU Cache Test: FAILED ✗\n  get(1)=${r1} (exp 1), get(2)=${r2} (exp -1), get(1)=${r3} (exp -1), get(3)=${r4} (exp 3), get(4)=${r5} (exp 4)` });
          allPassed = false;
        }
      }
    } catch (err) {
      results.push({ passed: false, msg: `Runtime Error: ${err.message}` });
      allPassed = false;
    }
  } else {
    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];
      try {
        const fn = eval(`(${getFunctionName(code)})`);
        const result = fn(...JSON.parse(JSON.stringify(tc.input)));
        const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
        if (!passed) allPassed = false;
        results.push({
          passed,
          msg: `Test ${i + 1}: ${passed ? 'PASSED ✓' : 'FAILED ✗'}\n  Input: ${JSON.stringify(tc.input)}\n  Expected: ${JSON.stringify(tc.expected)}\n  Got: ${JSON.stringify(result)}`
        });
      } catch (err) {
        allPassed = false;
        results.push({ passed: false, msg: `Test ${i + 1}: ERROR ✗\n  ${err.message}` });
      }
    }
  }

  let html = results.map(r =>
    `<span class="${r.passed ? 'output-pass' : 'output-fail'}">${r.msg}</span>`
  ).join('\n\n');

  if (isSubmit && allPassed) {
    html += '\n\n<span class="output-success">🎉 All tests passed! Problem solved!</span>';
    if (!STATE.solvedProblems.includes(problem.id)) {
      STATE.solvedProblems.push(problem.id);
      saveState();
      updateDashboard();
      renderProblemList();
    }
  } else if (isSubmit && !allPassed) {
    html += `\n\n<span class="output-hint">💡 Hint: ${problem.hint}</span>`;
  }

  output.innerHTML = html;
}

function getFunctionName(code) {
  // Try to extract function from code
  const classMatch = code.match(/class\s+(\w+)/);
  if (classMatch) return code;

  const fnMatch = code.match(/function\s+(\w+)/);
  if (fnMatch) return fnMatch[1];

  const arrowMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=/);
  if (arrowMatch) return arrowMatch[1];

  return code;
}

// ─── Problem List ───
function renderProblemList(filter = 'all', topicFilter = 'all') {
  const list = document.getElementById('problem-list');
  const filtered = PROBLEMS.filter(p => {
    if (filter !== 'all' && p.difficulty !== filter) return false;
    if (topicFilter !== 'all' && p.topic !== topicFilter) return false;
    return true;
  });

  list.innerHTML = filtered.map(p => {
    const solved = STATE.solvedProblems.includes(p.id);
    return `
      <div class="problem-item ${solved ? 'solved' : ''}" data-id="${p.id}">
        <span class="problem-status">${solved ? '✓' : '○'}</span>
        <div class="problem-info">
          <span class="problem-title">${p.title}</span>
          <div class="problem-meta">
            <span class="diff-badge ${p.difficulty}">${p.difficulty}</span>
            <span class="topic-badge">${p.topic}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('.problem-item').forEach(item => {
    item.addEventListener('click', () => loadProblem(item.dataset.id));
  });
}

function loadProblem(id) {
  const problem = PROBLEMS.find(p => p.id === id);
  if (!problem) return;
  currentProblem = problem;

  const desc = document.getElementById('problem-description');
  desc.innerHTML = `
    <div class="problem-header">
      <h3>${problem.title}</h3>
      <span class="diff-badge ${problem.difficulty}">${problem.difficulty}</span>
    </div>
    <div class="problem-body">${problem.description}</div>
    <div class="problem-actions">
      <button class="btn btn-hint" onclick="showHint()">Show Hint</button>
      ${problem.walkthrough ? '<button class="btn btn-walkthrough" onclick="showWalkthrough()">Step-by-Step Walkthrough</button>' : ''}
      <button class="btn btn-solution" onclick="showSolution()">Show Solution</button>
    </div>
  `;

  const lang = document.getElementById('language-select').value;
  editor.setValue(lang === 'python' ? problem.starterPY : problem.starterJS);
  document.getElementById('output').innerHTML = '';

  // Highlight active problem
  document.querySelectorAll('.problem-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === id);
  });
}

window.showHint = function() {
  if (!currentProblem) return;
  document.getElementById('output').innerHTML = `<span class="output-hint">💡 ${currentProblem.hint}</span>`;
};

window.showWalkthrough = function() {
  if (!currentProblem || !currentProblem.walkthrough) return;
  document.getElementById('output').innerHTML = `<div class="output-walkthrough">${currentProblem.walkthrough}</div>`;
};

window.showSolution = function() {
  if (!currentProblem) return;
  document.getElementById('output').innerHTML = `<span class="output-solution">Solution:\n\n${currentProblem.solution}</span>`;
};

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProblemList(btn.dataset.difficulty, document.getElementById('topic-filter').value);
  });
});

document.getElementById('topic-filter').addEventListener('change', (e) => {
  const activeBtn = document.querySelector('.filter-btn.active');
  renderProblemList(activeBtn.dataset.difficulty, e.target.value);
});

// Populate topic filter
(function populateTopicFilter() {
  const topics = [...new Set(PROBLEMS.map(p => p.topic))];
  const select = document.getElementById('topic-filter');
  topics.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
})();

// ─── Roadmap Rendering ───
function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  container.innerHTML = ROADMAP.map(week => {
    const completedCount = week.topics.filter(t => STATE.completedTopics.includes(t.id)).length;
    const total = week.topics.length;
    const pct = Math.round((completedCount / total) * 100);

    return `
      <div class="week-card" style="--week-color: ${week.color}">
        <div class="week-header">
          <div class="week-badge" style="background: ${week.color}">Week ${week.week}</div>
          <div class="week-title-group">
            <h3>${week.title}</h3>
            <p>${week.description}</p>
          </div>
          <div class="week-progress-ring">
            <svg viewBox="0 0 36 36">
              <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="ring-fill" stroke="${week.color}" stroke-dasharray="${pct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <span class="ring-text">${pct}%</span>
          </div>
        </div>
        <div class="week-topics">
          ${week.topics.map(topic => {
            const done = STATE.completedTopics.includes(topic.id);
            return `
              <div class="topic-row">
                <label class="topic-checkbox">
                  <input type="checkbox" ${done ? 'checked' : ''} data-topic-id="${topic.id}" />
                  <span class="checkmark"></span>
                </label>
                <div class="topic-info" data-topic-id="${topic.id}">
                  <span class="topic-title ${done ? 'completed' : ''}">${topic.title}</span>
                  <span class="topic-category">${topic.category}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Checkbox handlers
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.dataset.topicId;
      if (e.target.checked) {
        if (!STATE.completedTopics.includes(id)) STATE.completedTopics.push(id);
      } else {
        STATE.completedTopics = STATE.completedTopics.filter(t => t !== id);
      }
      saveState();
      renderRoadmap();
      updateDashboard();
    });
  });

  // Click topic to open full lesson
  container.querySelectorAll('.topic-info').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.topicId;
      openLesson(id);
    });
  });
}

// ─── Lesson Viewer ───
let currentLesson = null;
let currentSectionIndex = 0;

function getAllLessons() {
  const all = {};
  if (typeof LESSONS !== 'undefined') Object.assign(all, LESSONS);
  if (typeof LESSONS_2 !== 'undefined') Object.assign(all, LESSONS_2);
  return all;
}

function openLesson(topicId) {
  const allLessons = getAllLessons();
  const lesson = allLessons[topicId];

  // Find topic metadata
  let topic = null;
  for (const week of ROADMAP) {
    topic = week.topics.find(t => t.id === topicId);
    if (topic) break;
  }
  if (!topic) return;

  // If no lesson content exists, show the modal as fallback
  if (!lesson || !lesson.sections || lesson.sections.length === 0) {
    showTopicModal(topicId);
    return;
  }

  currentLesson = { ...lesson, topicId, topic };
  currentSectionIndex = 0;

  // Switch to learn page
  navLinks.forEach(l => l.classList.remove('active'));
  pages.forEach(p => p.classList.toggle('active', p.id === 'page-learn'));

  // Populate sidebar
  document.getElementById('lesson-sidebar-title').textContent = topic.title;
  const nav = document.getElementById('lesson-nav');
  const readSections = getSectionsRead(topicId);
  nav.innerHTML = lesson.sections.map((s, i) => {
    const isRead = readSections.includes(i);
    return `<div class="lesson-nav-item ${i === 0 ? 'active' : ''} ${isRead ? 'read' : ''}" data-index="${i}">
      <span class="nav-check">${isRead ? '&#10003;' : ''}</span>${s.title}
    </div>`;
  }).join('');

  nav.querySelectorAll('.lesson-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      currentSectionIndex = parseInt(item.dataset.index);
      renderLessonSection();
    });
  });

  renderLessonSection();
  window.scrollTo(0, 0);
}

function renderLessonSection() {
  const lesson = currentLesson;
  const section = lesson.sections[currentSectionIndex];
  const content = document.getElementById('lesson-content');

  let html = `<h2>${section.title}</h2>`;
  html += section.content;

  if (section.code) {
    const lang = section.language || 'javascript';
    html += `
      <div class="lesson-code-block">
        <div class="lesson-code-header"><span>${lang}</span></div>
        <pre>${escapeHtml(section.code)}</pre>
      </div>
    `;
  }

  if (section.diagram) {
    html += `<div class="lesson-diagram">${escapeHtml(section.diagram)}</div>`;
  }

  if (section.pitfall) {
    html += `
      <div class="lesson-pitfall">
        <div class="lesson-pitfall-title">Common Mistake</div>
        <p>${section.pitfall}</p>
      </div>
    `;
  }

  if (section.quiz) {
    const q = section.quiz;
    html += `
      <div class="lesson-quiz">
        <div class="lesson-quiz-title">Quick Check</div>
        <p>${q.question}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}" data-correct="${q.answer}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Show key takeaways on the last section
  const isLastSection = currentSectionIndex === lesson.sections.length - 1;
  if (isLastSection && lesson.takeaways && lesson.takeaways.length > 0) {
    html += `
      <div class="lesson-takeaways">
        <div class="lesson-takeaways-title">Key Takeaways</div>
        <ul class="takeaways-list">
          ${lesson.takeaways.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  content.innerHTML = html;

  // Mark current section as read
  markSectionRead(lesson.topicId, currentSectionIndex);

  // Wire up quiz buttons
  content.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const correct = parseInt(btn.dataset.correct);
      const selected = parseInt(btn.dataset.index);
      content.querySelectorAll('.quiz-option').forEach(b => {
        b.classList.add('disabled');
        if (parseInt(b.dataset.index) === correct) b.classList.add('correct');
        else if (b === btn && selected !== correct) b.classList.add('incorrect');
      });
    });
  });

  // Update sidebar nav with read status
  const readSections = getSectionsRead(lesson.topicId);
  document.querySelectorAll('.lesson-nav-item').forEach((item, i) => {
    item.classList.toggle('active', i === currentSectionIndex);
    if (readSections.includes(i)) {
      item.classList.add('read');
      item.querySelector('.nav-check').innerHTML = '&#10003;';
    }
    if (i < currentSectionIndex) item.classList.add('visited');
  });

  // Update progress
  const total = lesson.sections.length;
  const pct = Math.round(((currentSectionIndex + 1) / total) * 100);
  document.getElementById('lesson-progress-fill').style.width = `${pct}%`;
  document.getElementById('lesson-progress-text').textContent = `Section ${currentSectionIndex + 1} / ${total}`;

  // Show/hide buttons
  document.getElementById('lesson-prev').style.display = currentSectionIndex > 0 ? '' : 'none';
  const isLast = currentSectionIndex === total - 1;
  document.getElementById('lesson-next').classList.toggle('hidden', isLast);
  document.getElementById('lesson-complete').classList.toggle('hidden', !isLast);

  window.scrollTo(0, 0);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Lesson navigation buttons
document.getElementById('lesson-next').addEventListener('click', () => {
  if (!currentLesson) return;
  if (currentSectionIndex < currentLesson.sections.length - 1) {
    currentSectionIndex++;
    renderLessonSection();
  }
});

document.getElementById('lesson-prev').addEventListener('click', () => {
  if (!currentLesson) return;
  if (currentSectionIndex > 0) {
    currentSectionIndex--;
    renderLessonSection();
  }
});

document.getElementById('lesson-complete').addEventListener('click', () => {
  if (!currentLesson) return;
  const id = currentLesson.topicId;
  if (!STATE.completedTopics.includes(id)) {
    STATE.completedTopics.push(id);
    saveState();
  }
  // Go back to roadmap
  document.querySelector('[data-page="roadmap"]').click();
  renderRoadmap();
  updateDashboard();
});

document.getElementById('lesson-back').addEventListener('click', () => {
  document.querySelector('[data-page="roadmap"]').click();
});

// ─── Topic Modal (fallback for topics without full lessons) ───
function showTopicModal(topicId) {
  let topic = null;
  for (const week of ROADMAP) {
    topic = week.topics.find(t => t.id === topicId);
    if (topic) break;
  }
  if (!topic) return;

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <span class="modal-category">${topic.category}</span>
    <h2>${topic.title}</h2>
    <p class="modal-detail">${topic.detail}</p>
    <h4>Key Points to Master</h4>
    <ul class="modal-points">
      ${topic.keyPoints.map(p => `<li>${p}</li>`).join('')}
    </ul>
    <div class="modal-practice">
      <h4>Practice Exercise</h4>
      <p>${topic.practice}</p>
    </div>
  `;

  modal.classList.remove('hidden');
}

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.add('hidden');
});

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.add('hidden');
  }
});

// ─── Resources Rendering ───
function renderResources() {
  const container = document.getElementById('resources-container');
  container.innerHTML = RESOURCES.map(section => `
    <div class="resource-section">
      <h2>${section.phase}</h2>
      <div class="resource-grid">
        ${section.items.map(item => `
          <a href="${item.url}" target="_blank" rel="noopener" class="resource-card">
            <span class="resource-type">${item.type}</span>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// ─── Dashboard ───
function updateDashboard() {
  const totalTopics = ROADMAP.reduce((sum, w) => sum + w.topics.length, 0);
  const completedCount = STATE.completedTopics.length;
  const pct = Math.round((completedCount / totalTopics) * 100);

  document.getElementById('streak-count').textContent = STATE.streak;
  document.getElementById('topics-done').textContent = `${completedCount} / ${totalTopics}`;
  document.getElementById('problems-solved').textContent = STATE.solvedProblems.length;
  document.getElementById('overall-progress-text').textContent = `${pct}% Complete`;
  document.getElementById('nav-progress-fill').style.width = `${pct}%`;

  // Current week calculation
  const start = new Date(STATE.startDate);
  const now = new Date();
  const daysPassed = Math.floor((now - start) / 86400000);
  const currentWeek = Math.min(8, Math.max(1, Math.ceil((daysPassed + 1) / 7)));
  document.getElementById('current-week').textContent = `Week ${currentWeek}`;

  // Today's focus
  const weekData = ROADMAP[currentWeek - 1];
  if (weekData) {
    const nextTopic = weekData.topics.find(t => !STATE.completedTopics.includes(t.id)) || weekData.topics[0];
    document.getElementById('today-focus').innerHTML = `
      <div class="today-week">Week ${currentWeek}: ${weekData.title}</div>
      <h3>${nextTopic.title}</h3>
      <p>${nextTopic.detail}</p>
      <button class="btn btn-primary" onclick="navigateToTopic('${nextTopic.id}')">Start Learning →</button>
    `;
  }

  // Skill bars
  const skillBars = document.getElementById('skill-bars');
  skillBars.innerHTML = SKILL_CATEGORIES.map(cat => {
    const done = cat.topicIds.filter(id => STATE.completedTopics.includes(id)).length;
    const total = cat.topicIds.length;
    const p = Math.round((done / total) * 100);
    return `
      <div class="skill-bar-item">
        <div class="skill-bar-header">
          <span>${cat.name}</span>
          <span>${done}/${total}</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${p}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

window.navigateToTopic = function(topicId) {
  openLesson(topicId);
};

// ─── Initialize ───
initEditor();
renderRoadmap();
renderProblemList();
renderResources();
updateDashboard();
