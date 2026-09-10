/**
 * Three.js Picnic Study Virtual Studio & 3D Audio Visualizer
 * Piyush Kumar Portfolio
 */

(function () {
  const container = document.getElementById("studio-3d-canvas");
  if (!container || typeof THREE === "undefined") return;

  let scene, camera, renderer, animationFrameId;
  let micGroup, visualizerBars = [], floatingCards = [];
  let isVisible = true;
  let time = 0;

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050713, 0.02);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 18);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.0);
    scene.add(ambientLight);

    const redStudioLight = new THREE.PointLight(0xef4444, 3.5, 30);
    redStudioLight.position.set(-6, 6, 8);
    scene.add(redStudioLight);

    const cyanRim = new THREE.PointLight(0x00f2fe, 4.0, 35);
    cyanRim.position.set(8, -2, 10);
    scene.add(cyanRim);

    buildPodcastMicrophone();
    buildCircularAudioVisualizer();
    buildOrbitingInterviewCards();

    window.addEventListener("resize", () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { isVisible = entry.isIntersecting; });
    }, { threshold: 0.05 });
    observer.observe(container);

    animate();
  }

  function buildPodcastMicrophone() {
    micGroup = new THREE.Group();
    micGroup.position.set(0, 0, 0);

    // Mic Body Capsule
    const bodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 2.8, 24);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0;
    micGroup.add(body);

    // Mic Top Dome / Grill
    const grillGeo = new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const grillMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.3
    });
    const grill = new THREE.Mesh(grillGeo, grillMat);
    grill.position.y = 1.4;
    micGroup.add(grill);

    // Metallic Shock Mount Ring
    const mountGeo = new THREE.TorusGeometry(1.6, 0.08, 12, 32);
    const mountMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      metalness: 0.8,
      roughness: 0.3,
      emissive: 0xef4444,
      emissiveIntensity: 0.4
    });
    const mount = new THREE.Mesh(mountGeo, mountMat);
    mount.rotation.x = Math.PI / 2;
    micGroup.add(mount);

    // Mic Stand Base
    const standGeo = new THREE.CylinderGeometry(0.2, 0.2, 3.5, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = -2.8;
    micGroup.add(stand);

    const basePlateGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.25, 24);
    const basePlate = new THREE.Mesh(basePlateGeo, standMat);
    basePlate.position.y = -4.5;
    micGroup.add(basePlate);

    // ON AIR Indicator Plate
    const signGeo = new THREE.BoxGeometry(1.8, 0.6, 0.2);
    const signMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, 3.2, 0);
    micGroup.add(sign);

    scene.add(micGroup);
  }

  function buildCircularAudioVisualizer() {
    const barCount = 36;
    const radius = 5.2;

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const geo = new THREE.BoxGeometry(0.18, 1, 0.18);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00f2fe : 0xef4444,
        transparent: true,
        opacity: 0.85
      });
      const bar = new THREE.Mesh(geo, mat);

      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      bar.position.set(x, -0.5, z);
      bar.rotation.y = -angle;

      scene.add(bar);
      visualizerBars.push({ mesh: bar, baseAngle: angle, seed: i });
    }
  }

  function buildOrbitingInterviewCards() {
    const topics = [
      { text: "UPSC AIR Rankers", color: 0x38bdf8 },
      { text: "CAPF Officers", color: 0x10b981 },
      { text: "CA / CS Toppers", color: 0xf59e0b },
      { text: "NEET Rankers", color: 0xc084fc }
    ];

    topics.forEach((topic, idx) => {
      const cardGroup = new THREE.Group();
      const cardGeo = new THREE.PlaneGeometry(2.4, 1.4);
      const cardMat = new THREE.MeshBasicMaterial({
        color: 0x090d20,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const card = new THREE.Mesh(cardGeo, cardMat);
      cardGroup.add(card);

      // Border frame
      const wireGeo = new THREE.EdgesGeometry(cardGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: topic.color });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      cardGroup.add(wire);

      const angle = (idx / topics.length) * Math.PI * 2;
      const distance = 8.5;
      cardGroup.position.set(Math.cos(angle) * distance, (idx % 2 === 0 ? 1.5 : -1.0), Math.sin(angle) * distance);
      cardGroup.userData = { angle: angle, distance: distance, speed: 0.008 };

      scene.add(cardGroup);
      floatingCards.push(cardGroup);
    });
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);
    if (!isVisible) return;

    time += 0.035;

    // Mic gentle floating sway
    if (micGroup) {
      micGroup.position.y = Math.sin(time * 0.8) * 0.25;
      micGroup.rotation.y = Math.sin(time * 0.5) * 0.15;
    }

    // Animate audio spectrum frequency bars
    visualizerBars.forEach((barObj, idx) => {
      const freq = Math.sin(time * 3 + barObj.seed * 0.7) * Math.cos(time * 2 + barObj.seed * 0.3);
      const height = Math.max(0.3, Math.abs(freq) * 3.5 + 0.4);
      barObj.mesh.scale.y = height;
      barObj.mesh.position.y = height / 2 - 2.5;
    });

    // Orbit floating interview tags
    floatingCards.forEach((card) => {
      card.userData.angle += card.userData.speed;
      card.position.x = Math.cos(card.userData.angle) * card.userData.distance;
      card.position.z = Math.sin(card.userData.angle) * card.userData.distance;
      card.lookAt(camera.position);
    });

    renderer.render(scene, camera);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
