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

## 若线上是 404（先按顺序排查）

1. **Pages 源必须是 Actions**  
   打开仓库 [Settings → Pages](https://github.com/mateng8364/ares8364.github.io/settings/pages)，在 **Build and deployment** 里，**Source** 选 **GitHub Actions**（不要选 *Deploy from a branch*，也不要留成未配置）。没选好的话，**不会发布任何静态文件**，浏览器就是 404。

2. **看最后一次 workflow 是否成功**  
   打开 [Actions](https://github.com/mateng8364/ares8364.github.io/actions)，点 **Deploy VitePress site to Pages**。  
   - 若 `build` 或 `deploy` 失败，点进去看红色步骤的日志（常见：`npm ci` 失败、与 `package-lock.json` 不一致）。  
   - 若 **deploy** 在等审批：到 **Settings → Environments → `github-pages`** 看是否有待处理的 deployment review。

3. **首次成功后再等 1～3 分钟** 再访问；也可试一次 [Actions → 该 workflow → Run workflow] 手动重跑。

4. 仓库根目录已包含 `docs/public/.nojekyll`，避免 GitHub 对下划线等路径的干扰（随构建打进产物）。

5. **构建报 “Could not resolve \`./images/...png\`”**  
   说明某篇 Markdown 里用 `![](...)` 引用了不存在的图片。把对应图片放进 `docs/handbook/images/`（或改引用路径），或去掉/改成文字说明后再构建。本地需 **Node 18+**（与 Actions 中 Node 20 一致）执行 `npm run docs:build` 才能复现同类错误。
