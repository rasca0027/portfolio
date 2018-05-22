function Building() {

  this.height;

  this.display = function(item) {
    if (item >= amps.length) {
      this.height = 0;      
    } else {
      this.height = amps[item];
    }
    
    box(60, this.height, 60);
    
  }

}