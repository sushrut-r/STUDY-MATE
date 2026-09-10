/**
 * Three.js Skills "Technology Universe" Interactive 3D Ecosystem
 * Piyush Kumar Portfolio
 */

(function () {
  const container = document.getElementById("skills-3d-canvas");
  if (!container || typeof THREE === "undefined") return;

  let scene, camera, renderer, animationFrameId;
  let universeGroup, nodesList = [];
  let isDragging = false, prevMousePos = { x: 0, y: 0 };
  let raycaster, mouse;
  let hoveredNode = null;
  let isVisible = true;

  // Flattened skill data with categories and colors
  const SKILL_NODES = [
    // Programming Ring (radius: 7)
    { name: "Python", category: "programming", ring: 6.8, angle: 0.2, color: "#38bdf8", isLearning: false, status: "Proficient", desc: "Data processing, scripting, backend pipelines, automation." },
    { name: "C++", category: "programming", ring: 7.2, angle: 1.2, color: "#38bdf8", isLearning: false, status: "Proficient", desc: "STL, memory control, algorithmic foundations." },
    { name: "OOP in C++", category: "programming", ring: 7.0, angle: 2.1, color: "#38bdf8", isLearning: false, status: "Proficient", desc: "Encapsulation, inheritance, polymorphism, clean abstractions." },
    { name: "C", category: "programming", ring: 6.6, angle: 3.2, color: "#38bdf8", isLearning: false, status: "Foundational", desc: "Procedural logic, pointers, memory architecture." },
    { name: "DSA", category: "programming", ring: 7.4, angle: 4.3, color: "#fbbf24", isLearning: true, status: "Foundations in Progress", desc: "Trees, Graphs, Sorting, Recursion, Time & Space Complexity." },
    { name: "Java", category: "programming", ring: 6.9, angle: 5.4, color: "#fbbf24", isLearning: true, status: "Currently Learning", desc: "JVM paradigms, core language syntax, object models." },

    // Web Ring (radius: 11.5)
    { name: "HTML & CSS", category: "web", ring: 11.0, angle: 0.6, color: "#818cf8", isLearning: false, status: "Proficient", desc: "Semantic markup, modern CSS Grid/Flexbox, responsive design." },
    { name: "JavaScript", category: "web", ring: 11.8, angle: 1.8, color: "#818cf8", isLearning: false, status: "Proficient", desc: "ES6+, async/await, DOM APIs, modern frontend architecture." },
    { name: "Responsive UI", category: "web", ring: 11.2, angle: 2.9, color: "#818cf8", isLearning: false, status: "Proficient", desc: "Mobile-first layouts, fluid scaling, cross-platform testing." },
    { name: "Frontend Dev", category: "web", ring: 11.6, angle: 3.9, color: "#818cf8", isLearning: false, status: "Proficient", desc: "Component design, state management, modern UI/UX." },
    { name: "Web App Dev", category: "web", ring: 11.0, angle: 4.9, color: "#818cf8", isLearning: false, status: "Active Building", desc: "Practical student utilities, creator tools, quiz engines." },
    { name: "Full-Stack Dev", category: "web", ring: 11.9, angle: 5.9, color: "#fbbf24", isLearning: true, status: "Currently Learning", desc: "Connecting responsive UI with server APIs and databases." },

    // Data & DB Ring (radius: 16)
    { name: "Python Data Analysis", category: "data", ring: 15.5, angle: 0.4, color: "#34d399", isLearning: false, status: "Proficient", desc: "Data cleaning, exploratory workflows, automated reporting." },
    { name: "NumPy", category: "data", ring: 16.2, angle: 1.4, color: "#34d399", isLearning: false, status: "Proficient", desc: "Vectorized computations, matrix math, n-d arrays." },
    { name: "Pandas", category: "data", ring: 15.8, angle: 2.3, color: "#34d399", isLearning: false, status: "Proficient", desc: "DataFrames, aggregation, merging, time-series operations." },
    { name: "SQL", category: "data", ring: 16.5, angle: 3.3, color: "#34d399", isLearning: false, status: "Proficient", desc: "Relational queries, joins, groupings, schema design." },
    { name: "DBMS", category: "data", ring: 15.3, angle: 4.1, color: "#fbbf24", isLearning: true, status: "Currently Learning", desc: "Relational modeling, normalization (1NF-BCNF), ACID properties." },
    { name: "Data Analysis", category: "data", ring: 16.7, angle: 4.9, color: "#fbbf24", isLearning: true, status: "Currently Learning", desc: "Statistical inference, trend exploration, hypothesis tests." },
    { name: "Excel & AI", category: "data", ring: 15.7, angle: 5.7, color: "#34d399", isLearning: false, status: "Proficient", desc: "Advanced formulas, pivot models, AI-assisted workflows." },

    // Tools & Executive Ring (radius: 20.5)
    { name: "Git / GitHub", category: "tools_other", ring: 20.0, angle: 0.8, color: "#f59e0b", isLearning: false, status: "Proficient", desc: "Version control, branching workflows, PRs, collaborative repos." },
    { name: "AI-Assisted Dev", category: "tools_other", ring: 20.8, angle: 1.9, color: "#f59e0b", isLearning: false, status: "Proficient", desc: "Leveraging LLMs for prototyping, debugging, code synthesis." },
    { name: "Executive Outreach", category: "tools_other", ring: 20.2, angle: 2.9, color: "#c084fc", isLearning: false, status: "Distinction", desc: "Cold pitching, interviewing IAS/IFS/CA leaders on Picnic Study." },
    { name: "Domain Research", category: "tools_other", ring: 21.0, angle: 4.0, color: "#c084fc", isLearning: false, status: "Distinction", desc: "Synthesizing complex exam patterns, technical papers, topics." },
    { name: "Content Strategy", category: "tools_other", ring: 19.8, angle: 5.0, color: "#c084fc", isLearning: false, status: "Distinction (11M+ views)", desc: "Audience psychology, retention curves, thumbnail/title strategy." },
    { name: "Project Management", category: "tools_other", ring: 20.5, angle: 5.9, color: "#f59e0b", isLearning: false, status: "Proficient", desc: "End-to-end milestone ownership, production scheduling." }
  ];

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.015);

    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 22, 28);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const centerLight = new THREE.PointLight(0x00f2fe, 4, 60);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);

    universeGroup = new THREE.Group();
    scene.add(universeGroup);

    buildCentralStar();
    buildOrbitalRings();
    buildSkillPlanets();
    buildBackgroundConstellations();

    // Event handlers
    setupInteractions();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { isVisible = entry.isIntersecting; });
    }, { threshold: 0.05 });
    observer.observe(container);

    animate();
  }

  function buildCentralStar() {
    // Core Sun representing Piyush
    const sunGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const sunMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.name = "sunMesh";
    universeGroup.add(sunMesh);

    // Inner glowing sphere
    const coreGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    universeGroup.add(coreMesh);

    // Corona Ring
    const coronaGeo = new THREE.RingGeometry(2.6, 3.4, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const corona = new THREE.Mesh(coronaGeo, coronaMat);
    corona.rotation.x = Math.PI / 2;
    universeGroup.add(corona);
  }

  function buildOrbitalRings() {
    const ringRadii = [7.0, 11.4, 16.0, 20.4];
    const ringColors = [0x38bdf8, 0x818cf8, 0x34d399, 0xf59e0b];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.04, radius + 0.04, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[idx],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      universeGroup.add(ringMesh);
    });
  }

  function buildSkillPlanets() {
    SKILL_NODES.forEach((skill, idx) => {
      const nodeGroup = new THREE.Group();

      const planetRadius = skill.isLearning ? 0.65 : 0.55;
      const geo = new THREE.SphereGeometry(planetRadius, 16, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(skill.color),
        emissive: new THREE.Color(skill.color),
        emissiveIntensity: skill.isLearning ? 0.9 : 0.5,
        wireframe: skill.isLearning
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { ...skill, index: idx };
      nodeGroup.add(mesh);

      // Add a learning halo for "Currently Learning" nodes
      if (skill.isLearning) {
        const haloGeo = new THREE.RingGeometry(0.8, 1.0, 16);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xfbbf24,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.8
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.rotation.x = Math.PI / 2;
        nodeGroup.add(halo);
      }

      // Compute coordinate based on ring & angle
      const x = Math.cos(skill.angle) * skill.ring;
      const z = Math.sin(skill.angle) * skill.ring;
      const y = (Math.sin(idx * 1.5) * 1.2);

      nodeGroup.position.set(x, y, z);
      nodeGroup.userData = {
        radius: skill.ring,
        angle: skill.angle,
        speed: 0.003 / (skill.ring * 0.1),
        yOffset: y
      };

      universeGroup.add(nodeGroup);
      nodesList.push({ group: nodeGroup, mesh: mesh, data: skill });
    });
  }

  function buildBackgroundConstellations() {
    const starCount = 300;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 0.12, color: 0x94a3b8, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(geo, mat);
    universeGroup.add(stars);
  }

  function setupInteractions() {
    // Mouse Drag Rotation
    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mouseup", () => { isDragging = false; });

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        universeGroup.rotation.y += deltaX * 0.006;
        universeGroup.rotation.x = Math.max(-0.6, Math.min(0.6, universeGroup.rotation.x + deltaY * 0.004));
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    });

    // Touch support for mobile
    container.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener("touchend", () => { isDragging = false; });

    container.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMousePos.x;
        const deltaY = e.touches[0].clientY - prevMousePos.y;
        universeGroup.rotation.y += deltaX * 0.008;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    container.addEventListener("click", () => {
      if (hoveredNode) {
        selectSkillNode(hoveredNode.userData);
      }
    });

    window.addEventListener("resize", () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Expose filter function globally
    window.filterUniverseCategory = function (category) {
      nodesList.forEach(({ mesh, data }) => {
        if (category === "all" || data.category === category || (category === "learning" && data.isLearning)) {
          mesh.material.opacity = 1.0;
          mesh.material.transparent = false;
          mesh.scale.set(1.2, 1.2, 1.2);
        } else {
          mesh.material.opacity = 0.2;
          mesh.material.transparent = true;
          mesh.scale.set(0.7, 0.7, 0.7);
        }
      });
    };
  }

  function selectSkillNode(data) {
    const titleEl = document.getElementById("skill-detail-title");
    const statusEl = document.getElementById("skill-detail-status");
    const descEl = document.getElementById("skill-detail-desc");
    const categoryEl = document.getElementById("skill-detail-category");

    if (titleEl) titleEl.innerText = data.name;
    if (descEl) descEl.innerText = data.desc;
    if (categoryEl) categoryEl.innerText = data.category.toUpperCase();

    if (statusEl) {
      statusEl.innerText = data.status;
      if (data.isLearning) {
        statusEl.className = "cyber-badge cyber-badge-learning";
      } else {
        statusEl.className = "cyber-badge";
      }
    }
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    if (!isVisible) return;

    if (!isDragging) {
      universeGroup.rotation.y += 0.0018;
    }

    // Pulse center sun
    const sun = universeGroup.getObjectByName("sunMesh");
    if (sun) {
      sun.rotation.y += 0.005;
      sun.rotation.z += 0.003;
    }

    // Raycast hover
    raycaster.setFromCamera(mouse, camera);
    const meshes = nodesList.map(n => n.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hoveredNode !== hit) {
        if (hoveredNode) hoveredNode.scale.set(1, 1, 1);
        hoveredNode = hit;
        hoveredNode.scale.set(1.45, 1.45, 1.45);
        selectSkillNode(hoveredNode.userData);
      }
    } else if (hoveredNode && !isDragging) {
      hoveredNode.scale.set(1, 1, 1);
      hoveredNode = null;
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
