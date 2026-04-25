# 技术博客（VitePress + GitHub Pages）

- **仓库**：[mateng8364/ares8364.github.io](https://github.com/mateng8364/ares8364.github.io)
- **线上地址**（项目页，带子路径）：**<https://mateng8364.github.io/ares8364.github.io/>**

说明：只有仓库名为 **`你的用户名.github.io`**（即 `mateng8364.github.io`）时，站点才会在根域名 `https://mateng8364.github.io/`。当前仓库名是 `ares8364.github.io`，所以是项目页，访问路径里会带一段仓库名；CI 里已用 `VITEPRESS_BASE=/<仓库名>/` 与之一致，无需手改 `config.mts`。

## 本地开发

```bash
npm install
npm run docs:dev
```

## 与线上一致（带子路径）的构建 / 预览

```bash
VITEPRESS_BASE=/ares8364.github.io/ npm run docs:build
VITEPRESS_BASE=/ares8364.github.io/ npm run docs:preview
```

## 发布

1. 远程（若未配置）：

   ```bash
   git remote add origin git@github.com:mateng8364/ares8364.github.io.git
   ```

2. 推送 `main` 后，在仓库 **Settings → Pages** 中 **Source** 选 **GitHub Actions**。
3. 在 **Actions** 中等待 **Deploy VitePress site to Pages** 成功。

## 日常更新

1. 在 `docs/` 下增改 Markdown；`docs/guide` 与 `docs/handbook` 下新文件会出现在侧栏。
2. 提交并推送到 `main`，等待 Actions 完成。

## 若希望用根域名打开（可选）

在 GitHub 将仓库**重命名**为 `mateng8364.github.io`（或新建该名仓库并迁移内容），则站点会变为 `https://mateng8364.github.io/`；届时 workflow 里的 `VITEPRESS_BASE` 会随新仓库名自动变化，一般仍无需改配置。
