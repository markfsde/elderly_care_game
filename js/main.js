// ============================================================
// main.js — 游戏主控制器
// ============================================================

const Game = {
  currentScene: null,
  currentMinigame: null,
  currentActivity: null,

  init() {
    UI.init();

    // 全局按钮音效
    document.addEventListener('click', e => {
      if (typeof GameAudio === 'undefined') return;
      const t = e.target;
      if (t.classList.contains('btn') || t.classList.contains('action-item') ||
          t.classList.contains('fraud-option') || t.classList.contains('dialogue-choice') ||
          t.classList.contains('food-item') || t.classList.contains('memory-card')) {
        GameAudio.sfx.click();
      }
    });

    // 尝试载入存档（存档功能因安全限制可能不可用，容错处理）
    // 直接进入开始界面
    this.gotoScene('start');
  },

  gotoScene(scene) {
    this.currentScene = scene;
    if (typeof GameAudio !== 'undefined') GameAudio.sfx.scene();
    switch (scene) {
      case 'start':   SceneStart.render();   break;
      case 'weekday': SceneWeekday.render(); break;
      case 'weekend': SceneWeekend.render(); break;
      case 'event':   SceneEvent.render();   break;
      case 'ending':  SceneEnding.render();  break;
      default:        SceneStart.render();
    }
  },

  startMinigame(mgName, activity) {
    this.currentMinigame = mgName;
    this.currentActivity = activity;
    switch (mgName) {
      case 'fraud':   MgFraud.start(activity);   break;
      case 'cooking': MgCooking.start(activity); break;
      case 'social':  MgSocial.start(activity);  break;
    }
  },

  returnToWeekend() {
    this.currentMinigame = null;
    this.currentActivity = null;
    SceneWeekend.render();
  },

  continueSave() {
    if (State.load()) {
      UI.closeModal();
      this.gotoScene(State.get().phase);
    } else {
      UI.toast('读取存档失败，请开始新游戏。');
    }
  },
};

// 页面加载完毕后启动
window.addEventListener('DOMContentLoaded', () => Game.init());
