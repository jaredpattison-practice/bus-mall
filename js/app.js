'use strict';

var allPics = [];
var usedIdx = [];


function Item(name, extension) {
  this.name = name;
  this.filepath = 'img/' + name + '.' + extension;
  this.displayed = 0;
  this.clicks = 0;
  allPics.push(this);
}

new Item('bag', 'jpg');
new Item('banana', 'jpg');
new Item('bathroom', 'jpg');
new Item('boots', 'jpg');
new Item('breakfast', 'jpg');
new Item('bubblegum', 'jpg');
new Item('chair', 'jpg');
new Item('cthulhu', 'jpg');
new Item('dog-duck', 'jpg');
new Item('dragon', 'jpg');
new Item('pen', 'jpg');
new Item('pet-sweep', 'jpg');
new Item('scissors', 'jpg');
new Item('shark', 'jpg');
new Item('sweep', 'png');
new Item('tauntaun', 'jpg');
new Item('unicorn', 'jpg');
new Item('usb', 'gif');
new Item('water-can', 'jpg');
new Item('wine-glass', 'jpg');

var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');

function random() {
  return Math.floor(Math.random() * allPics.length);
}

function isValid(value) {
  if(usedIdx.includes(value)){
    // console.log('Repeat', value);
    return false;
  }
  return true;
}

function newPics() {
  // alert(event.currentTssarget);
  randomPic(pic1);
  randomPic(pic2);
  randomPic(pic3);
  if (caclTotalClicks() > 24) {
    pic1.removeEventListener('click', newPics);
    pic2.removeEventListener('click', newPics);
    pic3.removeEventListener('click', newPics);
  }
}

function randomPic(pic) {
  var idx = random();
  while(isValid(idx) !== true){
    idx = random();
  }
  if(usedIdx.length > 4) {
    usedIdx.shift();
  }
  usedIdx.push(idx);
  allPics[idx].displayed++;
  pic.src = allPics[idx].filepath;
  pic.alt = allPics[idx].name;
  pic.title = allPics[idx].name;
  pic.idx = idx;
  // console.log(idx);
}
function clickCounter(event) {
  allPics[event.currentTarget.idx].clicks++;
  console.log(event.currentTarget.idx);
}
function caclTotalClicks() {
  var tally = 0;
  for(var i = 0; i < allPics.length; i++){
    tally += allPics[i].clicks;
  }
  return tally;
}

newPics()

pic1.addEventListener('click', newPics);
pic2.addEventListener('click', newPics);
pic3.addEventListener('click', newPics);

