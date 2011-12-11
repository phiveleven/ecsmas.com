/**
 * Jason Mooberry
 * @jasonmoo  
 *
 */
var snowflake = function(hash) {
  
  function Key(key) {
    key = (function(t){
      Phi=.5+Math.sqrt(5)/2; 
      var s = t.toString().replace(/./g, function(l){ 
        return (l*Phi*(t%215 + 1)).toString(16);
      }).replace('.',''); 
      return s;
    })(parseInt(key,36));
    
    this.key = key.match(/(..)/g).map(function(a) { return parseInt(a,16) });
    this.shift = function() {
      var val = this.key.shift();
      this.key.push(val);
      return val;
    }
  }
  
  var 
    context = document.getElementById('gift').getContext('2d'),
    key = new Key(hash),
    size = 500, center = size/2;

  context.clearRect(0,0,size,size);
    
  var 
    a = key.shift(), b = key.shift(),
    limb_radius = get_in_range(Math.max(a,b),40,180),
    limb_width = get_in_range(key.shift(),2,30),
    inner_radius = get_in_range(Math.min(a,b),1,limb_radius);
    teeth_number = get_in_range(key.shift(),3,10)
  
  // first the main limbs
  var coords = get_coords(limb_radius);
  context.lineWidth = limb_width;
  context.lineCap = 'round';
  context.strokeStyle = 'rgba(0,0,222,.7)';
  context.beginPath();
  while (coords.length) {
    var c = coords.shift();
    context.moveTo(center,center);
    context.lineTo(c.x,c.y);
  }
  context.stroke();
  
  // next the inner limbs
  var coords = get_coords(inner_radius);
  context.fillStyle = 'rgba(0,0,222,.8)';
  context.beginPath();
  var c = coords.shift();
  context.moveTo(c.x,c.y);
  while (coords.length) {
    var c = coords.shift();
    context.lineTo(c.x,c.y);
  }
  context.fill();

  // next the teeth
  var teeth_interval = Math.round((limb_radius-(limb_radius*.07))/teeth_number),
    tint = teeth_interval;
  while (teeth_number--) {
    context.beginPath();
    context.lineWidth = get_in_range(key.shift(),2,20);
    var start_coords = get_coords(tint), length = get_in_range(key.shift(),2,70);
    while (start_coords.length) {
      var s = start_coords.shift(), e = point_on_circle(s.x,s.y,60+s.angle,length);
      context.moveTo(s.x,s.y);
      context.lineTo(e.x,e.y);
      e = point_on_circle(s.x,s.y,s.angle-60,length);
      context.moveTo(s.x,s.y);
      context.lineTo(e.x,e.y);
    }
    tint += teeth_interval;
    context.stroke();
  }


  function get_coords(radius) {
    var degrees = 360, coords = [];
    while (degrees) {
      var poc = point_on_circle(center,center,degrees,radius);
      poc.angle = degrees;
      coords.push(poc);
      degrees -= 60;
    }  
    return coords;
  }
  
  function point_on_circle(centerx,centery,angle,radius) {
    // Convert from degrees to radians via multiplication by PI/180        
    return {
      x: (radius * Math.cos(angle * Math.PI / 180)) + centerx,
      y: (radius * Math.sin(angle * Math.PI / 180)) + centery
    }
  }
  
  function get_in_range(value,low,high) {
    return ~~((value*(high-low))/255+low);
  }
}
