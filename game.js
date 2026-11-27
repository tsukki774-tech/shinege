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
const targetKillsDisplay = document.getElementById("target-kills-display");
const netStatusPill = document.getElementById("net-status-pill");
const ffaScoreboard = document.getElementById("ffa-scoreboard");
const myHpDisplay = document.getElementById("my-hp-display");
const myHpFill = document.getElementById("my-hp-fill");
const enemyHpHudLabel = document.getElementById("enemy-hp-hud-label");
const enemyHpHudFill = document.getElementById("enemy-hp-hud-fill");
const altDisplay = document.getElementById("alt-display");
const damageVignette = document.getElementById("damage-vignette");
const respawnBanner = document.getElementById("respawn-banner");
const respawnTimerDisplay = document.getElementById("respawn-timer-display");
const forceRespawnBtn = document.getElementById("force-respawn-btn");
const matchFinishBanner = document.getElementById("match-finish-banner");
const confettiLayer = document.getElementById("confetti-layer");
const finishKicker = document.getElementById("finish-kicker");
const finishMainTitle = document.getElementById("finish-main-title");
const finishScoreLine = document.getElementById("finish-score-line");
const finishRewardLine = document.getElementById("finish-reward-line");
const modalBox = overlay ? overlay.querySelector(".modal") : null;

const goalKillsSelect = document.getElementById("goal-kills-select");
const playerCountSelect = document.getElementById("player-count-select");
const soloModeDesc = document.getElementById("solo-mode-desc");
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
const valKillBanner = document.getElementById("val-kill-banner");
const valKillMark = document.getElementById("val-kill-mark");
const valKillTitle = document.getElementById("val-kill-title");
const valKillSub = document.getElementById("val-kill-sub");
const mapSelect = document.getElementById("map-select");
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
const btnSkillLabel = document.getElementById("btn-skill-label");
const pcSkillName = document.getElementById("pc-skill-name");
const hudCharPill = document.getElementById("hud-char-pill");
const hudCharName = document.getElementById("hud-char-name");
const skillActiveBanner = document.getElementById("skill-active-banner");
const characterGrid = document.getElementById("character-grid");
const selectedCharDetail = document.getElementById("selected-char-detail");
const charDetailName = document.getElementById("char-detail-name");
const charDetailSkillBadge = document.getElementById("char-detail-skill-badge");
const charDetailDesc = document.getElementById("char-detail-desc");
const btnGrappleCd = document.getElementById("btn-grapple-cd");
const btnZip = document.getElementById("btn-zip");
const btnFire = document.getElementById("btn-fire");
const btnFireSub = document.getElementById("btn-fire-sub");
const btnWeapon = document.getElementById("btn-weapon");
const btnWeaponLabel = document.getElementById("btn-weapon-label");
const btnInspect = document.getElementById("btn-inspect");
const btnReload = document.getElementById("btn-reload");
const hudReloadBtn = document.getElementById("hud-reload-btn");

const layoutEditorBar = document.getElementById("layout-editor-bar");
const layoutResetBtn = document.getElementById("layout-reset-btn");
const layoutSaveBtn = document.getElementById("layout-save-btn");

// ==========================================
// キャラコン調整パラメータ
// ==========================================
const CONFIG = {
  gravity: 28,
  baseSpeed: 10.8,
  maxSpeed: 34.0,
  groundAccel: 78,
  airAccel: 32,
  groundFriction: 9.0,
  slideFriction: 0.36,
  jumpForce: 11.6,
  slideBoost: 21.8,
  slideDuration: 1.28,
  slideCooldown: 0.22,
  wallRunGravity: 4.2,
  wallRunSpeed: 14.2,
  wallJumpUp: 11.8,
  wallJumpPush: 13.5,
  jumpPadForce: 24.5,
  boostPadSpeed: 25.5,
  dashSpeed: 25.0,
  dashDuration: 0.22,
  dashCooldown: 2.5,
  grappleRange: 96,
  grapplePullSpeed: 33.5,
  grappleMaxTime: 1.45,
  grappleCooldown: 2.8,
  ziplineSpeed: 29.0,
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
// キャラクター定義（4キャラ＆固有スキル・ワイヤーはHOOK固有スキル）
// ==========================================
const CHARACTERS = {
  hook: {
    id: "hook",
    name: "HOOK",
    fullName: "HOOK（フック）",
    role: "GRAPPLER",
    cssColor: "#38bdf8",
    bodyColor: 0x0284c7,
    emissiveColor: 0x0369a1,
    visorColor: 0x7dd3fc,
    maxHp: 100,
    speedMult: 1.04,
    slideBoostAdd: 0,
    meleeBonus: 0,
    skillName: "ワイヤーグラップル",
    skillShort: "WIRE",
    skillCooldown: 2.8,
    desc: "固有スキル【ワイヤーグラップル】で建物やタワーへワイヤーを射出し、高速スイング＆スリングショット移動する。",
  },
  blitz: {
    id: "blitz",
    name: "BLITZ",
    fullName: "BLITZ（ブリッツ）",
    role: "SPEEDSTER",
    cssColor: "#facc15",
    bodyColor: 0xd97706,
    emissiveColor: 0x92400e,
    visorColor: 0xfef08a,
    maxHp: 100,
    speedMult: 1.12,
    slideBoostAdd: 3.5,
    meleeBonus: 0,
    skillName: "オーバードライブ",
    skillShort: "BOOST",
    skillCooldown: 9.0,
    desc: "スライディング強化パッシブ持ち。固有スキル【オーバードライブ】で5秒間、移動速度・連射速度・リロード速度を超加速する。",
  },
  vanguard: {
    id: "vanguard",
    name: "VANGUARD",
    fullName: "VANGUARD（ヴァンガード）",
    role: "DEFENDER",
    cssColor: "#34d399",
    bodyColor: 0x059669,
    emissiveColor: 0x065f46,
    visorColor: 0x6ee7b7,
    maxHp: 135,
    speedMult: 0.96,
    slideBoostAdd: 0,
    meleeBonus: 0,
    skillName: "イージスバリア",
    skillShort: "SHIELD",
    skillCooldown: 10.0,
    desc: "最大HP135の重装ファイター。固有スキル【イージスバリア】でHPを30即時回復し、4秒間受けるダメージを75%軽減する。",
  },
  spectre: {
    id: "spectre",
    name: "SPECTRE",
    fullName: "SPECTRE（スペクター）",
    role: "ASSASSIN",
    cssColor: "#c084fc",
    bodyColor: 0x7e22ce,
    emissiveColor: 0x581c87,
    visorColor: 0xf0abfc,
    maxHp: 95,
    speedMult: 1.08,
    slideBoostAdd: 1.5,
    meleeBonus: 20,
    skillName: "シャドウステップ",
    skillShort: "BLINK",
    skillCooldown: 7.5,
    desc: "近接攻撃威力+20（計75）のアサシン。固有スキル【シャドウステップ】で視線方向へ18m瞬間転移し、2.5秒間ステルス化する。",
  },
  pyro: {
    id: "pyro",
    name: "PYRO",
    fullName: "PYRO（パイロ）",
    role: "BLASTER",
    cssColor: "#fb923c",
    bodyColor: 0xea580c,
    emissiveColor: 0x9a3412,
    visorColor: 0xfed7aa,
    maxHp: 110,
    speedMult: 1.03,
    slideBoostAdd: 1.0,
    meleeBonus: 5,
    skillName: "サーマルノヴァ",
    skillShort: "NOVA",
    skillCooldown: 8.5,
    desc: "周囲14mの敵に衝撃波ダメージ(35)＆ノックバックを与え、自身の弾薬を即時フル装填する爆発アタッカー。",
  },
  titan: {
    id: "titan",
    name: "TITAN",
    fullName: "TITAN（タイタン）",
    role: "JUGGERNAUT",
    cssColor: "#fb7185",
    bodyColor: 0xe11d48,
    emissiveColor: 0x881337,
    visorColor: 0xfecdd3,
    maxHp: 150,
    speedMult: 0.94,
    slideBoostAdd: 0,
    meleeBonus: 10,
    skillName: "バーサークラッシュ",
    skillShort: "RAGE",
    skillCooldown: 9.5,
    desc: "最大HP150の超重装型。固有スキル【バーサークラッシュ】で4.5秒間、移動速度とリロード速度が大幅上昇しHPを20回復する。",
  },
};

const CHAR_ORDER = ["hook", "blitz", "vanguard", "spectre", "pyro", "titan"];
let selectedCharKey = localStorage.getItem("parkour_fps_character") || "hook";
if (!CHARACTERS[selectedCharKey]) selectedCharKey = "hook";

function getSelectedChar() {
  return CHARACTERS[selectedCharKey] || CHARACTERS.hook;
}

function getLoadout() {
  const ch = getSelectedChar();
  return {
    dash: true,
    grapple: ch.id === "hook",
    zipline: true,
  };
}

function renderCharacterSelector() {
  const activeCh = getSelectedChar();
  if (characterGrid) {
    characterGrid.innerHTML = "";
    for (const key of CHAR_ORDER) {
      const ch = CHARACTERS[key];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "char-card" + (key === selectedCharKey ? " active" : "");
      btn.style.setProperty("--char-color", ch.cssColor);
      btn.innerHTML =
        `<div class="char-card-role">${ch.role}</div>` +
        `<div class="char-card-name">${ch.name}</div>` +
        `<div class="char-card-skill">⚡ ${ch.skillName}</div>` +
        `<div class="char-card-hp">HP ${ch.maxHp} / 速度 ${Math.round(ch.speedMult * 100)}%</div>`;
      btn.addEventListener("click", () => {
        selectedCharKey = key;
        try {
          localStorage.setItem("parkour_fps_character", selectedCharKey);
        } catch {}
        applyCharacterStatsToPlayer(true);
        applyLoadoutUI();
        renderCharacterSelector();
      });
      characterGrid.appendChild(btn);
    }
  }
  if (selectedCharDetail) {
    selectedCharDetail.style.setProperty("--char-color", activeCh.cssColor);
  }
  if (charDetailName) {
    charDetailName.textContent = activeCh.fullName;
  }
  if (charDetailSkillBadge) {
    charDetailSkillBadge.textContent = `固有スキル: ${activeCh.skillName} (CD ${activeCh.skillCooldown}s)`;
    charDetailSkillBadge.style.setProperty("--char-color", activeCh.cssColor);
  }
  if (charDetailDesc) {
    charDetailDesc.textContent = activeCh.desc;
  }
}

function applyCharacterStatsToPlayer(refillHp = false) {
  const ch = getSelectedChar();
  player.maxHp = ch.maxHp;
  if (refillHp || player.hp > player.maxHp) {
    player.hp = player.maxHp;
  }
  if (hudCharName) {
    hudCharName.textContent = ch.name;
    hudCharName.style.color = ch.cssColor;
  }
  if (btnSkillLabel) {
    btnSkillLabel.textContent = ch.skillShort;
  }
  if (pcSkillName) {
    pcSkillName.textContent = ch.skillShort;
  }
  if (btnGrapple) {
    btnGrapple.classList.remove("skill-hook", "skill-blitz", "skill-vanguard", "skill-spectre", "skill-pyro", "skill-titan");
    btnGrapple.classList.add(`skill-${ch.id}`);
  }
  updateScoreAndHpUI();
}

function applyLoadoutUI() {
  const ch = getSelectedChar();
  btnDash.classList.remove("hidden");
  btnGrapple.classList.remove("hidden");
  btnZip.classList.remove("hidden");

  pcDashChip.classList.remove("hidden");
  pcGrappleChip.classList.remove("hidden");
  pcZipChip.classList.remove("hidden");

  if (btnSkillLabel) btnSkillLabel.textContent = ch.skillShort;
  if (pcSkillName) pcSkillName.textContent = ch.skillShort;
  if (hudCharName) {
    hudCharName.textContent = ch.name;
    hudCharName.style.color = ch.cssColor;
  }
}

renderCharacterSelector();

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
  inspect: { xPct: 0.55, yPct: 0.84 },
  reload: { xPct: 0.66, yPct: 0.46 },
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
  if (btnInspect) positionElementByPct(btnInspect, buttonLayout.inspect.xPct, buttonLayout.inspect.yPct, 1.0);
  if (btnReload) positionElementByPct(btnReload, buttonLayout.reload.xPct, buttonLayout.reload.yPct, 1.0);
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
if (btnInspect) attachDraggable(btnInspect, "inspect", 1.0);
if (btnReload) attachDraggable(btnReload, "reload", 1.0);
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
  } else if (type === "victory") {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "triangle";
      const st = t + idx * 0.085;
      o.frequency.setValueAtTime(freq, st);
      g.gain.setValueAtTime(0.001, st);
      g.gain.linearRampToValueAtTime(0.16, st + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, st + 0.42);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(st);
      o.stop(st + 0.44);
    });
    return;
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


let valKillTimer = 0;
let valStreakCount = 0;
let valLastKillTime = 0;

function playValorantKillSfx(streak = 1) {
  if (!audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  const t = audioCtx.currentTime;
  const baseFreq = 580 + Math.min(4, streak - 1) * 95;
  const notes = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
  notes.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = idx === notes.length - 1 ? "triangle" : "sine";
    const startT = t + idx * 0.045;
    osc.frequency.setValueAtTime(freq, startT);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.08, startT + 0.14);
    gain.gain.setValueAtTime(0.14, startT);
    gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startT);
    osc.stop(startT + 0.19);
  });
}

function triggerValorantKillEffect(victimName, weaponLabel) {
  const nowSec = performance.now() / 1000;
  if (nowSec - valLastKillTime <= 6.5) {
    valStreakCount += 1;
  } else {
    valStreakCount = 1;
  }
  valLastKillTime = nowSec;
  valKillTimer = 1.45;

  playValorantKillSfx(valStreakCount);

  const marks = ["✕", "✕ ✕", "✕ ✕ ✕", "✕ ✕ ✕ ✕", "✕ ✕ ✕ ✕ ✕"];
  const titles = ["ELIMINATED", "DOUBLE KILL", "TRIPLE KILL", "QUADRA KILL", "ACE"];
  const markIdx = Math.min(marks.length - 1, valStreakCount - 1);

  if (valKillMark) valKillMark.textContent = marks[markIdx];
  if (valKillTitle) valKillTitle.textContent = titles[markIdx];
  if (valKillSub) valKillSub.textContent = `${victimName} • ${weaponLabel}`;
  if (valKillBanner) valKillBanner.classList.add("active");
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
// 昼間の爽やかなスカイブルー背景＋遠方まで見渡せるライトヘイズ
scene.background = new THREE.Color(0x7dd3fc);
scene.fog = new THREE.Fog(0xbae6fd, 130, 390);

const camera = new THREE.PerspectiveCamera(78, window.innerWidth / window.innerHeight, 0.1, 460);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = !isCoarsePointer;
document.body.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x94a3b8, 1.35);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.45);
dirLight.position.set(110, 185, 95);
if (!isCoarsePointer) {
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.camera.left = -195;
  dirLight.shadow.camera.right = 195;
  dirLight.shadow.camera.top = 195;
  dirLight.shadow.camera.bottom = -195;
  dirLight.shadow.camera.far = 480;
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
// 超広大バトルアリーナ構築（260 x 260 / 約3.5倍面積）
// ==========================================
const ARENA_HALF = 180;
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
    roughness: options.roughness ?? 0.62,
    metalness: options.metalness ?? 0.16,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.receiveShadow = true;
  mesh.castShadow = !options.noCast;
  if (!options.isFloor) {
    const edges = new THREE.EdgesGeometry(geo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: options.isOuterWall ? 0.18 : 0.30,
    });
    mesh.add(new THREE.LineSegments(edges, edgeMat));
  }
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
  const geo = new THREE.CylinderGeometry(2.2, 2.5, 0.30, 24);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x15803d,
    emissiveIntensity: 0.8,
  });
  const pad = new THREE.Mesh(geo, mat);
  pad.position.set(x, y + 0.15, z);
  scene.add(pad);
  jumpPads.push({ x, y: y + 0.15, z, radius: 2.35, force });
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

  const cableGeo = new THREE.CylinderGeometry(0.11, 0.11, len, 8);
  const cableMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xca8a04,
    emissiveIntensity: 0.85,
  });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  cable.position.copy(start).add(end).multiplyScalar(0.5);
  cable.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), diff.clone().normalize());
  scene.add(cable);

  const postMat = new THREE.MeshStandardMaterial({
    color: 0xfde047,
    emissive: 0xa16207,
    emissiveIntensity: 0.55,
  });
  const anchorGeo = new THREE.SphereGeometry(0.52, 12, 12);
  const aMesh = new THREE.Mesh(anchorGeo, postMat);
  aMesh.position.copy(start);
  const bMesh = new THREE.Mesh(anchorGeo, postMat);
  bMesh.position.copy(end);
  scene.add(aMesh, bMesh);

  ziplines.push({ start, end, length: len });
}

let currentMapKey = localStorage.getItem("parkour_fps_map") || "sky_citadel";
const arenaObjects = [];

function clearArena() {
  for (const obj of arenaObjects) {
    scene.remove(obj);
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
      else obj.material.dispose();
    }
  }
  arenaObjects.length = 0;
  colliders.length = 0;
  grappleMeshes.length = 0;
  worldMeshes.length = 0;
  jumpPads.length = 0;
  boostPads.length = 0;
  ziplines.length = 0;
}

function trackArenaObj(obj) {
  arenaObjects.push(obj);
  return obj;
}

function buildArena(mapKey = currentMapKey) {
  currentMapKey = mapKey === "neon_canyon" ? "neon_canyon" : "sky_citadel";
  if (mapSelect && mapSelect.value !== currentMapKey) {
    mapSelect.value = currentMapKey;
  }
  clearArena();

  if (currentMapKey === "neon_canyon") {
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.Fog(0x1e1b4b, 120, 380);
    hemiLight.color.setHex(0xc084fc);
    hemiLight.groundColor.setHex(0x0f172a);
    hemiLight.intensity = 1.25;
    dirLight.color.setHex(0x38bdf8);
    dirLight.intensity = 1.5;

    // キャニオン床＆外周ネオン壁
    const floorMesh = addBox(0, -0.5, 0, 360, 1, 360, 0x1e293b, { noCast: true, roughness: 0.65, isFloor: true });
    trackArenaObj(floorMesh);
    const grid = trackArenaObj(new THREE.GridHelper(360, 72, 0xe879f9, 0x0284c7));
    grid.position.y = 0.02;
    scene.add(grid);

    addBox(0, 24, -180, 360, 48, 2.4, 0x312e81, { wallRun: true, isOuterWall: true });
    addBox(0, 24, 180, 360, 48, 2.4, 0x312e81, { wallRun: true, isOuterWall: true });
    addBox(-180, 24, 0, 2.4, 48, 360, 0x312e81, { wallRun: true, isOuterWall: true });
    addBox(180, 24, 0, 2.4, 48, 360, 0x312e81, { wallRun: true, isOuterWall: true });

    // 渓谷の両岸ハイウェイ＆高架ブリッジ
    addBox(-75, 9.0, 0, 28, 18, 250, 0x1e1b4b, { wallRun: true });
    addBox(75, 9.0, 0, 28, 18, 250, 0x1e1b4b, { wallRun: true });
    addBox(0, 18.0, 0, 130, 1.5, 16, 0x06b6d4, { wallRun: true });
    addBox(0, 30.0, -55, 110, 1.5, 14, 0xc084fc, { wallRun: true });
    addBox(0, 30.0, 55, 110, 1.5, 14, 0xc084fc, { wallRun: true });

    // キャニオン中央のツインウォールランタワー
    addBox(-16, 16.0, 0, 3.0, 32, 56, 0xa855f7, { wallRun: true });
    addBox(16, 16.0, 0, 3.0, 32, 56, 0xec4899, { wallRun: true });
    addBox(0, 40.0, 0, 24, 2.0, 24, 0x38bdf8, { wallRun: true });

    // ジャンプパッド・ブースト床・ジップライン
    addJumpPad(-75, 18.0, 0, 30.0);
    addJumpPad(75, 18.0, 0, 30.0);
    addJumpPad(0, 0, -95, 29.0);
    addJumpPad(0, 0, 95, 29.0);

    addBoostPad(0, 0, 32, 8, 6);
    addBoostPad(0, 0, -32, 8, 6);
    addBoostPad(-75, 18.0, -50, 8, 6);
    addBoostPad(75, 18.0, 50, 8, 6);

    addZipline(-75, 20.5, -110, 75, 20.5, 110);
    addZipline(75, 20.5, -110, -75, 20.5, 110);
    addZipline(0, 42.0, -90, 0, 42.0, 90);
  } else {
    scene.background = new THREE.Color(0x7dd3fc);
    scene.fog = new THREE.Fog(0xbae6fd, 130, 390);
    hemiLight.color.setHex(0xffffff);
    hemiLight.groundColor.setHex(0x94a3b8);
    hemiLight.intensity = 1.35;
    dirLight.color.setHex(0xfffbeb);
    dirLight.intensity = 1.45;

    addBox(0, -0.5, 0, 360, 1, 360, 0xcbd5e1, { noCast: true, roughness: 0.78, isFloor: true });
    const grid = trackArenaObj(new THREE.GridHelper(360, 72, 0x64748b, 0x94a3b8));
    grid.position.y = 0.02;
    scene.add(grid);

    addBox(0, 23, -180, 360, 46, 2.4, 0xe2e8f0, { wallRun: true, isOuterWall: true });
    addBox(0, 23, 180, 360, 46, 2.4, 0xe2e8f0, { wallRun: true, isOuterWall: true });
    addBox(-180, 23, 0, 2.4, 46, 360, 0xe2e8f0, { wallRun: true, isOuterWall: true });
    addBox(180, 23, 0, 2.4, 46, 360, 0xe2e8f0, { wallRun: true, isOuterWall: true });

    addBox(0, 3.0, 0, 22, 6, 22, 0xf8fafc, { wallRun: true });
    addBox(0, 8.5, 0, 16, 5, 16, 0xe2e8f0, { wallRun: true });
    addBox(0, 14.0, 0, 12, 6, 12, 0x38bdf8, { wallRun: true });
    addBox(0, 20.0, 0, 8.5, 6, 8.5, 0x0284c7, { wallRun: true });
    addBox(0, 24.0, -14, 24, 1.4, 7, 0x7dd3fc, { wallRun: true });
    addBox(0, 24.0, 14, 24, 1.4, 7, 0x7dd3fc, { wallRun: true });
    addBox(-14, 24.0, 0, 7, 1.4, 24, 0x7dd3fc, { wallRun: true });
    addBox(14, 24.0, 0, 7, 1.4, 24, 0x7dd3fc, { wallRun: true });
    addJumpPad(0, 23.0, 0, 33.5);

    addBox(0, 46.0, 0, 26, 1.6, 26, 0xf8fafc, { wallRun: true });
    addBox(0, 50.5, 0, 9, 7.5, 9, 0x0ea5e9, { wallRun: true });
    addBox(0, 47.6, -12.2, 16, 1.8, 1.2, 0x38bdf8);
    addBox(0, 47.6, 12.2, 16, 1.8, 1.2, 0x38bdf8);
    addBox(-12.2, 47.6, 0, 1.2, 1.8, 16, 0x38bdf8);
    addBox(12.2, 47.6, 0, 1.2, 1.8, 16, 0x38bdf8);
    addJumpPad(0, 54.25, 0, 25.0);

    const cornerCoords = [
      [-122, -122],
      [122, 122],
      [122, -122],
      [-122, 122],
    ];
    for (const [cx, cz] of cornerCoords) {
      addBox(cx, 8.0, cz, 22, 16, 22, 0x3b82f6, { wallRun: true });
      addBox(cx, 26.0, cz, 13, 20, 13, 0x2563eb, { wallRun: true });
      addBox(cx, 36.6, cz, 20, 1.4, 20, 0x93c5fd, { wallRun: true });
      addBox(cx, 38.2, cz + (cz > 0 ? -9.2 : 9.2), 14, 1.8, 1.2, 0xf8fafc);
      addBox(cx + (cx > 0 ? -9.2 : 9.2), 38.2, cz, 1.2, 1.8, 14, 0xf8fafc);
      addJumpPad(cx + (cx > 0 ? -15 : 15), 0, cz, 31.0);
      addJumpPad(cx, 16.0, cz + (cz > 0 ? -8.5 : 8.5), 29.0);
    }

    const outpostBunkers = [
      [0, 4.5, -108, 32, 9, 14, 0x0d9488],
      [0, 14.0, -108, 18, 10, 10, 0x14b8a6],
      [0, 4.5, 108, 32, 9, 14, 0x0d9488],
      [0, 14.0, 108, 18, 10, 10, 0x14b8a6],
      [-108, 4.5, 0, 14, 9, 32, 0x0d9488],
      [-108, 14.0, 0, 10, 10, 18, 0x14b8a6],
      [108, 4.5, 0, 14, 9, 32, 0x0d9488],
      [108, 14.0, 0, 10, 10, 18, 0x14b8a6],
    ];

    const wallRunPanels = [
      [-42, 12.0, -30, 1.8, 24, 38, 0x8b5cf6],
      [42, 12.0, 30, 1.8, 24, 38, 0x8b5cf6],
      [30, 12.0, -42, 38, 24, 1.8, 0x8b5cf6],
      [-30, 12.0, 42, 38, 24, 1.8, 0x8b5cf6],
      [-78, 15.0, -52, 2.0, 30, 48, 0xa855f7],
      [78, 15.0, 52, 2.0, 30, 48, 0xa855f7],
      [52, 15.0, -78, 48, 30, 2.0, 0xa855f7],
      [-52, 15.0, 78, 48, 30, 2.0, 0xa855f7],
      [-152, 17.0, 0, 2.2, 34, 84, 0x9333ea],
      [152, 17.0, 0, 2.2, 34, 84, 0x9333ea],
      [0, 17.0, -152, 84, 34, 2.2, 0x9333ea],
      [0, 17.0, 152, 84, 34, 2.2, 0x9333ea],
    ];

    const skyPlatforms = [
      [-64, 10.0, 0, 9, 1.2, 42, 0x38bdf8],
      [64, 10.0, 0, 9, 1.2, 42, 0x38bdf8],
      [0, 10.0, -64, 42, 1.2, 9, 0x38bdf8],
      [0, 10.0, 64, 42, 1.2, 9, 0x38bdf8],
      [-62, 22.0, -62, 13, 1.3, 13, 0x7dd3fc],
      [62, 22.0, 62, 13, 1.3, 13, 0x7dd3fc],
      [62, 22.0, -62, 13, 1.3, 13, 0x7dd3fc],
      [-62, 22.0, 62, 13, 1.3, 13, 0x7dd3fc],
      [-64, 34.0, 0, 12, 1.4, 12, 0xbae6fd],
      [64, 34.0, 0, 12, 1.4, 12, 0xbae6fd],
      [0, 34.0, -64, 12, 1.4, 12, 0xbae6fd],
      [0, 34.0, 64, 12, 1.4, 12, 0xbae6fd],
      [-76, 24.0, -32, 3.6, 48, 3.6, 0x6366f1],
      [76, 24.0, 32, 3.6, 48, 3.6, 0x6366f1],
      [32, 24.0, -76, 3.6, 48, 3.6, 0x6366f1],
      [-32, 24.0, 76, 3.6, 48, 3.6, 0x6366f1],
      [-132, 24.0, -68, 3.6, 48, 3.6, 0x4f46e5],
      [132, 24.0, 68, 3.6, 48, 3.6, 0x4f46e5],
      [68, 24.0, -132, 3.6, 48, 3.6, 0x4f46e5],
      [-68, 24.0, 132, 3.6, 48, 3.6, 0x4f46e5],
      [-18, 3.0, -68, 2.2, 3.4, 12, 0xf59e0b],
      [18, 3.0, 68, 2.2, 3.4, 12, 0xf59e0b],
      [-68, 3.0, 18, 12, 3.4, 2.2, 0xf59e0b],
      [68, 3.0, -18, 12, 3.4, 2.2, 0xf59e0b],
      [-130, 3.0, 0, 2.2, 3.4, 14, 0xf59e0b],
      [130, 3.0, 0, 2.2, 3.4, 14, 0xf59e0b],
      [0, 3.0, -130, 14, 3.4, 2.2, 0xf59e0b],
      [0, 3.0, 130, 14, 3.4, 2.2, 0xf59e0b],
    ];

    for (const list of [outpostBunkers, wallRunPanels, skyPlatforms]) {
      for (const [x, y, z, w, h, d, color] of list) {
        addBox(x, y, z, w, h, d, color, { wallRun: true });
      }
    }

    addJumpPad(-18, 0, -18, 26.5);
    addJumpPad(18, 0, 18, 26.5);
    addJumpPad(18, 0, -18, 26.5);
    addJumpPad(-18, 0, 18, 26.5);
    addJumpPad(-84, 0, 0, 31.5);
    addJumpPad(84, 0, 0, 31.5);
    addJumpPad(0, 0, -84, 31.5);
    addJumpPad(0, 0, 84, 31.5);
    addJumpPad(-62, 22.65, -62, 31.0);
    addJumpPad(62, 22.65, 62, 31.0);
    addJumpPad(62, 22.65, -62, 31.0);
    addJumpPad(-62, 22.65, 62, 31.0);

    addBoostPad(0, 0, 44, 7, 5);
    addBoostPad(0, 0, -44, 7, 5);
    addBoostPad(44, 0, 0, 5, 7);
    addBoostPad(-44, 0, 0, 5, 7);
    addBoostPad(-160, 0, -36, 6, 10);
    addBoostPad(160, 0, 36, 6, 10);
    addBoostPad(-36, 0, -160, 10, 6);
    addBoostPad(36, 0, 160, 10, 6);

    addZipline(-114, 38.2, -114, 114, 38.2, -114);
    addZipline(114, 38.2, -114, 114, 38.2, 114);
    addZipline(114, 38.2, 114, -114, 38.2, 114);
    addZipline(-114, 38.2, 114, -114, 38.2, -114);
    addZipline(-114, 38.2, -114, -10, 48.0, -10);
    addZipline(114, 38.2, 114, 10, 48.0, 10);
    addZipline(114, 38.2, -114, 10, 48.0, -10);
    addZipline(-114, 38.2, 114, -10, 48.0, 10);
    addZipline(0, 20.2, -102, 0, 20.2, 102);
    addZipline(-102, 20.2, 0, 102, 20.2, 0);
    addZipline(-64, 11.2, -64, 64, 11.2, 64);
    addZipline(64, 11.2, -64, -64, 11.2, 64);
  }

  for (const m of worldMeshes) {
    if (!arenaObjects.includes(m)) trackArenaObj(m);
  }
  for (const p of jumpPads) {
    for (const obj of scene.children) {
      if (obj.geometry && obj.geometry.type === "CylinderGeometry" && Math.abs(obj.position.x - p.x) < 0.01 && Math.abs(obj.position.z - p.z) < 0.01) {
        trackArenaObj(obj);
      }
    }
  }
  for (const b of boostPads) {
    for (const obj of scene.children) {
      if (obj.geometry && obj.geometry.type === "BoxGeometry" && Math.abs(obj.position.x - b.x) < 0.01 && Math.abs(obj.position.z - b.z) < 0.01) {
        trackArenaObj(obj);
      }
    }
  }
  for (const z of ziplines) {
    for (const obj of scene.children) {
      if (obj.geometry && (obj.geometry.type === "CylinderGeometry" || obj.geometry.type === "SphereGeometry")) {
        const mid = z.start.clone().add(z.end).multiplyScalar(0.5);
        if (obj.position.distanceTo(mid) <= z.length * 0.6 || obj.position.distanceTo(z.start) < 0.2 || obj.position.distanceTo(z.end) < 0.2) {
          trackArenaObj(obj);
        }
      }
    }
  }
}

buildArena(currentMapKey);

if (mapSelect) {
  mapSelect.addEventListener("change", () => {
    const nextMap = mapSelect.value === "neon_canyon" ? "neon_canyon" : "sky_citadel";
    try { localStorage.setItem("parkour_fps_map", nextMap); } catch {}
    buildArena(nextMap);
    resetMatch(false);
    showTrick(nextMap === "neon_canyon" ? "MAP: NEON CANYON" : "MAP: SKY CITADEL");
  });
}

// ==========================================
// 4人対戦用 敵プレイヤー / BOT エンティティ管理（最大3体の相手）
// ==========================================
const SPAWN_POINTS = [
  new THREE.Vector3(0, 2, 142),
  new THREE.Vector3(0, 2, -142),
  new THREE.Vector3(142, 2, 0),
  new THREE.Vector3(-142, 2, 0),
  new THREE.Vector3(122, 38.5, 122),
  new THREE.Vector3(-122, 38.5, -122),
  new THREE.Vector3(122, 38.5, -122),
  new THREE.Vector3(-122, 38.5, 122),
  new THREE.Vector3(62, 24.0, 62),
  new THREE.Vector3(-62, 24.0, -62),
  new THREE.Vector3(64, 36.0, 0),
  new THREE.Vector3(-64, 36.0, 0),
];

const BOT_PRESETS = [
  { id: "bot_1", name: "BOT-BLITZ", charKey: "blitz", gunKey: "smg" },
  { id: "bot_2", name: "BOT-PYRO", charKey: "pyro", gunKey: "burst" },
  { id: "bot_3", name: "BOT-TITAN", charKey: "titan", gunKey: "lmg" },
];

function createRivalRig(index, preset) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.55, 1.0, 8, 16),
    new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.55,
      roughness: 0.35,
    })
  );
  body.position.y = 1.05;
  body.castShadow = true;
  group.add(body);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.64, 0.22, 0.24),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
  );
  visor.position.set(0, 1.48, 0.45);
  group.add(visor);

  const gunMesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.14, 0.16, 0.68),
    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.75, roughness: 0.25 })
  );
  gunMesh.position.set(0.38, 1.15, 0.44);
  group.add(gunMesh);

  // 頭上3D HPバー（CPU・対戦相手の残り体力をリアルタイム表示）
  const hpBarGroup = new THREE.Group();
  hpBarGroup.position.set(0, 2.28, 0);
  const hpBg = new THREE.Mesh(
    new THREE.PlaneGeometry(1.18, 0.16),
    new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.82, side: THREE.DoubleSide })
  );
  const hpFillGeo = new THREE.PlaneGeometry(1.10, 0.10);
  const hpFillMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide });
  const hpFillMesh = new THREE.Mesh(hpFillGeo, hpFillMat);
  hpFillMesh.position.z = 0.005;
  hpBarGroup.add(hpBg, hpFillMesh);
  group.add(hpBarGroup);

  const hitMesh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.92, 1.35, 6, 10),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.y = 1.1;
  hitMesh.userData.rivalIndex = index;
  group.add(hitMesh);

  scene.add(group);

  const ch = CHARACTERS[preset.charKey] || CHARACTERS.vanguard;
  const sp = SPAWN_POINTS[(index + 1) % SPAWN_POINTS.length].clone();
  return {
    index,
    id: preset.id,
    name: preset.name,
    active: true,
    isRemotePlayer: false,
    peerId: null,
    kills: 0,
    pos: sp.clone(),
    targetPos: sp.clone(),
    vel: new THREE.Vector3(),
    yaw: Math.PI,
    hp: ch.maxHp,
    maxHp: ch.maxHp,
    dead: false,
    respawnTimer: 0,
    respawnAtMs: 0,
    hitFlashTimer: 0,
    onGround: false,
    jumpCooldown: 0,
    botDashCooldown: 2.2 + index * 0.7,
    botSkillCooldown: 6.0 + index * 1.5,
    botStuckTimer: 0,
    botAvoidDir: new THREE.Vector3(),
    botAvoidTimer: 0,
    botFireCooldown: 0.85 + index * 0.3,
    botStrafeDir: index % 2 === 0 ? 1 : -1,
    botStrafeTimer: 1.2 + index * 0.35,
    weaponKey: preset.gunKey,
    charKey: ch.id,
    shieldActive: false,
    stealthActive: false,
    group,
    body,
    visor,
    hitMesh,
    hpBarGroup,
    hpFillMesh,
  };
}

const rivals = BOT_PRESETS.map((preset, idx) => createRivalRig(idx, preset));

function applyRivalVisual(r, charKey) {
  const ch = CHARACTERS[charKey] || CHARACTERS.vanguard;
  r.charKey = ch.id;
  r.maxHp = ch.maxHp;
  r.visor.material.color.setHex(ch.visorColor);
  r.body.material.transparent = Boolean(r.stealthActive);
  r.body.material.opacity = r.stealthActive ? 0.22 : 1.0;
}

rivals.forEach((r) => applyRivalVisual(r, r.charKey));

function getActiveRivals() {
  return rivals.filter((r) => r.active);
}

function getAllParticipantsScoreList() {
  const list = [
    {
      id: "me",
      name: `YOU (${getSelectedChar().name})`,
      kills: game.myKills,
      hp: player.dead ? 0 : Math.ceil(player.hp),
      dead: player.dead,
      isMe: true,
    },
  ];
  for (const r of getActiveRivals()) {
    const ch = CHARACTERS[r.charKey] || CHARACTERS.vanguard;
    list.push({
      id: r.id,
      name: `${r.name} (${ch.name})`,
      kills: r.kills,
      hp: r.dead ? 0 : Math.ceil(r.hp),
      dead: r.dead,
      isMe: false,
    });
  }
  list.sort((a, b) => b.kills - a.kills || (a.isMe ? -1 : 1));
  return list;
}

// ==========================================
// オンライン対戦（PeerJS 最大4人同時接続ハブ）
// ==========================================
const ROOM_PREFIX = "parkourfps-v15-";
const MAX_ROOM_PLAYERS = 4;
let matchPlayerCount = 4; // 2 (1v1) または 4 (4人乱戦)
const net = {
  mode: "solo",
  peer: null,
  myPeerId: "",
  conns: [],
  hostConn: null,
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
    const count = getActiveRivals().length + 1;
    startBtn.textContent = game.elapsed > 0 ? "対戦に戻る" : `${count}人で対戦スタート！`;
  } else if (net.mode === "solo") {
    const modeLabel = matchPlayerCount === 2 ? "2人対戦(1v1)" : "4人乱戦";
    startBtn.textContent = game.elapsed > 0 ? "再開する" : `${modeLabel}スタート（ソロ練習）`;
  } else {
    startBtn.textContent = "接続待機中（ソロ練習も可）";
  }
}

function updateScoreAndHpUI() {
  myKillsDisplay.textContent = String(game.myKills);
  targetKillsDisplay.textContent = String(game.targetKills);

  const myHpClamped = Math.max(0, Math.ceil(player.hp));
  myHpDisplay.textContent = String(myHpClamped);
  myHpFill.style.width = `${(myHpClamped / player.maxHp) * 100}%`;
  myHpFill.classList.toggle("low", myHpClamped <= 30);

  if (ffaScoreboard) {
    const ranking = getAllParticipantsScoreList();
    ffaScoreboard.innerHTML = ranking
      .map(
        (entry, idx) =>
          `<div class="ffa-row${entry.isMe ? " me" : ""}${entry.dead ? " ko" : ""}">` +
          `<span>${idx + 1}. ${entry.name}</span>` +
          `<strong>${entry.kills}K (${entry.dead ? "KO" : entry.hp})</strong>` +
          `</div>`
      )
      .join("");
  }

  if (net.connected) {
    const totalPlayers = getActiveRivals().length + 1;
    netStatusPill.textContent = `ONLINE ${totalPlayers}人 #${net.roomCode}`;
    netStatusPill.className = "net-pill online";
  } else {
    netStatusPill.textContent = matchPlayerCount === 2 ? "2人1v1(SOLO)" : "4人乱戦(SOLO)";
    netStatusPill.className = "net-pill solo";
  }
}

function sendNet(payload) {
  if (!net.connected) return;
  if (net.mode === "host") {
    for (const c of net.conns) {
      if (c && c.open) {
        try { c.send(payload); } catch {}
      }
    }
  } else if (net.mode === "client" && net.hostConn && net.hostConn.open) {
    try { net.hostConn.send(payload); } catch {}
  }
}

function sendToSpecificPeer(targetPeerId, payload) {
  if (!net.connected) return;
  if (net.mode === "host") {
    const c = net.conns.find((conn) => conn.peer === targetPeerId);
    if (c && c.open) {
      try { c.send(payload); } catch {}
    }
  } else if (net.mode === "client" && net.hostConn && net.hostConn.open) {
    try {
      net.hostConn.send({ ...payload, relayTo: targetPeerId });
    } catch {}
  }
}

function configureSoloBotsMode() {
  const botLimit = matchPlayerCount === 2 ? 1 : 3;
  rivals.forEach((r, idx) => {
    const preset = BOT_PRESETS[idx];
    const enabled = idx < botLimit;
    r.active = enabled;
    r.isRemotePlayer = false;
    r.peerId = null;
    r.name = preset.name;
    r.kills = 0;
    r.dead = false;
    r.respawnTimer = 0;
    applyRivalVisual(r, preset.charKey);
    r.group.visible = enabled;
  });
  if (soloModeDesc) {
    soloModeDesc.textContent =
      matchPlayerCount === 2
        ? "【2人モード (1v1)】1対1のタイマン勝負！素早いキャラコンとエイムで撃ち勝とう。"
        : "【4人モード (乱戦)】3体のBOTとハイスピード乱戦！敵を倒すとHP+45＆残弾フル回復！";
  }
}

if (playerCountSelect) {
  playerCountSelect.addEventListener("change", () => {
    matchPlayerCount = Number(playerCountSelect.value) === 2 ? 2 : 4;
    if (!net.connected) {
      configureSoloBotsMode();
      resetMatch(false);
    } else if (net.mode === "host") {
      syncRemoteRosterFromHost();
    }
    updateScoreAndHpUI();
    updateStartButtonLabel();
  });
}

function syncRemoteRosterFromHost() {
  if (net.mode !== "host") return;
  const openConns = net.conns.filter((c) => c && c.open);
  net.connected = openConns.length > 0;
  if (!net.connected) {
    configureSoloBotsMode();
    updateScoreAndHpUI();
    updateStartButtonLabel();
    return;
  }

  rivals.forEach((r, idx) => {
    const conn = openConns[idx];
    if (conn) {
      r.active = true;
      r.isRemotePlayer = true;
      r.peerId = conn.peer;
      r.name = `PLAYER ${idx + 2}`;
      r.group.visible = !r.dead;
    } else {
      r.active = false;
      r.isRemotePlayer = false;
      r.peerId = null;
      r.group.visible = false;
    }
  });

  const roster = [
    { peerId: net.myPeerId, name: "HOST (P1)" },
    ...openConns.map((c, idx) => ({ peerId: c.peer, name: `PLAYER ${idx + 2}` })),
  ];
  sendNet({ type: "roster", roster, targetKills: game.targetKills });
  updateScoreAndHpUI();
  updateStartButtonLabel();
}

function cleanupPeer() {
  for (const c of net.conns) {
    try { c.close(); } catch {}
  }
  net.conns = [];
  if (net.hostConn) {
    try { net.hostConn.close(); } catch {}
    net.hostConn = null;
  }
  if (net.peer) {
    try { net.peer.destroy(); } catch {}
    net.peer = null;
  }
  net.connected = false;
  configureSoloBotsMode();
  updateScoreAndHpUI();
}

function handleIncomingNetPacket(senderPeerId, data) {
  if (!data || typeof data !== "object") return;

  if (net.mode === "host") {
    if (data.relayTo) {
      if (data.relayTo === net.myPeerId) {
        handleIncomingNetPacket(senderPeerId, { ...data, relayTo: undefined });
      } else {
        sendToSpecificPeer(data.relayTo, { ...data, fromPeer: senderPeerId, relayTo: undefined });
      }
      return;
    }
    if (data.type === "state" || data.type === "shot" || data.type === "killed" || data.type === "respawned") {
      const fwd = { ...data, fromPeer: senderPeerId };
      for (const c of net.conns) {
        if (c && c.open && c.peer !== senderPeerId) {
          try { c.send(fwd); } catch {}
        }
      }
    }
  }

  const originPeer = data.fromPeer || senderPeerId;

  if (data.type === "roster" && net.mode === "client") {
    const others = (data.roster || []).filter((p) => p.peerId !== net.myPeerId);
    rivals.forEach((r, idx) => {
      const info = others[idx];
      if (info) {
        r.active = true;
        r.isRemotePlayer = true;
        r.peerId = info.peerId;
        r.name = info.name;
        r.group.visible = !r.dead;
      } else {
        r.active = false;
        r.peerId = null;
        r.group.visible = false;
      }
    });
    updateScoreAndHpUI();
    updateStartButtonLabel();
  } else if (data.type === "start_match") {
    game.targetKills = Number(data.targetKills) || 5;
    goalKillsSelect.value = String(game.targetKills);
    resetMatch(false);
    startOrResumeGame();
  } else if (data.type === "state") {
    const r = rivals.find((item) => item.active && item.peerId === originPeer);
    if (r) {
      r.targetPos.set(data.x, data.y, data.z);
      r.yaw = data.yaw || 0;
      r.hp = typeof data.hp === "number" ? data.hp : r.hp;
      r.dead = Boolean(data.dead);
      r.kills = typeof data.kills === "number" ? data.kills : r.kills;
      r.weaponKey = data.w || "rifle";
      if (data.ch && CHARACTERS[data.ch] && r.charKey !== data.ch) {
        applyRivalVisual(r, data.ch);
      }
      r.shieldActive = Boolean(data.sh);
      r.stealthActive = Boolean(data.st);
      r.group.visible = !r.dead;
      updateScoreAndHpUI();
      if (r.kills >= game.targetKills && !game.over) {
        triggerMatchEnd(false, r.name);
      }
    }
  } else if (data.type === "shot") {
    const s = new THREE.Vector3(data.sx, data.sy, data.sz);
    const e = new THREE.Vector3(data.ex, data.ey, data.ez);
    spawnTracer(s, e, data.color || 0xef4444);
  } else if (data.type === "hit") {
    applyDamageToSelf(Number(data.dmg) || 10, data.weaponName || "WEAPON", originPeer);
  } else if (data.type === "killed") {
    const victim = rivals.find((item) => item.active && item.peerId === originPeer);
    if (victim) {
      victim.dead = true;
      victim.hp = 0;
      victim.group.visible = false;
    }
    if (data.killerPeer === net.myPeerId) {
      game.myKills += 1;
      playSfx("stun");
      const healMsg = applyKillRecoveryToSelf();
      triggerValorantKillEffect("PLAYER", weaponState.activeSlot === "gun" ? GUNS[profile.equippedGun].shortName : MELEES[profile.equippedMelee].shortName);
      showTrick(`KILL!! (${game.myKills} / ${game.targetKills})${healMsg}`);
      updateScoreAndHpUI();
      if (game.myKills >= game.targetKills) {
        triggerMatchEnd(true, "YOU");
      }
    } else if (data.killerPeer) {
      const killer = rivals.find((item) => item.active && item.peerId === data.killerPeer);
      if (killer) {
        killer.kills += 1;
        updateScoreAndHpUI();
        if (killer.kills >= game.targetKills && !game.over) {
          triggerMatchEnd(false, killer.name);
        }
      }
    }
  } else if (data.type === "respawned") {
    const r = rivals.find((item) => item.active && item.peerId === originPeer);
    if (r) {
      r.dead = false;
      r.hp = r.maxHp;
      r.pos.set(data.x, data.y, data.z);
      r.targetPos.copy(r.pos);
      r.group.visible = true;
      updateScoreAndHpUI();
    }
  } else if (data.type === "rematch") {
    game.targetKills = Number(data.targetKills) || game.targetKills;
    resetMatch(false);
    startOrResumeGame();
  }
}

function setupHostClientConnection(conn) {
  const maxOthers = Math.max(1, matchPlayerCount - 1);
  if (net.conns.length >= maxOthers) {
    try { conn.close(); } catch {}
    return;
  }
  net.conns.push(conn);
  conn.on("open", () => {
    net.connected = true;
    net.mode = "host";
    syncRemoteRosterFromHost();
    const total = getActiveRivals().length + 1;
    hostStatusText.textContent = `現在 ${total} / 4 人参加中！「対戦スタート」または追加待機できます`;
    hostStatusText.className = "mp-status ok";

    const goal = Number(goalKillsSelect.value) || 5;
    game.targetKills = goal;
    sendNet({ type: "start_match", targetKills: goal });
    if (!game.active) {
      resetMatch(true);
      startOrResumeGame();
    }
  });

  conn.on("data", (data) => handleIncomingNetPacket(conn.peer, data));

  conn.on("close", () => {
    net.conns = net.conns.filter((c) => c !== conn);
    syncRemoteRosterFromHost();
    showTrick("プレイヤー1名が退出しました");
  });
}

function setupClientToHostConnection(conn) {
  net.hostConn = conn;
  conn.on("open", () => {
    net.connected = true;
    net.mode = "client";
    joinStatusText.textContent = "接続成功！4人アリーナへ参加します！";
    joinStatusText.className = "mp-status ok";
    updateScoreAndHpUI();
    updateStartButtonLabel();
  });

  conn.on("data", (data) => handleIncomingNetPacket(conn.peer, data));

  conn.on("close", () => {
    net.connected = false;
    net.hostConn = null;
    configureSoloBotsMode();
    updateScoreAndHpUI();
    updateStartButtonLabel();
    showTrick("ホストとの接続が切れました");
  });
}

// ロビーUI・部屋作成/参加・勝利条件・ギミック選択イベント
if (mpTabHost) mpTabHost.addEventListener("click", () => setMpTab("host"));
if (mpTabJoin) mpTabJoin.addEventListener("click", () => setMpTab("join"));
if (mpTabSolo) mpTabSolo.addEventListener("click", () => setMpTab("solo"));

if (goalKillsSelect) {
  goalKillsSelect.addEventListener("change", () => {
    game.targetKills = Number(goalKillsSelect.value) || 5;
    updateScoreAndHpUI();
    if (net.connected && net.mode === "host") {
      syncRemoteRosterFromHost();
    }
  });
}

if (createRoomBtn) {
  createRoomBtn.addEventListener("click", () => {
    if (typeof Peer === "undefined") {
      hostStatusText.textContent = "PeerJSの読み込みに失敗しました。ネット接続を確認してください。";
      hostStatusText.className = "mp-status err";
      return;
    }
    cleanupPeer();
    net.mode = "host";
    const code = String(Math.floor(1000 + Math.random() * 9000));
    net.roomCode = code;
    hostRoomCodeEl.textContent = code;
    hostStatusText.textContent = "ルームを作成中...";
    hostStatusText.className = "mp-status";

    const peer = new Peer(ROOM_PREFIX + code);
    net.peer = peer;
    peer.on("open", (id) => {
      net.myPeerId = id;
      hostStatusText.textContent = `待機中！コード「${code}」を友達に共有してください（最大${matchPlayerCount}人）`;
      hostStatusText.className = "mp-status ok";
    });
    peer.on("connection", (conn) => setupHostClientConnection(conn));
    peer.on("error", (err) => {
      hostStatusText.textContent = `通信エラー: ${err.type || err.message}`;
      hostStatusText.className = "mp-status err";
    });
  });
}

if (copyCodeBtn) {
  copyCodeBtn.addEventListener("click", () => {
    const code = hostRoomCodeEl ? hostRoomCodeEl.textContent.trim() : "";
    if (!code || code === "----") return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        copyCodeBtn.textContent = "コピー済!";
        setTimeout(() => { copyCodeBtn.textContent = "コピー"; }, 1400);
      }).catch(() => {});
    }
  });
}

if (joinRoomBtn) {
  joinRoomBtn.addEventListener("click", () => {
    if (typeof Peer === "undefined") {
      joinStatusText.textContent = "PeerJSの読み込みに失敗しました。";
      joinStatusText.className = "mp-status err";
      return;
    }
    const rawCode = (joinCodeInput ? joinCodeInput.value : "").replace(/\D/g, "").slice(0, 4);
    if (rawCode.length !== 4) {
      joinStatusText.textContent = "4桁の数字コードを入力してください";
      joinStatusText.className = "mp-status err";
      return;
    }
    cleanupPeer();
    net.mode = "client";
    net.roomCode = rawCode;
    joinStatusText.textContent = `ルーム #${rawCode} に接続中...`;
    joinStatusText.className = "mp-status";

    const peer = new Peer();
    net.peer = peer;
    peer.on("open", (id) => {
      net.myPeerId = id;
      const conn = peer.connect(ROOM_PREFIX + rawCode, { reliable: true });
      setupClientToHostConnection(conn);
    });
    peer.on("error", (err) => {
      joinStatusText.textContent = `接続失敗 (${err.type || "部屋が見つかりません"})`;
      joinStatusText.className = "mp-status err";
    });
  });
}

if (loadoutBtns && loadoutBtns.length > 0) {
  loadoutBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      loadoutBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}// ==========================================
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
  lurchTimer: 0,
  lastTapStrafeTime: 0,
  lastWishX: 0,
  lastWishZ: 0,

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
  respawnAtMs: 0,
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
  burst: {
    key: "burst",
    name: "ファントムバースト",
    hudName: "PHANTOM AR",
    shortName: "BURST",
    price: 180,
    desc: "高精度3点同時発射のアサルトライフル（24発 / 威力12×3）",
    maxAmmo: 24,
    fireRate: 0.24,
    reloadTime: 1.35,
    range: 140,
    pellets: 3,
    spread: 0.011,
    damage: 12,
    defaultColor: 0x34d399,
    recoilZ: 0.075,
    recoilPitch: 0.065,
    sfx: "shot_rifle",
  },
  plasma: {
    key: "plasma",
    name: "ノヴァプラズマ砲",
    hudName: "NOVA CANNON",
    shortName: "PLASMA",
    price: 320,
    desc: "超高エネルギー弾を放つ重ランチャー（5発 / 威力54）",
    maxAmmo: 5,
    fireRate: 0.78,
    reloadTime: 1.60,
    range: 135,
    pellets: 1,
    spread: 0.004,
    damage: 54,
    defaultColor: 0xf43f5e,
    recoilZ: 0.14,
    recoilPitch: 0.14,
    sfx: "shot_shotgun",
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
  scythe: {
    key: "scythe",
    name: "エクリプスサイズ",
    hudName: "ECLIPSE SCYTHE",
    shortName: "SCYTHE",
    price: 340,
    desc: "光刃の大鎌を振るう漆黒のリーパーブレード（威力55・共通性能）",
    defaultColor: 0xc084fc,
  },
};

// スキンカタログ（ガチャ排出限定スキン + 初期スタンダード）
const SKINS = {
  default: {
    key: "default",
    name: "スタンダード",
    rarity: "COMMON",
    bodyColor: 0x242f40,
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
  solar_flare: {
    key: "solar_flare",
    name: "ソーラーフレア",
    rarity: "RARE",
    bodyColor: 0x7c2d12,
    accentColor: 0xfb923c,
    metalness: 0.76,
    cssColor: "#fb923c",
  },
  obsidian_blood: {
    key: "obsidian_blood",
    name: "オブシディアンブラッド",
    rarity: "EPIC",
    bodyColor: 0x090d16,
    accentColor: 0xf43f5e,
    metalness: 0.88,
    cssColor: "#f43f5e",
  },
  celestial_aurora: {
    key: "celestial_aurora",
    name: "セレスティアルオーロラ",
    rarity: "LEGEND",
    bodyColor: 0x0f172a,
    accentColor: 0x2dd4bf,
    metalness: 0.95,
    cssColor: "#2dd4bf",
  },
};

const GACHA_POOL = [
  { skin: "crimson", weight: 19 },
  { skin: "emerald", weight: 19 },
  { skin: "arctic", weight: 12 },
  { skin: "cyber_cyan", weight: 12 },
  { skin: "solar_flare", weight: 11 },
  { skin: "violet_void", weight: 7 },
  { skin: "fade_prism", weight: 7 },
  { skin: "obsidian_blood", weight: 6 },
  { skin: "gold_royal", weight: 4 },
  { skin: "celestial_aurora", weight: 3 },
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
  meleeSwingDuration: 0.22,
  meleeCombo: 0,
  equipAnimTimer: 0,
  equipAnimDuration: 0.55,
  inspectTimer: 0,
  inspectDuration: 2.8,
  bobTime: 0,
  hitmarkerTimer: 0,
  muzzleFlashTimer: 0,
  isAimingOni: false,
};

function triggerWeaponInspect() {
  if (!game.active || game.over || player.dead) return;
  if (weaponState.reloading) return;
  if (weaponState.activeSlot === "melee") {
    const mKey = profile.equippedMelee;
    weaponState.inspectDuration =
      mKey === "karambit" ? 1.65 :
      mKey === "knife" ? 2.1 :
      mKey === "katana" ? 2.6 : 2.45;
  } else {
    weaponState.inspectDuration = 2.8;
  }
  weaponState.equipAnimTimer = 0;
  weaponState.inspectTimer = weaponState.inspectDuration;
  playSfx("melee_swing");
}

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

  // パーツ配置ヘルパー（コード量を抑えつつ多層ディテールを構築）
  const addPart = (parent, geo, mat, pos, rot = null) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1], pos[2]);
    if (rot) mesh.rotation.set(rot[0], rot[1], rot[2]);
    parent.add(mesh);
    return mesh;
  };

  if (weaponState.activeSlot === "gun") {
    const g = GUNS[profile.equippedGun];
    const skin = SKINS[profile.equippedGunSkin] || SKINS.default;
    const isDefaultSkin = (profile.equippedGunSkin || "default") === "default";
    const accentHex = getEffectiveAccentColor(g.defaultColor, profile.equippedGunSkin);

    // 素の見た目でも重厚な質感が出る多層マテリアル
    const bodyMat = new THREE.MeshStandardMaterial({
      color: isDefaultSkin ? 0x273344 : skin.bodyColor,
      roughness: isDefaultSkin ? 0.30 : 0.26,
      metalness: isDefaultSkin ? 0.78 : Math.min(0.95, skin.metalness + 0.10),
    });
    const frameMat = new THREE.MeshStandardMaterial({
      color: isDefaultSkin ? 0x161e2b : 0x111827,
      roughness: 0.38,
      metalness: 0.82,
    });
    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x0b101b,
      roughness: 0.44,
      metalness: 0.72,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.18,
      metalness: 0.94,
    });
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x526277,
      roughness: 0.24,
      metalness: 0.90,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 1.05,
      roughness: 0.14,
      metalness: 0.35,
    });
    const lensMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 1.35,
      roughness: 0.08,
      transparent: true,
      opacity: 0.86,
    });

    if (g.key === "rifle") {
      // 【パルスライフル】タクティカル・モジュラーアサルトライフル造形
      // アッパー＆ロアレシーバー + 面取り装甲
      addPart(weaponRoot, new THREE.BoxGeometry(0.088, 0.068, 0.48), bodyMat, [0, 0.028, -0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.066, 0.018, 0.46), frameMat, [0, 0.068, -0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.078, 0.056, 0.32), frameMat, [0, -0.026, 0.04]);
      // チークパッド＆スケルトンストック
      addPart(weaponRoot, new THREE.BoxGeometry(0.064, 0.068, 0.19), darkTrimMat, [0, 0.012, 0.27]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.070, 0.024, 0.14), bodyMat, [0, 0.048, 0.25]);
      // ピストルグリップ（角度付き）
      addPart(weaponRoot, new THREE.BoxGeometry(0.048, 0.125, 0.058), darkTrimMat, [0, -0.095, 0.13], [0.32, 0, 0]);
      // トップピカティニーレール刻み（6連ラグ）
      for (let i = 0; i < 7; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.044, 0.010, 0.024), chromeMat, [0, 0.080, -0.28 + i * 0.055]);
      }
      // フローティングM-LOKハンドガード＋放熱スリット
      addPart(weaponRoot, new THREE.BoxGeometry(0.092, 0.074, 0.26), bodyMat, [0, 0.024, -0.25]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.072, 0.022, 0.24), darkTrimMat, [0, -0.016, -0.25]);
      for (let i = 0; i < 4; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.098, 0.014, 0.026), darkTrimMat, [0, 0.036, -0.17 - i * 0.052]);
      }
      // サイドエネルギーコア＆放熱フィン
      for (const side of [-1, 1]) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.012, 0.020, 0.28), accentMat, [side * 0.049, 0.018, -0.14]);
        addPart(weaponRoot, new THREE.BoxGeometry(0.014, 0.034, 0.09), chromeMat, [side * 0.048, 0.032, 0.02]);
      }
      // ヘビーバレル＋ガスチューブ＋コンペンセイター
      addPart(weaponRoot, new THREE.CylinderGeometry(0.016, 0.020, 0.34, 14), chromeMat, [0, 0.026, -0.42], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.008, 0.008, 0.26, 10), metalMat, [0, 0.050, -0.36], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.046, 0.048, 0.078), darkTrimMat, [0, 0.026, -0.57]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.050, 0.014, 0.044), accentMat, [0, 0.026, -0.57]);
      // アングルフォアグリップ
      addPart(weaponRoot, new THREE.BoxGeometry(0.042, 0.046, 0.095), darkTrimMat, [0, -0.042, -0.26], [-0.42, 0, 0]);
      // 湾曲タクティカルマガジン（2段構造＋残弾インジケータ）
      addPart(weaponRoot, new THREE.BoxGeometry(0.052, 0.11, 0.074), darkTrimMat, [0, -0.09, -0.04], [0.18, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.050, 0.10, 0.072), frameMat, [0, -0.165, -0.068], [0.38, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.055, 0.13, 0.016), accentMat, [0, -0.125, -0.055], [0.28, 0, 0]);
      // ホログラフィックサイト（フード＋バッテリーケース＋発光レティクル）
      addPart(weaponRoot, new THREE.BoxGeometry(0.058, 0.016, 0.115), darkTrimMat, [0, 0.084, 0.01]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.056, 0.044, 0.078), frameMat, [0, 0.108, 0.00]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.044, 0.032, 0.008), lensMat, [0, 0.110, -0.01]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.012, 0.012, 0.010), accentMat, [0, 0.110, -0.012]);

      muzzlePoint.position.set(0, 0.026, -0.62);

    } else if (g.key === "smg") {
      // 【ボルトSMG】近未来コンパクトPDW・インテグラルサプレッサー造形
      addPart(weaponRoot, new THREE.BoxGeometry(0.084, 0.105, 0.36), bodyMat, [0, 0.012, 0.0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.090, 0.042, 0.28), frameMat, [0, -0.024, -0.02]);
      // ワイヤーストック＆コンパクトグリップ
      addPart(weaponRoot, new THREE.BoxGeometry(0.056, 0.078, 0.14), darkTrimMat, [0, 0.005, 0.22]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.044, 0.11, 0.052), darkTrimMat, [0, -0.088, 0.11], [0.28, 0, 0]);
      // トップフレーム＆発光アークライン
      addPart(weaponRoot, new THREE.BoxGeometry(0.068, 0.020, 0.32), darkTrimMat, [0, 0.072, -0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.074, 0.012, 0.26), accentMat, [0, 0.064, -0.02]);
      // サイドボルトハンドル＆通気スリット
      for (const side of [-1, 1]) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.012, 0.018, 0.20), accentMat, [side * 0.046, 0.026, -0.05]);
        addPart(weaponRoot, new THREE.BoxGeometry(0.010, 0.045, 0.08), chromeMat, [side * 0.045, 0.008, 0.06]);
      }
      // 角型シュラウド＋円筒サプレッサー＋発光マズルリング
      addPart(weaponRoot, new THREE.BoxGeometry(0.072, 0.072, 0.14), frameMat, [0, 0.020, -0.21]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.028, 0.030, 0.24, 16), darkTrimMat, [0, 0.020, -0.32], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.031, 0.031, 0.018, 16), accentMat, [0, 0.020, -0.40], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.031, 0.031, 0.014, 16), chromeMat, [0, 0.020, -0.27], [Math.PI / 2, 0, 0]);
      // ハンドストップ（フォアグリップ）
      addPart(weaponRoot, new THREE.BoxGeometry(0.040, 0.075, 0.046), darkTrimMat, [0, -0.072, -0.17], [-0.25, 0, 0]);
      // マイクロドットサイト
      addPart(weaponRoot, new THREE.BoxGeometry(0.046, 0.034, 0.064), darkTrimMat, [0, 0.096, 0.01]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.034, 0.022, 0.008), lensMat, [0, 0.098, -0.005]);
      // ロングスティックマガジン（斜め前方傾斜＋ネオンコア）
      addPart(weaponRoot, new THREE.BoxGeometry(0.042, 0.23, 0.058), darkTrimMat, [0, -0.135, -0.05], [-0.22, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.046, 0.18, 0.015), accentMat, [0, -0.135, -0.05], [-0.22, 0, 0]);

      muzzlePoint.position.set(0, 0.020, -0.45);

    } else if (g.key === "shotgun") {
      // 【スキャッターショットガン】重装甲タクティカル・ブリーチャー造形
      addPart(weaponRoot, new THREE.BoxGeometry(0.118, 0.118, 0.44), bodyMat, [0, 0.012, 0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.124, 0.036, 0.36), frameMat, [0, 0.058, -0.02]);
      // シェルホルダー（側面に4発のショットシェル装填）
      for (let i = 0; i < 4; i++) {
        addPart(weaponRoot, new THREE.CylinderGeometry(0.011, 0.011, 0.054, 10), accentMat, [-0.066, 0.014, 0.06 - i * 0.032]);
        addPart(weaponRoot, new THREE.CylinderGeometry(0.0115, 0.0115, 0.014, 10), chromeMat, [-0.066, -0.012, 0.06 - i * 0.032]);
      }
      // パンチングヒートシールド（通気スリット付き）
      addPart(weaponRoot, new THREE.BoxGeometry(0.096, 0.034, 0.36), darkTrimMat, [0, 0.066, -0.24]);
      for (let i = 0; i < 5; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.100, 0.010, 0.024), accentMat, [0, 0.066, -0.12 - i * 0.058]);
      }
      // 上下2連ヘビーバレル＆チューブマガジン
      addPart(weaponRoot, new THREE.CylinderGeometry(0.026, 0.028, 0.44, 14), chromeMat, [0, 0.036, -0.35], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.024, 0.024, 0.40, 14), metalMat, [0, -0.016, -0.33], [Math.PI / 2, 0, 0]);
      // マズルクランプ
      addPart(weaponRoot, new THREE.BoxGeometry(0.064, 0.088, 0.036), darkTrimMat, [0, 0.010, -0.50]);
      // 肉厚ポンプアクションフォアエンド＋リブ加工
      addPart(weaponRoot, new THREE.BoxGeometry(0.132, 0.064, 0.21), bodyMat, [0, -0.020, -0.25]);
      for (let i = 0; i < 4; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.136, 0.068, 0.016), darkTrimMat, [0, -0.020, -0.18 - i * 0.044]);
      }
      for (const side of [-1, 1]) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.012, 0.022, 0.17), accentMat, [side * 0.068, -0.020, -0.25]);
      }
      // グリップ＆ストック
      addPart(weaponRoot, new THREE.BoxGeometry(0.054, 0.12, 0.064), darkTrimMat, [0, -0.09, 0.16], [0.34, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.086, 0.10, 0.18), frameMat, [0, -0.01, 0.29]);

      muzzlePoint.position.set(0, 0.036, -0.58);

    } else if (g.key === "sniper") {
      // 【レイルスナイパー】電磁加速レイルガン・精密長距離ライフル造形
      addPart(weaponRoot, new THREE.BoxGeometry(0.088, 0.112, 0.58), bodyMat, [0, 0.008, 0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.094, 0.042, 0.46), frameMat, [0, -0.026, -0.02]);
      // 精密アジャスタブルストック＆モノポッド
      addPart(weaponRoot, new THREE.BoxGeometry(0.072, 0.096, 0.22), darkTrimMat, [0, -0.010, 0.35]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.078, 0.026, 0.14), bodyMat, [0, 0.048, 0.34]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.048, 0.12, 0.058), darkTrimMat, [0, -0.095, 0.18], [0.30, 0, 0]);
      // ツイン電磁加速レイル（上下二層＋プラズマコアギャップ）
      addPart(weaponRoot, new THREE.BoxGeometry(0.052, 0.024, 0.64), frameMat, [0, 0.056, -0.46]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.052, 0.024, 0.64), frameMat, [0, -0.014, -0.46]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.013, 0.016, 0.72, 12), chromeMat, [0, 0.021, -0.54], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.024, 0.012, 0.60), accentMat, [0, 0.041, -0.45]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.024, 0.012, 0.60), accentMat, [0, 0.001, -0.45]);
      // 加速コイルリング（4基の電磁リング）
      for (let i = 0; i < 4; i++) {
        const zPos = -0.32 - i * 0.14;
        addPart(weaponRoot, new THREE.BoxGeometry(0.064, 0.092, 0.024), darkTrimMat, [0, 0.021, zPos]);
        addPart(weaponRoot, new THREE.BoxGeometry(0.068, 0.022, 0.012), accentMat, [0, 0.021, zPos]);
      }
      // 大型マズルブレーキ
      addPart(weaponRoot, new THREE.BoxGeometry(0.060, 0.076, 0.095), darkTrimMat, [0, 0.021, -0.88]);
      // ロングレンジ可変倍率スコープ（マウントリング＋タレット＋対物レンズ）
      addPart(weaponRoot, new THREE.BoxGeometry(0.036, 0.034, 0.032), darkTrimMat, [0, 0.082, -0.10]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.036, 0.034, 0.032), darkTrimMat, [0, 0.082, 0.06]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.024, 0.024, 0.34, 16), darkTrimMat, [0, 0.114, -0.03], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.036, 0.026, 0.10, 16), frameMat, [0, 0.114, -0.18], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.030, 0.030, 0.014, 16), lensMat, [0, 0.114, -0.232], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.012, 0.012, 0.024, 12), chromeMat, [0, 0.142, -0.03]);
      // 折りたたみバイポッド
      for (const side of [-1, 1]) {
        addPart(weaponRoot, new THREE.CylinderGeometry(0.008, 0.008, 0.17, 10), metalMat, [side * 0.048, -0.075, -0.44], [0, 0, side * 0.26]);
      }

      muzzlePoint.position.set(0, 0.021, -0.95);

    } else {
      // 【タイタンLMG】重装分隊支援火器・ロータリーヘビーマシンガン造形
      addPart(weaponRoot, new THREE.BoxGeometry(0.142, 0.138, 0.54), bodyMat, [0, 0.008, 0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.150, 0.034, 0.42), frameMat, [0, 0.078, -0.02]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.112, 0.022, 0.34), accentMat, [0, 0.098, -0.02]);
      // キャリングハンドル
      addPart(weaponRoot, new THREE.BoxGeometry(0.024, 0.044, 0.16), darkTrimMat, [0, 0.125, -0.05]);
      // ヘビーバレルシュラウド＋3連ガトリング風バレル束
      addPart(weaponRoot, new THREE.CylinderGeometry(0.056, 0.062, 0.32, 16), darkTrimMat, [0, 0.026, -0.34], [Math.PI / 2, 0, 0]);
      for (let i = 0; i < 3; i++) {
        const ang = (i * Math.PI * 2) / 3 - Math.PI / 2;
        const bx = Math.cos(ang) * 0.022;
        const by = 0.026 + Math.sin(ang) * 0.022;
        addPart(weaponRoot, new THREE.CylinderGeometry(0.014, 0.014, 0.50, 12), chromeMat, [bx, by, -0.44], [Math.PI / 2, 0, 0]);
      }
      // バレルクランプバンド
      addPart(weaponRoot, new THREE.CylinderGeometry(0.044, 0.044, 0.024, 16), accentMat, [0, 0.026, -0.60], [Math.PI / 2, 0, 0]);
      // ツインドラム＆ボックスマガジン＋弾帯ベルト
      addPart(weaponRoot, new THREE.CylinderGeometry(0.096, 0.096, 0.135, 20), darkTrimMat, [0, -0.105, -0.06], [0, 0, Math.PI / 2]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.062, 0.062, 0.142, 20), accentMat, [0, -0.105, -0.06], [0, 0, Math.PI / 2]);
      for (let i = 0; i < 4; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.022, 0.016, 0.032), chromeMat, [-0.082, -0.05 + i * 0.018, -0.06]);
      }
      // ストック＆グリップ
      addPart(weaponRoot, new THREE.BoxGeometry(0.096, 0.115, 0.20), frameMat, [0, -0.005, 0.33]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.056, 0.125, 0.066), darkTrimMat, [0, -0.095, 0.17], [0.30, 0, 0]);

      muzzlePoint.position.set(0, 0.026, -0.71);
    }

    muzzleFlashMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(g.key === "shotgun" ? 0.115 : 0.08, 1),
      new THREE.MeshBasicMaterial({ color: accentHex, transparent: true, opacity: 0.94 })
    );
    muzzleFlashMesh.position.copy(muzzlePoint.position);
    muzzleFlashMesh.visible = false;
    weaponRoot.add(muzzlePoint, muzzleFlashMesh);
  } else {
    const m = MELEES[profile.equippedMelee];
    const skin = SKINS[profile.equippedMeleeSkin] || SKINS.default;
    const isDefaultSkin = (profile.equippedMeleeSkin || "default") === "default";
    const accentHex = getEffectiveAccentColor(m.defaultColor, profile.equippedMeleeSkin);

    const gripMat = new THREE.MeshStandardMaterial({
      color: isDefaultSkin ? 0x1e293b : skin.bodyColor,
      roughness: 0.38,
      metalness: isDefaultSkin ? 0.65 : skin.metalness,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x3b4859,
      roughness: 0.20,
      metalness: 0.92,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xcbd5e1,
      roughness: 0.14,
      metalness: 0.96,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.42,
      metalness: 0.78,
    });
    const bladeMat = new THREE.MeshStandardMaterial({
      color: accentHex,
      emissive: accentHex,
      emissiveIntensity: 1.05,
      roughness: 0.12,
      metalness: 0.85,
    });

    if (m.key === "knife") {
      // 【コンバットナイフ】ダマスカス鋼ブレード＋フラー溝＋ノコギリ背刃＋プラズマエッジ
      addPart(weaponRoot, new THREE.CylinderGeometry(0.024, 0.022, 0.032, 14), chromeMat, [0, 0, 0.095], [Math.PI / 2, 0, 0]);
      addPart(weaponRoot, new THREE.CylinderGeometry(0.022, 0.026, 0.165, 14), gripMat, [0, 0, 0.0], [Math.PI / 2, 0, 0]);
      // グリップ滑り止めリング（4本）
      for (let i = 0; i < 4; i++) {
        addPart(weaponRoot, new THREE.CylinderGeometry(0.0255, 0.0255, 0.012, 14), darkMat, [0, 0, -0.05 + i * 0.032], [Math.PI / 2, 0, 0]);
      }
      // クロスガード（ツバ）
      addPart(weaponRoot, new THREE.BoxGeometry(0.088, 0.092, 0.022), steelMat, [0, 0, -0.088]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.092, 0.022, 0.026), chromeMat, [0, 0, -0.088]);
      // 多層ブレード（峰・血抜きフラー溝・発光刃・クリップポイント切っ先）
      addPart(weaponRoot, new THREE.BoxGeometry(0.015, 0.026, 0.27), steelMat, [0, 0.012, -0.23]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.018, 0.008, 0.21), darkMat, [0, 0.004, -0.21]);
      // 背刃セレーション（ギザギザ）
      for (let i = 0; i < 5; i++) {
        addPart(weaponRoot, new THREE.BoxGeometry(0.012, 0.010, 0.016), chromeMat, [0, 0.027, -0.14 - i * 0.024], [0.4, 0, 0]);
      }
      addPart(weaponRoot, new THREE.BoxGeometry(0.009, 0.020, 0.29), bladeMat, [0, -0.009, -0.24]);
      // 鋭利な切っ先（先端テーパー）
      addPart(weaponRoot, new THREE.ConeGeometry(0.022, 0.075, 4), bladeMat, [0, 0.001, -0.405], [-Math.PI / 2, Math.PI / 4, 0]);

    } else if (m.key === "karambit") {
      // 【カラムビット】人間工学エルゴグリップ＋フィンガーリング＋3段湾曲クローブレード
      addPart(weaponRoot, new THREE.TorusGeometry(0.036, 0.011, 14, 28), chromeMat, [0, -0.012, 0.088], [0, Math.PI / 2, 0]);
      addPart(weaponRoot, new THREE.TorusGeometry(0.036, 0.006, 12, 28), bladeMat, [0, -0.012, 0.088], [0, Math.PI / 2, 0]);
      // フィンガーグルーブ付き湾曲ハンドル
      addPart(weaponRoot, new THREE.BoxGeometry(0.032, 0.044, 0.145), gripMat, [0, 0.010, -0.008], [0.24, 0, 0]);
      for (let i = 0; i < 3; i++) {
        addPart(weaponRoot, new THREE.CylinderGeometry(0.017, 0.017, 0.036, 12), darkMat, [0, -0.012 + i * 0.008, 0.028 - i * 0.036], [0, 0, Math.PI / 2]);
      }
      // センター発光インレイ＆ボルスター
      addPart(weaponRoot, new THREE.BoxGeometry(0.036, 0.012, 0.11), bladeMat, [0, 0.014, -0.01], [0.24, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.040, 0.052, 0.028), chromeMat, [0, 0.004, -0.084]);
      // 3段階の滑らかな鉤爪（クロー）湾曲ブレード
      addPart(weaponRoot, new THREE.BoxGeometry(0.014, 0.042, 0.11), steelMat, [0, -0.014, -0.135], [-0.30, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.011, 0.036, 0.11), chromeMat, [0, -0.058, -0.205], [-0.68, 0, 0]);
      addPart(weaponRoot, new THREE.BoxGeometry(0.009, 0.028, 0.12), bladeMat, [0, -0.122, -0.255], [-1.05, 0, 0]);
      addPart(weaponRoot, new THREE.ConeGeometry(0.015, 0.055, 4), bladeMat, [0, -0.185, -0.282], [-2.65, Math.PI / 4, 0]);

    } else if (m.key === "katana") {
      // 【サイバーカタナ】単一基準軸＋連続スプライン反り（ソリ）で柄・鍔・刀身・切っ先を完全一体化
      const katanaGroup = new THREE.Group();
      katanaGroup.rotation.x = -0.22;
      katanaGroup.position.set(0, -0.02, 0.02);
      weaponRoot.add(katanaGroup);

      // 柄頭（カシラ）＆柄（ツカ）
      addPart(katanaGroup, new THREE.CylinderGeometry(0.019, 0.022, 0.026, 14), chromeMat, [0, 0, 0.175], [-Math.PI / 2, 0, 0]);
      const tsukaMesh = addPart(katanaGroup, new THREE.CylinderGeometry(0.018, 0.020, 0.245, 14), gripMat, [0, 0, 0.048], [-Math.PI / 2, 0, 0]);
      tsukaMesh.scale.set(0.78, 1, 1.15);

      // 密着した柄巻き（ツカマキ：8連リング＋発光目貫ライン）
      for (let i = 0; i < 8; i++) {
        const zPos = 0.145 - i * 0.028;
        const wrap = addPart(katanaGroup, new THREE.BoxGeometry(0.034, 0.046, 0.014), darkMat, [0, 0, zPos], [0, 0, (i % 2 === 0 ? 1 : -1) * 0.18]);
        wrap.scale.set(1, 1, 1);
      }
      addPart(katanaGroup, new THREE.BoxGeometry(0.036, 0.008, 0.20), bladeMat, [0, 0, 0.048]);

      // 縁金具（フチ）・八角鍔（ツバ）・ハバキ
      addPart(katanaGroup, new THREE.CylinderGeometry(0.022, 0.022, 0.018, 14), chromeMat, [0, 0, -0.076], [-Math.PI / 2, 0, 0]);
      addPart(katanaGroup, new THREE.CylinderGeometry(0.058, 0.058, 0.012, 8), darkMat, [0, 0, -0.090], [-Math.PI / 2, 0, 0]);
      addPart(katanaGroup, new THREE.TorusGeometry(0.052, 0.0045, 8, 8), bladeMat, [0, 0, -0.090]);
      addPart(katanaGroup, new THREE.BoxGeometry(0.020, 0.042, 0.034), chromeMat, [0, 0.002, -0.110]);

      // 連続した反り（ソリ）を持つ一体型長刀身（12セグメント連結で隙間ゼロ）
      const bladeStartZ = -0.122;
      const bladeLength = 0.72;
      const segCount = 12;
      const soriHeight = 0.068;
      const segLen = (bladeLength / segCount) * 1.14; // わずかに重ねて継ぎ目を完全消去

      for (let i = 0; i < segCount; i++) {
        const t0 = i / segCount;
        const t1 = (i + 1) / segCount;
        const tm = (t0 + t1) * 0.5;
        const z0 = bladeStartZ - t0 * bladeLength;
        const z1 = bladeStartZ - t1 * bladeLength;
        const zm = (z0 + z1) * 0.5;
        const y0 = soriHeight * t0 * t0;
        const y1 = soriHeight * t1 * t1;
        const ym = (y0 + y1) * 0.5;
        const slopeAngle = Math.atan2(y1 - y0, -(z1 - z0));

        const taper = 1 - tm * 0.26;
        const spineH = 0.018 * taper;
        const edgeH = 0.022 * taper;
        const thick = 0.011 * (1 - tm * 0.22);

        // 棟（鋼ブレード背）
        addPart(katanaGroup, new THREE.BoxGeometry(thick, spineH, segLen), steelMat, [0, ym + 0.009 * taper, zm], [-slopeAngle, 0, 0]);
        // 刃（発光プラズマエッジ）
        addPart(katanaGroup, new THREE.BoxGeometry(thick * 0.62, edgeH, segLen), bladeMat, [0, ym - 0.007 * taper, zm], [-slopeAngle, 0, 0]);
      }

      // 切っ先（キッサキ：刀身先端の接線角度に完全一致）
      const tipEndZ = bladeStartZ - bladeLength;
      const tipEndY = soriHeight;
      const tipSlope = Math.atan2(2 * soriHeight, bladeLength);
      const tipLen = 0.078;
      const tipCenterZ = tipEndZ - Math.cos(tipSlope) * (tipLen * 0.45);
      const tipCenterY = tipEndY + Math.sin(tipSlope) * (tipLen * 0.45) + 0.002;
      const kissaki = addPart(
        katanaGroup,
        new THREE.ConeGeometry(0.017, tipLen, 4),
        bladeMat,
        [0, tipCenterY, tipCenterZ],
        [-Math.PI / 2 - tipSlope, Math.PI / 4, 0]
      );
      kissaki.scale.set(0.45, 1, 1.15);

    } else {
      // 【プラズマバトルアックス】単一シャフト軸上に柄・リアクター・三日月大刃を完全固定
      const axeGroup = new THREE.Group();
      axeGroup.rotation.x = -0.20;
      axeGroup.position.set(0, -0.02, 0.02);
      weaponRoot.add(axeGroup);

      addPart(axeGroup, new THREE.CylinderGeometry(0.025, 0.021, 0.038, 12), chromeMat, [0, 0, 0.165], [-Math.PI / 2, 0, 0]);
      addPart(axeGroup, new THREE.CylinderGeometry(0.019, 0.023, 0.60, 14), gripMat, [0, 0, -0.14], [-Math.PI / 2, 0, 0]);
      // シャフト補強バンド（3箇所）
      for (let i = 0; i < 3; i++) {
        addPart(axeGroup, new THREE.CylinderGeometry(0.024, 0.024, 0.022, 14), chromeMat, [0, 0, 0.04 - i * 0.16], [-Math.PI / 2, 0, 0]);
      }
      // 斧頭コアハウジング＆エネルギーリアクター（シャフト中心に密着）
      addPart(axeGroup, new THREE.BoxGeometry(0.042, 0.145, 0.18), darkMat, [0, 0.012, -0.34]);
      addPart(axeGroup, new THREE.CylinderGeometry(0.030, 0.030, 0.050, 16), bladeMat, [0, 0.012, -0.34], [0, 0, Math.PI / 2]);
      addPart(axeGroup, new THREE.BoxGeometry(0.048, 0.048, 0.14), chromeMat, [0, 0.012, -0.34]);
      // 前方三日月プラズマ大刃（3段構成）
      addPart(axeGroup, new THREE.BoxGeometry(0.016, 0.24, 0.065), steelMat, [0, 0.012, -0.42]);
      addPart(axeGroup, new THREE.BoxGeometry(0.009, 0.29, 0.055), bladeMat, [0, 0.012, -0.465]);
      addPart(axeGroup, new THREE.BoxGeometry(0.008, 0.09, 0.048), bladeMat, [0, 0.155, -0.445], [0.45, 0, 0]);
      addPart(axeGroup, new THREE.BoxGeometry(0.008, 0.09, 0.048), bladeMat, [0, -0.131, -0.445], [-0.45, 0, 0]);
      // 後方アーマーピアシングスパイク
      addPart(axeGroup, new THREE.ConeGeometry(0.024, 0.11, 4), chromeMat, [0, 0.018, -0.22], [Math.PI / 2, Math.PI / 4, 0]);
      addPart(axeGroup, new THREE.BoxGeometry(0.012, 0.032, 0.075), bladeMat, [0, 0.015, -0.24]);
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
    if (hudReloadBtn) hudReloadBtn.classList.remove("hidden");
    if (btnWeaponLabel) btnWeaponLabel.textContent = m.shortName;
  } else {
    if (ammoRow) ammoRow.classList.add("hidden");
    if (reloadStatus) reloadStatus.classList.add("hidden");
    if (hudReloadBtn) hudReloadBtn.classList.add("hidden");
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
  weaponState.inspectTimer = 0;
  weaponState.equipAnimTimer = 0;
  buildActiveViewModel();
  updateWeaponUI();
  if (slot === "melee" && game.active && !player.dead) {
    const mKey = profile.equippedMelee;
    const dur =
      mKey === "karambit" ? 0.62 :
      mKey === "knife" ? 0.52 :
      mKey === "katana" ? 0.68 : 0.64;
    weaponState.equipAnimDuration = dur;
    weaponState.equipAnimTimer = dur;
  }

  if (showNotice) {
    const label = slot === "gun" ? GUNS[profile.equippedGun].name : MELEES[profile.equippedMelee].name;
    showTrick(`EQUIP: ${label}`);
  }
}

function toggleWeaponSlot(showNotice = true) {
  switchWeaponSlot(weaponState.activeSlot === "gun" ? "melee" : "gun", showNotice);
}

const skillState = {
  cooldown: 0,
  overdriveTimer: 0,
  shieldTimer: 0,
  stealthTimer: 0,
};

function clearSkillEffects() {
  skillState.overdriveTimer = 0;
  skillState.shieldTimer = 0;
  skillState.stealthTimer = 0;
  if (skillActiveBanner) skillActiveBanner.classList.add("hidden");
}

function startReload() {
  if (weaponState.activeSlot !== "gun") return;
  const g = GUNS[profile.equippedGun];
  if (weaponState.reloading || weaponState.ammo >= g.maxAmmo) return;
  weaponState.inspectTimer = 0;
  weaponState.reloading = true;
  weaponState.reloadTimer = skillState.overdriveTimer > 0 ? g.reloadTime * 0.55 : g.reloadTime;
  playSfx("reload");
  updateWeaponUI();
}

function checkAimOnRival(maxRange) {
  const activeHitMeshes = getActiveRivals()
    .filter((r) => !r.dead)
    .map((r) => r.hitMesh);
  if (activeHitMeshes.length === 0) return null;
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  raycaster.far = maxRange;
  const targets = [...worldMeshes, ...activeHitMeshes];
  const hits = raycaster.intersectObjects(targets, false);
  if (hits.length > 0 && activeHitMeshes.includes(hits[0].object)) {
    const idx = hits[0].object.userData.rivalIndex;
    return rivals[idx] || null;
  }
  return null;
}

function applyKillRecoveryToSelf() {
  // 4人モード（3人以上の乱戦）で敵を撃破するとHP回復＆残弾フルチャージ
  const isFourPlayerMatch = net.connected ? (getActiveRivals().length + 1 >= 3) : (matchPlayerCount === 4);
  if (!isFourPlayerMatch || player.dead) return "";
  const prevHp = player.hp;
  player.hp = Math.min(player.maxHp, player.hp + 45);
  const healed = Math.max(0, Math.round(player.hp - prevHp));
  weaponState.ammo = GUNS[profile.equippedGun].maxAmmo;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  updateWeaponUI();
  return healed > 0 ? ` / HP+${healed} & 全弾回復!` : " / 全弾回復!";
}

function dealDamageToRival(targetRival, totalDmg, weaponShortName) {
  if (!targetRival || !targetRival.active || targetRival.dead) return;
  weaponState.hitmarkerTimer = 0.14;
  hitmarker.classList.remove("hidden");
  targetRival.hitFlashTimer = 0.12;
  playSfx(weaponState.activeSlot === "melee" ? "melee_hit" : "hit");

  if (targetRival.isRemotePlayer && net.connected) {
    targetRival.hp = Math.max(1, targetRival.hp - totalDmg);
    updateScoreAndHpUI();
    sendToSpecificPeer(targetRival.peerId, {
      type: "hit",
      dmg: totalDmg,
      weaponName: weaponShortName,
    });
  } else {
    targetRival.hp = Math.max(0, targetRival.hp - totalDmg);
    updateScoreAndHpUI();
    if (targetRival.hp <= 0 && !targetRival.dead) {
      targetRival.dead = true;
      targetRival.respawnTimer = 2.5;
      targetRival.respawnAtMs = performance.now() + 2500;
      targetRival.group.visible = false;
      game.myKills += 1;
      playSfx("stun");
      const healMsg = applyKillRecoveryToSelf();
      triggerValorantKillEffect(targetRival.name, weaponState.activeSlot === "gun" ? GUNS[profile.equippedGun].shortName : MELEES[profile.equippedMelee].shortName);
      showTrick(`${targetRival.name} K.O.!! (${game.myKills} / ${game.targetKills})${healMsg}`);
      updateScoreAndHpUI();
      if (game.myKills >= game.targetKills) {
        triggerMatchEnd(true, "YOU");
      }
    }
  }
}

function performMeleeAttack() {
  const m = MELEES[profile.equippedMelee];
  const swingDur =
    m.key === "katana" ? 0.28 :
    m.key === "axe" ? 0.32 :
    m.key === "karambit" ? 0.20 : 0.21;
  weaponState.fireCooldown = MELEE_COMMON_STATS.attackRate;
  weaponState.meleeSwingDuration = swingDur;
  weaponState.meleeSwingTimer = swingDur;
  weaponState.meleeCombo = (weaponState.meleeCombo + 1) % 2;
  weaponState.inspectTimer = 0;
  weaponState.equipAnimTimer = 0;
  playSfx("melee_swing");

  const accentHex = getEffectiveAccentColor(m.defaultColor, profile.equippedMeleeSkin);
  const eyePos = camera.getWorldPosition(new THREE.Vector3());
  const forward = getLookDirection();

  // 斬撃エフェクトライン
  const slashStart = eyePos.clone().addScaledVector(forward, 0.55).add(new THREE.Vector3(0.22, -0.15, 0));
  const slashEnd = eyePos.clone().addScaledVector(forward, 2.2).add(new THREE.Vector3(-0.22, -0.1, 0));
  spawnTracer(slashStart, slashEnd, accentHex);

  const hitTarget = checkAimOnRival(MELEE_COMMON_STATS.range);
  if (hitTarget) {
    const meleeDmg = MELEE_COMMON_STATS.damage + (getSelectedChar().meleeBonus || 0);
    dealDamageToRival(hitTarget, meleeDmg, m.shortName);
  }
}

function fireWeapon() {
  if (player.dead) return;
  weaponState.inspectTimer = 0;
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
  weaponState.fireCooldown = skillState.overdriveTimer > 0 ? g.fireRate * 0.68 : g.fireRate;
  weaponState.recoilOffset = Math.min(0.2, weaponState.recoilOffset + g.recoilZ);
  weaponState.recoilRot = Math.min(0.28, weaponState.recoilRot + g.recoilPitch);
  weaponState.muzzleFlashTimer = 0.045;
  playSfx(g.sfx);

  const muzzleWorld = new THREE.Vector3();
  muzzlePoint.getWorldPosition(muzzleWorld);

  const activeEnemyHitMeshes = getActiveRivals()
    .filter((r) => !r.dead)
    .map((r) => r.hitMesh);
  const targets = [...worldMeshes, ...activeEnemyHitMeshes];
  const hitCountsByIndex = new Map();

  for (let p = 0; p < g.pellets; p++) {
    const spreadX = (Math.random() - 0.5) * 2 * g.spread;
    const spreadY = (Math.random() - 0.5) * 2 * g.spread;
    raycaster.setFromCamera(new THREE.Vector2(spreadX, spreadY), camera);
    raycaster.far = g.range;

    const hits = raycaster.intersectObjects(targets, false);
    let endPos;
    if (hits.length > 0) {
      endPos = hits[0].point.clone();
      const hitObj = hits[0].object;
      if (typeof hitObj.userData.rivalIndex === "number") {
        const rIdx = hitObj.userData.rivalIndex;
        hitCountsByIndex.set(rIdx, (hitCountsByIndex.get(rIdx) || 0) + 1);
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

  for (const [rIdx, count] of hitCountsByIndex.entries()) {
    const targetRival = rivals[rIdx];
    if (targetRival && count > 0) {
      dealDamageToRival(targetRival, g.damage * count, g.shortName);
    }
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

  if (weaponState.inspectTimer > 0) {
    weaponState.inspectTimer = Math.max(0, weaponState.inspectTimer - dt);
  }
  if (weaponState.equipAnimTimer > 0) {
    weaponState.equipAnimTimer = Math.max(0, weaponState.equipAnimTimer - dt);
  }

  if (!isGun && weaponState.equipAnimTimer > 0 && weaponState.meleeSwingTimer <= 0 && weaponState.inspectTimer <= 0) {
    // 近接武器4種それぞれの固有抜刀（持ち替え）モーション
    const ep = 1 - weaponState.equipAnimTimer / weaponState.equipAnimDuration;
    const easeOut = 1 - Math.pow(1 - ep, 2.5);
    const arc = Math.sin(ep * Math.PI);
    const meleeKey = profile.equippedMelee;

    if (meleeKey === "karambit") {
      // カラムビット：縦に素早く1回転フィンガースピン抜刀
      const spin = -(1 - easeOut) * Math.PI * 2;
      weaponRoot.position.set(
        weaponBasePos.x + bobX - arc * 0.05,
        weaponBasePos.y - bobY + arc * 0.055,
        weaponBasePos.z + arc * 0.04
      );
      weaponRoot.rotation.set(spin, 0.08 * arc, -0.08 * arc);
    } else if (meleeKey === "knife") {
      // コンバットナイフ：空中フリップ1回転＋逆手キャッチ抜刀
      const flip = (1 - easeOut) * Math.PI * 2;
      weaponRoot.position.set(
        weaponBasePos.x + bobX - arc * 0.06,
        weaponBasePos.y - bobY + arc * 0.095,
        weaponBasePos.z - arc * 0.03
      );
      weaponRoot.rotation.set(flip, 0.35 * arc, -0.45 * arc);
    } else if (meleeKey === "katana") {
      // サイバーカタナ：腰元から斜め上へ閃光居合抜き（イアイドロー）
      const remain = 1 - easeOut;
      weaponRoot.position.set(
        weaponBasePos.x + bobX - remain * 0.24,
        weaponBasePos.y - bobY - remain * 0.16 + arc * 0.04,
        weaponBasePos.z + remain * 0.12
      );
      weaponRoot.rotation.set(remain * 0.65, -remain * 0.85, remain * 1.15);
    } else {
      // プラズマバトルアックス：大きく振り上げて地面へ叩きつけるヘビー構え
      const remain = 1 - easeOut;
      weaponRoot.position.set(
        weaponBasePos.x + bobX + remain * 0.06,
        weaponBasePos.y - bobY + arc * 0.12 - remain * 0.05,
        weaponBasePos.z + remain * 0.08
      );
      weaponRoot.rotation.set(-remain * 1.25, remain * 0.25, -remain * 0.55);
    }
  } else if (weaponState.inspectTimer > 0 && !weaponState.reloading && weaponState.meleeSwingTimer <= 0) {
    // 武器・近接武器の「眺める（インスペクト）」アニメーション
    const progress = 1 - weaponState.inspectTimer / weaponState.inspectDuration;
    const env = Math.min(1, progress * 5) * Math.min(1, (1 - progress) * 5);

    if (isGun) {
      const tiltWave = Math.sin(progress * Math.PI * 2);
      weaponRoot.position.set(
        weaponBasePos.x - 0.11 * env + bobX * 0.5,
        weaponBasePos.y + 0.07 * env - bobY * 0.5,
        weaponBasePos.z + 0.07 * env
      );
      weaponRoot.rotation.set(
        0.22 * env + tiltWave * 0.14 * env,
        0.82 * env + tiltWave * 0.28 * env,
        -0.46 * env
      );
    } else {
      const meleeKey = profile.equippedMelee;

      if (meleeKey === "knife") {
        // コンバットナイフ：空中トス2回転スピン＋バタフライ風ロールキャッチ
        const spinT = Math.min(1, progress * 1.32);
        const smoothSpin = spinT * spinT * (3 - 2 * spinT);
        const spinAngle = smoothSpin * Math.PI * 4;
        const rollAngle = Math.sin(spinT * Math.PI * 2) * 0.65;
        const tossArc = Math.sin(spinT * Math.PI) * 0.085;
        weaponRoot.position.set(
          weaponBasePos.x - 0.12 * env + bobX * 0.5,
          weaponBasePos.y + (0.09 + tossArc) * env - bobY * 0.5,
          weaponBasePos.z + 0.06 * env
        );
        weaponRoot.rotation.set(
          spinAngle,
          0.72 * env + Math.sin(progress * Math.PI) * 0.28,
          -0.35 * env + rollAngle * env
        );
      } else if (meleeKey === "karambit") {
        // カラムビット：フィンガーリングを支点に縦方向へ素早く4回転高速スピン！
        const fastPhase = Math.min(1, progress * 1.15);
        const eased = 1 - Math.pow(1 - fastPhase, 2.3);
        const verticalSpinAngle = -eased * Math.PI * 8;
        const ringOrbitY = Math.sin(verticalSpinAngle) * 0.032 * env;
        const ringOrbitZ = (1 - Math.cos(verticalSpinAngle)) * 0.028 * env;

        weaponRoot.position.set(
          weaponBasePos.x - 0.10 * env + bobX * 0.4,
          weaponBasePos.y + 0.085 * env + ringOrbitY - bobY * 0.4,
          weaponBasePos.z + 0.065 * env + ringOrbitZ
        );
        weaponRoot.rotation.set(
          verticalSpinAngle,
          0.14 * env,
          -0.10 * env
        );
      } else if (meleeKey === "katana") {
        // サイバーカタナ：片手回転納刀風の優雅な剣舞＋刀身チェック
        const flourishT = Math.min(1, progress * 1.6);
        const flourishSpin = (1 - Math.pow(1 - flourishT, 2)) * Math.PI * 2;
        const gazeWave = Math.sin(progress * Math.PI * 2) * 0.22;
        weaponRoot.position.set(
          weaponBasePos.x - 0.14 * env + bobX * 0.4,
          weaponBasePos.y + 0.095 * env - bobY * 0.4,
          weaponBasePos.z + 0.07 * env
        );
        weaponRoot.rotation.set(
          0.35 * env + gazeWave * env,
          0.95 * env,
          -0.42 * env + flourishSpin
        );
      } else {
        // プラズマバトルアックス：両手持ち風の重厚な持ち替えスピン＆刃面点検
        const heavyTurn = Math.sin(progress * Math.PI * 2);
        const flipPhase = Math.min(1, Math.max(0, (progress - 0.2) * 1.8));
        const axeRoll = (1 - Math.pow(1 - flipPhase, 2)) * Math.PI * 2;
        weaponRoot.position.set(
          weaponBasePos.x - 0.11 * env + bobX * 0.4,
          weaponBasePos.y + (0.07 + Math.abs(heavyTurn) * 0.03) * env - bobY * 0.4,
          weaponBasePos.z + 0.05 * env
        );
        weaponRoot.rotation.set(
          -0.32 * env + heavyTurn * 0.25 * env,
          0.62 * env,
          -0.28 * env + axeRoll
        );
      }
    }
  } else if (isGun) {
    const reloadDrop = weaponState.reloading ? -0.14 : 0;
    const reloadTilt = weaponState.reloading ? -0.55 : 0;
    weaponRoot.position.set(
      weaponBasePos.x + bobX,
      weaponBasePos.y - bobY + reloadDrop,
      weaponBasePos.z + weaponState.recoilOffset
    );
    weaponRoot.rotation.set(weaponState.recoilRot + reloadTilt, 0, weaponState.reloading ? 0.25 : 0);
  } else {
    // 近接武器4種それぞれの固有攻撃（スイング）モーション
    const dur = weaponState.meleeSwingDuration || 0.22;
    const rawT = weaponState.meleeSwingTimer > 0 ? 1 - weaponState.meleeSwingTimer / dur : 0;
    const swingPhase = weaponState.meleeSwingTimer > 0 ? Math.sin(rawT * Math.PI) : 0;
    const meleeKey = profile.equippedMelee;
    const combo = weaponState.meleeCombo;

    if (meleeKey === "karambit") {
      // カラムビット：素早い逆手クロス斬り＆回転切り上げ
      const dir = combo === 0 ? 1 : -1;
      weaponRoot.position.set(
        weaponBasePos.x + bobX - swingPhase * 0.15 * dir,
        weaponBasePos.y - bobY + swingPhase * 0.04,
        weaponBasePos.z - swingPhase * 0.14
      );
      weaponRoot.rotation.set(
        -swingPhase * 0.95,
        swingPhase * 0.85 * dir,
        swingPhase * 1.25 * dir
      );
    } else if (meleeKey === "knife") {
      // コンバットナイフ：1段目は横薙ぎスラッシュ、2段目は鋭いフォワード刺突（スタブ）
      if (combo === 0) {
        weaponRoot.position.set(
          weaponBasePos.x + bobX - swingPhase * 0.18,
          weaponBasePos.y - bobY - swingPhase * 0.03,
          weaponBasePos.z - swingPhase * 0.14
        );
        weaponRoot.rotation.set(-swingPhase * 0.55, swingPhase * 0.95, swingPhase * 0.85);
      } else {
        weaponRoot.position.set(
          weaponBasePos.x + bobX - swingPhase * 0.09,
          weaponBasePos.y - bobY + swingPhase * 0.02,
          weaponBasePos.z - swingPhase * 0.26
        );
        weaponRoot.rotation.set(-swingPhase * 0.18, swingPhase * 0.18, -swingPhase * 0.35);
      }
    } else if (meleeKey === "katana") {
      // サイバーカタナ：大振りの袈裟斬り（右斜め上→左下）＆逆袈裟切り上げ
      const dir = combo === 0 ? 1 : -1;
      weaponRoot.position.set(
        weaponBasePos.x + bobX - swingPhase * 0.24 * dir,
        weaponBasePos.y - bobY + swingPhase * (combo === 0 ? -0.09 : 0.09),
        weaponBasePos.z - swingPhase * 0.18
      );
      weaponRoot.rotation.set(
        -swingPhase * 0.95 * dir,
        swingPhase * 1.15 * dir,
        swingPhase * 1.05 * dir
      );
    } else {
      // プラズマバトルアックス：頭上から全力で叩き割るオーバーヘッドスマッシュ
      weaponRoot.position.set(
        weaponBasePos.x + bobX - swingPhase * 0.11,
        weaponBasePos.y - bobY - swingPhase * 0.12,
        weaponBasePos.z - swingPhase * 0.19
      );
      weaponRoot.rotation.set(
        -swingPhase * 1.45,
        swingPhase * 0.28,
        swingPhase * 0.22
      );
    }
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
configureSoloBotsMode();
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

function triggerWireGrappleSkill(ch) {
  if (player.isGrappling) {
    player.isGrappling = false;
    wireLine.visible = false;
    return;
  }
  if (skillState.cooldown > 0) return;

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
  skillState.cooldown = ch.skillCooldown;
  player.grappleCooldown = ch.skillCooldown;
  player.onGround = false;

  playSfx("grapple");
  showTrick("HOOK: WIRE GRAPPLE!");
}

function triggerOverdriveSkill(ch) {
  if (skillState.cooldown > 0) return;
  skillState.cooldown = ch.skillCooldown;
  skillState.overdriveTimer = 5.0;
  player.dashCooldown = 0;
  playSfx("boost");
  showTrick("BLITZ: OVERDRIVE!! (5.0s)");
}

function triggerAegisBarrierSkill(ch) {
  if (skillState.cooldown > 0) return;
  skillState.cooldown = ch.skillCooldown;
  skillState.shieldTimer = 4.0;
  player.hp = Math.min(player.maxHp, player.hp + 30);
  updateScoreAndHpUI();
  playSfx("stun");
  showTrick("VANGUARD: AEGIS BARRIER! (+30 HP / 75%軽減)");
}

function triggerShadowStepSkill(ch) {
  if (skillState.cooldown > 0) return;
  const eyePos = new THREE.Vector3(player.pos.x, player.pos.y + 1.2, player.pos.z);
  const look = getLookDirection();
  const blinkDir = new THREE.Vector3(look.x, Math.max(-0.15, look.y * 0.45), look.z).normalize();

  raycaster.set(eyePos, blinkDir);
  raycaster.far = 18.0;
  const hits = raycaster.intersectObjects(worldMeshes, false);
  const travelDist = hits.length > 0 ? Math.max(1.5, hits[0].distance - 1.1) : 18.0;

  const startTrace = eyePos.clone();
  player.pos.addScaledVector(blinkDir, travelDist);
  player.pos.y = Math.max(0.2, player.pos.y);
  player.vel.x = blinkDir.x * 16;
  player.vel.z = blinkDir.z * 16;
  player.vel.y = Math.max(player.vel.y, 4.5);
  player.isGrappling = false;
  player.isZiplining = false;
  wireLine.visible = false;

  const endTrace = new THREE.Vector3(player.pos.x, player.pos.y + 1.2, player.pos.z);
  spawnTracer(startTrace, endTrace, 0xc084fc);

  skillState.cooldown = ch.skillCooldown;
  skillState.stealthTimer = 2.5;
  playSfx("dash");
  showTrick("SPECTRE: SHADOW STEP! (ステルス 2.5s)");
}

function triggerThermalNovaSkill(ch) {
  if (skillState.cooldown > 0) return;
  skillState.cooldown = ch.skillCooldown;
  const center = player.pos.clone().add(new THREE.Vector3(0, 1.1, 0));
  let hitCount = 0;
  for (const r of getActiveRivals()) {
    if (r.dead) continue;
    const dist = r.pos.distanceTo(player.pos);
    if (dist <= 14.5) {
      hitCount++;
      const pushDir = r.pos.clone().sub(player.pos).setY(0).normalize();
      r.vel.addScaledVector(pushDir, 18.0);
      r.vel.y = Math.max(r.vel.y, 8.5);
      dealDamageToRival(r, 35, "NOVA");
      spawnTracer(center, r.pos.clone().add(new THREE.Vector3(0, 1.1, 0)), 0xfb923c);
    }
  }
  weaponState.ammo = GUNS[profile.equippedGun].maxAmmo;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  updateWeaponUI();
  playSfx("shot_shotgun");
  showTrick(`PYRO: THERMAL NOVA! (${hitCount}体命中 & 弾薬全回復)`);
}

function triggerBerserkRushSkill(ch) {
  if (skillState.cooldown > 0) return;
  skillState.cooldown = ch.skillCooldown;
  skillState.overdriveTimer = 4.5;
  player.hp = Math.min(player.maxHp, player.hp + 20);
  updateScoreAndHpUI();
  playSfx("boost");
  showTrick("TITAN: BERSERK RUSH! (+20 HP & 超加速)");
}

function triggerGrapple() {
  if (!game.active || game.over || player.dead) return;
  const ch = getSelectedChar();
  if (ch.id === "hook") {
    triggerWireGrappleSkill(ch);
  } else if (ch.id === "blitz") {
    triggerOverdriveSkill(ch);
  } else if (ch.id === "vanguard") {
    triggerAegisBarrierSkill(ch);
  } else if (ch.id === "spectre") {
    triggerShadowStepSkill(ch);
  } else if (ch.id === "pyro") {
    triggerThermalNovaSkill(ch);
  } else if (ch.id === "titan") {
    triggerBerserkRushSkill(ch);
  }
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
    if (player.dead && !game.over) {
      respawnSelf();
      return;
    }
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
  if (e.code === "KeyV" || e.code === "KeyT") {
    triggerWeaponInspect();
  }
  if (e.code === "KeyR") {
    if (player.dead && !game.over) {
      respawnSelf();
    } else if (game.active && !game.over) {
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

if (btnInspect) {
  btnInspect.addEventListener(
    "touchstart",
    (e) => {
      if (isEditingLayout) return;
      e.preventDefault();
      e.stopPropagation();
      if (!game.active) return;
      triggerWeaponInspect();
      btnInspect.classList.add("pressed");
    },
    { passive: false }
  );
  btnInspect.addEventListener("touchend", () => btnInspect.classList.remove("pressed"));
  btnInspect.addEventListener("touchcancel", () => btnInspect.classList.remove("pressed"));
}

if (btnReload) {
  btnReload.addEventListener(
    "touchstart",
    (e) => {
      if (isEditingLayout) return;
      e.preventDefault();
      e.stopPropagation();
      if (!game.active || game.over) return;
      startReload();
      btnReload.classList.add("pressed");
    },
    { passive: false }
  );
  btnReload.addEventListener("touchend", () => btnReload.classList.remove("pressed"));
  btnReload.addEventListener("touchcancel", () => btnReload.classList.remove("pressed"));
}

if (hudReloadBtn) {
  hudReloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!game.active || game.over) return;
    startReload();
  });
}

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

function tryRequestPointerLockSafe() {
  if (controlMode !== "pc" || !document.body.requestPointerLock) return;
  try {
    const res = document.body.requestPointerLock();
    if (res && typeof res.catch === "function") {
      res.catch(() => {});
    }
  } catch {
    // fallback without pointer lock
  }
}

function startOrResumeGame() {
  ensureAudio();
  if (game.over) {
    resetMatch(true);
  }
  if (player.dead && !game.over) {
    respawnSelf();
  }
  applyLoadoutUI();
  applyAllButtonPositions();
  overlay.classList.add("hidden");
  game.active = true;
  tryRequestPointerLockSafe();
}

startBtn.addEventListener("click", startOrResumeGame);

if (forceRespawnBtn) {
  forceRespawnBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (player.dead && !game.over) {
      respawnSelf();
      overlay.classList.add("hidden");
      game.active = true;
      tryRequestPointerLockSafe();
    }
  });
}

hudRetryBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  ensureAudio();
  resetMatch(true);
  overlay.classList.add("hidden");
  game.active = true;
  tryRequestPointerLockSafe();
});

hudPauseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (document.pointerLockElement) {
    document.exitPointerLock();
  }
  pauseGame();
});

document.addEventListener("pointerlockchange", () => {
  if (controlMode !== "pc") return;
  const locked = document.pointerLockElement === document.body;
  if (locked) {
    overlay.classList.add("hidden");
    game.active = true;
  } else if (!player.dead && !game.over) {
    // 死亡リスポーン待機中にロックが外れても試合は一時停止しない
    pauseGame();
  }
});

document.addEventListener("pointerlockerror", () => {
  if (controlMode === "pc" && !game.over) {
    overlay.classList.add("hidden");
    game.active = true;
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
  const activeEnemies = getActiveRivals().filter((r) => !r.dead);
  if (activeEnemies.length === 0) {
    return SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)].clone();
  }
  let bestSp = SPAWN_POINTS[0];
  let bestMinDist = -1;
  for (const sp of SPAWN_POINTS) {
    let minDist = Infinity;
    for (const r of activeEnemies) {
      const d = sp.distanceTo(r.pos);
      if (d < minDist) minDist = d;
    }
    if (minDist > bestMinDist) {
      bestMinDist = minDist;
      bestSp = sp;
    }
  }
  return bestSp.clone();
}

function respawnSelf() {
  const sp = getSpawnPoint(true);
  player.pos.copy(sp);
  player.vel.set(0, 0, 0);
  clearSkillEffects();
  skillState.cooldown = 0;
  applyCharacterStatsToPlayer(true);
  player.hp = player.maxHp;
  player.dead = false;
  player.respawnTimer = 0;
  player.respawnAtMs = 0;
  player.isSliding = false;
  player.isWallRunning = false;
  player.isGrappling = false;
  player.isZiplining = false;
  wireLine.visible = false;
  respawnBanner.classList.add("hidden");
  if (!game.over) {
    overlay.classList.add("hidden");
    game.active = true;
  }

  weaponState.ammo = GUNS[profile.equippedGun].maxAmmo;
  weaponState.reloading = false;
  weaponState.reloadTimer = 0;
  updateWeaponUI();
  updateScoreAndHpUI();
  showTrick("RESPAWN!");

  if (net.connected) {
    sendNet({ type: "respawned", x: player.pos.x, y: player.pos.y, z: player.pos.z });
  }
}

function applyDamageToSelf(dmg, weaponName = "WEAPON", attackerId = null) {
  if (player.dead || game.over) return;
  const mitigatedDmg = skillState.shieldTimer > 0 ? Math.max(1, Math.round(dmg * 0.25)) : dmg;
  player.hp = Math.max(0, player.hp - mitigatedDmg);
  player.damageFlash = 0.35;
  playSfx("hit");
  updateScoreAndHpUI();

  if (player.hp <= 0) {
    player.dead = true;
    player.respawnTimer = 3.0;
    player.respawnAtMs = performance.now() + 3000;
    player.vel.set(0, 0, 0);
    player.isGrappling = false;
    player.isZiplining = false;
    wireLine.visible = false;
    weaponState.manualFireHeld = false;
    playSfx("caught");
    respawnBanner.classList.remove("hidden");
    respawnTimerDisplay.textContent = "3.0";

    const killer = attackerId
      ? rivals.find((r) => r.active && (r.peerId === attackerId || r.id === attackerId))
      : null;
    if (killer) {
      killer.kills += 1;
      showTrick(`${killer.name} に撃破された！`);
    }
    updateScoreAndHpUI();

    if (net.connected) {
      sendNet({ type: "killed", killerPeer: attackerId || "" });
    }

    if (killer && killer.kills >= game.targetKills) {
      triggerMatchEnd(false, killer.name);
    }
  }
}

let matchEndOverlayTimer = null;
const victoryAnim = {
  active: false,
  isWin: false,
  timer: 0,
  basePos: new THREE.Vector3(),
  baseYaw: 0,
  pillarMesh: null,
  sparks: [],
};

function clearVictory3DEffects() {
  victoryAnim.active = false;
  victoryAnim.timer = 0;
  if (victoryAnim.pillarMesh) {
    scene.remove(victoryAnim.pillarMesh);
    victoryAnim.pillarMesh.geometry.dispose();
    victoryAnim.pillarMesh.material.dispose();
    victoryAnim.pillarMesh = null;
  }
  for (const sp of victoryAnim.sparks) {
    scene.remove(sp.mesh);
    sp.mesh.geometry.dispose();
    sp.mesh.material.dispose();
  }
  victoryAnim.sparks = [];
}

function startVictory3DCelebration(isWin) {
  clearVictory3DEffects();
  victoryAnim.active = true;
  victoryAnim.isWin = isWin;
  victoryAnim.timer = 0;
  victoryAnim.basePos.copy(player.pos);
  victoryAnim.baseYaw = player.yaw;

  if (!isWin) return;

  // 1. 勝者の位置から天へ昇る黄金のビクトリーライトピラー（光の柱）
  const pillarGeo = new THREE.CylinderGeometry(1.6, 2.8, 95, 24, 1, true);
  const pillarMat = new THREE.MeshBasicMaterial({
    color: 0xfde047,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const pillar = new THREE.Mesh(pillarGeo, pillarMat);
  pillar.position.set(player.pos.x, player.pos.y + 46, player.pos.z);
  scene.add(pillar);
  victoryAnim.pillarMesh = pillar;

  // 2. 周囲に打ち上がる3D花火＆光のパーティクル（55個）
  const sparkColors = [0xfde047, 0x38bdf8, 0xf43f5e, 0x34d399, 0xe879f9];
  for (let i = 0; i < 55; i++) {
    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24, 0),
      new THREE.MeshBasicMaterial({
        color: sparkColors[i % sparkColors.length],
        transparent: true,
        opacity: 0.95,
      })
    );
    const angle = (i / 55) * Math.PI * 2 + Math.random() * 0.4;
    const radius = 1.5 + Math.random() * 3.5;
    mesh.position.set(
      player.pos.x + Math.cos(angle) * radius,
      player.pos.y + 1.0 + Math.random() * 1.5,
      player.pos.z + Math.sin(angle) * radius
    );
    const speedOut = 4.5 + Math.random() * 8.5;
    const vel = new THREE.Vector3(
      Math.cos(angle) * speedOut,
      8.0 + Math.random() * 11.0,
      Math.sin(angle) * speedOut
    );
    scene.add(mesh);
    victoryAnim.sparks.push({ mesh, vel, life: 2.4 });
  }
}

function updateVictory3DCelebration(dt) {
  if (!victoryAnim.active) return;
  victoryAnim.timer += dt;
  const t = victoryAnim.timer;

  if (victoryAnim.isWin) {
    // 勝利時のシネマティック・オービットカメラ（ゆっくり上昇しながら旋回してフィールドを見渡す）
    const orbitYaw = victoryAnim.baseYaw + t * 0.85;
    const liftY = Math.min(4.2, t * 1.6);
    const backDist = Math.min(4.5, t * 2.0);
    camera.position.set(
      victoryAnim.basePos.x + Math.sin(orbitYaw) * backDist,
      victoryAnim.basePos.y + player.currentHeight + liftY,
      victoryAnim.basePos.z + Math.cos(orbitYaw) * backDist
    );
    camera.rotation.order = "YXZ";
    camera.rotation.y = orbitYaw;
    camera.rotation.x = -0.18;
    camera.rotation.z = 0;

    // 武器・近接武器を掲げてクルクル祝うビクトリーモーション
    weaponRoot.position.set(
      weaponBasePos.x - 0.10,
      weaponBasePos.y + 0.11 + Math.sin(t * 7) * 0.025,
      weaponBasePos.z + 0.04
    );
    weaponRoot.rotation.set(0.35, t * 5.2, -0.35);

    if (victoryAnim.pillarMesh) {
      victoryAnim.pillarMesh.rotation.y += dt * 1.8;
      victoryAnim.pillarMesh.material.opacity = 0.24 + Math.sin(t * 8) * 0.1;
    }

    for (const sp of victoryAnim.sparks) {
      sp.vel.y -= 11.5 * dt;
      sp.mesh.position.addScaledVector(sp.vel, dt);
      sp.mesh.rotation.x += dt * 6;
      sp.mesh.rotation.y += dt * 6;
      sp.life -= dt;
      sp.mesh.material.opacity = Math.max(0, sp.life / 2.4);
    }
  } else {
    // 敗北時はゆっくり視線が下がる演出
    camera.rotation.order = "YXZ";
    camera.rotation.x = Math.max(-0.55, -t * 0.25);
  }
}

function hideFinishCelebration() {
  clearVictory3DEffects();
  if (matchEndOverlayTimer) {
    clearTimeout(matchEndOverlayTimer);
    matchEndOverlayTimer = null;
  }
  if (matchFinishBanner) {
    matchFinishBanner.classList.add("hidden");
    matchFinishBanner.classList.remove("defeat");
  }
  if (confettiLayer) confettiLayer.innerHTML = "";
  if (modalBox) {
    modalBox.classList.remove("victory-modal", "defeat-modal");
  }
}

function resetMatch(broadcast = false) {
  hideFinishCelebration();
  let slotIndex = 0;
  if (net.connected && net.mode === "client") {
    const idx = rivals.findIndex((r) => r.active);
    slotIndex = idx >= 0 ? idx + 1 : 1;
  }
  const myStart = SPAWN_POINTS[slotIndex % SPAWN_POINTS.length].clone();

  player.pos.copy(myStart);
  player.vel.set(0, 0, 0);
  player.yaw = Math.atan2(-myStart.x, -myStart.z);
  player.pitch = 0;
  clearSkillEffects();
  skillState.cooldown = 0;
  applyCharacterStatsToPlayer(true);
  player.hp = player.maxHp;
  player.dead = false;
  player.respawnTimer = 0;
  player.damageFlash = 0;
  player.isSliding = false;
  player.slideTimer = 0;
  player.slideCooldown = 0;
  player.isWallRunning = false;
  player.lurchTimer = 0;
  player.lastWishX = 0;
  player.lastWishZ = 0;
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

  rivals.forEach((r, idx) => {
    const sp = SPAWN_POINTS[(idx + 1) % SPAWN_POINTS.length].clone();
    r.pos.copy(sp);
    r.targetPos.copy(sp);
    r.vel.set(0, 0, 0);
    r.hp = r.maxHp;
    r.dead = false;
    r.respawnTimer = 0;
    r.hitFlashTimer = 0;
    r.kills = 0;
    r.botFireCooldown = 1.0 + idx * 0.35;
    r.group.visible = r.active;
    r.group.position.copy(sp);
    updateRivalHpBarVisual(r);
  });

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
  const activeCh = getSelectedChar();
  const overdriveMult = skillState.overdriveTimer > 0 ? 1.28 : 1.0;
  const charMoveMult = activeCh.speedMult * overdriveMult;

  if (player.dashCooldown > 0) player.dashCooldown = Math.max(0, player.dashCooldown - dt);
  if (skillState.cooldown > 0) skillState.cooldown = Math.max(0, skillState.cooldown - dt);
  player.grappleCooldown = skillState.cooldown;
  if (skillState.overdriveTimer > 0) skillState.overdriveTimer = Math.max(0, skillState.overdriveTimer - dt);
  if (skillState.shieldTimer > 0) skillState.shieldTimer = Math.max(0, skillState.shieldTimer - dt);
  if (skillState.stealthTimer > 0) skillState.stealthTimer = Math.max(0, skillState.stealthTimer - dt);

  if (skillActiveBanner) {
    if (skillState.overdriveTimer > 0) {
      skillActiveBanner.classList.remove("hidden");
      skillActiveBanner.textContent = `OVERDRIVE ACTIVE ${skillState.overdriveTimer.toFixed(1)}s`;
    } else if (skillState.shieldTimer > 0) {
      skillActiveBanner.classList.remove("hidden");
      skillActiveBanner.textContent = `AEGIS SHIELD 75%軽減 ${skillState.shieldTimer.toFixed(1)}s`;
    } else if (skillState.stealthTimer > 0) {
      skillActiveBanner.classList.remove("hidden");
      skillActiveBanner.textContent = `SHADOW STEALTH ${skillState.stealthTimer.toFixed(1)}s`;
    } else {
      skillActiveBanner.classList.add("hidden");
    }
  }
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
      // スライディング開始（超低摩擦＆モメンタム継承）
      const slideKey =
        keys["ShiftLeft"] || keys["ShiftRight"] || keys["KeyC"] || touchInput.slideHeld;
      const horizVel = new THREE.Vector3(player.vel.x, 0, player.vel.z);
      const currentSpeed = horizVel.length();

      if (
        slideKey &&
        player.onGround &&
        !player.isSliding &&
        player.slideCooldown <= 0 &&
        currentSpeed > 3.2
      ) {
        player.isSliding = true;
        player.slideTimer = CONFIG.slideDuration;
        player.slideCooldown = CONFIG.slideCooldown;
        const dir =
          wishDir.lengthSq() > 0.05 ? wishDir.clone().normalize() : horizVel.clone().normalize();
        const boost = Math.max(
          currentSpeed + 5.2,
          (CONFIG.slideBoost + (activeCh.slideBoostAdd || 0)) * charMoveMult
        );
        player.vel.x = dir.x * Math.min(boost, CONFIG.maxSpeed);
        player.vel.z = dir.z * Math.min(boost, CONFIG.maxSpeed);
        playSfx("slide");
        showTrick("SLIDE BOOST!");
      }

      if (player.isSliding) {
        player.slideTimer -= dt;
        const slideSpeed = Math.hypot(player.vel.x, player.vel.z);
        if (player.slideTimer <= 0 || !slideKey || !player.onGround || slideSpeed < 3.6) {
          player.isSliding = false;
        }
      }

      // 水平加速＆摩擦（スライディング中は超低摩擦＋カービングステア）
      if (player.onGround) {
        const friction = player.isSliding ? CONFIG.slideFriction : CONFIG.groundFriction;
        const speed = Math.hypot(player.vel.x, player.vel.z);
        if (speed > 0.01) {
          const drop = speed * friction * dt;
          const newSpeed = Math.max(0, speed - drop);
          player.vel.x *= newSpeed / speed;
          player.vel.z *= newSpeed / speed;
        }

        // スライディング中の緩やかな方向転換（カービング）
        if (player.isSliding && wishDir.lengthSq() > 0.01) {
          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (sp > 2.0) {
            const curDir = new THREE.Vector3(player.vel.x / sp, 0, player.vel.z / sp);
            const targetDir = wishDir.clone().normalize();
            curDir.lerp(targetDir, Math.min(1, dt * 3.4)).normalize();
            player.vel.x = curDir.x * sp;
            player.vel.z = curDir.z * sp;
          }
        }

        const effBaseSpeed = CONFIG.baseSpeed * charMoveMult;
        if (!player.isSliding && wishDir.lengthSq() > 0.01) {
          player.vel.x += wishDir.x * CONFIG.groundAccel * charMoveMult * dt;
          player.vel.z += wishDir.z * CONFIG.groundAccel * charMoveMult * dt;
          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (sp > effBaseSpeed && !player.isSliding) {
            const target = Math.max(effBaseSpeed, sp - 12 * dt);
            player.vel.x *= target / sp;
            player.vel.z *= target / sp;
          }
        }
      } else {
        // 空中ストレイフ（Air-Strafe）＆ タップストレイフ（Tap-Strafe / Lurch）
        if (player.lurchTimer > 0) {
          player.lurchTimer = Math.max(0, player.lurchTimer - dt);
        }

        const sp = Math.hypot(player.vel.x, player.vel.z);
        if (wishDir.lengthSq() > 0.01) {
          const wishNorm = wishDir.clone().normalize();
          const wishChanged =
            Math.hypot(wishNorm.x - player.lastWishX, wishNorm.z - player.lastWishZ) > 0.25;

          // ジャンプ・壁キック・パッド直後のタップストレイフ（速度を保ったまま進行方向を鋭角に曲げられる）
          if (player.lurchTimer > 0 && sp > 7.5 && (wishChanged || player.lurchTimer > 0.22)) {
            const curDir = new THREE.Vector3(player.vel.x / sp, 0, player.vel.z / sp);
            const turnStrength = wishChanged ? Math.min(1, dt * 16.5) : Math.min(1, dt * 9.5);
            curDir.lerp(wishNorm, turnStrength).normalize();
            player.vel.x = curDir.x * sp;
            player.vel.z = curDir.z * sp;

            if (wishChanged && performance.now() - player.lastTapStrafeTime > 900) {
              player.lastTapStrafeTime = performance.now();
              showTrick("TAP STRAFE!");
            }
          } else if (sp > 6.5) {
            // 通常の空中ストレイフ：カメラ旋回＋左右キーで速度を落とさず綺麗にカーブ
            const curDir = new THREE.Vector3(player.vel.x / sp, 0, player.vel.z / sp);
            curDir.lerp(wishNorm, Math.min(1, dt * 4.2)).normalize();
            const boostedAirSp = Math.min(CONFIG.maxSpeed, sp + 2.2 * dt);
            player.vel.x = curDir.x * boostedAirSp;
            player.vel.z = curDir.z * boostedAirSp;
          } else {
            player.vel.x += wishDir.x * CONFIG.airAccel * dt;
            player.vel.z += wishDir.z * CONFIG.airAccel * dt;
            const newSp = Math.hypot(player.vel.x, player.vel.z);
            if (newSp > CONFIG.maxSpeed) {
              player.vel.x *= CONFIG.maxSpeed / newSp;
              player.vel.z *= CONFIG.maxSpeed / newSp;
            }
          }
          player.lastWishX = wishNorm.x;
          player.lastWishZ = wishNorm.z;
        } else {
          player.lastWishX = 0;
          player.lastWishZ = 0;
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

          player.lurchTimer = 0.48;
          const sp = Math.hypot(player.vel.x, player.vel.z);
          if (player.isSliding || sp > CONFIG.baseSpeed + 1.2) {
            const boost = Math.min(sp + 2.4, CONFIG.maxSpeed);
            const dir = new THREE.Vector3(player.vel.x, 0, player.vel.z).normalize();
            player.vel.x = dir.x * boost;
            player.vel.z = dir.z * boost;
            showTrick(player.isSliding ? "SLIDE JUMP!" : "BUNNY HOP!");
          }
          player.isSliding = false;
          playSfx("jump");
        } else if (player.isWallRunning) {
          player.lurchTimer = 0.48;
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
        player.lurchTimer = 0.55;
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
  } else if (player.isSliding) {
    const sideMove = right.x * player.vel.x + right.z * player.vel.z;
    targetTilt = sideMove >= 0 ? -0.055 : 0.055;
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

  // 固有スキル照準アシスト表示（HOOKはワイヤー射程内、他キャラはCD完了でREADY発光）
  const isHookChar = activeCh.id === "hook";
  const canUseSkill = isHookChar
    ? (skillState.cooldown <= 0 && !player.isGrappling && Boolean(findGrappleHit()))
    : (skillState.cooldown <= 0);
  player.canGrappleNow = isHookChar && canUseSkill;
  crosshair.classList.toggle("can-grapple", isHookChar && canUseSkill);
  btnGrapple.classList.toggle("ready-target", canUseSkill);

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
function updateRivalHpBarVisual(r) {
  if (!r.hpBarGroup || !r.hpFillMesh) return;
  const ratio = Math.max(0, Math.min(1, r.hp / Math.max(1, r.maxHp)));
  r.hpFillMesh.scale.x = Math.max(0.001, ratio);
  r.hpFillMesh.position.x = -(1 - ratio) * 0.55;
  r.hpFillMesh.material.color.setHex(
    ratio > 0.5 ? 0x22c55e : ratio > 0.25 ? 0xfacc15 : 0xef4444
  );
  r.hpBarGroup.lookAt(camera.position);
}

function getBotSafeSpawnPoint(selfRival) {
  let bestSp = SPAWN_POINTS[0];
  let bestMinDist = -1;
  for (const sp of SPAWN_POINTS) {
    let minDist = player.dead ? 999 : sp.distanceTo(player.pos);
    for (const other of getActiveRivals()) {
      if (other === selfRival || other.dead) continue;
      const d = sp.distanceTo(other.pos);
      if (d < minDist) minDist = d;
    }
    if (minDist > bestMinDist) {
      bestMinDist = minDist;
      bestSp = sp;
    }
  }
  return bestSp.clone();
}

function updateSingleRival(r, dt) {
  if (!r.active) {
    r.group.visible = false;
    return;
  }

  if (r.hitFlashTimer > 0) {
    r.hitFlashTimer = Math.max(0, r.hitFlashTimer - dt);
    r.body.material.color.setHex(0xffffff);
    r.body.material.emissive.setHex(0xf59e0b);
  } else {
    const rCh = CHARACTERS[r.charKey] || CHARACTERS.vanguard;
    r.body.material.color.setHex(rCh.bodyColor);
    r.body.material.emissive.setHex(rCh.emissiveColor);
    r.body.material.transparent = Boolean(r.stealthActive);
    r.body.material.opacity = r.stealthActive ? 0.22 : 1.0;
  }

  if (r.isRemotePlayer && net.connected) {
    r.pos.lerp(r.targetPos, Math.min(1, dt * 18));
    r.group.position.copy(r.pos);
    r.group.rotation.y = r.yaw + Math.PI;
    r.group.visible = !r.dead;
    if (!r.dead) updateRivalHpBarVisual(r);
    return;
  }

  if (r.dead) {
    r.group.visible = false;
    r.respawnTimer -= dt;
    const nowMs = performance.now();
    if (r.respawnTimer <= 0 || (r.respawnAtMs > 0 && nowMs >= r.respawnAtMs)) {
      const sp = getBotSafeSpawnPoint(r);
      r.pos.copy(sp);
      r.targetPos.copy(sp);
      r.vel.set(0, 0, 0);
      r.hp = r.maxHp;
      r.dead = false;
      r.respawnTimer = 0;
      r.respawnAtMs = 0;
      r.hitFlashTimer = 0;
      r.shieldActive = false;
      r.stealthActive = false;
      r.botStuckTimer = 0;
      r.botAvoidTimer = 0;
      r.botFireCooldown = 0.85;
      r.group.position.copy(r.pos);
      r.group.visible = true;
      updateRivalHpBarVisual(r);
      updateScoreAndHpUI();
    }
    return;
  }

  let targetPos = player.dead ? null : player.pos;
  let targetType = "player";
  let targetBot = null;
  let bestDist = player.dead ? Infinity : r.pos.distanceTo(player.pos);

  for (const other of getActiveRivals()) {
    if (other === r || other.dead) continue;
    const d = r.pos.distanceTo(other.pos);
    if (d < bestDist * 0.88) {
      bestDist = d;
      targetPos = other.pos;
      targetType = "bot";
      targetBot = other;
    }
  }

  const focusPos = targetPos || new THREE.Vector3(0, 2, 0);
  const toTarget = new THREE.Vector3(focusPos.x - r.pos.x, 0, focusPos.z - r.pos.z);
  const distHoriz = toTarget.length();
  if (distHoriz > 0.01) toTarget.divideScalar(distHoriz);

  r.botStrafeTimer -= dt;
  if (r.botStrafeTimer <= 0) {
    r.botStrafeDir *= -1;
    r.botStrafeTimer = 1.0 + Math.random() * 1.3;
  }

  const rCh = CHARACTERS[r.charKey] || CHARACTERS.vanguard;
  const botGun = GUNS[r.weaponKey] || GUNS.rifle;
  const preferredDist = botGun.key === "shotgun" ? 13 : botGun.key === "smg" ? 20 : 28;
  const strafe = new THREE.Vector3(-toTarget.z * r.botStrafeDir, 0, toTarget.x * r.botStrafeDir);
  const approach = distHoriz > preferredDist + 8 ? 1.0 : distHoriz < preferredDist - 6 ? -0.55 : 0.18;

  // CPU パルクール・空中ダッシュ＆スキル活用
  if (r.botDashCooldown > 0) r.botDashCooldown -= dt;
  if (r.botSkillCooldown > 0) r.botSkillCooldown -= dt;
  if (r.botAvoidTimer > 0) r.botAvoidTimer -= dt;

  let moveDirX = toTarget.x * approach + strafe.x * 0.88;
  let moveDirZ = toTarget.z * approach + strafe.z * 0.88;
  if (r.botAvoidTimer > 0) {
    moveDirX = r.botAvoidDir.x;
    moveDirZ = r.botAvoidDir.z;
  }
  const moveLen = Math.hypot(moveDirX, moveDirZ);
  if (moveLen > 0.01) {
    moveDirX /= moveLen;
    moveDirZ /= moveLen;
  }

  const botSpeed = 12.2 * rCh.speedMult;
  r.vel.x = moveDirX * botSpeed;
  r.vel.z = moveDirZ * botSpeed;

  // 相手が高い場所にいる場合は近くのジャンプパッドへ誘導
  if (focusPos.y > r.pos.y + 6.0 && r.onGround) {
    for (const pad of jumpPads) {
      const pd = Math.hypot(pad.x - r.pos.x, pad.z - r.pos.z);
      if (pd < 24 && Math.abs(pad.y - r.pos.y) < 3.0) {
        const toPadX = (pad.x - r.pos.x) / Math.max(0.1, pd);
        const toPadZ = (pad.z - r.pos.z) / Math.max(0.1, pd);
        r.vel.x = toPadX * botSpeed * 1.1;
        r.vel.z = toPadZ * botSpeed * 1.1;
        break;
      }
    }
  }

  // 空中ダッシュで高速接近・回避
  if (r.botDashCooldown <= 0 && distHoriz > 24 && distHoriz < 95 && r.botAvoidTimer <= 0) {
    r.botDashCooldown = 3.2 + Math.random() * 1.6;
    r.vel.x = moveDirX * 22.0;
    r.vel.z = moveDirZ * 22.0;
    r.vel.y = Math.max(r.vel.y, 7.5);
  }

  r.vel.y -= CONFIG.gravity * dt;

  if (r.jumpCooldown > 0) r.jumpCooldown -= dt;
  const prevX = r.pos.x;
  const prevZ = r.pos.z;

  r.pos.x += r.vel.x * dt;
  r.pos.y += r.vel.y * dt;
  r.pos.z += r.vel.z * dt;

  const col = resolveCollisions(r.pos, r.vel, 0.6, 1.9, dt);
  r.onGround = col.onGround;

  for (const pad of jumpPads) {
    const dx = r.pos.x - pad.x;
    const dz = r.pos.z - pad.z;
    if (dx * dx + dz * dz < pad.radius * pad.radius && Math.abs(r.pos.y - pad.y) < 1.4) {
      r.vel.y = pad.force * 0.95;
      r.onGround = false;
    }
  }

  for (const b of boostPads) {
    if (
      r.pos.x >= b.minX &&
      r.pos.x <= b.maxX &&
      r.pos.z >= b.minZ &&
      r.pos.z <= b.maxZ &&
      Math.abs(r.pos.y - b.y) < 1.2
    ) {
      r.vel.x = moveDirX * 24.0;
      r.vel.z = moveDirZ * 24.0;
    }
  }

  // 壁衝突時の賢い回避（ジャンプ乗り越え＋壁沿いスライド旋回）
  const moved = Math.hypot(r.pos.x - prevX, r.pos.z - prevZ);
  if (col.hitWallNormal || moved < botSpeed * dt * 0.35) {
    r.botStuckTimer += dt;
    if (r.onGround && r.jumpCooldown <= 0) {
      r.vel.y = 13.0;
      r.jumpCooldown = 0.65;
    }
    if (r.botStuckTimer > 0.28) {
      r.botStuckTimer = 0;
      r.botStrafeDir *= -1;
      const n = col.hitWallNormal || new THREE.Vector3(-moveDirX, 0, -moveDirZ);
      const tangent = new THREE.Vector3(-n.z * r.botStrafeDir, 0, n.x * r.botStrafeDir).normalize();
      r.botAvoidDir.copy(tangent.addScaledVector(n, 0.35)).normalize();
      r.botAvoidTimer = 0.75;
    }
  } else {
    r.botStuckTimer = Math.max(0, r.botStuckTimer - dt);
    if (r.onGround && r.jumpCooldown <= 0 && Math.random() < 0.022) {
      r.vel.y = 11.8;
      r.jumpCooldown = 0.85;
    }
  }

  r.group.position.copy(r.pos);
  r.group.lookAt(focusPos.x, r.pos.y, focusPos.z);
  r.group.visible = true;
  updateRivalHpBarVisual(r);

  if (targetPos && bestDist < botGun.range + 15) {
    r.botFireCooldown -= dt;
    if (r.botFireCooldown <= 0) {
      r.botFireCooldown =
        botGun.key === "smg" ? 0.52 + Math.random() * 0.32 :
        botGun.key === "shotgun" ? 0.95 + Math.random() * 0.45 :
        0.72 + Math.random() * 0.42;

      const botEye = r.pos.clone().add(new THREE.Vector3(0, 1.4, 0));
      const aimPt = targetPos.clone().add(new THREE.Vector3(0, 1.1, 0));
      const dir = aimPt.clone().sub(botEye);
      const d = dir.length();
      dir.normalize();
      raycaster.set(botEye, dir);
      raycaster.far = d;
      const wallHits = raycaster.intersectObjects(worldMeshes, false);
      if (wallHits.length === 0) {
        const stealthPenalty = targetType === "player" && skillState.stealthTimer > 0 ? 0.08 : 1.0;
        const baseHitProb = (botGun.key === "shotgun" ? 0.46 : 0.38) * stealthPenalty;
        const isHit = Math.random() < baseHitProb;
        const endPt = isHit
          ? aimPt
          : aimPt.clone().add(new THREE.Vector3((Math.random() - 0.5) * 3.0, (Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 3.0));
        spawnTracer(botEye, endPt, botGun.defaultColor || rCh.bodyColor);

        const dmgPerShot =
          botGun.key === "shotgun" ? 18 :
          botGun.key === "smg" ? 8 : 12;

        if (isHit) {
          if (targetType === "player") {
            applyDamageToSelf(dmgPerShot, `${r.name} (${botGun.shortName})`, r.id);
          } else if (targetBot && !targetBot.dead) {
            targetBot.hitFlashTimer = 0.12;
            targetBot.hp = Math.max(0, targetBot.hp - (dmgPerShot + 4));
            updateRivalHpBarVisual(targetBot);
            if (targetBot.hp <= 0) {
              targetBot.dead = true;
              targetBot.respawnTimer = 2.5;
              targetBot.respawnAtMs = performance.now() + 2500;
              targetBot.group.visible = false;
              r.kills += 1;
              if (matchPlayerCount === 4) {
                r.hp = Math.min(r.maxHp, r.hp + 45);
                updateRivalHpBarVisual(r);
              }
              updateScoreAndHpUI();
              if (r.kills >= game.targetKills) {
                triggerMatchEnd(false, r.name);
              }
            }
          }
        }
      }
    }
  }
}

function updateRival(dt) {
  let nearestDist = Infinity;
  let nearestAlive = null;
  for (const r of rivals) {
    updateSingleRival(r, dt);
    if (r.active && !r.dead) {
      const d = r.pos.distanceTo(player.pos);
      if (d < nearestDist) {
        nearestDist = d;
        nearestAlive = r;
      }
    }
  }
  distDisplay.textContent = Number.isFinite(nearestDist) ? nearestDist.toFixed(1) : "--";
  if (altDisplay) {
    altDisplay.textContent = Math.max(0, Math.round(player.pos.y));
  }

  // HUD右下の ENEMY HP バーを「照準中の相手」または「最も近い生存中の敵」とリアルタイム連動
  const trackedRival = weaponState.isAimingOni || nearestAlive;
  if (enemyHpHudFill && enemyHpHudLabel) {
    if (trackedRival && !trackedRival.dead) {
      const pct = Math.max(0, Math.min(100, (trackedRival.hp / Math.max(1, trackedRival.maxHp)) * 100));
      enemyHpHudFill.style.width = `${pct}%`;
      enemyHpHudLabel.textContent = `${trackedRival.name} HP ${Math.ceil(trackedRival.hp)}`;
    } else {
      enemyHpHudFill.style.width = "0%";
      enemyHpHudLabel.textContent = "ENEMY KO / RESPAWNING...";
    }
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
  const step = size / 8;
  for (let i = 1; i < 8; i++) {
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

  // 対戦相手（最大3体・生存中の敵をマップに表示）
  const pulse = 4.5 + Math.sin(now * 0.01) * 2.2;
  for (const r of getActiveRivals()) {
    if (r.dead) continue;
    const ox = toMapX(r.pos.x);
    const oy = toMapY(r.pos.z);
    const rCh = CHARACTERS[r.charKey] || CHARACTERS.vanguard;
    ctx.strokeStyle = "rgba(239, 68, 68, 0.75)";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(ox, oy, pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = rCh.cssColor || "#ef4444";
    ctx.beginPath();
    ctx.arc(ox, oy, 3.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // プレイヤー
  ctx.fillStyle = "#38bdf8";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(px, py, 3.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function spawnVictoryConfetti() {
  if (!confettiLayer) return;
  confettiLayer.innerHTML = "";
  const colors = ["#fde047", "#38bdf8", "#f43f5e", "#34d399", "#c084fc", "#fb923c"];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${1.4 + Math.random() * 1.6}s`;
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    confettiLayer.appendChild(piece);
  }
}

function triggerMatchEnd(isWin, winnerName = "") {
  if (game.over) return;
  game.over = true;
  game.active = false;
  wireLine.visible = false;
  respawnBanner.classList.add("hidden");
  resetJoystickVisual();
  touchInput.slideHeld = false;
  touchInput.lookTouchId = null;
  weaponState.manualFireHeld = false;
  playSfx(isWin ? "victory" : "caught");

  if (document.pointerLockElement) {
    document.exitPointerLock();
  }

  const rewardCr = isWin ? (net.connected ? 220 : 85) : (net.connected ? 35 : 15);
  addCoins(rewardCr);

  const ranking = getAllParticipantsScoreList();
  const topRival = ranking.find((p) => !p.isMe);
  const championLabel = winnerName || (isWin ? "YOU" : topRival ? topRival.name : "RIVAL");
  const scoreSummary = isWin
    ? `1位 YOU (${game.myKills}キル) / 目標 ${game.targetKills}キル達成`
    : `勝者: ${championLabel} / あなた: ${game.myKills}キル`;

  if (matchFinishBanner) {
    matchFinishBanner.classList.remove("hidden", "defeat");
    if (!isWin) matchFinishBanner.classList.add("defeat");
    if (finishKicker) {
      finishKicker.textContent = isWin ? "★ WINNER ★ MATCH VICTORY" : "MATCH FINISHED";
    }
    if (finishMainTitle) {
      finishMainTitle.textContent = isWin ? "VICTORY!!" : "DEFEAT...";
    }
    if (finishScoreLine) {
      finishScoreLine.textContent = scoreSummary;
    }
    if (finishRewardLine) {
      finishRewardLine.textContent = isWin
        ? `勝利報酬 +${rewardCr} CR GET!`
        : `参加報酬 +${rewardCr} CR GET`;
    }
    if (isWin) {
      spawnVictoryConfetti();
    }
  }
  startVictory3DCelebration(isWin);

  if (matchEndOverlayTimer) clearTimeout(matchEndOverlayTimer);
  matchEndOverlayTimer = setTimeout(() => {
    if (matchFinishBanner) matchFinishBanner.classList.add("hidden");
    if (modalBox) {
      modalBox.classList.remove("victory-modal", "defeat-modal");
      modalBox.classList.add(isWin ? "victory-modal" : "defeat-modal");
    }
    modalTitle.innerHTML = isWin
      ? `<span style="color:#fde047;">★ VICTORY!! あなたの勝利！ ★</span>`
      : `<span style="color:#f87171;">DEFEAT... 敗北</span>`;
    modalDesc.innerHTML =
      `最終スコア: <strong>${scoreSummary}</strong><br />` +
      `獲得報酬: <strong style="color:#fde047;">+${rewardCr} CR</strong>（現在の所持: <strong>${profile.coins} CR</strong>）`;
    startBtn.textContent = "もう一度対戦する";
    overlay.classList.remove("hidden");
  }, 2400);
}

// ==========================================
// メインループ
// ==========================================
let lastTime = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;

  if (valKillTimer > 0) {
    valKillTimer -= dt;
    if (valKillTimer <= 0 && valKillBanner) {
      valKillBanner.classList.remove("active");
    }
  }
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

  // 試合終了前であれば、ポインターロックが外れていてもリスポーンタイマーは絶対に止めない
  if (!game.over && player.dead) {
    const remainSec = player.respawnAtMs > 0
      ? Math.max(0, (player.respawnAtMs - now) / 1000)
      : Math.max(0, player.respawnTimer - dt);
    player.respawnTimer = remainSec;
    if (respawnTimerDisplay) {
      respawnTimerDisplay.textContent = remainSec.toFixed(1);
    }
    if (remainSec <= 0) {
      respawnSelf();
    }
  }

  if (game.active && !game.over) {
    game.elapsed += dt;
    if (!player.dead) {
      updatePlayer(dt);
    }
    updateRival(dt);
    updateWeapon(dt);

  } else if (!game.over && player.dead) {
    for (const r of rivals) {
      if (r.active && r.dead) {
        updateSingleRival(r, dt);
      }
    }
  }

  if (game.active && !game.over) {
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
        kills: game.myKills,
        w: weaponState.activeSlot,
        ch: selectedCharKey,
        sh: skillState.shieldTimer > 0,
        st: skillState.stealthTimer > 0,
      });
    }
  }

  if (game.over) {
    updateVictory3DCelebration(dt);
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
