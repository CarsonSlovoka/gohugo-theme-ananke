const TABLE_ID = document.getElementsByTagName("table")[0].getAttribute("id");
const TABLE = document.getElementById(TABLE_ID)
const table = $(`#${TABLE_ID}`)

function imageFormatter(value, row) {
  return `<img src="${value}"  style="width:60px;height:60px" loading="lazy"/>`
}

function saveData(td, rowObj) {
  const uidFiledName = TABLE.getAttribute("data-unique-id")
  const uid = rowObj[uidFiledName]
  th = getTh(td, TABLE_ID)
  table.bootstrapTable('updateCellByUniqueId', {id: uid, field: th.getAttribute("data-field"), value: td.innerHTML})
}

function getTh(td, tableID) {
  const index = Array.prototype.indexOf.call(td.parentNode.children, td)
  return document.querySelector(`#${tableID} th:nth-child( ${(index + 1)} )`)
}

function convertTOC2a(tocHTML, baseURI, searchItems = []) {
  const parser = new DOMParser()
  const documentToc = parser.parseFromString(tocHTML, "text/xml")
  const collectionLi = documentToc.querySelectorAll("li")
  let a
  let highlightLink = ""
  if (searchItems.length > 0) {
    highlightLink = searchItems.length === 1 ? `:~:text=${searchItems[0]}` : `:~:text=${searchItems.join("&text=")}`
  }

  const resultList = []
  for (const li of collectionLi) {
    // console.log(li.textContent)
    a = li.querySelector("a")

    if (a &&
    a.hasAttribute("href") &&
    searchItems.length === 0 ? true : searchItems.some((item) => {
      return a.innerHTML.toLowerCase().includes(item)
    })
    ) {
      // a.attributes.href.baseURI
      // https://stackoverflow.com/a/66304412/
      // #:~:text=[prefix-,]textStart[,textEnd][,-suffix][&text=]
      resultList.push(`<a href="${baseURI + a.getAttribute('href') + highlightLink}">🔗 ${li.textContent}</a>`)
    }
  }
  for (let i = 0; i < resultList.length; i++) {
    if (i % 5 === 0) {
      resultList[i] += "<br>"
    }
  }
  return resultList.join("") // 轉成字串
}

function getSearchData(searchItem = []) {
  const resultList = []
  let tagArray
  OrgDataArray.map((obj) => {
    const curLink = obj.permalink
    tagArray = Array.isArray(obj.tags) && obj.tags.length > 0 ?
      obj.tags.map((tag) => {
        return `<a href="/tags/${tag}">${tag}</a>` // http://localhost:1313/tags/xxx/ // 最前面有一個/表示會找root，如果省略/將會用當前的頁面去找
      })
      : []
    const curItem = {
      title: `<a href="${curLink}">${obj.title}</a>`,
      desc: obj.desc,
      tags: tagArray.join(","), // 不太曉得為什麼，感覺上是可以放array的物件是沒問題的，但有時候會出錯，所以乾脆轉換成string
      //permalink: obj.permalink, // 決不決定不是看餵入的資料，餵的資料可以多餵，顯示可以再決定是否顯示。
      toc: convertTOC2a(obj.toc, curLink, searchItem), // 如果給入的資料有問題(請檢查string的括號是否有對齊)，有可能會造成bootstrapTable錯誤
      lastModDate: obj.lastModDate,
      createDate: obj.createDate
    }
    resultList.push(curItem)
  })
  return resultList
}

function filterTag(rowObj, filter) {
  // https://live.bootstrap-table.com/code/djhvscf/4913
  if (filter["tags"].length === 0) {
    return true // 如果沒有選擇任何東西，就視為全部選擇
  }

  const frag = document.createRange().createContextualFragment(rowObj["tags"].split(",").join(""))  // 因為當初用join(",")，所以現在要還原
  const selectTags = filter["tags"]

  const aNodeList = frag.querySelectorAll("a")
  for (let [key, a] of Object.entries(aNodeList)) {
    if (selectTags.includes(a.textContent)) {
      return true // 傳回true就會顯示該列
    }
  }
  return false
}

var OrgDataArray
(
  () => {
    window.onload = () => {
      $("#selectTag").multipleSelect({
        // width: 600,  // 用hover之後去更改屬性
        multiple: true,
        multipleWidth: 160,
        dropWidth: "728"
      }) // 初始化multipleSelect必要的敘述

      /*
      document.getElementsByClassName("ms-choice").forEach((msChoice)=>{
        msChoice.onmouseover = ()=>{
          msChoice.setAttribute("width", "600px")
        }
      })
      */

      const nodeJson = document.getElementById('data_array')
      OrgDataArray = JSON.parse(nodeJson.innerText) // original data
      fmtOrgDataArray = getSearchData() // add link
      table.bootstrapTable('append', fmtOrgDataArray)
      table.on('search.bs.table', (event, text) => {
        if (text === undefined) {
          return
        }
        const dataArray = getSearchData(text.split(" "))
        table.bootstrapTable('removeAll')
        table.bootstrapTable('append', dataArray) // 需要的是一個List[Object] 例如: [{},{},...]
      })

      $("#selectTag").on("change", () => {
        table.bootstrapTable("filterBy", {
            // 這裡面的東西就是filter的參數
            "tags": $("#selectTag").val() // 因為 <select multiple> 使用multiple，所以這邊的val是一個list
          }, {
            "filterAlgorithm": filterTag // 傳入 (rowObj, 參數) // row是每一列的資料，參數就是上面的東西
          }
        )
      })
    }
  }
)()
