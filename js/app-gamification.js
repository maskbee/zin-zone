/**
 * js/app-gamification.js
 * Gamification Core: Particles, Boss Arena, Mystery Chests, Factions, Player Profile
 */

// PARTICLE ENGINE (CONFETTI & GOLD COIN EXPLOSIONS)
    // =========================================================================
    class ParticleEngine {
      constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.particles = [];
        this.animating = false;
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }
      resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
      burst(x, y, count = 35) {
        if (!this.ctx) return;
        const colors = ['#f59e0b', '#10b981', '#38bdf8', '#ef4444', '#ec4899', '#ffffff'];
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 3;
          this.particles.push({
            x: x || window.innerWidth / 2,
            y: y || window.innerHeight / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 3,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.025 + 0.015,
            rotation: Math.random() * 360,
            spin: (Math.random() - 0.5) * 10
          });
        }
        if (!this.animating) {
          this.animating = true;
          this.loop();
        }
      }
      loop() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25;
          p.alpha -= p.decay;
          p.rotation += p.spin;
          if (p.alpha <= 0) {
            this.particles.splice(i, 1);
            continue;
          }
          this.ctx.save();
          this.ctx.globalAlpha = Math.max(0, p.alpha);
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.ctx.restore();
        }
        if (this.particles.length > 0) {
          requestAnimationFrame(() => this.loop());
        } else {
          this.animating = false;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      }
    }
    let particleEngine = null;

    const PLAYER_RANKS = [
      { level: 1, minCp: 0, title: 'Luyện Khí Tầng 1 • Tân Thủ', realm: 'Luyện Khí Sơ Kỳ', badge: '🥉 HSK 1', emoji: '⚡', desc: 'Đánh thức 70% Hán-Việt trong máu, làm quen khẩu lệnh xưởng.' },
      { level: 2, minCp: 500, title: 'Luyện Khí Tầng 9 • Thợ Cứng', realm: 'Luyện Khí Viên Mãn', badge: '🥈 HSK 1+', emoji: '🗡️', desc: 'Thành thạo khẩu quyết sinh tồn, không còn bối rối trước sếp.' },
      { level: 3, minCp: 1500, title: 'Trúc Cơ Đạo Nhân • Khẩu Lệnh', realm: 'Trúc Cơ Kỳ', badge: '🥇 HSK 2', emoji: '🛡️', desc: 'Giao tiếp trơn tru với chuyền trưởng, báo cáo tiến độ độc lập.' },
      { level: 4, minCp: 3500, title: 'Kim Đan Chân Nhân • Tổ Trưởng', realm: 'Kim Đan Kỳ', badge: '💎 HSK 3', emoji: '🔥', desc: 'Độc lập chỉ huy 1 tổ chuyền SMT, thương lượng vật liệu không ngắc ngứ.' },
      { level: 5, minCp: 7000, title: 'Nguyên Anh Chân Quân • Quản Lý', realm: 'Nguyên Anh Kỳ', badge: '👑 HSK 4', emoji: '⚡', desc: 'Đàm phán trực tiếp với sếp tổng Hoa Kiều, quản lý hiện trường vững vàng.' },
      { level: 6, minCp: 12000, title: 'Hóa Thần Tôn Giả • Phiên Dịch', realm: 'Hóa Thần Đỉnh Phong', badge: '🌌 HSK 5+', emoji: '✨', desc: 'Lĩnh ngộ toàn bộ thần ngữ, tự do chuyển dịch giữa hai nền văn hóa!' }
    ];

    const DEFAULT_PLAYER = {
      cp: 350,
      streak: 5,
      keys: 1,
      combo: 0,
      maxCombo: 0,
      bossDefeated: 0,
      faction: 'foxconn',
      isVipDevice: false,
      inventory: [
        {
          id: 'shield_init',
          name: 'Kim Bài Miễn Tử Sếp Vương',
          rarity: 'rare',
          icon: '🛡️',
          desc: 'Tự động bảo vệ chuỗi ngày khi làm sai hoặc bận tăng ca.'
        }
      ]
    };

    function getPlayerState() {
      try {
        const raw = safeStorage.getItem('zin_player_state_v2');
        if (!raw) return { ...DEFAULT_PLAYER };
        return { ...DEFAULT_PLAYER, ...JSON.parse(raw) };
      } catch (e) {
        return { ...DEFAULT_PLAYER };
      }
    }

    function savePlayerState(state) {
      try {
        safeStorage.setItem('zin_player_state_v2', JSON.stringify(state));
      } catch (e) {
        console.warn('savePlayerState failed:', e);
      }
      updateHudDisplay();
    }

    function getPlayerRank(cp) {
      let rank = PLAYER_RANKS[0];
      for (let r of PLAYER_RANKS) {
        if (cp >= r.minCp) rank = r;
      }
      return rank;
    }

    function addCp(amount, eventElement) {
      const state = getPlayerState();
      const buff = state.isVipDevice ? 1.5 : 1.0;
      const actualAmount = Math.round(amount * buff);
      const oldRank = getPlayerRank(state.cp);
      state.cp += actualAmount;
      const newRank = getPlayerRank(state.cp);

      if (newRank.level > oldRank.level) {
        soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 50);
        showToast(`🎉 CHÚC MỪNG! BẠN ĐÃ THĂNG HẠNG: [${newRank.title}]!`, 'success');
      }

      savePlayerState(state);

      if (eventElement) {
        const rect = eventElement.getBoundingClientRect();
        showFloatingCp(`+${actualAmount} CP`, rect.left + rect.width / 2, rect.top);
      }
      return actualAmount;
    }

    function showFloatingCp(text, x, y) {
      const el = document.createElement('div');
      el.className = 'fixed font-mono font-black text-amber-400 text-sm z-[9999] pointer-events-none floating-cp-badge bg-slate-900/90 px-2 py-0.5 rounded-full border border-amber-500/50 shadow-lg';
      el.textContent = text;
      el.style.left = `${Math.max(10, Math.min(window.innerWidth - 80, x))}px`;
      el.style.top = `${Math.max(60, y)}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 900);
    }

    function updateHudDisplay() {
      const state = getPlayerState();
      const rank = getPlayerRank(state.cp);

      const titleEl = document.getElementById('hudPlayerTitle');
      const badgeEl = document.getElementById('hudLevelBadge');
      const emojiEl = document.getElementById('hudAvatarEmoji');
      const cpEl = document.getElementById('hudCpCount');
      const xpFillEl = document.getElementById('hudXpFill');
      const streakEl = document.getElementById('hudStreakDays');
      const vipAuraEl = document.getElementById('hudVipAura');
      const chestBadgeEl = document.getElementById('hudChestBadge');
      const factionFlagEl = document.getElementById('hudFactionFlag');
      const factionNameEl = document.getElementById('hudFactionName');

      if (titleEl) {
        const shortTitle = rank.realm || rank.title.split('•')[0].trim();
        titleEl.innerHTML = `<span class="sm:hidden">${shortTitle}</span><span class="hidden sm:inline">${rank.title}</span>`;
      }
      if (badgeEl) badgeEl.textContent = `Lv.${rank.level}`;
      if (emojiEl) emojiEl.textContent = rank.emoji;
      if (cpEl) cpEl.textContent = `${state.cp.toLocaleString()} CP`;
      if (streakEl) streakEl.textContent = `${state.streak} Ngày`;

      if (xpFillEl) {
        const nextRank = PLAYER_RANKS.find(r => r.level === rank.level + 1);
        if (nextRank) {
          const range = nextRank.minCp - rank.minCp;
          const current = state.cp - rank.minCp;
          const pct = Math.min(100, Math.max(5, Math.round((current / range) * 100)));
          xpFillEl.style.width = `${pct}%`;
        } else {
          xpFillEl.style.width = '100%';
        }
      }

      if (vipAuraEl) {
        if (state.isVipDevice) vipAuraEl.classList.remove('hidden');
        else vipAuraEl.classList.add('hidden');
      }

      if (chestBadgeEl) {
        if (state.keys > 0) chestBadgeEl.classList.remove('hidden');
        else chestBadgeEl.classList.add('hidden');
      }

      const factionData = FACTIONS[state.faction] || FACTIONS.foxconn;
      if (factionFlagEl) factionFlagEl.textContent = factionData.flag;
      if (factionNameEl) factionNameEl.textContent = factionData.name.split(' ')[0];
    }

    // =========================================================================

// BOSS BATTLE ARENA ENGINE (QTE CRISES)
    // =========================================================================
    const BOSS_CRISES = [
      {
        id: 1,
        bossName: 'Sếp Vương • Quản Lý Foxconn',
        zh: '快点搞！下班前完不成扣钱！',
        pinyin: 'kuài diǎn gǎo! xiàbān qián wán bù chéng kòu qián!',
        viBoi: 'Khoái tiển cảo! Xia ban chén oán pu chẫng khấu chén!',
        meaning: 'Làm nhanh cái tay lên! Trước khi tan ca không xong là trừ tiền!',
        answers: [
          { text: '好好，马上搞定！放心！', isCorrect: true, exp: 'Dập tắt cơn giận ngay: Nhận lệnh dứt khoát, vỗ về sếp yên tâm.' },
          { text: '我不知道，去问别人吧。', isCorrect: false, exp: 'Sai lầm chết người: Đùn đẩy trách nhiệm sẽ bị trừ điểm chuyên cần.' },
          { text: '我不干了，太累了。', isCorrect: false, exp: 'Chống đối sếp trên chuyền dẫn tới biên bản đuổi việc.' }
        ]
      },
      {
        id: 2,
        bossName: 'Sếp Lý • Trưởng Chuyền Luxshare',
        zh: '搞什么鬼？！这批货怎么全是不良品？！',
        pinyin: 'gǎo shénme guǐ?! zhè pī huò zěnme quán shì bùliángpǐn?!',
        viBoi: 'Cảo sấm mơ quẩy?! Chơ pi hua chẩn mơ choán sư pu lén phỉn?!',
        meaning: 'Làm cái trò quỷ gì thế này?! Sao lô hàng này toàn phế phẩm?!',
        answers: [
          { text: '对不起主管，物料卡住了，我马上改！', isCorrect: true, exp: 'Thoát hiểm xuất sắc: Nhận lỗi lễ phép + chỉ ra nguyên nhân kỹ thuật.' },
          { text: '不是我的错，是上个班次的！', isCorrect: false, exp: 'Đổ thừa ca trước khiến sếp đánh giá thái độ kém.' },
          { text: '坏了就扔掉呗。', isCorrect: false, exp: 'Vô trách nhiệm với tài sản công ty.' }
        ]
      },
      {
        id: 3,
        bossName: 'Sếp Trần • Giám Sát Goertek',
        zh: '行不行啊？不行我就换别人做了！',
        pinyin: 'xíng bù xíng a? bù xíng wǒ jiù huàn biérén zuò le!',
        viBoi: 'Xính pu xính a? Pu xính ủa chiêu hoán pía rấn chua lơ!',
        meaning: 'Làm nổi không đấy? Không làm được tao đổi người khác!',
        answers: [
          { text: '行！绝对没问题，交给我！', isCorrect: true, exp: 'Ghi điểm thăng chức: Thể hiện bản lĩnh dám nhận việc của tổ trưởng tương lai.' },
          { text: '随便你换谁。', isCorrect: false, exp: 'Bất cần đời, bị xếp vào danh sách sa thải.' },
          { text: '我太难了，做不了。', isCorrect: false, exp: 'Than vãn làm sếp mất kiên nhẫn.' }
        ]
      },
      {
        id: 4,
        bossName: 'Sếp Vương • Quản Lý Foxconn',
        zh: '听懂了没有？！重复一遍！',
        pinyin: 'tīng dǒng le méiyǒu?! chóngfù yí biàn!',
        viBoi: 'Thính đúng lơ mấy dẩu?! Trúng phu ý piên!',
        meaning: 'Nghe có hiểu không hả?! Nhắc lại một lần xem!',
        answers: [
          { text: '听懂了！先停机断电，再找维修！', isCorrect: true, exp: 'Chuẩn quy trình 5S: Nhắc vanh vách quy tắc an toàn khiến sếp kinh ngạc.' },
          { text: '声音太小没听清。', isCorrect: false, exp: 'Lý do lý trấu, bị sếp mắng xối xả.' },
          { text: '我不懂中文。', isCorrect: false, exp: 'Thừa nhận dốt tiếng Trung mất cơ hội làm tổ trưởng.' }
        ]
      },
      {
        id: 5,
        bossName: 'Sếp Triệu • Quản Lý QC Ca Đêm',
        zh: '二号线缺人，你现在过去支援！',
        pinyin: 'èr hào xiàn quē rén, nǐ xiànzài guòqù zhīyuán!',
        viBoi: 'Ơ hao xen chuyế rấn, nỉ xen chai cua chuy chư doán!',
        meaning: 'Chuyền 2 đang thiếu người, mày qua đó chi viện ngay!',
        answers: [
          { text: '好的老大！我交接完马上过去！', isCorrect: true, exp: 'Nhiệt tình gánh team: Gọi "Lão Đại" tạo sự thân thiết, chấp hành nhanh.' },
          { text: '我不去，我这边没做完。', isCorrect: false, exp: 'Chống lệnh điều động sản xuất.' },
          { text: '加钱我就去。', isCorrect: false, exp: 'Mặc cả lúc khẩn cấp sẽ bị ghét.' }
        ]
      }
    ];

    let currentCrisisIndex = 0;
    let bossHp = 3;
    let bossMaxHp = 3;
    let bossTimerInterval = null;
    let bossTimeRemaining = 5.0;
    let bossCombo = 0;

    function initBossBattle() {
      bossHp = 3;
      bossCombo = 0;
      loadBossCrisis(0);
    }

    function loadBossCrisis(index) {
      if (bossTimerInterval) clearInterval(bossTimerInterval);
      currentCrisisIndex = index % BOSS_CRISES.length;
      const crisis = BOSS_CRISES[currentCrisisIndex];

      const nameEl = document.getElementById('bossNameTitle');
      const zhEl = document.getElementById('bossQuoteZh');
      const phoEl = document.getElementById('bossQuotePhonetic');
      const viEl = document.getElementById('bossQuoteVi');
      const comboBadge = document.getElementById('gameComboBadge');
      const feedbackBox = document.getElementById('bossFeedbackBox');
      const questionArea = document.getElementById('bossQuestionArea');
      const victoryCard = document.getElementById('bossVictoryCard');
      const avatarEl = document.getElementById('bossAvatarIcon');

      if (nameEl) nameEl.textContent = crisis.bossName;
      if (zhEl) zhEl.textContent = crisis.zh;
      if (phoEl) phoEl.textContent = `${crisis.pinyin} • [${crisis.viBoi}]`;
      if (viEl) viEl.textContent = `"${crisis.meaning}"`;
      if (feedbackBox) { feedbackBox.classList.add('hidden'); feedbackBox.innerHTML = ''; }
      if (questionArea) questionArea.classList.remove('hidden');
      if (victoryCard) victoryCard.classList.add('hidden');
      if (avatarEl) avatarEl.textContent = '😡';

      updateBossHpUi();

      if (comboBadge) {
        if (bossCombo > 0) {
          comboBadge.classList.remove('hidden');
          comboBadge.textContent = `🔥 COMBO x${bossCombo}`;
        } else {
          comboBadge.classList.add('hidden');
        }
      }

      // Render Answer Buttons
      const ansContainer = document.getElementById('bossAnswersContainer');
      if (ansContainer) {
        ansContainer.innerHTML = '';
        const shuffled = [...crisis.answers].map((ans, origIdx) => ({ ...ans, origIdx }));
        shuffled.sort(() => Math.random() - 0.5);

        shuffled.forEach(ans => {
          const btn = document.createElement('button');
          btn.className = 'w-full p-3 sm:p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500 hover:bg-slate-800/80 text-left transition flex items-center justify-between gap-3 group';
          btn.innerHTML = `
            <div class="flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-300 font-bold text-xs flex items-center justify-center shrink-0 transition">
                ⚡
              </span>
              <span class="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white">${ans.text}</span>
            </div>
            <span class="text-slate-500 text-xs shrink-0 group-hover:text-amber-400">Chọn ➔</span>
          `;
          btn.onclick = () => handleBossAnswer(ans, btn);
          ansContainer.appendChild(btn);
        });
      }

      startBossTimer();
    }

    function startBossTimer() {
      if (bossTimerInterval) clearInterval(bossTimerInterval);
      bossTimeRemaining = 5.0;
      const bar = document.getElementById('bossTimerBar');
      const text = document.getElementById('bossTimerText');

      bossTimerInterval = setInterval(() => {
        bossTimeRemaining -= 0.1;
        if (bossTimeRemaining <= 0) {
          bossTimeRemaining = 0;
          clearInterval(bossTimerInterval);
          handleBossTimeout();
        }
        if (text) text.textContent = `${bossTimeRemaining.toFixed(1)}s`;
        if (bar) bar.style.width = `${(bossTimeRemaining / 5.0) * 100}%`;
      }, 100);
    }

    function handleBossTimeout() {
      soundFX.playError();
      const card = document.getElementById('bossBattleCard');
      if (card) {
        card.classList.add('shake-effect');
        setTimeout(() => card.classList.remove('shake-effect'), 500);
      }
      bossCombo = 0;
      const avatarEl = document.getElementById('bossAvatarIcon');
      if (avatarEl) avatarEl.textContent = '🤬';

      const crisis = BOSS_CRISES[currentCrisisIndex];
      const correctAns = crisis.answers.find(a => a.isCorrect);
      showBossFeedback(false, 'HẾT GIỜ! Sếp nổi điên vì bạn đứng hình ngơ ngác!', correctAns);
    }

    function handleBossAnswer(ansOrIdx, btnEl) {
      if (bossTimerInterval) clearInterval(bossTimerInterval);
      const crisis = BOSS_CRISES[currentCrisisIndex];
      let ans = ansOrIdx;
      if (typeof ansOrIdx === 'number') {
        ans = crisis.answers[ansOrIdx] || crisis.answers[0];
      }
      if (!ans) return;

      if (ans.isCorrect) {
        soundFX.playHit();
        soundFX.playCoin();
        if (particleEngine) particleEngine.burst(btnEl ? btnEl.getBoundingClientRect().left + 150 : window.innerWidth / 2, btnEl ? btnEl.getBoundingClientRect().top : 300, 30);

        bossCombo++;
        addCp(50 * bossCombo, btnEl);
        bossHp--;

        const avatarEl = document.getElementById('bossAvatarIcon');
        if (avatarEl) avatarEl.textContent = '😲';

        updateBossHpUi();

        if (bossHp <= 0) {
          handleBossVictory();
        } else {
          showBossFeedback(true, `CHÍNH XÁC! Đỡ đòn thành công (+${50 * bossCombo} CP)!`, ans);
        }
      } else {
        soundFX.playError();
        const card = document.getElementById('bossBattleCard');
        if (card) {
          card.classList.add('shake-effect');
          setTimeout(() => card.classList.remove('shake-effect'), 500);
        }
        bossCombo = 0;
        const avatarEl = document.getElementById('bossAvatarIcon');
        if (avatarEl) avatarEl.textContent = '🤬';

        const correctAns = crisis.answers.find(a => a.isCorrect);
        showBossFeedback(false, 'SAI RỒI! ' + (ans.exp || ''), correctAns);
      }
    }

    function showBossFeedback(isCorrect, heading, correctAns) {
      const fb = document.getElementById('bossFeedbackBox');
      if (!fb) return;
      fb.classList.remove('hidden');
      fb.className = `mt-4 p-4 rounded-2xl text-left text-xs border ${
        isCorrect ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200' : 'bg-red-950/60 border-red-500/40 text-red-200'
      }`;

      fb.innerHTML = `
        <div class="font-black text-sm mb-1">${isCorrect ? '🎯 ' : '⚠️ '}${heading}</div>
        <div class="text-slate-300 mt-1">Câu đối đáp chuẩn: <strong class="text-amber-400 font-han">${correctAns.text}</strong></div>
        <div class="text-[11px] text-slate-400 mt-1 italic">${correctAns.exp || ''}</div>
        <div class="mt-3 flex items-center gap-2">
          <button type="button" onclick="speakText(this.getAttribute('data-text'))" data-text="${correctAns.text.replace(/"/g, '&quot;')}" class="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition">
            <span>🔊</span>
            <span>Nghe Lại Câu Chuẩn</span>
          </button>
          <button onclick="loadBossCrisis(currentCrisisIndex + 1)" class="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition">
            Tiếp Tục ➔
          </button>
        </div>
      `;
    }

    function updateBossHpUi() {
      const container = document.getElementById('bossHpHearts');
      if (!container) return;
      let html = '';
      for (let i = 0; i < bossMaxHp; i++) {
        html += i < bossHp ? '<span>❤️</span>' : '<span class="opacity-30">🖤</span>';
      }
      container.innerHTML = html;
    }

    function handleBossVictory() {
      soundFX.playSuccess();
      if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 60);

      const state = getPlayerState();
      state.bossDefeated += 1;
      state.keys += 1;
      savePlayerState(state);
      addCp(150);

      const questionArea = document.getElementById('bossQuestionArea');
      const victoryCard = document.getElementById('bossVictoryCard');
      const avatarEl = document.getElementById('bossAvatarIcon');

      if (questionArea) questionArea.classList.add('hidden');
      if (victoryCard) victoryCard.classList.remove('hidden');
      if (avatarEl) avatarEl.textContent = '🏆';
    }

    function nextBossCrisis() {
      bossHp = 3;
      loadBossCrisis(currentCrisisIndex + 1);
    }

    function playCurrentBossAudio() {
      const crisis = BOSS_CRISES[currentCrisisIndex];
      if (crisis) {
        stopAllAudioPlayback();
        const bossAudioId = `crisis_boss_${crisis.id}`;
        playSingleAudio(crisis.zh, 0.9, null, bossAudioId);
      }
    }

    function launchBossBattle() {
      switchMainTab('learn');
      const arena = document.getElementById('bossBattleCard');
      if (arena) arena.scrollIntoView({ behavior: 'smooth' });
    }

    // =========================================================================
    // MYSTERY CHEST GACHA SYSTEM
    // =========================================================================
    const CHEST_LOOTS = [
      {
        id: 'cash_doubler',
        rarity: 'legendary',
        rarityText: '⭐ HUYỀN THOẠI (10%) ⭐',
        icon: '👑',
        title: 'Phiếu Nhân Đôi 200k Tiền Mặt (Nhận 400k)',
        desc: 'Khi giới thiệu đồng nghiệp mua máy Zin Zone, nhận gấp đôi: Rút ngay 400.000đ tiền mặt trao tay!',
        borderClass: 'border-amber-400 glow-gold'
      },
      {
        id: 'salary_pitch',
        rarity: 'epic',
        rarityText: '💎 SỬ THI (25%) 💎',
        icon: '📜',
        title: 'Bí Kíp Đàm Phán Lương 20M Với Sếp Đài Loan',
        desc: 'Mở khóa mẫu câu deal lương độc quyền: Nói 1 câu sếp duyệt tăng phụ cấp chức vụ ngay!',
        borderClass: 'border-purple-400'
      },
      {
        id: 'boss_shield',
        rarity: 'rare',
        rarityText: '🛡️ HIẾM (35%) 🛡️',
        icon: '🛡️',
        title: 'Khiên Miễn Tử Sếp Vương',
        desc: 'Bảo vệ chuỗi ngày liên tiếp, tự động xóa 1 lần trả lời sai khi đấu Boss!',
        borderClass: 'border-blue-400'
      },
      {
        id: 'cp_potion',
        rarity: 'common',
        rarityText: '⚡ PHỔ THÔNG (30%) ⚡',
        icon: '⚡',
        title: 'Bình Thuốc Tăng Lực (+200 CP)',
        desc: 'Cộng ngay 200 điểm chiến lực trên bảng xếp hạng đại chiến KCN!',
        borderClass: 'border-emerald-400'
      }
    ];

    let currentLootItem = null;
    let isChestOpening = false;

    function openMysteryChestModal() {
      isChestOpening = false;
      const modal = document.getElementById('modalMysteryChest');
      const closedView = document.getElementById('chestClosedView');
      const lootView = document.getElementById('chestLootView');
      const keyCountEl = document.getElementById('chestKeyCount');
      const state = getPlayerState();

      if (keyCountEl) keyCountEl.textContent = state.keys;
      if (closedView) closedView.classList.remove('hidden');
      if (lootView) lootView.classList.add('hidden');

      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeMysteryChestModal() {
      isChestOpening = false;
      const modal = document.getElementById('modalMysteryChest');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function unlockMysteryChest() {
      if (isChestOpening) return;
      const state = getPlayerState();
      if (state.keys <= 0) {
        showToast('Bạn đã hết Chìa Khóa! Hãy chiến thắng Boss hoặc học bài để nhận thêm nhé!', 'warning');
        return;
      }

      isChestOpening = true;
      state.keys -= 1;
      savePlayerState(state);
      const keyCountEl = document.getElementById('chestKeyCount');
      if (keyCountEl) keyCountEl.textContent = state.keys;
      updateHudDisplay();

      const graphic = document.getElementById('chestGraphic');
      if (graphic) graphic.classList.add('chest-wiggle');

      soundFX.playChest();

      setTimeout(() => {
        isChestOpening = false;
        if (graphic) graphic.classList.remove('chest-wiggle');

        const rand = Math.random();
        let loot;
        if (rand < 0.10) loot = CHEST_LOOTS[0];
        else if (rand < 0.35) loot = CHEST_LOOTS[1];
        else if (rand < 0.70) loot = CHEST_LOOTS[2];
        else loot = CHEST_LOOTS[3];

        currentLootItem = loot;
        state.inventory.unshift(loot);
        if (loot.id === 'cp_potion') state.cp += 200;
        savePlayerState(state);

        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 50);

        const closedView = document.getElementById('chestClosedView');
        const lootView = document.getElementById('chestLootView');
        const rarityText = document.getElementById('lootRarityText');
        const iconEl = document.getElementById('lootIcon');
        const titleEl = document.getElementById('lootTitle');
        const descEl = document.getElementById('lootDesc');
        const cardFrame = document.getElementById('lootCardFrame');

        if (rarityText) rarityText.textContent = loot.rarityText;
        if (iconEl) iconEl.textContent = loot.icon;
        if (titleEl) titleEl.textContent = loot.title;
        if (descEl) descEl.textContent = loot.desc;
        if (cardFrame) cardFrame.className = `p-5 rounded-2xl bg-slate-900 border-2 ${loot.borderClass} shadow-2xl my-3`;

        if (closedView) closedView.classList.add('hidden');
        if (lootView) lootView.classList.remove('hidden');
      }, 800);
    }

    function claimChestLoot() {
      closeMysteryChestModal();
      showToast('Đã cất vật phẩm vào Túi Đồ thành công!', 'success');
    }

    // =========================================================================
    // FACTION GUILD WARS & SOCIAL INVITATION SYSTEM
    // =========================================================================
    const FACTIONS = {
      foxconn: { name: 'Foxconn Vân Trung', flag: '🔴', cp: 128450 },
      luxshare: { name: 'Luxshare Quang Châu', flag: '🔵', cp: 112200 },
      goertek: { name: 'Goertek Quế Võ', flag: '🟢', cp: 98600 }
    };

    function openFactionModal() {
      const modal = document.getElementById('modalFactionWars');
      const state = getPlayerState();
      highlightSelectedFaction(state.faction);
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closeFactionModal() {
      const modal = document.getElementById('modalFactionWars');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function selectFaction(key) {
      const state = getPlayerState();
      state.faction = key;
      savePlayerState(state);
      highlightSelectedFaction(key);
      soundFX.playCoin();
      showToast(`Đã gia nhập Quân Đoàn: ${FACTIONS[key].name}!`, 'success');
    }

    function highlightSelectedFaction(key) {
      ['foxconn', 'luxshare', 'goertek'].forEach(f => {
        const el = document.getElementById(`cardFaction-${f}`);
        if (el) {
          if (f === key) {
            el.classList.add('ring-2', 'ring-amber-500', 'bg-slate-900');
          } else {
            el.classList.remove('ring-2', 'ring-amber-500', 'bg-slate-900');
          }
        }
      });
    }

    function contributeFactionCp() {
      soundFX.playCoin();
      addCp(50);
      showToast('Đã đóng góp +50 CP cho chiến trường KCN!', 'success');
    }

    function shareFactionInviteZalo() {
      const state = getPlayerState();
      const fac = FACTIONS[state.faction] || FACTIONS.foxconn;
      const myRef = getMyDeviceReferralCode();
      const text = encodeURIComponent(`Anh em ${fac.name} ơi! Vào Zin Zone đua chiến lực tiếng Trung thăng chức cùng tao! Quân đoàn mình đang cần thêm anh em tiếp sức: https://zin.zone?ref=${myRef}#learn`);
      window.open(`https://zalo.me/share?url=https%3A%2F%2Fzin.zone%3Fref%3D${myRef}&text=${text}`, '_blank');
    }

    // =========================================================================
    // PLAYER PROFILE & INVENTORY MODAL
    // =========================================================================
    function openPlayerProfileModal() {
      const modal = document.getElementById('modalPlayerProfile');
      const state = getPlayerState();
      const rank = getPlayerRank(state.cp);

      const titleEl = document.getElementById('profPlayerTitle');
      const badgeEl = document.getElementById('profLevelBadge');
      const cpEl = document.getElementById('profCpValue');
      const facEl = document.getElementById('profFactionName');
      const streakEl = document.getElementById('profStatStreak');
      const bossEl = document.getElementById('profStatBoss');
      const comboEl = document.getElementById('profStatCombo');
      const listEl = document.getElementById('profInventoryList');

      if (titleEl) titleEl.textContent = rank.title;
      if (badgeEl) badgeEl.textContent = `Lv.${rank.level}`;
      if (cpEl) cpEl.textContent = `${state.cp.toLocaleString()} CP`;
      if (facEl) facEl.textContent = FACTIONS[state.faction]?.name || 'Foxconn';
      if (streakEl) streakEl.textContent = `🔥 ${state.streak} Ngày`;
      if (bossEl) bossEl.textContent = `⚔️ ${state.bossDefeated} Trận`;
      if (comboEl) comboEl.textContent = `⚡ x${Math.max(1, state.maxCombo, bossCombo)}`;

      // Cultivation Realm progression
      const currentRealmEl = document.getElementById('profCurrentRealm');
      const currentHskEl = document.getElementById('profCurrentHsk');
      const realmDescEl = document.getElementById('profRealmDesc');
      const cpProgressTextEl = document.getElementById('profCpProgressText');
      const cpProgressBarEl = document.getElementById('profCpProgressBar');
      const btnBreakthroughTextEl = document.getElementById('btnBreakthroughText');
      const btnBreakthroughRealmEl = document.getElementById('btnBreakthroughRealm');

      if (currentRealmEl) currentRealmEl.textContent = rank.realm || 'Luyện Khí Sơ Kỳ';
      if (currentHskEl) currentHskEl.textContent = rank.badge || 'HSK 1';
      if (realmDescEl) realmDescEl.textContent = rank.desc || '';

      const nextRank = PLAYER_RANKS.find(r => r.level === rank.level + 1);
      if (nextRank) {
        const pct = Math.min(100, Math.round((state.cp / nextRank.minCp) * 100));
        if (cpProgressTextEl) cpProgressTextEl.textContent = `${state.cp.toLocaleString()} / ${nextRank.minCp.toLocaleString()} CP (${pct}%)`;
        if (cpProgressBarEl) cpProgressBarEl.style.width = `${pct}%`;
        if (btnBreakthroughTextEl) {
          if (state.cp >= nextRank.minCp) {
            btnBreakthroughTextEl.textContent = `⚡ Đột Phá Lên [${nextRank.realm}] Ngay!`;
            if (btnBreakthroughRealmEl) btnBreakthroughRealmEl.className = 'w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:opacity-95 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5 animate-pulse';
          } else {
            btnBreakthroughTextEl.textContent = `Cần ${nextRank.minCp - state.cp} CP để Đột Phá [${nextRank.realm}]`;
            if (btnBreakthroughRealmEl) btnBreakthroughRealmEl.className = 'w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1.5';
          }
        }
      } else {
        if (cpProgressTextEl) cpProgressTextEl.textContent = `${state.cp.toLocaleString()} CP (Cực Phẩm Đỉnh Phong)`;
        if (cpProgressBarEl) cpProgressBarEl.style.width = '100%';
        if (btnBreakthroughTextEl) btnBreakthroughTextEl.textContent = 'Đã Đạt Cảnh Giới Đỉnh Phong';
      }

      if (listEl) {
        listEl.innerHTML = '';
        state.inventory.forEach(item => {
          const div = document.createElement('div');
          div.className = 'p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs';
          div.innerHTML = `
            <span class="text-xl shrink-0">${item.icon || '🎁'}</span>
            <div>
              <div class="font-bold text-white flex items-center gap-2">
                <span>${item.title || item.name}</span>
                <span class="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded">${item.rarity || 'common'}</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">${item.desc}</div>
            </div>
          `;
          listEl.appendChild(div);
        });
      }

      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }

    function closePlayerProfileModal() {
      const modal = document.getElementById('modalPlayerProfile');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function openPrivacyModal() {
      const modal = document.getElementById('modalPrivacyPolicy');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }
    function closePrivacyModal() {
      const modal = document.getElementById('modalPrivacyPolicy');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function openTermsModal() {
      const modal = document.getElementById('modalTermsOfService');
      if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
      }
    }
    function closeTermsModal() {
      const modal = document.getElementById('modalTermsOfService');
      if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
      }
    }

    function closeAllModals() {
      closeMysteryChestModal();
      closeFactionModal();
      closePlayerProfileModal();
      if (typeof closeInstallGuide === 'function') closeInstallGuide();
      if (typeof closeJobModal === 'function') closeJobModal();
      if (typeof closeDeviceVerificationModal === 'function') closeDeviceVerificationModal();
      if (typeof closeDealerPartnerModal === 'function') closeDealerPartnerModal();
      if (typeof closeOnboardingFlowModal === 'function') closeOnboardingFlowModal();
      closePrivacyModal();
      closeTermsModal();
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });

// Ensure global accessibility for legacy and event handlers
window.particleEngine = particleEngine;
