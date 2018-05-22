function MagicCarpet() {

  this.location = -400;

  this.roll = function() {
    push();
    translate(0, 0, this.location);
    rotateX(-PI / 2);
    texture(img);
    plane(250, 1200);

    rotateX(PI / 2);
    pop();
  }
  
  this.fly = function() {
    this.location -= 1800;
  }

}