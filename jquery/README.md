# 選擇元素

jQuery 的基本語法 :
```javascript=
$(選擇器).method(參數);
```

## 常用選擇器
> 萬用選擇器 -- $("*")表示選擇器所有元素
> 類型選擇器 -- $("h1") 表示選擇 h1 元素
> 子選擇器   -- $("ul > li") 
> 子孫選擇器 -- $("li a")
> 相鄰兄弟   -- $("img + p")
> 全體兄弟   -- $("img ~ p") 
> 類別       -- $(".odd")
> ID        -- $("#btn")

## 屬性選擇器
> $("[class]") 
> 