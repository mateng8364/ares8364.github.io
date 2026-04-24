关于grid布局自动填充空间

```html
  <div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item item-2x1">3</div>
    <div class="item item-1x2">4</div>
    <div class="item item-2x2">5</div>
    <div class="item">6</div>
    <div class="item item-2x1">7</div>
    <div class="item">8</div>
    <div class="item">9</div>
  </div>
```

```scss

.grid {
  --grid-width: 600px;
  --grid-gap-x: calc(var(--grid-width) / 12);
  --grid-gap-y: calc(var(--grid-width) / 12);
  --icon-size: calc(var(--grid-width) / 6);
  width: var(--grid-width);
  display: grid;
  justify-content: center;
  grid-gap: var(--grid-gap-x) var(--grid-gap-y);
  grid-template-columns: repeat(auto-fill, var(--icon-size));
  grid-template-rows: repeat(auto-fill, var(--icon-size));
  grid-auto-flow: dense;
  .item {
    width: var(--icon-size);
    height: var(--icon-size);
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        background: hsl(10 * $i, 100%, 50%);
      }
    }
  }
  @for $i from 1 through 4 {
    @for $j from 1 through 4 {
      .item-#{$i}x#{$j} {
        @if $i > 1 {
          grid-column: span $i;
          width: calc(var(--icon-size) * $i + var(--grid-gap-x) * ($i - 1));
        }
        @if $j > 1 {
          grid-row: span $j;
          height: calc(var(--icon-size) * $j + var(--icon-gap-y) * ($j - 1));
        }
      }
    }
  }
}
```

