import { readdir, stat } from 'node:fs/promises'
import { join } from 'path'
import { defineConfig } from 'vitepress'

const docs = join(__dirname, '..')

async function getConfig(path) {
  const files = await readdir(docs)
  const items = []
  for (const file of files) {
    if (!file.endsWith('.md') || file === 'index.md') continue
    const filepath = join(path, file)
    const status = await stat(filepath)
    items.push({
      title: file.replace('.md', ''),
      createTime: status.ctimeMs,
    })
  }

  items.sort((a, b) => b.createTime - a.createTime)
  console.log(items)
  return defineConfig({
    title: '英语学习',
    description: '记录新单词以及长难句的地方',
    base: '/english/',
    lastUpdated: true,
    markdown: {
      theme: 'material-palenight',
      lineNumbers: false,
    },
    themeConfig: {
      sidebar: {
        '/': [
          {
            text: '阅读',
            items: items.map(item => ({
              text: item.title,
              link: `/${item.title}`,
            })),
          },
        ],
      },
    },
  })
}

export default getConfig(docs)
