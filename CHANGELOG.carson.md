# Changelog

這是一個非官方版本的異動紀錄，裡投我專門記錄我所做變得變更

為了避免和官方版本混淆，我將使用版號100.0.0作為開頭

## 100.1.1

### New Features

- ★ site-markmap.html頁面: 新增以修改日期來排序文章  ``sha1: 474e9e8aec2b5cf4d``
- 能在markdwon中的code-block餵入json檔案，就可以獲得markmap ``sha1: 51bf7f3bc``
- 新增site-tree: ``sha1: ae9240c7d``

    可以透過

    ```toml
    type = "custom_layout"
    layout = "site/navigation/site-tree"
    ```

    來指定使用``layouts/custom_layout/site/navigation/site-tree.html``來渲染頁面

- 新增``shortcodes/next-and-previous.html``: 可以動態決定上一頁、下一頁、上一章、前一章的連結  ``sha1:17b490e2``
- 新增``partials/next-and-previous.html``: 可藉由front matter來自動產生:{上一頁、下一頁、上一章、前一章}的連結在結尾  ``sha1: 44f2e7ba2117``
- 引入bootstrap-table並能選擇是否允許垂直滾動條 ``sha1:c2189ace5ac``  ``sha1:6a51ef5cb5ca``
- 一些常項設定改用scss來完成 ``sha1: ae2d5816021``

### Changes

- ~~調整single.html的中心可讀區寬度，從``w-two-thirds-l`` 改為 ``w-90-l``~~  ``sha1: bf48fe1c9f``
- 調整頁面閱讀區的寬度 (w-90-l -> w-80-l) 並將 padding移除  ``sha1: ea6c3d100cc2``
- 將navbar的overflow-x改為隱藏
- table of contents支持兩種格是:
    1. toc: 使用原生的 {{.TableOfContents}}
    2. toc_bootstrap
- 調整h1~h6的margin  ``sha1:29e1fbf5241``
- font-awesome ``5.15.1`` 更新至 ``5.15.2`` ``sha1:6f4692fd1ab2``
- ``archetypes/default.md``  添加更多的內容，讓使用者清楚目前有哪些格式可供選擇

### bug-fixes

- 解決site-markmap的markmap只有渲染子資料夾並沒有渲染當前網頁的問題 ``sha1: cb20cf09a6``

## 100.1.0

主要是針對自定義頁面做擴充

### New Features

1. ``layouts/custom_layout/search/fuse/search-fuse.html`` 顯示search-fuse的UI介面 ``SHA1: a659eb09e2``
2. ``layouts/custom_layout/site/navigation/site-tree.html`` 這是一個用tree來顯示網站上有哪些sections的頁面 ``SHA1: c3522cf4b1``
3. ★``layouts/custom_layout/site/navigation/site-markmap.html``: 使用心智圖來顯示網站所有的section，這是很強大的顯示！ ``SHA1: 5642515019``

5642515019

## 100.0.0

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



[SHA1]: 0123456789
