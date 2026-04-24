关于原声popover属性的使用

```html	
<button id="button" popovertarget="select" style="width: 100px">
  请选择
</button>
<menu popover id="select" style="margin: 0">
  <li class="ui-select-datalist-li">
    <input type="radio" name="type" value="" />请选择
  </li>
  <li class="ui-select-datalist-li">
    <input type="radio" name="type" value="1" />选项1
  </li>
  <li class="ui-select-datalist-li">
    <input type="radio" name="type" value="2" />选项2
  </li>
  <li class="ui-select-datalist-li">
    <input type="radio" name="type" value="3" disabled />选项3
  </li>
  <li class="ui-select-datalist-li">
    <input type="radio" name="type" value="4" />选项4
  </li>
</menu>
```

```js
const button = document.getElementById('button')
const select = document.getElementById('select')
const buttonRect = button.getBoundingClientRect()
button.onclick = () => {
  select.style.top = buttonRect.bottom + 'px'
  select.style.left = buttonRect.left + 'px'
  select.style.width = buttonRect.width + 'px'
}
select.onclick = function (e) {
  if (e.target.name === 'type') {
    button.textContent = e.target.parentElement.textContent
    this.hidePopover()
  }
}
```

````css

.ui-select-datalist-li {
  display: block;
  line-height: 20px;
  padding: 9px 12px;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background-color var(--ui-animate-time, 0.2s);
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.ui-select-datalist-li:has(:checked) {
  background-color: var(--ui-list-selected, #e0f0ff);
  color: var(--ul-list-selected-color, #0962e6);
}
.ui-select-datalist-li:has(:disabled) {
  opacity: var(--ui-opacity, 0.4);
  cursor: default;
}
.ui-select-datalist-li [type='radio'] {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: inherit;
}
````

