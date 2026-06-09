// ============================================================
// audio.js — 背景音乐 + 音效（Web Audio API，无需外部文件）
// ============================================================

const GameAudio = (() => {
  let ctx = null;
  let masterGain = null;
  let bgmGain = null;
  let sfxGain = null;
  let bgmRunning = false;
  let bgmScheduler = null;
  let muted = false;

  // 用户首次交互后初始化
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = ctx.createGain();
    masterGain.gain.value = 0.7;
    masterGain.connect(ctx.destination);

    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0.22;
    bgmGain.connect(masterGain);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.5;
    sfxGain.connect(masterGain);
  }

  // ---------- 工具：生成单个音符 ----------
  function playNote(freq, startTime, duration, gainNode, type = 'sine', vol = 1) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.connect(g);
    g.connect(gainNode);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // ---------- 背景音乐：温暖的民谣风琶音 ----------
  // C大调五声音阶：C4 D4 E4 G4 A4 C5
  const PENTATONIC = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  // 低音和弦根音
  const BASS_NOTES = [130.81, 146.83, 164.81, 196.00]; // C3 D3 E3 G3

  function scheduleBGM() {
    if (!bgmRunning || muted) return;
    const now = ctx.currentTime;
    const beat = 0.45; // 每拍时长（s）
    const barLen = beat * 8;

    // 一段8拍的旋律模式
    const melody = [0, 2, 4, 5, 4, 2, 0, 2];
    for (let i = 0; i < melody.length; i++) {
      const freq = PENTATONIC[melody[i]];
      playNote(freq, now + i * beat, beat * 1.1, bgmGain, 'triangle', 0.8);
    }
    // 高八度装饰音（第3、7拍）
    playNote(PENTATONIC[4] * 2, now + 2 * beat, beat * 0.6, bgmGain, 'sine', 0.4);
    playNote(PENTATONIC[2] * 2, now + 6 * beat, beat * 0.6, bgmGain, 'sine', 0.35);

    // 低音伴奏（每2拍一个）
    for (let i = 0; i < 4; i++) {
      playNote(BASS_NOTES[i], now + i * 2 * beat, beat * 1.8, bgmGain, 'sine', 0.6);
    }

    // 下一段
    bgmScheduler = setTimeout(scheduleBGM, (barLen - 0.1) * 1000);
  }

  function startBGM() {
    if (bgmRunning) return;
    bgmRunning = true;
    scheduleBGM();
  }

  function stopBGM() {
    bgmRunning = false;
    if (bgmScheduler) clearTimeout(bgmScheduler);
  }

  // ---------- 音效 ----------
  const SFX = {
    // 按钮点击：短促清脆
    click() {
      if (!ctx || muted) return;
      playNote(880, ctx.currentTime, 0.08, sfxGain, 'square', 0.6);
      playNote(1100, ctx.currentTime + 0.04, 0.06, sfxGain, 'square', 0.3);
    },
    // 成功/奖励：上行三音
    success() {
      if (!ctx || muted) return;
      const t = ctx.currentTime;
      playNote(523.25, t,        0.15, sfxGain, 'triangle', 0.7);
      playNote(659.25, t + 0.12, 0.15, sfxGain, 'triangle', 0.7);
      playNote(783.99, t + 0.24, 0.25, sfxGain, 'triangle', 0.8);
    },
    // 失败/警告：下行两音
    fail() {
      if (!ctx || muted) return;
      const t = ctx.currentTime;
      playNote(440, t,        0.18, sfxGain, 'sawtooth', 0.5);
      playNote(330, t + 0.15, 0.25, sfxGain, 'sawtooth', 0.45);
    },
    // 翻牌/选中
    select() {
      if (!ctx || muted) return;
      playNote(660, ctx.currentTime, 0.1, sfxGain, 'sine', 0.5);
    },
    // 场景切换：柔和过渡音
    scene() {
      if (!ctx || muted) return;
      const t = ctx.currentTime;
      [392, 440, 523].forEach((f, i) =>
        playNote(f, t + i * 0.08, 0.2, sfxGain, 'sine', 0.35)
      );
    },
    // 获得道具
    item() {
      if (!ctx || muted) return;
      const t = ctx.currentTime;
      playNote(659, t,       0.1, sfxGain, 'triangle', 0.6);
      playNote(880, t + 0.1, 0.1, sfxGain, 'triangle', 0.5);
      playNote(1046, t + 0.2, 0.18, sfxGain, 'triangle', 0.6);
    },
  };

  // ---------- 静音切换 ----------
  function toggleMute() {
    if (!ctx) return;
    muted = !muted;
    masterGain.gain.value = muted ? 0 : 0.7;
    return muted;
  }

  // ---------- 首次交互监听 ----------
  function onFirstInteraction() {
    init();
    if (ctx.state === 'suspended') ctx.resume();
    startBGM();
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction);
  document.addEventListener('touchstart', onFirstInteraction);

  return { init, startBGM, stopBGM, sfx: SFX, toggleMute, isMuted: () => muted };
})();
