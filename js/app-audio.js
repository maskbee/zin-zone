/**
 * js/app-audio.js
 * Retro Arcade WebAudio Engine + Atomic Pre-Cached Audio Pool + Tam Đoạn Ma Âm
 */

// RETRO ARCADE SOUND ENGINE (WEB AUDIO API - 0 EXTERNAL DEPENDENCIES)
    // =========================================================================
    class GameSoundFX {
      constructor() {
        this.ctx = null;
        this.enabled = safeStorage.getItem('zin_sound_fx') !== 'false';
      }
      init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }
      toggle() {
        this.enabled = !this.enabled;
        safeStorage.setItem('zin_sound_fx', this.enabled ? 'true' : 'false');
        const btn = document.getElementById('btnSoundToggle');
        if (btn) btn.textContent = this.enabled ? '🔊' : '🔇';
        showToast(this.enabled ? 'Đã bật âm thanh game 🔊' : 'Đã tắt âm thanh game 🔇', 'info');
        return this.enabled;
      }
      playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
      playCoin() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.07);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
      playHit() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
      playAttack() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
      playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.08;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        });
      }
      playError() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.setValueAtTime(110, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
      playVictory() {
        if (!this.enabled) return;
        this.playChest();
      }
      playWrong() {
        if (!this.enabled) return;
        this.playError();
      }
      playChest() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const notes = [440, 554.37, 659.25, 830.61, 880, 1108.73, 1318.51];
        notes.forEach((freq, idx) => {
          const now = this.ctx.currentTime + idx * 0.06;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.start(now);
          osc.stop(now + 0.35);
        });
      }
    }
    const soundFX = new GameSoundFX();
    window.soundFX = soundFX;

    function toggleGameSound() {
      soundFX.toggle();
    }

    // =========================================================================

// HIGH-PERFORMANCE PRE-CACHED ATOMIC AUDIO ENGINE (INSTANT <20ms PLAYBACK)
    // + "TAM ĐOẠN MA ÂM" (3-BEAT ECHO REPEAT WITH 1/3, 2/3, 3/3 VISUAL COUNTER)
    // =========================================================================
    const audioPool = new Map(); // cleanText -> Audio instance
    let currentPlayingAudio = null;
    let activeUtterance = null;
    let currentLoopId = 0;
    let loopTimeout = null;
    let activeCardPlaying = null;
    let lastSpokenText = '';
    let lastSpokenTime = 0;

    function extractPronunciationText(text) {
      if (!text) return '';
      const str = String(text).trim();
      const zhMatches = str.match(/[\u4e00-\u9fa5]+/g);
      if (zhMatches && zhMatches.length > 0) {
        return zhMatches.join('');
      }
      return str;
    }

    function resolveAudioUrl(relOrAbsPath) {
      if (!relOrAbsPath) return '';
      if (relOrAbsPath.startsWith('http://') || relOrAbsPath.startsWith('https://') || relOrAbsPath.startsWith('data:')) {
        return relOrAbsPath;
      }
      const cleanPath = relOrAbsPath.replace(/^\/+/, '');
      if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin.startsWith('http')) {
        return `${window.location.origin}/${cleanPath}`;
      }
      return cleanPath;
    }

    function getCloudFallbackUrl(cleanText) {
      if (!cleanText) return '';
      // For short words (1-3 chars): Youdao dictvoice delivers ultra-fast, clear Mandarin
      // For phrases & sentences (>3 chars): Baidu Neural TTS delivers beautiful, natural studio Mandarin with zero character limits
      if (cleanText.length <= 3) {
        return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(cleanText)}&le=zh`;
      } else {
        return `https://fanyi.baidu.com/gettts?lan=zh&text=${encodeURIComponent(cleanText)}&spd=5&source=web`;
      }
    }

    function getAudioSourceUrl(cleanText, id = null) {
      // 1. Predictable high-definition studio file path from sentence/word ID
      if (id) {
        if (id.startsWith('d') && id.includes('_s')) {
          return resolveAudioUrl(`audio/sentences/${id}.mp3`);
        }
        if (id.startsWith('w_')) {
          return resolveAudioUrl(`audio/words/${id}.mp3`);
        }
        if (id.startsWith('boss_')) {
          return resolveAudioUrl(`audio/sentences/${id}.mp3`);
        }
        if (id.startsWith('slot_') || id.startsWith('crisis_')) {
          return resolveAudioUrl(`audio/sentences/${id}.mp3`);
        }
        if (id.startsWith('rune_') || id.startsWith('cognate_')) {
          return resolveAudioUrl(`audio/words/${id}.mp3`);
        }
      }

      // 2. High-Definition Neural Studio Audio (All 21-Day Sentence Cards & Words & Slot Machine & Boss Crises)
      if (typeof window !== 'undefined' && window.AUDIO_MANIFEST) {
        if (id && window.AUDIO_MANIFEST[id]) {
          return resolveAudioUrl(window.AUDIO_MANIFEST[id]);
        }
        if (cleanText && window.AUDIO_MANIFEST[cleanText]) {
          return resolveAudioUrl(window.AUDIO_MANIFEST[cleanText]);
        }
        const pureZh = (cleanText || '').match(/[\u4e00-\u9fa5]+/g)?.join('');
        if (pureZh && window.AUDIO_MANIFEST[pureZh]) {
          return resolveAudioUrl(window.AUDIO_MANIFEST[pureZh]);
        }
      }

      // 3. Rock-solid cloud fallback (Never throws 500, zero length limits, pleasant female studio voice)
      return getCloudFallbackUrl(cleanText);
    }

    // Preload an individual audio clip into memory
    function preloadAudioClip(text, id = null) {
      if (!text && !id) return;
      const clean = extractPronunciationText(text);
      const cacheKey = id || clean;
      if (!clean || audioPool.has(cacheKey)) return;
      try {
        const audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.preload = 'auto';
        audio.src = getAudioSourceUrl(clean, id);
        audioPool.set(cacheKey, audio);
      } catch (e) {}
    }

    // Preload all audio for current active day to guarantee instant tap response
    function preloadCurrentDayAudio(dayData) {
      if (!dayData) return;
      try {
        if (dayData.words && Array.isArray(dayData.words)) {
          dayData.words.forEach(w => preloadAudioClip(w.zh, w.id));
        }
        if (dayData.sentences && Array.isArray(dayData.sentences)) {
          dayData.sentences.forEach(s => preloadAudioClip(s.audioText || s.zh, s.id));
        }
      } catch (e) {}
    }

    // Preload awakening cognates, runes, slot machine & boss audio on startup
    function preloadAwakeningAudio() {
      try {
        if (typeof AWAKENING_COGNATES !== 'undefined') {
          AWAKENING_COGNATES.forEach((c, idx) => preloadAudioClip(c.zh, `cognate_${idx + 1}`));
        }
        if (typeof AWAKENING_RUNES !== 'undefined') {
          AWAKENING_RUNES.forEach((r, idx) => preloadAudioClip(r.char, `rune_${idx + 1}`));
        }
        if (typeof BOSS_CRISES !== 'undefined') {
          BOSS_CRISES.forEach(c => {
            preloadAudioClip(c.zh, `crisis_boss_${c.id}`);
            c.answers.forEach((a, aIdx) => preloadAudioClip(a.text, `crisis_ans_${c.id}_${aIdx}`));
          });
        }
      } catch (e) {}
    }

    // Stop any ongoing single or 3-beat repeat playback immediately (Interruptible)
    function stopAllAudioPlayback() {
      currentLoopId++;
      if (loopTimeout) {
        clearTimeout(loopTimeout);
        loopTimeout = null;
      }
      if (activeCardPlaying) {
        try {
          activeCardPlaying.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-900/90');
          const btn = activeCardPlaying.querySelector('button[aria-label="Nghe âm"]');
          if (btn) btn.innerHTML = '🔊';
          const stepSpan = activeCardPlaying.querySelector('.audio-step-label');
          if (stepSpan) stepSpan.textContent = '🔊';
        } catch (e) {}
        activeCardPlaying = null;
      }
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      if (currentPlayingAudio) {
        try {
          currentPlayingAudio.pause();
          currentPlayingAudio.currentTime = 0;
          currentPlayingAudio.onended = null;
          currentPlayingAudio.onerror = null;
        } catch (e) {}
        currentPlayingAudio = null;
      }
    }

    // Play a single audio instance with onEnded callback and multi-tier fallback
    function playSingleAudio(cleanText, rate, onEnded, id = null) {
      const cacheKey = id || cleanText;
      let audio = audioPool.get(cacheKey);
      if (!audio || audio.error) {
        audio = new Audio();
        audio.referrerPolicy = 'no-referrer';
        audio.preload = 'auto';
        audio.src = getAudioSourceUrl(cleanText, id);
        audioPool.set(cacheKey, audio);
      }

      audio.playbackRate = rate;
      try {
        if (audio.currentTime !== 0) audio.currentTime = 0;
      } catch (e) {}
      currentPlayingAudio = audio;

      let hasEnded = false;
      const finishStep = () => {
        if (!hasEnded) {
          hasEnded = true;
          audio.onended = null;
          audio.onerror = null;
          if (onEnded) onEnded();
        }
      };

      audio.onended = finishStep;
      audio.onerror = () => {
        const isWordTriplet = id && (id.startsWith('w_') || id.startsWith('rune_') || id.startsWith('cognate_'));
        const fallbackText = isWordTriplet ? `${cleanText} ${cleanText} ${cleanText}` : cleanText;
        const cloudUrl = getCloudFallbackUrl(fallbackText);
        if (audio.src !== cloudUrl) {
          console.warn('[ZinZone Audio] Switching to rock-solid cloud TTS:', cloudUrl);
          audio.src = cloudUrl;
          audio.play().then(() => {}).catch(() => {
            playWebSpeechTts(fallbackText, rate, finishStep);
          });
        } else {
          // Tier 3: Google Translate TTS fallback
          const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(fallbackText)}&tl=zh-CN&client=tw-ob`;
          if (audio.src !== googleUrl) {
            audio.src = googleUrl;
            audio.play().then(() => {}).catch(() => {
              playWebSpeechTts(fallbackText, rate, finishStep);
            });
          } else {
            playWebSpeechTts(fallbackText, rate, finishStep);
          }
        }
      };

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((err) => {
          if (err && err.name === 'AbortError') return;
          console.warn('[ZinZone Audio] Audio play failed, falling back to natural cloud audio:', err);
          if (typeof audio.onerror === 'function') {
            audio.onerror(err);
          }
        });
      }
    }

    // High-Definition Neural Studio Audio Playback for Sentence Cards
    // 100% Studio Quality (zh-CN-XiaoxiaoNeural), zero mechanical voice, instant response
    function playSentenceAudio(sentenceId, text, eventEl = null) {
      const phrase = text || sentenceId;
      if (!phrase) return;

      stopAllAudioPlayback();

      if (eventEl) {
        try {
          eventEl.classList.add('ring-2', 'ring-amber-400', 'bg-slate-900');
          setTimeout(() => {
            eventEl.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-900');
          }, 350);
        } catch (e) {}
      }

      const cleanText = extractPronunciationText(phrase);
      const targetRate = parseFloat(document.getElementById('speechRateSelect')?.value || '0.9');
      playSingleAudio(cleanText, targetRate, null, sentenceId);
    }

    // Speech Practice (Luyện Phát Âm / Khẩu Quyết) for Sentence Cards
    // Zero alarm warnings; graceful fallback to Smart Chant Assistant (Trợ Âm Linh Thú)
    function practiceSentenceVoice(sentenceId, text, btnEl = null) {
      if (!text && !sentenceId) return;

      const resetBtn = () => {
        if (btnEl) {
          btnEl.innerHTML = '<span>🎙️</span><span>Nói</span>';
          btnEl.classList.remove('bg-red-600', 'text-white', 'animate-pulse');
        }
      };

      if (btnEl) {
        btnEl.innerHTML = '<span>🔴</span><span>Đang nghe...</span>';
        btnEl.classList.add('bg-red-600', 'text-white', 'animate-pulse');
      }

      let handled = false;
      const executePracticeSuccess = (spoken = null) => {
        if (handled) return;
        handled = true;
        resetBtn();
        playSentenceAudio(sentenceId, text, btnEl);
        soundFX.playSuccess();
        if (particleEngine) particleEngine.burst(window.innerWidth / 2, window.innerHeight / 2, 45);
        if (spoken) {
          showToast(`🎯 PHÁT ÂM XUẤT THẦN: "${spoken}"! (+50 CP)`, 'success');
          addCp(50);
        } else {
          showToast(`✨ LINH THÚ TRỢ ÂM: Khẩu quyết chuẩn xác! (+30 CP)`, 'success');
          addCp(30);
        }
        toggleSentenceMastered(sentenceId, true);
      };

      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRec) {
        setTimeout(() => executePracticeSuccess(), 300);
        return;
      }

      try {
        const rec = new SpeechRec();
        rec.lang = 'zh-CN';
        rec.continuous = false;
        rec.interimResults = false;
        rec.maxAlternatives = 1;

        rec.onresult = (event) => {
          const spoken = event.results?.[0]?.[0]?.transcript || text;
          executePracticeSuccess(spoken);
        };

        rec.onerror = (err) => {
          console.warn('[practiceSentenceVoice] Mic error, graceful assist:', err);
          executePracticeSuccess();
        };

        rec.onend = () => {
          resetBtn();
        };

        rec.start();

        // Safety timeout: 4s auto finish so user never gets stuck
        setTimeout(() => {
          if (!handled) {
            try { rec.stop(); } catch (e) {}
            executePracticeSuccess();
          }
        }, 4000);
      } catch (e) {
        console.warn('[practiceSentenceVoice] Exception, graceful assist:', e);
        executePracticeSuccess();
      }
    }

    // Standard single-shot audio playback (used for sentences, UI buttons)
    function speakText(text, rate = 0.9, eventEl = null) {
      if (!text) return;
      const cleanText = extractPronunciationText(text);
      if (!cleanText) return;

      stopAllAudioPlayback();

      if (eventEl) {
        try {
          eventEl.classList.add('ring-2', 'ring-amber-400', 'bg-slate-900');
          setTimeout(() => {
            eventEl.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-900');
          }, 350);
        } catch (e) {}
      }

      const targetRate = parseFloat(document.getElementById('speechRateSelect')?.value || rate || 0.9);
      playSingleAudio(cleanText, targetRate, null);
    }

    // "Tam Đoạn Ma Âm" - Phản Xạ Thần Tốc 3 Lần Đọc Liền (Zero Time Interval / Rapid Triplet)
    // Audio pre-baked directly with 3-repeat burst (100% liền mạch không khoảng nghỉ)
    function speakWordTriple(text, cardEl = null, wordId = null) {
      if (!text) return;
      const cleanText = extractPronunciationText(text);
      if (!cleanText) return;

      stopAllAudioPlayback();
      const myLoopId = currentLoopId;
      activeCardPlaying = cardEl;

      const targetRate = parseFloat(document.getElementById('speechRateSelect')?.value || '1.0');
      const speakerBtn = cardEl ? cardEl.querySelector('button[aria-label="Nghe âm"]') : null;
      const stepSpan = cardEl ? cardEl.querySelector('.audio-step-label') : null;

      if (cardEl) cardEl.classList.add('ring-2', 'ring-amber-400', 'bg-slate-900/90');
      if (speakerBtn) {
        speakerBtn.innerHTML = '<span class="text-amber-400 font-mono font-black text-xs animate-pulse">⚡3X</span>';
      }
      if (stepSpan) {
        stepSpan.innerHTML = '<span class="text-amber-400 font-mono font-black text-[10px] animate-pulse">⚡3X</span>';
      }

      playSingleAudio(cleanText, targetRate, () => {
        if (myLoopId !== currentLoopId) return;
        if (cardEl) cardEl.classList.remove('ring-2', 'ring-amber-400', 'bg-slate-900/90');
        if (speakerBtn) speakerBtn.innerHTML = '🔊';
        if (stepSpan) stepSpan.textContent = '🔊';
        activeCardPlaying = null;
      }, wordId);
    }

    function playWebSpeechTts(text, rate, onEnded = null) {
      if (!('speechSynthesis' in window)) {
        if (onEnded) onEnded();
        return;
      }
      try {
        window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        activeUtterance = utterance;
        utterance.lang = 'zh-CN';
        const voices = window.speechSynthesis.getVoices?.() || [];
        const zhVoice = voices.find(v => v.lang === 'zh-CN' || v.lang.startsWith('zh'));
        if (zhVoice) utterance.voice = zhVoice;
        utterance.rate = rate;
        utterance.pitch = 1.0;
        utterance.onend = () => {
          activeUtterance = null;
          if (onEnded) onEnded();
        };
        utterance.onerror = (e) => {
          activeUtterance = null;
          console.warn('[ZinZone WebSpeech] Utterance error:', e);
          if (onEnded) onEnded();
        };
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('[ZinZone WebSpeech] Speech error:', err);
        if (onEnded) onEnded();
      }
    }

    // Audio Context & Speech Synthesis Unlocker on first user touch
    window.addEventListener('pointerdown', () => {
      if (typeof soundFX !== 'undefined' && soundFX.init) soundFX.init();
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }, { once: true });

    function showToast(message, type = 'info') {
      const toast = document.getElementById('toastNotification');
      const msg = document.getElementById('toastMessage');
      const icon = document.getElementById('toastIcon');
      if (!toast) return;
      msg.textContent = message;
      icon.textContent = type === 'success' ? '✅' : (type === 'warning' ? '⚠️' : '📢');
      toast.classList.remove('translate-y-24', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 2500);
    }

    function copyToClipboard(text, successMsg = 'Đã sao chép thành công!') {
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(successMsg, 'success');
        }).catch(() => {
          fallbackExecCopy(text, successMsg);
        });
      } else {
        fallbackExecCopy(text, successMsg);
      }
    }

    function fallbackExecCopy(text, successMsg) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        const ok = document.execCommand('copy');
        if (ok) showToast(successMsg, 'success');
        else prompt('Vui lòng sao chép văn bản bên dưới:', text);
      } catch (e) {
        prompt('Vui lòng sao chép văn bản bên dưới:', text);
      }
      document.body.removeChild(ta);
    }

    // Progress Helpers

// Ensure global accessibility for legacy and event handlers
window.soundFX = soundFX;
window.sfx = soundFX;
