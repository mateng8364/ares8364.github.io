## 关于css文本溢出隐藏

##### 单行文本

内容超出隐藏，文本超出省略，文本不换行

````scss
.ellipsis-line {
	overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
````

##### 多行文本

1. webkit-box方式

   ````scss
   .multi-line {
     overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 3;
     -webkit-box-orient: vertical;
   }
   ````

   ````scss
   @for $n from 0 through 5 {
     .multi-line-#{$n + 1} {
       overflow: hidden;
       text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: $n + 1;
       -webkit-box-orient: vertical;
     }
   }
   ````

   

2. float right

   浮动使文字环绕...  伪元素高度、margin-top负值控制文字与省略号位置

   ````scss
   
   .multi-line-3 {
     width: 400px;
     height: 45px;
     overflow: hidden;
     line-height: 15px;
     &::before {
       content: '';
       display: block;
       height: 30px;
     }
     .content {
       margin-top: -30px;
     }
     .more {
       float: right;
     }
   }
   ````

   