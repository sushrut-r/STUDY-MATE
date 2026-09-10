/**
 * Main Application Logic & Interactive Components
 * Piyush Kumar Portfolio
 */

document.addEventListener("DOMContentLoaded", () => {
  initLucideIcons();
  initAnimatedCounters();
  initStudyMateWorkspace();
  initDataAnalysisCharts();
  initAudioSfx();
  initContactForm();
  initMobileMenu();
  initNavScrollSpy();
});

// 1. Initialize Lucide Icons
function initLucideIcons() {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// 2. Animated Counters for Achievements & Stats
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll("[data-counter-target]");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-counter-target"));
        const suffix = el.getAttribute("data-counter-suffix") || "";
        const prefix = el.getAttribute("data-counter-prefix") || "";
        const duration = parseInt(el.getAttribute("data-counter-duration")) || 1800;
        
        animateValue(el, 0, target, duration, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const isFloat = end % 1 !== 0;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out expo
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = start + (end - start) * easeProgress;
    
    obj.innerText = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.innerText = prefix + (isFloat ? end.toFixed(1) : end) + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

// 3. StudyMate Interactive Digital Workspace
function initStudyMateWorkspace() {
  // Tabs switching
  const tabs = document.querySelectorAll(".studymate-tab-btn");
  const panels = document.querySelectorAll(".studymate-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active", "border-cyan-400", "text-cyan-300", "bg-cyan-950/40"));
      panels.forEach(p => p.classList.add("hidden"));

      tab.classList.add("active", "border-cyan-400", "text-cyan-300", "bg-cyan-950/40");
      const targetPanel = document.getElementById(tab.getAttribute("data-target"));
      if (targetPanel) {
        targetPanel.classList.remove("hidden");
      }
      playCyberClick();
    });
  });

  // Working Pomodoro Focus Timer
  let timerInterval = null;
  let timerSeconds = 25 * 60;
  let isTimerRunning = false;

  const timerDisplay = document.getElementById("pomo-timer-display");
  const pomoStartBtn = document.getElementById("pomo-start-btn");
  const pomoResetBtn = document.getElementById("pomo-reset-btn");
  const pomo25Btn = document.getElementById("pomo-mode-25");
  const pomo50Btn = document.getElementById("pomo-mode-50");
  const pomoBreakBtn = document.getElementById("pomo-mode-break");

  function updateTimerDisplay() {
    if (!timerDisplay) return;
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  if (pomoStartBtn) {
    pomoStartBtn.addEventListener("click", () => {
      playCyberClick();
      if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        pomoStartBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 mr-1 inline"></i> Start Focus`;
        pomoStartBtn.classList.remove("bg-amber-600");
        pomoStartBtn.classList.add("bg-cyan-600");
      } else {
        isTimerRunning = true;
        pomoStartBtn.innerHTML = `<i data-lucide="pause" class="w-4 h-4 mr-1 inline"></i> Pause Session`;
        pomoStartBtn.classList.remove("bg-cyan-600");
        pomoStartBtn.classList.add("bg-amber-600");
        
        timerInterval = setInterval(() => {
          if (timerSeconds > 0) {
            timerSeconds--;
            updateTimerDisplay();
          } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            showToast("Focus interval complete! Great job!");
            pomoStartBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 mr-1 inline"></i> Start Focus`;
          }
        }, 1000);
      }
      initLucideIcons();
    });
  }

  if (pomoResetBtn) {
    pomoResetBtn.addEventListener("click", () => {
      playCyberClick();
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerSeconds = 25 * 60;
      updateTimerDisplay();
      if (pomoStartBtn) {
        pomoStartBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4 mr-1 inline"></i> Start Focus`;
        pomoStartBtn.classList.remove("bg-amber-600");
        pomoStartBtn.classList.add("bg-cyan-600");
        initLucideIcons();
      }
    });
  }

  if (pomo25Btn) {
    pomo25Btn.addEventListener("click", () => {
      playCyberClick();
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerSeconds = 25 * 60;
      updateTimerDisplay();
    });
  }

  if (pomo50Btn) {
    pomo50Btn.addEventListener("click", () => {
      playCyberClick();
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerSeconds = 50 * 60;
      updateTimerDisplay();
    });
  }

  if (pomoBreakBtn) {
    pomoBreakBtn.addEventListener("click", () => {
      playCyberClick();
      clearInterval(timerInterval);
      isTimerRunning = false;
      timerSeconds = 5 * 60;
      updateTimerDisplay();
    });
  }

  // Interactive Syllabus Checkboxes & Progress Bar
  const syllabusChecks = document.querySelectorAll(".syllabus-checkbox");
  const syllabusProgress = document.getElementById("syllabus-progress-bar");
  const syllabusPercent = document.getElementById("syllabus-progress-percent");

  function updateSyllabusProgress() {
    if (!syllabusChecks.length || !syllabusProgress) return;
    const total = syllabusChecks.length;
    const checked = document.querySelectorAll(".syllabus-checkbox:checked").length;
    const pct = Math.round((checked / total) * 100);
    
    syllabusProgress.style.width = `${pct}%`;
    if (syllabusPercent) syllabusPercent.innerText = `${pct}% Completed`;
  }

  syllabusChecks.forEach(ch => {
    ch.addEventListener("change", () => {
      playCyberClick();
      updateSyllabusProgress();
    });
  });

  // Interactive 3D Flashcards
  const flashcardEl = document.getElementById("studymate-flashcard");
  const cardData = [
    {
      q: "What are the 4 fundamental pillars of OOP in C++?",
      a: "1. Encapsulation (data hiding in classes)\n2. Abstraction (hiding implementation details)\n3. Inheritance (code reusability across classes)\n4. Polymorphism (runtime virtual functions & compile-time overloading)"
    },
    {
      q: "Explain time complexity of QuickSort average vs worst case.",
      a: "Average Case: O(N log N) when pivot divides array reasonably.\nWorst Case: O(N²) when array is sorted/reverse sorted and pivot is extreme element without random selection."
    },
    {
      q: "What is the difference between WHERE and HAVING in SQL?",
      a: "WHERE filters raw row-level records before grouping.\nHAVING filters aggregated group-level results after GROUP BY is applied."
    },
    {
      q: "Define ACID properties in Relational Database Management Systems.",
      a: "Atomicity (all or nothing), Consistency (preserves invariants), Isolation (concurrent transactions don't clash), Durability (persisted post-commit)."
    }
  ];

  let currentCardIndex = 0;

  window.flipFlashcard = function () {
    if (!flashcardEl) return;
    playCyberClick();
    flashcardEl.classList.toggle("flashcard-flipped");
  };

  window.nextFlashcard = function () {
    playCyberClick();
    if (flashcardEl) flashcardEl.classList.remove("flashcard-flipped");
    setTimeout(() => {
      currentCardIndex = (currentCardIndex + 1) % cardData.length;
      renderCurrentCard();
    }, 200);
  };

  window.prevFlashcard = function () {
    playCyberClick();
    if (flashcardEl) flashcardEl.classList.remove("flashcard-flipped");
    setTimeout(() => {
      currentCardIndex = (currentCardIndex - 1 + cardData.length) % cardData.length;
      renderCurrentCard();
    }, 200);
  };

  function renderCurrentCard() {
    const qEl = document.getElementById("flashcard-question");
    const aEl = document.getElementById("flashcard-answer");
    const counterEl = document.getElementById("flashcard-index-counter");

    if (qEl) qEl.innerText = cardData[currentCardIndex].q;
    if (aEl) aEl.innerText = cardData[currentCardIndex].a;
    if (counterEl) counterEl.innerText = `Card ${currentCardIndex + 1} of ${cardData.length}`;
  }
}

// 4. Data Analysis Dynamic Canvas Charts
function initDataAnalysisCharts() {
  const canvas = document.getElementById("data-chart-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const datasets = {
    youtube: {
      title: "Picnic Study Audience Retention Curve (11M+ Aggregate)",
      labels: ["0:00 (Hook)", "1:30 (Context)", "5:00 (Deep Strategy)", "15:00 (Mindset)", "30:00 (Tactics)", "45:00 (Closing)"],
      data: [100, 78, 64, 58, 52, 46],
      color: "#ef4444",
      yLabel: "Audience Retention (%)"
    },
    study: {
      title: "Daily Focused Study Hours vs Competitive Exam Mock Percentile",
      labels: ["2 hrs/day", "3.5 hrs/day", "5 hrs/day", "6.5 hrs/day", "8 hrs/day"],
      data: [65, 82, 94, 98.2, 99.4],
      color: "#38bdf8",
      yLabel: "Projected Percentile"
    },
    curriculum: {
      title: "CSVTU (B.Tech) + IIT Madras (BS) Dual-Degree Subject Load",
      labels: ["Sem 1", "Sem 2", "Sem 3 (Active)", "Sem 4", "Sem 5", "Sem 6"],
      data: [6, 7, 9, 8, 8, 7],
      color: "#c084fc",
      yLabel: "Concurrent Technical Modules"
    }
  };

  let activeDataset = "youtube";

  function drawChart(key) {
    activeDataset = key;
    const d = datasets[key];
    if (!d) return;

    // Resize canvas to display size
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 240;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = { top: 35, bottom: 40, left: 55, right: 30 };
    const chartW = canvas.width - padding.left - padding.right;
    const chartH = canvas.height - padding.top - padding.bottom;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
    }

    // Title
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 13px 'Space Grotesk', sans-serif";
    ctx.fillText(d.title, padding.left, 20);

    // Points & line path
    const maxVal = Math.max(...d.data) * 1.15;
    const points = d.data.map((val, i) => {
      const x = padding.left + (chartW / (d.data.length - 1)) * i;
      const y = padding.top + chartH - (val / maxVal) * chartH;
      return { x, y, val, label: d.labels[i] };
    });

    // Draw gradient area under line
    const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
    grad.addColorStop(0, d.color + "55");
    grad.addColorStop(1, d.color + "00");

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
    ctx.lineTo(points[0].x, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw stroke line
    ctx.beginPath();
    ctx.strokeStyle = d.color;
    ctx.lineWidth = 3;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Draw point dots and labels
    points.forEach((pt) => {
      // Glow dot
      ctx.fillStyle = "#050713";
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = d.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.stroke();

      // Value label
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px monospace";
      ctx.fillText(pt.val + (key === "youtube" ? "%" : ""), pt.x - 12, pt.y - 10);

      // X Axis label
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px sans-serif";
      ctx.fillText(pt.label, pt.x - 24, canvas.height - 12);
    });
  }

  // Switch buttons
  window.switchDataChart = function (key) {
    playCyberClick();
    document.querySelectorAll(".data-chart-btn").forEach(btn => {
      btn.classList.remove("border-cyan-400", "text-cyan-300", "bg-cyan-950/50");
    });
    const clicked = document.getElementById(`chart-btn-${key}`);
    if (clicked) clicked.classList.add("border-cyan-400", "text-cyan-300", "bg-cyan-950/50");

    drawChart(key);
  };

  drawChart("youtube");
  window.addEventListener("resize", () => drawChart(activeDataset));
}

// 5. Audio Synthesizer for Subtle Sci-Fi Feedback
let audioCtx = null;
let soundEnabled = true;

function initAudioSfx() {
  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundBtn.innerHTML = soundEnabled 
        ? `<i data-lucide="volume-2" class="w-4 h-4"></i> SFX: ON` 
        : `<i data-lucide="volume-x" class="w-4 h-4"></i> SFX: OFF`;
      initLucideIcons();
      if (soundEnabled) playCyberClick();
    });
  }
}

function playCyberClick() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    // Audio context may be restricted before user interaction
  }
}

// 6. Contact Form Simulation & Toast Notifications
function initContactForm() {
  const form = document.getElementById("contact-terminal-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    playCyberClick();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const msg = document.getElementById("contact-message").value;

    if (!name || !email || !msg) {
      showToast("Please fill all required transmission fields.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<i data-lucide="loader" class="w-4 h-4 mr-2 animate-spin inline"></i> Transmitting Signal...`;
    initLucideIcons();

    setTimeout(() => {
      submitBtn.innerHTML = `<i data-lucide="check" class="w-4 h-4 mr-2 inline text-emerald-400"></i> Signal Dispatched!`;
      initLucideIcons();
      showToast("Signal received! Piyush will respond shortly.");
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        initLucideIcons();
      }, 3000);
    }, 1200);
  });
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-cyan-500/50 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-lg text-sm flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0";
  toast.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span> <span>${msg}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 50);

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.copyToClipboard = function (text, label) {
  playCyberClick();
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  });
};

// 7. Mobile Navigation Drawer
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    playCyberClick();
    mobileMenu.classList.toggle("hidden");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// 8. Navigation ScrollSpy
function initNavScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".desktop-nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-cyan-400", "border-cyan-400");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-cyan-400", "border-cyan-400");
      }
    });
  });
}
