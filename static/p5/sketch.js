var leftPile = [];
var rightPile = [];
var amp;
var amps = [];
var xs = [];
var ys = [];
var road;
var img, sun, sound, btn;
var spectrum, fft;
var initial = false;


function preload(){
  img = loadImage("data/bg2.jpg");
  sun = loadImage("data/gradient.png");
  sound = loadSound("Adventura.mp3");  
}


function setup() {
  createCanvas(1200, 900, WEBGL);
  btn = createImg("data/play.png");
  btn.size(150, 150);
  btn.position(screen.width/2-75, screen.height/2-50);
  
  
}


function init() {
  
  
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  
  pointLight(244, 195, 100, 0, 0.5, -0.1);
  //pointLight(255, 255, 255, 0, 0.5, -0.1);


  // initialize left buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    leftPile.push(building1);
  }

  // initialize right buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    rightPile.push(building1);
  }
  
  var waveform = sound.getPeaks(60);
  
  // initialize horizon
  for (var i=0;i<=60;i++){
    xs[i] = random(60, 100);
    ys[i] = map(waveform[i], -1, 1, 30, 350);
  }

  road = new MagicCarpet();
  
}

function draw() {
  
  if (sound.isPlaying()) {
    if (!initial) {
      init();
      initial = true;
    }
    btn.remove();
    if (frameCount % 6 == 0) {
      var level = amp.getLevel();
      level = map(level, 0, 0.8, 30, 600);
      amps.push(level);
    }
  }
  
  
  if (initial) {
    spectrum = fft.analyze();
    
    background(0);
  
    // Draw the plain road.
    
    push();
    translate(0, 200, -50);
    rotateX(-PI / 2);
    texture(img);
    plane(250, 1800);
    rotateX(PI / 2);
    pop();
    
    
  
    if (frameCount % 2000 == 0) {
      generateMoreBuilding();
    }
    
    // draw sun
    push();
    translate(0, -600, -3500);
    rotateY(HALF_PI);
    texture(sun);
    sphere(650);
    pop();
    
    // something on the horizon
    push();
    translate(-1600, 100, -2900);
    ambientMaterial(20, 237, 220);
    box(1500, 10, 10);
    for (var i = 0;i <= 60; i++) {
      translate(50, 0, 0);
      ambientMaterial(20, 237, 220);
      box(xs[i], ys[i], 10);
      push();
      translate(0, 0, 100);
      fill(0);
      box(xs[i]-10, ys[i]-10, 10);
      pop();
    }
    pop();
    
    
    // camera
    if (sound.isPlaying()) {
      camera(0, 0, -frameCount % 1000 * 10 - 100);
    } else {
      camera(0, 0, 0);
    }
    
    // Draw the plain road.
    
    translate(0, 180, 0);
    if (frameCount % 180 == 0) {
      road.fly();
    }
    road.roll();
    
  
    // Draw Builidngs on left-hand side!
    push();
  
    translate(-500, 100, -200);
    for (var item = 0; item < leftPile.length; item++) {
      translate(0, 0, -560);
      push();
      translate(0, -leftPile[item].height / 2, 0);
      ambientMaterial(spectrum[0], spectrum[spectrum.length / 8], spectrum[spectrum.length / 4]);
      leftPile[item].display(item);
      pop();
    }
  
    pop();
  
    // Draw Builidngs on righthand side!
    push();
  
    translate(500, 100, -300);
    for (var item = 0; item < rightPile.length; item++) {
      translate(0, 0, -600);
      push();
      translate(0, -rightPile[item].height / 2, 0);
      ambientMaterial(spectrum[0], spectrum[spectrum.length / 8], spectrum[spectrum.length / 4]);
      rightPile[item].display(item);
      pop();
    }
  
    pop();
    
    // draw white dots
    push();
    translate(180, 0, 50);
    ambientMaterial(255);
    for(var i=0; i<=600; i++) {
      translate(0, 0, -180);
      sphere(5);
    }
    pop();
    
    // draw white dots left side
    push();
    translate(-180, 0, 50);
    //fill(191, 128, 255);
    for(var i=0; i<=600; i++) {
      translate(0, 0, -180);
      sphere(5);
    }
    pop();

  }
}



function generateMoreBuilding() {
  
  console.log("generated, ");
  
  // initialize left buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    leftPile.push(building1);
  }

  // initialize right buildings
  for (var i = 0; i <= 36; i++) {
    var building1 = new Building();
    rightPile.push(building1);
  }
  
}

function mousePressed() {
  if (!sound.isPlaying()) {
    sound.play();
    init();
    initial = true;
  }
}
