// ============================================================
// state.js — 游戏状态管理
// ============================================================

const State = (() => {
  function createInitial(elderId) {
    const elder = GameData.elders.find(e => e.id === elderId) || GameData.elders[0];
    return {
      elder,
      week: 1,
      phase: 'weekday',
      ap: GameData.WEEKEND_AP,
      budget: GameData.INIT_BUDGET,
      stats: {
        digital: elder.baseDigital,
        health:  elder.baseHealth,
        social:  elder.baseSocial,
      },
      inventory: [],
      completedTasks: [],       // 本周已完成任务 id
      completedActivities: [],  // 本周末已完成活动 id
      weekdayActionsLeft: GameData.WEEKDAY_ACTION_LIMIT,  // 周中剩余行动次数
      pendingEvent: null,
      allEventIds: [],
      totalWeeksPlayed: 0,
    };
  }

  let _state = null;

  return {
    init(elderId) {
      _state = createInitial(elderId);
      this.save();
      return _state;
    },

    get() { return _state; },

    applyEffect(effect) {
      if (!effect) return;
      const s = _state.stats;
      if (effect.digital !== undefined) s.digital = Math.min(100, Math.max(0, s.digital + effect.digital));
      if (effect.health  !== undefined) s.health  = Math.min(100, Math.max(0, s.health  + effect.health));
      if (effect.social  !== undefined) s.social  = Math.min(100, Math.max(0, s.social  + effect.social));
    },

    // ---- 周中行动限制 ----
    hasWeekdayActions() { return _state.weekdayActionsLeft > 0; },

    useWeekdayAction() {
      if (_state.weekdayActionsLeft <= 0) return false;
      _state.weekdayActionsLeft--;
      this.save();
      return true;
    },

    // ---- 商店 ----
    canAfford(price) { return _state.budget >= price; },

    buyItem(itemId) {
      const item = GameData.shopItems.find(i => i.id === itemId);
      if (!item || _state.budget < item.price || _state.inventory.includes(itemId)) return false;
      if (!this.useWeekdayAction()) return false;  // 购买也消耗行动次数
      _state.budget -= item.price;
      _state.inventory.push(itemId);
      this.applyEffect(item.effect);
      this.save();
      return true;
    },

    hasItem(itemId) { return _state.inventory.includes(itemId); },

    // ---- 周中任务 ----
    doWeekdayTask(taskId) {
      if (_state.completedTasks.includes(taskId)) return false;
      const task = GameData.weekdayTasks.find(t => t.id === taskId);
      if (!task) return false;
      if (!this.useWeekdayAction()) return false;
      _state.completedTasks.push(taskId);
      this.applyEffect(task.effect);
      this.save();
      return true;
    },

    // ---- 周末 ----
    spendAP(amount = 1) {
      if (_state.ap < amount) return false;
      _state.ap -= amount;
      this.save();
      return true;
    },

    markActivityDone(activityId) {
      if (!_state.completedActivities.includes(activityId)) {
        _state.completedActivities.push(activityId);
      }
      this.save();
    },

    isActivityDone(activityId) {
      return _state.completedActivities.includes(activityId);
    },

    // 当前周显示的活动列表（按 weeklyActivitySets 轮换）
    getWeekActivities() {
      const sets = GameData.weeklyActivitySets;
      const idx = (_state.week - 1) % sets.length;
      const ids = sets[idx];
      return ids.map(id => GameData.weekendActivities.find(a => a.id === id)).filter(Boolean);
    },

    // ---- 周期推进 ----
    advancePhase() {
      if (_state.phase === 'weekday') {
        const event = this.rollEvent();
        if (event) {
          _state.pendingEvent = event;
          _state.phase = 'event';
        } else {
          _state.phase = 'weekend';
          _state.ap = GameData.WEEKEND_AP;
          _state.completedActivities = [];
        }
      } else if (_state.phase === 'event') {
        _state.pendingEvent = null;
        _state.phase = 'weekend';
        _state.ap = GameData.WEEKEND_AP;
        _state.completedActivities = [];
      } else if (_state.phase === 'weekend') {
        _state.week += 1;
        _state.budget += GameData.WEEKLY_BUDGET;
        _state.completedTasks = [];
        _state.weekdayActionsLeft = GameData.WEEKDAY_ACTION_LIMIT;
        _state.totalWeeksPlayed += 1;
        _state.phase = _state.week > GameData.TOTAL_WEEKS ? 'ending' : 'weekday';
      }
      this.save();
      return _state.phase;
    },

    // ---- 随机事件 ----
    rollEvent() {
      const candidates = GameData.randomEvents.filter(e => {
        if (_state.allEventIds.includes(e.id)) return false;
        if (e.trigger === 'after_week3' && _state.week < 3) return false;
        return true;
      });
      if (!candidates.length || Math.random() < 0.35) return null;
      const evt = candidates[Math.floor(Math.random() * candidates.length)];
      _state.allEventIds.push(evt.id);
      return evt;
    },

    // ---- 结局判断 ----
    calcEnding() {
      const { digital, health, social } = _state.stats;
      const t = GameData.ENDING_TRUE;
      if (digital >= t.digital && social >= t.social && health >= t.health) return 'true';
      if (digital + health + social >= GameData.ENDING_NORMAL) return 'normal';
      return 'bad';
    },

    // ---- 存档 ----
    save() {
      try { localStorage.setItem('sg_save', JSON.stringify(_state)); } catch(e) {}
    },

    load() {
      try {
        const raw = localStorage.getItem('sg_save');
        if (raw) {
          _state = JSON.parse(raw);
          _state.elder = GameData.elders.find(e => e.id === _state.elder.id) || GameData.elders[0];
          // 兼容旧存档没有 weekdayActionsLeft 字段
          if (_state.weekdayActionsLeft === undefined) {
            _state.weekdayActionsLeft = GameData.WEEKDAY_ACTION_LIMIT;
          }
          return true;
        }
      } catch(e) {}
      return false;
    },

    hasSave() {
      try { return !!localStorage.getItem('sg_save'); } catch(e) { return false; }
    },

    clearSave() {
      try { localStorage.removeItem('sg_save'); } catch(e) {}
    },
  };
})();
