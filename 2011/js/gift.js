/**
 * Jason Mooberry
 * @jasonmoo  
 *
 */
window.snowflake = function(num, x,y, context, key) {
  
  function Key(num) {
    var key = new Date/num;
    key = (function(t){
      var s = t.toString().replace(/./g, function(l){ 
        return (l*PHI*(t%215 + 1)).toString(16);
      }).replace('.',''); 
      return s;
    })(key);
    
    this.key = key.match(/(..)/g).map(function(a) { return parseInt(a,16) });
    this.shift = function() {
      var val = this.key.shift();
      this.key.push(val);
      return val;
    }
    this.orig_key = key;
  }
  function get_in_range(value,low,high) {
    return ((value*(high-low))/255+low)|0;
  }
  
  var key = key || new Key(num);

  var 
    a = key.shift(), b = key.shift(),
    limb_radius = get_in_range(Math.max(a,b),40,180),
    limb_width = get_in_range(key.shift(),2,30),
    inner_radius = get_in_range(Math.min(a,b),1,limb_radius),
    teeth_number = get_in_range(key.shift(),3,10),
    sf_radians = 60..degreesToRadians();

  // set starting point, angle, and scale
  context.save();
  context.translate(x,y);
  context.rotate(sf_radians/2);
  context.scale(.1,.1);

  // first the main limbs
  var limbs = 6;
  context.lineWidth = limb_width;
  context.lineCap = 'round';
  context.strokeStyle = 'rgba(0,0,222,.7)';
  context.beginPath();
  while (limbs--) {
    context.moveTo(0,0);
    context.lineTo(0,limb_radius);
    context.rotate(sf_radians);
  }
  context.stroke();
  
  // next the inner limbs
  var points = 7;
  context.fillStyle = 'rgba(0,0,222,.8)';
  context.beginPath();
  context.moveTo(0,0);
  while (points--) {
    context.lineTo(0,inner_radius);
    context.rotate(sf_radians);
  }
  context.fill();

  // next the teeth
  var teeth_interval = Math.round((limb_radius-(limb_radius*.07))/teeth_number),
    tint = teeth_interval,
    neg2sf_radians = -2*sf_radians;
  while (teeth_number--) {
    context.beginPath();
    context.lineWidth = get_in_range(key.shift(),2,20);
    var limbs = 6,
      length = get_in_range(key.shift(),2,70);
    while (limbs--) {
      context.save();
      context.translate(0,tint);
      context.rotate(sf_radians);
      context.moveTo(0,0);
      context.lineTo(0,length);
      context.rotate(neg2sf_radians);
      context.moveTo(0,0);
      context.lineTo(0,length);
      context.restore();
      context.rotate(sf_radians);
    }
    tint += teeth_interval;
    context.stroke();
  }

  context.restore();
  return key.orig_key;
}
