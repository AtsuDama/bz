var Alpha = 1.0;
var Beta = 1.0;
var Gamma = 1.0;

var A;
var B;
var C;

var An;
var Bn;
var Cn;

var Ad;
var Bd;
var Cd;

var sliderAlpha;
var sliderBeta;
var sliderGamma;

var field_width = 400;
var field_height = 400;

var fr;

function setup() {
  createCanvas(700,700);
  pixelDensity(1);
  initialize();
  sliderSetup(0, 1.2, 0.01);
  buttonSetup();
}

function draw() {
  background(255);
  update();
  display();
  textSetup();
	frDisplay();
}

function display() {
  loadPixels();
  for (var x = 0; x < field_width; x++) {
		for (var y = 0; y < field_height; y++) {
	    var pix = (x + y * width) * 4;
	    pixels[pix + 0] = Ad[x][y] * 255;
	    pixels[pix + 1] = Bd[x][y] * 255;
	    pixels[pix + 2] = Cd[x][y] * 255;
	    pixels[pix + 3] = 180;
		}
  }
  updatePixels();
}

function update() {
  Alpha = sliderAlpha.value();
  Beta = sliderBeta.value();
  Gamma = sliderGamma.value();
  for (var x = 0; x < field_width; x++) {
		for (var y = 0; y < field_height; y++) {
	    var AvgA = average(A, x, y);
	    var AvgB = average(B, x, y);
	    var AvgC = average(C, x, y);
	    An[x][y] = AvgA + AvgA * (Alpha * AvgB - Gamma * AvgC);
	    Bn[x][y] = AvgB + AvgB * (Beta * AvgC - Alpha * AvgA);
	    Cn[x][y] = AvgC + AvgC * (Gamma * AvgA - Beta * AvgB);
		}
  }

  for (var x = 0; x < field_width; x++) {
		for (var y = 0; y < field_height; y++) {
	    A[x][y] = An[x][y];
	    B[x][y] = Bn[x][y];
	    C[x][y] = Cn[x][y];
	    Ad[x][y] = An[x][y];
	    Bd[x][y] = Bn[x][y];
	    Cd[x][y] = Cn[x][y];
	    Ad[x][y] = constrain(Ad[x][y], 0, 1);
	    Bd[x][y] = constrain(Bd[x][y], 0, 1);
	    Cd[x][y] = constrain(Cd[x][y], 0, 1);
		}
  }
}

function average(Z, x, y) {
  var center, top, bottom, left, right;
  var uleft, uright, lright, lleft;
  var avg;

	var X = x + field_width;
	var Y = y + field_height;

  center = Z[X % field_width][Y % field_height];
  top = Z[X % field_width][(Y - 1) % field_height];
  bottom = Z[X % field_width][(Y + 1) % field_height];
  left = Z[(X - 1) % field_width][Y % field_height];
  right = Z[(X + 1) % field_width][Y % field_height];
  uleft = Z[(X - 1) % field_width][(Y - 1) % field_height];
  uright = Z[(X + 1) % field_width][(Y - 1) % field_height];
  lright = Z[(X + 1) % field_width][(Y + 1) % field_height];
  lleft = Z[(X - 1) % field_width][(Y + 1) % field_height];
  avg = (center + top + bottom + left + right + uleft + uright + lright + lleft)/9;
  return avg;
}

function initialize() {
  A = [];
  B = [];
  C = [];
  An = [];
  Bn = [];
  Cn = [];
  Ad = [];
  Bd = [];
  Cd = [];
  for (var x = 0; x < field_width; x++) {
		A[x] = [];
		B[x] = [];
		C[x] = [];
		An[x] = [];
		Bn[x] = [];
		Cn[x] = [];
		Ad[x] = [];
		Bd[x] = [];
		Cd[x] = [];
		for (var y = 0; y < field_height; y++) {
	    A[x][y] = 0;
	    B[x][y] = 0;
	    C[x][y] = 0;
	    An[x][y] = A[x][y];
	    Bn[x][y] = B[x][y];
	    Cn[x][y] = C[x][y];
	    Ad[x][y] = A[x][y];
	    Bd[x][y] = B[x][y];
	    Cd[x][y] = C[x][y];
		}
  }
}

function sliderSetup(min, max, step) {
  sliderAlpha = createSlider(min, max, Alpha, step);
  sliderAlpha.position(field_width + 20, 20);
  sliderBeta = createSlider(min, max, Beta, step);
  sliderBeta.position(field_width + 20, 50);
  sliderGamma = createSlider(min, max, Gamma, step);
  sliderGamma.position(field_width + 20, 80);
  Alpha = sliderAlpha.value();
  Beta = sliderBeta.value();
  Gamma = sliderGamma.value();
}

function sliderValueInput() {
  Alpha = sliderAlpha.value();
  Beta = sliderBeta.value();
  Gamma = sliderGamma.value();
}

function textSetup() {
  textSize(20);
  textFont('Monospace');
  text("alpha: "+str(sliderAlpha.value()), sliderAlpha.x + sliderAlpha.width + 10, sliderAlpha.y + sliderAlpha.height/2);
  text("beta: "+str(sliderBeta.value()), sliderBeta.x + sliderBeta.width + 10, sliderBeta.y + sliderBeta.height/2);
  text("gamma: "+str(sliderGamma.value()), sliderGamma.x + sliderGamma.width + 10, sliderGamma.y + sliderGamma.height/2);
}

function mouseClicked() {
  if ((mouseX < field_width && mouseX > 0) && (mouseY < field_height && mouseY > 0)) {
		for (var x = 0; x < field_width; x++) {
	  	for (var y = 0; y < field_height; y++) {
				A[x][y] = random(0.0, 0.5);
				B[x][y] = random(0.0, 0.5);
				C[x][y] = random(0.0, 0.5);
	  	}
		}
	}
}

function buttonSetup() {
  var button = createButton("Reset");
  button.position(8, field_height + 20);
  button.mousePressed(initialize);
}

function frDisplay() {
	if (frameCount % 10 == 0) {
		fr = frameRate();
	}
	text(str(floor(fr)) + " f/s", field_width - 70, field_height + 25);
}
