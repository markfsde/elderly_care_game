// ============================================================
// scenes/event.js — 随机事件处理
// ============================================================

const SceneEvent = {
  render() {
    const evt = State.get().pendingEvent;
    if (!evt) { Game.gotoScene('weekend'); return; }

    // 好事件
    if (evt.type === 'good') {
      this.renderGoodEvent(evt);
    } else {
      this.renderDangerEvent(evt);
    }
  },

  renderGoodEvent(evt) {
    const stats = State.get().stats;
    const statKey = evt.autoHandle?.stat;
    const threshold = evt.autoHandle?.threshold || 0;
    const passed = statKey ? stats[statKey] >= threshold : true;

    const resultHtml = passed
      ? `<div class="mg-result">
           <div class="res-icon">🌟</div>
           <div class="res-title" style="color:var(--social);">${evt.autoHandleDesc}</div>
         </div>`
      : `<div class="mg-result">
           <div class="res-icon">😔</div>
           <div class="res-title" style="color:var(--text-dim);">${evt.failDesc || '错过了这次机会。'}</div>
         </div>`;

    if (passed && evt.autoHandleReward) {
      State.applyEffect(evt.autoHandleReward);
    }

    UI.render(`
      ${UI.statusBar()}
      <div style="padding:20px 16px;">
        <div style="font-size:36px;text-align:center;margin-bottom:12px;">${evt.icon}</div>
        <div style="font-size:18px;font-weight:700;text-align:center;margin-bottom:8px;">${evt.title}</div>
        <div class="card">
          <div style="font-size:13px;color:var(--text-dim);line-height:1.7;">${evt.desc}</div>
        </div>
        ${resultHtml}
        <div style="margin-top:16px;">
          <button class="btn btn-primary btn-full" onclick="SceneEvent.next()">
            继续 →
          </button>
        </div>
      </div>
    `);
  },

  renderDangerEvent(evt) {
    const stats = State.get().stats;

    // 检查是否被道具阻止
    if (evt.preventedBy && State.hasItem(evt.preventedBy)) {
      UI.render(`
        ${UI.statusBar()}
        <div style="padding:20px 16px;">
          <div style="font-size:36px;text-align:center;margin-bottom:12px;">${evt.icon}</div>
          <div style="font-size:18px;font-weight:700;text-align:center;margin-bottom:12px;">${evt.title}</div>
          <div class="card">
            <div style="font-size:13px;color:var(--text-dim);line-height:1.7;">${evt.desc}</div>
          </div>
          <div class="mg-result">
            <div class="res-icon">🛡️</div>
            <div class="res-title" style="color:var(--social);">${evt.preventedDesc}</div>
          </div>
          ${evt.psa ? `<div class="psa-box"><div class="psa-title">💡 公益科普</div><div class="psa-text">${evt.psa}</div></div>` : ''}
          <button class="btn btn-primary btn-full" onclick="SceneEvent.next()" style="margin-top:12px;">继续 →</button>
        </div>
      `);
      return;
    }

    // 检查是否被属性自动处理
    if (evt.autoHandle) {
      const val = stats[evt.autoHandle.stat] || 0;
      if (val >= evt.autoHandle.threshold) {
        UI.render(`
          ${UI.statusBar()}
          <div style="padding:20px 16px;">
            <div style="font-size:36px;text-align:center;margin-bottom:12px;">${evt.icon}</div>
            <div style="font-size:18px;font-weight:700;text-align:center;margin-bottom:12px;">${evt.title}</div>
            <div class="card">
              <div style="font-size:13px;color:var(--text-dim);line-height:1.7;">${evt.desc}</div>
            </div>
            <div class="mg-result">
              <div class="res-icon">✅</div>
              <div class="res-title" style="color:var(--social);">${evt.autoHandleDesc}</div>
            </div>
            ${evt.psa ? `<div class="psa-box"><div class="psa-title">💡 公益科普</div><div class="psa-text">${evt.psa}</div></div>` : ''}
            <button class="btn btn-primary btn-full" onclick="SceneEvent.next()" style="margin-top:12px;">继续 →</button>
          </div>
        `);
        return;
      }
    }

    // 需要玩家处理：有选择题
    if (evt.choices) {
      this.renderChoiceEvent(evt);
    } else {
      // 无法处理，承受惩罚
      if (evt.failPenalty) State.applyEffect(evt.failPenalty);
      UI.render(`
        ${UI.statusBar()}
        <div style="padding:20px 16px;">
          <div style="font-size:36px;text-align:center;margin-bottom:12px;">${evt.icon}</div>
          <div style="font-size:18px;font-weight:700;text-align:center;margin-bottom:12px;">${evt.title}</div>
          <div class="card">
            <div style="font-size:13px;color:var(--text-dim);line-height:1.7;">${evt.desc}</div>
          </div>
          <div class="mg-result">
            <div class="res-icon">⚠️</div>
            <div class="res-title" style="color:var(--accent);">${evt.failDesc || '产生了一些影响。'}</div>
          </div>
          ${evt.psa ? `<div class="psa-box"><div class="psa-title">💡 公益科普</div><div class="psa-text">${evt.psa}</div></div>` : ''}
          <button class="btn btn-primary btn-full" onclick="SceneEvent.next()" style="margin-top:12px;">继续 →</button>
        </div>
      `);
    }
  },

  renderChoiceEvent(evt) {
    const choicesHtml = evt.choices.map((c, i) => `
      <div class="fraud-option" onclick="SceneEvent.handleChoice(${i})">
        ${c.text}
      </div>
    `).join('');

    UI.render(`
      ${UI.statusBar()}
      <div style="padding:20px 16px;">
        <div style="font-size:36px;text-align:center;margin-bottom:12px;">${evt.icon}</div>
        <div style="font-size:18px;font-weight:700;text-align:center;margin-bottom:12px;">${evt.title}</div>
        <div class="card">
          <div style="font-size:13px;color:var(--text-dim);line-height:1.7;">${evt.desc}</div>
        </div>
        <div style="font-size:13px;font-weight:600;margin:12px 0 8px;">❓ 你会建议老人怎么做？</div>
        <div class="fraud-options">${choicesHtml}</div>
        ${evt.psa ? `<div class="psa-box" style="margin-top:12px;"><div class="psa-title">💡 急救科普</div><div class="psa-text">${evt.psa}</div></div>` : ''}
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  handleChoice(idx) {
    const evt = State.get().pendingEvent;
    const choice = evt.choices[idx];
    const options = document.querySelectorAll('.fraud-option');

    options.forEach((el, i) => {
      el.onclick = null;
      if (evt.choices[i].correct) el.classList.add('correct');
      else if (i === idx && !choice.correct) el.classList.add('wrong');
    });

    if (choice.correct) {
      UI.toast('✅ ' + choice.desc, 3000);
      State.applyEffect({ health: +5 });
    } else {
      UI.toast('❌ ' + choice.desc, 3000);
      if (evt.notPreventedPenalty) State.applyEffect(evt.notPreventedPenalty);
      else if (evt.failPenalty) State.applyEffect(evt.failPenalty);
    }

    setTimeout(() => SceneEvent.next(), 3500);
  },

  next() {
    const phase = State.advancePhase();
    Game.gotoScene(phase);
  },
};
