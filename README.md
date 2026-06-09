# 🏠 银发守护者 — Silver Guardian

> 一款关于陪伴与数字包容的养成模拟游戏  
> **联系作者：yuyue.23@intl.zju.edu.cn**

---

## 🎮 游戏简介

帮助独居老人跨越"数字鸿沟"，在 8 周内通过远程布置任务和周末回家陪伴，
提升老人的**数字生存力 · 健康幸福感 · 社交活跃度**，达成不同结局。

- 📞 **周中阶段**：每周仅 3 次行动机会，购物或布置任务二选一
- 🏠 **周末阶段**：3 点行动力，触发 5 种互动小游戏（按周轮换）
- 🎲 **随机事件**：诈骗电话、浴室险情、社区邀约……道具和属性影响结果
- 🏆 **三种结局**：坏结局 / 普通结局 / 银发弄潮儿（真结局需三项属性全达标）

---

## 🚀 GitHub Pages 部署步骤

### 第一步：在 GitHub 新建仓库

1. 打开 [github.com](https://github.com) → 右上角 **New repository**
2. Repository name 填写：`elderly_care_game`
3. 勾选 **Public**（GitHub Pages 免费版需要公开仓库）
4. **不要**勾选 "Initialize this repository with a README"（已有本地文件）
5. 点击 **Create repository**

### 第二步：上传代码

**方式 A — 网页直接上传（最简单）**

1. 进入新建的仓库页面
2. 点击 **uploading an existing file** 链接
3. 把 `game/` 文件夹里的**所有内容**（包括 `index.html`、`css/`、`js/`、`.nojekyll`）拖入上传框
4. 提交：Commit message 填 `Initial commit`，点 **Commit changes**

> ⚠️ 注意：需要把 `css/` 和 `js/` 子文件夹里的文件也全部选中上传

**方式 B — Git 命令行**

```bash
cd /path/to/game
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/elderly_care_game.git
git push -u origin main
```

### 第三步：开启 GitHub Pages

1. 进入仓库 → 点击 **Settings**（顶部标签）
2. 左侧菜单找到 **Pages**
3. Source 选择：**Deploy from a branch**
4. Branch 选择：**main** / **(root)**
5. 点击 **Save**

### 第四步：访问游戏

约 1~3 分钟后，页面会显示你的游戏网址：

```
https://你的用户名.github.io/elderly_care_game/
```

复制该链接即可分享，评委点开即玩 ✅

---

## 📁 文件结构

```
elderly_care_game/
├── index.html              入口（点开即玩）
├── .nojekyll               GitHub Pages 配置
├── README.md               本文件
├── css/
│   └── style.css           全局样式
└── js/
    ├── data.js             游戏数据（道具/事件/对话/结局）
    ├── state.js            状态管理 + 存档
    ├── ui.js               UI 组件
    ├── main.js             主控制器
    ├── scenes/
    │   ├── room.js         SVG 场景插图（客厅/厨房/夜晚广场）
    │   ├── start.js        开始界面
    │   ├── weekday.js      周中远程布置
    │   ├── weekend.js      周末回家陪伴
    │   ├── event.js        随机事件处理
    │   └── ending.js       三种结局展示
    └── minigames/
        ├── fraud.js        防诈骗问答
        ├── cooking.js      三高食材搭配
        ├── social.js       NPC 对话选择
        ├── memory.js       手机 App 记忆翻牌
        └── dance.js        广场舞节奏游戏
```

---

## 🎯 真结局达成条件

| 属性 | 需要达到 |
|------|---------|
| 📱 数字生存力 | ≥ 78 |
| 👥 社交活跃度 | ≥ 78 |
| ❤️ 健康幸福感 | ≥ 62 |

> 提示：合理分配每周 3 次行动机会，搭配购物道具和互动小游戏，并尽量避免随机事件的负面影响。

---

*作者：yuyue.23@intl.zju.edu.cn*
