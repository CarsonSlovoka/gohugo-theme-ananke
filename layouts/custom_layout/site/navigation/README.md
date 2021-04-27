## bootstrap-table的舊代碼參考

```
<section class="row">
  <select id="" class="col-md-2" data-placeholder="Filter group" style="height:30px;" multiple>
    {{- /* <option value="">Select Tag</option> */ -}}
    {{ $allTags := slice }}
      {{ range $key, $weightedPage := .Site.Taxonomies.tags }}
        {{/* <option value="{{$key}}">{{$weightedPage}}</option> */}}
        {{ range $weightedPage.Pages }} {{/* weightedPage 是一個list, 每一個元素是一個該頁面以及權重 */}}
          {{- /* <option value="{{ .Permalink}}">{{$key}}</option> */ -}} {{- /* .LinkTitle 這是該連結page中，此頁面的title */ -}}
          {{if not (in $allTags $key) }}
            <option value="{{$key}}">{{$key}}</option>
          {{end}}
          {{ $allTags = $allTags | append $key }}
        {{ end }}
      {{ end }}
  </select>
</section>
```
