# 个性化图灵测试标注平台 · 静态演示

沿用正式平台的界面与操作流程。标注者从首页开始，管理者从同一页面的「管理者视角」进入，也可直接打开 `#admin`。界面支持中英文切换。

- **标注者**：从法律、经济学、哲学、计算机科学、文学五个领域选择学者，按角色阅读资料，完成 A/B 判断和信心评分，再为抽中的题填写理由并引用原文。
- **研究者**：查看 162 轮模拟标注的汇总及按粒度、资料展示、生成基线分组的统计，或逐轮检查选区停留、理由和鼠标轨迹。可导出题库任务，上传生成结果或 A/B 配对。上传后，在同一标签页切回标注者视角开启三题轮次，可看到新导入的题目。

内置 21 位学者的 630 对文本，每位各有 10 对篇章生成、10 对段落补全和 10 对句子补全。选择单个学者并设为 30 题可查看该学者的全部题目，也可多选学者。管理端的示例标注结果和轨迹是另设的模拟记录。浏览器可读取静态题库和答案，导入与本轮交互记录刷新后清除。

## 本地启动

使用 Node.js 24 与 pnpm 11.25.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 发布到 GitHub Pages

将本目录作为独立仓库推送到 `main`。在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。推送或在 Actions 中手动运行 **Deploy static demo to GitHub Pages**。工作流构建并发布 `dist/`，项目站点使用 `https://<owner>.github.io/<repo>/`。相对资源路径和页面锚点也支持部署在用户站点根路径。[GitHub Pages 工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

目标为空仓库时，可从本目录运行：

```sh
git init -b main
git add .
git commit -m "Add static annotation demo"
git remote add origin https://github.com/OWNER/REPO.git
git push -u origin main
```

将命令中的仓库地址换成实际远端地址，再在 GitHub 上启用 Pages。

## 测试导入

1. 打开管理者视角，下载「导入示例」，或先导出真实文本与任务并复制 `item_id`。
2. 上传 UTF-8 JSONL。生成结果格式需 `item_id`、`method` 和 `generated_text`。完整 A/B 格式使用 `a`、`b` 和 `real`，页面内有示例。补全题只交填入片段。
3. 点击「标注者视角」，选择导入题目的作者并启动三题轮次。每个粒度优先展示最新导入的版本。

静态演示使用公开样题和模拟管理记录。正式研究记录由独立的标注平台管理。
