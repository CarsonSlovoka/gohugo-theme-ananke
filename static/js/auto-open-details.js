function getDetails(mouseEvent) {
  let target = mouseEvent.target
  if (target.tagName === 'SUMMARY') {
    target = target.parentNode
  }
  if (target.tagName !== 'DETAILS') {
    return  // Using return without a value will return the value undefined.
  }
  return target
}

(
  ()=>{
    const detailsCollection = document.getElementsByTagName('details')
    for (let [key, details] of Object.entries(detailsCollection)){
      details.onmouseover = (mouseEvent) => {
        const target = getDetails(mouseEvent)
        if (typeof target != "undefined") {
          target.open = true
        }
      }
      /*  不能這樣做，這樣會一離開該元素馬上就關閉了
      details.onmouseout = (mouseEvent) => {
        const target = getDetails(mouseEvent)
        if (typeof target != "undefined") {
          target.open = false
        }
      }
       */
    }
    document.addEventListener('mouseover', (mouseEvent)=>{
      for (let [key, details] of Object.entries(detailsCollection)){
        if (details.matches(':hover')){
          return  // 不用continue，原因是如果這個項目正在hover之中，那他的子項目是不需要被關閉的，所以用return讓他不被關起來
        }
        details.open = false
      }
    })
  }
)();
