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
const hitmarker = document.getElementById("hitmarker");
const weaponNameEl = document.getElementById("weapon-name");
const autofireBadge = document.getElementById("autofire-badge");
const ammoDisplay = document.getElementById("ammo-display");
const ammoMaxDisplay = document.getElementById("ammo-max");
const reloadStatus = document.getElementById("reload-status");
const autofireToggleBtn = document.getElementById("autofire-toggle-btn");
const meleeReadyBadge = document.getElementById("melee-ready-badge");
const hudCoinsDisplay = document.getElementById("hud-coins-display");
const modalCoinsDisplay = document.getElementById("modal-coins-display");
const equippedGunNameEl = document.getElementById("equipped-gun-name");
const equippedGunSkinEl = document.getElementById("equipped-gun-skin");
const equippedMeleeNameEl = document.getElementById("equipped-melee-name");
const equippedMeleeSkinEl = document.getElementById("equipped-melee-skin");

const openShopBtn = document.getElementById("open-shop-btn");
const shopOverlay = document.getElementById("shop-overlay");
const closeShopBtn = document.getElementById("close-shop-btn");
const shopCoinsDisplay = document.getElementById("shop-coins-display");
const shopTabBtns = document.querySelectorAll(".shop-tab-btn");
const shopTabNote = document.getElementById("shop-tab-note");
const shopItemsGrid = document.getElementById("shop-items-grid");
const gachaView = document.getElementById("gacha-view");
const gachaResultBox = document.getElementById("gacha-result-box");
const gachaPull1Btn = document.getElementById("gacha-pull-1-btn");
const gachaPull3Btn = document.getElementById("gacha-pull-3-btn");

const myKillsDisplay = document.getElementById("my-kills-display");
const enemyKillsDisplay = document.getElementById("enemy-kills-display");
const enemyTagLabel = document.getElementById("enemy-tag-label");
const targetKillsDisplay = document.getElementById("target-kills-display");
const netStatusPill = document.getElementById("net-status-pill");
const myHpDisplay = document.getElementById("my-hp-display");
const myHpFill = document.getElementById("my-hp-fill");
const enemyHpDisplay = document.getElementById("enemy-hp-display");
const enemyHpHudFill = document.getElementById("enemy-hp-hud-fill");
const damageVignette = document.getElementById("damage-vignette");
const respawnBanner = document.getElementById("respawn-banner");
const respawnTimerDisplay = document.getElementById("respawn-timer-display");

const goalKillsSelect = document.getElementById("goal-kills-select");
const mpTabHost = document.getElementById("mp-tab-host");
const mpTabJoin = document.getElementById("mp-tab-join");
const mpTabSolo = document.getElementById("mp-tab-solo");
const mpHostPanel = document.getElementById("mp-host-panel");
const mpJoinPanel = document.getElementById("mp-join-panel");
const mpSoloPanel = document.getElementById("mp-solo-panel");
const hostRoomCodeEl = document.getElementById("host-room-code");
const copyCodeBtn = document.getElementById("copy-code-btn");
const hostStatusText = document.getElementById("host-status-text");
const createRoomBtn = document.getElementById("create-room-btn");
const joinCodeInput = document.getElementById("join-code-input");
const joinRoomBtn = document.getElementById("join-room-btn");
const joinStatusText = document.getElementById("join-status-text");

const speedDisplay = document.getElementById("speed-display");
const distDisplay = document.getElementById("dist-display");
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
const btnFire = document.getElementById("btn-fire");
const btnFireSub = document.getElementById("btn-fire-sub");
const btnWeapon = document.getElementById("btn-weapon");
const btnWeaponLabel = document.getElementById("btn-weapon-label");

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
  slide: { xPct: 0.78, yPct: 0.86 },
  dash: { xPct: 0.90, yPct: 0.64 },
  grapple: { xPct: 0.78, yPct: 0.67 },
  zip: { xPct: 0.66, yPct: 0.80 },
  fire: { xPct: 0.89, yPct: 0.46 },
  weapon: { xPct: 0.66, yPct: 0.63 },
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
  positionElementByPct(btnFire, buttonLayout.fire.xPct, buttonLayout.fire.yPct, 1.0);
  positionElementByPct(btnWeapon, buttonLayout.weapon.xPct, buttonLayout.weapon.yPct, 1.0);
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
attachDraggable(btnFire, "fire", 1.0);
attachDraggable(btnWeapon, "weapon", 1.0);
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
  } else if (type === "shot_rifle") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.start(t);
    osc.stop(t + 0.09);
  } else if (type === "shot_shotgun") {
    osc.type = "square";
    osc.frequency.setValueAtTime(210, t);
    osc.frequency.exponentialRampToValueAtTime(48, t + 0.18);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.19);
    osc.start(t);
    osc.stop(t + 0.19);
  } else if (type === "shot_sniper") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(980, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.24);
    gain.gain.setValueAtTime(0.13, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.start(t);
    osc.stop(t + 0.25);
  } else if (type === "hit") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1250, t);
    osc.frequency.exponentialRampToValueAtTime(820, t + 0.06);
    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
    osc.start(t);
    osc.stop(t + 0.07);
  } else if (type === "stun") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, t);
    osc.frequency.exponentialRampToValueAtTime(1320, t + 0.24);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.start(t);
    osc.stop(t + 0.25);
  } else if (type === "melee_swing") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(360, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.11);
    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t);
    osc.stop(t + 0.12);
  } else if (type === "melee_hit") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(780, t);
    osc.frequency.exponentialRampToValueAtTime(190, t + 0.14);
    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  } else if (type === "reload") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(520, t + 0.14);
    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
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
scene.add(camera);
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
const worldMeshes = [];
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

  worldMeshes.push(mesh);
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
// 対戦相手（友達 / ソロ練習BOT）の3Dモデル
// ==========================================
const rivalGroup = new THREE.Group();
const rivalBody = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.55, 1.0, 8, 16),
  new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0x991b1b,
    emissiveIntensity: 0.55,
    roughness: 0.35,
  })
);
rivalBody.position.y = 1.05;
rivalBody.castShadow = true;
rivalGroup.add(rivalBody);

// バイザー（向いている方向がわかるように）
const visorMesh = new THREE.Mesh(
  new THREE.BoxGeometry(0.62, 0.22, 0.24),
  new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
);
visorMesh.position.set(0, 1.48, 0.45);
rivalGroup.add(visorMesh);

// 相手が持っている銃モデル
const rivalGun = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 0.14, 0.62),
  new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
);
rivalGun.position.set(0.38, 1.15, 0.42);
rivalGroup.add(rivalGun);

// 射撃・オートエイム用の当たり判定
const rivalHitMesh = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.85, 1.25, 6, 10),
  new THREE.MeshBasicMaterial({ visible: false })
);
rivalHitMesh.position.y = 1.1;
rivalGroup.add(rivalHitMesh);

scene.add(rivalGroup);

const SPAWN_POINTS = [
  new THREE.Vector3(0, 2, 52),
  new THREE.Vector3(0, 2, -52),
  new THREE.Vector3(52, 2, 0),
  new THREE.Vector3(-52, 2, 0),
  new THREE.Vector3(44, 6, 44),
  new THREE.Vector3(-44, 6, -44),
];

const rival = {
  pos: new THREE.Vector3(0, 2, -52),
  targetPos: new THREE.Vector3(0, 2, -52),
  vel: new THREE.Vector3(),
  yaw: Math.PI,
  hp: 100,
  maxHp: 100,
  dead: false,
  respawnTimer: 0,
  hitFlashTimer: 0,
  onGround: false,
  jumpCooldown: 0,
  botFireCooldown: 0.8,
  botStrafeDir: 1,
  botStrafeTimer: 1.5,
  weaponKey: "rifle",
};

// ==========================================
// オンライン対戦（PeerJS ルームコード接続）
// ==========================================
const ROOM_PREFIX = "parkourfps-v7-";
const net = {
  mode: "solo", // "solo" | "host" | "client"
  peer: null,
  conn: null,
  connected: false,
  roomCode: "",
  lastSyncSent: 0,
};

function setMpTab(tab) {
  mpTabHost.classList.toggle("active", tab === "host");
  mpTabJoin.classList.toggle("active", tab === "join");
  mpTabSolo.classList.toggle("active", tab === "solo");

  mpHostPanel.classList.toggle("hidden", tab !== "host");
  mpJoinPanel.classList.toggle("hidden", tab !== "join");
  mpSoloPanel.classList.toggle("hidden", tab !== "solo");

  if (!net.connected) {
    net.mode = tab === "solo" ? "solo" : tab;
    updateStartButtonLabel();
  }
}

function updateStartButtonLabel() {
  if (game.over) return;
  if (net.connected) {
    startBtn.textContent = game.elapsed > 0 ? "対戦に戻る" : "友達と対戦スタート！";
  } else if (net.mode === "solo") {
    startBtn.textContent = game.elapsed > 0 ? "再開する" : "対戦スタート（ソロ練習）";
  } else {
    startBtn.textContent = "接続待機中（ソロ練習も可）";
  }
}

function updateScoreAndHpUI() {
  myKillsDisplay.textContent = String(game.myKills);
  enemyKillsDisplay.textContent = String(game.enemyKills);
  targetKillsDisplay.textContent = String(game.targetKills);

  const myHpClamped = Math.max(0, Math.ceil(player.hp));
  myHpDisplay.textContent = String(myHpClamped);
  myHpFill.style.width = `${(myHpClamped / player.maxHp) * 100}%`;
  myHpFill.classList.toggle("low", myHpClamped <= 30);

  const enHpClamped = Math.max(0, Math.ceil(rival.hp));
  enemyHpDisplay.textContent = rival.dead ? "KO" : String(enHpClamped);
  if (enemyHpHudFill) {
    enemyHpHudFill.style.width = `${rival.dead ? 0 : (enHpClamped / rival.maxHp) * 100}%`;
  }

  if (net.connected) {
    enemyTagLabel.textContent = "FRIEND";
    netStatusPill.textContent = `ONLINE #${net.roomCode}`;
    netStatusPill.className = "net-pill online";
  } else {
    enemyTagLabel.textContent = "BOT";
    netStatusPill.textContent = "SOLO練習";
    netStatusPill.className = "net-pill solo";
  }
}

function sendNet(payload) {
  if (net.connected && net.conn && net.conn.open) {
    try {
      net.conn.send(payload);
    } catch {
      // ignore
    }
  }
}

function cleanupPeer() {
  if (net.conn) {
    try { net.conn.close(); } catch {}
    net.conn = null;
  }
  if (net.peer) {
    try { net.peer.destroy(); } catch {}
    net.peer = null;
  }
  net.connected = false;
  updateScoreAndHpUI();
}

function setupConnection(conn, isHost) {
  net.conn = conn;
  conn.on("open", () => {
    net.connected = true;
    net.mode = isHost ? "host" : "client";
    updateScoreAndHpUI();
    updateStartButtonLabel();

    if (isHost) {
      hostStatusText.textContent = "友達が接続しました！対戦を開始します！";
      hostStatusText.className = "mp-status ok";
      const goal = Number(goalKillsSelect.value) || 5;
      game.targetKills = goal;
      sendNet({ type: "start_match", targetKills: goal });
      resetMatch(true);
      startOrResumeGame();
    } else {
      joinStatusText.textContent = "接続成功！対戦を開始します！";
      joinStatusText.className = "mp-status ok";
    }
  });

  conn.on("data", (data) => {
    if (!data || typeof data !== "object") return;

    if (data.type === "start_match") {
      game.targetKills = Number(data.targetKills) || 5;
      goalKillsSelect.value = String(game.targetKills);
      resetMatch(false);
      startOrResumeGame();
    } else if (data.type === "state") {
      rival.targetPos.set(data.x, data.y, data.z);
      rival.yaw = data.yaw || 0;
      rival.hp = typeof data.hp === "number" ? data.hp : rival.hp;
      rival.dead = Boolean(data.dead);
      rival.weaponKey = data.w || "rifle";
      rivalGroup.visible = !rival.dead;
      updateScoreAndHpUI();
    } else if (data.type === "shot") {
      const s = new THREE.Vector3(data.sx, data.sy, data.sz);
      const e = new THREE.Vector3(data.ex, data.ey, data.ez);
      spawnTracer(s, e, data.color || 0xef4444);
    } else if (data.type === "hit") {
      applyDamageToSelf(Number(data.dmg) || 10, data.weaponName || "WEAPON");
    } else if (data.type === "killed") {
      // 相手を撃破した通知を受信
      game.myKills += 1;
      rival.dead = true;
      rival.hp = 0;
      rivalGroup.visible = false;
      playSfx("stun");
      showTrick(`KILL!! (${game.myKills} / ${game.targetKills})`);
      updateScoreAndHpUI();
      if (game.myKills >= game.targetKills) {
        triggerMatchEnd(true);
      }
    } else if (data.type === "respawned") {
      rival.dead = false;
      rival.hp = 100;
      rival.pos.set(data.x, data.y, data.z);
      rival.targetPos.copy(rival.pos);
      rivalGroup.visible = true;
      updateScoreAndHpUI();
    } else if (data.type === "rematch") {
      game.targetKills = Number(data.targetKills) || game.targetKills;
      resetMatch(false);
      startOrResumeGame();
    }
  });

  conn.on("close", () => {
    net.connected = false;
    updateScoreAndHpUI();
    updateStartButtonLabel();
    showTrick("相手の接続が切れました");
  });
}

mpTabHost.addEventListener("click", () => setMpTab("host"));
mpTabJoin.addEventListener("click", () => setMpTab("join"));
mpTabSolo.addEventListener("click", () => {
  cleanupPeer();
  setMpTab("solo");
});

goalKillsSelect.addEventListener("change", () => {
  game.targetKills = Number(goalKillsSelect.value) || 5;
  updateScoreAndHpUI();
});

createRoomBtn.addEventListener("click", () => {
  if (typeof Peer === "undefined") {
    hostStatusText.textContent = "通信ライブラリの読み込みに失敗しました";
    hostStatusText.className = "mp-status err";
    return;
  }
  cleanupPeer();
  const code = String(Math.floor(1000 + Math.random() * 9000));
  net.roomCode = code;
  net.mode = "host";
  hostRoomCodeEl.textContent = code;
  hostStatusText.textContent = "ルームを作成中...";
  hostStatusText.className = "mp-status";

  const peer = new Peer(ROOM_PREFIX + code);
  net.peer = peer;

  peer.on("open", () => {
    hostStatusText.textContent = `待機中... 友達に「${code}」を教えてください`;
    hostStatusText.className = "mp-status ok";
  });

  peer.on("connection", (conn) => {
    setupConnection(conn, true);
  });

  peer.on("error", (err) => {
    hostStatusText.textContent = `エラー: ${err.type}（もう一度お試しください）`;
    hostStatusText.className = "mp-status err";
  });
});

copyCodeBtn.addEventListener("click", () => {
  if (!net.roomCode || net.roomCode === "----") return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(net.roomCode).catch(() => {});
  }
  copyCodeBtn.textContent = "済!";
  setTimeout(() => { copyCodeBtn.textContent = "コピー"; }, 1200);
});

joinRoomBtn.addEventListener("click", () => {
  const code = (joinCodeInput.value || "").trim();
  if (!/^\d{4}$/.test(code)) {
    joinStatusText.textContent = "4桁の数字を入力してください";
    joinStatusText.className = "mp-status err";
    return;
  }
  if (typeof Peer === "undefined") {
    joinStatusText.textContent = "通信ライブラリの読み込みに失敗しました";
    joinStatusText.className = "mp-status err";
    return;
  }
  cleanupPeer();
  net.roomCode = code;
  net.mode = "client";
  joinStatusText.textContent = `部屋 ${code} に接続中...`;
  joinStatusText.className = "mp-status";

  const peer = new Peer();
  net.peer = peer;

  peer.on("open", () => {
    const conn = peer.connect(ROOM_PREFIX + code, { reliable: true });
    setupConnection(conn, false);
  });

  peer.on("error", (err) => {
    joinStatusText.textContent = `接続失敗 (${err.type})。コードを確認してください`;
    joinStatusText.className = "mp-status err";
  });
});

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

  // 対戦FPSステータス
  hp: 100,
  maxHp: 100,
  dead: false,
  respawnTimer: 0,
  damageFlash: 0,
};

const game = {
  active: false,
  over: false,
  elapsed: 0,
  myKills: 0,
  enemyKills: 0,
  targetKills: 5,
};
updateScoreAndHpUI();


// ==========================================
// 通貨・アーマリー・スキンガチャ・2スロット武器システム
// ==========================================
const PROFILE_STORAGE_KEY = "parkour_fps_profile_v8";

// メイン銃カタログ（新銃：バーストSMG・ヘビーマシンガンを追加）
const GUNS = {
  rifle: {
    key: "rifle",
    name: "パルスライフル",
    hudName: "PULSE RIFLE",
    shortName: "RIFLE",
    price: 0,
    desc: "バランス型の連射ライフル（18発 / 威力14）",
    maxAmmo: 18,
    fireRate: 0.13,
    reloadTime: 1.25,
    range: 125,
    pellets: 1,
    spread: 0.008,
    damage: 14,
    defaultColor: 0x38bdf8,
    recoilZ: 0.055,
    recoilPitch: 0.045,
    sfx: "shot_rifle",
  },
  smg: {
    key: "smg",
    name: "ボルトSMG",
    hudName: "VOLT SMG",
    shortName: "SMG",
    price: 110,
    desc: "超高速連射の近〜中距離サブマシンガン（28発 / 威力9）",
    maxAmmo: 28,
    fireRate: 0.075,
    reloadTime: 1.15,
    range: 78,
    pellets: 1,
    spread: 0.022,
    damage: 9,
    defaultColor: 0x22d3ee,
    recoilZ: 0.036,
    recoilPitch: 0.032,
    sfx: "shot_rifle",
  },
  shotgun: {
    key: "shotgun",
    name: "スキャッターショットガン",
    hudName: "SHOTGUN",
    shortName: "SHOTGUN",
    price: 150,
    desc: "7発同時発射の散弾銃（6発 / 威力13×7）",
    maxAmmo: 6,
    fireRate: 0.68,
    reloadTime: 1.5,
    range: 46,
    pellets: 7,
    spread: 0.064,
    damage: 13,
    defaultColor: 0xf97316,
    recoilZ: 0.13,
    recoilPitch: 0.13,
    sfx: "shot_shotgun",
  },
  sniper: {
    key: "sniper",
    name: "レイルスナイパー",
    hudName: "RAIL SNIPER",
    shortName: "SNIPER",
    price: 200,
    desc: "超長距離・高威力ライフル（4発 / 威力65）",
    maxAmmo: 4,
    fireRate: 0.95,
    reloadTime: 1.65,
    range: 185,
    pellets: 1,
    spread: 0.001,
    damage: 65,
    defaultColor: 0xe879f9,
    recoilZ: 0.15,
    recoilPitch: 0.15,
    sfx: "shot_sniper",
  },
  lmg: {
    key: "lmg",
    name: "タイタンLMG",
    hudName: "TITAN LMG",
    shortName: "LMG",
    price: 260,
    desc: "45発の圧倒的弾幕を誇る重機関銃（45発 / 威力11）",
    maxAmmo: 45,
    fireRate: 0.11,
    reloadTime: 1.95,
    range: 115,
    pellets: 1,
    spread: 0.018,
    damage: 11,
    defaultColor: 0xfacc15,
    recoilZ: 0.048,
    recoilPitch: 0.042,
    sfx: "shot_rifle",
  },
};

// 近接武器カタログ（性能は完全共通：威力55 / クールタイム0.48s / リーチ3.6m）
const MELEE_COMMON_STATS = {
  damage: 55,
  attackRate: 0.48,
  range: 3.6,
};

const MELEES = {
  knife: {
    key: "knife",
    name: "コンバットナイフ",
    hudName: "COMBAT KNIFE",
    shortName: "KNIFE",
    price: 0,
    desc: "標準のタクティカルナイフ（近接共通性能: 威力55）",
    defaultColor: 0x34d399,
  },
  karambit: {
    key: "karambit",
    name: "カラムビット",
    hudName: "KARAMBIT",
    shortName: "KARAMBIT",
    price: 160,
    desc: "フィンガーリングと湾曲ブレードが特徴の近接武器（威力55・共通性能）",
    defaultColor: 0xf43f5e,
  },
  katana: {
    key: "katana",
    name: "サイバーカタナ",
    hudName: "CYBER KATANA",
    shortName: "KATANA",
    price: 220,
    desc: "ネオン刃を纏う近未来の日本刀（威力55・共通性能）",
    defaultColor: 0x38bdf8,
  },
  axe: {
    key: "axe",
    name: "プラズマアックス",
    hudName: "PLASMA AXE",
    shortName: "AXE",
    price: 280,
    desc: "エネルギー刃を備えた戦術トマホーク（威力55・共通性能）",
    defaultColor: 0xf59e0b,
  },
};

// スキンカタログ（ガチャ排出限定スキン + 初期スタンダード）
const SKINS = {
  default: {
    key: "default",
    name: "スタンダード",
    rarity: "COMMON",
    bodyColor: 0x1e293b,
    accentColor: null, // 武器固有色を使用
    metalness: 0.65,
    cssColor: "#64748b",
  },
  crimson: {
    key: "crimson",
    name: "クリムゾンレッド",
    rarity: "COMMON",
    bodyColor: 0x450a0a,
    accentColor: 0xef4444,
    metalness: 0.7,
    cssColor: "#ef4444",
  },
  emerald: {
    key: "emerald",
    name: "エメラルドフォレスト",
    rarity: "COMMON",
    bodyColor: 0x064e3b,
    accentColor: 0x10b981,
    metalness: 0.65,
    cssColor: "#10b981",
  },
  arctic: {
    key: "arctic",
    name: "アークティックホワイト",
    rarity: "RARE",
    bodyColor: 0xe2e8f0,
    accentColor: 0x0284c7,
    metalness: 0.55,
    cssColor: "#e2e8f0",
  },
  cyber_cyan: {
    key: "cyber_cyan",
    name: "ネオンシアン",
    rarity: "RARE",
    bodyColor: 0x0f172a,
    accentColor: 0x22d3ee,
    metalness: 0.78,
    cssColor: "#22d3ee",
  },
  violet_void: {
    key: "violet_void",
    name: "ヴォイドパープル",
    rarity: "EPIC",
    bodyColor: 0x2e1065,
    accentColor: 0xc084fc,
    metalness: 0.82,
    cssColor: "#c084fc",
  },
  fade_prism: {
    key: "fade_prism",
    name: "プリズムフェード",
    rarity: "EPIC",
    bodyColor: 0x311042,
    accentColor: 0xf472b6,
    metalness: 0.85,
    cssColor: "#f472b6",
  },
  gold_royal: {
    key: "gold_royal",
    name: "ロイヤルゴールド",
    rarity: "LEGEND",
    bodyColor: 0x78350f,
    accentColor: 0xfde047,
    metalness: 0.92,
    cssColor: "#fde047",
  },
};

const GACHA_POOL = [
  { skin: "crimson", weight: 23 },
  { skin: "emerald", weight: 22 },
  { skin: "arctic", weight: 16 },
  { skin: "cyber_cyan", weight: 16 },
  { skin: "violet_void", weight: 8 },
  { skin: "fade_prism", weight: 8 },
  { skin: "gold_royal", weight: 7 },
];

function createDefaultProfile() {
  return {
    coins: 120, // 初回から1回ガチャや新銃を試せるボーナス
    ownedGuns: ["rifle"],
    ownedMelees: ["knife"],
    ownedSkins: ["default"],
    equippedGun: "rifle",
    equippedMelee: "knife",
    equippedGunSkin: "default",
    equippedMeleeSkin: "default",
  };
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return createDefaultProfile();
    const p = JSON.parse(raw);
    const def = createDefaultProfile();
    return {
      coins: typeof p.coins === "number" ? p.coins : def.coins,
      ownedGuns: Array.isArray(p.ownedGuns) && p.ownedGuns.length ? p.ownedGuns : def.ownedGuns,
      ownedMelees: Array.isArray(p.ownedMelees) && p.ownedMelees.length ? p.ownedMelees : def.ownedMelees,
      ownedSkins: Array.isArray(p.ownedSkins) && p.ownedSkins.length ? p.ownedSkins : def.ownedSkins,
      equippedGun: GUNS[p.equippedGun] ? p.equippedGun : def.equippedGun,
      equippedMelee: MELEES[p.equippedMelee] ? p.equippedMelee : def.equippedMelee,
      equippedGunSkin: SKINS[p.equippedGunSkin] ? p.equippedGunSkin : def.equippedGunSkin,
      equippedMeleeSkin: SKINS[p.equippedMeleeSkin] ? p.equippedMeleeSkin : def.equippedMeleeSkin,
    };
  } catch {
    return createDefaultProfile();
  }
}

let profile = loadProfile();

function saveProfile() {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

function addCoins(amount) {
  profile.coins = Math.max(0, profile.coins + amount);
  saveProfile();
  updateEconomyAndLoadoutUI();
}

const AUTOFIRE_STORAGE_KEY = "parkour_tag_autofire";
let autoFireEnabled = true;
try {
  const savedAuto = localStorage.getItem(AUTOFIRE_STORAGE_KEY);
  if (savedAuto !== null) autoFireEnabled = savedAuto === "true";
} catch {
  // ignore
}

const weaponState = {
  activeSlot: "gun", // "gun" | "melee"
  ammo: GUNS[profile.equippedGun].maxAmmo,
  fireCooldown: 0,
  reloading: false,
  reloadTimer: 0,
  manualFireHeld: false,
  recoilOffset: 0,
  recoilRot: 0,
  meleeSwingTimer: 0,
  bobTime: 0,
  hitmarkerTimer: 0,
  muzzleFlashTimer: 0,
  isAimingOni: false,
};

function updateEconomyAndLoadoutUI() {
  if (hudCoinsDisplay) hudCoinsDisplay.textContent = String(profile.coins);
  if (modalCoinsDisplay) modalCoinsDisplay.textContent = `${profile.coins} CR`;
  if (shopCoinsDisplay) shopCoinsDisplay.textContent = `${profile.coins} CR`;

  const gun = GUNS[profile.equippedGun];
  const melee = MELEES[profile.equippedMelee];
  const gSkin = SKINS[profile.equippedGunSkin];
  const mSkin = SKINS[profile.equippedMeleeSkin];

  if (equippedGunNameEl) equippedGunNameEl.textContent = gun.name;
  if (equippedGunSkinEl) equippedGunSkinEl.textContent = `スキン: ${gSkin.name}`;
  if (equippedMeleeNameEl) equippedMeleeNameEl.textContent = melee.name;
  if (equippedMeleeSkinEl) equippedMeleeSkinEl.textContent = `スキン: ${mSkin.name}`;
}

// 3D ビューモデル（カメラの子要素として右下に配置）
const weaponRoot = new THREE.Group();
const weaponBasePos = new THREE.Vector3(0.28, -0.24, -0.44);
weaponRoot.position.copy(weaponBasePos);
camera.add(weaponRoot);

let muzzlePoint = new THREE.Object3D();
let muzzleFlashMesh = null;

function getEffectiveAccentColor(baseColor, skinKey) {
  const skin = SKINS[skinKey] || SKINS.default;
  return skin.accentColor !== null ? skin.accentColor : baseColor;
}

function buildActiveViewModel() {
  while (weaponRoot.children.length > 0) {
    weaponRoot.remove(weaponRoot.children[0]);
  }
  muzzleFlashMesh = null;

  if (weaponState.activeSlot === "gun") {
    const g = GUNS[profile.equippedGun];
    const skin = SKINS[profile.equippedGunSkin] || SKINS.default;
    const accentHex = getEffectiveAccentColor(g.defaultColor, profile.equippedGunSkin);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: skin.bodyColor,
      roughness: 0.32,
      metalness: skin.metalness,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 0.85,
      roughness: 0.2,
    });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3, metalness: 0.8 });

    if (g.key === "rifle") {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.13, 0.52), bodyMat);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.34, 10), metalMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.025, -0.34);
      const core = new THREE.Mesh(new THREE.BoxGeometry(0.118, 0.035, 0.28), accentMat);
      core.position.set(0, 0.03, -0.05);
      const mag = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.16, 0.08), metalMat);
      mag.position.set(0, -0.11, -0.04);
      mag.rotation.x = 0.22;
      const sight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, 0.09), accentMat);
      sight.position.set(0, 0.085, 0.02);
      weaponRoot.add(body, barrel, core, mag, sight);
      muzzlePoint.position.set(0, 0.025, -0.53);
    } else if (g.key === "smg") {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.13, 0.36), bodyMat);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.22, 10), metalMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.02, -0.24);
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.106, 0.03, 0.24), accentMat);
      rail.position.set(0, 0.055, -0.02);
      const mag = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.20, 0.065), accentMat);
      mag.position.set(0, -0.12, -0.05);
      mag.rotation.x = -0.18;
      weaponRoot.add(body, barrel, rail, mag);
      muzzlePoint.position.set(0, 0.02, -0.38);
    } else if (g.key === "shotgun") {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.48), bodyMat);
      const barrelTop = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.034, 0.36, 10), metalMat);
      barrelTop.rotation.x = Math.PI / 2;
      barrelTop.position.set(0, 0.032, -0.30);
      const barrelBot = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.32, 10), bodyMat);
      barrelBot.rotation.x = Math.PI / 2;
      barrelBot.position.set(0, -0.022, -0.28);
      const pump = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.07, 0.18), accentMat);
      pump.position.set(0, -0.02, -0.24);
      weaponRoot.add(body, barrelTop, barrelBot, pump);
      muzzlePoint.position.set(0, 0.032, -0.50);
    } else if (g.key === "sniper") {
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.12, 0.58), bodyMat);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.62, 10), metalMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.02, -0.50);
      const railL = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.022, 0.50), accentMat);
      railL.position.set(-0.048, 0.02, -0.35);
      const railR = railL.clone();
      railR.position.x = 0.048;
      const scope = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.028, 0.26, 12), metalMat);
      scope.rotation.x = Math.PI / 2;
      scope.position.set(0, 0.105, -0.02);
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.02, 12), accentMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(0, 0.105, -0.155);
      weaponRoot.add(body, barrel, railL, railR, scope, lens);
      muzzlePoint.position.set(0, 0.02, -0.82);
    } else {
      // lmg
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.56), bodyMat);
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.42, 10), metalMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.03, -0.40);
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.12, 14), accentMat);
      drum.rotation.z = Math.PI / 2;
      drum.position.set(0, -0.10, -0.06);
      const topCover = new THREE.Mesh(new THREE.BoxGeometry(0.155, 0.03, 0.34), accentMat);
      topCover.position.set(0, 0.08, -0.04);
      weaponRoot.add(body, barrel, drum, topCover);
      muzzlePoint.position.set(0, 0.03, -0.62);
    }

    muzzleFlashMesh = new THREE.Mesh(
      new THREE.SphereGeometry(g.key === "shotgun" ? 0.095 : 0.065, 8, 8),
      new THREE.MeshBasicMaterial({ color: accentHex, transparent: true, opacity: 0.92 })
    );
    muzzleFlashMesh.position.copy(muzzlePoint.position);
    muzzleFlashMesh.visible = false;
    weaponRoot.add(muzzlePoint, muzzleFlashMesh);
  } else {
    // 近接武器モデル（ナイフ / カラムビット / サイバーカタナ / プラズマアックス）
    const m = MELEES[profile.equippedMelee];
    const skin = SKINS[profile.equippedMeleeSkin] || SKINS.default;
    const accentHex = getEffectiveAccentColor(m.defaultColor, profile.equippedMeleeSkin);

    const gripMat = new THREE.MeshStandardMaterial({
      color: skin.bodyColor,
      roughness: 0.35,
      metalness: skin.metalness,
    });
    const bladeMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 0.78,
      roughness: 0.18,
      metalness: 0.85,
    });

    if (m.key === "knife") {
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.055, 0.16), gripMat);
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.085, 0.022), bladeMat);
      guard.position.set(0, 0, -0.09);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.045, 0.28), bladeMat);
      blade.position.set(0, 0.005, -0.24);
      weaponRoot.add(grip, guard, blade);
    } else if (m.key === "karambit") {
      // カラムビット：フィンガーリング + 湾曲クローブレード
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.034, 0.011, 10, 20), bladeMat);
      ring.rotation.y = Math.PI / 2;
      ring.position.set(0, -0.01, 0.08);

      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.048, 0.14), gripMat);
      handle.rotation.x = 0.24;
      handle.position.set(0, 0.01, -0.01);

      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.044, 0.15), bladeMat);
      blade1.rotation.x = -0.35;
      blade1.position.set(0, -0.015, -0.14);

      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.034, 0.14), bladeMat);
      blade2.rotation.x = -0.88;
      blade2.position.set(0, -0.095, -0.23);

      weaponRoot.add(ring, handle, blade1, blade2);
    } else if (m.key === "katana") {
      const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, 0.24, 10), gripMat);
      hilt.rotation.x = Math.PI / 2.4;
      hilt.position.set(0, -0.04, 0.04);
      const tsuba = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.016, 14), bladeMat);
      tsuba.rotation.x = Math.PI / 2.4;
      tsuba.position.set(0, 0.01, -0.07);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.036, 0.68), bladeMat);
      blade.rotation.x = -0.22;
      blade.position.set(0, 0.11, -0.40);
      weaponRoot.add(hilt, tsuba, blade);
    } else {
      // axe
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 0.54, 10), gripMat);
      shaft.rotation.x = Math.PI / 2.2;
      shaft.position.set(0, -0.02, -0.14);
      const head = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.19, 0.16), bladeMat);
      head.position.set(0, 0.07, -0.34);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.014, 0.24, 0.07), bladeMat);
      edge.position.set(0, 0.07, -0.42);
      weaponRoot.add(shaft, head, edge);
    }
  }
}

const activeTracers = [];
function spawnTracer(startPos, endPos, colorHex) {
  const geo = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
  const mat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.95 });
  const line = new THREE.Line(geo, mat);
  line.frustumCulled = false;
  scene.add(line);
  activeTracers.push({ line, geo, mat, life: 0.11, maxLife: 0.11 });
}

function updateWeaponUI() {
  const isGun = weaponState.activeSlot === "gun";
  const g = GUNS[profile.equippedGun];
  const m = MELEES[profile.equippedMelee];

  if (weaponNameEl) {
    weaponNameEl.textContent = isGun ? g.hudName : m.hudName;
  }

  const ammoRow = ammoDisplay ? ammoDisplay.parentElement : null;
  if (isGun) {
    if (ammoRow) ammoRow.classList.remove("hidden");
    if (ammoDisplay) ammoDisplay.textContent = String(weaponState.ammo);
    if (ammoMaxDisplay) ammoMaxDisplay.textContent = `/ ${g.maxAmmo}`;
    if (reloadStatus) reloadStatus.classList.toggle("hidden", !weaponState.reloading);
    if (meleeReadyBadge) meleeReadyBadge.classList.add("hidden");
    if (btnWeaponLabel) btnWeaponLabel.textContent = m.shortName;
  } else {
    if (ammoRow) ammoRow.classList.add("hidden");
    if (reloadStatus) reloadStatus.classList.add("hidden");
    if (meleeReadyBadge) meleeReadyBadge.classList.remove("hidden");
    if (btnWeaponLabel) btnWeaponLabel.textContent = g.shortName;
  }

  if (autofireBadge) {
    autofireBadge.textContent = autoFireEnabled ? "AUTO" : "MANUAL";
    autofireBadge.classList.toggle("off", !autoFireEnabled);
  }
  if (btnFireSub) {
    btnFireSub.textContent = autoFireEnabled ? "AUTO" : (isGun ? "射撃" : "斬撃");
  }
  if (autofireToggleBtn) {
    autofireToggleBtn.textContent = autoFireEnabled ? "ON" : "OFF";
    autofireToggleBtn.classList.toggle("active", autoFireEnabled);
  }
}

function switchWeaponSlot(slot, showNotice = false) {
  if (slot !== "gun" && slot !== "melee") return;
  if (weaponState.activeSlot === slot && weaponRoot.children.length > 0) {
    updateWeaponUI();
    return;
  }
  weaponState.activeSlot = slot;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  weaponState.fireCooldown = 0.12;
  buildActiveViewModel();
  updateWeaponUI();

  if (showNotice) {
    const label = slot === "gun" ? GUNS[profile.equippedGun].name : MELEES[profile.equippedMelee].name;
    showTrick(`EQUIP: ${label}`);
  }
}

function toggleWeaponSlot(showNotice = true) {
  switchWeaponSlot(weaponState.activeSlot === "gun" ? "melee" : "gun", showNotice);
}

function startReload() {
  if (weaponState.activeSlot !== "gun") return;
  const g = GUNS[profile.equippedGun];
  if (weaponState.reloading || weaponState.ammo >= g.maxAmmo) return;
  weaponState.reloading = true;
  weaponState.reloadTimer = g.reloadTime;
  playSfx("reload");
  updateWeaponUI();
}

function checkAimOnRival(maxRange) {
  if (rival.dead) return false;
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  raycaster.far = maxRange;
  const targets = [...worldMeshes, rivalHitMesh];
  const hits = raycaster.intersectObjects(targets, false);
  return hits.length > 0 && hits[0].object === rivalHitMesh;
}

function dealDamageToRival(totalDmg, weaponShortName) {
  weaponState.hitmarkerTimer = 0.14;
  hitmarker.classList.remove("hidden");
  rival.hitFlashTimer = 0.12;
  playSfx(weaponState.activeSlot === "melee" ? "melee_hit" : "hit");

  if (net.connected) {
    rival.hp = Math.max(1, rival.hp - totalDmg);
    updateScoreAndHpUI();
    sendNet({ type: "hit", dmg: totalDmg, weaponName: weaponShortName });
  } else {
    rival.hp = Math.max(0, rival.hp - totalDmg);
    updateScoreAndHpUI();
    if (rival.hp <= 0 && !rival.dead) {
      rival.dead = true;
      rival.respawnTimer = 2.6;
      rivalGroup.visible = false;
      game.myKills += 1;
      playSfx("stun");
      showTrick(`BOT K.O.!! (${game.myKills} / ${game.targetKills})`);
      updateScoreAndHpUI();
      if (game.myKills >= game.targetKills) {
        triggerMatchEnd(true);
      }
    }
  }
}

function performMeleeAttack() {
  const m = MELEES[profile.equippedMelee];
  weaponState.fireCooldown = MELEE_COMMON_STATS.attackRate;
  weaponState.meleeSwingTimer = 0.22;
  playSfx("melee_swing");

  const accentHex = getEffectiveAccentColor(m.defaultColor, profile.equippedMeleeSkin);
  const eyePos = camera.getWorldPosition(new THREE.Vector3());
  const forward = getLookDirection();

  // 斬撃エフェクトライン
  const slashStart = eyePos.clone().addScaledVector(forward, 0.55).add(new THREE.Vector3(0.22, -0.15, 0));
  const slashEnd = eyePos.clone().addScaledVector(forward, 2.2).add(new THREE.Vector3(-0.22, -0.1, 0));
  spawnTracer(slashStart, slashEnd, accentHex);

  if (checkAimOnRival(MELEE_COMMON_STATS.range)) {
    dealDamageToRival(MELEE_COMMON_STATS.damage, m.shortName);
  }
}

function fireWeapon() {
  if (player.dead) return;
  if (weaponState.reloading || weaponState.fireCooldown > 0) return;

  if (weaponState.activeSlot === "melee") {
    performMeleeAttack();
    return;
  }

  const g = GUNS[profile.equippedGun];
  if (weaponState.ammo <= 0) {
    startReload();
    return;
  }

  const tracerColor = getEffectiveAccentColor(g.defaultColor, profile.equippedGunSkin);
  weaponState.ammo -= 1;
  weaponState.fireCooldown = g.fireRate;
  weaponState.recoilOffset = Math.min(0.2, weaponState.recoilOffset + g.recoilZ);
  weaponState.recoilRot = Math.min(0.28, weaponState.recoilRot + g.recoilPitch);
  weaponState.muzzleFlashTimer = 0.045;
  playSfx(g.sfx);

  const muzzleWorld = new THREE.Vector3();
  muzzlePoint.getWorldPosition(muzzleWorld);

  const targets = rival.dead ? worldMeshes : [...worldMeshes, rivalHitMesh];
  let hitCount = 0;

  for (let p = 0; p < g.pellets; p++) {
    const spreadX = (Math.random() - 0.5) * 2 * g.spread;
    const spreadY = (Math.random() - 0.5) * 2 * g.spread;
    raycaster.setFromCamera(new THREE.Vector2(spreadX, spreadY), camera);
    raycaster.far = g.range;

    const hits = raycaster.intersectObjects(targets, false);
    let endPos;
    if (hits.length > 0) {
      endPos = hits[0].point.clone();
      if (!rival.dead && hits[0].object === rivalHitMesh) {
        hitCount += 1;
      }
    } else {
      endPos = raycaster.ray.origin.clone().addScaledVector(raycaster.ray.direction, g.range);
    }
    spawnTracer(muzzleWorld, endPos, tracerColor);

    if (net.connected) {
      sendNet({
        type: "shot",
        sx: muzzleWorld.x,
        sy: muzzleWorld.y,
        sz: muzzleWorld.z,
        ex: endPos.x,
        ey: endPos.y,
        ez: endPos.z,
        color: tracerColor,
      });
    }
  }

  if (hitCount > 0) {
    dealDamageToRival(g.damage * hitCount, g.shortName);
  }

  if (weaponState.ammo <= 0) {
    startReload();
  } else {
    updateWeaponUI();
  }
}

function updateWeapon(dt) {
  const isGun = weaponState.activeSlot === "gun";
  const g = GUNS[profile.equippedGun];

  // トレーサー更新
  for (let i = activeTracers.length - 1; i >= 0; i--) {
    const tr = activeTracers[i];
    tr.life -= dt;
    if (tr.life <= 0) {
      scene.remove(tr.line);
      tr.geo.dispose();
      tr.mat.dispose();
      activeTracers.splice(i, 1);
    } else {
      tr.mat.opacity = tr.life / tr.maxLife;
    }
  }

  // ヒットマーカー消去
  if (weaponState.hitmarkerTimer > 0) {
    weaponState.hitmarkerTimer -= dt;
    if (weaponState.hitmarkerTimer <= 0) {
      hitmarker.classList.add("hidden");
    }
  }

  // マズルフラッシュ更新
  if (weaponState.muzzleFlashTimer > 0) {
    weaponState.muzzleFlashTimer -= dt;
    if (muzzleFlashMesh && isGun) {
      muzzleFlashMesh.visible = true;
      muzzleFlashMesh.scale.setScalar(0.8 + Math.random() * 0.5);
    }
  } else if (muzzleFlashMesh) {
    muzzleFlashMesh.visible = false;
  }

  // クールタイム・リロード・近接スイング更新
  if (weaponState.fireCooldown > 0) {
    weaponState.fireCooldown = Math.max(0, weaponState.fireCooldown - dt);
  }
  if (weaponState.meleeSwingTimer > 0) {
    weaponState.meleeSwingTimer = Math.max(0, weaponState.meleeSwingTimer - dt);
  }

  if (weaponState.reloading) {
    weaponState.reloadTimer -= dt;
    if (weaponState.reloadTimer <= 0) {
      weaponState.reloading = false;
      weaponState.ammo = g.maxAmmo;
      updateWeaponUI();
    }
  }

  // 照準が相手に合っているか判定（銃・近接のそれぞれの射程で判定）
  const checkRange = isGun ? g.range : MELEE_COMMON_STATS.range;
  const aimingRival = checkAimOnRival(checkRange);
  weaponState.isAimingOni = aimingRival;
  crosshair.classList.toggle("lock-on", aimingRival);

  if (game.active && !game.over && !player.dead) {
    if ((autoFireEnabled && aimingRival) || weaponState.manualFireHeld) {
      fireWeapon();
    }
  }

  // ビューモデルのボビング・リコイル・近接スイングアニメーション
  const horizSpeed = Math.hypot(player.vel.x, player.vel.z);
  if (player.onGround && horizSpeed > 1.0) {
    weaponState.bobTime += dt * Math.min(14, 6 + horizSpeed * 0.45);
  } else {
    weaponState.bobTime += dt * 1.6;
  }
  const bobAmp = player.onGround ? Math.min(0.014, horizSpeed * 0.0011) : 0.004;
  const bobX = Math.cos(weaponState.bobTime) * bobAmp;
  const bobY = Math.abs(Math.sin(weaponState.bobTime)) * bobAmp * 1.2;

  weaponState.recoilOffset += (0 - weaponState.recoilOffset) * Math.min(1, dt * 14);
  weaponState.recoilRot += (0 - weaponState.recoilRot) * Math.min(1, dt * 14);

  if (isGun) {
    const reloadDrop = weaponState.reloading ? -0.14 : 0;
    const reloadTilt = weaponState.reloading ? -0.55 : 0;
    weaponRoot.position.set(
      weaponBasePos.x + bobX,
      weaponBasePos.y - bobY + reloadDrop,
      weaponBasePos.z + weaponState.recoilOffset
    );
    weaponRoot.rotation.set(weaponState.recoilRot + reloadTilt, 0, weaponState.reloading ? 0.25 : 0);
  } else {
    const swingPhase = weaponState.meleeSwingTimer > 0 ? Math.sin((weaponState.meleeSwingTimer / 0.22) * Math.PI) : 0;
    weaponRoot.position.set(
      weaponBasePos.x + bobX - swingPhase * 0.16,
      weaponBasePos.y - bobY - swingPhase * 0.04,
      weaponBasePos.z - swingPhase * 0.14
    );
    weaponRoot.rotation.set(-swingPhase * 0.85, swingPhase * 0.65, swingPhase * 0.45);
  }
}

// ==========================================
// ショップ＆スキンガチャロジック
// ==========================================
let currentShopTab = "guns";

const SHOP_TAB_NOTES = {
  guns: "バトルに持ち込むメイン銃を1つ購入・装備できます。",
  melee: "バトルに持ち込む近接武器を購入・装備できます（すべて共通性能: 威力55）。",
  gacha: "1回 80 CR / 3連 220 CR で銃・近接のスキンを引けます！",
  skins: "ガチャで入手したスキンを「銃」と「近接武器」それぞれに装備できます。",
};

function renderShop() {
  updateEconomyAndLoadoutUI();
  shopTabBtns.forEach((b) => {
    b.classList.toggle("active", b.dataset.shoptab === currentShopTab);
  });
  if (shopTabNote) {
    shopTabNote.textContent = SHOP_TAB_NOTES[currentShopTab] || "";
  }

  if (currentShopTab === "gacha") {
    shopItemsGrid.classList.add("hidden");
    gachaView.classList.remove("hidden");
    gachaPull1Btn.disabled = profile.coins < 80;
    gachaPull3Btn.disabled = profile.coins < 220;
    return;
  }

  gachaView.classList.add("hidden");
  shopItemsGrid.classList.remove("hidden");
  shopItemsGrid.innerHTML = "";

  if (currentShopTab === "guns") {
    for (const g of Object.values(GUNS)) {
      const owned = profile.ownedGuns.includes(g.key);
      const equipped = profile.equippedGun === g.key;
      const card = document.createElement("div");
      card.className = `shop-card${equipped ? " equipped" : ""}`;
      card.innerHTML = `
        <div class="shop-card-header">
          <span class="shop-card-name">${g.name}</span>
          <span class="skin-swatch" style="background:#${g.defaultColor.toString(16).padStart(6, "0")};"></span>
        </div>
        <div class="shop-card-desc">${g.desc}</div>
      `;
      const btn = document.createElement("button");
      btn.type = "button";
      if (equipped) {
        btn.className = "shop-card-btn equipped";
        btn.textContent = "装備中";
        btn.disabled = true;
      } else if (owned) {
        btn.className = "shop-card-btn equip";
        btn.textContent = "装備する";
        btn.addEventListener("click", () => {
          profile.equippedGun = g.key;
          weaponState.ammo = g.maxAmmo;
          weaponState.reloading = false;
          saveProfile();
          buildActiveViewModel();
          updateWeaponUI();
          renderShop();
        });
      } else {
        btn.className = "shop-card-btn buy";
        btn.textContent = `購入する (${g.price} CR)`;
        btn.disabled = profile.coins < g.price;
        btn.addEventListener("click", () => {
          if (profile.coins < g.price) return;
          profile.coins -= g.price;
          profile.ownedGuns.push(g.key);
          profile.equippedGun = g.key;
          weaponState.ammo = g.maxAmmo;
          weaponState.reloading = false;
          playSfx("stun");
          saveProfile();
          buildActiveViewModel();
          updateWeaponUI();
          renderShop();
        });
      }
      card.appendChild(btn);
      shopItemsGrid.appendChild(card);
    }
  } else if (currentShopTab === "melee") {
    for (const m of Object.values(MELEES)) {
      const owned = profile.ownedMelees.includes(m.key);
      const equipped = profile.equippedMelee === m.key;
      const card = document.createElement("div");
      card.className = `shop-card${equipped ? " equipped" : ""}`;
      card.innerHTML = `
        <div class="shop-card-header">
          <span class="shop-card-name">${m.name}</span>
          <span class="skin-swatch" style="background:#${m.defaultColor.toString(16).padStart(6, "0")};"></span>
        </div>
        <div class="shop-card-desc">${m.desc}</div>
      `;
      const btn = document.createElement("button");
      btn.type = "button";
      if (equipped) {
        btn.className = "shop-card-btn equipped";
        btn.textContent = "装備中";
        btn.disabled = true;
      } else if (owned) {
        btn.className = "shop-card-btn equip";
        btn.textContent = "装備する";
        btn.addEventListener("click", () => {
          profile.equippedMelee = m.key;
          saveProfile();
          buildActiveViewModel();
          updateWeaponUI();
          renderShop();
        });
      } else {
        btn.className = "shop-card-btn buy";
        btn.textContent = `購入する (${m.price} CR)`;
        btn.disabled = profile.coins < m.price;
        btn.addEventListener("click", () => {
          if (profile.coins < m.price) return;
          profile.coins -= m.price;
          profile.ownedMelees.push(m.key);
          profile.equippedMelee = m.key;
          playSfx("stun");
          saveProfile();
          buildActiveViewModel();
          updateWeaponUI();
          renderShop();
        });
      }
      card.appendChild(btn);
      shopItemsGrid.appendChild(card);
    }
  } else if (currentShopTab === "skins") {
    for (const s of Object.values(SKINS)) {
      const owned = profile.ownedSkins.includes(s.key);
      const eqGun = profile.equippedGunSkin === s.key;
      const eqMelee = profile.equippedMeleeSkin === s.key;
      const card = document.createElement("div");
      card.className = `shop-card${eqGun || eqMelee ? " equipped" : ""}`;
      card.innerHTML = `
        <div class="shop-card-header">
          <span class="shop-card-name">${s.name} <small style="color:#94a3b8;">[${s.rarity}]</small></span>
          <span class="skin-swatch" style="background:${s.cssColor};"></span>
        </div>
        <div class="shop-card-desc">${owned ? "所持済み：銃・近接どちらにも適用可能" : "スキンガチャで入手できます"}</div>
      `;

      if (!owned) {
        const lockBtn = document.createElement("button");
        lockBtn.type = "button";
        lockBtn.className = "shop-card-btn locked-gacha";
        lockBtn.textContent = "未所持（ガチャ限定）";
        lockBtn.disabled = true;
        card.appendChild(lockBtn);
      } else {
        const row = document.createElement("div");
        row.style.display = "grid";
        row.style.gridTemplateColumns = "1fr 1fr";
        row.style.gap = "5px";

        const gunBtn = document.createElement("button");
        gunBtn.type = "button";
        gunBtn.className = `shop-card-btn ${eqGun ? "equipped" : "equip"}`;
        gunBtn.textContent = eqGun ? "銃:装備中" : "銃に装備";
        gunBtn.disabled = eqGun;
        gunBtn.addEventListener("click", () => {
          profile.equippedGunSkin = s.key;
          saveProfile();
          buildActiveViewModel();
          renderShop();
        });

        const meleeBtn = document.createElement("button");
        meleeBtn.type = "button";
        meleeBtn.className = `shop-card-btn ${eqMelee ? "equipped" : "equip"}`;
        meleeBtn.textContent = eqMelee ? "近接:装備中" : "近接に装備";
        meleeBtn.disabled = eqMelee;
        meleeBtn.addEventListener("click", () => {
          profile.equippedMeleeSkin = s.key;
          saveProfile();
          buildActiveViewModel();
          renderShop();
        });

        row.append(gunBtn, meleeBtn);
        card.appendChild(row);
      }
      shopItemsGrid.appendChild(card);
    }
  }
}

function rollSingleSkin() {
  const totalWeight = GACHA_POOL.reduce((acc, item) => acc + item.weight, 0);
  let r = Math.random() * totalWeight;
  let chosenKey = GACHA_POOL[0].skin;
  for (const item of GACHA_POOL) {
    r -= item.weight;
    if (r <= 0) {
      chosenKey = item.skin;
      break;
    }
  }
  const skin = SKINS[chosenKey];
  const isDuplicate = profile.ownedSkins.includes(chosenKey);
  if (isDuplicate) {
    profile.coins += 40;
  } else {
    profile.ownedSkins.push(chosenKey);
  }
  return { skin, isDuplicate };
}

function executeGacha(count, cost) {
  if (profile.coins < cost) return;
  profile.coins -= cost;
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(rollSingleSkin());
  }
  saveProfile();
  playSfx("stun");
  renderShop();

  gachaResultBox.innerHTML = "";
  for (const res of results) {
    const row = document.createElement("div");
    row.className = `gacha-drop-row ${res.skin.rarity}`;
    row.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="skin-swatch" style="background:${res.skin.cssColor};"></span>
        <strong>${res.skin.name}</strong>
      </div>
      <div>
        <span class="gacha-drop-tag">${res.skin.rarity}</span>
        <span style="font-size:0.72rem;margin-left:6px;color:${res.isDuplicate ? "#fde047" : "#4ade80"};">
          ${res.isDuplicate ? "重複 (+40 CR還元)" : "NEW! 獲得"}
        </span>
      </div>
    `;
    gachaResultBox.appendChild(row);
  }
}

if (openShopBtn) {
  openShopBtn.addEventListener("click", () => {
    currentShopTab = "guns";
    renderShop();
    shopOverlay.classList.remove("hidden");
  });
}

if (closeShopBtn) {
  closeShopBtn.addEventListener("click", () => {
    shopOverlay.classList.add("hidden");
  });
}

shopTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentShopTab = btn.dataset.shoptab;
    renderShop();
  });
});

if (gachaPull1Btn) {
  gachaPull1Btn.addEventListener("click", () => executeGacha(1, 80));
}
if (gachaPull3Btn) {
  gachaPull3Btn.addEventListener("click", () => executeGacha(3, 220));
}

if (autofireToggleBtn) {
  autofireToggleBtn.addEventListener("click", () => {
    autoFireEnabled = !autoFireEnabled;
    try {
      localStorage.setItem(AUTOFIRE_STORAGE_KEY, String(autoFireEnabled));
    } catch {
      // ignore
    }
    updateWeaponUI();
  });
}

// 初期モデル・UI構築
buildActiveViewModel();
updateWeaponUI();
updateEconomyAndLoadoutUI();

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
  if (e.code === "Digit1") switchWeaponSlot("gun", true);
  if (e.code === "Digit2") switchWeaponSlot("melee", true);
  if (e.code === "KeyR") {
    if (game.active && !game.over) {
      startReload();
    } else if (game.over) {
      resetMatch();
    }
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

window.addEventListener("mousedown", (e) => {
  if (!game.active || controlMode !== "pc") return;
  if (e.button === 0) {
    weaponState.manualFireHeld = true;
    fireWeapon();
  }
  if (e.button === 2) {
    triggerGrapple();
  }
});
window.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    weaponState.manualFireHeld = false;
  }
});
window.addEventListener("wheel", (e) => {
  if (!game.active || controlMode !== "pc") return;
  if (Math.abs(e.deltaY) > 4) {
    toggleWeaponSlot(true);
  }
}, { passive: true });
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

btnFire.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    weaponState.manualFireHeld = true;
    fireWeapon();
    btnFire.classList.add("pressed");
  },
  { passive: false }
);
function endFireTouch() {
  weaponState.manualFireHeld = false;
  btnFire.classList.remove("pressed");
}
btnFire.addEventListener("touchend", endFireTouch);
btnFire.addEventListener("touchcancel", endFireTouch);

btnWeapon.addEventListener(
  "touchstart",
  (e) => {
    if (isEditingLayout) return;
    e.preventDefault();
    e.stopPropagation();
    if (!game.active) return;
    toggleWeaponSlot(true);
    btnWeapon.classList.add("pressed");
  },
  { passive: false }
);
btnWeapon.addEventListener("touchend", () => btnWeapon.classList.remove("pressed"));
btnWeapon.addEventListener("touchcancel", () => btnWeapon.classList.remove("pressed"));

// ==========================================
// 開始・停止・リトライ管理
// ==========================================
function pauseGame() {
  game.active = false;
  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  weaponState.manualFireHeld = false;
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
    resetMatch(true);
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
  resetMatch(true);
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

function getSpawnPoint(preferFarFromEnemy = false) {
  if (!preferFarFromEnemy) {
    return SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)].clone();
  }
  let bestSp = SPAWN_POINTS[0];
  let bestDist = -1;
  for (const sp of SPAWN_POINTS) {
    const d = sp.distanceTo(rival.pos);
    if (d > bestDist) {
      bestDist = d;
      bestSp = sp;
    }
  }
  return bestSp.clone();
}

function respawnSelf() {
  const sp = getSpawnPoint(true);
  player.pos.copy(sp);
  player.vel.set(0, 0, 0);
  player.hp = player.maxHp;
  player.dead = false;
  player.respawnTimer = 0;
  player.isSliding = false;
  player.isWallRunning = false;
  player.isGrappling = false;
  player.isZiplining = false;
  wireLine.visible = false;
  respawnBanner.classList.add("hidden");

  weaponState.ammo = GUNS[profile.equippedGun].maxAmmo;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  updateWeaponUI();
  updateScoreAndHpUI();

  if (net.connected) {
    sendNet({ type: "respawned", x: player.pos.x, y: player.pos.y, z: player.pos.z });
  }
}

function applyDamageToSelf(dmg, weaponName = "WEAPON") {
  if (player.dead || game.over) return;
  player.hp = Math.max(0, player.hp - dmg);
  player.damageFlash = 0.35;
  playSfx("hit");
  updateScoreAndHpUI();

  if (player.hp <= 0) {
    player.dead = true;
    player.respawnTimer = 3.0;
    player.vel.set(0, 0, 0);
    player.isGrappling = false;
    player.isZiplining = false;
    wireLine.visible = false;
    weaponState.manualFireHeld = false;
    game.enemyKills += 1;
    playSfx("caught");
    respawnBanner.classList.remove("hidden");
    respawnTimerDisplay.textContent = "3.0";
    updateScoreAndHpUI();

    if (net.connected) {
      sendNet({ type: "killed" });
    }

    if (game.enemyKills >= game.targetKills) {
      triggerMatchEnd(false);
    }
  }
}

function resetMatch(broadcast = false) {
  const isClient = net.connected && net.mode === "client";
  const myStart = isClient ? SPAWN_POINTS[1].clone() : SPAWN_POINTS[0].clone();
  const enemyStart = isClient ? SPAWN_POINTS[0].clone() : SPAWN_POINTS[1].clone();

  player.pos.copy(myStart);
  player.vel.set(0, 0, 0);
  player.yaw = isClient ? Math.PI : 0;
  player.pitch = 0;
  player.hp = player.maxHp;
  player.dead = false;
  player.respawnTimer = 0;
  player.damageFlash = 0;
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
  respawnBanner.classList.add("hidden");

  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  weaponState.manualFireHeld = false;

  rival.pos.copy(enemyStart);
  rival.targetPos.copy(enemyStart);
  rival.vel.set(0, 0, 0);
  rival.hp = rival.maxHp;
  rival.dead = false;
  rival.respawnTimer = 0;
  rival.hitFlashTimer = 0;
  rival.botFireCooldown = 1.0;
  rivalGroup.visible = true;
  rivalGroup.position.copy(enemyStart);

  weaponState.ammo = GUNS[profile.equippedGun].maxAmmo;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  weaponState.fireCooldown = 0;
  updateWeaponUI();

  game.elapsed = 0;
  game.over = false;
  game.myKills = 0;
  game.enemyKills = 0;
  updateScoreAndHpUI();

  if (broadcast && net.connected) {
    sendNet({ type: "rematch", targetKills: game.targetKills });
  }
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
// 対戦相手（オンライン同期 / ソロ練習BOT）の更新
// ==========================================
function updateRival(dt) {
  if (rival.hitFlashTimer > 0) {
    rival.hitFlashTimer = Math.max(0, rival.hitFlashTimer - dt);
    rivalBody.material.color.setHex(0xffffff);
    rivalBody.material.emissive.setHex(0xf59e0b);
  } else {
    rivalBody.material.color.setHex(net.connected ? 0xf97316 : 0xef4444);
    rivalBody.material.emissive.setHex(0x991b1b);
  }

  if (net.connected) {
    // オンライン対戦：滑らかに相手の位置・向きを補間
    rival.pos.lerp(rival.targetPos, Math.min(1, dt * 18));
    rivalGroup.position.copy(rival.pos);
    rivalGroup.rotation.y = rival.yaw + Math.PI;
    rivalGroup.visible = !rival.dead;
  } else {
    // ソロ練習BOT：移動＆一定間隔で射撃してくる
    if (rival.dead) {
      rival.respawnTimer -= dt;
      if (rival.respawnTimer <= 0) {
        const sp = SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)];
        rival.pos.copy(sp);
        rival.vel.set(0, 0, 0);
        rival.hp = rival.maxHp;
        rival.dead = false;
        rivalGroup.visible = true;
        updateScoreAndHpUI();
      }
    } else {
      const toPlayer = new THREE.Vector3(player.pos.x - rival.pos.x, 0, player.pos.z - rival.pos.z);
      const distHoriz = toPlayer.length();
      if (distHoriz > 0.01) toPlayer.divideScalar(distHoriz);

      rival.botStrafeTimer -= dt;
      if (rival.botStrafeTimer <= 0) {
        rival.botStrafeDir *= -1;
        rival.botStrafeTimer = 1.2 + Math.random() * 1.4;
      }

      const strafe = new THREE.Vector3(-toPlayer.z * rival.botStrafeDir, 0, toPlayer.x * rival.botStrafeDir);
      const approach = distHoriz > 24 ? 1 : distHoriz < 12 ? -0.6 : 0.15;
      const botSpeed = 9.2;

      rival.vel.x = (toPlayer.x * approach + strafe.x * 0.85) * botSpeed;
      rival.vel.z = (toPlayer.z * approach + strafe.z * 0.85) * botSpeed;
      rival.vel.y -= CONFIG.gravity * dt;

      if (rival.jumpCooldown > 0) rival.jumpCooldown -= dt;
      const prevX = rival.pos.x;
      const prevZ = rival.pos.z;

      rival.pos.x += rival.vel.x * dt;
      rival.pos.y += rival.vel.y * dt;
      rival.pos.z += rival.vel.z * dt;

      const col = resolveCollisions(rival.pos, rival.vel, 0.6, 1.9, dt);
      rival.onGround = col.onGround;

      for (const pad of jumpPads) {
        const dx = rival.pos.x - pad.x;
        const dz = rival.pos.z - pad.z;
        if (dx * dx + dz * dz < pad.radius * pad.radius && Math.abs(rival.pos.y - pad.y) < 1.2) {
          rival.vel.y = pad.force * 0.9;
          rival.onGround = false;
        }
      }

      const moved = Math.hypot(rival.pos.x - prevX, rival.pos.z - prevZ);
      if (rival.onGround && rival.jumpCooldown <= 0 && (moved < botSpeed * dt * 0.35 || Math.random() < 0.012)) {
        rival.vel.y = 11.4;
        rival.jumpCooldown = 0.9;
      }

      rivalGroup.position.copy(rival.pos);
      rivalGroup.lookAt(player.pos.x, rival.pos.y, player.pos.z);

      // BOTの射撃（遮蔽物チェック付き）
      if (!player.dead && distHoriz < 55) {
        rival.botFireCooldown -= dt;
        if (rival.botFireCooldown <= 0) {
          rival.botFireCooldown = 0.72 + Math.random() * 0.45;
          const botEye = rival.pos.clone().add(new THREE.Vector3(0, 1.4, 0));
          const playerTarget = player.pos.clone().add(new THREE.Vector3(0, 1.1, 0));
          const dir = playerTarget.clone().sub(botEye);
          const d = dir.length();
          dir.normalize();
          raycaster.set(botEye, dir);
          raycaster.far = d;
          const wallHits = raycaster.intersectObjects(worldMeshes, false);
          if (wallHits.length === 0) {
            const hitPlayer = Math.random() < 0.42;
            const endPt = hitPlayer
              ? playerTarget
              : playerTarget.clone().add(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 3));
            spawnTracer(botEye, endPt, 0xef4444);
            if (hitPlayer) {
              applyDamageToSelf(11, "BOT RIFLE");
            }
          }
        }
      }
    }
  }

  const totalDist = rival.pos.distanceTo(player.pos);
  distDisplay.textContent = rival.dead ? "--" : totalDist.toFixed(1);
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
  const ox = toMapX(rival.pos.x);
  const oy = toMapY(rival.pos.z);
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

function triggerMatchEnd(isWin) {
  game.over = true;
  game.active = false;
  wireLine.visible = false;
  respawnBanner.classList.add("hidden");
  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  weaponState.manualFireHeld = false;
  playSfx(isWin ? "stun" : "caught");

  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  const rewardCr = isWin ? (net.connected ? 100 : 40) : (net.connected ? 20 : 10);
  addCoins(rewardCr);

  modalTitle.textContent = isWin ? "VICTORY!! 勝利！" : "DEFEAT... 敗北";
  modalDesc.innerHTML =
    `最終スコア: <strong>YOU ${game.myKills} - ${game.enemyKills} ${net.connected ? "FRIEND" : "BOT"}</strong><br />` +
    `バトル報酬: <strong style="color:#fde047;">+${rewardCr} CR</strong> 獲得！（ショップやガチャで使えます）`;
  startBtn.textContent = "もう一度対戦する";
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

  if (player.damageFlash > 0) {
    player.damageFlash = Math.max(0, player.damageFlash - dt);
    damageVignette.style.opacity = String((player.damageFlash / 0.35) * 0.9);
  } else {
    damageVignette.style.opacity = "0";
  }

  if (game.active && !game.over) {
    game.elapsed += dt;
    if (player.dead) {
      player.respawnTimer -= dt;
      respawnTimerDisplay.textContent = Math.max(0, player.respawnTimer).toFixed(1);
      if (player.respawnTimer <= 0) {
        respawnSelf();
      }
    } else {
      updatePlayer(dt);
    }
    updateRival(dt);
    updateWeapon(dt);

    // オンライン対戦中は自分の座標・向き・HPを約30fpsで送信
    if (net.connected && now - net.lastSyncSent > 33) {
      net.lastSyncSent = now;
      sendNet({
        type: "state",
        x: player.pos.x,
        y: player.pos.y,
        z: player.pos.z,
        yaw: player.yaw,
        hp: player.hp,
        dead: player.dead,
        w: weaponState.activeSlot,
      });
    }
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
