/* variables
   Dom elems*/
const txtMinNum = document.getElementById('txtMinNum')
const txtMaxNum = document.getElementById('txtMaxNum')
const btnGen = document.getElementById('btnGen');
const lblRandInt = document.getElementById('lblRandInt');
const btnRepo = document.getElementById('btnRepo');
// other
const repo = "https://github.com/TalkativeDiv/random-number"
/* functions
 get the random integer*/
let getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (Math.floor(max) - min + 1)) + min;
}
//show the value
let showRandomInt = (min, max) =>{
  lblRandInt.innerText = "Random Number is: " + getRandomInt(min, max)
} 
/* event listeners
 genarate number*/
btnGen.addEventListener('click', () => showRandomInt(txtMinNum.value,txtMaxNum.value))
document.addEventListener('DOMContentLoaded', () => showRandomInt(1,100))
// repo button
btnRepo.addEventListener('click', (e) => {if(e.ctrlKey){window.open(repo)}else{window.location.href = repo}})