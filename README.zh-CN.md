# 个性化图灵测试标注平台 · 演示

[English](README.md) · [标注者视角](https://davidmiao1127.github.io/PTT-Lab-Demo/) · [研究者视角](https://davidmiao1127.github.io/PTT-Lab-Demo/#admin) · [完整平台源码](https://github.com/DavidMiao1127/PTT-Lab)

PTT-Lab 的交互式演示，展示标注与研究者复核流程，界面支持中英文切换。

- **标注者**选择学者和资料展示条件，阅读对应资料，完成匿名 A/B 判断、信心评分，并填写理由和原文证据。
- **研究者**按文本粒度、资料展示条件和八种基线查看模拟统计，也可逐轮检查标注记录、文本选区和鼠标轨迹。演示共包含 162 轮、3,888 次模拟判断。
- **题库交换**支持导出带编号的任务，以及通过 JSONL 导入生成结果或完整配对。导入后可在同一页面会话内切换到标注者视角体验。

## 题库

随包样例覆盖法律、经济学、哲学、计算机科学和文学五个领域，共 **21 位化名学者、630 对文本**。每位学者有 10 道篇章生成、10 道段落补全和 10 道句子补全。

浏览器可读取题库及答案。研究者视图的结果和交互轨迹均为模拟数据。刷新页面会清除导入内容和本轮标注进度。

## 本地运行

使用 Node.js 24 和 pnpm 11.25.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

预览生产构建：

```sh
pnpm build
pnpm preview
```

打开终端显示的本地地址。地址末尾加上 `#admin` 可进入研究者视角。

## GitHub Pages

在 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。仓库自带工作流，会在推送到 `main` 后构建并发布 `dist/`，也可从 Actions 手动运行。
