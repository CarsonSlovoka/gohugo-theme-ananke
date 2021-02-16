class SimpleSearch {
  constructor(app, data_array) {
    this.app = app  // HTMLElement
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

  render(data_array) {
    this.app.innerHTML = '<ul>' +
      data_array.map((obj_page) => {  // 剛好他每一個元素都是一個obj
        return '<li>' +
          '<strong>Title: </strong>' + obj_page.title + '<br/>' +
          '<strong>Subtitle: </strong>' + obj_page.subtitle + '<br/>' +
          '<strong>Author: </strong>' + obj_page.author + '<br/>' +
          '<strong>Category: </strong>' + obj_page.category + '<br/>' +
          '<strong>Publisher: </strong>' + obj_page.publisher + '<br/>' +
          '</li>';
      }).join('') + '</ul>';
  }
}


(
  () => {
    let appNode = document.getElementById('app')

    const pages = [
      {
        "title": "Cracking the coding interview",
        "subtitle": "189 programming questions and solutions",
        "author": "Gayle Laakmann McDowell",
        "category": "Programming",
        "publisher": "CareerCup, LLC"
      },
      {
        "title": "No friend but the mountains",
        "subtitle": "Writing from manu prison",
        "author": "Behrouz Boochani",
        "category": "Literature",
        "publisher": "Pan Macmillan Australia"
      },
      {
        "title": "Indian Harvest",
        "subtitle": "Classic and contemporary vegetarian dishes",
        "author": "Vikas Khanna",
        "category": "Cuisine",
        "publisher": "Bloomsbury USA"
      },
    ]
    const simpleSearch = new SimpleSearch(appNode, pages)
    simpleSearch.render(simpleSearch.data_array)
  }
)();
