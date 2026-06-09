// ============================================================
// minigames/social.js — 陪同出行小游戏
// ============================================================

const MgSocial = {
  activity: null,
  dialogueIdx: 0,

  start(activity) {
    this.activity = activity;
    this.dialogueIdx = Math.floor(Math.random() * GameData.socialDialogues.length);
    this.render();
  },

  render() {
    const d = GameData.socialDialogues[this.dialogueIdx];
    const elder = State.get().elder;

    const choicesHtml = d.choices.map((c, i) => `
      <div class="dialogue-choice" onclick="MgSocial.choose(${i})">
        ${c.text}
      </div>
    `).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container slide-up">
        <div class="mg-title">🌳 陪同出行 — ${d.location}</div>
        <div class="mg-sub">
          你陪${elder.name}外出，遇见了${d.npcEmoji}${d.npc}。选择你的应对方式。
        </div>

        <div class="chat-bubble elder">
          <div class="bubble-avatar">${d.npcEmoji}</div>
          <div class="bubble-body">${d.intro}</div>
        </div>

        <div style="font-size:12px;font-weight:600;color:var(--text-dim);margin:14px 0 8px;">
          🎮 你会怎么处理？
        </div>

        <div class="dialogue-choices">${choicesHtml}</div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  choose(idx) {
    const d = GameData.socialDialogues[this.dialogueIdx];
    const choice = d.choices[idx];
    const elder = State.get().elder;

    // 应用效果
    const effect = { ...this.activity.baseEffect, ...choice.effect };
    State.applyEffect(effect);

    const effectStr = Object.entries(choice.effect).map(([k,v]) => {
      if (v === 0) return null;
      return `${k === 'digital' ? '📱' : k === 'health' ? '❤️' : '👥'} ${v > 0 ? '+' : ''}${v}`;
    }).filter(Boolean).join(' ') || '没有额外效果';

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container fade-in">
        <div style="margin-bottom:14px;">
          <div class="chat-bubble elder">
            <div class="bubble-avatar">${d.npcEmoji}</div>
            <div class="bubble-body">${d.intro}</div>
          </div>
          <div class="chat-bubble player">
            <div class="bubble-avatar">${elder.avatar}</div>
            <div class="bubble-body">${choice.text}</div>
          </div>
        </div>

        <div class="mg-result">
          <div class="res-icon">${choice.outcome === 'great' ? '🌟' : choice.outcome === 'good' ? '😊' : '😔'}</div>
          <div class="res-title" style="color:${choice.outcome === 'great' ? 'var(--social)' : choice.outcome === 'good' ? 'var(--accent2)' : 'var(--text-dim)'};">
            ${choice.outcome === 'great' ? '太棒了！' : choice.outcome === 'good' ? '不错！' : '有点遗憾'}
          </div>
          <div class="res-desc">
            ${choice.reply}<br>
            <span style="margin-top:6px;display:inline-block;">${effectStr}</span>
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
