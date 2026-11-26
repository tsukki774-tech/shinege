import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// ==========================================
// DOM要素
// ==========================================
const overlay = document.getElementById("overlay");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const startBtn = document.getElementById("start-btn");
const layoutBtn = document.getElementById("layout-btn");
const modeToggleBtn = document.getElementById("mode-toggle-btn");
const loadoutBtns = document.querySelectorAll(".loadout-btn");
const sensSlider = document.getElementById("sens-slider");
const sensValue = document.getElementById("sens-value");
const sensResetBtn = document.getElementById("sens-reset-btn");

const timeDisplay = document.getElementById("time-display");
const bestDisplay = document.getElementById("best-display");
const speedDisplay = document.getElementById("speed-display");
const distDisplay = document.getElementById("dist-display");
const nearmissDisplay = document.getElementById("nearmiss-display");
const stateBadge = document.getElementById("state-badge");
const trickFeed = document.getElementById("trick-feed");
const crosshair = document.getElementById("crosshair");
const zipPrompt = document.getElementById("zip-prompt");
const hudRetryBtn = document.getElementById("hud-retry-btn");
const hudPauseBtn = document.getElementById("hud-pause-btn");

const pcDashChip = document.getElementById("pc-dash-chip");
const pcDashCd = document.getElementById("pc-dash-cd");
const pcGrappleChip = document.getElementById("pc-grapple-chip");
const pcGrappleCd = document.getElementById("pc-grapple-cd");
const pcZipChip = document.getElementById("pc-zip-chip");

const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

const touchLayer = document.getElementById("touch-layer");
const lookZone = document.getElementById("look-zone");
const joystickZone = document.getElementById("joystick-zone");
const joystickBase = document.getElementById("joystick-base");
const joystickKnob = document.getElementById("joystick-knob");
const btnJump = document.getElementById("btn-jump");
const btnSlide = document.getElementById("btn-slide");
const btnDash = document.getElementById("btn-dash");
const btnDashCd = document.getElementById("btn-dash-cd");
const btnGrapple = document.getElementById("btn-grapple");
const btnGrappleCd = document.getElementById("btn-grapple-cd");
const btnZip = document.getElementById("btn-zip");

const layoutEditorBar = document.getElementById("layout-editor-bar");
const layoutResetBtn = document.getElementById("layout-reset-btn");
const layoutSaveBtn = document.getElementById("layout-save-btn");

// ==========================================
// キャラコン調整パラメータ
// ==========================================
const CONFIG = {
  gravity: 28,
  baseSpeed: 10.8,
  maxSpeed: 28.0,
  groundAccel: 78,
  airAccel: 24,
  groundFriction: 9.0,
  slideFriction: 1.5,
  jumpForce: 11.4,
  slideBoost: 17.0,
  slideDuration: 0.72,
  slideCooldown: 0.42,
  wallRunGravity: 4.2,
  wallRunSpeed: 14.2,
  wallJumpUp: 11.8,
  wallJumpPush: 13.5,
  jumpPadForce: 22.0,
  boostPadSpeed: 24.0,
  dashSpeed: 24.5,
  dashDuration: 0.22,
  dashCooldown: 2.6,
  grappleRange: 50,
  grapplePullSpeed: 29.0,
  grappleMaxTime: 1.25,
  grappleCooldown: 3.5,
  ziplineSpeed: 26.0,
  ziplineGrabDist: 3.8,
  playerRadius: 0.55,
  standHeight: 1.8,
  slideHeight: 0.95,
  mouseSensitivity: 0.0022,
  touchLookSensitivity: 0.0055,
};


// ==========================================
// カメラ感度設定（PC・スマホ共通倍率＆保存）
// ==========================================
const SENS_STORAGE_KEY = "parkour_tag_sensitivity";
let cameraSensitivity = 1.0;

try {
  const savedSens = parseFloat(localStorage.getItem(SENS_STORAGE_KEY));
  if (!Number.isNaN(savedSens)) {
    cameraSensitivity = Math.max(0.2, Math.min(3.0, savedSens));
  }
} catch {
  // ignore
}

function applySensitivityUI() {
  if (sensSlider) sensSlider.value = cameraSensitivity.toFixed(1);
  if (sensValue) sensValue.textContent = `${cameraSensitivity.toFixed(1)}x`;
}

function setCameraSensitivity(val) {
  cameraSensitivity = Math.max(0.2, Math.min(3.0, Math.round(val * 10) / 10));
  applySensitivityUI();
  try {
    localStorage.setItem(SENS_STORAGE_KEY, cameraSensitivity.toFixed(1));
  } catch {
    // ignore
  }
}

applySensitivityUI();

if (sensSlider) {
  sensSlider.addEventListener("input", (e) => {
    setCameraSensitivity(parseFloat(e.target.value));
  });
}

if (sensResetBtn) {
  sensResetBtn.addEventListener("click", () => {
    setCameraSensitivity(1.0);
  });
}

// ==========================================
// キャラコン装備（ギミック選択）
// ==========================================
const LOADOUTS = {
  all: { dash: true, grapple: true, zipline: true },
  dash: { dash: true, grapple: false, zipline: true },
  grapple: { dash: false, grapple: true, zipline: true },
  classic: { dash: false, grapple: false, zipline: false },
};

let currentLoadoutKey = localStorage.getItem("parkour_tag_loadout") || "all";
if (!LOADOUTS[currentLoadoutKey]) currentLoadoutKey = "all";

function getLoadout() {
  return LOADOUTS[currentLoadoutKey];
}

function applyLoadoutUI() {
  const lo = getLoadout();
  loadoutBtns.forEach((b) => {
    b.classList.toggle("active", b.dataset.loadout === currentLoadoutKey);
  });

  btnDash.classList.toggle("hidden", !lo.dash);
  btnGrapple.classList.toggle("hidden", !lo.grapple);
  btnZip.classList.toggle("hidden", !lo.zipline);

  pcDashChip.classList.toggle("hidden", !lo.dash);
  pcGrappleChip.classList.toggle("hidden", !lo.grapple);
  pcZipChip.classList.toggle("hidden", !lo.zipline);
}

loadoutBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLoadoutKey = btn.dataset.loadout;
    try {
      localStorage.setItem("parkour_tag_loadout", currentLoadoutKey);
    } catch {
      // ignore
    }
    applyLoadoutUI();
  });
});

// ==========================================
// タッチモード判定＆切替
// ==========================================
const isCoarsePointer =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

let controlMode = isCoarsePointer ? "touch" : "pc";
let isEditingLayout = false;

function applyControlMode() {
  if (controlMode === "touch") {
    document.body.classList.add("touch-mode");
    touchLayer.classList.remove("hidden");
    modeToggleBtn.textContent = "操作モード: スマホ・iPad（タッチ）";
  } else {
    document.body.classList.remove("touch-mode");
    touchLayer.classList.add("hidden");
    modeToggleBtn.textContent = "操作モード: PC（マウス＋キーボード）";
  }
}
applyControlMode();
applyLoadoutUI();

modeToggleBtn.addEventListener("click", () => {
  controlMode = controlMode === "touch" ? "pc" : "touch";
  applyControlMode();
});

// ==========================================
// ボタン配置カスタマイズ（全ボタン対応・保存）
// ==========================================
const LAYOUT_STORAGE_KEY = "parkour_tag_layout_v2";
const DEFAULT_LAYOUT = {
  jump: { xPct: 0.90, yPct: 0.82 },
  slide: { xPct: 0.78, yPct: 0.85 },
  dash: { xPct: 0.90, yPct: 0.63 },
  grapple: { xPct: 0.78, yPct: 0.66 },
  zip: { xPct: 0.67, yPct: 0.78 },
  stick: { xPct: 0.14, yPct: 0.80 },
};

function cloneDefaultLayout() {
  const out = {};
  for (const k of Object.keys(DEFAULT_LAYOUT)) {
    out[k] = { ...DEFAULT_LAYOUT[k] };
  }
  return out;
}

function loadLayout() {
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return cloneDefaultLayout();
    const parsed = JSON.parse(raw);
    const merged = cloneDefaultLayout();
    for (const k of Object.keys(DEFAULT_LAYOUT)) {
      if (parsed[k] && typeof parsed[k].xPct === "number" && typeof parsed[k].yPct === "number") {
        merged[k] = { xPct: parsed[k].xPct, yPct: parsed[k].yPct };
      }
    }
    return merged;
  } catch {
    return cloneDefaultLayout();
  }
}

let buttonLayout = loadLayout();

function saveLayout() {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(buttonLayout));
  } catch {
    // ignore
  }
}

function positionElementByPct(el, xPct, yPct, maxRightRatio = 1.0) {
  const w = el.offsetWidth || 72;
  const h = el.offsetHeight || 72;
  const minX = 8;
  const maxX = Math.max(minX, window.innerWidth * maxRightRatio - w - 8);
  const minY = 8;
  const maxY = Math.max(minY, window.innerHeight - h - 8);

  const left = Math.max(minX, Math.min(maxX, xPct * window.innerWidth - w / 2));
  const top = Math.max(minY, Math.min(maxY, yPct * window.innerHeight - h / 2));

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
}

function applyStickHomePosition() {
  positionElementByPct(joystickBase, buttonLayout.stick.xPct, buttonLayout.stick.yPct, 0.5);
}

function applyAllButtonPositions() {
  positionElementByPct(btnJump, buttonLayout.jump.xPct, buttonLayout.jump.yPct, 1.0);
  positionElementByPct(btnSlide, buttonLayout.slide.xPct, buttonLayout.slide.yPct, 1.0);
  positionElementByPct(btnDash, buttonLayout.dash.xPct, buttonLayout.dash.yPct, 1.0);
  positionElementByPct(btnGrapple, buttonLayout.grapple.xPct, buttonLayout.grapple.yPct, 1.0);
  positionElementByPct(btnZip, buttonLayout.zip.xPct, buttonLayout.zip.yPct, 1.0);
  applyStickHomePosition();
}

requestAnimationFrame(applyAllButtonPositions);

function attachDraggable(el, key, maxRightRatio = 1.0) {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  el.addEventListener("pointerdown", (e) => {
    if (!isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    dragging = true;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - (rect.left + rect.width / 2);
    offsetY = e.clientY - (rect.top + rect.height / 2);
    el.setPointerCapture(e.pointerId);
  });

  el.addEventListener("pointermove", (e) => {
    if (!dragging || !isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    const w = el.offsetWidth || 72;
    const h = el.offsetHeight || 72;
    const cx = e.clientX - offsetX;
    const cy = e.clientY - offsetY;

    const minCenterX = w / 2 + 8;
    const maxCenterX = Math.max(minCenterX, window.innerWidth * maxRightRatio - w / 2 - 8);
    const minCenterY = h / 2 + 8;
    const maxCenterY = Math.max(minCenterY, window.innerHeight - h / 2 - 8);

    const clampedX = Math.max(minCenterX, Math.min(maxCenterX, cx));
    const clampedY = Math.max(minCenterY, Math.min(maxCenterY, cy));

    buttonLayout[key].xPct = clampedX / window.innerWidth;
    buttonLayout[key].yPct = clampedY / window.innerHeight;
    positionElementByPct(el, buttonLayout[key].xPct, buttonLayout[key].yPct, maxRightRatio);
  });

  function stopDrag(e) {
    if (!dragging) return;
    dragging = false;
    if (el.hasPointerCapture && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  }
  el.addEventListener("pointerup", stopDrag);
  el.addEventListener("pointercancel", stopDrag);
}

attachDraggable(btnJump, "jump", 1.0);
attachDraggable(btnSlide, "slide", 1.0);
attachDraggable(btnDash, "dash", 1.0);
attachDraggable(btnGrapple, "grapple", 1.0);
attachDraggable(btnZip, "zip", 1.0);
attachDraggable(joystickBase, "stick", 0.5);

function enterLayoutEditor() {
  isEditingLayout = true;
  document.body.classList.add("layout-editing");
  overlay.classList.add("hidden");
  layoutEditorBar.classList.remove("hidden");
  // 編集時は全ボタンを表示して配置できるようにする
  btnDash.classList.remove("hidden");
  btnGrapple.classList.remove("hidden");
  btnZip.classList.remove("hidden");
  requestAnimationFrame(applyAllButtonPositions);
}

function exitLayoutEditor() {
  isEditingLayout = false;
  saveLayout();
  document.body.classList.remove("layout-editing");
  layoutEditorBar.classList.add("hidden");
  applyControlMode();
  applyLoadoutUI();
  overlay.classList.remove("hidden");
}

layoutBtn.addEventListener("click", enterLayoutEditor);
layoutSaveBtn.addEventListener("click", exitLayoutEditor);
layoutResetBtn.addEventListener("click", () => {
  buttonLayout = cloneDefaultLayout();
  applyAllButtonPositions();
});

// ==========================================
// 効果音（Web Audio API）
// ==========================================
let audioCtx = null;
function ensureAudio() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playSfx(type) {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  const t = audioCtx.currentTime;

  if (type === "jump") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(480, t + 0.1);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.start(t);
    osc.stop(t + 0.11);
  } else if (type === "walljump") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(760, t + 0.14);
    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  } else if (type === "slide") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.16);
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
    osc.start(t);
    osc.stop(t + 0.17);
  } else if (type === "pad") {
    osc.type = "square";
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(920, t + 0.22);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
    osc.start(t);
    osc.stop(t + 0.24);
  } else if (type === "boost") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(1100, t + 0.18);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.19);
    osc.start(t);
    osc.stop(t + 0.19);
  } else if (type === "dash") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.16);
    gain.gain.setValueAtTime(0.11, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.17);
    osc.start(t);
    osc.stop(t + 0.17);
  } else if (type === "grapple") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(900, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.14);
    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  } else if (type === "zip") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(480, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
    osc.start(t);
    osc.stop(t + 0.13);
  } else if (type === "caught") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.linearRampToValueAtTime(65, t + 0.35);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
    osc.start(t);
    osc.stop(t + 0.36);
  }
}

let trickTimer = 0;
function showTrick(text) {
  trickFeed.textContent = text;
  trickFeed.classList.add("show");
  trickTimer = 1.15;
}

// ==========================================
// Three.js シーン構築
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);
scene.fog = new THREE.Fog(0x0b1220, 48, 175);

const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 260);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = !isCoarsePointer;
document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.98);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
dirLight.position.set(42, 68, 35);
if (!isCoarsePointer) {
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.left = -80;
  dirLight.shadow.camera.right = 80;
  dirLight.shadow.camera.top = 80;
  dirLight.shadow.camera.bottom = -80;
}
scene.add(dirLight);

// グラップルワイヤー描画用ライン
const wireGeo = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(),
  new THREE.Vector3(),
]);
const wireMat = new THREE.LineBasicMaterial({ color: 0x22d3ee });
const wireLine = new THREE.Line(wireGeo, wireMat);
wireLine.visible = false;
wireLine.frustumCulled = false;
scene.add(wireLine);

const raycaster = new THREE.Raycaster();

// ==========================================
// 広大マップ構築（140 x 140）
// ==========================================
const ARENA_HALF = 70;
const colliders = [];
const grappleMeshes = [];
const jumpPads = [];
const boostPads = [];
const ziplines = [];

function addBox(x, y, z, w, h, d, color, options = {}) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.65,
    metalness: options.metalness ?? 0.15,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = !options.noCast;
  scene.add(mesh);

  if (!options.isFloor) {
    grappleMeshes.push(mesh);
  }

  colliders.push({
    minX: x - w / 2,
    maxX: x + w / 2,
    minY: y - h / 2,
    maxY: y + h / 2,
    minZ: z - d / 2,
    maxZ: z + d / 2,
    w,
    d,
    color,
    isFloor: Boolean(options.isFloor),
    isOuterWall: Boolean(options.isOuterWall),
    isWallRun: Boolean(options.wallRun),
  });
  return mesh;
}

function addJumpPad(x, y, z, force = CONFIG.jumpPadForce) {
  const geo = new THREE.CylinderGeometry(1.8, 2.0, 0.28, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x15803d,
    emissiveIntensity: 0.75,
  });
  const pad = new THREE.Mesh(geo, mat);
  pad.position.set(x, y + 0.14, z);
  scene.add(pad);
  jumpPads.push({ x, y: y + 0.14, z, radius: 1.95, force });
}

function addBoostPad(x, y, z, w, d) {
  const geo = new THREE.BoxGeometry(w, 0.18, d);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.85,
  });
  const pad = new THREE.Mesh(geo, mat);
  pad.position.set(x, y + 0.09, z);
  scene.add(pad);
  boostPads.push({
    minX: x - w / 2,
    maxX: x + w / 2,
    minZ: z - d / 2,
    maxZ: z + d / 2,
    y: y + 0.09,
    x,
    z,
    w,
    d,
  });
}

function addZipline(ax, ay, az, bx, by, bz) {
  const start = new THREE.Vector3(ax, ay, az);
  const end = new THREE.Vector3(bx, by, bz);
  const diff = new THREE.Vector3().subVectors(end, start);
  const len = diff.length();

  // 光る黄色ケーブル
  const cableGeo = new THREE.CylinderGeometry(0.09, 0.09, len, 8);
  const cableMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xca8a04,
    emissiveIntensity: 0.85,
  });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  cable.position.copy(start).add(end).multiplyScalar(0.5);
  cable.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.clone().normalize());
  scene.add(cable);

  // 両端のアンカーリング
  const postMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xa16207,
    emissiveIntensity: 0.5,
  });
  const anchorGeo = new THREE.SphereGeometry(0.42, 12, 12);
  const aMesh = new THREE.Mesh(anchorGeo, postMat);
  aMesh.position.copy(start);
  const bMesh = new THREE.Mesh(anchorGeo, postMat);
  bMesh.position.copy(end);
  scene.add(aMesh, bMesh);

  ziplines.push({ start, end, length: len });
}

function buildArena() {
  // 広大な床（140 x 140）
  addBox(0, -0.5, 0, 140, 1, 140, 0x1e293b, { noCast: true, roughness: 0.85, isFloor: true });
  const grid = new THREE.GridHelper(140, 70, 0x38bdf8, 0x334155);
  grid.position.y = 0.02;
  scene.add(grid);

  // 外周の壁
  addBox(0, 9, -70, 140, 18, 1.5, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(0, 9, 70, 140, 18, 1.5, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(-70, 9, 0, 1.5, 18, 140, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(70, 9, 0, 1.5, 18, 140, 0x334155, { wallRun: true, isOuterWall: true });

  // ======================================
  // 中央メガタワー（3段構造）
  // ======================================
  addBox(0, 2.5, 0, 12, 5, 12, 0x475569, { wallRun: true });
  addBox(0, 6.8, 0, 8, 3.6, 8, 0x64748b, { wallRun: true });
  addBox(0, 10.6, 0, 5, 4.0, 5, 0x94a3b8, { wallRun: true });
  addJumpPad(0, 12.6, 0, 20.0); // 頂上ジャンプパッド

  // 中央周辺の階段状ステップ
  const centerSteps = [
    [-13, 1.3, 0, 6, 2.6, 6, 0x0284c7],
    [13, 1.3, 0, 6, 2.6, 6, 0x0284c7],
    [0, 1.3, -13, 6, 2.6, 6, 0x0284c7],
    [0, 1.3, 13, 6, 2.6, 6, 0x0284c7],
  ];

  // ======================================
  // 4隅のスカイタワー（ジップライン拠点）
  // ======================================
  const cornerTowers = [
    [-46, 5.0, -46, 12, 10, 12, 0x2563eb],
    [46, 5.0, 46, 12, 10, 12, 0x2563eb],
    [46, 5.0, -46, 12, 10, 12, 0x2563eb],
    [-46, 5.0, 46, 12, 10, 12, 0x2563eb],
    // 各タワーの2段目ステップ
    [-36, 2.5, -46, 6, 5, 8, 0x3b82f6],
    [36, 2.5, 46, 6, 5, 8, 0x3b82f6],
    [46, 2.5, -36, 8, 5, 6, 0x3b82f6],
    [-46, 2.5, 36, 8, 5, 6, 0x3b82f6],
  ];

  // ======================================
  // ウォールラン用の紫の大型パネル（連続コース）
  // ======================================
  const wallRunPanels = [
    [-22, 5.0, -18, 1.4, 10, 24, 0x7e22ce],
    [22, 5.0, 18, 1.4, 10, 24, 0x7e22ce],
    [18, 5.0, -22, 24, 10, 1.4, 0x7e22ce],
    [-18, 5.0, 22, 24, 10, 1.4, 0x7e22ce],

    // 外周側のロングウォールラン壁
    [-54, 6.0, 0, 1.4, 12, 34, 0x9333ea],
    [54, 6.0, 0, 1.4, 12, 34, 0x9333ea],
    [0, 6.0, -54, 34, 12, 1.4, 0x9333ea],
    [0, 6.0, 54, 34, 12, 1.4, 0x9333ea],
  ];

  // ======================================
  // 空中ブリッジ・高台・グラップル用ピラー
  // ======================================
  const platforms = [
    // 空中ブリッジ（4方向）
    [-34, 6.2, 0, 6, 0.9, 22, 0x0ea5e9],
    [34, 6.2, 0, 6, 0.9, 22, 0x0ea5e9],
    [0, 6.2, -34, 22, 0.9, 6, 0x0ea5e9],
    [0, 6.2, 34, 22, 0.9, 6, 0x0ea5e9],

    // 浮島足場（ワイヤーや大ジャンプで届く）
    [-24, 9.5, -24, 6, 1.0, 6, 0x38bdf8],
    [24, 9.5, 24, 6, 1.0, 6, 0x38bdf8],
    [24, 9.5, -24, 6, 1.0, 6, 0x38bdf8],
    [-24, 9.5, 24, 6, 1.0, 6, 0x38bdf8],

    // グラップル引っ掛け用の高いピラー（柱）
    [-38, 9.0, -16, 2.6, 18, 2.6, 0x6366f1],
    [38, 9.0, 16, 2.6, 18, 2.6, 0x6366f1],
    [16, 9.0, -38, 2.6, 18, 2.6, 0x6366f1],
    [-16, 9.0, 38, 2.6, 18, 2.6, 0x6366f1],

    // スライディングでくぐれるオレンジゲート（各地に配置）
    [-10, 3.0, -34, 1.8, 3.4, 8, 0xf59e0b],
    [10, 3.0, 34, 1.8, 3.4, 8, 0xf59e0b],
    [-34, 3.0, 10, 8, 3.4, 1.8, 0xf59e0b],
    [34, 3.0, -10, 8, 3.4, 1.8, 0xf59e0b],
    [-46, 3.0, 0, 1.8, 3.4, 9, 0xf59e0b],
    [46, 3.0, 0, 1.8, 3.4, 9, 0xf59e0b],
  ];

  for (const list of [centerSteps, cornerTowers, wallRunPanels, platforms]) {
    for (const [x, y, z, w, h, d, color] of list) {
      addBox(x, y, z, w, h, d, color, { wallRun: true });
    }
  }

  // ======================================
  // ジャンプパッド（緑）
  // ======================================
  addJumpPad(-11, 0, -11);
  addJumpPad(11, 0, 11);
  addJumpPad(11, 0, -11);
  addJumpPad(-11, 0, 11);

  addJumpPad(-40, 0, 0);
  addJumpPad(40, 0, 0);
  addJumpPad(0, 0, -40);
  addJumpPad(0, 0, 40);

  addJumpPad(-34, 0, -34, 24.5);
  addJumpPad(34, 0, 34, 24.5);
  addJumpPad(34, 0, -34, 24.5);
  addJumpPad(-34, 0, 34, 24.5);

  // ======================================
  // スピードブースト床（シアン）
  // ======================================
  addBoostPad(0, 0, 24, 5, 3.5);
  addBoostPad(0, 0, -24, 5, 3.5);
  addBoostPad(24, 0, 0, 3.5, 5);
  addBoostPad(-24, 0, 0, 3.5, 5);
  addBoostPad(-58, 0, -20, 4, 6);
  addBoostPad(58, 0, 20, 4, 6);

  // ======================================
  // ジップライン（6本：高台同士＆中央を結ぶ）
  // ======================================
  // 4隅のタワー外周をつなぐロングジップライン
  addZipline(-42, 11.4, -42, 42, 11.4, -42);
  addZipline(42, 11.4, -42, 42, 11.4, 42);
  addZipline(42, 11.4, 42, -42, 11.4, 42);
  addZipline(-42, 11.4, 42, -42, 11.4, -42);

  // 対角線で中央メガタワー頂上とつながるジップライン
  addZipline(-42, 11.4, -42, 0, 14.0, 0);
  addZipline(42, 11.4, 42, 0, 14.0, 0);
}

buildArena();

// ==========================================
// 鬼（AIボット）の作成
// ==========================================
const oniGroup = new THREE.Group();
const oniBody = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.65, 1.15, 8, 16),
  new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0x991b1b,
    emissiveIntensity: 0.65,
  })
);
oniBody.position.y = 1.2;
oniBody.castShadow = true;
oniGroup.add(oniBody);

const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), eyeMat);
leftEye.position.set(-0.23, 1.6, 0.56);
const rightEye = leftEye.clone();
rightEye.position.x = 0.23;
oniGroup.add(leftEye, rightEye);

scene.add(oniGroup);

const oni = {
  pos: new THREE.Vector3(0, 1, -50),
  vel: new THREE.Vector3(),
  onGround: false,
  baseSpeed: 10.0,
  jumpCooldown: 0,
};

// ==========================================
// プレイヤー状態＆入力
// ==========================================
const player = {
  pos: new THREE.Vector3(0, 2, 50),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  onGround: false,
  currentHeight: CONFIG.standHeight,
  isSliding: false,
  slideTimer: 0,
  slideCooldown: 0,
  isWallRunning: false,
  wallNormal: new THREE.Vector3(),
  wallTilt: 0,
  jumpBuffer: 0,
  coyoteTimer: 0,

  // 空中ダッシュ
  dashTimer: 0,
  dashCooldown: 0,
  dashDir: new THREE.Vector3(),

  // グラップルワイヤー
  isGrappling: false,
  grapplePoint: new THREE.Vector3(),
  grappleTimer: 0,
  grappleCooldown: 0,
  canGrappleNow: false,

  // ジップライン
  isZiplining: false,
  zipIndex: -1,
  zipT: 0,
  zipDir: 1,
  zipCooldown: 0,
  nearbyZip: null,

  // ブースト床クールタイム
  boostPadCooldown: 0,
};

const game = {
  active: false,
  over: false,
  elapsed: 0,
  best: Number(localStorage.getItem("parkour_tag_best") || 0),
  nearMissCount: 0,
  nearMissCooldown: 0,
};
bestDisplay.textContent = game.best.toFixed(1);

// ==========================================
// ギミック発動関数（PC・スマホ共通）
// ==========================================
function getLookDirection() {
  const dir = new THREE.Vector3(0, 0, -1);
  const euler = new THREE.Euler(player.pitch, player.yaw, 0, "YXZ");
  dir.applyEuler(euler).normalize();
  return dir;
}

function triggerDash() {
  if (!game.active || !getLoadout().dash) return;
  if (player.dashCooldown > 0 || player.isZiplining) return;

  player.isGrappling = false;
  wireLine.visible = false;
  player.isSliding = false;

  const look = getLookDirection();
  const dashDir = new THREE.Vector3(look.x, Math.max(0.08, look.y * 0.45), look.z).normalize();
  player.dashDir.copy(dashDir);
  player.dashTimer = CONFIG.dashDuration;
  player.dashCooldown = CONFIG.dashCooldown;

  player.vel.copy(dashDir).multiplyScalar(CONFIG.dashSpeed);
  playSfx("dash");
  showTrick("AIR DASH!");
}

function findGrappleHit() {
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  raycaster.far = CONFIG.grappleRange;
  const hits = raycaster.intersectObjects(grappleMeshes, false);
  if (hits.length > 0 && hits[0].distance >= 3.0) {
    return hits[0].point;
  }
  return null;
}

function triggerGrapple() {
  if (!game.active || !getLoadout().grapple) return;
  if (player.isGrappling) {
    // もう一度押すと解除
    player.isGrappling = false;
    wireLine.visible = false;
    return;
  }
  if (player.grappleCooldown > 0) return;

  const hitPoint = findGrappleHit();
  if (!hitPoint) {
    showTrick("ワイヤーが届かない！");
    return;
  }

  player.isZiplining = false;
  player.isSliding = false;
  player.isGrappling = true;
  player.grapplePoint.copy(hitPoint);
  player.grappleTimer = CONFIG.grappleMaxTime;
  player.grappleCooldown = CONFIG.grappleCooldown;
  player.onGround = false;

  playSfx("grapple");
  showTrick("WIRE GRAPPLE!");
}

function findNearbyZipline() {
  if (!getLoadout().zipline || player.zipCooldown > 0) return null;
  const eyePos = new THREE.Vector3(player.pos.x, player.pos.y + 1.4, player.pos.z);
  let best = null;
  let bestDist = CONFIG.ziplineGrabDist;

  for (let i = 0; i < ziplines.length; i++) {
    const z = ziplines[i];
    const ab = new THREE.Vector3().subVectors(z.end, z.start);
    const ap = new THREE.Vector3().subVectors(eyePos, z.start);
    const t = Math.max(0, Math.min(1, ap.dot(ab) / ab.lengthSq()));
    const closest = z.start.clone().addScaledVector(ab, t);
    const d = eyePos.distanceTo(closest);
    if (d < bestDist) {
      bestDist = d;
      best = { index: i, t };
    }
  }
  return best;
}

function triggerZipline() {
  if (!game.active || !getLoadout().zipline) return;
  if (player.isZiplining) {
    // 降りる
    player.isZiplining = false;
    player.zipCooldown = 0.45;
    player.vel.y = 8.5;
    return;
  }

  const found = findNearbyZipline();
  if (!found) return;

  const z = ziplines[found.index];
  const abDir = new THREE.Vector3().subVectors(z.end, z.start).normalize();
  const look = getLookDirection();
  const dir = look.dot(abDir) >= 0 ? 1 : -1;

  player.isZiplining = true;
  player.isGrappling = false;
  wireLine.visible = false;
  player.isSliding = false;
  player.zipIndex = found.index;
  player.zipT = found.t;
  player.zipDir = dir;

  playSfx("zip");
  showTrick("ZIPLINE RIDE!");
}

// ==========================================
// PCキーボード＆マウス入力
// ==========================================
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "Space") {
    player.jumpBuffer = 0.14;
  }
  if (e.code === "KeyQ") {
    triggerDash();
  }
  if (e.code === "KeyF") {
    triggerGrapple();
  }
  if (e.code === "KeyE") {
    triggerZipline();
  }
  if (e.code === "KeyR" && (game.active || game.over)) {
    resetMatch();
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

window.addEventListener("mousedown", (e) => {
  if (!game.active || controlMode !== "pc") return;
  if (e.button === 2) {
    triggerGrapple();
  }
});
window.addEventListener("contextmenu", (e) => e.preventDefault());

// ==========================================
// スマホ・タッチ入力状態
// ==========================================
const touchInput = {
  moveX: 0,
  moveY: 0,
  slideHeld: false,
  joyTouchId: null,
  joyCenterX: 0,
  joyCenterY: 0,
  lookTouchId: null,
  lookLastX: 0,
  lookLastY: 0,
};

const JOY_MAX_RADIUS = 42;

function resetJoystickVisual() {
  touchInput.moveX = 0;
  touchInput.moveY = 0;
  touchInput.joyTouchId = null;
  joystickKnob.style.transform = "translate(0px, 0px)";
  applyStickHomePosition();
}

joystickZone.addEventListener(
  "touchstart",
  (e) => {
    if (!game.active || isEditingLayout) return;
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (touchInput.joyTouchId === null && t.clientX <= window.innerWidth * 0.5) {
        touchInput.joyTouchId = t.identifier;
        touchInput.joyCenterX = t.clientX;
        touchInput.joyCenterY = t.clientY;
        const half = joystickBase.offsetWidth / 2;
        joystickBase.style.left = `${t.clientX - half}px`;
        joystickBase.style.top = `${t.clientY - half}px`;
        updateJoystickFromPoint(t.clientX, t.clientY);
        break;
      }
    }
  },
  { passive: false }
);

joystickZone.addEventListener(
  "touchmove",
  (e) => {
    if (!game.active || isEditingLayout) return;
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier === touchInput.joyTouchId) {
        updateJoystickFromPoint(t.clientX, t.clientY);
        break;
      }
    }
  },
  { passive: false }
);

function handleJoyEnd(e) {
  for (const t of e.changedTouches) {
    if (t.identifier === touchInput.joyTouchId) {
      resetJoystickVisual();
      break;
    }
  }
}
joystickZone.addEventListener("touchend", handleJoyEnd);
joystickZone.addEventListener("touchcancel", handleJoyEnd);

function updateJoystickFromPoint(clientX, clientY) {
  const dx = clientX - touchInput.joyCenterX;
  const dy = clientY - touchInput.joyCenterY;
  const dist = Math.hypot(dx, dy);
  const clamped = Math.min(dist, JOY_MAX_RADIUS);
  const angle = Math.atan2(dy, dx);
  const kx = Math.cos(angle) * clamped;
  const ky = Math.sin(angle) * clamped;

  joystickKnob.style.transform = `translate(${kx}px, ${ky}px)`;
  touchInput.moveX = kx / JOY_MAX_RADIUS;
  touchInput.moveY = -ky / JOY_MAX_RADIUS;
}

// 右画面スワイプ（視点移動）
lookZone.addEventListener(
  "touchstart",
  (e) => {
    if (!game.active || isEditingLayout) return;
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (touchInput.lookTouchId === null) {
        touchInput.lookTouchId = t.identifier;
        touchInput.lookLastX = t.clientX;
        touchInput.lookLastY = t.clientY;
        break;
      }
    }
  },
  { passive: false }
);

lookZone.addEventListener(
  "touchmove",
  (e) => {
    if (!game.active || isEditingLayout) return;
    e.preventDefault();
    for (const t of e.changedTouches) {
      if (t.identifier === touchInput.lookTouchId) {
        const dx = t.clientX - touchInput.lookLastX;
        const dy = t.clientY - touchInput.lookLastY;
        touchInput.lookLastX = t.clientX;
        touchInput.lookLastY = t.clientY;

        const sens = CONFIG.touchLookSensitivity * cameraSensitivity;
        player.yaw -= dx * sens;
        player.pitch -= dy * sens;
        player.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, player.pitch));
        break;
      }
    }
  },
  { passive: false }
);

function handleLookEnd(e) {
  for (const t of e.changedTouches) {
    if (t.identifier === touchInput.lookTouchId) {
      touchInput.lookTouchId = null;
      break;
    }
  }
}
lookZone.addEventListener("touchend", handleLookEnd);
lookZone.addEventListener("touchcancel", handleLookEnd);

// タッチボタン群
btnJump.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    player.jumpBuffer = 0.16;
    btnJump.classList.add("pressed");
  },
  { passive: false }
);
btnJump.addEventListener("touchend", () => btnJump.classList.remove("pressed"));
btnJump.addEventListener("touchcancel", () => btnJump.classList.remove("pressed"));

btnSlide.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    touchInput.slideHeld = true;
    btnSlide.classList.add("pressed");
  },
  { passive: false }
);
function endSlideTouch() {
  touchInput.slideHeld = false;
  btnSlide.classList.remove("pressed");
}
btnSlide.addEventListener("touchend", endSlideTouch);
btnSlide.addEventListener("touchcancel", endSlideTouch);

btnDash.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    triggerDash();
    btnDash.classList.add("pressed");
  },
  { passive: false }
);
btnDash.addEventListener("touchend", () => btnDash.classList.remove("pressed"));
btnDash.addEventListener("touchcancel", () => btnDash.classList.remove("pressed"));

btnGrapple.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    triggerGrapple();
    btnGrapple.classList.add("pressed");
  },
  { passive: false }
);
btnGrapple.addEventListener("touchend", () => btnGrapple.classList.remove("pressed"));
btnGrapple.addEventListener("touchcancel", () => btnGrapple.classList.remove("pressed"));

btnZip.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    triggerZipline();
    btnZip.classList.add("pressed");
  },
  { passive: false }
);
btnZip.addEventListener("touchend", () => btnZip.classList.remove("pressed"));
btnZip.addEventListener("touchcancel", () => btnZip.classList.remove("pressed"));

// ==========================================
// 開始・停止・リトライ管理
// ==========================================
function pauseGame() {
  game.active = false;
  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  if (!game.over && !isEditingLayout) {
    modalTitle.textContent = "一時停止";
    modalDesc.innerHTML = "「再開する」を押すと戻ります。<br />キャラコン装備・カメラ感度・ボタン配置も変更できます。";
    startBtn.textContent = "再開する";
    overlay.classList.remove("hidden");
  }
}

function startOrResumeGame() {
  ensureAudio();
  if (game.over) {
    resetMatch();
  }
  applyLoadoutUI();
  applyAllButtonPositions();
  if (controlMode === "pc" && document.body.requestPointerLock) {
    try {
      const res = document.body.requestPointerLock();
      if (res && typeof res.catch === "function") {
        res.catch(() => {
          overlay.classList.add("hidden");
          game.active = true;
        });
      }
    } catch {
      overlay.classList.add("hidden");
      game.active = true;
    }
  } else {
    overlay.classList.add("hidden");
    game.active = true;
  }
}

startBtn.addEventListener("click", startOrResumeGame);

hudRetryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  ensureAudio();
  resetMatch();
  if (controlMode === "pc" && document.body.requestPointerLock) {
    try {
      document.body.requestPointerLock();
    } catch {
      // fallback
    }
  }
  overlay.classList.add("hidden");
  game.active = true;
});

hudPauseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (document.pointerLockElement) {
    document.exitPointerLock();
  } else {
    pauseGame();
  }
});

document.addEventListener("pointerlockchange", () => {
  if (controlMode !== "pc") return;
  const locked = document.pointerLockElement === document.body;
  if (locked) {
    overlay.classList.add("hidden");
    game.active = true;
  } else {
    pauseGame();
  }
});

document.addEventListener("mousemove", (e) => {
  if (!game.active || controlMode !== "pc") return;
  const sens = CONFIG.mouseSensitivity * cameraSensitivity;
  player.yaw -= e.movementX * sens;
  player.pitch -= e.movementY * sens;
  player.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, player.pitch));
});

function resetMatch() {
  player.pos.set(0, 2, 50);
  player.vel.set(0, 0, 0);
  player.yaw = 0;
  player.pitch = 0;
  player.isSliding = false;
  player.slideTimer = 0;
  player.slideCooldown = 0;
  player.isWallRunning = false;
  player.dashTimer = 0;
  player.dashCooldown = 0;
  player.isGrappling = false;
  player.grappleTimer = 0;
  player.grappleCooldown = 0;
  player.isZiplining = false;
  player.zipCooldown = 0;
  player.boostPadCooldown = 0;
  wireLine.visible = false;

  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;

  oni.pos.set(0, 1, -50);
  oni.vel.set(0, 0, 0);
  oni.jumpCooldown = 0;

  game.elapsed = 0;
  game.over = false;
  game.nearMissCount = 0;
  game.nearMissCooldown = 0;
  nearmissDisplay.textContent = "0";
}

// ==========================================
// 衝突判定＆移動解決（AABB）
// ==========================================
function resolveCollisions(pos, vel, radius, height, dt = 0.016) {
  let onGround = false;
  let hitWallNormal = null;

  for (const c of colliders) {
    const minY = pos.y;
    const maxY = pos.y + height;
    if (maxY <= c.minY || minY >= c.maxY) continue;

    const closestX = Math.max(c.minX, Math.min(pos.x, c.maxX));
    const closestZ = Math.max(c.minZ, Math.min(pos.z, c.maxZ));
    const dx = pos.x - closestX;
    const dz = pos.z - closestZ;
    const distSq = dx * dx + dz * dz;

    if (distSq < radius * radius) {
      const prevBottom = pos.y - vel.y * dt;
      if (vel.y <= 0 && pos.y >= c.maxY - 0.65 && prevBottom >= c.maxY - 0.75) {
        pos.y = c.maxY;
        vel.y = 0;
        onGround = true;
        continue;
      }
      if (vel.y > 0 && maxY <= c.minY + 0.45) {
        pos.y = c.minY - height;
        vel.y = 0;
        continue;
      }

      const dist = Math.sqrt(distSq);
      if (dist > 0.0001) {
        const overlap = radius - dist;
        const nx = dx / dist;
        const nz = dz / dist;
        pos.x += nx * overlap;
        pos.z += nz * overlap;
        if (c.isWallRun) {
          hitWallNormal = new THREE.Vector3(nx, 0, nz);
        }
      } else {
        pos.y = c.maxY;
        vel.y = 0;
        onGround = true;
      }
    }
  }

  return { onGround, hitWallNormal };
}

function detectNearbyWall(pos, radius, height) {
  const probe = radius + 0.38;
  for (const c of colliders) {
    if (!c.isWallRun) continue;
    if (pos.y + height <= c.minY + 0.2 || pos.y >= c.maxY - 0.2) continue;
    const closestX = Math.max(c.minX, Math.min(pos.x, c.maxX));
    const closestZ = Math.max(c.minZ, Math.min(pos.z, c.maxZ));
    const dx = pos.x - closestX;
    const dz = pos.z - closestZ;
    const distSq = dx * dx + dz * dz;
    if (distSq < probe * probe && distSq > 0.0001) {
      const dist = Math.sqrt(distSq);
      return new THREE.Vector3(dx / dist, 0, dz / dist);
    }
  }
  return null;
}

// ==========================================
// プレイヤー更新
// ==========================================
function updatePlayer(dt) {
  const lo = getLoadout();

  // クールタイム更新
  if (player.slideCooldown > 0) player.slideCooldown -= dt;
  if (player.jumpBuffer > 0) player.jumpBuffer -= dt;
  if (player.dashCooldown > 0) player.dashCooldown = Math.max(0, player.dashCooldown - dt);
  if (player.grappleCooldown > 0) player.grappleCooldown = Math.max(0, player.grappleCooldown - dt);
  if (player.zipCooldown > 0) player.zipCooldown = Math.max(0, player.zipCooldown - dt);
  if (player.boostPadCooldown > 0) player.boostPadCooldown = Math.max(0, player.boostPadCooldown - dt);

  if (player.onGround) player.coyoteTimer = 0.12;
  else player.coyoteTimer -= dt;

  // ======================================
  // 1. ジップライン乗車中の処理
  // ======================================
  if (player.isZiplining) {
    const z = ziplines[player.zipIndex];
    const stepT = (CONFIG.ziplineSpeed * dt) / z.length;
    player.zipT += stepT * player.zipDir;

    const abDir = new THREE.Vector3().subVectors(z.end, z.start).normalize().multiplyScalar(player.zipDir);
    player.vel.copy(abDir).multiplyScalar(CONFIG.ziplineSpeed);

    if (player.zipT <= 0 || player.zipT >= 1 || player.jumpBuffer > 0) {
      player.isZiplining = false;
      player.zipCooldown = 0.45;
      if (player.jumpBuffer > 0) {
        player.jumpBuffer = 0;
        player.vel.y = Math.max(player.vel.y + 4, 11.0);
        playSfx("jump");
        showTrick("ZIP JUMP!");
      }
    } else {
      const railPos = new THREE.Vector3().lerpVectors(z.start, z.end, player.zipT);
      player.pos.set(railPos.x, railPos.y - 1.55, railPos.z);
    }
  } else {
    // ======================================
    // 2. 通常・ダッシュ・ワイヤー移動
    // ======================================
    const forward = new THREE.Vector3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
    const right = new THREE.Vector3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));

    let inputForward = 0;
    let inputRight = 0;
    if (keys["KeyW"]) inputForward += 1;
    if (keys["KeyS"]) inputForward -= 1;
    if (keys["KeyD"]) inputRight += 1;
    if (keys["KeyA"]) inputRight -= 1;

    if (Math.abs(touchInput.moveY) > 0.12) inputForward += touchInput.moveY;
    if (Math.abs(touchInput.moveX) > 0.12) inputRight += touchInput.moveX;

    const wishDir = new THREE.Vector3()
      .addScaledVector(forward, inputForward)
      .addScaledVector(right, inputRight);
    if (wishDir.lengthSq() > 1) wishDir.normalize();

    // グラップル中
    if (player.isGrappling) {
      player.grappleTimer -= dt;
      const toTarget = new THREE.Vector3().subVectors(player.grapplePoint, player.pos);
      const dist = toTarget.length();
      if (dist < 2.6 || player.grappleTimer <= 0) {
        player.isGrappling = false;
        wireLine.visible = false;
      } else if (player.jumpBuffer > 0) {
        // ワイヤースリングショット解除
        player.jumpBuffer = 0;
        player.isGrappling = false;
        wireLine.visible = false;
        player.vel.y = Math.max(player.vel.y, 12.5);
        playSfx("jump");
        showTrick("SLINGSHOT!");
      } else {
        toTarget.divideScalar(dist);
        const pull = toTarget.multiplyScalar(CONFIG.grapplePullSpeed);
        pull.y += 3.2;
        player.vel.lerp(pull, Math.min(1, dt * 10));
      }
    } else if (player.dashTimer > 0) {
      // 空中ダッシュ中
      player.dashTimer -= dt;
      player.vel.copy(player.dashDir).multiplyScalar(CONFIG.dashSpeed);
    } else {
      // スライディング開始
      const slideKey =
        keys["ShiftLeft"] || keys["ShiftRight"] || keys["KeyC"] || touchInput.slideHeld;
      const horizVel = new THREE.Vector3(player.vel.x, 0, player.vel.z);
      const currentSpeed = horizVel.length();

      if (
        slideKey &&
        player.onGround &&
        !player.isSliding &&
        player.slideCooldown <= 0 &&
        currentSpeed > 4.5
      ) {
        player.isSliding = true;
        player.slideTimer = CONFIG.slideDuration;
        player.slideCooldown = CONFIG.slideCooldown;
        const dir =
          wishDir.lengthSq() > 0.05 ? wishDir.clone().normalize() : horizVel.clone().normalize();
        const boost = Math.max(currentSpeed + 3.5, CONFIG.slideBoost);
        player.vel.x = dir.x * Math.min(boost, CONFIG.maxSpeed);
        player.vel.z = dir.z * Math.min(boost, CONFIG.maxSpeed);
        playSfx("slide");
        showTrick("SLIDE BOOST!");
      }

      if (player.isSliding) {
        player.slideTimer -= dt;
        if (player.slideTimer <= 0 || !slideKey || !player.onGround) {
          player.isSliding = false;
        }
      }

      // 水平加速＆摩擦
      if (player.onGround) {
        const friction = player.isSliding ? CONFIG.slideFriction : CONFIG.groundFriction;
        const speed = Math.hypot(player.vel.x, player.vel.z);
        if (speed > 0.01) {
          const drop = speed * friction * dt;
          const newSpeed = Math.max(0, speed - drop);
          player.vel.x *= newSpeed / speed;
          player.vel.z *= newSpeed / speed;
        }

        if (!player.isSliding && wishDir.lengthSq() > 0.01) {
          player.vel.x += wishDir.x * CONFIG.groundAccel * dt;
          player.vel.z += wishDir.z * CONFIG.groundAccel * dt;
          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (sp > CONFIG.baseSpeed && !player.isSliding) {
            const target = Math.max(CONFIG.baseSpeed, sp - 12 * dt);
            player.vel.x *= target / sp;
            player.vel.z *= target / sp;
          }
        }
      } else {
        if (wishDir.lengthSq() > 0.01) {
          player.vel.x += wishDir.x * CONFIG.airAccel * dt;
          player.vel.z += wishDir.z * CONFIG.airAccel * dt;
          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (sp > CONFIG.maxSpeed) {
            player.vel.x *= CONFIG.maxSpeed / sp;
            player.vel.z *= CONFIG.maxSpeed / sp;
          }
        }
      }

      // ウォールラン判定
      player.isWallRunning = false;
      const pressingForward = keys["KeyW"] || touchInput.moveY > 0.35;
      if (!player.onGround && pressingForward && Math.hypot(player.vel.x, player.vel.z) > 5.0) {
        const wallN = detectNearbyWall(player.pos, CONFIG.playerRadius, player.currentHeight);
        if (wallN) {
          player.isWallRunning = true;
          player.wallNormal.copy(wallN);
          if (player.vel.y < -1.5) player.vel.y = -1.5;

          const along = forward.clone().projectOnPlane(wallN).normalize();
          if (along.lengthSq() > 0.1) {
            const sp = Math.max(Math.hypot(player.vel.x, player.vel.z), CONFIG.wallRunSpeed);
            player.vel.x = along.x * Math.min(sp, CONFIG.maxSpeed);
            player.vel.z = along.z * Math.min(sp, CONFIG.maxSpeed);
          }
        }
      }

      // ジャンプ / バニホ / 壁キック
      if (player.jumpBuffer > 0) {
        if (player.coyoteTimer > 0) {
          player.vel.y = CONFIG.jumpForce;
          player.onGround = false;
          player.coyoteTimer = 0;
          player.jumpBuffer = 0;

          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (player.isSliding || sp > CONFIG.baseSpeed + 1.2) {
            const boost = Math.min(sp + 1.8, CONFIG.maxSpeed);
            const dir = new THREE.Vector3(player.vel.x, 0, player.vel.z).normalize();
            player.vel.x = dir.x * boost;
            player.vel.z = dir.z * boost;
            showTrick(player.isSliding ? "SLIDE JUMP!" : "BUNNY HOP!");
          }
          player.isSliding = false;
          playSfx("jump");
        } else if (player.isWallRunning) {
          player.vel.y = CONFIG.wallJumpUp;
          player.vel.x += player.wallNormal.x * CONFIG.wallJumpPush;
          player.vel.z += player.wallNormal.z * CONFIG.wallJumpPush;
          player.isWallRunning = false;
          player.jumpBuffer = 0;
          playSfx("walljump");
          showTrick("WALL KICK!");
        }
      }

      // 重力
      const grav = player.isWallRunning ? CONFIG.wallRunGravity : CONFIG.gravity;
      player.vel.y -= grav * dt;
    }

    // 座標更新＆衝突解決
    player.pos.x += player.vel.x * dt;
    player.pos.y += player.vel.y * dt;
    player.pos.z += player.vel.z * dt;

    const targetH = player.isSliding ? CONFIG.slideHeight : CONFIG.standHeight;
    player.currentHeight += (targetH - player.currentHeight) * Math.min(1, dt * 16);

    const col = resolveCollisions(player.pos, player.vel, CONFIG.playerRadius, player.currentHeight, dt);
    player.onGround = col.onGround;

    // ジャンプパッド判定
    for (const pad of jumpPads) {
      const dx = player.pos.x - pad.x;
      const dz = player.pos.z - pad.z;
      if (dx * dx + dz * dz < pad.radius * pad.radius && Math.abs(player.pos.y - pad.y) < 1.2) {
        player.vel.y = pad.force;
        player.onGround = false;
        player.isGrappling = false;
        wireLine.visible = false;
        playSfx("pad");
        showTrick("SUPER JUMP!");
      }
    }

    // スピードブースト床判定
    if (player.boostPadCooldown <= 0) {
      for (const b of boostPads) {
        if (
          player.pos.x >= b.minX &&
          player.pos.x <= b.maxX &&
          player.pos.z >= b.minZ &&
          player.pos.z <= b.maxZ &&
          Math.abs(player.pos.y - b.y) < 1.1
        ) {
          const dir = new THREE.Vector3(player.vel.x, 0, player.vel.z);
          if (dir.lengthSq() < 0.2) {
            dir.set(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
          } else {
            dir.normalize();
          }
          player.vel.x = dir.x * CONFIG.boostPadSpeed;
          player.vel.z = dir.z * CONFIG.boostPadSpeed;
          player.boostPadCooldown = 0.55;
          playSfx("boost");
          showTrick("SPEED BOOST!!");
          break;
        }
      }
    }
  }

  // ======================================
  // 3. カメラ・ワイヤー・照準・HUD更新
  // ======================================
  const speedNow = Math.hypot(player.vel.x, player.vel.z);
  const targetFov = 78 + Math.min(22, Math.max(0, (speedNow - 10) * 1.45));
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 8);
  camera.updateProjectionMatrix();

  const right = new THREE.Vector3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));
  let targetTilt = 0;
  if (player.isWallRunning) {
    const side = right.dot(player.wallNormal);
    targetTilt = side > 0 ? -0.18 : 0.18;
  }
  player.wallTilt += (targetTilt - player.wallTilt) * Math.min(1, dt * 10);

  camera.position.set(player.pos.x, player.pos.y + player.currentHeight - 0.15, player.pos.z);
  camera.rotation.order = "YXZ";
  camera.rotation.y = player.yaw;
  camera.rotation.x = player.pitch;
  camera.rotation.z = player.wallTilt;

  // グラップルワイヤーのライン更新
  if (player.isGrappling) {
    wireLine.visible = true;
    const handPos = camera.position
      .clone()
      .addScaledVector(right, 0.35)
      .add(new THREE.Vector3(0, -0.3, 0));
    const arr = wireGeo.attributes.position.array;
    arr[0] = handPos.x;
    arr[1] = handPos.y;
    arr[2] = handPos.z;
    arr[3] = player.grapplePoint.x;
    arr[4] = player.grapplePoint.y;
    arr[5] = player.grapplePoint.z;
    wireGeo.attributes.position.needsUpdate = true;
  } else {
    wireLine.visible = false;
  }

  // グラップル照準アシスト表示
  const canGrapple = lo.grapple && player.grappleCooldown <= 0 && !player.isGrappling && Boolean(findGrappleHit());
  player.canGrappleNow = canGrapple;
  crosshair.classList.toggle("can-grapple", canGrapple);
  btnGrapple.classList.toggle("ready-target", canGrapple);

  // ジップライン近接表示
  const nearZip = !player.isZiplining ? findNearbyZipline() : null;
  player.nearbyZip = nearZip;
  zipPrompt.classList.toggle("hidden", !nearZip);
  btnZip.classList.toggle("zip-available", Boolean(nearZip) || player.isZiplining);

  // クールタイム表示（スマホ＆PC）
  if (player.dashCooldown > 0) {
    const s = player.dashCooldown.toFixed(1) + "s";
    btnDashCd.textContent = s;
    pcDashCd.textContent = s;
    btnDash.classList.add("on-cooldown");
    pcDashChip.classList.add("cooldown");
  } else {
    btnDashCd.textContent = "";
    pcDashCd.textContent = "READY";
    btnDash.classList.remove("on-cooldown");
    pcDashChip.classList.remove("cooldown");
  }

  if (player.grappleCooldown > 0 && !player.isGrappling) {
    const s = player.grappleCooldown.toFixed(1) + "s";
    btnGrappleCd.textContent = s;
    pcGrappleCd.textContent = s;
    btnGrapple.classList.add("on-cooldown");
    pcGrappleChip.classList.add("cooldown");
  } else {
    btnGrappleCd.textContent = player.isGrappling ? "ON" : "";
    pcGrappleCd.textContent = player.isGrappling ? "ACTIVE" : "READY";
    btnGrapple.classList.remove("on-cooldown");
    pcGrappleChip.classList.remove("cooldown");
  }

  // 状態バッジ
  speedDisplay.textContent = speedNow.toFixed(1);
  if (player.isZiplining) {
    stateBadge.textContent = "ZIPLINE";
    stateBadge.className = "zipline";
  } else if (player.isGrappling) {
    stateBadge.textContent = "GRAPPLE";
    stateBadge.className = "grapple";
  } else if (player.dashTimer > 0) {
    stateBadge.textContent = "DASH";
    stateBadge.className = "dash";
  } else if (player.isWallRunning) {
    stateBadge.textContent = "WALL RUN";
    stateBadge.className = "wallrun";
  } else if (player.isSliding) {
    stateBadge.textContent = "SLIDING";
    stateBadge.className = "slide";
  } else if (!player.onGround) {
    stateBadge.textContent = "AIR";
    stateBadge.className = "air";
  } else {
    stateBadge.textContent = "RUN";
    stateBadge.className = "";
  }
}

// ==========================================
// 鬼（AI）の追跡更新
// ==========================================
function updateOni(dt) {
  const currentOniSpeed = oni.baseSpeed + Math.min(6.0, game.elapsed * 0.085);

  const toPlayer = new THREE.Vector3(
    player.pos.x - oni.pos.x,
    0,
    player.pos.z - oni.pos.z
  );
  const distHoriz = toPlayer.length();
  if (distHoriz > 0.01) toPlayer.divideScalar(distHoriz);

  oni.vel.x = toPlayer.x * currentOniSpeed;
  oni.vel.z = toPlayer.z * currentOniSpeed;
  oni.vel.y -= CONFIG.gravity * dt;

  if (oni.jumpCooldown > 0) oni.jumpCooldown -= dt;

  const prevX = oni.pos.x;
  const prevZ = oni.pos.z;

  oni.pos.x += oni.vel.x * dt;
  oni.pos.y += oni.vel.y * dt;
  oni.pos.z += oni.vel.z * dt;

  const col = resolveCollisions(oni.pos, oni.vel, 0.7, 2.0, dt);
  oni.onGround = col.onGround;

  // 鬼もジャンプパッドを使える
  for (const pad of jumpPads) {
    const dx = oni.pos.x - pad.x;
    const dz = oni.pos.z - pad.z;
    if (dx * dx + dz * dz < pad.radius * pad.radius && Math.abs(oni.pos.y - pad.y) < 1.2) {
      oni.vel.y = pad.force * 0.95;
      oni.onGround = false;
    }
  }

  const moved = Math.hypot(oni.pos.x - prevX, oni.pos.z - prevZ);
  if (
    oni.onGround &&
    oni.jumpCooldown <= 0 &&
    (moved < currentOniSpeed * dt * 0.45 || player.pos.y > oni.pos.y + 1.5)
  ) {
    oni.vel.y = player.pos.y > oni.pos.y + 4.0 ? 15.5 : 12.8;
    oni.jumpCooldown = 0.6;
  }

  oniGroup.position.copy(oni.pos);
  oniGroup.lookAt(player.pos.x, oni.pos.y, player.pos.z);

  const totalDist = oni.pos.distanceTo(player.pos);
  distDisplay.textContent = totalDist.toFixed(1);

  if (game.nearMissCooldown > 0) game.nearMissCooldown -= dt;
  if (totalDist < 3.6 && totalDist > 1.6 && game.nearMissCooldown <= 0) {
    game.nearMissCount += 1;
    game.nearMissCooldown = 1.8;
    nearmissDisplay.textContent = String(game.nearMissCount);
    showTrick("NEAR MISS!! +1");
  }

  if (totalDist < 1.5) {
    triggerGameOver();
  }
}

// ==========================================
// ミニマップ描画
// ==========================================
function drawMinimap(now) {
  const ctx = minimapCtx;
  const size = minimapCanvas.width;
  const scale = size / (ARENA_HALF * 2);

  const toMapX = (wx) => (wx + ARENA_HALF) * scale;
  const toMapY = (wz) => (wz + ARENA_HALF) * scale;

  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, size, size);

  // グリッド
  ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
  ctx.lineWidth = 1;
  const step = size / 7;
  for (let i = 1; i < 7; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, size);
    ctx.moveTo(0, i * step);
    ctx.lineTo(size, i * step);
    ctx.stroke();
  }

  // 障害物・足場
  for (const c of colliders) {
    if (c.isFloor || c.isOuterWall) continue;
    const x = toMapX(c.minX);
    const y = toMapY(c.minZ);
    const w = Math.max(2, (c.maxX - c.minX) * scale);
    const h = Math.max(2, (c.maxZ - c.minZ) * scale);
    ctx.fillStyle = `#${c.color.toString(16).padStart(6, "0")}`;
    ctx.globalAlpha = 0.78;
    ctx.fillRect(x, y, w, h);
  }
  ctx.globalAlpha = 1;

  // ブースト床（シアン）
  ctx.fillStyle = "#06b6d4";
  for (const b of boostPads) {
    ctx.fillRect(toMapX(b.minX), toMapY(b.minZ), Math.max(2, b.w * scale), Math.max(2, b.d * scale));
  }

  // ジップライン（黄色の線）
  if (getLoadout().zipline) {
    ctx.strokeStyle = "rgba(250, 204, 21, 0.78)";
    ctx.lineWidth = 1.4;
    for (const z of ziplines) {
      ctx.beginPath();
      ctx.moveTo(toMapX(z.start.x), toMapY(z.start.z));
      ctx.lineTo(toMapX(z.end.x), toMapY(z.end.z));
      ctx.stroke();
    }
  }

  // ジャンプパッド（緑）
  ctx.fillStyle = "#22c55e";
  for (const pad of jumpPads) {
    ctx.beginPath();
    ctx.arc(toMapX(pad.x), toMapY(pad.z), 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // プレイヤー視野
  const px = toMapX(player.pos.x);
  const py = toMapY(player.pos.z);
  const lookAngle = Math.atan2(-Math.cos(player.yaw), -Math.sin(player.yaw));

  ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.arc(px, py, 18, lookAngle - 0.52, lookAngle + 0.52);
  ctx.closePath();
  ctx.fill();

  // 鬼（赤＋脈打つリング）
  const ox = toMapX(oni.pos.x);
  const oy = toMapY(oni.pos.z);
  const pulse = 4.5 + Math.sin(now * 0.01) * 2.2;
  ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(ox, oy, pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(ox, oy, 3.8, 0, Math.PI * 2);
  ctx.fill();

  // プレイヤー
  ctx.fillStyle = "#38bdf8";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(px, py, 3.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function triggerGameOver() {
  game.over = true;
  game.active = false;
  wireLine.visible = false;
  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  playSfx("caught");

  if (game.elapsed > game.best) {
    game.best = game.elapsed;
    localStorage.setItem("parkour_tag_best", game.best.toFixed(2));
    bestDisplay.textContent = game.best.toFixed(1);
  }

  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  modalTitle.textContent = "鬼に捕まった！";
  modalDesc.innerHTML =
    `生存時間: <strong>${game.elapsed.toFixed(1)} 秒</strong>（ベスト: ${game.best.toFixed(1)} 秒）<br />` +
    `ニアミス回数: <strong>${game.nearMissCount} 回</strong>`;
  startBtn.textContent = "もう一回逃げる";
  overlay.classList.remove("hidden");
}

// ==========================================
// メインループ
// ==========================================
let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  if (trickTimer > 0) {
    trickTimer -= dt;
    if (trickTimer <= 0) trickFeed.classList.remove("show");
  }

  if (game.active && !game.over) {
    game.elapsed += dt;
    timeDisplay.textContent = game.elapsed.toFixed(1);
    updatePlayer(dt);
    updateOni(dt);
  }

  drawMinimap(now);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  applyAllButtonPositions();
});

animate(performance.now());
