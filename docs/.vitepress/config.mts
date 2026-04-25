import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsRoot = path.resolve(__dirname, '..')

function createSidebarItems(dir: string, base: string) {
  const absDir = path.join(docsRoot, dir)
  if (!fs.existsSync(absDir)) return []

  return fs
    .readdirSync(absDir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '')
      const isIndex = slug.toLowerCase() === 'index'
      return {
        text: isIndex ? '首页' : slug,
        link: isIndex ? `${base}/` : `${base}/${slug}`
      }
    })
    .sort((a, b) => {
      if (a.link.endsWith('/') && !b.link.endsWith('/')) return -1
      if (!a.link.endsWith('/') && b.link.endsWith('/')) return 1
      return a.text.localeCompare(b.text, 'zh-Hans-CN')
    })
}

// 线上为项目站：/<仓库名>/。CI 里由 deploy workflow 设置 VITEPRESS_BASE；本地开发默认根路径 '/'
const siteBase = process.env.VITEPRESS_BASE || '/'

export default defineConfig({
  base: siteBase,
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: createSidebarItems('guide', '/guide')
      },
      {
        text: 'Handbook',
        items: createSidebarItems('handbook', '/handbook')
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/mateng8364' }]
  }
})
