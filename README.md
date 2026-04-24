# ares8364.github.io

个人 Markdown 技术博客，基于 VitePress + GitHub Pages。

## 本地开发

```bash
npm install
npm run docs:dev
```

## 本地构建

```bash
npm run docs:build
npm run docs:preview
```

## 部署到 GitHub Pages

1. 把仓库推送到 GitHub，仓库名保持 `ares8364.github.io`
2. 在 GitHub 仓库设置中进入 `Settings -> Pages`
3. `Build and deployment` 选择 `Source: GitHub Actions`
4. 推送到 `main` 分支后，会自动执行 `.github/workflows/deploy.yml`
5. 发布成功后访问：`https://ares8364.github.io/`

## 日常更新流程

1. 在 `docs/` 下新增或修改 Markdown 文件
2. 更新 `docs/.vitepress/config.mts` 中导航/侧边栏（如需要）
3. 提交并推送到 `main`
4. 等待 Actions 完成自动部署
