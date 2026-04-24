关于checkbox的样式改写

```html	
<div>
  <input type="checkbox" id="switch" />
  <label for="switch" class="label" />
</div>
```

```css
#switch {
  visibility: hidden;
  width: 0px;
  height: 0px;
  margin: 0px;
  user-select: none;
}
.label {
  display: inline-block;
  width: 60px;
  height: 30px;
  background-color: #ccc;
  border-radius: 15px;
  position: relative;
  user-select: none;
}
.label::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 4px;
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: #fff;
  transition: all 0.3s;
}
input[type='checkbox']:checked + .label {
  background-color: aquamarine;
}
input[type='checkbox']:checked + .label::after {
  left: 34px;
}
```

