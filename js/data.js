// ============================================================
// data.js — 游戏数据层（道具、事件、对话、结局文本）
// ============================================================

const GameData = {

  // ---------- 基础配置 ----------
  TOTAL_WEEKS: 8,
  INIT_BUDGET: 400,        // 初始周费（减少，更紧张）
  WEEKLY_BUDGET: 150,      // 每周补给（减少）
  WEEKEND_AP: 3,           // 周末行动点
  WEEKDAY_ACTION_LIMIT: 3, // 每周中最多行动次数（任务+购物合计）

  // ---------- 结局门槛 ----------
  ENDING_TRUE:   { digital: 78, social: 78, health: 62 },  // 三维全达标才是真结局
  ENDING_NORMAL: 180,   // 三维之和 ≥ 180 → 普通结局

  // ---------- 老人设定 ----------
  elders: [
    {
      id: 'grandpa',
      name: '爷爷',
      avatar: '👴',
      conditions: ['轻度高血压', '膝盖不好'],
      baseDigital: 8,
      baseSocial: 25,
      baseHealth: 55,
      moods: {
        happy:   ['今天广场上有人教我扫码点餐，真方便！', '你寄来的药盒响了，我准时吃药了！', '邻居老王拉我下棋，赢了两局，开心！'],
        neutral: ['还好，就是有点无聊。', '电视剧不好看，换了几个台。', '你上次教的视频，我忘了怎么操作了…'],
        worried: ['那个电话又来了，说让我买保健品，我没接。', '浴室那块地砖有点滑，你有空换一下？', '腿有点酸，最近少出门了。'],
      }
    },
    {
      id: 'grandma',
      name: '奶奶',
      avatar: '👵',
      conditions: ['轻度糖尿病', '睡眠不好'],
      baseDigital: 5,
      baseSocial: 40,
      baseHealth: 50,
      moods: {
        happy:   ['今天和楼下的李大妈跳舞去了，开心！', '你教的那个发语音，我会了！', '广场上来了个卖糖葫芦的，好甜。'],
        neutral: ['就那样吧，一个人吃饭没什么胃口。', '昨晚又没睡好，想你们了。', '手机屏幕太小，看着费眼睛。'],
        worried: ['有人加我微信说能领红包，我没点。', '昨天差点在浴室滑倒，吓我一跳。', '血糖仪不会用，又忘了怎么测了。'],
      }
    }
  ],

  // ---------- 商店道具（每件购买算1次行动）----------
  shopItems: [
    {
      id: 'medicine_box',
      name: '智能药盒',
      icon: '💊',
      price: 89,
      effect: { health: +12 },
      effectDesc: '健康 +12，每天定时提醒吃药',
      tag: '健康必备',
      psa: '老年人用药依从性普遍偏低，智能药盒可将漏服率降低约 60%。',
    },
    {
      id: 'anti_slip_mat',
      name: '防滑地垫',
      icon: '🛁',
      price: 45,
      effect: { health: +8 },
      effectDesc: '健康 +8，防止浴室滑倒',
      tag: '安全改造',
      psa: '跌倒是老年人因伤死亡的首位原因，浴室是事故高发地带。',
      preventsEvent: 'bathroom_fall',
    },
    {
      id: 'big_font_phone',
      name: '大字体手机壳',
      icon: '📱',
      price: 30,
      effect: { digital: +7 },
      effectDesc: '数字能力 +7，减少误操作',
      tag: '数字辅助',
    },
    {
      id: 'blood_pressure',
      name: '智能血压计',
      icon: '🩺',
      price: 120,
      effect: { health: +18 },
      effectDesc: '健康 +18，随时监测三高',
      tag: '健康监测',
    },
    {
      id: 'dance_shoes',
      name: '广场舞专用鞋',
      icon: '👟',
      price: 60,
      effect: { social: +8, health: +4 },
      effectDesc: '社交 +8，健康 +4',
      tag: '社交助力',
    },
    {
      id: 'reading_lamp',
      name: '护眼阅读灯',
      icon: '💡',
      price: 55,
      effect: { digital: +4, health: +4 },
      effectDesc: '数字能力 +4，健康 +4',
      tag: '生活品质',
    },
    {
      id: 'tablet',
      name: '平板电脑（二手）',
      icon: '💻',
      price: 150,
      effect: { digital: +18 },
      effectDesc: '数字能力 +18，大屏更好用',
      tag: '数字升级',
    },
    {
      id: 'chess_set',
      name: '象棋套装',
      icon: '♟️',
      price: 35,
      effect: { social: +10 },
      effectDesc: '社交 +10，招募棋友',
      tag: '社交道具',
    },
  ],

  // ---------- 周中任务（每完成一项算1次行动）----------
  weekdayTasks: [
    {
      id: 'dance_3times',
      name: '广场舞打卡 3 次',
      icon: '💃',
      desc: '鼓励老人本周跳广场舞',
      effect: { social: +10 },
    },
    {
      id: 'video_call',
      name: '每日视频通话',
      icon: '📹',
      desc: '每天视频聊 10 分钟',
      effect: { health: +7, social: +4 },
    },
    {
      id: 'read_news',
      name: '手机阅读打卡',
      icon: '📰',
      desc: '每天用手机看新闻或小说',
      effect: { digital: +8 },
    },
    {
      id: 'order_meal',
      name: '教网上订餐',
      icon: '🍱',
      desc: '电话指导老人用外卖 App',
      effect: { digital: +7 },
    },
    {
      id: 'community_activity',
      name: '报名社区活动',
      icon: '🏘️',
      desc: '帮老人在微信上报名居委会活动',
      effect: { social: +9 },
    },
    {
      id: 'health_check',
      name: '提醒体检预约',
      icon: '🏥',
      desc: '帮老人网上预约体检',
      effect: { health: +9 },
    },
  ],

  // ---------- 周末活动池（按周轮换，避免重复）----------
  // minigame 字段：指定具体小游戏 id（null 表示无小游戏直接给奖励）
  weekendActivities: [
    {
      id: 'teach_phone',
      name: '防诈骗演练',
      icon: '🔐',
      desc: '模拟诈骗电话，手把手应对',
      ap: 1,
      minigame: 'fraud',
      baseEffect: { digital: +10 },
      tag: '数字能力',
      tagClass: 'info',
    },
    {
      id: 'cook_together',
      name: '爱心下厨',
      icon: '🍳',
      desc: '根据三高状况搭配健康食材',
      ap: 1,
      minigame: 'cooking',
      baseEffect: { health: +10 },
      tag: '健康',
      tagClass: 'warning',
    },
    {
      id: 'outing',
      name: '陪同出行',
      icon: '🌳',
      desc: '去公园、菜市场认识邻居',
      ap: 1,
      minigame: 'social',
      baseEffect: { social: +10 },
      tag: '社交',
      tagClass: 'success',
    },
    {
      id: 'photo_album',
      name: '整理手机相册',
      icon: '📸',
      desc: '教老人整理、分类手机照片',
      ap: 1,
      minigame: 'memory',
      baseEffect: { digital: +10 },
      tag: '数字能力',
      tagClass: 'info',
    },
    {
      id: 'dance_lesson',
      name: '广场舞排练',
      icon: '🕺',
      desc: '和老人一起练习广场舞步',
      ap: 1,
      minigame: 'dance',
      baseEffect: { social: +10, health: +5 },
      tag: '社交',
      tagClass: 'success',
    },
    {
      id: 'deep_chat',
      name: '深度陪伴',
      icon: '🤗',
      desc: '坐下来聊聊近况，听老人讲往事',
      ap: 1,
      minigame: null,
      baseEffect: { health: +8, social: +6 },
      tag: '幸福感',
      tagClass: 'warning',
    },
  ],

  // 每周展示哪些活动（6 个活动，每周抽 4 个，保证多样性）
  weeklyActivitySets: [
    ['teach_phone',  'cook_together', 'outing',        'deep_chat'],
    ['photo_album',  'dance_lesson',  'outing',        'cook_together'],
    ['teach_phone',  'photo_album',   'dance_lesson',  'deep_chat'],
    ['cook_together','outing',        'photo_album',   'teach_phone'],
    ['dance_lesson', 'deep_chat',     'teach_phone',   'cook_together'],
    ['outing',       'photo_album',   'dance_lesson',  'deep_chat'],
    ['teach_phone',  'cook_together', 'dance_lesson',  'outing'],
    ['photo_album',  'deep_chat',     'outing',        'teach_phone'],
  ],

  // ---------- 随机事件 ----------
  randomEvents: [
    {
      id: 'fraud_call',
      title: '📞 诈骗电话来袭！',
      desc: '爷爷/奶奶接到推销保健品的电话，对方声称"买够 3000 元免费赠送治百病补品"。',
      icon: '🚨',
      type: 'danger',
      trigger: 'always',
      autoHandle: { stat: 'digital', threshold: 50 },
      autoHandleDesc: '数字生存力够，老人已识破诈骗，挂断电话！',
      failDesc: '老人差点上当！下周需要你专门做防诈骗演练（否则扣健康）。',
      failPenalty: { health: -12 },
      psa: '每年老年人因电信诈骗损失超过 1000 亿元。及时提高老人数字防范意识至关重要。',
    },
    {
      id: 'bathroom_fall',
      title: '🛁 浴室险情！',
      desc: '老人在浴室洗澡时不小心滑了一下，万幸没大碍——但需要立刻处理。',
      icon: '⚠️',
      type: 'danger',
      trigger: 'always',
      preventedBy: 'anti_slip_mat',
      preventedDesc: '之前购买的防滑地垫发挥了作用，老人安然无恙！',
      choices: [
        { text: '立刻拨打 120，描述情况，不随意搬动', correct: true,  desc: '正确！跌倒后不能随意活动，专业急救更安全。' },
        { text: '让老人自己慢慢站起来活动一下', correct: false, desc: '错误！可能存在骨折，随意活动会加重伤情。' },
        { text: '先帮老人做几下拉伸，活动关节', correct: false, desc: '错误！未排除骨折前不能做运动。' },
      ],
      psa: '正确做法：① 不急于站起 ② 检查是否剧烈疼痛 ③ 不能排除骨折立刻拨 120 ④ 等待救援保持静止',
    },
    {
      id: 'community_movie',
      title: '🎬 社区温情：电影邀约',
      desc: '邻居王大爷邀请去居委会看电影《老人与海》，还有免费点心！',
      icon: '🌟',
      type: 'good',
      trigger: 'always',
      autoHandle: { stat: 'social', threshold: 35 },
      autoHandleDesc: '社交值不错，老人愉快赴约，带回道具"快乐心情"！',
      autoHandleReward: { health: +8, social: +6 },
      failDesc: '老人不太愿意出门，错过了这次交流机会。',
    },
    {
      id: 'grandchild_call',
      title: '📲 孙辈视频来电',
      desc: '你的孩子（老人的孙辈）来电了，老人想接但不知道怎么接视频。',
      icon: '😊',
      type: 'good',
      trigger: 'always',
      autoHandle: { stat: 'digital', threshold: 30 },
      autoHandleDesc: '数字能力够了，成功接通视频，开心聊了半小时！',
      autoHandleReward: { health: +10, digital: +4 },
      failDesc: '错过了视频，老人有点失落。',
      failPenalty: { health: -8 },
    },
    {
      id: 'solar_scam',
      title: '⚡ 上门推销"太阳能补贴"',
      desc: '陌生人上门，声称政府补贴项目，需预付 200 元"材料费"。',
      icon: '🚨',
      type: 'danger',
      trigger: 'after_week3',
      autoHandle: { stat: 'digital', threshold: 60 },
      autoHandleDesc: '老人已能识别上门诈骗，礼貌拒绝并上报居委会！',
      failDesc: '老人交了 200 元，再也联系不上对方。',
      failPenalty: { health: -12, social: -6 },
      psa: '上门诈骗守则：不随意让陌生人进门、不当场签字、不交押金。',
    },
    {
      id: 'heat_wave',
      title: '🌡️ 高温天气预警',
      desc: '本周持续高温，老人独自在家，是否做好了防暑准备？',
      icon: '☀️',
      type: 'danger',
      trigger: 'after_week3',
      autoHandle: { stat: 'health', threshold: 55 },
      autoHandleDesc: '健康值不错，老人知道多喝水、开空调，安全度夏！',
      autoHandleReward: { health: +5 },
      failDesc: '老人有些中暑症状，健康值下降。',
      failPenalty: { health: -15 },
      psa: '老年人高温风险更高：体温调节能力下降，需每天补充至少 1500ml 水分。',
    },
  ],

  // ---------- 结局文本 ----------
  endings: {
    bad: {
      type: 'bad',
      icon: '😔',
      title: '孤独的留守',
      titleClass: 'bad',
      story: `暑假结束了。\n\n老人依然坐在电视机前，换了一个又一个台，找不到想看的节目。手机还是那个手机，锁屏密码忘了好几次。\n\n你发去的消息，有时候过了两天才被看见。\n\n不是不爱，只是——距离太远，而时间总是不够用。`,
      psa: '中国有超过 9000 万空巢老人。"数字鸿沟"让他们在信息化时代愈加孤立。每一次耐心的陪伴，都是真实的爱。',
    },
    normal: {
      type: 'normal',
      icon: '😊',
      title: '规律的生活',
      titleClass: 'normal',
      story: `这个暑假，改变在悄悄发生。\n\n老人学会了用微信视频，每天早上发来一条语音："吃了没？"药盒每天准时响，已经成了生活节奏的一部分。\n\n广场舞偶尔去，遇到奇怪的电话知道挂掉了。\n\n生活，在慢慢变好。但还有一些路，等着你们一起走。`,
      psa: '适老化改造不只是硬件，更包括家人持续的陪伴、引导和倾听。',
    },
    true: {
      type: 'true',
      icon: '🌟',
      title: '银发弄潮儿',
      titleClass: 'true',
      story: `谁说老年人跟不上时代？\n\n爷爷/奶奶现在是广场舞领队，负责统计大家的微信联系方式；会用手机挂号，再也不用凌晨 4 点排队；还加入了社区象棋社/读书群，每周分享一篇文章。\n\n上次有人打来诈骗电话，他/她直接当场戳穿，对方语塞挂机——居委会表扬了他/她。\n\n你们的距离，从来不是真正的距离。`,
      psa: '数字包容是老龄化社会的核心议题。让老年人真正融入数字生活，需要政策、社区、家庭的共同努力。你做到了属于你的那一份。',
    },
  },

  // ---------- 小游戏数据 ----------

  fraudQuestions: [
    {
      scenario: '电话里说："您中奖了！只需缴纳 500 元手续费，即可领取 5 万元大奖。"',
      options: [
        { text: '立刻挂断，不理会', correct: true },
        { text: '问清楚怎么缴费', correct: false },
        { text: '先付钱，之后再说', correct: false },
        { text: '让对方说说是什么奖品', correct: false },
      ],
      explanation: '凡是要先交钱才能领奖的，100% 是诈骗。天上不会掉馅饼。',
    },
    {
      scenario: '"我是你儿子同事，他出事了，现在在派出所，你先给我转 2000 元救急……"',
      options: [
        { text: '挂断，直接打儿子电话核实', correct: true },
        { text: '赶紧转账救急', correct: false },
        { text: '先问对方叫什么名字', correct: false },
        { text: '答应了再说', correct: false },
      ],
      explanation: '遇到"家人出事急需钱"，第一步永远是挂断，直接拨打家人电话核实。',
    },
    {
      scenario: '有人加微信说："我们是国家养老保障部门，帮你申请补贴，请发身份证照片核实。"',
      options: [
        { text: '不发，拒绝并举报', correct: true },
        { text: '发过去，补贴要紧', correct: false },
        { text: '问问要多少补贴再决定', correct: false },
        { text: '问问需要什么资料', correct: false },
      ],
      explanation: '任何要求提供身份证照片的陌生联系，都要高度警惕。国家部门不会通过微信主动联系你。',
    },
    {
      scenario: '"老人家，您的医保卡积分到期了，点这个链接立刻兑换现金！"',
      options: [
        { text: '不点链接，挂断电话', correct: true },
        { text: '点开链接看看', correct: false },
        { text: '问问积分怎么算的', correct: false },
        { text: '让对方发短信过来', correct: false },
      ],
      explanation: '医保积分诈骗是近年高发套路。官方不会通过电话发送链接，遇到一律挂断。',
    },
  ],

  cookingIngredients: [
    { name: '燕麦', emoji: '🌾', goodFor: ['高血压', '糖尿病'], badFor: [], flag: '低GI' },
    { name: '菠菜', emoji: '🥬', goodFor: ['高血压', '贫血'], badFor: [], flag: '富含钾' },
    { name: '三文鱼', emoji: '🐟', goodFor: ['高血压', '心脏'], badFor: [], flag: 'Omega-3' },
    { name: '白萝卜', emoji: '🥕', goodFor: ['消化', '糖尿病'], badFor: [], flag: '低卡' },
    { name: '豆腐', emoji: '🧈', goodFor: ['高血压', '糖尿病'], badFor: [], flag: '植物蛋白' },
    { name: '鸡胸肉', emoji: '🍗', goodFor: ['蛋白质'], badFor: [], flag: '低脂' },
    { name: '炸薯条', emoji: '🍟', goodFor: [], badFor: ['高血压', '糖尿病', '高血脂'], flag: '⚠️禁忌' },
    { name: '腌咸菜', emoji: '🥒', goodFor: [], badFor: ['高血压'], flag: '⚠️高盐' },
    { name: '蛋糕', emoji: '🍰', goodFor: [], badFor: ['糖尿病', '高血脂'], flag: '⚠️高糖' },
    { name: '苦瓜', emoji: '🫑', goodFor: ['糖尿病'], badFor: [], flag: '降血糖' },
    { name: '全麦面包', emoji: '🍞', goodFor: ['糖尿病', '消化'], badFor: [], flag: '高纤维' },
    { name: '可乐', emoji: '🥤', goodFor: [], badFor: ['糖尿病', '高血压'], flag: '⚠️高糖' },
  ],

  socialDialogues: [
    {
      location: '公园',
      npc: '王大爷',
      npcEmoji: '🧓',
      intro: '王大爷正坐在公园棋盘旁，看见你们走来，热情打招呼："哟，孩子回来了！来下一局？"',
      choices: [
        { text: '坐下来一起下棋，并介绍老人认识周围邻居', outcome: 'great', effect: { social: +15 }, reply: '太棒了！这一下午，老人认识了三位新棋友，还约好每周三下午见面。' },
        { text: '礼貌回应，带老人在公园散了一圈步', outcome: 'good', effect: { social: +8, health: +5 }, reply: '不错！散步聊天，老人气色好了很多。' },
        { text: '说有点累，找借口离开了', outcome: 'miss', effect: {}, reply: '哎，错过了结交新朋友的好机会。' },
      ],
    },
    {
      location: '菜市场',
      npc: '李大妈',
      npcEmoji: '👩‍🦳',
      intro: '买菜途中，遇到了李大妈。她拉住老人说："居委会这周六有个健康讲座，来不？"',
      choices: [
        { text: '帮老人记下时间，鼓励他/她参加', outcome: 'great', effect: { social: +12, health: +5 }, reply: '老人参加了讲座，学到了很多健康知识，还和讲师加了微信！' },
        { text: '说要看看情况，让老人自己决定', outcome: 'good', effect: { social: +5 }, reply: '老人有点兴趣，还在观望。' },
        { text: '帮老人婉拒，说最近比较忙', outcome: 'miss', effect: { social: -5 }, reply: '老人有些失落，错过了一次社区活动。' },
      ],
    },
    {
      location: '社区广场',
      npc: '广场舞队长张阿姨',
      npcEmoji: '💃',
      intro: '广场舞队长张阿姨走过来："你们家老人怎么不来跳舞？我们缺个人带口风琴！"',
      choices: [
        { text: '立刻答应，下周就来，还帮老人加了微信群', outcome: 'great', effect: { social: +14, health: +6 }, reply: '老人成了广场舞常客，还负责记录每天的出勤！社交大涨！' },
        { text: '说老人腿脚不太方便，先旁观几次', outcome: 'good', effect: { social: +7 }, reply: '老人在旁边看了好几次，慢慢产生了兴趣。' },
        { text: '谢谢好意，说老人不感兴趣', outcome: 'miss', effect: {}, reply: '老人看着别人跳舞，眼里有点羡慕。' },
      ],
    },
  ],

  // 记忆翻牌数据（6 对，共 12 张）
  memoryCards: [
    { id: 'wechat',   icon: '💬', name: '微信' },
    { id: 'camera',   icon: '📷', name: '相机' },
    { id: 'map',      icon: '🗺️', name: '地图' },
    { id: 'payment',  icon: '💳', name: '支付' },
    { id: 'health',   icon: '🏥', name: '挂号' },
    { id: 'video',    icon: '🎬', name: '视频' },
  ],

  // 广场舞节奏序列
  danceSequences: [
    ['👆','👇','👈','👉'],
    ['👈','👆','👉','👇','👆'],
    ['👇','👈','👆','👉','👈','👇'],
    ['👆','👆','👇','👈','👉','👆','👇'],
  ],
};
