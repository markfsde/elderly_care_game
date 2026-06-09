// ============================================================
// room.js — SVG 老人家居场景插图
// ============================================================

const RoomScene = {

  // 客厅场景（周末到家时展示）
  livingRoom() {
    return `
      <div style="padding:0 16px 0;margin-top:8px;">
        <svg viewBox="0 0 358 200" xmlns="http://www.w3.org/2000/svg"
          style="width:100%;border-radius:14px;display:block;box-shadow:0 4px 18px rgba(0,0,0,0.35);">
          <!-- 背景墙 -->
          <defs>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#f5e6c8"/>
              <stop offset="100%" stop-color="#e8d5a8"/>
            </linearGradient>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c8a87a"/>
              <stop offset="100%" stop-color="#a87c50"/>
            </linearGradient>
            <linearGradient id="sofaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#8b4513"/>
              <stop offset="100%" stop-color="#5c2d0a"/>
            </linearGradient>
            <linearGradient id="tvGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1a1a2e"/>
              <stop offset="100%" stop-color="#0d0d1a"/>
            </linearGradient>
            <radialGradient id="sunlight" cx="50%" cy="0%" r="80%">
              <stop offset="0%" stop-color="#fff9e6" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#fff9e6" stop-opacity="0"/>
            </radialGradient>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.2"/>
            </filter>
          </defs>

          <!-- 墙 -->
          <rect width="358" height="150" fill="url(#wallGrad)"/>
          <!-- 地板 -->
          <rect y="150" width="358" height="50" fill="url(#floorGrad)"/>
          <!-- 地板纹理 -->
          <line x1="0" y1="165" x2="358" y2="165" stroke="#b8905a" stroke-width="0.5" opacity="0.5"/>
          <line x1="0" y1="180" x2="358" y2="180" stroke="#b8905a" stroke-width="0.5" opacity="0.5"/>
          <line x1="60"  y1="150" x2="60"  y2="200" stroke="#b8905a" stroke-width="0.5" opacity="0.4"/>
          <line x1="120" y1="150" x2="120" y2="200" stroke="#b8905a" stroke-width="0.5" opacity="0.4"/>
          <line x1="180" y1="150" x2="180" y2="200" stroke="#b8905a" stroke-width="0.5" opacity="0.4"/>
          <line x1="240" y1="150" x2="240" y2="200" stroke="#b8905a" stroke-width="0.5" opacity="0.4"/>
          <line x1="300" y1="150" x2="300" y2="200" stroke="#b8905a" stroke-width="0.5" opacity="0.4"/>

          <!-- 阳光 -->
          <rect width="358" height="150" fill="url(#sunlight)"/>

          <!-- 窗户（左侧） -->
          <rect x="18" y="18" width="72" height="90" rx="4" fill="#d4edff" stroke="#c8a87a" stroke-width="2.5"/>
          <!-- 窗框 -->
          <line x1="54" y1="18" x2="54" y2="108" stroke="#c8a87a" stroke-width="2"/>
          <line x1="18" y1="63" x2="90" y2="63" stroke="#c8a87a" stroke-width="2"/>
          <!-- 窗外景色：蓝天 -->
          <rect x="20" y="20" width="32" height="42" fill="#87ceeb" rx="2"/>
          <rect x="56" y="20" width="32" height="42" fill="#87ceeb" rx="2"/>
          <rect x="20" y="65" width="32" height="41" fill="#87ceeb" rx="2"/>
          <rect x="56" y="65" width="32" height="41" fill="#87ceeb" rx="2"/>
          <!-- 窗外树 -->
          <circle cx="36" cy="75" r="8" fill="#4caf50" opacity="0.8"/>
          <circle cx="44" cy="72" r="7" fill="#66bb6a" opacity="0.8"/>
          <rect x="39" y="82" width="3" height="8" fill="#795548" opacity="0.9"/>
          <!-- 窗外云 -->
          <ellipse cx="68" cy="30" rx="9" ry="5" fill="white" opacity="0.85"/>
          <ellipse cx="76" cy="28" rx="7" ry="5" fill="white" opacity="0.85"/>
          <!-- 窗帘 -->
          <path d="M18,18 Q12,60 16,108" stroke="#e8c4a0" stroke-width="5" fill="none" opacity="0.7"/>
          <path d="M90,18 Q96,60 92,108" stroke="#e8c4a0" stroke-width="5" fill="none" opacity="0.7"/>

          <!-- 墙上挂画（中间） -->
          <rect x="130" y="22" width="98" height="70" rx="3" fill="#fff8f0" stroke="#c8a87a" stroke-width="2" filter="url(#softShadow)"/>
          <!-- 全家福内容 -->
          <rect x="133" y="25" width="92" height="64" rx="2" fill="#ffecd2"/>
          <!-- 简笔画人物 -->
          <circle cx="165" cy="45" r="6" fill="#e8b96e"/>
          <rect x="161" y="51" width="8" height="14" rx="2" fill="#4a90d9"/>
          <circle cx="185" cy="45" r="6" fill="#e8b96e"/>
          <rect x="181" y="51" width="8" height="14" rx="2" fill="#e57373"/>
          <circle cx="205" cy="48" r="5" fill="#e8b96e"/>
          <rect x="202" y="53" width="7" height="11" rx="2" fill="#81c784"/>
          <!-- 全家福文字 -->
          <text x="179" y="80" text-anchor="middle" font-size="7" fill="#a07850" font-family="serif">全家福</text>
          <!-- 画框装饰 -->
          <rect x="130" y="22" width="98" height="4" rx="1" fill="#c8a87a" opacity="0.5"/>

          <!-- 钟表 -->
          <circle cx="252" cy="40" r="20" fill="#fdf0d5" stroke="#c8a87a" stroke-width="2" filter="url(#softShadow)"/>
          <circle cx="252" cy="40" r="2" fill="#8b4513"/>
          <!-- 时针分针 -->
          <line x1="252" y1="40" x2="252" y2="27" stroke="#5c2d0a" stroke-width="2" stroke-linecap="round"/>
          <line x1="252" y1="40" x2="261" y2="44" stroke="#8b4513" stroke-width="1.5" stroke-linecap="round"/>
          <!-- 刻度 -->
          <line x1="252" y1="22" x2="252" y2="24" stroke="#c8a87a" stroke-width="1.5"/>
          <line x1="252" y1="56" x2="252" y2="58" stroke="#c8a87a" stroke-width="1.5"/>
          <line x1="234" y1="40" x2="236" y2="40" stroke="#c8a87a" stroke-width="1.5"/>
          <line x1="268" y1="40" x2="270" y2="40" stroke="#c8a87a" stroke-width="1.5"/>

          <!-- 电视柜 + 电视（右侧） -->
          <rect x="280" y="95" width="68" height="8" rx="2" fill="#6d4c41"/>
          <rect x="275" y="30" width="78" height="66" rx="4" fill="url(#tvGrad)" filter="url(#softShadow)"/>
          <!-- 电视屏幕 -->
          <rect x="279" y="34" width="70" height="54" rx="2" fill="#1e3a5f"/>
          <!-- 电视内容（播放节目） -->
          <rect x="279" y="34" width="70" height="54" rx="2" fill="#2a5298" opacity="0.6"/>
          <text x="314" y="55" text-anchor="middle" font-size="12">📺</text>
          <text x="314" y="70" text-anchor="middle" font-size="6" fill="white" opacity="0.8">新闻联播</text>
          <!-- 电视台标 -->
          <rect x="280" y="35" width="12" height="7" rx="1" fill="#cc0000" opacity="0.8"/>
          <text x="286" y="41" text-anchor="middle" font-size="5" fill="white">CCTV</text>

          <!-- 沙发（中央） -->
          <rect x="100" y="120" width="158" height="42" rx="8" fill="url(#sofaGrad)" filter="url(#softShadow)"/>
          <!-- 沙发靠背 -->
          <rect x="100" y="108" width="158" height="18" rx="6" fill="#a0522d"/>
          <!-- 沙发扶手 -->
          <rect x="88"  y="115" width="18" height="38" rx="6" fill="#a0522d"/>
          <rect x="252" y="115" width="18" height="38" rx="6" fill="#a0522d"/>
          <!-- 沙发坐垫纹 -->
          <line x1="179" y1="120" x2="179" y2="162" stroke="#6d3010" stroke-width="1.5" opacity="0.5"/>
          <!-- 沙发上的老人 -->
          <circle cx="148" cy="113" r="10" fill="#f5c07a"/><!-- 头 -->
          <text x="148" y="117" text-anchor="middle" font-size="11">👴</text>
          <!-- 茶杯 -->
          <rect x="205" y="120" width="12" height="9" rx="2" fill="#fff8f0" stroke="#c8a87a" stroke-width="1"/>
          <path d="M217,123 Q221,123 221,127 Q221,131 217,131" stroke="#c8a87a" stroke-width="1.5" fill="none"/>
          <!-- 茶杯热气 -->
          <path d="M208,118 Q210,115 208,112" stroke="#aaa" stroke-width="1" fill="none" opacity="0.5"/>
          <path d="M213,118 Q215,114 213,111" stroke="#aaa" stroke-width="1" fill="none" opacity="0.5"/>

          <!-- 盆栽（左下） -->
          <rect x="96" y="148" width="14" height="14" rx="2" fill="#8b4513"/>
          <rect x="93" y="155" width="20" height="7" rx="1" fill="#6d3010"/>
          <circle cx="103" cy="140" r="10" fill="#4caf50"/>
          <circle cx="96"  cy="143" r="7"  fill="#66bb6a"/>
          <circle cx="110" cy="143" r="7"  fill="#388e3c"/>

          <!-- 地毯 -->
          <ellipse cx="179" cy="170" rx="100" ry="18" fill="#d4a76a" opacity="0.4"/>
          <ellipse cx="179" cy="170" rx="85"  ry="13" fill="none" stroke="#c8956a" stroke-width="1.5" opacity="0.4"/>

          <!-- 光晕氛围 -->
          <radialGradient id="roomGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#fffde7" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#fffde7" stop-opacity="0"/>
          </radialGradient>
          <rect width="358" height="200" fill="url(#roomGlow)"/>
        </svg>
      </div>
    `;
  },

  // 厨房场景（下厨小游戏背景）
  kitchen() {
    return `
      <div style="padding:0 16px 0;margin-top:8px;">
        <svg viewBox="0 0 358 160" xmlns="http://www.w3.org/2000/svg"
          style="width:100%;border-radius:14px;display:block;box-shadow:0 4px 18px rgba(0,0,0,0.3);">
          <defs>
            <linearGradient id="kitchenWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef9f0"/>
              <stop offset="100%" stop-color="#f5e6c8"/>
            </linearGradient>
            <linearGradient id="counterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e0e0e0"/>
              <stop offset="100%" stop-color="#bdbdbd"/>
            </linearGradient>
          </defs>
          <!-- 墙 + 地 -->
          <rect width="358" height="105" fill="url(#kitchenWall)"/>
          <rect y="105" width="358" height="55" fill="#d7ccc8"/>
          <!-- 瓷砖纹 -->
          <line x1="0" y1="120" x2="358" y2="120" stroke="#bcaaa4" stroke-width="0.5" opacity="0.6"/>
          <line x1="0" y1="135" x2="358" y2="135" stroke="#bcaaa4" stroke-width="0.5" opacity="0.6"/>
          <line x1="0" y1="150" x2="358" y2="150" stroke="#bcaaa4" stroke-width="0.5" opacity="0.6"/>

          <!-- 墙面瓷砖 -->
          <rect x="0" y="78" width="358" height="28" fill="#e8f5e9" opacity="0.6"/>
          <line x1="0" y1="92" x2="358" y2="92" stroke="#c8e6c9" stroke-width="0.5"/>
          <line x1="60" y1="78" x2="60" y2="106" stroke="#c8e6c9" stroke-width="0.5"/>
          <line x1="120" y1="78" x2="120" y2="106" stroke="#c8e6c9" stroke-width="0.5"/>
          <line x1="180" y1="78" x2="180" y2="106" stroke="#c8e6c9" stroke-width="0.5"/>
          <line x1="240" y1="78" x2="240" y2="106" stroke="#c8e6c9" stroke-width="0.5"/>
          <line x1="300" y1="78" x2="300" y2="106" stroke="#c8e6c9" stroke-width="0.5"/>

          <!-- 橱柜（上） -->
          <rect x="0" y="8" width="120" height="66" rx="3" fill="#795548"/>
          <rect x="130" y="8" width="100" height="66" rx="3" fill="#795548"/>
          <rect x="240" y="8" width="118" height="66" rx="3" fill="#795548"/>
          <!-- 柜门 -->
          <rect x="4" y="12" width="54" height="58" rx="2" fill="#8d6e63"/>
          <rect x="62" y="12" width="54" height="58" rx="2" fill="#8d6e63"/>
          <rect x="134" y="12" width="44" height="58" rx="2" fill="#8d6e63"/>
          <rect x="182" y="12" width="44" height="58" rx="2" fill="#8d6e63"/>
          <rect x="244" y="12" width="54" height="58" rx="2" fill="#8d6e63"/>
          <rect x="302" y="12" width="52" height="58" rx="2" fill="#8d6e63"/>
          <!-- 柜门把手 -->
          <rect x="28"  y="38" width="8" height="3" rx="1" fill="#a1887f"/>
          <rect x="86"  y="38" width="8" height="3" rx="1" fill="#a1887f"/>
          <rect x="153" y="38" width="8" height="3" rx="1" fill="#a1887f"/>
          <rect x="201" y="38" width="8" height="3" rx="1" fill="#a1887f"/>
          <rect x="268" y="38" width="8" height="3" rx="1" fill="#a1887f"/>
          <rect x="326" y="38" width="8" height="3" rx="1" fill="#a1887f"/>

          <!-- 台面 -->
          <rect x="0" y="105" width="358" height="12" rx="2" fill="url(#counterGrad)"/>

          <!-- 燃气灶 -->
          <rect x="40" y="82" width="90" height="26" rx="4" fill="#424242"/>
          <circle cx="72"  cy="95" r="10" fill="#616161"/>
          <circle cx="72"  cy="95" r="6"  fill="#424242"/>
          <circle cx="108" cy="95" r="10" fill="#616161"/>
          <circle cx="108" cy="95" r="6"  fill="#424242"/>
          <!-- 火焰 -->
          <text x="72"  y="99" text-anchor="middle" font-size="8">🔵</text>
          <text x="108" y="99" text-anchor="middle" font-size="8">🔴</text>
          <!-- 锅 -->
          <ellipse cx="108" cy="88" rx="14" ry="5" fill="#757575"/>
          <rect x="94" y="78" width="28" height="11" rx="2" fill="#616161"/>
          <rect x="120" y="81" width="10" height="3" rx="1" fill="#9e9e9e"/>

          <!-- 水槽 -->
          <rect x="200" y="82" width="70" height="26" rx="3" fill="#9e9e9e"/>
          <rect x="204" y="85" width="60" height="20" rx="2" fill="#78909c"/>
          <!-- 水龙头 -->
          <rect x="228" y="76" width="4" height="12" rx="2" fill="#b0bec5"/>
          <rect x="224" y="74" width="12" height="4" rx="2" fill="#b0bec5"/>

          <!-- 装饰：墙上挂的蔬菜 -->
          <text x="310" y="60" font-size="16">🧅</text>
          <text x="330" y="55" font-size="14">🌶️</text>
          <text x="318" y="40" font-size="13">🫚</text>

          <!-- 窗户（右） -->
          <rect x="148" y="12" width="0" height="0"/><!-- 已有橱柜遮住，不显示窗户 -->

          <!-- 小植物 -->
          <rect x="170" y="97" width="10" height="10" rx="2" fill="#6d4c41"/>
          <circle cx="175" cy="92" r="7" fill="#4caf50"/>

          <!-- 老人图标 -->
          <text x="22" y="132" font-size="24">👩‍🍳</text>
          <text x="50" y="128" font-size="11" fill="#795548">今天做什么好呢...</text>
        </svg>
      </div>
    `;
  },

  // 结局场景（温馨的傍晚）
  evening() {
    return `
      <div style="padding:0 16px 12px;">
        <svg viewBox="0 0 358 180" xmlns="http://www.w3.org/2000/svg"
          style="width:100%;border-radius:14px;display:block;box-shadow:0 4px 18px rgba(0,0,0,0.4);">
          <defs>
            <linearGradient id="eveningSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1a1a3e"/>
              <stop offset="50%" stop-color="#4a2060"/>
              <stop offset="100%" stop-color="#c05050"/>
            </linearGradient>
            <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#2d4a22"/>
              <stop offset="100%" stop-color="#1a2e14"/>
            </linearGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fff9c4" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#fff9c4" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <!-- 夜空 -->
          <rect width="358" height="140" fill="url(#eveningSky)"/>
          <!-- 地面 -->
          <rect y="140" width="358" height="40" fill="url(#groundGrad)"/>

          <!-- 月亮 -->
          <circle cx="290" cy="35" r="22" fill="url(#moonGlow)"/>
          <circle cx="290" cy="35" r="16" fill="#fff9c4"/>
          <circle cx="298" cy="29" r="5" fill="#f5e642" opacity="0.3"/>
          <!-- 星星 -->
          <text x="40"  y="22" font-size="8">⭐</text>
          <text x="90"  y="14" font-size="6">✨</text>
          <text x="150" y="20" font-size="7">⭐</text>
          <text x="220" y="12" font-size="6">✨</text>
          <text x="60"  y="45" font-size="5">✦</text>
          <text x="130" y="40" font-size="5">✦</text>
          <text x="200" y="50" font-size="6">✨</text>
          <text x="250" y="40" font-size="5">✦</text>
          <text x="330" y="25" font-size="5">✦</text>

          <!-- 远处城市楼轮廓 -->
          <rect x="10"  y="95"  width="20" height="45" fill="#0d1b2a" opacity="0.8"/>
          <rect x="35"  y="85"  width="25" height="55" fill="#0d1b2a" opacity="0.8"/>
          <rect x="65"  y="100" width="15" height="40" fill="#0d1b2a" opacity="0.8"/>
          <rect x="270" y="90"  width="22" height="50" fill="#0d1b2a" opacity="0.8"/>
          <rect x="300" y="80"  width="28" height="60" fill="#0d1b2a" opacity="0.8"/>
          <rect x="332" y="98"  width="18" height="42" fill="#0d1b2a" opacity="0.8"/>
          <!-- 楼上亮灯 -->
          <rect x="14"  y="100" width="5" height="5" fill="#ffe082" opacity="0.7"/>
          <rect x="22"  y="108" width="5" height="5" fill="#ffe082" opacity="0.5"/>
          <rect x="40"  y="92"  width="5" height="5" fill="#ffe082" opacity="0.8"/>
          <rect x="50"  y="100" width="5" height="5" fill="#ffe082" opacity="0.6"/>
          <rect x="274" y="96"  width="5" height="5" fill="#ffe082" opacity="0.7"/>
          <rect x="307" y="88"  width="5" height="5" fill="#ffe082" opacity="0.8"/>
          <rect x="316" y="98"  width="5" height="5" fill="#ffe082" opacity="0.5"/>

          <!-- 广场（主舞台） -->
          <ellipse cx="179" cy="148" rx="130" ry="20" fill="#1a3a12" opacity="0.8"/>
          <!-- 广场灯光 -->
          <line x1="100" y1="100" x2="100" y2="148" stroke="#666" stroke-width="2"/>
          <circle cx="100" cy="100" r="6" fill="#ffe082" opacity="0.9"/>
          <line x1="258" y1="100" x2="258" y2="148" stroke="#666" stroke-width="2"/>
          <circle cx="258" cy="100" r="6" fill="#ffe082" opacity="0.9"/>

          <!-- 广场舞人群 -->
          <text x="130" y="148" font-size="18">💃</text>
          <text x="156" y="145" font-size="16">👴</text>
          <text x="180" y="148" font-size="18">🕺</text>
          <text x="204" y="145" font-size="16">👵</text>
          <text x="228" y="148" font-size="17">💃</text>

          <!-- 音符飘浮 -->
          <text x="118" y="128" font-size="12" fill="#ffe082" opacity="0.8">♪</text>
          <text x="248" y="122" font-size="14" fill="#ffe082" opacity="0.7">♫</text>
          <text x="180" y="120" font-size="11" fill="#ffe082" opacity="0.6">♩</text>

          <!-- 氛围光 -->
          <radialGradient id="plazaLight" cx="50%" cy="80%" r="50%">
            <stop offset="0%" stop-color="#ffe082" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#ffe082" stop-opacity="0"/>
          </radialGradient>
          <rect width="358" height="180" fill="url(#plazaLight)"/>
        </svg>
      </div>
    `;
  },
};
