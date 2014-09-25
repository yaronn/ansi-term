
function Canvas(width, height) {
  this.width = width;
  this.height = height;
  //this.content = new Array(width*height);
  this.clear()
}

var methods = {
  set: function(coord) {
    this.content[coord] = '\033[47m \033[49m';
  },
  unset: function(coord) {
    this.content[coord] = null;
  },
  toggle: function(coord) {
    this.content[coord] == this.content[coord]==null?'p':null;
  }
};

Object.keys(methods).forEach(function(method) {
  Canvas.prototype[method] = function(x, y) {
    if(!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      return;
    }    
    var coord = this.getCoord(x, y)
    methods[method].call(this, coord);
  }
});

Canvas.prototype.getCoord = function(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);    
    return x + this.width*y;
}

Canvas.prototype.clear = function() {
  this.content = new Array(this.width*this.height);
};


Canvas.prototype.fillText = function(str, x, y) {
  var coord = this.getCoord(x, y)
  for (var i=0; i<str.length; i++) {    
    this.content[coord+i]=str[i]
  }  
}

Canvas.prototype.frame = function frame(delimiter) {  
  delimiter = delimiter || '\n';
  var result = [];
  for(var i = 0, j = 0; i < this.content.length; i++, j++) {
    if(j == this.width) {
      result.push(delimiter);
      j = 0;
    }

    if(this.content[i] == null) {
      result.push(' ');
    } else {
      result.push(this.content[i])
    }
  }
  result.push(delimiter);
  return result.join('');
};



module.exports = Canvas;