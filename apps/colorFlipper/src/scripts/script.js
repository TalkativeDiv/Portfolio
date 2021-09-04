//variables
const btnRandomColor = document.getElementById('btnRandomColor');
const spnColor = document.getElementById('spnColor');
const btnRepo = document.getElementById('btnRepo');
const ghRepo = 'https://github.com/TalkativeDiv/color-flipper';
/*functions
getting the random integer*/
let getRandomInt = (min, max) => {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }
//rgb to hex
let componentToHex = (c) => {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
   }
let rgbToHex = (r, g, b) => {
     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
   }

//applying all of these functions
let getRandomColor = () =>{
   var randomColor =  rgbToHex(getRandomInt(0,255), getRandomInt(0,255), getRandomInt(0,255));
    spnColor.innerHTML = randomColor;
    spnColor.style = 'color:' + randomColor;
}
//event listeners
window.addEventListener('DOMContentLoaded',() => getRandomColor());
btnRandomColor.addEventListener('click',() => getRandomColor());
btnRepo.addEventListener('click',(e) =>{
if(e.ctrlKey){
   window.open(ghRepo)
}else{
   window.location.href = ghRepo
}
})
