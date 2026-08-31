function initCritterCalendar() {
  const START_YEAR = 2026;
  const END_YEAR = 2036;
  const PATTERN_START = new Date(2026, 7, 17);

  // 5-2-2-5 repeating every 14 days from PATTERN_START (Mon 17 Aug 2026).
  // Week 1: D D / M M M M M
  // Week 2: D D / M M / D D D
  // The 5-day Dad block is Fri–Sun of week 2 wrapping into Mon–Tue of week 1.
  const CYCLE = [
    'parent2', 'parent2',
    'parent1', 'parent1', 'parent1', 'parent1', 'parent1',
    'parent2', 'parent2',
    'parent1', 'parent1',
    'parent2', 'parent2', 'parent2'
  ];

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const root = document.getElementById('critter-calendar');
  if (!root) return;

  const isStandalone = document.body.classList.contains('calendar-page');

  function formatPatternStart() {
    return PATTERN_START.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function sameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function daysBetween(a, b) {
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((utcB - utcA) / (24 * 60 * 60 * 1000));
  }

  function getAssignment(date) {
    if (date < PATTERN_START) return null;
    const dayOffset = daysBetween(PATTERN_START, date);
    return CYCLE[dayOffset % CYCLE.length];
  }

  function createDayCell(date, dayNum) {
    const assignment = getAssignment(date);
    const isToday = sameDay(date, new Date());

    const cell = document.createElement('div');
    let classes = 'day';

    if (assignment === 'parent1') classes += ' parent1';
    else if (assignment === 'parent2') classes += ' parent2';
    else classes += ' neutral';

    if (isToday) classes += ' today';

    cell.className = classes;

    const num = document.createElement('span');
    num.className = 'day-num';
    num.textContent = dayNum;
    cell.appendChild(num);

    if (assignment) {
      const label = document.createElement('span');
      label.className = 'day-label';
      label.textContent = assignment === 'parent1' ? 'M' : 'D';
      cell.appendChild(label);
    }

    return cell;
  }

  function buildMonth(monthIndex, year) {
    const firstDay = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const startDow = firstDay.getDay();
    const isUnactivatedMonth = year === 2026 && monthIndex < 7;

    const card = document.createElement('div');
    card.className = 'month-card' + (isUnactivatedMonth ? '' : ' pattern-zone');

    const banner = document.createElement('div');
    banner.className = 'month-banner';

    let tagHtml = '';
    if (isUnactivatedMonth) {
      tagHtml = '<div class="month-tag">Unactivated</div>';
    }

    banner.innerHTML =
      '<div class="month-name">' + MONTHS[monthIndex] + '</div>' +
      tagHtml;
    card.appendChild(banner);

    const weekdayRow = document.createElement('div');
    weekdayRow.className = 'weekday-row';
    WEEKDAYS.forEach(function (wd, i) {
      const el = document.createElement('div');
      el.className = 'weekday' + (i === 0 ? ' sun' : '');
      el.textContent = wd;
      weekdayRow.appendChild(el);
    });
    card.appendChild(weekdayRow);

    const daysGrid = document.createElement('div');
    daysGrid.className = 'days-grid';

    for (let i = 0; i < startDow; i++) {
      const empty = document.createElement('div');
      empty.className = 'day empty';
      daysGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      daysGrid.appendChild(createDayCell(date, day));
    }

    card.appendChild(daysGrid);
    return card;
  }

  function buildYearPanel(year) {
    const panel = document.createElement('div');
    panel.className = 'year-panel';
    panel.dataset.year = year;

    const grid = document.createElement('div');
    grid.className = 'months-grid';

    for (let m = 0; m < 12; m++) {
      grid.appendChild(buildMonth(m, year));
    }

    panel.appendChild(grid);
    return panel;
  }

  function updateYearLabels(year) {
    const patternStart = formatPatternStart();
    root.querySelector('#year-title').textContent = year;

    if (isStandalone) {
      document.title = year + ' — Critter Calendar';
    }

    root.querySelector('#schedule-start-label').textContent = patternStart;

    const noteEl = root.querySelector('#pattern-note');
    if (year === 2026) {
      noteEl.innerHTML = '<strong>Jan–16 Aug 2026</strong> unactivated; schedule from <strong>Mon 17 Aug</strong>.';
      noteEl.style.display = '';
    } else {
      noteEl.textContent = '';
      noteEl.style.display = 'none';
    }
  }

  function selectYear(year) {
    root.querySelectorAll('.year-tab').forEach(function (tab) {
      tab.classList.toggle('active', Number(tab.dataset.year) === year);
    });
    root.querySelectorAll('.year-panel').forEach(function (panel) {
      panel.classList.toggle('active', Number(panel.dataset.year) === year);
    });
    updateYearLabels(year);
  }

  const browserYear = new Date().getFullYear();
  const defaultYear = Math.min(END_YEAR, Math.max(START_YEAR, browserYear));

  const tabsEl = root.querySelector('#year-tabs');
  const panelsEl = root.querySelector('#year-panels');

  for (let year = START_YEAR; year <= END_YEAR; year++) {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'year-tab' + (year === defaultYear ? ' active' : '');
    tab.dataset.year = year;
    tab.textContent = year;
    tab.addEventListener('click', function () {
      selectYear(year);
    });
    tabsEl.appendChild(tab);

    const panel = buildYearPanel(year);
    if (year === defaultYear) panel.classList.add('active');
    panelsEl.appendChild(panel);
  }

  updateYearLabels(defaultYear);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCritterCalendar);
} else {
  initCritterCalendar();
}