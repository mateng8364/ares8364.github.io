关于拖拽api

```html
<div id="app">
  <div draggable="true" data-effect="copy"
  style="background: skyblue"  class="subject">
    subject
  </div>
  <div draggable="true" data-effect="copy" style="background: deeppink" class="subject">
    math
  </div>
  <div id="grid" class="grid">
    <div class="cell" data-drop="true">1</div>
    <div class="cell" data-drop="true">2</div>
    <div class="cell" data-drop="true">3</div>
    <div class="cell" data-drop="true">4</div>
  </div>
</div>
```

```css
.subject {
  --height: 30px;
  width: calc(var(--height) * 2);
  height: var(--height);
  text-align: center;
  line-height: var(--height);
}
.grid {
  width: 160px;
  height: 80px;
  padding: 4px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  border: 1px solid #ccc;
  box-sizing: content-box;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
.gray {
  background-color: #ccc;
}
```

```js
const app = document.getElementById('app')
const grid = document.getElementById('grid')
let drapEl
app.ondragstart = (e) => {
  e.dataTransfer.effectAllowed = e.target.dataset.effect
  drapEl = e.target
}
const cellList = grid.querySelectorAll('.cell')
function clearStyle() {
  Array.from(cellList).forEach(el => el.classList.remove('gray'))
}
grid.ondragover = (e) => {
  e.preventDefault()
}

function getDropNode(el) {
  let node = el
  while(node) {
    if (node.dataset && node.dataset.drop) {
      return node
    }
    node = node.parentNode
  }
}

grid.ondragenter = (e) => {
  clearStyle()
  const node = getDropNode(e.target)
  if (node) {
    node.classList.add('gray')
  }
}

grid.ondrop= (e) => {
  clearStyle()
  const node = getDropNode(e.target)
  if (node) {
    if (e.dataTransfer.effectAllowed === 'copy') {
      node.innerHTML = ''
      const cloneEl = drapEl.cloneNode(true)
      cloneEl.dataset.effect =  'move'
      node.appendChild(cloneEl)
    } else {
      node.innerHTML = ''
      const cloneEl = drapEl.cloneNode(true)
      cloneEl.dataset.effect =  'move'
      node.appendChild(cloneEl)
      drapEl.parentNode.innerHTML = ''
    }
  }
}
```

