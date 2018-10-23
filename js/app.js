'use strict';

var allPics = [];
var usedIdx = [];


function Item(name, extension) {
  this.name = name;
  this.filepath = 'img/' + name + '.' + extension;
  this.views = 0;
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
  console.log(allPics.length);
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
  randomPic(pic1);
  randomPic(pic2);
  randomPic(pic3);
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
  pic.src = allPics[idx].filepath;
  pic.alt = allPics[idx].name;
  pic.title = allPics[idx].name;
  // console.log(idx);
}

newPics();

pic1.addEventListener('click', newPics);
pic2.addEventListener('click', newPics);
pic3.addEventListener('click', newPics);

