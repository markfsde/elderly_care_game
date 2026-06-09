// ============================================================
// minigames/dance.js — 广场舞节奏游戏
// 记住并按顺序点击方向箭头
// ============================================================

const MgDance = {
  activity: null,
  sequence: [],       // 本关序列
  playerInput: [],
  phase: 'watch',     // 'watch' | 'input' | 'result'
  currentShowIdx: 0,
  roundIdx: 0,
  lives: 3,
  score: 0,
  highlightIdx: -1,
  showTimer: null,

  DIRS: ['👆','👇','👈','👉'],
  DIR_LABELS: { '👆':'上', '👇':'下', '👈':'左', '👉':'右' },
  DIR_COLORS: {
    '👆': 'linear-gradient(135deg,#7b68ee,#5a4fcf)',
    '👇': 'linear-gradient(135deg,#ff6b6b,#c03050)',
    '👈': 'linear-gradient(135deg,#51cf66,#3aad50)',
    '👉': 'linear-gradient(135deg,#ffd43b,#f0a500)',
  },

  start(activity) {
    this.activity = activity;
    this.roundIdx = 0;
    this.lives = 3;
    this.score = 0;
    this.startRound();
  },

  startRound() {
    const seqs = GameData.danceSequences;
    if (this.roundIdx >= seqs.length) { this.showFinalResult(); return; }
    this.sequence = seqs[this.roundIdx];
    this.playerInput = [];
    this.phase = 'watch';
    this.currentShowIdx = 0;
    this.highlightIdx = -1;
    this.renderWatch();
    // 开始逐个亮起序列
    setTimeout(() => this.showNextStep(), 800);
  },

  renderWatch() {
    const elder = State.get().elder;
    const lives = '❤️'.repeat(this.lives) + '🖤'.repeat(3 - this.lives);
    const seqPreview = this.sequence.map((d, i) =>
      `<span style="font-size:22px;transition:transform 0.15s,filter 0.15s;
        ${i === this.highlightIdx ? 'transform:scale(1.6);filter:drop-shadow(0 0 8px gold)' : 'opacity:0.3'}">
        ${d}
      </span>`
    ).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container slide-up">
        <div class="mg-title">🕺 广场舞排练 — 第 ${this.roundIdx+1}/${GameData.danceSequences.length} 关</div>
        <div class="mg-sub">
          记住舞步顺序！亮起来的时候跟着动 🎵<br>
          <span style="color:var(--text-dim);">${lives} 分数：${this.score}</span>
        </div>

        <div style="text-align:center;background:var(--card);border-radius:12px;padding:18px;margin-bottom:16px;">
          <div style="font-size:13px;color:var(--accent2);margin-bottom:10px;font-weight:600;">👀 记住这些舞步：</div>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">${seqPreview}</div>
        </div>

        <div style="text-align:center;font-size:13px;color:var(--text-dim);">
          ${this.phase === 'watch' ? '👀 仔细观看...' : ''}
        </div>
        ${this.renderButtons(true)}
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  renderInput() {
    const elder = State.get().elder;
    const lives = '❤️'.repeat(this.lives) + '🖤'.repeat(3 - this.lives);
    const progress = this.playerInput.map((d, i) =>
      `<span style="font-size:18px;${i < this.playerInput.length ? '' : 'opacity:0.3'}">${d}</span>`
    ).join('');
    const remaining = this.sequence.length - this.playerInput.length;

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container">
        <div class="mg-title">🕺 广场舞排练 — 你来！</div>
        <div class="mg-sub">
          按刚才看到的顺序点击舞步！还剩 ${remaining} 步<br>
          <span style="color:var(--text-dim);">${lives} 分数：${this.score}</span>
        </div>

        <div style="text-align:center;background:var(--card);border-radius:12px;padding:14px;margin-bottom:16px;min-height:54px;">
          <div style="font-size:13px;color:var(--text-dim);margin-bottom:6px;">你已输入：</div>
          <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;font-size:22px;">
            ${this.playerInput.length ? progress : '<span style="opacity:0.3;font-size:14px;">点击下方按钮...</span>'}
          </div>
        </div>

        ${this.renderButtons(false)}
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  renderButtons(disabled) {
    return `
      <div class="dance-grid">
        ${this.DIRS.map(d => `
          <button class="dance-btn" style="background:${this.DIR_COLORS[d]};"
            onclick="${disabled ? '' : `MgDance.input('${d}')`}"
            ${disabled ? 'disabled' : ''}>
            <span style="font-size:28px;">${d}</span>
            <span style="font-size:11px;">${this.DIR_LABELS[d]}</span>
          </button>
        `).join('')}
      </div>
    `;
  },

  showNextStep() {
    if (this.currentShowIdx >= this.sequence.length) {
      // 看完了，切换到输入阶段
      this.highlightIdx = -1;
      this.phase = 'input';
      this.renderWatch();
      setTimeout(() => this.renderInput(), 400);
      return;
    }
    this.highlightIdx = this.currentShowIdx;
    this.renderWatch();
    setTimeout(() => {
      this.highlightIdx = -1;
      this.renderWatch();
      this.currentShowIdx++;
      setTimeout(() => this.showNextStep(), 350);
    }, 550);
  },

  input(dir) {
    if (this.phase !== 'input') return;
    const expected = this.sequence[this.playerInput.length];
    this.playerInput.push(dir);

    if (dir !== expected) {
      // 错误
      this.lives--;
      UI.toast(`❌ 错了！应该是 ${expected}，你按了 ${dir}`);
      if (this.lives <= 0) {
        setTimeout(() => this.showFinalResult(), 800);
      } else {
        setTimeout(() => { this.playerInput = []; this.renderInput(); }, 900);
      }
      return;
    }

    // 正确
    if (this.playerInput.length === this.sequence.length) {
      // 本关通过
      this.score += this.sequence.length * 10;
      UI.toast(`🎉 第 ${this.roundIdx+1} 关通关！+${this.sequence.length*10} 分`);
      this.roundIdx++;
      setTimeout(() => this.startRound(), 1200);
    } else {
      this.renderInput();
    }
  },

  showFinalResult() {
    const maxScore = GameData.danceSequences.reduce((s,seq) => s + seq.length*10, 0);
    const pct = this.score / maxScore;
    let bonus, icon, title;
    if (pct >= 0.8)      { bonus = 22; icon = '💃'; title = '完美节奏！'; }
    else if (pct >= 0.5) { bonus = 14; icon = '👏'; title = '跳得不错！'; }
    else                 { bonus = 7;  icon = '😅'; title = '下次更好！'; }

    State.applyEffect({ ...this.activity.baseEffect, social: bonus });

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container fade-in">
        <div class="mg-result">
          <div class="res-icon">${icon}</div>
          <div class="res-title" style="color:${bonus>=18?'var(--social)':'var(--accent2)'};">${title}</div>
          <div class="res-desc">
            最终得分：${this.score} / ${maxScore}<br>
            ${State.get().elder.name}跳得很开心！<br>
            👥 社交 +${bonus + (this.activity.baseEffect.social||0)}
            ❤️ 健康 +${(this.activity.baseEffect.health||0)}
          </div>
        </div>

        <div class="psa-box" style="margin-top:12px;">
          <div class="psa-title">💡 广场舞的健康价值</div>
          <div class="psa-text">
            研究显示，每周坚持广场舞≥3次的老年人，认知功能下降风险降低 38%，
            社交孤独感显著减少。节奏感训练还对预防老年痴呆有积极作用。
          </div>
        </div>

        <div style="margin-top:16px;">
          <button class="btn btn-primary btn-full" onclick="Game.returnToWeekend()">返回周末 →</button>
        </div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },
};
