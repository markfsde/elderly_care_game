// ============================================================
// scenes/intro.js — 开场视频动画
// ============================================================

const SceneIntro = {
  render() {
    UI.render(`
      <div id="intro-wrap" style="
        position:relative; width:100%; height:100vh;
        background:#000; overflow:hidden;
        display:flex; align-items:center; justify-content:center;
      ">
        <video id="intro-video"
          src="video.mp4"
          autoplay playsinline muted
          style="width:100%; height:100%; object-fit:cover; display:block;">
        </video>

        <!-- Skip 按钮 -->
        <button id="intro-skip" onclick="SceneIntro.skip()" style="
          position:absolute; bottom:28px; right:20px;
          background:rgba(0,0,0,0.45);
          border:1px solid rgba(255,255,255,0.4);
          color:#fff; font-size:13px; font-family:inherit;
          padding:7px 18px; border-radius:20px;
          cursor:pointer; letter-spacing:1px;
          backdrop-filter:blur(4px);
          transition:background 0.2s;
        ">跳过 ›</button>
      </div>
    `);

    const video = document.getElementById('intro-video');
    if (video) {
      video.addEventListener('ended', () => SceneIntro.skip());
      // 加载失败时直接跳过
      video.addEventListener('error', () => SceneIntro.skip());
    }
  },

  skip() {
    const video = document.getElementById('intro-video');
    if (video) { video.pause(); video.src = ''; }
    Game.gotoScene('start');
  },
};
