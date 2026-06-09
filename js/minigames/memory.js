// ============================================================
// minigames/memory.js — 手机相册记忆翻牌
// 教老人认识手机 App 图标，找出配对
// ============================================================

const MgMemory = {
  activity: null,
  cards: [],        // [{id, icon, name, index, flipped, matched}]
  flipped: [],      // 当前翻开的牌 index (最多2张)
  matchCount: 0,
  moves: 0,
  locked: false,
  startTime: 0,

  start(activity) {
    this.activity = activity;
    this.matchCount = 0;
    this.moves = 0;
    this.flipped = [];
    this.locked = false;
    this.startTime = Date.now();

    // 构建 12 张牌（6 对），打乱顺序
    const pairs = GameData.memoryCards.map(c => [
      { ...c, index: 0, flipped: false, matched: false },
      { ...c, index: 0, flipped: false, matched: false },
    ]).flat();
    // Fisher-Yates shuffle
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    pairs.forEach((c, i) => c.index = i);
    this.cards = pairs;
    this.render();
  },

  render() {
    const elder = State.get().elder;
    const total = GameData.memoryCards.length;
    const progressPct = Math.round(this.matchCount / total * 100);

    const cardsHtml = this.cards.map(c => {
      const isFlipped = c.flipped || c.matched;
      return `
        <div class="memory-card ${isFlipped ? 'flipped' : ''} ${c.matched ? 'matched' : ''}"
          onclick="MgMemory.flip(${c.index})">
          <div class="card-inner">
            <div class="card-front">❓</div>
            <div class="card-back">
              <div style="font-size:24px;">${c.icon}</div>
              <div style="font-size:10px;margin-top:3px;">${c.name}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container slide-up">
        <div class="mg-title">📸 整理手机相册</div>
        <div class="mg-sub">
          帮${elder.name}认识手机常用 App，翻开配对相同的图标卡片！<br>
          <span style="color:var(--text-dim);">已配对 ${this.matchCount}/${total} · 翻牌 ${this.moves} 次</span>
        </div>

        <div style="background:rgba(255,255,255,0.05);border-radius:6px;height:5px;margin-bottom:14px;overflow:hidden;">
          <div style="width:${progressPct}%;height:100%;background:var(--accent3);transition:width 0.4s;border-radius:6px;"></div>
        </div>

        <div class="memory-grid">${cardsHtml}</div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  flip(index) {
    if (this.locked) return;
    const card = this.cards[index];
    if (card.flipped || card.matched || this.flipped.includes(index)) return;

    card.flipped = true;
    this.flipped.push(index);
    this.render();

    if (this.flipped.length === 2) {
      this.moves++;
      this.locked = true;
      const [a, b] = this.flipped.map(i => this.cards[i]);

      if (a.id === b.id) {
        // 匹配成功
        setTimeout(() => {
          a.matched = true; b.matched = true;
          a.flipped = false; b.flipped = false;
          this.flipped = [];
          this.matchCount++;
          this.locked = false;
          if (this.matchCount === GameData.memoryCards.length) {
            this.showResult();
          } else {
            UI.toast('✅ 配对成功！继续加油！');
            this.render();
          }
        }, 600);
      } else {
        // 不匹配，翻回去
        setTimeout(() => {
          a.flipped = false; b.flipped = false;
          this.flipped = [];
          this.locked = false;
          this.render();
        }, 900);
      }
    }
  },

  showResult() {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    const total = GameData.memoryCards.length;
    // 评分：翻牌次数越少越好（最少是 total 次，即完美）
    const perfect = total;        // 理论最少翻牌 = 6
    const good    = total + 4;    // ≤10
    let bonus, icon, title;
    if (this.moves <= good) {
      bonus = 22; icon = '⭐'; title = '记性真好！';
    } else if (this.moves <= total * 2.5) {
      bonus = 14; icon = '👍'; title = '不错！';
    } else {
      bonus = 8;  icon = '📚'; title = '慢慢来！';
    }

    State.applyEffect({ ...this.activity.baseEffect, digital: bonus });

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container fade-in">
        <div class="mg-result">
          <div class="res-icon">${icon}</div>
          <div class="res-title" style="color:${bonus>=18?'var(--social)':'var(--accent2)'};">${title}</div>
          <div class="res-desc">
            全部 ${total} 对配对完成！共翻牌 ${this.moves} 次，用时 ${elapsed} 秒<br>
            📱 数字能力 +${bonus + (this.activity.baseEffect.digital||0)}
          </div>
        </div>

        <div class="psa-box" style="margin-top:12px;">
          <div class="psa-title">💡 手机 App 小科普</div>
          <div class="psa-text">
            学会使用手机 App，老人可以：视频挂号不排队、网上订药到家、
            发语音代替打字、视频通话见孙辈。每学会一个，生活就方便一点。
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
