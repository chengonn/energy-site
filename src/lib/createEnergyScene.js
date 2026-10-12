import {
  AmbientLight,
  BufferGeometry,
  DirectionalLight,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

// 管理 WebGL 場景；回傳清理函式，讓 React 卸載時釋放 GPU 資源。
export function createEnergyScene(host, { onReady, onError }) {
  let disposed = false;
  let renderer;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    onError();
    return () => {};
  }
  const scene = new Scene(),
    camera = new PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  renderer.setPixelRatio(
    Math.min(devicePixelRatio, host.clientWidth < 600 ? 1.25 : 1.75),
  );
  host.appendChild(renderer.domElement);
  onReady();
  // 核心、軌道與粒子。
  const group = new Group();
  scene.add(group);
  const core = new Mesh(
    new IcosahedronGeometry(1.04, 1),
    new MeshStandardMaterial({
      color: 0xc6f56b,
      metalness: 0.55,
      roughness: 0.32,
      flatShading: true,
    }),
  );
  group.add(core);
  const wire = new Mesh(
    new IcosahedronGeometry(1.12, 1),
    new MeshBasicMaterial({
      color: 0xe4ffb3,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    }),
  );
  group.add(wire);
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new Mesh(
      new TorusGeometry(1.85 + i * 0.2, 0.012, 8, 100),
      new MeshBasicMaterial({ color: i === 1 ? 0xc6f56b : 0x55826a }),
    );
    ring.rotation.set(i * 0.65 + 0.2, i * 0.8, 0.35);
    group.add(ring);
    rings.push(ring);
    const dot = new Mesh(
      new SphereGeometry(0.06, 12, 12),
      new MeshBasicMaterial({ color: 0xd8ff90 }),
    );
    dot.position.x = 1.85 + i * 0.2;
    ring.add(dot);
  }
  const particlePositions = [];
  for (let i = 0; i < (host.clientWidth < 600 ? 55 : 120); i++)
    particlePositions.push(
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 3,
    );
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3));
  group.add(
    new Points(
      geometry,
      new PointsMaterial({
        color: 0x96bb79,
        size: 0.025,
        transparent: true,
        opacity: 0.65,
      }),
    ),
  );
  // 光源與滑鼠視角。
  scene.add(new AmbientLight(0xffffff, 2));
  const light = new DirectionalLight(0xffffff, 4);
  light.position.set(2, 3, 5);
  scene.add(light);
  const green = new PointLight(0x92ff65, 30);
  green.position.set(-2, -1, 3);
  scene.add(green);
  const pointer = { x: 0, y: 0 };
  let scrollProgress = 0;
  const handleScroll = () => {
    const hero = host.closest('.hero');
    if (!hero) return;
    scrollProgress = Math.max(
      0,
      Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight),
    );
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  const handlePointerMove = (e) => {
    const rect = host.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
    pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.25;
  };
  host.addEventListener('pointermove', handlePointerMove);
  const resizeRenderer = () => {
    if (!host.clientWidth) return;
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  };
  // 只在場景可見時持續渲染。
  const resizeObserver = new ResizeObserver(resizeRenderer);
  resizeObserver.observe(host);
  resizeRenderer();
  let frame = 0,
    visible = true,
    lastTime = performance.now();
  function renderFrame() {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const now = performance.now(),
      deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    core.rotation.y += deltaSeconds * 0.15;
    wire.rotation.y = core.rotation.y;
    group.rotation.y += (pointer.x - group.rotation.y) * 0.035;
    group.rotation.x += (pointer.y - group.rotation.x) * 0.035;
    camera.position.z += (8 - scrollProgress * 1.5 - camera.position.z) * 0.04;
    group.rotation.z += (scrollProgress * 0.35 - group.rotation.z) * 0.04;
    rings.forEach((ring, index) => {
      ring.rotation.z += deltaSeconds * 0.1 * (index + 1);
    });
    renderer.render(scene, camera);
    frame = requestAnimationFrame(renderFrame);
  }
  const resumeAnimation = () => {
    if (visible && !document.hidden && !frame) {
      lastTime = performance.now();
      renderFrame();
    }
  };
  const visibilityObserver = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (!visible) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else resumeAnimation();
  });
  visibilityObserver.observe(host);
  document.addEventListener('visibilitychange', resumeAnimation);
  const handleContextLoss = (e) => {
    e.preventDefault();
    onError();
  };
  renderer.domElement.addEventListener('webglcontextlost', handleContextLoss);
  renderFrame();
  // 卸載時移除監聽器，並釋放幾何與材質。
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    host.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('visibilitychange', resumeAnimation);
    scene.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
    renderer.domElement.removeEventListener('webglcontextlost', handleContextLoss);
    renderer.dispose();
    renderer.domElement.remove();
  };
}
