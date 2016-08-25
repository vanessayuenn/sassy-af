var vid;
var vidReady = false;
var vScale = 16;

function setup() {
  pixelDensity(1);
  rectMode(CENTER);
  vid = createCapture(VIDEO).parent('p5video');
  createCanvas(640, 480).parent('p5canvas');
  background(50);
  vid.hide();
}

function draw() {
  vid.loadPixels();
  loadPixels();
  // manipulate pixels of canvas from video pixels
  for (var y = 0; y < vid.height; y++) {
    for (var x = 0; x < vid.width; x++) {
      var i = (vid.width - x + 1 + (y * vid.width)) * 4;

      // glitch manipulation
      pixels[i + 2/x] = vid.pixels[i];
      pixels[i + 2*y] = vid.pixels[i+1];
      pixels[i + 2] = vid.pixels[i+2];

      // normal
      // pixels[i + 0] = vid.pixels[i];
      // pixels[i + 1] = vid.pixels[i+1];
      // pixels[i + 2] = vid.pixels[i+2];

      pixels[i + 3] = 255;
    }
  }
  updatePixels();
}