// ============================================================
// scenes/start.js — 开始屏幕
// ============================================================

const SceneStart = {
  render() {
    const hasSave = State.hasSave();
    UI.render(`
      <div class="start-screen fade-in">
        <div class="start-logo">🏠</div>
        <div class="start-title">银发守护者</div>
        <div class="start-sub">Silver Guardian · 陪伴是最长情的告白</div>

        <div class="start-story">
          <p>暑假开始了。爷爷/奶奶独自在家，你在外地上学或工作。</p>
          <p>这个夏天，你有 <strong>8 周</strong>时间。每周中只能做 <strong>3 次行动</strong>（布置任务或网购），周末回家带着 <strong>3 点行动力</strong>深度互动。</p>
          <p>帮老人跨越数字鸿沟，找到属于银发一代的晚年价值——但真结局并不容易！</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
          <button class="btn btn-primary btn-full" onclick="SceneStart.selectElder()">
            🎮 开始游戏
          </button>
          ${hasSave ? `<button class="btn btn-ghost btn-full" onclick="Game.continueSave()">📂 继续上次游戏</button>` : ''}
        </div>

        <div style="margin-top:28px;width:100%;background:rgba(78,205,196,0.07);border:1px solid rgba(78,205,196,0.2);border-radius:10px;padding:12px 14px;">
          <div style="font-size:10px;font-weight:600;color:var(--accent3);letter-spacing:1px;margin-bottom:5px;">📌 游戏提示</div>
          <div style="font-size:11px;color:var(--text-dim);line-height:1.7;">
            · 周中每周只有 3 次行动，购物和任务共享次数<br>
            · 真结局需要数字、社交、健康三项<strong style="color:var(--text);">全部达标</strong><br>
            · 遇到随机事件，道具与属性会影响结果<br>
            · 每周末活动组合不同，尝试全部小游戏！
          </div>
        </div>

        <div style="margin-top:20px;font-size:11px;color:var(--text-dim);text-align:center;line-height:1.9;">
          包含：老年健康科普 · 适老化改造 · 防诈骗教育<br>
          适合 10 分钟碎片化体验 · 点开即玩无需安装<br>
          <a href="mailto:yuyue.23@intl.zju.edu.cn"
            style="color:var(--accent3);text-decoration:none;font-weight:500;">
            ✉️ yuyue.23@intl.zju.edu.cn
          </a>
        </div>
      </div>
    `);
  },

  selectElder() {
    const options = GameData.elders.map(e => `
      <div class="action-item" onclick="SceneStart.startGame('${e.id}')"
        style="text-align:center;padding:18px 12px;">
        <div style="font-size:44px;margin-bottom:8px;">${e.avatar}</div>
        <div style="font-size:15px;font-weight:700;margin-bottom:4px;">${e.name}</div>
        <div style="font-size:11px;color:var(--text-dim);margin-bottom:8px;">
          ${e.conditions.join(' · ')}
        </div>
        <div style="font-size:11px;display:flex;justify-content:center;gap:8px;">
          <span style="color:var(--digital);">📱${e.baseDigital}</span>
          <span style="color:var(--health);">❤️${e.baseHealth}</span>
          <span style="color:var(--social);">👥${e.baseSocial}</span>
        </div>
        <div style="margin-top:6px;font-size:10px;color:var(--accent);">
          ${e.baseDigital <= 8 ? '⭐ 新手推荐' : '难度较高'}
        </div>
      </div>
    `).join('');

    UI.showModal(`
      <div class="modal-handle"></div>
      <div class="modal-title">👴👵 选择你的老人</div>
      <div class="modal-desc">
        每位老人有不同初始属性和健康挑战。属性越低，越难达成真结局。
      </div>
      <div class="action-grid">${options}</div>
      <div class="bottom-pad"></div>
    `);
  },

  startGame(elderId) {
    UI.closeModal();
    State.init(elderId);
    Game.gotoScene('weekday');
  },
};
