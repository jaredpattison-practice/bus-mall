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

var container = document.getElementById('image_container');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
var productList = document.getElementById('productlist');

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

function pics() {

  // alert(event.currentTssarget);
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
  allPics[idx].displayed++;
  pic.src = allPics[idx].filepath;
  pic.alt = allPics[idx].name;
  pic.title = allPics[idx].name;

  // console.log(idx);
}

function handleClick(event) {
  // console.log(event.target);
  if(event.target.id === 'image_container') {
    return alert('Please click on image');
  }
  for(var i = 0; i < allPics.length; i++) {
    if (event.target.alt === allPics[i].name) {
      allPics[i].clicks++;
      console.log(allPics[i].clicks);
    }
  }
  if (caclTotalClicks() === 6) {
    container.removeEventListener('click', handleClick);
    return showList();
  }
  pics();
}

function caclTotalClicks() {
  var tally = 0;
  for(var i = 0; i < allPics.length; i++){
    tally += allPics[i].clicks;
  }
  return tally;
}

function showList() {
  for (var i = 0; i < allPics.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = `${allPics[i].name} has ${allPics[i].displayed} and views and ${allPics[i].clicks} votes`;
    productList.appendChild(liEl);
  }
}

pics();
container.addEventListener('click', handleClick);

