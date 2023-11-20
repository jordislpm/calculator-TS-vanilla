const allButons: NodeListOf<Element> = document.querySelectorAll(".button")
const display  = document.querySelector(".display")



function pressNumber (){

}

for (let i = 0; i < allButons.length; i++) {
  const element = allButons[i];
  element.addEventListener("click", (e)=>{
    console.log(element.innerHTML)
    console.log(e.target)
  })
  
}
