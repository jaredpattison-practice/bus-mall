'use strict';

// if ()
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var allPics = [];
var usedIdx = [];
var clicks = 0;

function Item(name) {
  if(typeof (name) === 'object') {
    this.name = name.name;
    this.filepath = name.filepath;
    this.displayed = name.displayed;
    this.votes = name.votes;
    allPics.push(this);
    // console.log(name.name + ' pic at ' + name.filepath + ' displayed ' + name.displayed + ' times with ' + name.votes + ' clicks')
  }else{
    this.name = name;
    this.filepath = `img/${name}.jpg`;
    this.displayed = 0;
    this.votes = 0;
    allPics.push(this);
  }
}

if(localStorage.storedAllPics) {
  var recoveredAllPics = JSON.parse(localStorage.storedAllPics);
  for(var i = 0; i < recoveredAllPics.length; i++) {
    new Item(recoveredAllPics[i]);
  }
} else {
  for(i = 0; i < names.length; i++) {
    new Item(names[i]);
  }
}
var container = document.getElementById('image_container');
var pic1 = document.getElementById('pic1');
var pic2 = document.getElementById('pic2');
var pic3 = document.getElementById('pic3');
// var productList = document.getElementById('productlist');

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
  if(usedIdx.length > 5) {
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
      allPics[i].votes++;
    }
  }
  clicks++;
  if (clicks === 25) {
    container.removeEventListener('click', handleClick);
    // showList();
    updateChartArray();
    drawChart();
    localStorage.storedAllPics = JSON.stringify(allPics);
  }
  pics();
}

// function showList() {
//   for (var i = 0; i < allPics.length; i++) {
//     var liEl = document.createElement('li');
//     liEl.textContent = `${allPics[i].name} has ${allPics[i].displayed} and views and ${allPics[i].votes} votes`;
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
  for (var i = 0; i < allPics.length; i++) {
    votes[i] = allPics[i].votes;
  }
  // console.log(votes);
  // console.log(names);
}


var data = {
  labels: names,
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
