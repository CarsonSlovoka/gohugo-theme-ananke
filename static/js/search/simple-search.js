class SimpleSearch {
  constructor(output_node, data_array) {
    this.app = output_node  // HTMLElement
    this.data_array = data_array;
    /* document.addEventListener('submit', simpleSearch.handleSearch); 這樣的用法是錯的，傳過去到裡面的this會是HTMLObject，而非這個類別的instance*/
    document.addEventListener('submit', (submit_event) => {  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
      this.handleSearch(submit_event)
    });
    /* document.addEventListener('reset', function (event) {this.render()} 這樣的this他會不知道是這個類別的instance */
    document.addEventListener('reset', (event) => {
      event.preventDefault();  // 防止頁重新加載
      this.render(this.data_array)
    });
  }

  handleSearch(submit_event) {
    submit_event.preventDefault();  //  stops the page from reloading upon submission.
    // Get the search terms from the input field
    const htmlFormControlsCollection = submit_event.target.elements  // Form裡面所有的input還有button都包含在內
    const searchTerm = htmlFormControlsCollection['search'].value;  // []中可以放入name的名稱，就可以取得該元素

    // Tokenize the search terms and remove empty spaces
    const tokens = searchTerm
      .toLowerCase()
      .split(' ')
      .filter((token) => {
        return token.trim() !== '';  // 找出截空白之後不為空的元素
      });
    if (tokens.length) {
      //  Create a regular expression of all the search terms
      const searchTermRegex = new RegExp(tokens.join('|'),
        'gim'  //這是flags，其中g: global match, i: ignore case, m: multiline // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#parameters
      );
      const filteredList = this.data_array.filter((obj_page) => {
        // Create a string of all object values
        let pageString = '';
        for (const key in obj_page) {
          if (obj_page.hasOwnProperty(key) &&  // 我們用hasOwnProperty來避免此屬性是繼承而來的
            obj_page[key] !== ''
          ) {
            pageString += obj_page[key].toString().toLowerCase().trim() + ' ';
          }
        }
        // Return page objects where a match with the search regex if found
        return pageString.match(searchTermRegex);
      });
      // Render the search results
      this.render(filteredList);
    }
  }

  convertTOC2a(tocHTML, baseURI) {
    const parser = new DOMParser()
    const documentToc = parser.parseFromString(tocHTML, "text/xml")

    /*
    // const collectionNav = documentToc.getElementsByTagName('nav')  // HTMLCollection
    const nodeNav = documentToc.getElementById("TableOfContents")
    const collectionUl = nodeNav.getElementsByTagName("ul")  // HTMLCollection

    let collectionLi, li;
    for (const ul of collectionUl) {
      collectionLi = nodeNav.getElementsByTagName("li")
      for (li of collectionLi) {
        console.log(li.textContent)
      }
    }
   */
    const collectionLi = documentToc.querySelectorAll("li")
    let a
    const resultList = []
    for (const li of collectionLi) {
      // console.log(li.textContent)
      a = li.querySelector("a")
      if (a &&  a.hasAttribute("href")) {
        // a.attributes.href.baseURI
        resultList.push(`<a href="${baseURI + a.getAttribute('href')}">🔗 ${li.textContent}</a>`)
      }
    }
    return resultList.join("")
  }

  render(data_array) {
    this.app.innerHTML = '<ul>' +
      data_array.map((objPage) => {  // 剛好他每一個元素都是一個obj
        const curLink = objPage.permalink
        const fieldList = [
          ["Title", `<a href="${curLink}">${objPage.title}</a>`],
          ["Desc", objPage.desc],
          ["Tags", objPage.tags],
          ["TOC", this.convertTOC2a(objPage.toc, curLink)],
          ["lastModData", objPage.lastModDate],
          ["createData", objPage.createDate]
        ]
        let resultString = ''
        fieldList.forEach((field) => {
          const [key, val] = field
          if (val) {
            resultString += `<strong>${key}:</strong>${val}<br/>`
          }
        })
        return `<li>${resultString}</li>`
      }).join('') + '</ul>';
  }
}

(
  () => {
    let appNode = document.getElementById('app')

    const node_json = document.getElementById('data_array');
    const data_array = JSON.parse(node_json.innerText);

    const simpleSearch = new SimpleSearch(appNode, data_array)
    simpleSearch.render(simpleSearch.data_array)
  }
)();
