// ============================================================
// scenes/weekend.js — 周末回家（按周轮换活动）
// ============================================================

const SceneWeekend = {
  render() {
    const s = State.get();
    const weekActivities = State.getWeekActivities();

    const activities = weekActivities.map(act => {
      const done = State.isActivityDone(act.id);
      const noAP = s.ap < act.ap && !done;
      const disabled = done || noAP;

      const effectStr = Object.entries(act.baseEffect).map(([k,v]) =>
        `<span style="font-size:10px;color:${k==='digital'?'var(--digital)':k==='health'?'var(--health)':'var(--social)'};">${v>0?'+':''}${v}</span>`
      ).join(' ');

      return `
        <div class="action-item ${disabled ? (done ? 'done' : 'disabled') : ''}"
          onclick="${disabled ? '' : `SceneWeekend.doActivity('${act.id}')`}">
          <div class="ai-cost ap">⚡${act.ap}</div>
          <div class="ai-icon">${act.icon}</div>
          <div class="ai-name">${act.name}</div>
          <div class="ai-desc">${act.desc}</div>
          <div style="margin-top:6px;display:flex;align-items:center;gap:6px;justify-content:center;">
            <span class="tag ${act.tagClass}" style="font-size:9px;">${act.tag}</span>
            ${effectStr}
          </div>
          ${done ? '<div style="color:var(--social);font-size:11px;margin-top:4px;">✓ 已完成</div>' : ''}
        </div>
      `;
    }).join('');

    UI.render(`
      ${UI.statusBar()}
      ${RoomScene.livingRoom()}

      <div class="card slide-up" style="margin-top:-12px;">
        <div class="card-title">🏠 周末回家 — 行动点 ⚡${s.ap}</div>
        <div style="font-size:12px;color:var(--text-dim);line-height:1.6;">
          每项活动消耗 1 ⚡，深度互动触发小游戏，通关有额外加成。
          本周活动组合与上周不同！
        </div>
      </div>

      <div class="section-header">🎯 本周可选互动</div>
      <div style="padding:0 16px;">
        <div class="action-grid">${activities}</div>
      </div>

      <div style="padding:12px 16px 8px;">
        <button class="btn btn-secondary btn-full" onclick="SceneWeekend.advance()">
          👋 道别，下周见 →
        </button>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  doActivity(actId) {
    const act = GameData.weekendActivities.find(a => a.id === actId);
    if (!act || !State.spendAP(act.ap)) return;
    State.markActivityDone(actId);

    if (act.minigame) {
      Game.startMinigame(act.minigame, act);
    } else {
      State.applyEffect(act.baseEffect);
      const effectStr = Object.entries(act.baseEffect).map(([k,v]) =>
        `${k==='digital'?'📱':k==='health'?'❤️':'👥'} +${v}`
      ).join(' ');
      UI.toast(`💖 ${act.name}完成！${effectStr}`);
      this.render();
    }
  },

  advance() {
    const phase = State.advancePhase();
    Game.gotoScene(phase === 'ending' ? 'ending' : phase);
  },
};
