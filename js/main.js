import { PORTFOLIO_DATA, CARECONNECT_DATA } from './data.js';

// State management
let activeCCtab = 'deliverables';
let activeProjectFilter = 'all';
let currentCodeSnippet = '';

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initViewSwitcher();
  initCareConnectHeader();
  initCareConnectTabs();
  renderAgileDeliverables();
  renderScreenshotsGallery();
  renderKanbanBoard();
  renderStandupLogbook();
  renderProjects();
  renderEducationAndSkills();
  renderPortfolioReflections();
  renderMarkdownView();
});

// -------------------------------------------------------------
// 1. NAVIGATION, SCROLLSPY & MOBILE MENU
// -------------------------------------------------------------
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-nav-target]');
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');

  function setActiveNavLink(targetId) {
    if (!targetId) return;

    // Desktop items
    document.querySelectorAll('#main-nav .nav-item').forEach(el => {
      const elTarget = el.getAttribute('data-nav-target');
      if (elTarget === 'careconnect') {
        if (targetId === 'careconnect') {
          el.className = 'nav-item px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-teal-900 bg-teal-100 font-bold border border-teal-300 shadow-xs';
        } else {
          el.className = 'nav-item px-3 py-1.5 rounded-lg hover:text-teal-900 hover:bg-teal-50 transition-all flex items-center gap-1.5 text-teal-700 bg-teal-50/70 font-semibold border border-teal-200/60';
        }
      } else {
        if (elTarget === targetId) {
          el.className = 'nav-item px-3 py-1.5 rounded-lg transition-all font-bold text-sky-600 bg-sky-50 shadow-xs border border-sky-100';
        } else {
          el.className = 'nav-item px-3 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-all font-medium text-slate-600 border border-transparent';
        }
      }
    });

    // Mobile items
    if (mobileMenu) {
      mobileMenu.querySelectorAll('[data-nav-target]').forEach(el => {
        const elTarget = el.getAttribute('data-nav-target');
        if (elTarget === targetId) {
          el.classList.add('font-bold', 'text-sky-600', 'bg-sky-50');
          el.classList.remove('text-slate-700', 'hover:bg-slate-50');
        } else {
          el.classList.remove('font-bold', 'text-sky-600', 'bg-sky-50');
          if (elTarget !== 'careconnect') {
            el.classList.add('text-slate-700', 'hover:bg-slate-50');
          }
        }
      });
    }
  }

  // Click handler for all navigation buttons and links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-nav-target');
      if (!targetId) return;

      e.preventDefault();

      // Ensure we are in website view mode
      switchViewMode('web');

      const targetElement = document.getElementById(`section-${targetId}`);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, '', `#section-${targetId}`);
        }
      }

      setActiveNavLink(targetId);

      // Close mobile menu if open
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    });
  });

  // Mobile menu open / close helpers
  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('hidden');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('hidden');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('hidden')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  // Close mobile drawer when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // ScrollSpy with IntersectionObserver for automatic active tab highlighting
  const sections = ['overview', 'careconnect', 'projects', 'skills-edu', 'reflections', 'contact'];
  const sectionElements = sections
    .map(id => document.getElementById(`section-${id}`))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sectionElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('section-', '');
          setActiveNavLink(sectionId);
        }
      });
    }, observerOptions);

    sectionElements.forEach(el => observer.observe(el));
  }
}


// -------------------------------------------------------------
// 2. VIEW SWITCHER (WEBSITE VS MARKDOWN)
// -------------------------------------------------------------
function initViewSwitcher() {
  const btnWeb = document.getElementById('btn-mode-web');
  const btnMd = document.getElementById('btn-mode-md');
  const btnCopyMd = document.getElementById('btn-copy-markdown');
  const btnRawToggle = document.getElementById('btn-raw-toggle');

  if (btnWeb) {
    btnWeb.addEventListener('click', () => switchViewMode('web'));
  }
  if (btnMd) {
    btnMd.addEventListener('click', () => switchViewMode('md'));
  }

  if (btnCopyMd) {
    btnCopyMd.addEventListener('click', () => {
      copyToClipboard(PORTFOLIO_DATA.rawReadmeContent, 'README.md copied to clipboard!');
    });
  }

  if (btnRawToggle) {
    btnRawToggle.addEventListener('click', () => {
      const rendered = document.getElementById('markdown-rendered-content');
      const raw = document.getElementById('markdown-raw-content');
      if (raw.classList.contains('hidden')) {
        raw.classList.remove('hidden');
        rendered.classList.add('hidden');
        btnRawToggle.textContent = 'View Formatted HTML';
      } else {
        raw.classList.add('hidden');
        rendered.classList.remove('hidden');
        btnRawToggle.textContent = 'Toggle Raw Text';
      }
    });
  }
}

function switchViewMode(mode) {
  const viewWeb = document.getElementById('view-interactive');
  const viewMd = document.getElementById('view-markdown');
  const btnWeb = document.getElementById('btn-mode-web');
  const btnMd = document.getElementById('btn-mode-md');

  if (mode === 'web') {
    viewWeb.classList.remove('hidden');
    viewMd.classList.add('hidden');
    btnWeb.className = 'px-3 py-1.5 rounded-lg bg-white text-slate-900 shadow-xs transition-all';
    btnMd.className = 'px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-all flex items-center gap-1';
  } else {
    viewWeb.classList.add('hidden');
    viewMd.classList.remove('hidden');
    btnMd.className = 'px-3 py-1.5 rounded-lg bg-white text-slate-900 shadow-xs transition-all flex items-center gap-1';
    btnWeb.className = 'px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-all';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// -------------------------------------------------------------
// 3. CARECONNECT HEADER & 5 TEAM MEMBERS
// -------------------------------------------------------------
function initCareConnectHeader() {
  const container = document.getElementById('team-members-grid');
  if (!container) return;

  container.innerHTML = CARECONNECT_DATA.groupMembers.map((member, index) => {
    const isNuyra = member.name.includes('Nuyra');
    return `
      <div class="p-3 rounded-xl ${isNuyra ? 'bg-teal-500/20 border-teal-400/50 ring-1 ring-teal-400/40' : 'bg-white/5 border-white/10'} border text-xs">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] text-teal-300 font-bold">#0${index + 1}</span>
          ${isNuyra ? '<span class="bg-teal-400 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded">You</span>' : ''}
        </div>
        <div class="font-bold text-white text-sm mt-1 truncate">${member.name}</div>
        <div class="text-teal-200/90 text-[11px] font-medium truncate mt-0.5">${member.role}</div>
        <div class="text-slate-400 text-[10px] truncate mt-1">${member.focusArea}</div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 4. CARECONNECT TABS SWITCHER
// -------------------------------------------------------------
function initCareConnectTabs() {
  const tabs = document.querySelectorAll('#careconnect-tabs .cc-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      activeCCtab = target;

      // Update button styling
      tabs.forEach(t => {
        t.className = 'cc-tab px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all whitespace-nowrap';
      });
      tab.className = 'cc-tab px-4 py-2 rounded-xl text-sm font-bold bg-teal-600 text-white shadow-xs transition-all whitespace-nowrap';

      // Hide all panels
      document.querySelectorAll('.cc-tab-panel').forEach(panel => {
        panel.classList.add('hidden');
      });

      // Show target panel
      const targetPanel = document.getElementById(`tab-content-${target}`);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
      }
    });
  });

  const expandAllBtn = document.getElementById('btn-expand-all-deliverables');
  if (expandAllBtn) {
    let allExpanded = false;
    expandAllBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      document.querySelectorAll('.deliverable-details').forEach(el => {
        if (allExpanded) el.classList.remove('hidden');
        else el.classList.add('hidden');
      });
      expandAllBtn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
    });
  }
}

// -------------------------------------------------------------
// 5. RENDER AGILE DELIVERABLES (CPUT RUBRIC)
// -------------------------------------------------------------
function renderAgileDeliverables() {
  const container = document.getElementById('agile-deliverables-list');
  if (!container) return;

  container.innerHTML = CARECONNECT_DATA.agileDeliverables.map((deliv, index) => {
    const isCharter = deliv.id === 'deliverable-team-charter';
    const isStories = deliv.id === 'deliverable-user-stories';
    const isProductBacklog = deliv.id === 'deliverable-product-backlog';
    const isSprintBacklog = deliv.id === 'deliverable-sprint-backlog';
    const isLogbook = deliv.id === 'deliverable-agile-logbook';

    return `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        
        <!-- Header -->
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                  Deliverable ${index + 1} of 5
                </span>
                <span class="text-xs font-semibold text-slate-500">
                  Weight: ${deliv.weight}
                </span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mt-2">${deliv.rubricCriterion}: ${deliv.title}</h3>
              <p class="text-xs text-slate-500 italic mt-0.5">${deliv.subtitle}</p>
            </div>

            <button onclick="toggleDeliverableDetails('${deliv.id}')" class="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-xs flex items-center gap-1.5 self-start sm:self-auto shrink-0">
              <span id="btn-label-${deliv.id}">Toggle Details &amp; Evidence</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          <p class="text-sm text-slate-600 mt-3 leading-relaxed">${deliv.summary}</p>
        </div>

        <!-- Collapsible Details Container -->
        <div id="details-${deliv.id}" class="deliverable-details p-6 space-y-6">

          <!-- Specific Evidence Content -->
          ${isCharter ? renderCharterEvidence(deliv.details) : ''}
          ${isStories ? renderStoriesEvidence(deliv.stories) : ''}
          ${isProductBacklog ? renderProductBacklogEvidence(deliv) : ''}
          ${isSprintBacklog ? renderSprintBacklogEvidence(deliv) : ''}
          ${isLogbook ? renderLogbookSummaryEvidence(deliv) : ''}

          <!-- STAR Reflection Box -->
          <div class="mt-6 rounded-2xl bg-gradient-to-br from-teal-50/60 to-sky-50/60 border border-teal-200/80 p-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-teal-200/60">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                <h4 class="font-bold text-slate-900 text-base">${deliv.reflection.title}</h4>
              </div>
              <button onclick="copyReflectionMarkdown('${deliv.id}')" class="px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-teal-800 text-xs font-bold shadow-xs hover:bg-teal-50 flex items-center gap-1.5 self-start sm:self-auto">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Reflection (Markdown)
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs leading-relaxed">
              <div class="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs">
                <span class="font-bold text-teal-800 uppercase tracking-wider text-[10px] block mb-1">Situation</span>
                <p class="text-slate-700">${deliv.reflection.situation}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs">
                <span class="font-bold text-sky-800 uppercase tracking-wider text-[10px] block mb-1">Task</span>
                <p class="text-slate-700">${deliv.reflection.task}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs">
                <span class="font-bold text-purple-800 uppercase tracking-wider text-[10px] block mb-1">Action</span>
                <p class="text-slate-700">${deliv.reflection.action}</p>
              </div>
              <div class="p-3.5 rounded-xl bg-white border border-teal-100 shadow-xs">
                <span class="font-bold text-emerald-800 uppercase tracking-wider text-[10px] block mb-1">Result</span>
                <p class="text-slate-700">${deliv.reflection.result}</p>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-teal-200/40 text-xs text-slate-600">
              <strong class="text-slate-800">Key Learnings:</strong>
              <ul class="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                ${deliv.reflection.keyLearnings.map(l => `<li>${l}</li>`).join('')}
              </ul>
            </div>
          </div>

        </div>

      </div>
    `;
  }).join('');
}

function renderCharterEvidence(details) {
  return `
    <div class="space-y-4 text-xs">
      <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <span class="font-bold text-slate-900 block text-sm mb-1">Shared Purpose</span>
        <p class="text-slate-600">${details.sharedPurpose}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span class="font-bold text-slate-900 block mb-2">Core Working Agreements</span>
          <ul class="list-disc list-inside space-y-1 text-slate-600">
            ${details.workingAgreements.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span class="font-bold text-slate-900 block mb-2">Core Team Values &amp; Ethics</span>
          <ul class="list-disc list-inside space-y-1 text-slate-600">
            ${details.coreValues.map(v => `<li>${v}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
        <strong class="font-bold">Conflict Resolution Protocol:</strong> ${details.conflictResolutionProtocol}
      </div>
    </div>
  `;
}

function renderStoriesEvidence(stories) {
  return `
    <div class="space-y-4">
      <div class="text-xs font-semibold text-slate-500 mb-2">5 Formulated User Stories with Gherkin Acceptance Criteria &amp; Tasks:</div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        ${stories.map(s => `
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-mono font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">${s.id}</span>
              <span class="font-semibold text-slate-500">${s.storyPoints} Story Points · <strong class="text-slate-800">${s.priority}</strong></span>
            </div>
            <div class="font-bold text-slate-900 text-sm">${s.title}</div>
            <p class="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200/80">"${s.statement}"</p>
            
            <div class="mt-2">
              <span class="font-bold text-slate-800 block mb-1">Acceptance Criteria (Gherkin):</span>
              <ul class="list-disc list-inside text-slate-600 space-y-0.5">
                ${s.acceptanceCriteria.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>

            <div class="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
              <span class="font-bold text-slate-700">Decomposed Tasks:</span>
              <div class="mt-1 space-y-0.5">
                ${s.tasks.map(t => `<div class="font-mono bg-white px-2 py-1 rounded border border-slate-200/60 truncate">${t}</div>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProductBacklogEvidence(deliv) {
  return `
    <div class="space-y-4 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-slate-600">Prioritized MoSCoW Breakdown (Total: <strong>76 Story Points</strong>, Delivered: <strong>68 SP</strong>):</span>
        <span class="font-mono font-bold text-teal-700">Trello Board Link Available</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase">
              <th class="py-2.5 px-3">Rank</th>
              <th class="py-2.5 px-3">Item ID &amp; Feature Description</th>
              <th class="py-2.5 px-3">Epic</th>
              <th class="py-2.5 px-3">Estimate</th>
              <th class="py-2.5 px-3">Priority</th>
              <th class="py-2.5 px-3">Status</th>
              <th class="py-2.5 px-3">Assignee</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${deliv.backlogItems.map(item => `
              <tr class="hover:bg-slate-50">
                <td class="py-2 px-3 font-mono font-bold">#${item.rank}</td>
                <td class="py-2 px-3 font-medium text-slate-900">${item.item}</td>
                <td class="py-2 px-3"><span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">${item.epic}</span></td>
                <td class="py-2 px-3 font-mono">${item.estimate}</td>
                <td class="py-2 px-3">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.priority.includes('Must') ? 'bg-red-100 text-red-800' :
                    item.priority.includes('Should') ? 'bg-blue-100 text-blue-800' :
                    item.priority.includes('Could') ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                  }">
                    ${item.priority}
                  </span>
                </td>
                <td class="py-2 px-3">
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
                    ${item.status}
                  </span>
                </td>
                <td class="py-2 px-3 text-[11px] font-medium">${item.lead}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSprintBacklogEvidence(deliv) {
  return `
    <div class="space-y-4 text-xs">
      <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
        <span class="font-bold text-slate-900 block text-sm mb-1">Sprint Timeline: 12 October – 19 October 2026 (7 Days)</span>
        <p class="text-slate-600">Tasks transitioned across 4 Kanban columns (To Do, In Progress, Code Review, Done) with strict Work-in-Progress (WIP) limits enforced.</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3 rounded-xl bg-teal-50 border border-teal-200">
          <div class="text-slate-600">Committed Points</div>
          <div class="text-lg font-bold text-teal-900">68 SP</div>
        </div>
        <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <div class="text-slate-600">Completed Points</div>
          <div class="text-lg font-bold text-emerald-900">68 SP (100%)</div>
        </div>
        <div class="p-3 rounded-xl bg-sky-50 border border-sky-200">
          <div class="text-slate-600">Average Cycle Time</div>
          <div class="text-lg font-bold text-sky-900">1.2 Days</div>
        </div>
        <div class="p-3 rounded-xl bg-purple-50 border border-purple-200">
          <div class="text-slate-600">Defects in QA</div>
          <div class="text-lg font-bold text-purple-900">5 (All Resolved)</div>
        </div>
      </div>
    </div>
  `;
}

function renderLogbookSummaryEvidence(deliv) {
  return `
    <div class="space-y-3 text-xs">
      <p class="text-slate-600 leading-relaxed">
        The Agile Logbook documents all 8 consecutive days of daily standups (12–19 October 2026) at 09:00 AM with 100% attendance from all 5 members. Please view the <strong>"8-Day Standup Logbook"</strong> tab for the complete chronological day-by-day diary.
      </p>
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
        <span class="font-bold text-slate-800">8 Ceremonies Logged · 3 Questions (Yesterday, Today, Blockers &amp; Resolutions)</span>
        <button onclick="document.querySelector('[data-tab=\\'logbook\\']').click()" class="text-xs font-bold text-teal-600 hover:underline">
          Open Full Logbook &rarr;
        </button>
      </div>
    </div>
  `;
}

// Global toggle for deliverable details
window.toggleDeliverableDetails = function(id) {
  const el = document.getElementById(`details-${id}`);
  const label = document.getElementById(`btn-label-${id}`);
  if (!el) return;

  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    if (label) label.textContent = 'Hide Details';
  } else {
    el.classList.add('hidden');
    if (label) label.textContent = 'Toggle Details & Evidence';
  }
};

window.copyReflectionMarkdown = function(id) {
  const deliverable = CARECONNECT_DATA.agileDeliverables.find(d => d.id === id);
  if (!deliverable) return;

  const markdown = `## ${deliverable.reflection.title}

**Situation:**  
${deliverable.reflection.situation}

**Task:**  
${deliverable.reflection.task}

**Action:**  
${deliverable.reflection.action}

**Result:**  
${deliverable.reflection.result}

**Key Learnings:**  
${deliverable.reflection.keyLearnings.map(l => `- ${l}`).join('\n')}`;

  copyToClipboard(markdown, `${deliverable.rubricCriterion} reflection markdown copied!`);
};

// -------------------------------------------------------------
// 6. RENDER 7 REAL SCREENSHOTS GALLERY
// -------------------------------------------------------------
function renderScreenshotsGallery() {
  const container = document.getElementById('screenshots-grid');
  if (!container) return;

  container.innerHTML = CARECONNECT_DATA.actualScreenshots.map((screen, idx) => {
    return `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group">
        <!-- Thumbnail -->
        <div class="relative bg-slate-900 cursor-pointer overflow-hidden aspect-video flex items-center justify-center" onclick="openLightbox('${screen.imagePath}', '${screen.title}')">
          <img 
            src="${screen.imagePath}" 
            alt="${screen.title}" 
            class="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
            <span class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
              Click to Enlarge
            </span>
          </div>
          <span class="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 text-white font-mono text-[10px] font-bold">
            0${idx + 1}
          </span>
          <span class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-teal-600/90 text-white text-[10px] font-bold">
            ${screen.badge}
          </span>
        </div>

        <!-- Meta -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="font-bold text-slate-900 text-base leading-snug">${screen.title}</h4>
            <p class="text-xs text-slate-600 mt-2 leading-relaxed">${screen.caption}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-100">
            <div class="text-[11px] font-bold text-sky-800 uppercase tracking-wide">Examiner Rubric Insight:</div>
            <p class="text-[11px] text-slate-500 mt-0.5">${screen.examinerInsight}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 7. RENDER TRELLO KANBAN BOARD
// -------------------------------------------------------------
function renderKanbanBoard() {
  const container = document.getElementById('kanban-columns-container');
  if (!container) return;

  const sprintDeliverable = CARECONNECT_DATA.agileDeliverables.find(d => d.id === 'deliverable-sprint-backlog');
  if (!sprintDeliverable) return;

  container.innerHTML = sprintDeliverable.kanbanColumns.map(col => {
    return `
      <div class="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex flex-col">
        <!-- Column Header -->
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
          <div>
            <h4 class="font-bold text-slate-900 text-sm">${col.column}</h4>
            <span class="text-[10px] text-slate-500 font-medium">${col.badge}</span>
          </div>
          <span class="text-xs font-mono font-bold bg-white text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
            ${col.cards.length}
          </span>
        </div>

        <!-- Cards List -->
        <div class="space-y-2.5 flex-1 overflow-y-auto">
          ${col.cards.map(card => {
            return `
              <div class="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-xs card-hover text-xs">
                <div class="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span class="font-bold text-teal-700">${card.id}</span>
                  <span class="text-slate-400 font-bold">${card.sp} SP</span>
                </div>
                <div class="font-bold text-slate-900 text-xs">${card.title}</div>
                <div class="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span class="font-medium text-slate-600 truncate">${card.dev}</span>
                  <span class="w-2 h-2 rounded-full ${col.column === 'Done' ? 'bg-emerald-500' : col.column === 'In Progress' ? 'bg-amber-500' : 'bg-slate-300'}"></span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 8. RENDER 8-DAY STANDUP LOGBOOK
// -------------------------------------------------------------
function renderStandupLogbook() {
  const container = document.getElementById('standup-logs-accordion');
  const retroContainer = document.getElementById('sprint-retrospective-card');
  if (!container) return;

  const logbookDeliverable = CARECONNECT_DATA.agileDeliverables.find(d => d.id === 'deliverable-agile-logbook');
  if (!logbookDeliverable) return;

  container.innerHTML = logbookDeliverable.standupLogs.map((entry, idx) => {
    const isOpen = idx === 0 || idx === 7; // Open first and last day by default
    return `
      <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button onclick="toggleStandupDay('day-${idx}')" class="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-50/60 hover:bg-slate-50 transition-colors">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                ${entry.date}
              </span>
              <span class="text-xs font-bold text-slate-900">
                ${entry.day}
              </span>
            </div>
            <div class="text-xs text-slate-500 mt-1">${entry.ceremony}</div>
          </div>
          <svg id="chevron-day-${idx}" class="w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>

        <div id="content-day-${idx}" class="${isOpen ? '' : 'hidden'} p-5 border-t border-slate-100 space-y-4 text-xs">
          <!-- Attendees -->
          <div class="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span class="font-bold text-slate-500">Attendees:</span>
            ${entry.attendees.map(a => `<span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">${a}</span>`).join('')}
          </div>

          <!-- 3 Questions Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span class="font-bold text-slate-800 uppercase tracking-wide text-[10px] block mb-1">1. What did I do yesterday?</span>
              <p class="text-slate-600">${entry.yesterday}</p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span class="font-bold text-slate-800 uppercase tracking-wide text-[10px] block mb-1">2. What will I do today?</span>
              <p class="text-slate-600">${entry.today}</p>
            </div>
            <div class="p-3 rounded-xl bg-amber-50/60 border border-amber-200">
              <span class="font-bold text-amber-900 uppercase tracking-wide text-[10px] block mb-1">3. Blockers &amp; Impediments</span>
              <p class="text-amber-800">${entry.blocker}</p>
              <div class="mt-2 pt-2 border-t border-amber-200/60 text-slate-700">
                <strong class="text-emerald-700">Resolution:</strong> ${entry.resolution}
              </div>
            </div>
          </div>

          <!-- Nuyra's Contribution -->
          <div class="p-3 rounded-xl bg-teal-50 border border-teal-200/80">
            <span class="font-bold text-teal-900 uppercase tracking-wide text-[10px] block mb-0.5">Nuyra Swanson's Contribution (Student ID: 221290524)</span>
            <p class="text-teal-950 font-medium">${entry.nuyraContribution}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (retroContainer && logbookDeliverable.sprintRetrospective) {
    const retro = logbookDeliverable.sprintRetrospective;
    retroContainer.innerHTML = `
      <div class="border-b border-slate-100 pb-4 mb-4">
        <span class="text-xs font-bold text-purple-700 uppercase tracking-wider">Formal Sprint Ceremony</span>
        <h4 class="text-lg font-bold text-slate-900 mt-0.5">CareConnect Sprint Retrospective (19 October 2026)</h4>
        <p class="text-xs text-slate-500 mt-1">Continuous improvement analysis facilitated by Scrum Master Siphelele Zono and reviewed by all 5 members.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
          <span class="font-bold text-emerald-900 text-sm block mb-2">What Went Well</span>
          <ul class="list-disc list-inside space-y-1 text-emerald-950">
            ${retro.whatWentWell.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
        <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
          <span class="font-bold text-amber-900 text-sm block mb-2">What Could Be Improved</span>
          <ul class="list-disc list-inside space-y-1 text-amber-950">
            ${retro.whatCouldBeImproved.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
        <div class="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
          <span class="font-bold text-sky-900 text-sm block mb-2">Action Items for Next Cycle</span>
          <ul class="list-disc list-inside space-y-1 text-sky-950">
            ${retro.actionItemsForNextCycle.map(a => `<li>${a}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

window.toggleStandupDay = function(id) {
  const content = document.getElementById(`content-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  if (!content) return;

  content.classList.toggle('hidden');
  if (chevron) chevron.classList.toggle('rotate-180');
};

// -------------------------------------------------------------
// 9. RENDER ACADEMIC & PERSONAL PROJECTS
// -------------------------------------------------------------
function renderProjects() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('#project-filters .proj-filter');
  if (!container) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      activeProjectFilter = filter;

      filterButtons.forEach(b => {
        b.className = 'proj-filter px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50';
      });
      btn.className = 'proj-filter px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-xs';

      renderProjects();
    });
  });

  const filtered = activeProjectFilter === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === activeProjectFilter);

  container.innerHTML = filtered.map(proj => {
    const hasSnippet = !!proj.codeSnippet;
    return `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between card-hover shadow-xs">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              proj.category === 'Java' ? 'bg-amber-100 text-amber-800' :
              proj.category === 'Systems' ? 'bg-purple-100 text-purple-800' : 'bg-sky-100 text-sky-800'
            }">
              ${proj.category}
            </span>
            <span class="text-xs text-slate-400 font-medium">${proj.subtitle}</span>
          </div>

          <h3 class="text-lg font-bold text-slate-900 leading-snug">${proj.title}</h3>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">${proj.description}</p>

          <div class="mt-4">
            <span class="text-[11px] font-bold text-slate-700 block mb-1">Key Engineering Highlights:</span>
            <ul class="list-disc list-inside space-y-0.5 text-xs text-slate-600">
              ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="flex flex-wrap gap-1">
            ${proj.technologies.slice(0, 3).map(t => `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">${t}</span>`).join('')}
          </div>

          ${hasSnippet ? `
            <button onclick="openCodeModal('${proj.id}')" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              View Code
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.openCodeModal = function(projectId) {
  const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!proj || !proj.codeSnippet) return;

  const modal = document.getElementById('code-modal');
  const title = document.getElementById('code-modal-title');
  const body = document.getElementById('code-modal-body');

  title.textContent = proj.codeSnippet.title;
  body.textContent = proj.codeSnippet.code;
  currentCodeSnippet = proj.codeSnippet.code;

  modal.classList.remove('hidden');
};

window.closeCodeModal = function() {
  const modal = document.getElementById('code-modal');
  modal.classList.add('hidden');
};

window.copyCurrentCode = function() {
  copyToClipboard(currentCodeSnippet, 'Code snippet copied to clipboard!');
};

// -------------------------------------------------------------
// 10. RENDER EDUCATION & SKILLS
// -------------------------------------------------------------
function renderEducationAndSkills() {
  const eduContainer = document.getElementById('education-list');
  const skillsContainer = document.getElementById('skills-container');

  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.education.map(edu => {
      return `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-bold text-purple-700">${edu.period}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${edu.status === 'In Progress' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'}">${edu.status}</span>
          </div>
          <h4 class="font-bold text-slate-900 text-base">${edu.degree}</h4>
          <div class="text-xs text-slate-500 font-medium">${edu.institution} · ${edu.location}</div>
          <p class="text-xs text-slate-600 mt-2 leading-relaxed">${edu.description}</p>
        </div>
      `;
    }).join('');
  }

  if (skillsContainer) {
    skillsContainer.innerHTML = PORTFOLIO_DATA.skills.map(cat => {
      return `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <h4 class="font-bold text-slate-900 text-sm mb-3">${cat.title}</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${cat.skills.map(s => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div class="flex items-center justify-between font-bold">
                  <span class="text-slate-900">${s.name}</span>
                  <span class="text-[10px] text-sky-700 font-semibold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">${s.level}</span>
                </div>
                <div class="text-[11px] text-slate-500 mt-1">${s.note}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
}

// -------------------------------------------------------------
// 11. RENDER PORTFOLIO STAR REFLECTIONS
// -------------------------------------------------------------
function renderPortfolioReflections() {
  const container = document.getElementById('portfolio-reflections-grid');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.reflections.map(ref => {
    return `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs card-hover">
        <div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">
            ${ref.category}
          </span>
          <h3 class="text-base font-bold text-slate-900 mt-2">${ref.title}</h3>

          <div class="mt-4 space-y-2.5 text-xs text-slate-700">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong class="font-bold text-slate-900 block text-[10px] uppercase text-teal-700">Situation:</strong>
              ${ref.situation}
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong class="font-bold text-slate-900 block text-[10px] uppercase text-sky-700">Task:</strong>
              ${ref.task}
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong class="font-bold text-slate-900 block text-[10px] uppercase text-purple-700">Action:</strong>
              ${ref.action}
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <strong class="font-bold text-slate-900 block text-[10px] uppercase text-emerald-700">Result:</strong>
              ${ref.result}
            </div>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-slate-100">
          <button onclick="copyToClipboard(\`${ref.markdownSnippet.replace(/`/g, '\\`')}\`, 'STAR reflection copied!')" class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Markdown Format
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 12. RENDER MARKDOWN VIEW (LIGHTWEIGHT MARKDOWN PARSER)
// -------------------------------------------------------------
function renderMarkdownView() {
  const container = document.getElementById('markdown-rendered-content');
  const rawTextarea = document.getElementById('markdown-raw-content');
  if (!container || !rawTextarea) return;

  rawTextarea.value = PORTFOLIO_DATA.rawReadmeContent;
  container.innerHTML = parseMarkdownToHTML(PORTFOLIO_DATA.rawReadmeContent);
}

function parseMarkdownToHTML(md) {
  let html = md
    // Escape standard HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mt-6 mb-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 border-b border-slate-200/80 pb-2 mt-6 mb-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 mt-5 mb-2">$1</h3>')
    // Bold & Italics
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-700">$1</em>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 underline font-semibold hover:text-sky-800">$1</a>')
    // Horizontal Rule
    .replace(/^---$/gim, '<hr class="my-6 border-slate-200"/>')
    // Code blocks
    .replace(/```(.*?)\n([\s\S]*?)```/gim, '<pre class="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4"><code>$2</code></pre>')
    // Bullet items
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 text-sm">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 text-sm">$1</li>')
    // Paragraph breaks
    .replace(/\n\n/gim, '<p class="my-3 text-sm text-slate-700 leading-relaxed"></p>');

  return html;
}

// -------------------------------------------------------------
// 13. LIGHTBOX & MODAL HELPERS
// -------------------------------------------------------------
window.openLightbox = function(imageSrc, title = 'Screenshot') {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');

  if (modal && img) {
    img.src = imageSrc;
    if (titleEl) titleEl.textContent = title;
    modal.classList.remove('hidden');
  }
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.add('hidden');
};

// Toast notification helper
window.showToast = function(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
};

// Clipboard helper
window.copyToClipboard = function(text, successMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(successMessage))
      .catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
};

function fallbackCopy(text, successMessage) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textArea);
}

// Global click outside modal to close
window.addEventListener('click', (e) => {
  const lightbox = document.getElementById('lightbox-modal');
  const codeModal = document.getElementById('code-modal');

  if (e.target === lightbox) {
    closeLightbox();
  }
  if (e.target === codeModal) {
    closeCodeModal();
  }
});
