/**
 * Ye olde Ecsmas Phlake
 *
 * @darkgoyle
 * circa 2010
 */
var canvas = (function(canvas){

  // that's right, these are globals, fools.
  Phi=.5+Math.sqrt(5)/2;
  TwoPi=2*Math.PI;

  var ctx = canvas.getContext('2d');

  // re-center coordinates
  ctx.translate(canvas.width/2, canvas.height/2);
  // serendipitous rotational offset
  ctx.rotate(TwoPi*Math.random());

  // brush width relative to canvas size
  var brush = canvas.width/canvas.height*91;
  var r_max = Math.min(canvas.width/2, canvas.height/2) - brush;

  // hexagonal point
  function point(p, r){
    r = r || brush;
    var  x = -r/2,
         y = (-r/2)/Phi;
    ctx.save();
    ctx.translate(p[0], p[1]);
    var sym = 3,
        i = sym;
    while (i){
      ctx.fillRect(x, y, r, r/Phi);
      ctx.rotate(TwoPi/sym);
      i--;
    }
    ctx.restore();
  }

  // canvas API
  return {
    clear: function(){
      var r = 1000;
      ctx.clearRect(-r, -r, 2*r, 2*r);
    },
    rotate: function(x){ ctx.rotate(TwoPi/x) },
    point: point,
    flake: function(n){
      ctx.save();
      var r = r_max,
          red,
          x = Math.cos(TwoPi/12*(n+1)),
          y = Math.sin(TwoPi/12*(n+1));
      while(r > 0){
        for (var i=0; i<6; i++){

          red = Math.floor(100 * (r/(r_max)));
          ctx.fillStyle = 'rgba($r,$g,$b,$a)'.replace(/\$(\w)/g, function($0, $1){
            return { r: red, g: 255-red, b:255, a: 15/r/Phi }[$1];
          });

          point([r, 0], brush*n);
          for (var s = (r + r*n/2); s > r; s-=150*n){
            point([x*s, -y*s], brush/Phi);
            point([x*s, y*s], brush/Phi);
          }

          ctx.rotate(TwoPi/6);
        }
        r -= brush/Phi;
      }
      ctx.restore();
    }
  }
})(document.getElementById('phlake'));
