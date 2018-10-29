'use strict';

Item.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Item.allPics = [];
Item.usedIdx = [];
Item.clicks = 0;

function Item(name) {
  if(typeof (name) === 'object') {
    this.name = name.name;
    this.filepath = name.filepath;
    this.displayed = name.displayed;
    this.votes = name.votes;
    Item.allPics.push(this);

  }else{
    this.name = name;
    this.filepath = `img/${name}.jpg`;
    this.displayed = 0;
    this.votes = 0;
    Item.allPics.push(this);
  }
}

if(localStorage.storedAllPics) {
  var recoveredAllPics = JSON.parse(localStorage.storedAllPics);
  for(var i = 0; i < recoveredAllPics.length; i++) {
    new Item(recoveredAllPics[i]);
  }
} else {
  for(i = 0; i < Item.names.length; i++) {
    new Item(Item.names[i]);
  }
}
var container = document.getElementById('image_container');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');

function random() {
  return Math.floor(Math.random() * Item.allPics.length);
}

function isValid(value) {
  if(Item.usedIdx.includes(value)){
    return false;
  }
  return true;
}

function pics() {

  randomPic(pic1);
  randomPic(pic2);
  randomPic(pic3);
}

function randomPic(pic) {
  var idx = random();
  while(isValid(idx) !== true){
    idx = random();
  }
  if(Item.usedIdx.length > 5) {
    Item.usedIdx.shift();
  }
  Item.usedIdx.push(idx);
  Item.allPics[idx].displayed++;
  pic.src = Item.allPics[idx].filepath;
  pic.alt = Item.allPics[idx].name;
  pic.title = Item.allPics[idx].name;
}

function handleClick(event) {
  if(event.target.id === 'image_container') {
    return alert('Please click on image');
  }
  for(var i = 0; i < Item.allPics.length; i++) {
    if (event.target.alt === Item.allPics[i].name) {
      Item.allPics[i].votes++;
    }
  }
  Item.clicks++;
  if (Item.clicks === 25) {
    container.removeEventListener('click', handleClick);
    // showList();
    updateChartArray();
    drawChart();
    localStorage.storedAllPics = JSON.stringify(Item.allPics);
  }
  pics();
}

// function showList() {
//   for (var i = 0; i < Item.allPics.length; i++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = `${alItem.lPics[i].name} has ${Item.allPics[i].displayed} and views and ${Item.allPics[i].votes} votes`;
//     productList.appendChild(liEl);
//   }
// }

pics();
container.addEventListener('click', handleClick);

// Charts rendered using Chart JS v.2.6.0
// http://www.chartjs.org/
var resultsChart;
var votes = [];
var chartDrawn = false;

function updateChartArray() {
  for (var i = 0; i < Item.allPics.length; i++) {
    votes[i] = Item.allPics[i].votes;
  }
}


var data = {
  labels: Item.names,
  datasets: [{
    data: votes,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255,99,132,1)',
    ],
    borderWidth: 1
  }]
}

function drawChart() {
  var ctx = document.getElementById('productchart').getContext('2d');
  resultsChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      title: {
        display: true,
        text: 'Votes by Product'
      },
      responsive: false,
      scales: {
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 80
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  chartDrawn = true;
}
