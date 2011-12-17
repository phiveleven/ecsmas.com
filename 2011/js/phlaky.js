/**
 * Ye olde Ecsmas Phlake
 *
 * @darkgoyle
 * circa 2010
 */
var phlake = function(num, x,y, context, key){

  var t = new Date*num,
    n = (function(n){
     while (n > 1)
       n /= Math.exp(PHI,t);
     return n;
    })(t % 215);

  var ctx = context,
    canvas = context.canvas;

  ctx.save();
  // re-center coordinates
  ctx.translate(x,y);
  // serendipitous rotational offset
  ctx.rotate(TWOPI*Math.random());
  ctx.scale(.05,.05);

  // brush width relative to canvas size
  var brush = canvas.width/canvas.height*91;
  var r_max = Math.min(canvas.width/2, canvas.height/2) - brush;

  // hexagonal point
  function point(p, r){
    r = r || brush;
    var  x = -r/2,
         y = (-r/2)/PHI;
    ctx.save();
    ctx.translate(p[0], p[1]);
    var sym = 3,
        i = sym;
    while (i){
      ctx.fillRect(x, y, r, r/PHI);
      ctx.rotate(TWOPI/sym);
      i--;
    }
    ctx.restore();
  }

  // phlake API
  var phlake = {
    clear: function(){
      var r = 1000;
      ctx.clearRect(-r, -r, 2*r, 2*r);
    },
    rotate: function(x){ ctx.rotate(TWOPI/x) },
    point: point,
    flake: function(n){
      ctx.save();
      var r = r_max,
          red,
          x = Math.cos(TWOPI/12*(n+1)),
          y = Math.sin(TWOPI/12*(n+1));
      while(r > 0){
        for (var i=0; i<6; i++){

          red = Math.floor(100 * (r/(r_max)));
          ctx.fillStyle = 'rgba($r,$g,$b,$a)'.replace(/\$(\w)/g, function($0, $1){
            return { r: red, g: 255-red, b:255, a: 15/r/PHI }[$1];
          });

          point([r, 0], brush*n);
          for (var s = (r + r*n/2); s > r; s-=150*n){
            point([x*s, -y*s], brush/PHI);
            point([x*s, y*s], brush/PHI);
          }

          ctx.rotate(TWOPI/6);
        }
        r -= brush/PHI;
      }
      ctx.restore();
    }
  }

  phlake.flake(n);
  phlake.flake(n/Math.PI*PHI);
  phlake.flake(n/Math.PI/PHI);
  ctx.restore();
};
