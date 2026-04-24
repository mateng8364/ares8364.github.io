##  边框流转效果 css

三层结构，grid为外层父盒子，box、inner形成需要的默认边框效果

````html

      <div class="grid">
        <div class="box">
          <div class="inner">1</div>
        </div>
        <div class="box">
          <div class="inner">2</div>
        </div>
        <div class="box">
          <div class="inner">3</div>
        </div>
        <div class="box">
          <div class="inner">4</div>
        </div>
        <div class="box">
          <div class="inner">5</div>
        </div>
        <div class="box">
          <div class="inner">6</div>
        </div>
        <div class="box">
          <div class="inner">7</div>
        </div>
        <div class="box">
          <div class="inner">8</div>
        </div>
        <div class="box">
          <div class="inner">9</div>
        </div>
      </div>
    </div>
````

外层父盒子grid布局，内层box盒子相对定位，inner绝对定位，宽高空隙形成border，z-index分别为1、3；

伪元素z-index为2，在两者之间，默认位置-1000px

````scss

.grid {
  width: 650px;
  height: 650px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 5px;
  box-sizing: border-box;
  position: relative;
  .box {
    width: 200px;
    height: 200px;
    position: relative;
    background-color: rgba($color: #ffffff, $alpha: 0.1);
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 1;
    overflow: hidden;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: var(--y, -1000px);
      left: var(--x, -1000px);
      transform: translate(-50%, -50%);
      z-index: 2;
      border-radius: inherit;
      background: radial-gradient(
        closest-side circle,
        rgba(255, 255, 255, 0.8),
        transparent
      );
    }
    .inner {
      width: 196px;
      height: 196px;
      position: absolute;
      color: #f0f0f0;
      top: 2px;
      left: 2px;
      z-index: 3;
      background-color: #000;
      box-sizing: border-box;
      border-radius: inherit;
    }
  }
}
````

js   grid注册mousemove事件，获取box盒子位置，根据鼠标相对视口位置，获取鼠标相对box位置，设置伪元素位置为鼠标位置

```js
const grid = document.querySelector('.grid')
const boxes = grid.querySelectorAll('.box')
grid.onmousemove = function (e) {
  for (const box of boxes) {
    const rect = box.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    box.style.setProperty('--x', `${x}px`)
    box.style.setProperty('--y', `${y}px`)
  }
}
```

