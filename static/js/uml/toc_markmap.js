class Toc {
  constructor(node_nav){
    this.data = node_nav;  // document.getElementById(toc_id);
  }
  create_mind_map(svg_id, dict_data){
    let e = ()=>window.markmap
    const {Markmap:r} = e();
    window.mm = r.create("svg#"+svg_id, null, dict_data)
  }

  _get_element(ul_node, c, cur_level){

    let li_list = Array.prototype.slice.call(ul_node.childNodes).filter(node => node.nodeName === 'LI' )
    li_list.forEach(li => {
      const inner_a = li.firstElementChild;
      const value = (()=>{
        // If it contains two links (one is an internal link and the other is an external link, then the internal link is used as the primary link)
        const inner_a_copy = inner_a.cloneNode(true);  // avoid modify the original innerText  // 如果是false不會把innerText包含進去
        const outer_a = ((RegExp('<a[^>]*>[^<]*<\/a><a[^>]*>[^<]*<\/a>').exec(li.innerHTML)) != null ?
         Array.prototype.slice.call(li.childNodes).filter(node => node.nodeName === 'A' )[1] :
         undefined
         );
        if (outer_a !== undefined) {
          inner_a_copy.innerText = outer_a.innerText
        }
        return inner_a_copy.outerHTML;
      })();

      let ul = Array.prototype.slice.call(li.childNodes).filter(node => node.nodeName === 'UL' )

      if (ul.length > 0){
        let sub_list = [];
        this._get_element(ul[0], sub_list, cur_level+1)
        c.push({t: 'h', d: cur_level, v: value, c:sub_list})
      }
      else {
        c.push({t: 'h', d: cur_level, v: value})
      }
    });
  }

  convert2dict(){
    let root_ul = Array.prototype.slice.call(this.data.childNodes).filter(node => node instanceof HTMLUListElement)[0]
    const sub_c = []
    const result_dict = {t: 'root', d: 0, v: "", c:sub_c};
    const level = 1
    this._get_element(root_ul, sub_c, level);
    console.log(result_dict)
    console.log(JSON.stringify(result_dict, null, 2))
    return result_dict
  }
};

(
  ()=>{
    let node_nav = document.getElementById('TableOfContents');
    const toc = new Toc(node_nav);
    const dict_data = toc.convert2dict();
    const id_name = 'mindmap-toc';
    let node_svg = getNode("svg", {id: id_name});
    // node_nav.appendChild(node_svg);
    node_nav.replaceWith(node_svg);
    toc.create_mind_map(id_name, dict_data);
  }
)();
