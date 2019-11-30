/*
Math.prototype.clamp = function(number, min, max){
    return Math.min(Math.max(number, min), max)
}*/



Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max));
  }
  
  