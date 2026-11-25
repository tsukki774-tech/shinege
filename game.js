(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const deathCountEl = document.getElementById("death-count");
  const timerEl = document.getElementById("timer");
  const retryBtn = document.getElementById("retry-btn");
  const muteBtn = document.getElementById("mute-btn");
  const overlayEl = document.getElementById("overlay");
  const overlayTitleEl = document.getElementById("overlay-title");
  const overlayMessageEl = document.getElementById("overlay-message");
  const restartAllBtn = document.getElementById("restart-all-btn");

  // ==========================================
  // 基本設定（ここをいじると操作感が変わります）
  // ==========================================
  const TILE = 40;
  const WORLD_WIDTH = 2640;
  const WORLD_HEIGHT = 480;
  const GRAVITY = 0.6;
  const MOVE_SPEED = 4.5;
  const JUMP_FORCE = -12.6;
  const MAX_FALL_SPEED = 14;

  // 簡易Web Audio効果音（外部ファイル不要）
  let audioCtx = null;
  let muted = false;

  function playSound(type) {
    if (muted) return;
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === "jump") {
      osc.type = "square";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.start(now);
      osc.stop(now + 0.13);
    } else if (type === "die") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.28);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "trap") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.setValueAtTime(420, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "checkpoint") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.08);
      osc.frequency.setValueAtTime(784, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "clear") {
      osc.type = "square";
      const notes = [523, 659, 784, 1046];
      notes.forEach((freq, i) => {
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
      });
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  }

  // 入力管理
  const keys = { left: false, right: false, jump: false, jumpPressed: false };

  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "Space", " "].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") {
      if (!keys.jump) keys.jumpPressed = true;
      keys.jump = true;
    }
    if (e.key === "r" || e.key === "R") {
      if (!gameState.cleared) respawn();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W" || e.key === " ") keys.jump = false;
  });

  // タッチ操作バインド
  function bindTouch(id, onDown, onUp) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      onDown();
    });
    const end = (e) => {
      e.preventDefault();
      onUp();
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointerleave", end);
    el.addEventListener("pointercancel", end);
  }
  bindTouch("btn-left", () => (keys.left = true), () => (keys.left = false));
  bindTouch("btn-right", () => (keys.right = true), () => (keys.right = false));
  bindTouch(
    "btn-jump",
    () => {
      if (!keys.jump) keys.jumpPressed = true;
      keys.jump = true;
    },
    () => (keys.jump = false)
  );

  retryBtn.addEventListener("click", () => {
    if (!gameState.cleared) respawn();
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.textContent = muted ? "音: OFF" : "音: ON";
  });

  restartAllBtn.addEventListener("click", () => {
    resetAll();
  });

  // ==========================================
  // ゲーム状態とステージ構築
  // ==========================================
  const gameState = {
    deaths: 0,
    startTime: performance.now(),
    elapsed: 0,
    cleared: false,
    checkpointReached: false,
    spawnX: 80,
    spawnY: 360,
    cameraX: 0,
    message: "",
    messageTimer: 0,
    deathTimer: 0,
    confetti: [],
  };

  let player = null;
  let blocks = [];
  let enemies = [];
  let spikes = [];
  let clouds = [];
  let checkpoint = null;
  let goal = null;

  function showMessage(text, frames = 110) {
    gameState.message = text;
    gameState.messageTimer = frames;
  }

  function addGround(startTile, endTile, yTile = 10) {
    for (let tx = startTile; tx <= endTile; tx++) {
      blocks.push({
        x: tx * TILE,
        y: yTile * TILE,
        w: TILE,
        h: TILE * 2,
        type: "ground",
        solid: true,
        visible: true,
      });
    }
  }

  function buildStage() {
    blocks = [];
    enemies = [];
    spikes = [];
    clouds = [];

    // 地面セクション（穴の場所はあえて空ける）
    addGround(0, 7);    // スタート〜穴1の手前 (0〜320)
    addGround(11, 20);  // 穴1の後〜落ちる床の手前 (440〜840)
    addGround(28, 45);  // 中間〜穴2の手前 (1120〜1840)
    addGround(49, 65);  // ゴールエリア (1960〜2640)

    // --- 罠1: 最初の穴の手前にある「見えないブロック（孔明の罠）」 ---
    blocks.push({
      x: 320,
      y: 280,
      w: TILE,
      h: TILE,
      type: "hidden",
      solid: false,
      visible: false,
      revealed: false,
    });

    // --- 罠2: 叩くとドクロが出てくる「？」ブロック ---
    blocks.push({
      x: 560,
      y: 280,
      w: TILE,
      h: TILE,
      type: "question",
      solid: true,
      visible: true,
      used: false,
    });

    // 普通の敵（踏めば倒せる）
    enemies.push({
      x: 740,
      y: 368,
      w: 32,
      h: 32,
      vx: -1.6,
      vy: 0,
      type: "walker",
      alive: true,
    });

    // --- 罠3: 踏むとすぐ落ちる床（2枚×2セット） ---
    const fallingPositions = [880, 920, 1000, 1040];
    fallingPositions.forEach((fx) => {
      blocks.push({
        x: fx,
        y: 400,
        w: TILE,
        h: 24,
        type: "falling",
        solid: true,
        visible: true,
        triggered: false,
        delay: 8,
        vy: 0,
      });
    });

    // 中間チェックポイント（本物）
    checkpoint = {
      x: 1240,
      y: 320,
      w: 24,
      h: 80,
      activated: gameState.checkpointReached,
    };

    // --- 罠4: チェックポイント直後の「地面から飛び出す隠しトゲ」 ---
    spikes.push({
      x: 1360,
      y: 400,
      baseY: 400,
      targetY: 368,
      w: 36,
      h: 32,
      triggerX: 1300,
      triggered: false,
      active: false,
    });

    // --- 罠5: 背景の雲がニヤッと笑って落下してくる ---
    clouds.push(
      { x: 220, y: 80, w: 72, h: 42, isTrap: false },
      { x: 960, y: 70, w: 72, h: 42, isTrap: false },
      {
        x: 1580,
        y: 95,
        w: 72,
        h: 44,
        isTrap: true,
        triggerX: 1515,
        triggered: false,
        vy: 0,
      },
      { x: 2120, y: 75, w: 72, h: 42, isTrap: false }
    );

    // ちょっとした高台（x=1720〜1800）
    blocks.push(
      { x: 1720, y: 320, w: TILE, h: TILE, type: "brick", solid: true, visible: true },
      { x: 1760, y: 320, w: TILE, h: TILE, type: "brick", solid: true, visible: true }
    );

    // --- 罠6: 2個目の「見えないブロック」 ---
    blocks.push({
      x: 1880,
      y: 260,
      w: TILE,
      h: TILE,
      type: "hidden",
      solid: false,
      visible: false,
      revealed: false,
    });

    // --- 罠7: 近づくと右へ逃げるゴールポール＆元の位置にトゲ出現 ---
    goal = {
      x: 2320,
      y: 200,
      w: 16,
      h: 200,
      escaped: false,
      escaping: false,
      targetX: 2470,
      triggerX: 2245,
    };

    spikes.push({
      x: 2310,
      y: 400,
      baseY: 400,
      targetY: 368,
      w: 36,
      h: 32,
      triggerX: 2245,
      triggered: false,
      active: false,
    });

    player = {
      x: gameState.spawnX,
      y: gameState.spawnY,
      w: 30,
      h: 34,
      vx: 0,
      vy: 0,
      onGround: false,
      facing: 1,
      dead: false,
    };
  }

  function respawn() {
    gameState.deathTimer = 0;
    buildStage();
    keys.jumpPressed = false;
  }

  function resetAll() {
    gameState.deaths = 0;
    gameState.cleared = false;
    gameState.checkpointReached = false;
    gameState.spawnX = 80;
    gameState.spawnY = 360;
    gameState.startTime = performance.now();
    gameState.elapsed = 0;
    gameState.confetti = [];
    deathCountEl.textContent = "0";
    overlayEl.classList.add("hidden");
    respawn();
  }

  function killPlayer(reasonText) {
    if (player.dead || gameState.cleared) return;
    player.dead = true;
    player.vy = -10;
    player.vx = 0;
    gameState.deaths += 1;
    deathCountEl.textContent = String(gameState.deaths);
    gameState.deathTimer = 42;
    playSound("die");
    if (reasonText) showMessage(reasonText, 65);
  }

  function triggerClear() {
    if (gameState.cleared) return;
    gameState.cleared = true;
    playSound("clear");
    for (let i = 0; i < 80; i++) {
      gameState.confetti.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * 200,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3,
        color: ["#ffd166", "#06d6a0", "#ef476f", "#118ab2", "#ffffff"][i % 5],
        size: 5 + Math.random() * 6,
      });
    }
    overlayTitleEl.textContent = "STAGE CLEAR!!";
    overlayMessageEl.textContent =
      `クリアタイム: ${gameState.elapsed.toFixed(1)} 秒\n` +
      `死亡回数: ${gameState.deaths} 回\n\n` +
      (gameState.deaths === 0
        ? "まさかのノーミス！？ 達人すぎる！"
        : gameState.deaths <= 5
        ? "なかなかの反射神経！"
        : "たくさんの罠に引っかかってくれてありがとう！");
    overlayEl.classList.remove("hidden");
  }

  // 矩形当たり判定
  function overlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ==========================================
  // 更新処理（毎フレーム実行）
  // ==========================================
  function update() {
    if (!gameState.cleared) {
      gameState.elapsed = (performance.now() - gameState.startTime) / 1000;
      timerEl.textContent = gameState.elapsed.toFixed(1);
    } else {
      gameState.confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.y > canvas.height) c.y = -10;
      });
      return;
    }

    if (gameState.messageTimer > 0) gameState.messageTimer--;

    // 死亡アニメーション後の自動爆速リトライ
    if (player.dead) {
      player.vy += GRAVITY;
      player.y += player.vy;
      gameState.deathTimer--;
      if (gameState.deathTimer <= 0) {
        respawn();
      }
      return;
    }

    // 左右移動
    if (keys.left && !keys.right) {
      player.vx = -MOVE_SPEED;
      player.facing = -1;
    } else if (keys.right && !keys.left) {
      player.vx = MOVE_SPEED;
      player.facing = 1;
    } else {
      player.vx = 0;
    }

    // ジャンプ
    if (keys.jumpPressed && player.onGround) {
      player.vy = JUMP_FORCE;
      player.onGround = false;
      playSound("jump");
    }
    keys.jumpPressed = false;

    // 重力
    player.vy = Math.min(player.vy + GRAVITY, MAX_FALL_SPEED);

    // X方向移動＆衝突判定
    player.x += player.vx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > WORLD_WIDTH) player.x = WORLD_WIDTH - player.w;

    for (const b of blocks) {
      if (!b.solid) continue;
      if (overlap(player, b)) {
        if (player.vx > 0) player.x = b.x - player.w;
        else if (player.vx < 0) player.x = b.x + b.w;
      }
    }

    // Y方向移動＆衝突判定
    const prevY = player.y;
    player.y += player.vy;
    player.onGround = false;

    for (const b of blocks) {
      // 隠しブロック（下から頭をぶつけた瞬間だけ出現！）
      if (b.type === "hidden" && !b.revealed) {
        if (
          player.vy < 0 &&
          prevY >= b.y + b.h - 6 &&
          overlap(player, b)
        ) {
          b.revealed = true;
          b.solid = true;
          b.visible = true;
          player.y = b.y + b.h;
          player.vy = 1.5;
          playSound("trap");
          showMessage("孔明の罠だ！！", 70);
          continue;
        }
      }

      if (!b.solid) continue;
      if (overlap(player, b)) {
        if (player.vy > 0) {
          player.y = b.y - player.h;
          player.vy = 0;
          player.onGround = true;

          // 落ちる床を踏んだ！
          if (b.type === "falling" && !b.triggered) {
            b.triggered = true;
            playSound("trap");
          }
        } else if (player.vy < 0) {
          player.y = b.y + b.h;
          player.vy = 0;

          // 「？」ブロックを叩いた！
          if (b.type === "question" && !b.used) {
            b.used = true;
            playSound("trap");
            showMessage("アイテムだと思った？ 残念ドクロでした！", 90);
            enemies.push({
              x: b.x + 4,
              y: b.y - 34,
              w: 32,
              h: 32,
              vx: -3.2,
              vy: -5,
              type: "skull",
              alive: true,
            });
          }
        }
      }
    }

    // 落ちる床の更新
    for (const b of blocks) {
      if (b.type === "falling" && b.triggered) {
        if (b.delay > 0) {
          b.delay--;
        } else {
          b.vy += 0.55;
          b.y += b.vy;
        }
      }
    }

    // 奈落への落下チェック
    if (player.y > WORLD_HEIGHT + 40) {
      killPlayer("穴に落ちた…");
      return;
    }

    // チェックポイント判定
    if (!checkpoint.activated && overlap(player, checkpoint)) {
      checkpoint.activated = true;
      gameState.checkpointReached = true;
      gameState.spawnX = checkpoint.x - 10;
      gameState.spawnY = 360;
      playSound("checkpoint");
      showMessage("CHECKPOINT!（ここは本当に安全）", 90);
    }

    // 隠しトゲの更新＆判定
    for (const s of spikes) {
      if (!s.triggered && player.x + player.w > s.triggerX) {
        s.triggered = true;
        s.active = true;
        playSound("trap");
      }
      if (s.triggered && s.y > s.targetY) {
        s.y = Math.max(s.targetY, s.y - 7);
      }
      if (s.active && overlap(player, { x: s.x + 4, y: s.y + 4, w: s.w - 8, h: s.h - 4 })) {
        killPlayer("地面からトゲが！！");
        return;
      }
    }

    // 落下雲の更新＆判定
    for (const c of clouds) {
      if (!c.isTrap) continue;
      if (!c.triggered && player.x + player.w > c.triggerX) {
        c.triggered = true;
        playSound("trap");
        showMessage("雲が落ちてきた！？", 70);
      }
      if (c.triggered) {
        c.vy = Math.min(c.vy + 0.65, 11);
        c.y += c.vy;
        if (overlap(player, { x: c.x + 6, y: c.y + 6, w: c.w - 12, h: c.h - 10 })) {
          killPlayer("背景の雲にやられた！");
          return;
        }
      }
    }

    // 敵の更新＆判定
    for (const e of enemies) {
      if (!e.alive) continue;
      e.vy = Math.min(e.vy + GRAVITY, MAX_FALL_SPEED);
      e.x += e.vx;
      e.y += e.vy;

      for (const b of blocks) {
        if (!b.solid) continue;
        if (overlap(e, b)) {
          if (e.vy > 0 && e.y + e.h - e.vy <= b.y + 10) {
            e.y = b.y - e.h;
            e.vy = 0;
          } else {
            e.vx *= -1;
          }
        }
      }

      if (overlap(player, e)) {
        // 普通の敵は上から踏めば倒せる、ドクロは踏んでも死ぬ！
        if (e.type === "walker" && player.vy > 0 && player.y + player.h - player.vy <= e.y + 14) {
          e.alive = false;
          player.vy = -9;
          playSound("jump");
        } else {
          killPlayer(e.type === "skull" ? "ドクロは踏んでもダメ！" : "敵にぶつかった！");
          return;
        }
      }
    }

    // 逃げるゴールポールの更新＆クリア判定
    if (!goal.escaped && player.x + player.w > goal.triggerX) {
      goal.escaped = true;
      goal.escaping = true;
      playSound("trap");
      showMessage("ゴールが逃げた！？", 80);
    }
    if (goal.escaping) {
      goal.x += 9;
      if (goal.x >= goal.targetX) {
        goal.x = goal.targetX;
        goal.escaping = false;
      }
    }
    if (overlap(player, { x: goal.x - 4, y: goal.y, w: goal.w + 8, h: goal.h })) {
      triggerClear();
    }

    // カメラ追従
    const targetCamX = player.x - canvas.width * 0.35;
    gameState.cameraX = Math.max(0, Math.min(WORLD_WIDTH - canvas.width, targetCamX));
  }

  // ==========================================
  // 描画処理
  // ==========================================
  function draw() {
    // 空の背景
    ctx.fillStyle = "#7ec8ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-Math.floor(gameState.cameraX), 0);

    // 遠景の丘
    ctx.fillStyle = "#8ce08a";
    for (let x = 100; x < WORLD_WIDTH; x += 480) {
      ctx.beginPath();
      ctx.arc(x, 420, 120, Math.PI, 0);
      ctx.fill();
    }

    // 雲（普通の雲と罠の雲）
    for (const c of clouds) {
      drawCloud(c);
    }

    // チェックポイント旗
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(checkpoint.x + 8, checkpoint.y, 6, checkpoint.h);
    ctx.fillStyle = checkpoint.activated ? "#06d6a0" : "#94a3b8";
    ctx.beginPath();
    ctx.moveTo(checkpoint.x + 14, checkpoint.y + 4);
    ctx.lineTo(checkpoint.x + 48, checkpoint.y + 18);
    ctx.lineTo(checkpoint.x + 14, checkpoint.y + 32);
    ctx.closePath();
    ctx.fill();

    // ゴールポール
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    ctx.fillStyle = "#ffd166";
    ctx.beginPath();
    ctx.arc(goal.x + goal.w / 2, goal.y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ef476f";
    ctx.beginPath();
    ctx.moveTo(goal.x + goal.w, goal.y + 14);
    ctx.lineTo(goal.x + goal.w + 46, goal.y + 30);
    ctx.lineTo(goal.x + goal.w, goal.y + 46);
    ctx.closePath();
    ctx.fill();

    // トゲ
    for (const s of spikes) {
      if (!s.active) continue;
      ctx.fillStyle = "#d90429";
      const count = 3;
      const sw = s.w / count;
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.moveTo(s.x + i * sw, s.y + s.h);
        ctx.lineTo(s.x + i * sw + sw / 2, s.y);
        ctx.lineTo(s.x + (i + 1) * sw, s.y + s.h);
        ctx.closePath();
        ctx.fill();
      }
    }

    // ブロック
    for (const b of blocks) {
      if (!b.visible) continue;
      if (b.type === "ground") {
        ctx.fillStyle = "#8d5524";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = "#38b000";
        ctx.fillRect(b.x, b.y, b.w, 10);
        ctx.strokeStyle = "#6c3f19";
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      } else if (b.type === "question") {
        ctx.fillStyle = b.used ? "#8b8c89" : "#ffb703";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        if (!b.used) {
          ctx.fillStyle = "#111";
          ctx.font = "bold 24px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("?", b.x + b.w / 2, b.y + 29);
        }
      } else if (b.type === "hidden") {
        ctx.fillStyle = "#e0fbfc";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = "#3d5a80";
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      } else if (b.type === "falling") {
        ctx.fillStyle = b.triggered ? "#f4a261" : "#c97b63";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = "#5c3317";
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      } else {
        ctx.fillStyle = "#bc6c25";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = "#5c3317";
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      }
    }

    // 敵
    for (const e of enemies) {
      if (!e.alive) continue;
      if (e.type === "walker") {
        ctx.fillStyle = "#9d4edd";
        ctx.beginPath();
        ctx.arc(e.x + e.w / 2, e.y + e.h / 2, e.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.fillRect(e.x + 7, e.y + 9, 6, 6);
        ctx.fillRect(e.x + 19, e.y + 9, 6, 6);
        ctx.fillStyle = "#000";
        ctx.fillRect(e.x + 8, e.y + 11, 3, 3);
        ctx.fillRect(e.x + 20, e.y + 11, 3, 3);
      } else if (e.type === "skull") {
        ctx.fillStyle = "#e63946";
        ctx.beginPath();
        ctx.arc(e.x + e.w / 2, e.y + e.h / 2, e.w / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("×", e.x + e.w / 2, e.y + 22);
      }
    }

    // プレイヤー（しょぼん風キャラ）
    drawPlayer(player);

    ctx.restore();

    // 画面上部のツッコミメッセージ
    if (gameState.messageTimer > 0 && gameState.message) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.fillRect(canvas.width / 2 - 210, 16, 420, 36);
      ctx.fillStyle = "#ffd166";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(gameState.message, canvas.width / 2, 40);
    }

    // クリア時の紙吹雪
    if (gameState.cleared) {
      for (const c of gameState.confetti) {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.size, c.size);
      }
    }
  }

  function drawCloud(c) {
    ctx.fillStyle = c.triggered ? "#ffd6e0" : "#ffffff";
    ctx.beginPath();
    ctx.arc(c.x + 18, c.y + 24, 16, 0, Math.PI * 2);
    ctx.arc(c.x + 36, c.y + 18, 20, 0, Math.PI * 2);
    ctx.arc(c.x + 54, c.y + 24, 16, 0, Math.PI * 2);
    ctx.fill();

    // 罠が発動したら怖い顔になる
    if (c.triggered) {
      ctx.fillStyle = "#d90429";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(">皿<", c.x + 36, c.y + 28);
    }
  }

  function drawPlayer(p) {
    // 体
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 8);
    ctx.fill();
    ctx.stroke();

    // 耳っぽい突起
    ctx.beginPath();
    ctx.moveTo(p.x + 4, p.y + 2);
    ctx.lineTo(p.x + 8, p.y - 6);
    ctx.lineTo(p.x + 12, p.y + 2);
    ctx.moveTo(p.x + p.w - 12, p.y + 2);
    ctx.lineTo(p.x + p.w - 8, p.y - 6);
    ctx.lineTo(p.x + p.w - 4, p.y + 2);
    ctx.fill();
    ctx.stroke();

    // 表情
    ctx.fillStyle = "#222222";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    const face = p.dead ? "×_×" : "・ω・";
    ctx.fillText(face, p.x + p.w / 2 + p.facing * 2, p.y + 21);
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  buildStage();
  loop();
})();
