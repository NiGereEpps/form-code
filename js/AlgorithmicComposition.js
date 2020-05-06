function setup() {
  //Inspired by Code Spirals made with Python's Turtle Graphics
  //By Ni'Gere Epps
  createCanvas(windowWidth, windowHeight);
  background('black');
  w = width / 2, h = height / 2;
  bound = (1.5 * (w + h));
  x = 0, rot = 0, chue = 0;
  r = 0, g = 0, b = 0;

  /*
  Adjustable variables:
    mode: Enter desired composition mode:
      1: (original) rainbow gradient spiral effect
      2: random color spiral effect
      3: black and white spiral effect
      4: rainbow gradient pyramid / tunnel effect
      5: random color pyramid / tunnel effect
      6: black and white pyramid / tunnel effect
      
    mousemode: Control center of composition with mouse
      0: disabled
      1: enabled
      
    speed: Enter desired rotation speed
    space: Enter desired space between lines
  */
  mode = 1
  mousemode = 0
  speed = 0.01
  space = 2

  //Additional Variables 
  hueInc = 360/bound * space
  bwInc = 255/bound * space
}

function draw() {

  if (x < bound) { //stops once too large to conserve resources
    
    if(mousemode === 1)
      translate (mouseX, mouseY)
    
    else
      translate(w, h)
    
    if (mode === 2 || mode === 5) { //random color
      r = random(255);
      g = random(255);
      b = random(255);
      stroke(r, g, b)
    } 
    
    else if (mode === 3 || mode === 6) { //b&w
      r += bwInc;
      g += bwInc;
      b += bwInc;
      stroke(r,g,b)
    } 
    
    else { //rainbow gradient
      colorMode(HSL, 360);
      stroke(chue, 200, 200);
      chue+= hueInc
    }
   
    if (mode === 1 || mode === 2 || mode === 3) //spiral
      rotate(rot += speed)
    
    fill(0, 0, 0, 0)
    rect(-x / 2, -x / 2, x, x)
    x += space
  }
}