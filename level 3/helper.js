
let p5data = [/*
  {
    country: "France",
    medals: [
      {
        year: 1924,
        gold: 2,
        silver: 7,
        bronze: 12
      },
      {
        year: 1928,
        gold: 2,
        silver: 4,
        bronze: 2
      },
      {
        year: 1964,
        gold: 13,
        silver: 7,
        bronze: 12
      }
    ]
  },
  {
    country: "Suisse",
    medals: [
      {
        year: 1934,
        gold: 2,
        silver: 7,
        bronze: 12
      },
      {
        year: 1938,
        gold: 2,
        silver: 4,
        bronze: 2
      },
      {
        year: 1984,
        gold: 13,
        silver: 7,
        bronze: 12
      }
    ]
  }*/
]
let allMedals = function(tab)
{
    let count = 0;
    for (let record of tab )
      count += record.gold+record.silver+record.bronze;
    return count;
}

let sortData = function()
{
  p5data.sort( (e1, e2) => allMedals(e2.medals) - allMedals(e1.medals) );
}

let addOneHistogram__old = function( country, year, gold, silver, bronze)
{
    let item = p5data.find( elem => elem.country===country );
    if (item != undefined )
    {
        let record = item.medals.find( elem => elem.year==year );
        if (record != undefined )
        {
            record.gold += gold;
            record.silver += silver;
            record.bronze += bronze;
        }
        else
        {
            item.medals.push( {year: year, gold: gold, silver: silver, bronze: bronze} );
        }
    }
    else
    {
        p5data.push(
          {
              country: country,
              medals: [ {year: year, gold: gold, silver: silver, bronze: bronze} ]
          }
        )
    }
}


let addOneMedal = function( country, year, medal)
{
    let gold = medal=="gold" ? 1 : 0;
    let silver = medal=="silver" ? 1 : 0;
    let bronze = medal=="bronze" ? 1 : 0;
    let item = p5data.find( elem => elem.country===country );
    if (item != undefined )
    {
        let record = item.medals.find( elem => elem.year==year );
        if (record != undefined )
        {
            record.gold += gold;
            record.silver += silver;
            record.bronze += bronze;
        }
        else
        {
            item.medals.push( {year: year, gold: gold, silver: silver, bronze: bronze} );
        }
    }
    else
    {
        p5data.push(
          {
              country: country,
              medals: [ {year: year, gold: gold, silver: silver, bronze: bronze} ]
          }
        )
    }
}


let easycam;
            
let myFont;
let bg;
function preload() {
  myFont = loadFont("./asset/Inconsolata-Regular.ttf");
 // bg = loadImage("../common/bg.webp");
}

function setup() {
  Dw.EasyCam.prototype.apply = function(n) {
      var o = this.cam;
      n = n || o.renderer,
      n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
  };
	let canvas = createCanvas(1600, 1200, WEBGL);//windowWidth, screen.availHeight, WEBGL);
  canvas.parent("content");
  setAttributes('antialias', true);
	easycam = createEasyCam({distance:260});
	// suppress right-click context menu
 // document.oncontextmenu = function() { return false; };
	strokeWeight(0.3);
  fill('#ED225D');
	textFont(myFont);
  textSize(6);
  background(255);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //resizeCanvas(1600, 1200);//windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}

function drawAxes(xlabel="x", ylabel="y", zlabel="z")
{
	stroke(128);
	push();
	line(0,0,0, 225, 0, 0); 
	text(xlabel, 225, 0, 0)
	line(0,0,0, 0, -100, 0); 
	text(zlabel, 0, -100, 0)
	line(0,0,0, 0, 0, 125); 
  push()
  translate(0, 0, 125);
  rotateY(-PI/2);
	text(ylabel, 0, 0, 125)
  pop();
	pop();
	stroke(0);
  push();
  rotateZ(-PI/4);
  translate(-20, 0, 0);
  for(let year = 1924; year<=2012; year+=4)
  {
    text(year,0,0);
    translate(0, 0, 5); 
  }
  pop();
 
  strokeWeight(0.1);
  for (let x=0; x<225; x+=2.5)
    line(x, 0, 0, x, 0, 125); 
  
  strokeWeight(0.2);
  /*
  push();
  
    rotateX(PI/2);
    image(bg, 0, 0, 225, 125);
  pop();
  */
}

function drawData()
{
    let y = -1;
    for(let pays of p5data)
    {
        ++y;
        push();
        rotateY(PI/2);
        rotateZ(PI/4);
        translate(5, -5, 5*y);
        text(pays.country, 0, 0);
        pop();
        for(let bar of pays.medals )
        {
           let x = (bar.year - 1924)/6;
            drawStackedBar(5*y, 5*x, bar.bronze, bar.silver, bar.gold);
        }
    }
}

function drawStackedBar(x, y, h1, h2, h3)
{
		let margin = 0;
    if (h1>0)
    {
      fill("#cc6633");
      drawBar(x, y, h1);
    }
    if (h2>0)
    {
      fill("#c0c0c0");
      push()
      translate(0, -(h1+margin), 0);
      drawBar(x, y, h2);
      pop();
    }
    if (h3>0)
    {
      fill("#ffd700");
      push()
      translate(0, -(h1+h2+2*margin), 0);
      drawBar(x, y, h3);
      pop();
    }
}

function drawBar(x, y, height)
{
		push();
		translate(x, -height/2, 1.5*y);
		box(2.5, height, 2.5);
		pop();
}

let turn = false;

function draw() {
 
  background(255);
  if (turn)
	  rotateY(frameCount*.004);
	push();
    translate(-100, 0, -50);
    drawAxes("Pays", "Années", "Médailles");
    drawData();
	pop();
}


let clearData = function()
{
  p5data = [];
}



let data = undefined;

let load = async function()
{
    let response = await fetch("../common/data.json");
    data = await response.json();
    //console.dir(data);
    //jusDoIt(data);
 
}();
