function getNode(n, v) {
  /* https://stackoverflow.com/a/37411738/9935654 */
  n = document.createElementNS("http://www.w3.org/2000/svg", n);
  for (var p in v)
    n.setAttributeNS(null, p.replace(/[A-Z]/g, function(m, p, o, s) { return "-" + m.toLowerCase(); }), v[p]);
  return n
};

(function(){
  const plantumlPrefix = "markmap"
  Array.prototype.forEach.call(document.querySelectorAll("[class^=language-" + plantumlPrefix + "]"), function(code){
    let svg = getNode("svg", {id: 'mindmap'});  /* <svg id="mindmap"></svg> */
    var code_inner_html = code.innerHTML;
    code.parentNode.insertBefore(svg, code);
    code.style.display = 'none';
  });
})();

/*
TODO code-block of markmap 未完成
有機會再來看要怎麼做，以下應該是typescript語言?
(
  (e,t)=>{
    const{Markmap:r}=e();
    window.mm=r.create("svg#mindmap",null,t)
  }
)(
  ()=>window.markmap,{
    "t":"root","d":0,"v":"","c":[
    code_inner_html  // 不知道怎麼完成這邊
    ]
  }
);
*/
