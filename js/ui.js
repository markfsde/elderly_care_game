// ============================================================
// ui.js — UI 工具函数
// ============================================================

const UI = {
  scene: null,
  toastTimer: null,

  init() {
    this.scene = document.getElementById('scene');
  },

  // 渲染场景
  render(html) {
    this.scene.innerHTML = html;
    this.scene.scrollTop = 0;
  },

  // Toast 通知
  toast(msg, duration = 2200) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast show';
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => { el.className = 'toast hidden'; }, duration);
  },

  // 弹窗
  showModal(html, onClose) {
    const overlay = document.getElementById('modal-overlay');
    const modal = document.getElementById('modal');
    modal.innerHTML = html;
    overlay.className = 'modal-overlay';
    if (onClose) {
      overlay.onclick = (e) => {
        if (e.target === overlay) { this.closeModal(); onClose(); }
      };
    }
  },

  closeModal() {
    document.getElementById('modal-overlay').className = 'modal-overlay hidden';
  },

  // 渲染顶部状态栏
  statusBar() {
    const s = State.get();
    const { week, phase, ap, stats } = s;
    const phaseLabel = phase === 'weekday' ? '周中' : '周末';
    const phaseClass = phase === 'weekday' ? 'weekday' : 'weekend';

    const apDots = Array.from({length: GameData.WEEKEND_AP}, (_, i) =>
      `<div class="ap-dot ${i < ap ? 'active' : ''}"></div>`
    ).join('');

    const weekDots = Array.from({length: GameData.TOTAL_WEEKS}, (_, i) => {
      let cls = '';
      if (i + 1 < week) cls = 'done';
      else if (i + 1 === week) cls = 'current';
      return `<div class="week-dot ${cls}"></div>`;
    }).join('');

    const apRow = phase === 'weekend'
      ? `<div class="ap-row"><span class="ap-label">⚡ 行动点</span>${apDots}</div>` : '';

    return `
      <div class="status-bar">
        <div class="week-label">第 ${week} 周 / 共 ${GameData.TOTAL_WEEKS} 周</div>
        <div class="week-info">
          <span class="week-title">${s.elder.name}的暑假</span>
          <span class="phase-badge ${phaseClass}">${phaseLabel}</span>
        </div>
        <div class="stats-grid">
          <div class="stat-row">
            <span class="stat-icon">📱</span>
            <span class="stat-label">数字能力</span>
            <div class="stat-bar-bg"><div class="stat-bar-fill digital" style="width:${stats.digital}%"></div></div>
            <span class="stat-val">${stats.digital}</span>
          </div>
          <div class="stat-row">
            <span class="stat-icon">❤️</span>
            <span class="stat-label">健康幸福</span>
            <div class="stat-bar-bg"><div class="stat-bar-fill health" style="width:${stats.health}%"></div></div>
            <span class="stat-val">${stats.health}</span>
          </div>
          <div class="stat-row">
            <span class="stat-icon">👥</span>
            <span class="stat-label">社交活跃</span>
            <div class="stat-bar-bg"><div class="stat-bar-fill social" style="width:${stats.social}%"></div></div>
            <span class="stat-val">${stats.social}</span>
          </div>
        </div>
        ${apRow}
      </div>
      <div class="week-progress">${weekDots}</div>
    `;
  },

  // 老人状态卡
  elderCard() {
    const { elder, stats } = State.get();
    const mood = stats.health > 60 ? 'happy' : stats.health > 35 ? 'neutral' : 'worried';
    const moods = elder.moods[mood];
    const speech = moods[Math.floor(Math.random() * moods.length)];
    const tags = elder.conditions.map(c => `<span class="tag warning">${c}</span>`).join('');

    return `
      <div class="elder-card slide-up">
        <div class="elder-avatar">${elder.avatar}</div>
        <div class="elder-info">
          <div class="elder-name">${elder.name}</div>
          <div class="elder-mood">"${speech}"</div>
          <div class="elder-tags">${tags}</div>
        </div>
      </div>
    `;
  },

  // 预算行
  budgetRow() {
    const { budget } = State.get();
    return `<div class="budget-row">💰 剩余费用 <strong>¥${budget}</strong></div>`;
  },
};
