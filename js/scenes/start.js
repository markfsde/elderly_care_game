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
          <p>暑假开始，爷爷/奶奶独自在家。<strong>8 周</strong>内，用远程任务与周末陪伴帮老人跨越数字鸿沟——真结局并不容易！</p>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
          <button class="btn btn-primary btn-full" onclick="SceneStart.selectElder()">
            🎮 开始游戏
          </button>
          ${hasSave ? `<button class="btn btn-ghost btn-full" onclick="Game.continueSave()">📂 继续上次游戏</button>` : ''}
        </div>

        <div class="tips-grid">
          <div class="tip-chip">📞 每周 3 次行动</div>
          <div class="tip-chip">🏠 周末 3 点行动力</div>
          <div class="tip-chip">🎲 随机事件 · 道具</div>
          <div class="tip-chip">🏆 三项全达标解锁真结局</div>
        </div>

        <div style="margin-top:16px;font-size:11px;color:var(--text-dim);text-align:center;line-height:1.9;">
          <a href="mailto:2582398576@qq.com"
            style="color:var(--accent3);text-decoration:none;font-weight:500;">
            📧 2582398576@qq.com
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
