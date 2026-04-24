# autoCheckUpdate

````js
const refreshMinutes = 5 // 检测间隔 单位：分钟

function fetchDataAndCheckScripts() {
  // 异步请求主页内容
  fetch('/')
    .then((response) => response.text())
    .then((htmlContent) => {
      // 用正则匹配所有 script 标签的 src 属性
      const scriptSrcRegex = /<script.*?src=["'](.*?)["']/g
      let match
      const scriptSrcList = []
      while ((match = scriptSrcRegex.exec(htmlContent)) !== null) {
        const scriptSrc = match[1]
        scriptSrcList.push(scriptSrc)
      }
      if (scriptSrcHasChanged(scriptSrcList)) {
        scriptSrcCache = scriptSrcList
        requestUpdate()
      }
    })
    .catch((error) =>
      console.error('Error fetching or checking scripts:', error)
    )
}

// 设置定时器，间隔调用一次函数
fetchDataAndCheckScripts()
setInterval(fetchDataAndCheckScripts, refreshMinutes * 60 * 1000)

// 用于判断 scriptSrc 是否发生变化
let scriptSrcCache = []
function scriptSrcHasChanged(scriptSrcList) {
  if (scriptSrcCache.length) {
    return scriptSrcCache.toString() !== scriptSrcList.toString()
  }
  scriptSrcCache = scriptSrcList
  return false
}

function requestUpdate() {
  if (confirm('检测到新版本，页面请求更新')) {
    location.reload()
  }
}

````

