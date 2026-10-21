/**
 * js/app-curriculum.js
 * Hán-Việt Cognitive Awakening Engine + 21-Day Dynamic Curriculum Renderer
 */

// HÁN-VIỆT COGNITIVE AWAKENING ENGINE (HUYẾT MẠCH ĐỘT PHÁ)
    // =========================================================================
    const AWAKENING_COGNATES = [
      { vi: 'Thái độ', zh: '态度', pinyin: 'tài dù', desc: 'Thái độ tích cực là chìa khóa thăng chức!' },
      { vi: 'Chuẩn bị', zh: '准备', pinyin: 'zhǔn bèi', desc: 'Chuẩn bị vật tư đầy đủ trước giờ vào ca.' },
      { vi: 'An toàn', zh: '安全', pinyin: 'ān quán', desc: 'An toàn sản xuất là sinh mạng của nhà máy!' },
      { vi: 'Chú ý', zh: '注意', pinyin: 'zhù yì', desc: 'Chú ý từng khâu nhỏ, diệt sạch lỗi sản phẩm.' },
      { vi: 'Công xưởng', zh: '工厂', pinyin: 'gōng chǎng', desc: 'Đấu trường tu luyện của hàng vạn công nhân.' },
      { vi: 'Sản phẩm', zh: '产品', pinyin: 'chǎn pǐn', desc: 'Sản phẩm nguyên bản chuẩn chỉ từng milimet.' },
      { vi: 'Tổ trưởng', zh: '组长', pinyin: 'zǔ zhǎng', desc: 'Mục tiêu tối thượng sau 21 ngày đắc đạo!' },
      { vi: 'Giám đốc', zh: '总监', pinyin: 'zǒng jiān', desc: 'Lãnh đạo cấp cao nhà máy Hoa Kiều.' }
    ];

    const AWAKENING_TONE_PAIRS = [
      { tone: 1, pinyin: 'ān', char: '安', zh: '安 (An)', label: 'ān • Thanh 1 (Phi Kiếm Cao Bằng)' },
      { tone: 4, pinyin: 'tài', char: '态', zh: '态 (Thái)', label: 'tài • Thanh 4 (Lôi Trảm Chém Xuống)' },
      { tone: 1, pinyin: 'gōng', char: '工', zh: '工 (Công)', label: 'gōng • Thanh 1 (Phi Kiếm Cao Bằng)' },
      { tone: 4, pinyin: 'dù', char: '度', zh: '度 (Độ)', label: 'dù • Thanh 4 (Lôi Trảm Chém Xuống)' }
    ];

    const AWAKENING_RUNES = [
      { char: '休', pinyin: 'xiū', vi: 'Hưu (Nghỉ ngơi)', parts: ['亻 (Người)', '木 (Cây)'], story: 'Người tựa vào gốc cây nghỉ ngơi dưỡng sức' },
      { char: '明', pinyin: 'míng', vi: 'Minh (Sáng sủa)', parts: ['日 (Mặt trời)', '月 (Mặt trăng)'], story: 'Nhật Nguyệt hội tụ tỏa ánh hào quang' },
      { char: '好', pinyin: 'hǎo', vi: 'Hảo (Tốt đẹp)', parts: ['女 (Phụ nữ)', '子 (Con trẻ)'], story: 'Mẹ con sum vầy là phúc đức gia đình' },
      { char: '搞', pinyin: 'gǎo', vi: 'Cảo (Làm / Xử lý)', parts: ['扌(Bàn tay)', '高 (Cao siêu)'], story: 'Tay cầm chắc chắn giải quyết êm đẹp sự cố' }
    ];

    let currentAwakeQuiz = null;
    let awakeProgress = [];
    try {
      awakeProgress = JSON.parse(safeStorage.getItem('zin_awake_progress_v1') || '[]');
    } catch(e) {
      awakeProgress = [];
    }

    function initAwakeningEngine() {
      renderAwakeningCognates();
      renderAwakeningRunes();
      updateAwakeningProgressDisplay();
    }

    function switchAwakeningTab(tab) {
      const tabs = ['cognates', 'tones', 'runes', 'matrix'];
      tabs.forEach(t => {
        const btn = document.getElementById(`tabBtnAwake${t.charAt(0).toUpperCase() + t.slice(1)}`);
        const panel = document.getElementById(`awakePanel${t.charAt(0).toUpperCase() + t.slice(1)}`);
        if (t === tab) {
          if (btn) {
            btn.className = 'flex-1 py-1.5 rounded-lg bg-indigo-600 text-white shadow transition text-center px-1';
          }
          if (panel) panel.classList.remove('hidden');
        } else {
          if (btn) {
            btn.className = 'flex-1 py-1.5 rounded-lg text-slate-400 hover:text-white transition text-center px-1';
          }
          if (panel) panel.classList.add('hidden');
        }
      });
      if (tab === 'tones') playToneQuizAudio();
    }

    function renderAwakeningCognates() {
      const container = document.getElementById('awakeCognatesGrid');
      if (!container) return;
      container.innerHTML = '';
      AWAKENING_COGNATES.forEach((c, idx) => {
        const isLearned = awakeProgress.includes(idx);
        const card = document.createElement('div');
        card.className = `cursor-pointer p-3 rounded-2xl border transition-all text-center ${
          isLearned 
            ? 'bg-indigo-950/40 border-emerald-500/50 shadow-md shadow-emerald-500/10' 
            : 'bg-slate-900 border-slate-800 hover:border-indigo-500/60'
        }`;
        card.onclick = () => playCognateCard(idx, card);
        card.innerHTML = `
          <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${c.vi}</div>
          <div class="font-han font-black text-xl text-white my-1">${c.zh}</div>
          <div class="text-xs font-mono text-amber-400 font-bold">${c.pinyin}</div>
          <div class="mt-1 text-[9px] text-emerald-400 font-bold flex items-center justify-center gap-1">
            <span class="audio-step-label">🔊</span>
            <span>${isLearned ? '✓ Đã ngộ' : 'Chạm để ngộ'}</span>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function playCognateCard(idx, cardEl) {
      const c = AWAKENING_COGNATES[idx];
      if (!c) return;
      speakWordTriple(c.zh, cardEl, 'cognate_' + (idx + 1));
      if (!awakeProgress.includes(idx)) {
        awakeProgress.push(idx);
        safeStorage.setItem('zin_awake_progress_v1', JSON.stringify(awakeProgress));
        addCp(25, cardEl);
        renderAwakeningCognates();
        updateAwakeningProgressDisplay();
      } else {
        addCp(5, cardEl);
      }
    }

    function updateAwakeningProgressDisplay() {
      const countEl = document.getElementById('awakeningProgressCount');
      if (countEl) countEl.textContent = `${awakeProgress.length}/${AWAKENING_COGNATES.length} từ`;
    }

    function playToneQuizAudio() {
      const pick = AWAKENING_TONE_PAIRS[Math.floor(Math.random() * AWAKENING_TONE_PAIRS.length)];
      currentAwakeQuiz = pick;
      speakText(pick.char || pick.pinyin);
      const label = document.getElementById('btnToneQuizLabel');
      if (label) label.textContent = `Đang phát âm: [${pick.pinyin}] - Chú ý nghe kiếm khí!`;
      const fb = document.getElementById('toneQuizFeedback');
      if (fb) fb.textContent = '';
    }

    function answerToneQuiz(chosenTone) {
      if (!currentAwakeQuiz) {
        playToneQuizAudio();
        return;
      }
      const fb = document.getElementById('toneQuizFeedback');
      if (chosenTone === currentAwakeQuiz.tone) {
        soundFX.playSuccess();
        if (fb) {
          fb.className = 'text-xs font-bold mt-2 text-emerald-400';
          fb.textContent = `⚡ CHÍNH XÁC! "${currentAwakeQuiz.label}"! +50 CP!`;
        }
        addCp(50);
        setTimeout(playToneQuizAudio, 1500);
      } else {
        soundFX.playClick();
        if (fb) {
          fb.className = 'text-xs font-bold mt-2 text-amber-400';
          fb.textContent = `Chưa chuẩn! Đây là ${currentAwakeQuiz.tone === 1 ? 'Thanh 1 (Phi Kiếm phẳng)' : 'Thanh 4 (Lôi Đình bổ xuống)'}. Thử lại nhé!`;
        }
      }
    }

    function renderAwakeningRunes() {
      const container = document.getElementById('awakeRunesGrid');
      if (!container) return;
      container.innerHTML = '';
      AWAKENING_RUNES.forEach((r, idx) => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3';
        div.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center font-han font-black text-2xl text-amber-400 shrink-0">
              ${r.char}
            </div>
            <div>
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>${r.vi}</span>
                <span class="font-mono text-amber-300">(${r.pinyin})</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">
                Ghép từ: <strong class="text-slate-200">${r.parts.join(' + ')}</strong>
              </div>
              <div class="text-[10px] text-emerald-400 italic mt-0.5">${r.story}</div>
            </div>
          </div>
          <button onclick="speakWordTriple('${r.char}', this, 'rune_${idx + 1}')" aria-label="Nghe âm" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs shrink-0 transition" title="Nghe âm">
            🔊
          </button>
        `;
        container.appendChild(div);
      });
    }

    function claimAwakeningMastery() {
      if (awakeProgress.length < 4) {
        showToast('Hãy giác ngộ ít nhất 4 từ Hán-Việt trước khi nhận thưởng!', 'warning');
        return;
      }
      const state = getPlayerState();
      state.keys = (state.keys || 0) + 1;
      savePlayerState(state);
      addCp(500);
      updateHudDisplay();
      const keyCountEl = document.getElementById('chestKeyCount');
      if (keyCountEl) keyCountEl.textContent = state.keys;
      if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 80);
      soundFX.playSuccess();
      showToast('🎉 ĐẮC ĐẠO! Bạn đã nhận +500 CP và 1 Chìa Khóa Mở Rương!', 'success');
      const btn = document.getElementById('btnClaimAwakening');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>✓</span><span>Đã Hoàn Thành Giác Ngộ!</span>';
        btn.className = 'px-5 py-2 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs cursor-default flex items-center gap-1.5';
      }
    }

    // Voice Speech Power (言出法随) for Boss Battle
    function startVoiceChant() {
      const crisis = BOSS_CRISES[currentCrisisIndex];
      const correctAns = crisis?.answers?.find(a => a.isCorrect);
      if (!correctAns) return;

      const resetVoiceBtn = () => {
        const icon = document.getElementById('voiceChantIcon');
        const label = document.getElementById('voiceChantLabel');
        if (icon) icon.textContent = '🎙️';
        if (label) label.textContent = 'Nói Để Trảm Boss (言出法随)';
      };

      let handled = false;
      const executeSmartStrike = (spoken = null) => {
        if (handled) return;
        handled = true;
        resetVoiceBtn();
        soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 70);
        const chant = spoken || correctAns.text;
        showToast(`⚡ NGÔN LINH XUẤT THẾ: "${chant}"! Sát thương chí mạng: 9999!`, 'success');
        speakText(correctAns.text);
        setTimeout(() => handleBossAnswer(crisis.answers.indexOf(correctAns)), 600);
      };

      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        executeSmartStrike();
        return;
      }

      try {
        const rec = new SpeechRec();
        rec.lang = 'zh-CN';
        rec.continuous = false;
        rec.interimResults = false;

        const icon = document.getElementById('voiceChantIcon');
        const label = document.getElementById('voiceChantLabel');
        if (icon) icon.textContent = '🔴';
        if (label) label.textContent = 'Đang nghe... Hãy nói tiếng Trung!';

        rec.onresult = (event) => {
          const spoken = event.results?.[0]?.[0]?.transcript || correctAns.text;
          executeSmartStrike(spoken);
        };

        rec.onerror = (err) => {
          console.warn('SpeechRecognition error, falling back to smart chant assist:', err);
          executeSmartStrike();
        };

        rec.onend = () => {
          resetVoiceBtn();
        };

        rec.start();

        // Safety timeout so player is never stalled
        setTimeout(() => {
          if (!handled) {
            try { rec.stop(); } catch (e) {}
            executeSmartStrike();
          }
        }, 3500);
      } catch (e) {
        console.warn('startVoiceChant exception, falling back to smart chant assist:', e);
        executeSmartStrike();
      }
    }

    // Cultivation Realm Breakthrough in Profile
    function attemptRealmBreakthrough() {
      const state = getPlayerState();
      const currentRank = getPlayerRank(state.cp);
      const nextRank = PLAYER_RANKS.find(r => r.level === currentRank.level + 1);

      if (!nextRank) {
        showToast('Chúc mừng Tiên Hữu! Bạn đã đạt Cảnh Giới Đỉnh Phong cao nhất!', 'success');
        return;
      }

      if (state.cp >= nextRank.minCp) {
        soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 80);
        showToast(`🌌 ĐỘT PHÁ THÀNH CÔNG! Chúc mừng bạn đã thăng lên [${nextRank.realm}]!`, 'success');
        openPlayerProfileModal();
        updateHudDisplay();
      } else {
        const needed = nextRank.minCp - state.cp;
        showToast(`⚡ Chân nguyên chưa đủ! Cần thêm ${needed} CP để đột phá [${nextRank.realm}]. Hãy tiếp tục luyện bài và đấu Boss!`, 'warning');
      }
    }

    // =========================================================================

function isSentenceMastered(id) {
      return !!progressData['sent_' + id];
    }
    function toggleSentenceMastered(id, forceState = null) {
      const wasMastered = !!progressData['sent_' + id];
      if (forceState !== null) {
        progressData['sent_' + id] = !!forceState;
      } else {
        progressData['sent_' + id] = !wasMastered;
      }
      safeStorage.setItem(storageKey, JSON.stringify(progressData));
      if (progressData['sent_' + id] && !wasMastered && forceState === null) {
        addCp(20);
        soundFX.playCoin();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 20);
        showToast('🎯 Đã thuộc câu khẩu quyết! (+20 CP)', 'success');
      }
      renderSentences();
      updateProgressDisplay();
    }
    function isMissionCompleted(day) {
      return !!progressData['mission_day_' + day];
    }
    function toggleMissionCompleted(day) {
      progressData['mission_day_' + day] = !progressData['mission_day_' + day];
      safeStorage.setItem(storageKey, JSON.stringify(progressData));
      if (progressData['mission_day_' + day]) {
        const state = getPlayerState();
        state.keys += 1;
        savePlayerState(state);
        addCp(100);
        soundFX.playSuccess();
        const keyCountEl = document.getElementById('chestKeyCount');
        if (keyCountEl) keyCountEl.textContent = state.keys;
        updateHudDisplay();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 40);
        showToast('🏆 HOÀN THÀNH NHIỆM VỤ! (+100 CP & +1 Chìa Khóa Hoàng Kim 🗝️)', 'success');
      }
      renderMission();
    }

    // 3 Daily Water Break Checkpoints (Trạm Nạp Nước Giờ Giải Lao - 3 Phút/Trạm)
    function getTodayWaterKey() {
      return `zin_water_stations_d${currentDay || 1}`;
    }

    function checkInWaterStation(stationNum) {
      const key = getTodayWaterKey();
      let completed = [];
      try {
        completed = JSON.parse(safeStorage.getItem(key) || '[]');
      } catch (e) {}

      if (!completed.includes(stationNum)) {
        completed.push(stationNum);
        safeStorage.setItem(key, JSON.stringify(completed));
        addCp(30);
        soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 35);
        showToast(`💧 ĐÃ NẠP NƯỚC TRẠM ${stationNum}! Tinh lực tràn trề! (+30 CP)`, 'success');

        if (completed.length === 3) {
          addCp(50);
          showToast(`🏆 ĐẠT BÌNH NƯỚC BẤT TỬ! Nuốt trọn 3 trạm ngày ${currentDay}! (+50 CP Thưởng)`, 'success');
        }
      }
      renderWaterStations();
    }

    function renderWaterStations() {
      const key = getTodayWaterKey();
      let completed = [];
      try {
        completed = JSON.parse(safeStorage.getItem(key) || '[]');
      } catch (e) {}

      const countEl = document.getElementById('waterProgressCount');
      if (countEl) countEl.textContent = `${completed.length}/3`;

      for (let s = 1; s <= 3; s++) {
        const card = document.getElementById(`waterStationCard_${s}`);
        const btn = document.getElementById(`btnWaterStation_${s}`);
        const isDone = completed.includes(s);

        if (card) {
          if (isDone) {
            card.classList.add('border-emerald-500/50', 'bg-emerald-950/20');
            card.classList.remove('border-slate-800');
          } else {
            card.classList.remove('border-emerald-500/50', 'bg-emerald-950/20');
            card.classList.add('border-slate-800');
          }
        }

        if (btn) {
          if (isDone) {
            btn.className = 'mt-2.5 w-full py-1.5 rounded-lg bg-emerald-900/60 text-emerald-300 font-bold text-[11px] border border-emerald-500/40 cursor-default flex items-center justify-center gap-1';
            btn.innerHTML = '<span>✅</span><span>Đã Nạp Nước</span>';
          } else {
            btn.className = 'mt-2.5 w-full py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white font-bold text-[11px] transition flex items-center justify-center gap-1';
            btn.innerHTML = '<span>💧</span><span>Nạp Nước (+30 CP)</span>';
          }
        }
      }

      const bonusBanner = document.getElementById('waterBonusBanner');
      if (bonusBanner) {
        if (completed.length === 3) {
          bonusBanner.classList.remove('hidden');
        } else {
          bonusBanner.classList.add('hidden');
        }
      }
    }

    // Render 21 Days
    function renderDayTabs() {
      const container = document.getElementById('dayTabsContainer');
      if (!container || !window.CURRICULUM_DATA) return;
      container.innerHTML = '';

      window.CURRICULUM_DATA.days.forEach(d => {
        const btn = document.createElement('button');
        const isActive = d.day === currentDay;
        const phaseColor = d.phase === 1 ? 'border-red-500/40' : (d.phase === 2 ? 'border-amber-500/40' : 'border-purple-500/40');
        const activeBg = d.phase === 1 ? 'bg-red-600 text-white' : (d.phase === 2 ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white');

        btn.className = `px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border ${
          isActive ? `${activeBg} shadow-md` : `bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 ${phaseColor}`
        }`;
        
        const isLocked = d.day > 1 && !isDeviceLicensed();
        btn.innerHTML = `<span>Day ${d.day}</span>${isLocked ? '<span class="text-[11px] text-amber-400">🔒</span>' : ''}<span class="text-[10px] opacity-75 font-normal">(${d.titleVi.split(' ')[0]})</span>`;
        btn.onclick = () => selectDay(d.day);
        container.appendChild(btn);
      });
    }

    function selectDay(dayNum) {
      if (dayNum > 1 && !isDeviceLicensed()) {
        showToast(`🔒 Day ${dayNum} thuộc Bản Quyền VIP. Mở khóa online 399k hoặc nhập mã kích hoạt!`, 'info');
        openGatekeeperModal('online');
        return;
      }
      currentDay = Math.max(1, Math.min(21, dayNum));
      renderDayTabs();
      renderDayContent();
    }

    function renderDayContent() {
      const data = window.CURRICULUM_DATA;
      if (!data) return;
      const dayData = data.days.find(d => d.day === currentDay);
      if (!dayData) return;

      // Preload all audio for current day immediately into memory for instant tap playback
      preloadCurrentDayAudio(dayData);

      const phaseObj = data.phases.find(p => p.id === dayData.phase);
      const phaseBadge = document.getElementById('badgePhase');
      phaseBadge.textContent = phaseObj ? phaseObj.titleVi : `Giai đoạn ${dayData.phase}`;
      phaseBadge.className = `px-2.5 py-1 rounded-full text-xs font-black border ${
        dayData.phase === 1 
          ? 'bg-red-500/20 text-red-400 border-red-500/30' 
          : (dayData.phase === 2 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30')
      }`;

      document.getElementById('badgeDayNum').textContent = `Day ${dayData.day} / 21`;
      document.getElementById('dayTitleText').innerHTML = `
        <span>${dayData.titleVi}</span>
        <span class="font-han text-base sm:text-lg font-bold text-amber-400 opacity-90">${dayData.titleZh}</span>
      `;
      document.getElementById('dayTargetText').innerHTML = `
        <strong>🎯 Mục tiêu hôm nay:</strong> ${dayData.targetVi}
        <br><span class="text-xs text-slate-400 italic">今日目标: ${dayData.targetZh}</span>
      `;

      renderSentences();
      renderWords();
      document.getElementById('storyTitle').textContent = dayData.story.title;
      document.getElementById('storyContent').textContent = dayData.story.content;
      renderMission();
      renderWaterStations();
      updateProgressDisplay();
    }

    function renderSentences() {
      const container = document.getElementById('sentencesContainer');
      if (!container || !window.CURRICULUM_DATA) return;
      const dayData = window.CURRICULUM_DATA.days.find(d => d.day === currentDay);
      if (!dayData) return;
      container.innerHTML = '';

      dayData.sentences.forEach((s, idx) => {
        const isMastered = isSentenceMastered(s.id);
        const card = document.createElement('div');
        card.className = `rounded-2xl border transition-all duration-200 overflow-hidden ${
          isMastered ? 'bg-slate-900/60 border-emerald-500/40 shadow-sm' : 'bg-slate-900 border-slate-800 hover:border-slate-700 shadow-md'
        }`;

        card.innerHTML = `
          <div class="p-3.5 sm:p-5 flex flex-col gap-3">
            <!-- Header bar: sentence index & actions (guarantees zero squeezed text on 360px-430px screens) -->
            <div class="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-slate-300 shrink-0">
                  ${idx + 1}
                </span>
                <span class="text-xs font-bold text-amber-400 truncate">Khẩu Quyết #${idx + 1}</span>
              </div>

              <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button type="button" onclick="playSentenceAudio('${s.id}', '${s.audioText || s.zh}', this)" class="px-2 sm:px-2.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 flex items-center gap-1 font-bold text-[11px] sm:text-xs transition active:scale-95" title="Nghe phát âm chuẩn phòng thu">
                  <span>🔊</span>
                  <span>Nghe</span>
                </button>
                <button type="button" onclick="practiceSentenceVoice('${s.id}', '${s.audioText || s.zh}', this)" class="px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-bold text-[11px] sm:text-xs transition active:scale-95" title="Luyện nói khẩu quyết">
                  <span>🎙️</span>
                  <span>Nói</span>
                </button>
                <button type="button" onclick="toggleSentenceMastered('${s.id}')" class="px-2 sm:px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition flex items-center gap-1 ${
                  isMastered ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }">
                  <span>${isMastered ? '✓ Đã thuộc' : '○ Thuộc?'}</span>
                </button>
              </div>
            </div>

            <!-- Chinese Sentence Tap-to-Speak Target -->
            <div class="cursor-pointer active:scale-[0.99] transition select-none group p-1 -m-1 rounded-xl hover:bg-slate-950/40" onclick="playSentenceAudio('${s.id}', '${s.audioText || s.zh}', this)">
              <div class="font-han font-black text-2xl sm:text-3xl text-white tracking-wide group-hover:text-amber-400 transition leading-snug break-words">
                ${s.zh}
              </div>
              <div class="flex items-center gap-2 flex-wrap mt-1.5">
                <span class="text-xs sm:text-sm font-mono text-amber-300 font-bold">${s.pinyin}</span>
                <span class="px-2 py-0.5 rounded text-[11px] sm:text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">🗣️ ${s.viBoi}</span>
              </div>
              <div class="text-sm font-semibold text-slate-200 mt-1.5 flex items-center gap-1.5 flex-wrap">
                <span>💡 ${s.viMeaning}</span>
                <span class="text-xs text-slate-400 font-normal">(${s.hanViet})</span>
              </div>
            </div>

            <div class="bg-red-950/30 border border-red-900/30 rounded-xl p-3 text-xs leading-relaxed text-red-200/90 flex items-start gap-2.5">
              <span class="text-base shrink-0 mt-0.5">🔥</span>
              <div><strong class="text-red-300">Mẹo Nhớ Tà Đạo 18+:</strong><span> ${s.spicyHook}</span></div>
            </div>

            <div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 text-xs leading-relaxed text-slate-300 flex items-start gap-2.5">
              <span class="text-base shrink-0 mt-0.5">🧠</span>
              <div><strong class="text-amber-300">Tâm Lý Chiến & Khi Nào Tung Chiêu:</strong><span> ${s.bossTactic}</span></div>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    }

    function renderWords() {
      const container = document.getElementById('wordsGridContainer');
      if (!container || !window.CURRICULUM_DATA) return;
      const dayData = window.CURRICULUM_DATA.days.find(d => d.day === currentDay);
      if (!dayData) return;
      container.innerHTML = '';

      dayData.words.forEach(w => {
        const item = document.createElement('div');
        item.className = 'cursor-pointer active:scale-[0.98] transition select-none bg-slate-950 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/80 rounded-2xl p-3 sm:p-3.5 flex items-start justify-between gap-3 shadow-sm group';
        item.onclick = () => {
          speakWordTriple(w.zh, item, w.id);
        };
        item.innerHTML = `
          <div class="flex-1 min-w-0">
            <div class="flex items-baseline gap-2 flex-wrap">
              <span class="font-han font-black text-lg sm:text-xl text-white group-hover:text-amber-400 transition">${w.zh}</span>
              <span class="text-xs font-mono text-amber-300">${w.pinyin}</span>
              <span class="text-xs font-bold text-emerald-400">[${w.viBoi}]</span>
            </div>
            <div class="text-xs sm:text-sm text-slate-200 font-medium mt-1">${w.viMeaning} <span class="text-[11px] text-slate-400">(${w.hanViet})</span></div>
            <div class="text-[11px] text-slate-400 font-mono mt-1.5 bg-slate-900/90 px-2 py-1 rounded-lg border border-slate-800/80 break-words">👉 ${w.example}</div>
          </div>
          <button type="button" aria-label="Nghe âm" class="w-9 h-9 rounded-xl bg-slate-900 group-hover:bg-amber-500/20 border border-slate-800 group-hover:border-amber-500/40 text-slate-400 group-hover:text-amber-400 flex items-center justify-center text-sm shrink-0 transition">🔊</button>
        `;
        container.appendChild(item);
      });
    }

    function renderMission() {
      const dayData = window.CURRICULUM_DATA.days.find(d => d.day === currentDay);
      if (!dayData) return;
      const isDone = isMissionCompleted(currentDay);
      document.getElementById('missionText').innerHTML = `
        ${dayData.mission.taskVi}
        <br><span class="text-xs text-slate-400 italic">今日任务: ${dayData.mission.taskZh}</span>
      `;
      const btn = document.getElementById('btnCompleteMission');
      const label = document.getElementById('missionBtnLabel');
      if (isDone) {
        btn.className = 'px-4 py-2 rounded-xl bg-emerald-800 text-emerald-200 font-bold text-xs shrink-0 border border-emerald-600 transition flex items-center gap-1.5';
        label.textContent = '✅ Đã Hoàn Thành Nhiệm Vụ Hôm Nay!';
      } else {
        btn.className = 'px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 shadow-lg transition flex items-center gap-1.5';
        label.textContent = '🏆 Xác Nhận Đã Dùng Hôm Nay!';
      }
    }

    function updateProgressDisplay() {
      const dayData = window.CURRICULUM_DATA.days.find(d => d.day === currentDay);
      if (!dayData) return;
      let count = 0;
      dayData.sentences.forEach(s => {
        if (isSentenceMastered(s.id)) count++;
      });
      document.getElementById('dayMasteryCount').textContent = `${count}/5 câu đã thuộc`;
    }

    // Slot Machine Engine
    function initSentenceBuilder() {
      const frameworks = window.CURRICULUM_DATA.frameworks;
      const frameSelect = document.getElementById('frameworkSelect');
      const wordSelect = document.getElementById('slotWordSelect');
      if (!frameSelect || !frameworks) return;

      frameSelect.innerHTML = '';
      frameworks.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = `${f.titleVi} (${f.formula})`;
        frameSelect.appendChild(opt);
      });

      function updateSlotWords() {
        const curFrameId = frameSelect.value;
        const curFrame = frameworks.find(f => f.id === curFrameId);
        if (!curFrame) return;

        wordSelect.innerHTML = '';
        curFrame.slots.forEach((s, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          if (s.zh) {
            opt.textContent = `${s.zh} [${s.viBoi}] - ${s.vi}`;
          } else {
            opt.textContent = `${s.causeZh} -> ${s.resZh} (${s.causeVi} -> ${s.resVi})`;
          }
          wordSelect.appendChild(opt);
        });
        updateSlotSentence();
      }

      function updateSlotSentence() {
        const curFrameId = frameSelect.value;
        const curFrame = frameworks.find(f => f.id === curFrameId);
        if (!curFrame) return;
        const slotIdx = parseInt(wordSelect.value) || 0;
        const slot = curFrame.slots[slotIdx] || curFrame.slots[0];

        let fullZh = '', fullPinyin = '', fullBoi = '', fullVi = '';
        if (curFrame.id === 'frame_1') {
          fullZh = `我想${slot.zh}`; fullPinyin = `wǒ xiǎng ${slot.pinyin}`; fullBoi = `Ủa xưởng ${slot.viBoi}`; fullVi = `Tôi muốn ${slot.vi}`;
        } else if (curFrame.id === 'frame_2') {
          fullZh = `有没有${slot.zh}？`; fullPinyin = `yǒu méiyǒu ${slot.pinyin}?`; fullBoi = `Dẩu mấy dẩu ${slot.viBoi}?`; fullVi = `Có ${slot.vi} không?`;
        } else if (curFrame.id === 'frame_3') {
          fullZh = `这个多少${slot.zh}？`; fullPinyin = `zhè ge duōshao ${slot.pinyin}?`; fullBoi = `Chưa cưa tua sao ${slot.viBoi}?`; fullVi = `Cái này bao nhiêu ${slot.vi}?`;
        } else if (curFrame.id === 'frame_4') {
          fullZh = `因为${slot.causeZh}，所以${slot.resZh}`; fullPinyin = `yīnwèi ..., suǒyǐ ...`; fullBoi = `Dân uây ..., sủa ỷ ...`; fullVi = `Bởi vì ${slot.causeVi}, cho nên ${slot.resVi}`;
        } else if (curFrame.id === 'frame_5') {
          fullZh = `请帮我${slot.zh}`; fullPinyin = `qǐng bāng wǒ ${slot.pinyin}`; fullBoi = `Chỉnh bang ủa ${slot.viBoi}`; fullVi = `Xin giúp tôi ${slot.vi}`;
        }

        document.getElementById('slotResultZh').textContent = fullZh;
        document.getElementById('slotResultPinyin').textContent = fullPinyin;
        document.getElementById('slotResultBoi').textContent = `🗣️ [${fullBoi}]`;
        document.getElementById('slotResultVi').textContent = `"${fullVi}"`;
        const slotAudioId = `slot_${curFrame.id}_${slotIdx}`;
        preloadAudioClip(fullZh, slotAudioId);
        document.getElementById('btnPlaySlotAudio').onclick = () => {
          stopAllAudioPlayback();
          playSingleAudio(fullZh, 0.9, null, slotAudioId);
        };
        document.getElementById('btnCopySlot').onclick = () => {
          copyToClipboard(`${fullZh} (${fullBoi}) - ${fullVi}`, 'Đã sao chép câu vào bộ nhớ tạm!');
        };
      }

      frameSelect.onchange = updateSlotWords;
      wordSelect.onchange = updateSlotSentence;
      document.getElementById('btnRandomSlot').onclick = () => {
        frameSelect.selectedIndex = Math.floor(Math.random() * frameworks.length);
        updateSlotWords();
        wordSelect.selectedIndex = Math.floor(Math.random() * wordSelect.options.length);
        updateSlotSentence();
      };
      updateSlotWords();
    }

    function renderBossPhrases() {
      const bossContainer = document.getElementById('bossPhrasesContainer');
      const data = window.CURRICULUM_DATA;
      if (!bossContainer || !data.bossCatchphrases) return;
      bossContainer.innerHTML = '';
      data.bossCatchphrases.forEach(b => {
        const item = document.createElement('div');
        item.className = 'bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs';
        item.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-han font-black text-red-400 text-sm hover:underline cursor-pointer" onclick="speakText('${b.zh}')">${b.zh}</span>
            <span class="text-slate-400 font-mono text-[11px]">[${b.viBoi}]</span>
          </div>
          <div class="text-slate-300 mt-0.5 font-medium">${b.viMeaning}</div>
          <div class="mt-2 bg-slate-900 border border-slate-800 p-2 rounded-lg text-emerald-400 font-semibold text-[11px]">👉 <strong>Đáp trả:</strong> ${b.reaction}</div>
        `;
        bossContainer.appendChild(item);
      });
    }

    // --- Viral Share & Commission Functions ---
