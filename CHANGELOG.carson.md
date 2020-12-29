# Changelog

這是一個非官方版本的異動紀錄，裡投我專門記錄我所做變得變更

為了避免和官方版本混淆，我將使用版號100.0.0作為開頭

## [100.0.0]

這版本主要以踏入Hugo為主，偏向教學居多

### New Features

1. 使用bootstrap5重新制定右側的導覽 ``SHA1: 6492bcf353``

    - 螢幕過小時可以隱藏 ``SHA1: 375ed0e897``
    - 滑鼠滾動的時候會跟著凸顯所在位置

2. 新增 ``partials/description-with-image.html`` ``SHA1: b2239ba25b``
3. 引進font-awesome，現在您能使用font-awesome的css ``SHA1: f71729b263``
4. ``layouts/partials/card-post-bs.html``: bootstrap card ``SHA1: 0f1e8d294b ``
5. ``layouts/shortcodes/raw_html.html``: 使markdown中可以插入HTML
6. search-fuse: 可選項，能選擇是否導入search-fuse ``SHA1: a76fc178ae``
7. ``static/js/uml/plantuml_encoder.js``: 讓markdown可以渲染plantuml  ``SHA1: 7db06b38``


### 修改

``layouts/partials/summary.html``: 如果有description則優先，再來才是.Summary ``SHA1: 6c92b5b051``

### 其他新增項目

#### CSS

- zoom-in 放大物件 ``SHA1: 4944d3b464``



SHA1: 6492bcf353
SHA1: 375ed0e897
      0f1e8d294b

