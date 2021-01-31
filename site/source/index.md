---
title: A
d: 1
c:
  - d
---

# index

```codetab
---html
<a class="button">button</a>
---

---styl
@import '../themes'

.button
  padding button_padding
  color button_color
  background-color button_bg_color
  cursor pointer
  border button_border
  outline none
  &:hover
    color button_active_color
    background-color button_active_bg_color
---
```

```styl
@import '../themes'

.button
  padding button_padding
  color button_color
  background-color button_bg_color
  cursor pointer
  border button_border
  outline none
  &:hover
    color button_active_color
    background-color button_active_bg_color
```
