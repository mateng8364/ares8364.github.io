# 技术博客（VitePress + GitHub Pages）

个人 Markdown 文档站，发布为 **GitHub 项目页**：`https://mateng8364.github.io/<你的仓库名>/`

## 本地开发

```bash
npm install
npm run docs:dev
```

浏览器打开终端里提示的地址（一般为根路径 `/`）。

## 本地构建与预览

```bash
npm run docs:build
npm run docs:preview
```

若要与线上一致（带子路径），把 `<仓库名>` 换成你在 GitHub 上创建的实际仓库名：

```bash
VITEPRESS_BASE=/<仓库名>/ npm run docs:build
VITEPRESS_BASE=/<仓库名>/ npm run docs:preview
```

## 推送到 GitHub 并发布

1. 远程地址使用你的账号，例如：  
   `git@github.com:mateng8364/<仓库名>.git`  
   或 HTTPS：`https://github.com/mateng8364/<仓库名>.git`
2. 推送 `main` 分支后，在仓库 **Settings → Pages** 中，**Source** 选 **GitHub Actions**（不要选 “Deploy from a branch”）。
3. 在 **Actions** 中等待 **Deploy VitePress site to Pages** 成功。
4. 访问地址：**`https://mateng8364.github.io/<仓库名>/`**

> 说明：项目页的站点根路径是 `/<仓库名>/`，构建时由 workflow 通过环境变量 `VITEPRESS_BASE` 自动设置，**一般无需再手改** `config.mts`。

## 日常更新

1. 在 `docs/` 下增改 Markdown；`docs/guide` 与 `docs/handbook` 下新文件会出现在侧栏（见 `docs/.vitepress/config.mts`）。
2. 提交并推送到 `main`，等待 Actions 完成即可。
