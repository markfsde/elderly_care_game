// ============================================================
// scenes/ending.js — 结局展示（含 SVG 场景 + 邮箱）
// ============================================================

const SceneEnding = {
  render() {
    const s = State.get();
    const endingKey = State.calcEnding();
    const ending = GameData.endings[endingKey];
    const { digital, health, social } = s.stats;
    const t = GameData.ENDING_TRUE;

    const storyLines = ending.story.split('\n').map(l =>
      l ? `<p style="margin-bottom:8px;">${l}</p>` : ''
    ).join('');

    // 提示差多少到真结局
    let hintHtml = '';
    if (endingKey !== 'true') {
      const gaps = [];
      if (digital < t.digital) gaps.push(`📱 数字能力还差 ${t.digital - digital} 点`);
      if (social  < t.social)  gaps.push(`👥 社交活跃还差 ${t.social  - social}  点`);
      if (health  < t.health)  gaps.push(`❤️ 健康幸福还差 ${t.health  - health}  点`);
      if (gaps.length) {
        hintHtml = `
          <div style="background:rgba(123,104,238,0.1);border:1px solid rgba(123,104,238,0.3);
            border-radius:12px;padding:12px 14px;margin-bottom:16px;width:100%;">
            <div style="font-size:11px;font-weight:600;color:#a78bfa;margin-bottom:6px;">
              🏆 距离「银发弄潮儿」真结局还差：
            </div>
            <div style="font-size:11px;color:var(--text-dim);line-height:1.8;">
              ${gaps.join('<br>')}
            </div>
          </div>`;
      }
    }

    UI.render(`
      <div class="ending-screen fade-in">
        ${endingKey === 'true' ? RoomScene.evening() : RoomScene.livingRoom()}

        <div style="margin-top:16px;">
          <div class="ending-emoji">${ending.icon}</div>
          <div class="ending-type">ENDING · ${ending.type.toUpperCase()}</div>
          <div class="ending-title ${ending.titleClass}">${ending.title}</div>
        </div>

        <div class="ending-story">${storyLines}</div>

        <div class="ending-stats">
          <div style="font-size:12px;font-weight:600;color:var(--text-dim);margin-bottom:10px;">最终属性</div>
          <div class="ending-stat-row">
            <span class="ending-stat-label">📱 数字生存力</span>
            <span class="ending-stat-val" style="color:var(--digital);">${digital}
              ${digital >= t.digital ? '<span style="font-size:10px;">✓</span>' : `<span style="font-size:10px;color:var(--accent);">/${t.digital}</span>`}
            </span>
          </div>
          <div class="ending-stat-row">
            <span class="ending-stat-label">❤️ 健康幸福感</span>
            <span class="ending-stat-val" style="color:var(--health);">${health}
              ${health >= t.health ? '<span style="font-size:10px;">✓</span>' : `<span style="font-size:10px;color:var(--accent);">/${t.health}</span>`}
            </span>
          </div>
          <div class="ending-stat-row">
            <span class="ending-stat-label">👥 社交活跃度</span>
            <span class="ending-stat-val" style="color:var(--social);">${social}
              ${social >= t.social ? '<span style="font-size:10px;">✓</span>' : `<span style="font-size:10px;color:var(--accent);">/${t.social}</span>`}
            </span>
          </div>
          <div class="ending-stat-row" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);">
            <span class="ending-stat-label">📦 购买道具</span>
            <span class="ending-stat-val">${s.inventory.length} 件</span>
          </div>
        </div>

        <div class="psa-box" style="width:100%;">
          <div class="psa-title">💡 公益倡议</div>
          <div class="psa-text">${ending.psa}</div>
        </div>

        ${hintHtml}

        <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
          <button class="btn btn-primary btn-full" onclick="SceneEnding.restart()">
            🔄 再玩一次
          </button>
          <button class="btn btn-ghost btn-full" onclick="SceneEnding.shareResult()">
            📤 分享结果
          </button>
        </div>

        <div style="margin-top:24px;font-size:11px;color:var(--text-dim);text-align:center;line-height:1.9;">
          感谢体验「银发守护者」<br>
          关注老年人数字融合，从身边开始<br>
          <a href="mailto:yuyue.23@intl.zju.edu.cn"
            style="color:var(--accent3);text-decoration:none;font-weight:500;">
            ✉️ yuyue.23@intl.zju.edu.cn
          </a>
        </div>
        <div class="bottom-pad"></div>
      </div>
    `);
  },

  restart() {
    State.clearSave();
    Game.gotoScene('start');
  },

  shareResult() {
    const s = State.get();
    const endingKey = State.calcEnding();
    const ending = GameData.endings[endingKey];
    const { digital, health, social } = s.stats;
    const text = `🏠 银发守护者 Silver Guardian\n我解锁了「${ending.title}」结局！\n📱数字${digital} ❤️健康${health} 👥社交${social}\n#银发守护者 #适老化 #数字包容`;

    if (navigator.share) {
      navigator.share({ title: '银发守护者', text }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text).then(() => {
        UI.toast('📋 结果已复制！');
      }).catch(() => UI.toast('📋 ' + text.slice(0, 40) + '...'));
    }
  },
};
