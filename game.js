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

const timeDisplay = document.getElementById("time-display");
const bestDisplay = document.getElementById("best-display");
const speedDisplay = document.getElementById("speed-display");
const distDisplay = document.getElementById("dist-display");
const nearmissDisplay = document.getElementById("nearmiss-display");
const stateBadge = document.getElementById("state-badge");
const trickFeed = document.getElementById("trick-feed");
const hudRetryBtn = document.getElementById("hud-retry-btn");
const hudPauseBtn = document.getElementById("hud-pause-btn");

const minimapCanvas = document.getElementById("minimap");
const minimapCtx = minimapCanvas.getContext("2d");

const touchLayer = document.getElementById("touch-layer");
const lookZone = document.getElementById("look-zone");
const joystickZone = document.getElementById("joystick-zone");
const joystickBase = document.getElementById("joystick-base");
const joystickKnob = document.getElementById("joystick-knob");
const btnJump = document.getElementById("btn-jump");
const btnSlide = document.getElementById("btn-slide");

const layoutEditorBar = document.getElementById("layout-editor-bar");
const layoutResetBtn = document.getElementById("layout-reset-btn");
const layoutSaveBtn = document.getElementById("layout-save-btn");

// ==========================================
// キャラコン調整パラメータ（ここをいじると操作感が激変します！）
// ==========================================
const CONFIG = {
  gravity: 28,
  baseSpeed: 10.5,
  maxSpeed: 24.0,
  groundAccel: 75,
  airAccel: 22,
  groundFriction: 9.0,
  slideFriction: 1.6,
  jumpForce: 11.2,
  slideBoost: 16.5,
  slideDuration: 0.72,
  slideCooldown: 0.45,
  wallRunGravity: 4.5,
  wallRunSpeed: 13.5,
  wallJumpUp: 11.5,
  wallJumpPush: 13.0,
  jumpPadForce: 21.0,
  playerRadius: 0.55,
  standHeight: 1.8,
  slideHeight: 0.95,
  mouseSensitivity: 0.0022,
  touchLookSensitivity: 0.0055,
};

// ==========================================
// タッチモード判定＆切替（iPadデスクトップ表示にも対応）
// ==========================================
const isCoarsePointer =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0;

let controlMode = isCoarsePointer ? "touch" : "pc"; // "touch" | "pc"
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

modeToggleBtn.addEventListener("click", () => {
  controlMode = controlMode === "touch" ? "pc" : "touch";
  applyControlMode();
});

// ==========================================
// ボタン配置カスタマイズ（localStorage保存対応）
// ==========================================
const LAYOUT_STORAGE_KEY = "parkour_tag_layout_v1";
const DEFAULT_LAYOUT = {
  jump: { xPct: 0.88, yPct: 0.82 },
  slide: { xPct: 0.88, yPct: 0.64 },
  stick: { xPct: 0.14, yPct: 0.80 },
};

function loadLayout() {
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_LAYOUT);
    const parsed = JSON.parse(raw);
    return {
      jump: parsed.jump || { ...DEFAULT_LAYOUT.jump },
      slide: parsed.slide || { ...DEFAULT_LAYOUT.slide },
      stick: parsed.stick || { ...DEFAULT_LAYOUT.stick },
    };
  } catch {
    return {
      jump: { ...DEFAULT_LAYOUT.jump },
      slide: { ...DEFAULT_LAYOUT.slide },
      stick: { ...DEFAULT_LAYOUT.stick },
    };
  }
}

let buttonLayout = loadLayout();

function saveLayout() {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(buttonLayout));
  } catch {
    // ignore storage errors
  }
}

function positionElementByPct(el, xPct, yPct, maxRightRatio = 1.0) {
  const w = el.offsetWidth || 80;
  const h = el.offsetHeight || 80;
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
  applyStickHomePosition();
}

// 初期化時に位置を反映
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
    const w = el.offsetWidth || 80;
    const h = el.offsetHeight || 80;
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
attachDraggable(joystickBase, "stick", 0.5);

function enterLayoutEditor() {
  isEditingLayout = true;
  document.body.classList.add("layout-editing");
  overlay.classList.add("hidden");
  layoutEditorBar.classList.remove("hidden");
  requestAnimationFrame(applyAllButtonPositions);
}

function exitLayoutEditor() {
  isEditingLayout = false;
  saveLayout();
  document.body.classList.remove("layout-editing");
  layoutEditorBar.classList.add("hidden");
  applyControlMode();
  overlay.classList.remove("hidden");
}

layoutBtn.addEventListener("click", enterLayoutEditor);
layoutSaveBtn.addEventListener("click", exitLayoutEditor);
layoutResetBtn.addEventListener("click", () => {
  buttonLayout = {
    jump: { ...DEFAULT_LAYOUT.jump },
    slide: { ...DEFAULT_LAYOUT.slide },
    stick: { ...DEFAULT_LAYOUT.stick },
  };
  applyAllButtonPositions();
});

// ==========================================
// 効果音（Web Audio API・外部ファイル不要）
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
  trickTimer = 1.1;
}

// ==========================================
// Three.js シーン構築
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1220);
scene.fog = new THREE.Fog(0x0b1220, 35, 115);

const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 200);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = !isCoarsePointer;
document.body.appendChild(renderer.domElement);

// ライト
const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.95);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
dirLight.position.set(28, 48, 22);
if (!isCoarsePointer) {
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.left = -55;
  dirLight.shadow.camera.right = 55;
  dirLight.shadow.camera.top = 55;
  dirLight.shadow.camera.bottom = -55;
}
scene.add(dirLight);

// ==========================================
// マップ構築（AABBコライダー付き）
// ==========================================
const ARENA_HALF = 45;
const colliders = [];
const jumpPads = [];

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

function addJumpPad(x, y, z) {
  const geo = new THREE.CylinderGeometry(1.7, 1.9, 0.25, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x15803d,
    emissiveIntensity: 0.7,
  });
  const pad = new THREE.Mesh(geo, mat);
  pad.position.set(x, y + 0.12, z);
  scene.add(pad);
  jumpPads.push({ x, y: y + 0.12, z, radius: 1.85 });
}

function buildArena() {
  // 床（グリッド付き）
  addBox(0, -0.5, 0, 90, 1, 90, 0x1e293b, { noCast: true, roughness: 0.85, isFloor: true });
  const grid = new THREE.GridHelper(90, 45, 0x38bdf8, 0x334155);
  grid.position.y = 0.02;
  scene.add(grid);

  // 外周の壁
  addBox(0, 6, -45, 90, 12, 1, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(0, 6, 45, 90, 12, 1, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(-45, 6, 0, 1, 12, 90, 0x334155, { wallRun: true, isOuterWall: true });
  addBox(45, 6, 0, 1, 12, 90, 0x334155, { wallRun: true, isOuterWall: true });

  // 中央タワー＆周囲の高台
  addBox(0, 2.5, 0, 8, 5, 8, 0x475569, { wallRun: true });
  addBox(0, 6.2, 0, 4, 2.4, 4, 0x64748b, { wallRun: true });

  // ウォールラン用の紫の大型パネル（4方向に配置）
  addBox(-16, 4.5, -14, 1.2, 9, 20, 0x7e22ce, { wallRun: true });
  addBox(16, 4.5, 14, 1.2, 9, 20, 0x7e22ce, { wallRun: true });
  addBox(14, 4.5, -18, 20, 9, 1.2, 0x7e22ce, { wallRun: true });
  addBox(-14, 4.5, 18, 20, 9, 1.2, 0x7e22ce, { wallRun: true });

  // アスレチック足場
  const platforms = [
    [-12, 1.2, 0, 6, 2.4, 6, 0x0284c7],
    [12, 1.2, 0, 6, 2.4, 6, 0x0284c7],
    [0, 1.2, -12, 6, 2.4, 6, 0x0284c7],
    [0, 1.2, 12, 6, 2.4, 6, 0x0284c7],

    [-26, 2.5, -24, 8, 5, 8, 0x3b82f6],
    [26, 2.5, 24, 8, 5, 8, 0x3b82f6],
    [26, 2.5, -24, 8, 5, 8, 0x3b82f6],
    [-26, 2.5, 24, 8, 5, 8, 0x3b82f6],

    // 空中ブリッジ
    [-26, 5.2, 0, 5, 0.8, 16, 0x0ea5e9],
    [26, 5.2, 0, 5, 0.8, 16, 0x0ea5e9],
    [0, 5.2, -26, 16, 0.8, 5, 0x0ea5e9],
    [0, 5.2, 26, 16, 0.8, 5, 0x0ea5e9],

    // スライディングでくぐれるゲート
    [-8, 3.0, -26, 1.5, 3.4, 6, 0xf59e0b],
    [8, 3.0, 26, 1.5, 3.4, 6, 0xf59e0b],
  ];

  for (const [x, y, z, w, h, d, color] of platforms) {
    addBox(x, y, z, w, h, d, color, { wallRun: true });
  }

  // ジャンプパッド
  addJumpPad(-10, 0, -10);
  addJumpPad(10, 0, 10);
  addJumpPad(10, 0, -10);
  addJumpPad(-10, 0, 10);
  addJumpPad(-32, 0, 0);
  addJumpPad(32, 0, 0);
}

buildArena();

// ==========================================
// 鬼（AIボット）の作成
// ==========================================
const oniGroup = new THREE.Group();
const oniBody = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.6, 1.1, 8, 16),
  new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0x991b1b,
    emissiveIntensity: 0.6,
  })
);
oniBody.position.y = 1.15;
oniBody.castShadow = true;
oniGroup.add(oniBody);

const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), eyeMat);
leftEye.position.set(-0.22, 1.55, 0.52);
const rightEye = leftEye.clone();
rightEye.position.x = 0.22;
oniGroup.add(leftEye, rightEye);

scene.add(oniGroup);

const oni = {
  pos: new THREE.Vector3(0, 1, -34),
  vel: new THREE.Vector3(),
  onGround: false,
  baseSpeed: 9.2,
  jumpCooldown: 0,
};

// ==========================================
// プレイヤー状態＆入力（PC + スマホ両対応）
// ==========================================
const player = {
  pos: new THREE.Vector3(0, 2, 32),
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

// PCキーボード入力
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "Space") {
    player.jumpBuffer = 0.14;
  }
  if (e.code === "KeyR" && (game.active || game.over)) {
    resetMatch();
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

// スマホ・タッチ入力状態
const touchInput = {
  moveX: 0, // -1 (左) ~ +1 (右)
  moveY: 0, // -1 (後) ~ +1 (前)
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
      // 画面左側（中央より左）のタッチのみスティックとして受け付ける
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
  touchInput.moveY = -ky / JOY_MAX_RADIUS; // 上方向が前進 (+1)
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

        player.yaw -= dx * CONFIG.touchLookSensitivity;
        player.pitch -= dy * CONFIG.touchLookSensitivity;
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

// タッチ用 JUMP / SLIDE ボタン
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
    modalDesc.innerHTML = "「再開する」を押すと戻ります。<br />ボタン配置や操作モードの変更もできます。";
    startBtn.textContent = "再開する";
    overlay.classList.remove("hidden");
  }
}

function startOrResumeGame() {
  ensureAudio();
  if (game.over) {
    resetMatch();
  }
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
  player.yaw -= e.movementX * CONFIG.mouseSensitivity;
  player.pitch -= e.movementY * CONFIG.mouseSensitivity;
  player.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, player.pitch));
});

function resetMatch() {
  player.pos.set(0, 2, 32);
  player.vel.set(0, 0, 0);
  player.yaw = 0;
  player.pitch = 0;
  player.isSliding = false;
  player.slideTimer = 0;
  player.slideCooldown = 0;
  player.isWallRunning = false;

  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;

  oni.pos.set(0, 1, -34);
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
      if (vel.y <= 0 && pos.y >= c.maxY - 0.55 && prevBottom >= c.maxY - 0.65) {
        pos.y = c.maxY;
        vel.y = 0;
        onGround = true;
        continue;
      }
      if (vel.y > 0 && maxY <= c.minY + 0.4) {
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
// プレイヤー更新（キャラコンの心臓部）
// ==========================================
function updatePlayer(dt) {
  const forward = new THREE.Vector3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
  const right = new THREE.Vector3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));

  // PCキー＋スマホスティックを統合
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

  // クールタイム更新
  if (player.slideCooldown > 0) player.slideCooldown -= dt;
  if (player.jumpBuffer > 0) player.jumpBuffer -= dt;
  if (player.onGround) player.coyoteTimer = 0.12;
  else player.coyoteTimer -= dt;

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

  // ウォールラン判定（空中で壁に近い＋前進入力中）
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
    if (dx * dx + dz * dz < pad.radius * pad.radius && Math.abs(player.pos.y - pad.y) < 1.1) {
      player.vel.y = CONFIG.jumpPadForce;
      player.onGround = false;
      playSfx("pad");
      showTrick("SUPER JUMP!");
    }
  }

  // カメラ反映
  const speedNow = Math.hypot(player.vel.x, player.vel.z);
  const targetFov = 78 + Math.min(18, Math.max(0, (speedNow - 10) * 1.4));
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 8);
  camera.updateProjectionMatrix();

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

  // HUD更新
  speedDisplay.textContent = speedNow.toFixed(1);
  if (player.isWallRunning) {
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
  const currentOniSpeed = oni.baseSpeed + Math.min(4.8, game.elapsed * 0.08);

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

  const col = resolveCollisions(oni.pos, oni.vel, 0.65, 1.9, dt);
  oni.onGround = col.onGround;

  const moved = Math.hypot(oni.pos.x - prevX, oni.pos.z - prevZ);
  if (
    oni.onGround &&
    oni.jumpCooldown <= 0 &&
    (moved < currentOniSpeed * dt * 0.45 || player.pos.y > oni.pos.y + 1.4)
  ) {
    oni.vel.y = 12.2;
    oni.jumpCooldown = 0.65;
  }

  oniGroup.position.copy(oni.pos);
  oniGroup.lookAt(player.pos.x, oni.pos.y, player.pos.z);

  const totalDist = oni.pos.distanceTo(player.pos);
  distDisplay.textContent = totalDist.toFixed(1);

  if (game.nearMissCooldown > 0) game.nearMissCooldown -= dt;
  if (totalDist < 3.4 && totalDist > 1.55 && game.nearMissCooldown <= 0) {
    game.nearMissCount += 1;
    game.nearMissCooldown = 1.8;
    nearmissDisplay.textContent = String(game.nearMissCount);
    showTrick("NEAR MISS!! +1");
  }

  if (totalDist < 1.45) {
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

  // 背景
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, size, size);

  // 薄いグリッド
  ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
  ctx.lineWidth = 1;
  const step = size / 6;
  for (let i = 1; i < 6; i++) {
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
    ctx.globalAlpha = 0.8;
    ctx.fillRect(x, y, w, h);
  }
  ctx.globalAlpha = 1;

  // ジャンプパッド（緑）
  ctx.fillStyle = "#22c55e";
  for (const pad of jumpPads) {
    ctx.beginPath();
    ctx.arc(toMapX(pad.x), toMapY(pad.z), 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // プレイヤーの視野コーン＆位置
  const px = toMapX(player.pos.x);
  const py = toMapY(player.pos.z);
  const lookAngle = Math.atan2(-Math.cos(player.yaw), -Math.sin(player.yaw));

  ctx.fillStyle = "rgba(56, 189, 248, 0.28)";
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.arc(px, py, 20, lookAngle - 0.52, lookAngle + 0.52);
  ctx.closePath();
  ctx.fill();

  // 鬼（赤＋脈打つリング）
  const ox = toMapX(oni.pos.x);
  const oy = toMapY(oni.pos.z);
  const pulse = 5 + Math.sin(now * 0.01) * 2.5;
  ctx.strokeStyle = "rgba(239, 68, 68, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(ox, oy, pulse, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(ox, oy, 4.2, 0, Math.PI * 2);
  ctx.fill();

  // プレイヤーマーカー（水色＋白枠）
  ctx.fillStyle = "#38bdf8";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(px, py, 4.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function triggerGameOver() {
  game.over = true;
  game.active = false;
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
