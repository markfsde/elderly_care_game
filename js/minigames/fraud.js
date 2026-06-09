// ============================================================
// minigames/fraud.js — 防诈骗小游戏
// ============================================================

const MgFraud = {
  activity: null,
  questionIdx: 0,
  correctCount: 0,

  start(activity) {
    this.activity = activity;
    this.questionIdx = 0;
    this.correctCount = 0;
    this.render();
  },

  render() {
    const q = GameData.fraudQuestions[this.questionIdx];
    const total = GameData.fraudQuestions.length;
    const progress = Array.from({length: total}, (_, i) =>
      `<div style="flex:1;height:3px;border-radius:2px;background:${i < this.questionIdx ? 'var(--accent3)' : i === this.questionIdx ? 'var(--accent2)' : 'rgba(255,255,255,0.1)'};"></div>`
    ).join('');

    const options = q.options.map((opt, i) => `
      <div class="fraud-option" onclick="MgFraud.answer(${i})">${opt.text}</div>
    `).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container slide-up">
        <div class="mg-title">🚨 防诈骗演练</div>
        <div class="mg-sub">手把手教${State.get().elder.name}识别诈骗套路 · 第 ${this.questionIdx + 1}/${total} 题</div>

        <div style="display:flex;gap:4px;margin-bottom:16px;">${progress}</div>

        <div class="dialogue-box">
          <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">📞 来电情景</div>
          ${q.scenario}
        </div>

        <div style="font-size:12px;font-weight:600;color:var(--text-dim);margin-bottom:8px;">
          ${State.get().elder.name}应该怎么做？
        </div>
        <div class="fraud-options">${options}</div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  answer(idx) {
    const q = GameData.fraudQuestions[this.questionIdx];
    const options = document.querySelectorAll('.fraud-option');
    options.forEach(el => el.onclick = null);

    if (q.options[idx].correct) {
      options[idx].classList.add('correct');
      if (typeof GameAudio !== 'undefined') GameAudio.sfx.select();
      UI.toast('✅ ' + q.explanation, 2500);
      this.correctCount++;
    } else {
      options[idx].classList.add('wrong');
      if (typeof GameAudio !== 'undefined') GameAudio.sfx.fail();
      // 标出正确答案
      q.options.forEach((o, i) => { if (o.correct) options[i].classList.add('correct'); });
      UI.toast('❌ ' + q.explanation, 2500);
    }

    setTimeout(() => {
      this.questionIdx++;
      if (this.questionIdx < GameData.fraudQuestions.length) {
        this.render();
      } else {
        this.showResult();
      }
    }, 2800);
  },

  showResult() {
    const total = GameData.fraudQuestions.length;
    const pass = this.correctCount >= 2;
    if (typeof GameAudio !== 'undefined') { pass ? GameAudio.sfx.success() : GameAudio.sfx.fail(); }
    const bonus = pass ? { digital: +20 } : { digital: +8 };
    State.applyEffect({ ...this.activity.baseEffect, ...bonus });

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container fade-in">
        <div class="mg-result">
          <div class="res-icon">${pass ? '🛡️' : '📚'}</div>
          <div class="res-title" style="color:${pass ? 'var(--social)' : 'var(--accent2)'};">
            ${pass ? '演练通关！' : '继续加油！'}
          </div>
          <div class="res-desc">
            答对 ${this.correctCount}/${total} 题<br>
            ${pass
              ? `${State.get().elder.name}已能识别常见诈骗套路！📱 数字能力 +${20 + (this.activity.baseEffect.digital || 0)}`
              : `${State.get().elder.name}学到了一些，还需要多练习。📱 数字能力 +${8 + (this.activity.baseEffect.digital || 0)}`
            }
          </div>
        </div>

        <div class="psa-box" style="margin-top:12px;">
          <div class="psa-title">💡 防诈骗口诀</div>
          <div class="psa-text">
            陌生来电不轻信 · 家人联系先核实<br>
            天上不掉馅饼钱 · 证件信息不外传<br>
            可疑转账先暂停 · 遇事拨打 96110
          </div>
        </div>

        <div style="margin-top:16px;">
          <button class="btn btn-primary btn-full" onclick="Game.returnToWeekend()">
            返回周末 →
          </button>
        </div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },
};
