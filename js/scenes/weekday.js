// ============================================================
// scenes/weekday.js — 周中远程连线（限行动次数）
// ============================================================

const SceneWeekday = {
  render() {
    const s = State.get();
    const actLeft = s.weekdayActionsLeft;
    const limit = GameData.WEEKDAY_ACTION_LIMIT;

    // 行动点指示器
    const actionDots = Array.from({length: limit}, (_, i) =>
      `<div style="width:10px;height:10px;border-radius:50%;
        background:${i < actLeft ? 'var(--accent2)' : 'rgba(180,100,40,0.12)'};
        border:1.5px solid ${i < actLeft ? 'var(--accent2)' : 'rgba(180,100,40,0.2)'};
        box-shadow:${i < actLeft ? '0 0 6px var(--accent2)' : 'none'};
        transition:all 0.3s;"></div>`
    ).join('');

    // 周中任务
    const tasks = GameData.weekdayTasks.map(task => {
      const done = s.completedTasks.includes(task.id);
      const noAction = !done && actLeft === 0;
      const effectStr = Object.entries(task.effect).map(([k,v]) =>
        `<span style="color:${k==='digital'?'var(--digital)':k==='health'?'var(--health)':'var(--social)'};">${v>0?'+':''}${v}</span>`
      ).join(' ');
      return `
        <div class="action-item ${done ? 'done' : noAction ? 'disabled' : ''}"
          onclick="${done || noAction ? '' : `SceneWeekday.doTask('${task.id}')`}">
          ${done ? '<div class="ai-cost free">✓</div>' : ''}
          <div class="ai-icon">${task.icon}</div>
          <div class="ai-name">${task.name}</div>
          <div class="ai-desc">${task.desc}</div>
          <div style="margin-top:5px;font-size:11px;">${effectStr}</div>
        </div>
      `;
    }).join('');

    // 商店道具
    const shopItems = GameData.shopItems.map(item => {
      const owned = State.hasItem(item.id);
      const canBuy = !owned && State.canAfford(item.price) && actLeft > 0;
      return `
        <div class="shop-item ${owned ? 'purchased' : ''}">
          <div class="item-icon">${item.icon}</div>
          <div class="item-info">
            <div class="item-name">${item.name}
              ${item.tag ? `<span class="tag info" style="margin-left:4px;font-size:9px;">${item.tag}</span>` : ''}
            </div>
            <div class="item-effect">${item.effectDesc}</div>
          </div>
          ${owned
            ? `<span style="color:var(--social);font-size:13px;flex-shrink:0;">✓</span>`
            : `<div style="text-align:right;flex-shrink:0;">
                <div class="item-price">¥${item.price}</div>
                <button class="btn btn-warn" style="padding:5px 10px;font-size:11px;margin-top:4px;"
                  ${canBuy ? '' : 'disabled'}
                  onclick="SceneWeekday.buy('${item.id}')">购买</button>
               </div>`
          }
        </div>
      `;
    }).join('');

    UI.render(`
      ${UI.statusBar()}
      ${UI.elderCard()}

      <div class="card slide-up">
        <div class="card-title">📞 远程连线 — 第 ${s.week} 周</div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px;">
          <div style="font-size:12px;color:var(--text-dim);">本周行动次数</div>
          <div style="display:flex;align-items:center;gap:5px;">
            ${actionDots}
            <span style="font-size:12px;color:${actLeft>0?'var(--accent2)':'var(--accent)'};font-weight:600;margin-left:4px;">
              ${actLeft}/${limit}
            </span>
          </div>
        </div>
        ${actLeft === 0
          ? `<div style="margin-top:6px;font-size:11px;color:var(--accent);">⚡ 行动已用完，周末见！</div>`
          : ''
        }
      </div>

      <div class="section-header">📋 布置任务</div>
      <div style="padding:0 16px;">
        <div class="action-grid">${tasks}</div>
      </div>

      <div class="section-header">🛒 网购物资</div>
      ${UI.budgetRow()}
      <div style="padding:0 16px 8px;">${shopItems}</div>

      <div style="padding:12px 16px 8px;">
        <button class="btn btn-primary btn-full" onclick="SceneWeekday.advance()">
          📅 周末到了，回家看看 →
        </button>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  buy(itemId) {
    const item = GameData.shopItems.find(i => i.id === itemId);
    if (!item) return;
    if (!State.hasWeekdayActions()) { UI.toast('⚡ 本周行动次数已用完！'); return; }
    if (State.buyItem(itemId)) {
      UI.toast(`🛍️ 已购：${item.name}（${item.effectDesc}）`);
      if (item.psa) setTimeout(() => UI.toast(`💡 ${item.psa}`, 4000), 2600);
      this.render();
    } else {
      UI.toast('❌ 余额不足！');
    }
  },

  doTask(taskId) {
    const task = GameData.weekdayTasks.find(t => t.id === taskId);
    if (!task) return;
    if (!State.hasWeekdayActions()) { UI.toast('⚡ 本周行动次数已用完！'); return; }
    if (State.doWeekdayTask(taskId)) {
      const effectStr = Object.entries(task.effect).map(([k,v]) =>
        `${k==='digital'?'📱':k==='health'?'❤️':'👥'} ${v>0?'+':''}${v}`
      ).join(' ');
      UI.toast(`✅ ${task.name} 完成！${effectStr}`);
      this.render();
    }
  },

  advance() {
    const phase = State.advancePhase();
    Game.gotoScene(phase);
  },
};
