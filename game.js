import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// ==========================================
// A: BLITZ スピード倍率＆B: 飛翔弾丸 調整パラメータ
// ==========================================
const BLITZ_SPEED_MULT = 1.45;
const BLITZ_SLIDE_BOOST_ADD = 6.0;
const BLITZ_OVERDRIVE_MULT = 1.75;

const VISIBLE_BULLET_CONFIG = {
  speed: 92.0,       // 3D弾丸が空間を飛ぶ速さ (m/s)
  radius: 0.095,     // 弾丸の太さ
  length: 0.95,      // 光る弾芯の長さ
  trailLife: 0.22,   // 弾道トレイルが残る秒数
};

const CONFIG = {
  eyeHeight: 1.7,
  gravity: 28.0,
  runSpeed: 10.5,
  jumpVelocity: 11.2,
  dashSpeed: 24.0,
  dashDuration: 0.18,
  dashCooldown: 1.6,
  zipSpeed: 22.0,
  baseFov: 78,
  maxFov: 104,
  lookSensitivity: 0.0024,
  respawnDelay: 3.0,
  botFireInterval: 0.78,
};

const CHARACTERS = {
  blitz: {
    id: "blitz",
    name: "BLITZ",
    jpName: "ブリッツ",
    role: "SPEEDSTER",
    color: "#facc15",
    bodyColor: 0xfacc15,
    maxHp: 95,
    speedMult: BLITZ_SPEED_MULT,
    slideBoostAdd: BLITZ_SLIDE_BOOST_ADD,
    skillName: "オーバードライブ",
    skillShort: "OVERDRIVE",
    skillDesc: "3.2秒間、移動・連射・リロードを超加速（1.75倍）させるスピードスキル。",
  },
  hook: {
    id: "hook",
    name: "HOOK",
    jpName: "フック",
    role: "GRAPPLER",
    color: "#38bdf8",
    bodyColor: 0x38bdf8,
    maxHp: 100,
    speedMult: 1.0,
    slideBoostAdd: 0.0,
    skillName: "ワイヤーグラップル",
    skillShort: "WIRE",
    skillDesc: "最寄りのアンカー方向へ高速引き寄せ移動する。",
  },
  vanguard: {
    id: "vanguard",
    name: "VANGUARD",
    jpName: "ヴァンガード",
    role: "TANK / HEAL",
    color: "#34d399",
    bodyColor: 0x34d399,
    maxHp: 130,
    speedMult: 0.94,
    slideBoostAdd: 0.0,
    skillName: "パルスリペア",
    skillShort: "REPAIR",
    skillDesc: "最大HP130の高耐久に加え、HPを+40回復する。",
  },
  spectre: {
    id: "spectre",
    name: "SPECTRE",
    jpName: "スペクター",
    role: "PHANTOM",
    color: "#c084fc",
    bodyColor: 0xc084fc,
    maxHp: 100,
    speedMult: 1.05,
    slideBoostAdd: 1.0,
    skillName: "フェーズシフト",
    skillShort: "PHASE",
    skillDesc: "前方へ高速ダッシュし、2.2秒間ダメージを無効化する。",
  },
};

const WEAPONS = {
  rifle: {
    id: "rifle",
    name: "PULSE RIFLE",
    damage: 24,
    fireInterval: 0.14,
    magSize: 18,
    reloadTime: 1.15,
    range: 140,
    defaultColor: 0x38bdf8,
  },
};

const SAVE_KEY = "fps_v26_blitz_bullet_save";
function loadSaveData() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { coins: 160, characterId: "blitz", mapId: "sky_citadel" };
    const parsed = JSON.parse(raw);
    return {
      coins: typeof parsed.coins === "number" ? parsed.coins : 160,
      characterId: CHARACTERS[parsed.characterId] ? parsed.characterId : "blitz",
      mapId: parsed.mapId === "neon_canyon" ? "neon_canyon" : "sky_citadel",
    };
  } catch {
    return { coins: 160, characterId: "blitz", mapId: "sky_citadel" };
  }
}

const saveData = loadSaveData();
function persistSaveData() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(saveData)); } catch {}
}

const canvas = document.createElement("canvas");
document.body.prepend(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b132b);
scene.fog = new THREE.FogExp2(0x0b132b, 0.0042);

const camera = new THREE.PerspectiveCamera(CONFIG.baseFov, window.innerWidth / window.innerHeight, 0.1, 340);
camera.rotation.order = "YXZ";
scene.add(camera);

scene.add(new THREE.HemisphereLight(0x93c5fd, 0x1e293b, 0.9));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.25);
dirLight.position.set(35, 55, 28);
dirLight.castShadow = true;
scene.add(dirLight);

const weaponGroup = new THREE.Group();
weaponGroup.position.set(0.28, -0.25, -0.45);
camera.add(weaponGroup);

const gunBodyMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.7 });
const gunAccentMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.45 });
const gunReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.13, 0.42), gunBodyMat);
const gunBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.24, 10), gunAccentMat);
gunBarrel.rotation.x = Math.PI / 2;
gunBarrel.position.set(0, 0.02, -0.28);
weaponGroup.add(gunReceiver, gunBarrel);

const muzzlePoint = new THREE.Object3D();
muzzlePoint.position.set(0, 0.02, -0.42);
weaponGroup.add(muzzlePoint);

// ==========================================
// B: 銃の弾を見えるようにする（弾道トレイル＋飛翔する3D弾丸）
// ==========================================
const activeTracers = [];
function spawnTracer(startPos, endPos, colorHex) {
  const geo = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
  const mat = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.98,
  });
  const line = new THREE.Line(geo, mat);
  line.frustumCulled = false;
  scene.add(line);
  activeTracers.push({
    line,
    geo,
    mat,
    life: VISIBLE_BULLET_CONFIG.trailLife,
    maxLife: VISIBLE_BULLET_CONFIG.trailLife,
  });
}

const activeFlyingBullets = [];
const bulletHeadGeo = new THREE.SphereGeometry(VISIBLE_BULLET_CONFIG.radius, 10, 10);
const bulletCoreGeo = new THREE.CylinderGeometry(
  VISIBLE_BULLET_CONFIG.radius * 0.65,
  VISIBLE_BULLET_CONFIG.radius * 0.65,
  VISIBLE_BULLET_CONFIG.length,
  8
);
bulletCoreGeo.rotateX(Math.PI / 2);

function spawnFlyingBullet(startPos, endPos, colorHex) {
  const dir = new THREE.Vector3().subVectors(endPos, startPos);
  const totalDist = dir.length();
  if (totalDist < 0.05) return;
  dir.divideScalar(totalDist);

  const group = new THREE.Group();
  group.position.copy(startPos);
  group.lookAt(endPos);

  const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const headMesh = new THREE.Mesh(bulletHeadGeo, headMat);
  group.add(headMesh);

  const bodyMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: 0.96,
  });
  const bodyMesh = new THREE.Mesh(bulletCoreGeo, bodyMat);
  bodyMesh.position.z = -VISIBLE_BULLET_CONFIG.length * 0.45;
  group.add(bodyMesh);

  scene.add(group);
  activeFlyingBullets.push({
    group,
    headMat,
    bodyMat,
    startPos: startPos.clone(),
    endPos: endPos.clone(),
    dir,
    traveled: 0,
    maxDist: totalDist,
    speed: VISIBLE_BULLET_CONFIG.speed,
    colorHex,
  });
}

function updateFlyingBullets(dt) {
  for (let i = activeFlyingBullets.length - 1; i >= 0; i--) {
    const b = activeFlyingBullets[i];
    b.traveled += b.speed * dt;
    const clampedDist = Math.min(b.maxDist, b.traveled);
    const curPos = b.startPos.clone().addScaledVector(b.dir, clampedDist);
    const tailPos = b.startPos
      .clone()
      .addScaledVector(b.dir, Math.max(0, clampedDist - VISIBLE_BULLET_CONFIG.length * 2.2));
    b.group.position.copy(curPos);

    if (b.traveled >= b.maxDist) {
      spawnTracer(tailPos, b.endPos, b.colorHex);
      scene.remove(b.group);
      b.headMat.dispose();
      b.bodyMat.dispose();
      activeFlyingBullets.splice(i, 1);
    }
  }
}

const stageObjects = [];
const grappleAnchors = [];
const ziplines = [];

function clearStage() {
  for (const obj of stageObjects) scene.remove(obj);
  stageObjects.length = 0;
  grappleAnchors.length = 0;
  ziplines.length = 0;
}

function addBox(x, y, z, w, h, d, colorHex, addGrapple = false) {
  const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.65, metalness: 0.15 });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  stageObjects.push(mesh);

  if (addGrapple) {
    const anchorPos = new THREE.Vector3(x, y + h / 2 + 1.2, z);
    const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.45, 0), new THREE.MeshBasicMaterial({ color: 0x22d3ee }));
    orb.position.copy(anchorPos);
    scene.add(orb);
    stageObjects.push(orb);
    grappleAnchors.push(anchorPos);
  }
}

function addZipline(startArr, endArr) {
  const start = new THREE.Vector3(...startArr);
  const end = new THREE.Vector3(...endArr);
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([start, end]), new THREE.LineBasicMaterial({ color: 0xfacc15 }));
  scene.add(line);
  stageObjects.push(line);
  ziplines.push({ start, end });
}

function buildMap(mapId) {
  clearStage();
  const isNeon = mapId === "neon_canyon";
  scene.background = new THREE.Color(isNeon ? 0x130926 : 0x0b132b);
  scene.fog = new THREE.FogExp2(isNeon ? 0x130926 : 0x0b132b, 0.0042);

  addBox(0, -1, 0, 140, 2, 140, isNeon ? 0x241442 : 0x1e293b, false);
  const wallColor = isNeon ? 0x7c3aed : 0x0284c7;
  const platColor = isNeon ? 0x3b1d6e : 0x334155;

  addBox(0, 6, -34, 24, 12, 3, wallColor, true);
  addBox(0, 6, 34, 24, 12, 3, wallColor, true);
  addBox(-34, 6, 0, 3, 12, 24, wallColor, true);
  addBox(34, 6, 0, 3, 12, 24, wallColor, true);

  addBox(-16, 3.5, -14, 10, 7, 10, platColor, true);
  addBox(16, 5.5, -14, 10, 11, 10, platColor, true);
  addBox(-16, 5.5, 14, 10, 11, 10, platColor, true);
  addBox(16, 3.5, 14, 10, 7, 10, platColor, true);
  addBox(0, 9.5, 0, 12, 3, 12, platColor, true);

  addZipline([-26, 9, -24], [26, 12, 24]);
  addZipline([26, 9, -24], [-26, 12, 24]);
}

buildMap(saveData.mapId);

const playerState = {
  pos: new THREE.Vector3(0, CONFIG.eyeHeight, 22),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  grounded: false,
  dashTimer: 0,
  dashCooldownTimer: 0,
  onZipline: false,
  ziplineIdx: -1,
  ziplineT: 0,
  hp: 95,
  maxHp: 95,
  kills: 0,
  dead: false,
  respawnTimer: 0,
  overdriveTimer: 0,
  phaseTimer: 0,
  ammo: WEAPONS.rifle.magSize,
  reloading: false,
  reloadTimer: 0,
  fireCooldown: 0,
};

const bots = [];
const botGeo = new THREE.CapsuleGeometry(0.65, 1.4, 6, 10);

function spawnBots(count = 3) {
  for (const b of bots) scene.remove(b.mesh);
  bots.length = 0;

  const botChars = ["blitz", "vanguard", "spectre"];
  for (let i = 0; i < count; i++) {
    const ch = CHARACTERS[botChars[i % botChars.length]];
    const mesh = new THREE.Mesh(botGeo, new THREE.MeshStandardMaterial({ color: ch.bodyColor, roughness: 0.4 }));
    const angle = (i / Math.max(1, count)) * Math.PI * 2;
    const pos = new THREE.Vector3(Math.cos(angle) * 20, 1.6, Math.sin(angle) * 20);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    scene.add(mesh);

    bots.push({
      id: "BOT-" + ch.name + "-" + (i + 1),
      charId: ch.id,
      mesh,
      pos,
      hp: ch.maxHp,
      maxHp: ch.maxHp,
      fireTimer: 0.6 + i * 0.25,
      strafeDir: i % 2 === 0 ? 1 : -1,
    });
  }
}
spawnBots(3);

const keys = {};
let isRunning = false;
let autofireEnabled = true;

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (!isRunning) return;
  if (e.code === "Space") {
    if (playerState.dead) respawnPlayerNow();
    else if (playerState.grounded) {
      playerState.vel.y = CONFIG.jumpVelocity;
      playerState.grounded = false;
    }
  }
  if (e.code === "KeyQ") tryDash();
  if (e.code === "KeyF") tryCharacterSkill();
  if (e.code === "KeyE") tryToggleZipline();
  if (e.code === "KeyR") {
    if (playerState.dead) respawnPlayerNow();
    else startReload();
  }
});
window.addEventListener("keyup", (e) => { keys[e.code] = false; });

canvas.addEventListener("click", () => {
  if (isRunning && document.pointerLockElement !== canvas && canvas.requestPointerLock) {
    try { canvas.requestPointerLock(); } catch {}
  }
});

canvas.addEventListener("mousedown", (e) => {
  if (!isRunning || playerState.dead) return;
  if (e.button === 2) {
    e.preventDefault();
    tryCharacterSkill();
  } else if (e.button === 0) {
    triggerAttack();
  }
});
canvas.addEventListener("contextmenu", (e) => e.preventDefault());

window.addEventListener("mousemove", (e) => {
  if (!isRunning || document.pointerLockElement !== canvas) return;
  const sens = CONFIG.lookSensitivity * parseFloat(document.getElementById("sens-slider")?.value || "1.0");
  playerState.yaw -= e.movementX * sens;
  playerState.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, playerState.pitch - e.movementY * sens));
});

function startReload() {
  if (playerState.reloading || playerState.ammo >= WEAPONS.rifle.magSize) return;
  playerState.reloading = true;
  const boost = playerState.overdriveTimer > 0 ? 1.55 : 1.0;
  playerState.reloadTimer = WEAPONS.rifle.reloadTime / boost;
  document.getElementById("reload-status").classList.remove("hidden");
}

function tryDash() {
  if (playerState.dashCooldownTimer > 0 || playerState.dead) return;
  const forward = new THREE.Vector3(-Math.sin(playerState.yaw), 0, -Math.cos(playerState.yaw)).normalize();
  playerState.vel.x = forward.x * CONFIG.dashSpeed;
  playerState.vel.z = forward.z * CONFIG.dashSpeed;
  playerState.dashTimer = CONFIG.dashDuration;
  playerState.dashCooldownTimer = CONFIG.dashCooldown;
}

function tryCharacterSkill() {
  if (playerState.dead) return;
  const ch = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
  if (ch.id === "blitz") {
    playerState.overdriveTimer = 3.2;
    const banner = document.getElementById("skill-active-banner");
    banner.textContent = "OVERDRIVE ACTIVE! (SPEED x1.75)";
    banner.classList.remove("hidden");
    setTimeout(() => banner.classList.add("hidden"), 3200);
  } else if (ch.id === "vanguard") {
    playerState.hp = Math.min(playerState.maxHp, playerState.hp + 40);
  } else if (ch.id === "spectre") {
    playerState.phaseTimer = 2.2;
    tryDash();
  } else if (grappleAnchors.length > 0) {
    let best = grappleAnchors[0];
    let bestD = playerState.pos.distanceTo(best);
    for (const a of grappleAnchors) {
      const d = playerState.pos.distanceTo(a);
      if (d < bestD) { bestD = d; best = a; }
    }
    playerState.vel.addScaledVector(best.clone().sub(playerState.pos).normalize(), 18);
  }
}

function tryToggleZipline() {
  if (playerState.onZipline) {
    playerState.onZipline = false;
    return;
  }
  for (let i = 0; i < ziplines.length; i++) {
    const z = ziplines[i];
    if (playerState.pos.distanceTo(z.start.clone().lerp(z.end, 0.5)) < 20) {
      playerState.onZipline = true;
      playerState.ziplineIdx = i;
      playerState.ziplineT = 0;
      return;
    }
  }
}

function showHitmarker() {
  const hm = document.getElementById("hitmarker");
  hm.classList.remove("hidden");
  setTimeout(() => hm.classList.add("hidden"), 110);
}

function triggerAttack() {
  if (playerState.dead || playerState.reloading || playerState.fireCooldown > 0) return;
  if (playerState.ammo <= 0) {
    startReload();
    return;
  }
  const activeCh = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
  const rofBoost = playerState.overdriveTimer > 0 ? (activeCh.id === "blitz" ? 1.45 : 1.25) : 1.0;
  playerState.ammo -= 1;
  playerState.fireCooldown = WEAPONS.rifle.fireInterval / rofBoost;
  document.getElementById("ammo-display").textContent = String(playerState.ammo);

  const origin = camera.getWorldPosition(new THREE.Vector3());
  const muzzleWorld = muzzlePoint.getWorldPosition(new THREE.Vector3());
  const baseDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();

  let bestDist = WEAPONS.rifle.range;
  let hitBot = null;
  for (const bot of bots) {
    if (bot.hp <= 0) continue;
    const toBot = bot.pos.clone().sub(origin);
    const proj = toBot.dot(baseDir);
    if (proj > 0 && proj < bestDist && origin.clone().addScaledVector(baseDir, proj).distanceTo(bot.pos) < 1.15) {
      bestDist = proj;
      hitBot = bot;
    }
  }

  const endPos = origin.clone().addScaledVector(baseDir, bestDist);
  const colorHex = activeCh.bodyColor;
  spawnTracer(muzzleWorld, endPos, colorHex);
  spawnFlyingBullet(muzzleWorld, endPos, colorHex);

  if (hitBot) {
    hitBot.hp -= WEAPONS.rifle.damage;
    showHitmarker();
    if (hitBot.hp <= 0) {
      playerState.kills += 1;
      saveData.coins += 15;
      persistSaveData();
      document.getElementById("my-kills-display").textContent = String(playerState.kills);
      document.getElementById("hud-coins-display").textContent = String(saveData.coins);
      const banner = document.getElementById("val-kill-banner");
      document.getElementById("val-kill-sub").textContent = `${hitBot.id} • PULSE RIFLE`;
      banner.classList.add("active");
      setTimeout(() => banner.classList.remove("active"), 1100);
      hitBot.hp = hitBot.maxHp;
      hitBot.pos.set((Math.random() - 0.5) * 56, 2.0, (Math.random() - 0.5) * 56);
    }
  }

  if (playerState.ammo <= 0) startReload();
}

function respawnPlayerNow() {
  const ch = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
  playerState.dead = false;
  playerState.maxHp = ch.maxHp;
  playerState.hp = ch.maxHp;
  playerState.pos.set(0, CONFIG.eyeHeight, 22);
  playerState.vel.set(0, 0, 0);
  document.getElementById("respawn-banner").classList.add("hidden");
}

function renderCharacterGrid() {
  const grid = document.getElementById("character-grid");
  if (!grid) return;
  grid.innerHTML = "";
  for (const ch of Object.values(CHARACTERS)) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "char-card" + (saveData.characterId === ch.id ? " active" : "");
    btn.style.setProperty("--char-color", ch.color);
    btn.innerHTML = `
      <div class="char-card-role">${ch.role}</div>
      <div class="char-card-name">${ch.name}</div>
      <div class="char-card-skill">${ch.skillShort} (x${ch.speedMult.toFixed(2)})</div>
      <div class="char-card-hp">HP ${ch.maxHp}</div>
    `;
    btn.addEventListener("click", () => {
      saveData.characterId = ch.id;
      persistSaveData();
      renderCharacterGrid();
      updateCharacterUI();
    });
    grid.appendChild(btn);
  }
}

function updateCharacterUI() {
  const ch = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
  const detail = document.getElementById("selected-char-detail");
  if (detail) {
    detail.style.setProperty("--char-color", ch.color);
    document.getElementById("char-detail-name").textContent = `${ch.name}（${ch.jpName}） - 移動倍率 x${ch.speedMult.toFixed(2)}`;
    document.getElementById("char-detail-skill-badge").textContent = `固有スキル: ${ch.skillName}`;
    document.getElementById("char-detail-desc").textContent = ch.skillDesc;
  }
  document.getElementById("hud-char-name").textContent = ch.name;
  document.getElementById("pc-skill-name").textContent = ch.skillShort;
}

renderCharacterGrid();
updateCharacterUI();
document.getElementById("hud-coins-display").textContent = String(saveData.coins);
document.getElementById("modal-coins-display").textContent = `${saveData.coins} CR`;

document.getElementById("start-btn").addEventListener("click", () => {
  const ch = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
  playerState.maxHp = ch.maxHp;
  playerState.hp = ch.maxHp;
  playerState.ammo = WEAPONS.rifle.magSize;
  playerState.reloading = false;
  document.getElementById("reload-status").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
  isRunning = true;
  updateCharacterUI();
  if (canvas.requestPointerLock) {
    try { canvas.requestPointerLock(); } catch {}
  }
});

document.getElementById("hud-pause-btn").addEventListener("click", () => {
  isRunning = false;
  document.getElementById("modal-coins-display").textContent = `${saveData.coins} CR`;
  document.getElementById("overlay").classList.remove("hidden");
  if (document.exitPointerLock) {
    try { document.exitPointerLock(); } catch {}
  }
});

document.getElementById("hud-retry-btn").addEventListener("click", () => {
  playerState.kills = 0;
  document.getElementById("my-kills-display").textContent = "0";
  respawnPlayerNow();
});

document.getElementById("force-respawn-btn").addEventListener("click", respawnPlayerNow);

document.getElementById("autofire-toggle-btn").addEventListener("click", (e) => {
  autofireEnabled = !autofireEnabled;
  e.currentTarget.textContent = autofireEnabled ? "ON" : "OFF";
  e.currentTarget.classList.toggle("active", autofireEnabled);
  const badge = document.getElementById("autofire-badge");
  badge.textContent = autofireEnabled ? "AUTO" : "MANUAL";
  badge.classList.toggle("off", !autofireEnabled);
});

document.getElementById("map-select").value = saveData.mapId;
document.getElementById("map-select").addEventListener("change", (e) => {
  saveData.mapId = e.target.value;
  persistSaveData();
  buildMap(saveData.mapId);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);

  updateFlyingBullets(dt);

  for (let i = activeTracers.length - 1; i >= 0; i--) {
    const t = activeTracers[i];
    t.life -= dt;
    t.mat.opacity = Math.max(0, (t.life / t.maxLife) * 0.98);
    if (t.life <= 0) {
      scene.remove(t.line);
      t.geo.dispose();
      t.mat.dispose();
      activeTracers.splice(i, 1);
    }
  }

  if (isRunning && !playerState.dead) {
    const activeCh = CHARACTERS[saveData.characterId] || CHARACTERS.blitz;
    if (playerState.overdriveTimer > 0) playerState.overdriveTimer = Math.max(0, playerState.overdriveTimer - dt);
    if (playerState.phaseTimer > 0) playerState.phaseTimer = Math.max(0, playerState.phaseTimer - dt);
    if (playerState.dashCooldownTimer > 0) playerState.dashCooldownTimer = Math.max(0, playerState.dashCooldownTimer - dt);
    if (playerState.fireCooldown > 0) playerState.fireCooldown = Math.max(0, playerState.fireCooldown - dt);

    if (playerState.reloading) {
      playerState.reloadTimer -= dt;
      if (playerState.reloadTimer <= 0) {
        playerState.reloading = false;
        playerState.ammo = WEAPONS.rifle.magSize;
        document.getElementById("ammo-display").textContent = String(playerState.ammo);
        document.getElementById("reload-status").classList.add("hidden");
      }
    }

    const overdriveMult =
      playerState.overdriveTimer > 0
        ? activeCh.id === "blitz"
          ? BLITZ_OVERDRIVE_MULT
          : 1.32
        : 1.0;

    let moveF = 0, moveR = 0;
    if (keys["KeyW"] || keys["ArrowUp"]) moveF += 1;
    if (keys["KeyS"] || keys["ArrowDown"]) moveF -= 1;
    if (keys["KeyD"] || keys["ArrowRight"]) moveR += 1;
    if (keys["KeyA"] || keys["ArrowLeft"]) moveR -= 1;

    const inputVec = new THREE.Vector3(moveR, 0, -moveF);
    if (inputVec.lengthSq() > 0) inputVec.normalize();
    inputVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), playerState.yaw);

    if (playerState.onZipline) {
      const z = ziplines[playerState.ziplineIdx];
      const len = Math.max(1, z.start.distanceTo(z.end));
      playerState.ziplineT += (CONFIG.zipSpeed * overdriveMult * dt) / len;
      playerState.pos.copy(z.start).lerp(z.end, Math.min(1, playerState.ziplineT));
      playerState.pos.y += CONFIG.eyeHeight * 0.65;
      if (playerState.ziplineT >= 1) playerState.onZipline = false;
    } else if (playerState.dashTimer > 0) {
      playerState.dashTimer -= dt;
    } else {
      const targetSpeed = CONFIG.runSpeed * activeCh.speedMult * overdriveMult;
      playerState.vel.x = THREE.MathUtils.lerp(playerState.vel.x, inputVec.x * targetSpeed, Math.min(1, dt * 14));
      playerState.vel.z = THREE.MathUtils.lerp(playerState.vel.z, inputVec.z * targetSpeed, Math.min(1, dt * 14));
      playerState.vel.y -= CONFIG.gravity * dt;
      playerState.pos.addScaledVector(playerState.vel, dt);
      if (playerState.pos.y <= CONFIG.eyeHeight) {
        playerState.pos.y = CONFIG.eyeHeight;
        playerState.vel.y = 0;
        playerState.grounded = true;
      }
    }

    playerState.pos.x = Math.max(-66, Math.min(66, playerState.pos.x));
    playerState.pos.z = Math.max(-66, Math.min(66, playerState.pos.z));

    camera.position.copy(playerState.pos);
    camera.rotation.y = playerState.yaw;
    camera.rotation.x = playerState.pitch;

    const targetFov = Math.min(CONFIG.maxFov, CONFIG.baseFov + Math.hypot(playerState.vel.x, playerState.vel.z) * 0.55);
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, Math.min(1, dt * 10));
    camera.updateProjectionMatrix();

    document.getElementById("speed-display").textContent = Math.hypot(playerState.vel.x, playerState.vel.z).toFixed(1);
    document.getElementById("my-hp-display").textContent = String(Math.max(0, Math.round(playerState.hp)));
    document.getElementById("my-hp-fill").style.width = `${Math.max(0, (playerState.hp / playerState.maxHp) * 100)}%`;
    document.getElementById("alt-display").textContent = String(Math.max(0, Math.round(playerState.pos.y - CONFIG.eyeHeight)));

    let nearestDist = 999;
    let anyAimed = false;
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();

    for (const bot of bots) {
      bot.pos.x += Math.sin(clock.elapsedTime * 1.3 + bot.strafeDir) * 5.5 * dt;
      bot.pos.z += Math.cos(clock.elapsedTime * 1.1 + bot.strafeDir) * 5.5 * dt;
      bot.pos.x = Math.max(-55, Math.min(55, bot.pos.x));
      bot.pos.z = Math.max(-55, Math.min(55, bot.pos.z));
      bot.mesh.position.copy(bot.pos);

      const d = bot.pos.distanceTo(playerState.pos);
      if (d < nearestDist) nearestDist = d;

      const toBot = bot.pos.clone().sub(camera.position).normalize();
      if (forward.dot(toBot) > 0.97 && d < 90) anyAimed = true;

      bot.fireTimer -= dt;
      if (bot.fireTimer <= 0 && d < 65) {
        bot.fireTimer = CONFIG.botFireInterval;
        const botEye = bot.pos.clone().add(new THREE.Vector3(0, 0.5, 0));
        const aimPt = playerState.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 1.2, -0.3, (Math.random() - 0.5) * 1.2));
        const rCh = CHARACTERS[bot.charId] || CHARACTERS.blitz;
        spawnTracer(botEye, aimPt, rCh.bodyColor);
        spawnFlyingBullet(botEye, aimPt, rCh.bodyColor);

        if (d < 42 && Math.random() < 0.35 && playerState.phaseTimer <= 0) {
          playerState.hp -= 8;
          document.getElementById("damage-vignette").style.opacity = "0.75";
          setTimeout(() => { document.getElementById("damage-vignette").style.opacity = "0"; }, 140);
          if (playerState.hp <= 0) {
            playerState.dead = true;
            playerState.respawnTimer = CONFIG.respawnDelay;
            document.getElementById("respawn-banner").classList.remove("hidden");
          }
        }
      }
    }

    document.getElementById("dist-display").textContent = nearestDist < 900 ? nearestDist.toFixed(0) : "--";
    document.getElementById("crosshair").classList.toggle("lock-on", anyAimed);
    if (autofireEnabled && anyAimed) triggerAttack();
  } else if (isRunning && playerState.dead) {
    playerState.respawnTimer -= dt;
    document.getElementById("respawn-timer-display").textContent = Math.max(0, playerState.respawnTimer).toFixed(1);
    if (playerState.respawnTimer <= 0) respawnPlayerNow();
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
