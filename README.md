# 命名规则
本CSS样式命名参考SMACSS和BEM。

1. 部分采用SMACSS的前缀规则
当前将CSS的样式划分为compats（兼容），components（组件），layouts（布局），themes（主题）和utils（工具）。其中layouts，themes和utils的类名分别使用l，t和u的前缀。例如：

```css
/* 三栏布局 */
.l-col3 {}
```

而为了简洁，且考虑到组件复用情况下冲突较小，components不采用前缀。同时，compats也不采用类似`.ie8-`的前缀，而是通过`.ie8 .selector`的方式实现兼容。

2. 参考BEM的命名规则
个人认为BEM是components组件样式命名比较合适的方法，不过为了简洁，使用`_`代替`__`，使用`-`代替`--`。同时，其他部分的样式的修饰符也使用`-`

3. 单横杠连接符
除了components会使用下划线`_`外，其它类名每个单词都用单横杠`-`隔开。

# 推荐命名
使用本项目样式时，为了避免冲突和明显区分，建议使用如下方式命名。
* 对于具有明确意义的，如header, footer等部分，直接使用`.header`的命名即可。
* 使用`-`表示部分和修饰。比如，`.news-header-night`。但是，名字的层级不宜过深，尽量保持在三层。像`.news-top-header-night`就有点过于繁琐了，应该考虑`top`是否必要。
* 对于html结构基本不变的部分，使用`类名 标签名`比如`.news-list li`也未尝不可。
