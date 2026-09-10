/**
 * Three.js Hero 3D Interactive Developer Environment
 * Piyush Kumar Portfolio
 */

(function () {
  const container = document.getElementById("hero-3d-canvas");
  if (!container || typeof THREE === "undefined") return;

  let scene, camera, renderer, animationFrameId;
  let objectsGroup, particlesGroup, gitGraphGroup;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;
  let isVisible = true;

  function init() {
    // 1. Scene & Camera
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.025);

    camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 26);

    // 2. Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.5);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f2fe, 3.5, 50);
    cyanPoint.position.set(10, 10, 15);
    scene.add(cyanPoint);

    const purplePoint = new THREE.PointLight(0x8a2be2, 3.0, 50);
    purplePoint.position.set(-12, -8, 10);
    scene.add(purplePoint);

    const blueDirect = new THREE.DirectionalLight(0x38bdf8, 1.2);
    blueDirect.position.set(0, 20, 20);
    scene.add(blueDirect);

    // 4. Groups
    objectsGroup = new THREE.Group();
    particlesGroup = new THREE.Group();
    gitGraphGroup = new THREE.Group();
    scene.add(objectsGroup);
    scene.add(particlesGroup);
    scene.add(gitGraphGroup);

    buildHolographicLaptop();
    buildFloatingDataNodes();
    buildGitBranchGraph();
    buildDatabaseCylinders();
    buildParticleCloud();

    // 5. Event Listeners
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onDocumentMouseMove);
    
    // Visibility observer to pause loop when not on screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    animate();
  }

  function buildHolographicLaptop() {
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -1.8, 4);
    laptopGroup.rotation.x = 0.25;

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(6.4, 0.2, 4.4);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x090d20,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    laptopGroup.add(baseMesh);

    // Glowing Keyboard Area
    const kbGeo = new THREE.PlaneGeometry(5.4, 2.6);
    const kbMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, 0.11, 0.4);
    laptopGroup.add(kbMesh);

    // Screen Bezel
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0.1, -2.1);
    screenGroup.rotation.x = -0.32; // Open lid

    const lidGeo = new THREE.BoxGeometry(6.4, 4.2, 0.15);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x070b1a,
      metalness: 0.9,
      roughness: 0.1
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 2.1;
    screenGroup.add(lidMesh);

    // Screen Display with Code Glow
    const dispGeo = new THREE.PlaneGeometry(6.0, 3.8);
    
    // Canvas texture for screen code
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, 512, 320);

    // Draw header bar
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 512, 32);
    ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.arc(20, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(38, 16, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#10b981"; ctx.beginPath(); ctx.arc(56, 16, 5, 0, Math.PI * 2); ctx.fill();
    
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("piyush_system.py — CSVTU (DS) & IITM BS", 80, 21);

    // Draw Code Lines
    const lines = [
      "import numpy as np",
      "import pandas as pd",
      "from picnic_study import CreatorEcosystem",
      "",
      "class PiyushKumar:",
      "    def __init__(self):",
      "        self.degrees = ['CSVTU B.Tech (DS)', 'IIT Madras BS']",
      "        self.passion = ['Software Dev', 'Data Science', 'Podcasting']",
      "        self.youtube_views = 11_000_000",
      "        self.motto = 'Code • Data • People'",
      "",
      "    def execute_next_move(self):",
      "        return StudyMate.deploy_beta()",
      "",
      "# Status: Active 3rd Semester • Bhilai, India"
    ];

    ctx.font = "12px 'Courier New', monospace";
    lines.forEach((line, i) => {
      if (line.startsWith("import") || line.startsWith("from")) {
        ctx.fillStyle = "#c084fc";
      } else if (line.startsWith("class") || line.startsWith("    def")) {
        ctx.fillStyle = "#38bdf8";
      } else if (line.includes("self.")) {
        ctx.fillStyle = "#34d399";
      } else if (line.startsWith("#")) {
        ctx.fillStyle = "#64748b";
      } else {
        ctx.fillStyle = "#f1f5f9";
      }
      ctx.fillText(line, 24, 60 + i * 16);
    });

    const screenTex = new THREE.CanvasTexture(canvas);
    const dispMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const dispMesh = new THREE.Mesh(dispGeo, dispMat);
    dispMesh.position.set(0, 2.1, 0.08);
    screenGroup.add(dispMesh);

    laptopGroup.add(screenGroup);
    objectsGroup.add(laptopGroup);
  }

  function buildFloatingDataNodes() {
    // Holographic rotating icosahedron floating above laptop
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.4
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(0, 4.5, 0);
    icoMesh.name = "centerOrb";
    objectsGroup.add(icoMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.9, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x8a2be2,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.set(0, 4.5, 0);
    innerMesh.name = "innerOrb";
    objectsGroup.add(innerMesh);

    // Orbiting Language Crystal Nodes
    const runes = [
      { text: "Python", color: 0x38bdf8, pos: [7, 3.5, 1], geo: new THREE.OctahedronGeometry(0.7) },
      { text: "C++", color: 0x818cf8, pos: [-7, 4.0, -1], geo: new THREE.TetrahedronGeometry(0.75) },
      { text: "SQL", color: 0x34d399, pos: [6, -2.5, 3], geo: new THREE.CylinderGeometry(0.6, 0.6, 0.7, 8) },
      { text: "IITM", color: 0xc084fc, pos: [-6, 1.5, 3], geo: new THREE.DodecahedronGeometry(0.65) },
      { text: "11M+", color: 0xf59e0b, pos: [-5, -3.0, 2], geo: new THREE.TorusGeometry(0.5, 0.2, 8, 16) }
    ];

    runes.forEach((r, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: r.color,
        emissive: r.color,
        emissiveIntensity: 0.6,
        wireframe: true,
        transparent: true,
        opacity: 0.75
      });
      const mesh = new THREE.Mesh(r.geo, mat);
      mesh.position.set(...r.pos);
      mesh.userData = { initialY: r.pos[1], speed: 0.015 + i * 0.005, phase: i };
      objectsGroup.add(mesh);
    });
  }

  function buildGitBranchGraph() {
    // 3D Git Commit Network
    const commitGeo = new THREE.SphereGeometry(0.22, 12, 12);
    const commitMatMain = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const commitMatDev = new THREE.MeshBasicMaterial({ color: 0xc084fc });

    const points = [
      [-9, -1.5, -4],
      [-7.5, -0.8, -3],
      [-6, -0.2, -2],
      [-4.5, 0.6, -1],
      [-6, 1.8, -2],
      [-4.5, 2.4, -1]
    ];

    points.forEach((pt, idx) => {
      const isDev = idx >= 4;
      const sphere = new THREE.Mesh(commitGeo, isDev ? commitMatDev : commitMatMain);
      sphere.position.set(...pt);
      gitGraphGroup.add(sphere);
    });

    // Connecting Splines / Lines
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.45 });
    const mainCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-9, -1.5, -4),
      new THREE.Vector3(-7.5, -0.8, -3),
      new THREE.Vector3(-6, -0.2, -2),
      new THREE.Vector3(-4.5, 0.6, -1)
    ]);
    const mainGeo = new THREE.BufferGeometry().setFromPoints(mainCurve.getPoints(30));
    gitGraphGroup.add(new THREE.Line(mainGeo, lineMat));

    const branchCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7.5, -0.8, -3),
      new THREE.Vector3(-6, 1.8, -2),
      new THREE.Vector3(-4.5, 2.4, -1)
    ]);
    const branchMat = new THREE.LineBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.45 });
    const branchGeo = new THREE.BufferGeometry().setFromPoints(branchCurve.getPoints(30));
    gitGraphGroup.add(new THREE.Line(branchGeo, branchMat));
  }

  function buildDatabaseCylinders() {
    const dbGroup = new THREE.Group();
    dbGroup.position.set(8.5, -1, -2);
    dbGroup.rotation.z = -0.15;

    for (let i = 0; i < 3; i++) {
      const geo = new THREE.CylinderGeometry(1.0, 1.0, 0.4, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x08152e,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.25,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const cyl = new THREE.Mesh(geo, mat);
      cyl.position.y = i * 0.6;
      dbGroup.add(cyl);
    }
    objectsGroup.add(dbGroup);
  }

  function buildParticleCloud() {
    const particleCount = 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00f2fe);
    const c2 = new THREE.Color(0x8a2be2);
    const c3 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 45;
      positions[idx + 1] = (Math.random() - 0.5) * 35;
      positions[idx + 2] = (Math.random() - 0.5) * 30;

      const mixedColor = Math.random() > 0.6 ? c2 : (Math.random() > 0.3 ? c1 : c3);
      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particlesGroup.add(particles);
  }

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0006;
    mouseY = (event.clientY - windowHalfY) * 0.0006;
  }

  function onWindowResize() {
    if (!container) return;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate(time) {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Subtle parallax tilt
    objectsGroup.rotation.y = targetX * 1.5;
    objectsGroup.rotation.x = targetY * 1.2;
    particlesGroup.rotation.y += 0.0008;
    gitGraphGroup.rotation.y = targetX * 0.8;

    // Rotate center icosahedron
    const centerOrb = objectsGroup.getObjectByName("centerOrb");
    if (centerOrb) {
      centerOrb.rotation.x += 0.006;
      centerOrb.rotation.y += 0.008;
    }

    const innerOrb = objectsGroup.getObjectByName("innerOrb");
    if (innerOrb) {
      innerOrb.rotation.x -= 0.008;
      innerOrb.rotation.z += 0.006;
    }

    // Float floating runes
    const now = (time || 0) * 0.001;
    objectsGroup.children.forEach(child => {
      if (child.userData && child.userData.initialY !== undefined) {
        child.position.y = child.userData.initialY + Math.sin(now * 2 + child.userData.phase) * 0.35;
        child.rotation.x += 0.01;
        child.rotation.y += 0.015;
      }
    });

    renderer.render(scene, camera);
  }

  // Initialize once DOM is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
