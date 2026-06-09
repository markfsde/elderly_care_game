// ============================================================
// scenes/intro.js — 开场视频（带声音）
// ============================================================

const SceneIntro = {
  render() {
    UI.render(`
      <div id="intro-wrap" style="
        position:relative; width:100%; height:100vh;
        background:#000; overflow:hidden;
        display:flex; align-items:center; justify-content:center;
      ">
        <!-- 视频（初始隐藏，点击后显示） -->
        <video id="intro-video" src="video.mp4" playsinline
          style="width:100%;height:100%;object-fit:cover;display:none;">
        </video>

        <!-- 点击开始层 -->
        <div id="intro-tap" onclick="SceneIntro.startVideo()" style="
          position:absolute;inset:0;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          background:linear-gradient(180deg,#0d1b2a 0%,#1a2a1a 100%);
          cursor:pointer;
        ">
          <div style="font-size:52px;margin-bottom:16px;animation:introPulse 2s ease-in-out infinite;">🏠</div>
          <div style="font-size:22px;font-weight:700;color:#f5c060;letter-spacing:3px;margin-bottom:6px;">银发守护者</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:2px;margin-bottom:48px;">SILVER GUARDIAN</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:2px;animation:introBlink 1.5s ease-in-out infinite;">
            点击任意处开始
          </div>
        </div>

        <!-- Skip 按钮（播放中显示） -->
        <button id="intro-skip" onclick="SceneIntro.skip()" style="
          position:absolute;bottom:28px;right:20px;
          background:rgba(0,0,0,0.45);
          border:1px solid rgba(255,255,255,0.4);
          color:#fff;font-size:13px;font-family:inherit;
          padding:7px 18px;border-radius:20px;
          cursor:pointer;letter-spacing:1px;
          backdrop-filter:blur(4px);
          display:none;
        ">跳过 ›</button>
      </div>

      <style>
        @keyframes introPulse {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-10px);}
        }
        @keyframes introBlink {
          0%,100%{opacity:.4;} 50%{opacity:1;}
        }
      </style>
    `);
  },

  startVideo() {
    const tap   = document.getElementById('intro-tap');
    const video = document.getElementById('intro-video');
    const skip  = document.getElementById('intro-skip');
    if (!video) return;

    if (tap) tap.style.display = 'none';
    video.style.display = 'block';
    if (skip) skip.style.display = 'block';

    video.play().catch(() => SceneIntro.skip());
    video.addEventListener('ended', () => SceneIntro.skip());
    video.addEventListener('error', () => SceneIntro.skip());
  },

  skip() {
    const video = document.getElementById('intro-video');
    if (video) { video.pause(); video.src = ''; }
    if (typeof GameAudio !== 'undefined') GameAudio.startBGM();
    Game.gotoScene('start');
  },
};
