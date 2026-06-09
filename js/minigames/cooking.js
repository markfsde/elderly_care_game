// ============================================================
// minigames/cooking.js — 爱心下厨小游戏
// ============================================================

const MgCooking = {
  activity: null,
  selected: [],
  maxSelect: 4,

  start(activity) {
    this.activity = activity;
    this.selected = [];
    this.render();
  },

  render() {
    const elder = State.get().elder;
    const conditions = elder.conditions;

    const foodHtml = GameData.cookingIngredients.map((food, i) => {
      const isSelected = this.selected.includes(i);
      const isBad = food.badFor.some(c => conditions.some(ec => ec.includes(c.split('/')[0])));
      return `
        <div class="food-item ${isSelected ? 'selected' : ''} ${isBad ? 'bad' : ''}"
          onclick="MgCooking.toggle(${i})">
          <div class="food-emoji">${food.emoji}</div>
          <div class="food-name">${food.name}</div>
          <div class="food-flag">${food.flag}</div>
        </div>
      `;
    }).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container slide-up">
        <div class="mg-title">🍳 爱心下厨</div>
        <div class="mg-sub">
          ${elder.name}有 ${conditions.join('、')}，选 ${this.maxSelect} 种最适合的食材做一顿健康餐。
          <br><span style="color:var(--accent);">红色边框</span> 表示对老人不宜的食物。
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:12px;color:var(--text-dim);">已选 ${this.selected.length}/${this.maxSelect}</span>
          <button class="btn btn-secondary" style="padding:6px 14px;font-size:12px;"
            onclick="MgCooking.confirm()" ${this.selected.length === 0 ? 'disabled' : ''}>
            开始烹饪 🍽️
          </button>
        </div>

        <div class="food-grid">${foodHtml}</div>
      </div>
      <div class="bottom-pad"></div>
    `);
  },

  toggle(idx) {
    const pos = this.selected.indexOf(idx);
    if (pos === -1) {
      if (this.selected.length >= this.maxSelect) {
        UI.toast(`最多选 ${this.maxSelect} 种食材！`);
        return;
      }
      this.selected.push(idx);
    } else {
      this.selected.splice(pos, 1);
    }
    this.render();
  },

  confirm() {
    if (this.selected.length === 0) return;
    const elder = State.get().elder;
    const conditions = elder.conditions;
    const ingredients = this.selected.map(i => GameData.cookingIngredients[i]);

    let badCount = 0;
    let goodCount = 0;

    ingredients.forEach(f => {
      if (f.badFor.some(c => conditions.some(ec => ec.includes(c.split('/')[0])))) badCount++;
      if (f.goodFor.length > 0) goodCount++;
    });

    const score = goodCount - badCount * 2;
    let healthBonus, msg, icon;

    if (score >= 3) {
      healthBonus = 25; icon = '⭐'; msg = '食材搭配完美！营养均衡，非常适合老人的身体状况。';
    } else if (score >= 1) {
      healthBonus = 15; icon = '👍'; msg = '食材搭配不错，有几样特别好，下次注意避开高盐高糖食物。';
    } else {
      healthBonus = 5; icon = '😅'; msg = '这餐不太适合老人的体质……有几样食物需要注意。';
    }

    State.applyEffect({ ...this.activity.baseEffect, health: healthBonus });

    const menuHtml = ingredients.map(f => `
      <span style="margin-right:6px;">${f.emoji}${f.name}</span>
    `).join('');

    UI.render(`
      ${UI.statusBar()}
      <div class="mg-container fade-in">
        <div class="mg-result">
          <div class="res-icon">${icon}</div>
          <div class="res-title" style="color:${score >= 3 ? 'var(--social)' : score >= 1 ? 'var(--accent2)' : 'var(--accent)'};">
            ${score >= 3 ? '完美健康餐！' : score >= 1 ? '不错的搭配！' : '需要改进'}
          </div>
          <div class="res-desc" style="margin-top:8px;">
            <div style="margin-bottom:8px;">${menuHtml}</div>
            ${msg}<br>
            ❤️ 健康幸福 +${healthBonus}
          </div>
        </div>

        <div class="psa-box" style="margin-top:12px;">
          <div class="psa-title">💡 老年饮食小贴士</div>
          <div class="psa-text">
            高血压：限制钠盐（&lt;5g/天），多吃富钾蔬菜（菠菜、香蕉）<br>
            糖尿病：选低GI食物（燕麦、豆腐），避免精制糖<br>
            通用：优质蛋白（鱼、豆腐）+ 充足膳食纤维
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
