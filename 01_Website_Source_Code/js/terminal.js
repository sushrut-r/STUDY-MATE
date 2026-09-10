/**
 * Interactive Cyberpunk Terminal Console
 * Piyush Kumar Portfolio
 */

(function () {
  const terminalOutput = document.getElementById("terminal-output");
  const terminalInput = document.getElementById("terminal-input");
  if (!terminalOutput || !terminalInput) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<div class="text-cyan-400 font-bold mb-2">AVAILABLE CYBERNETIC COMMANDS:</div>
<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 text-xs">
  <div><span class="text-yellow-400">help</span> - Display this guide</div>
  <div><span class="text-yellow-400">bio</span> - Piyush Kumar profile</div>
  <div><span class="text-yellow-400">education</span> - CSVTU & IIT Madras</div>
  <div><span class="text-yellow-400">skills</span> - Tech Universe overview</div>
  <div><span class="text-yellow-400">projects</span> - Active code repos</div>
  <div><span class="text-yellow-400">studymate</span> - Flagship workspace</div>
  <div><span class="text-yellow-400">picnic</span> - 11M+ views podcast hub</div>
  <div><span class="text-yellow-400">achievements</span> - Milestones & scores</div>
  <div><span class="text-yellow-400">contact</span> - Phone, email, social</div>
  <div><span class="text-yellow-400">hire</span> - Why collaborate</div>
  <div><span class="text-yellow-400">matrix</span> - Digital rain mode</div>
  <div><span class="text-yellow-400">clear</span> - Clear terminal buffer</div>
</div>
<div class="text-slate-500 text-xs mt-2">Tip: Click on any quick badge or type command to execute.</div>
`,

    bio: () => `
<div class="border-l-2 border-cyan-400 pl-3 my-2">
  <div class="text-cyan-300 font-bold">PIYUSH KUMAR</div>
  <div class="text-xs text-purple-300">B.Tech CSE (Data Science) @ CSVTU | BS Data Science @ IIT Madras</div>
  <div class="text-xs text-slate-300 mt-2 leading-relaxed">
    Data Science student, software builder, and creator of Picnic Study (11M+ views, 55+ podcasts).
    Strengthening core foundations in C++, Python, DSA, DBMS, Data Analysis, and Web Development.
  </div>
  <div class="text-xs text-emerald-400 font-mono mt-1">Motto: "Building with Code. Learning with Data. Creating with People."</div>
</div>
`,

    education: () => `
<div class="space-y-2 my-2 text-xs">
  <div class="bg-slate-900/80 p-2.5 rounded border border-cyan-500/30">
    <div class="text-cyan-400 font-bold">1. B.Tech in CSE (Data Science) — CSVTU, Bhilai</div>
    <div class="text-slate-400">3rd Semester • 2024–Present • Core Computing & Machine Learning Foundations</div>
  </div>
  <div class="bg-slate-900/80 p-2.5 rounded border border-purple-500/30">
    <div class="text-purple-400 font-bold">2. BS in Data Science & Applications — IIT Madras</div>
    <div class="text-slate-400">Pursuing • Mathematics for Data Science, Python, Statistics & Computational Thinking</div>
  </div>
  <div class="bg-slate-900/80 p-2.5 rounded border border-amber-500/30">
    <div class="text-amber-400 font-bold">3. Competitive Honors: JEE Advanced 2025 & MHT-CET 2025 Qualified</div>
    <div class="text-slate-400">Class XII: 90.0% | Class X: 92.0%</div>
  </div>
</div>
`,

    skills: () => `
<div class="space-y-1.5 text-xs my-2">
  <div><span class="text-cyan-400 font-bold">[PROGRAMMING]:</span> Python, C++, OOP in C++, C, DSA <span class="text-yellow-400">(Foundations)</span>, Java <span class="text-yellow-400">(Learning)</span></div>
  <div><span class="text-indigo-400 font-bold">[WEB DEV]:</span> HTML5, CSS3, JavaScript (ES6+), Responsive UI, Frontend Dev, Full-Stack <span class="text-yellow-400">(Learning)</span></div>
  <div><span class="text-emerald-400 font-bold">[DATA & DB]:</span> Python for Data Analysis, NumPy, Pandas, SQL, DBMS <span class="text-yellow-400">(Learning)</span>, Data Analysis <span class="text-yellow-400">(Learning)</span>, Excel + AI</div>
  <div><span class="text-amber-400 font-bold">[CREATOR / EXEC]:</span> 11M+ YouTube Views, 55+ Podcasts Hosted, High-Stakes Outreach, Domain Research, Project Mgmt</div>
</div>
`,

    projects: () => `
<div class="space-y-2 text-xs my-2">
  <div class="text-cyan-300 font-bold">⚡ FEATURED DEVELOPER PROJECTS:</div>
  <div>• <span class="text-white font-bold">StudyMate</span> — Next-Gen Student Workspace (Syllabus heatmap + Pomodoro + Flashcards) <span class="text-emerald-400">[Beta Prototype]</span></div>
  <div>• <span class="text-white font-bold">Personalized Web Apps</span> — Custom platforms for Former PW Faculty & Educators <span class="text-purple-400">[In Development]</span></div>
  <div>• <span class="text-white font-bold">YouTube Retention & Audience EDA</span> — Data Analysis on 50+ video datasets <span class="text-yellow-400">[Evolving Project]</span></div>
  <div>• <span class="text-white font-bold">Dynamic Assessment Engine</span> — Rapid quiz generator with instant analytics <span class="text-blue-400">[Prototype]</span></div>
</div>
`,

    studymate: () => `
<div class="bg-cyan-950/40 border border-cyan-500/40 p-3 rounded text-xs my-2">
  <div class="text-cyan-300 font-bold text-sm">STUDYMATE — Flagship Digital Workspace</div>
  <div class="text-slate-300 mt-1">Problem: Fragmented student notes, untracked syllabus, disorganized study hours.</div>
  <div class="text-slate-300 mt-1">Solution: All-in-one desk with Syllabus tracker, Pomodoro Chamber, and Spaced-Repetition flashcards.</div>
  <div class="text-cyan-400 mt-2 font-mono">Status: Active Development / Beta Prototype</div>
</div>
`,

    picnic: () => `
<div class="bg-red-950/30 border border-red-500/40 p-3 rounded text-xs my-2">
  <div class="text-red-400 font-bold text-sm">🎙️ PICNIC STUDY — FROM CODE TO CONVERSATIONS</div>
  <div class="grid grid-cols-2 gap-2 my-2 text-slate-200">
    <div>• Total Views: <span class="text-yellow-400 font-bold">11,000,000+</span></div>
    <div>• Podcasts Hosted: <span class="text-yellow-400 font-bold">55+ Episodes</span></div>
    <div>• Guests: <span class="text-cyan-400">UPSC AIR, CAPF, IRS, CA, NEET</span></div>
    <div>• Pipeline: <span class="text-emerald-400">100% End-to-End Managed</span></div>
  </div>
  <a href="https://youtube.com/@picnicstudy" target="_blank" class="inline-block mt-1 text-red-300 hover:text-white underline">Watch Picnic Study on YouTube →</a>
</div>
`,

    achievements: () => `
<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs my-2">
  <div class="p-2 rounded bg-slate-900 border border-yellow-500/30 text-yellow-400 font-bold">11M+ YouTube Views</div>
  <div class="p-2 rounded bg-slate-900 border border-yellow-500/30 text-yellow-400 font-bold">55+ Podcasts Hosted</div>
  <div class="p-2 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 font-bold">JEE Advanced 2025 Qualified</div>
  <div class="p-2 rounded bg-slate-900 border border-cyan-500/30 text-cyan-400 font-bold">MHT-CET 2025 Qualified</div>
  <div class="p-2 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold">90% Class XII Board</div>
  <div class="p-2 rounded bg-slate-900 border border-emerald-500/30 text-emerald-400 font-bold">92% Class X Board</div>
</div>
`,

    contact: () => `
<div class="space-y-1.5 text-xs my-2 text-slate-300">
  <div>📞 Phone: <a href="tel:+918975795841" class="text-cyan-400 hover:underline">+91 8975795841</a></div>
  <div>📧 Email: <a href="mailto:piyushkumar.dev.contact@gmail.com" class="text-cyan-400 hover:underline">piyushkumar.dev.contact@gmail.com</a></div>
  <div>🌐 Location: <span class="text-white">Bhilai, Chhattisgarh, India</span></div>
  <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/piyush-kumar-743aa387" target="_blank" class="text-cyan-400 hover:underline">linkedin.com/in/piyush-kumar-743aa387</a></div>
  <div>🐙 GitHub: <a href="https://github.com/py4312" target="_blank" class="text-cyan-400 hover:underline">github.com/py4312</a></div>
  <div>📺 YouTube: <a href="https://youtube.com/@picnicstudy" target="_blank" class="text-red-400 hover:underline">youtube.com/@picnicstudy (11M+ views)</a></div>
</div>
`,

    hire: () => `
<div class="p-3 bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-cyan-500/40 rounded text-xs my-2">
  <div class="text-cyan-300 font-bold">WHY COLLABORATE WITH PIYUSH KUMAR?</div>
  <div class="mt-1 text-slate-300 leading-relaxed">
    1. <b>Rigorous Foundation:</b> Dual-track education at CSVTU (B.Tech CSE DS) and IIT Madras (BS DS).<br>
    2. <b>Practical Product Mindset:</b> Builds real web apps, educational tools, and data scripts.<br>
    3. <b>Unmatched Executive Communication:</b> 55+ recorded dialogues with top civil servants and professionals.<br>
    4. <b>Ambition & Credibility:</b> Transparent about current learning curves while delivering top-tier execution.
  </div>
</div>
`,

    matrix: () => {
      startMatrixEffect();
      return `<div class="text-emerald-400 font-mono">Initializing Neural Matrix Stream... Press any key to stop.</div>`;
    },

    clear: () => {
      terminalOutput.innerHTML = "";
      return "";
    },

    whoami: () => `<div class="text-cyan-400 text-xs font-mono">guest_developer@cyberdeck-bhilai-iitm</div>`,
    date: () => `<div class="text-slate-400 text-xs font-mono">${new Date().toUTCString()}</div>`
  };

  function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    history.push(trimmed);
    historyIndex = history.length;

    // Append user line
    const userLine = document.createElement("div");
    userLine.className = "flex items-center gap-2 text-xs font-mono mt-2";
    userLine.innerHTML = `<span class="text-cyan-400">piyush@cyberdeck:~$</span> <span class="text-white font-bold">${escapeHtml(trimmed)}</span>`;
    terminalOutput.appendChild(userLine);

    const cmdKey = trimmed.toLowerCase().split(" ")[0];
    let responseHtml = "";

    if (COMMANDS[cmdKey]) {
      responseHtml = COMMANDS[cmdKey]();
    } else {
      responseHtml = `<div class="text-red-400 text-xs my-1">zsh: command not found: ${escapeHtml(trimmed)}. Type <span class="text-yellow-400 font-bold">help</span> to view commands.</div>`;
    }

    if (responseHtml) {
      const respEl = document.createElement("div");
      respEl.innerHTML = responseHtml;
      terminalOutput.appendChild(respEl);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      terminalInput.value = "";
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = terminalInput.value.toLowerCase();
      const match = Object.keys(COMMANDS).find(k => k.startsWith(current));
      if (match) terminalInput.value = match;
    }
  });

  // Global helper for quick badge clicks
  window.runTerminalCommand = function (cmd) {
    terminalInput.value = cmd;
    executeCommand(cmd);
    terminalInput.focus();
  };

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function startMatrixEffect() {
    const container = document.getElementById("matrix-canvas-container");
    if (!container) return;
    container.classList.remove("hidden");
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const chars = "010101PIYUSH0101CSVTUIITMDATASCIENCE010101PYTHONC++";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let matrixInterval = setInterval(() => {
      ctx.fillStyle = "rgba(5, 7, 19, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00f2fe";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 40);

    const stopMatrix = () => {
      clearInterval(matrixInterval);
      container.classList.add("hidden");
      document.removeEventListener("keydown", stopMatrix);
      container.removeEventListener("click", stopMatrix);
    };

    setTimeout(() => {
      document.addEventListener("keydown", stopMatrix);
      container.addEventListener("click", stopMatrix);
    }, 200);
  }

  // Run welcome help automatically on load
  setTimeout(() => {
    executeCommand("bio");
  }, 400);
})();
