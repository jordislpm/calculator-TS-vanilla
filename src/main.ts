import Decimal from 'decimal.js';

// const from Dom
const allButons: NodeListOf<Element> = document.querySelectorAll(".button")
const display: HTMLDivElement | null = document.querySelector(".display")
// end const from Dom



const numberRegex = /^[0-9]$/
let number: number = 0
let numberDecimal : number = 0
let numberMemory: number = 0
let numberAcumulate: number = 0;
let lastAction: string = ""
let calculateHistory: number[] = [];

function pressNumber (digit: string){
  if (`${numberMemory}`.length > 10){
    return
  }
  number = parseInt(digit)
  if(display){
    if (display.innerText == "0"){
      numberMemory = number
      display.innerText = `${number}`
    } else if (display.innerText !== "0" && !display.innerText.includes(".")){
      number = (numberMemory* 10) + number;
      numberMemory = number;
      display.innerText = `${number}`
    } else{
      if (numberDecimal === 0){

        numberDecimal = number
        display.innerText = `${numberMemory}.${number}`
        numberMemory = numberMemory + (number/10);
      } else{
        console.log("number :" +number)
        console.log( "numberDecimal :" + numberDecimal)
        console.log( "numberMemory :" + numberMemory)
     
        let multiplyDecimal: number = 1
        for (let i = 0; i < Math.abs(numberDecimal).toString().length + 1; i++) {
          multiplyDecimal =  Math.abs(multiplyDecimal * 10);
          console.log(multiplyDecimal)
        }
        numberDecimal = Math.abs(numberDecimal * 10) + number;
        display.innerText = `${numberMemory}${number}`
        numberMemory = numberMemory + Math.abs(number/multiplyDecimal);
        console.log( "numberMemory :" + numberMemory)
      // number = (numberMemory* 10) + number;
      // numberMemory = number;
      // display.innerText = `${number}`

      }
    }

  }
}

function deleteAll(){
  if (numberAcumulate !== 0){
    calculateHistory.unshift(numberAcumulate)
  }
  number = 0;
  numberMemory= 0;
  numberAcumulate = 0;
  numberDecimal = 0;
  if (display){
    display.innerText = "0"
  }
lastAction = ""
}

function addNumber (){
  lastAction = "+";
  if (display){
  if (numberMemory === 0 && numberAcumulate ===0 && number ===0 ){
    return
  }
  if(numberAcumulate === 0 && numberMemory !== 0){
    numberAcumulate = numberMemory;
    numberMemory = 0
    display.innerText = `${numberMemory}`
  } else if (number !== 0 && numberAcumulate !== 0 && numberMemory !== 0){
numberAcumulate = numberAcumulate + numberMemory;
numberMemory = 0;
  // display.innerText = `${numberAcumulate}`
  }else if (numberMemory === 0 && numberAcumulate !== 0 && number !== 0){
    numberAcumulate = numberAcumulate + number;
    numberMemory = 0;
      }
}
}

function subtractNumber (){
  lastAction = "-"
  if (display){
    if (numberMemory === 0 && numberAcumulate ===0 && number ===0 ){
      return
    }
    if(numberAcumulate === 0 && numberMemory !== 0){
      numberAcumulate = numberMemory;
      numberMemory = 0
      display.innerText = `${numberMemory}`
    } else if (number !== 0 && numberAcumulate !== 0 && numberMemory !== 0){
  numberAcumulate = numberAcumulate - numberMemory;
  numberMemory = 0;
    // display.innerText = `${numberAcumulate}`
    }else if (numberMemory === 0 && numberAcumulate !== 0 && number !== 0){
      numberAcumulate = numberAcumulate - number;
      numberMemory = 0;
        }
  }

}

function multiplyNumber (){
  lastAction = "x"
  if (display){
    if (numberMemory === 0 && numberAcumulate ===0 && number ===0 ){
      return
    }
    if(numberAcumulate === 0 && numberMemory !== 0){
      numberAcumulate = numberMemory;
      numberMemory = 0
      display.innerText = `${numberMemory}`
    } else if (number !== 0 && numberAcumulate !== 0 && numberMemory !== 0){
  numberAcumulate = numberAcumulate * number;
  numberMemory = 0;
    // display.innerText = `${numberAcumulate}`
    }else if (numberMemory === 0 && numberAcumulate !== 0 && number !== 0){
      numberAcumulate = numberAcumulate * number;
      numberMemory = 0;
        }
  }

}

function divideNumber (){
  lastAction = "÷"
  if (display){
    if (numberMemory === 0 && numberAcumulate ===0 && number ===0 ){
      return
    }
    if(numberAcumulate === 0 && numberMemory !== 0){
      numberAcumulate = numberMemory;
      numberMemory = 0
      display.innerText = `${numberMemory}`
    } else if (number !== 0 && numberAcumulate !== 0 && numberMemory !== 0){
  numberAcumulate = numberAcumulate / numberMemory;
  numberMemory = 0;
    // display.innerText = `${numberAcumulate}`
    }else if (numberMemory === 0 && numberAcumulate !== 0 && number !== 0){
      numberAcumulate = numberAcumulate / number;
      numberMemory = 0;
        }
  }
}

function addDecimal(number: number) {
  if (display){
  let expresion = `${number}`
  if (!expresion.includes('.')) {
    expresion += '.';
    numberMemory = number;
    display.innerText = expresion;
  }
}
}

function showResult(){
  if(display){
    if(lastAction === "+"){
      addNumber()
    }else if(lastAction === "-"){ 
      subtractNumber()
    }else if(lastAction === "x"){
    multiplyNumber()
    }else if(lastAction === "÷"){
      divideNumber()
  }
  // console.log("numberAcumulate :" + numberAcumulate)
  // console.log("number :" + number)
  // console.log("numberMemory :" + numberMemory)
   display.innerText = `${numberAcumulate}`
}

}

function handleAction (string: string){
if (display){
    if(numberRegex.test(string)){
     pressNumber(string)
    } else if(string === "AC"){
      deleteAll()
    } else if(string === "+"){
      lastAction = "+"
      if(numberAcumulate === 0 && numberMemory !== 0){
        numberAcumulate = numberMemory;
        numberMemory = 0
        display.innerText = `${numberMemory}`
      }
    }else if(string === "-"){
      lastAction = "-";
      if(numberAcumulate === 0 && numberMemory !== 0){
        numberAcumulate = numberMemory;
        numberMemory = 0
        display.innerText = `${numberMemory}`
      }
  }else if(string === "x" || string === "*"){
    lastAction = "x";
    if(numberAcumulate === 0 && numberMemory !== 0){
      numberAcumulate = numberMemory;
      numberMemory = 0
      display.innerText = `${numberMemory}`
    }
    }else if(string === "÷" || string === "/"){
      lastAction = "÷"
      if(numberAcumulate === 0 && numberMemory !== 0){
        numberAcumulate = numberMemory;
        numberMemory = 0
        display.innerText = `${numberMemory}`
      }
  }else if(string === "=" || string === "Enter"){
    showResult()


  } else if(string === "."){
    addDecimal(number)
display.innerText = `${numberMemory}.`
  }

}
console.log("number :" + number)
console.log("numberMemory :" + numberMemory)
console.log("numberMemory :" + numberAcumulate)
}

for (let i = 0; i < allButons.length; i++) {
  const element = allButons[i];
  element.addEventListener("click", ()=>{ handleAction(element.innerHTML)})
  
}

document.addEventListener('keydown', (e)=>handleAction(e.key))


