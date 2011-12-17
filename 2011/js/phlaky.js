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
  
  var sym = 3,
    TWOPIsym = TWOPI/sym;
  // hexagonal point
  function point(p, r){
    var  x = -r/2,
         y = x/PHI;
    ctx.save();
    ctx.translate(p[0], p[1]);
    var i = sym,
        rPHI = r/PHI;
    while (i) {
      ctx.fillRect(x, y, r, rPHI);
      ctx.rotate(TWOPIsym);
      i--;
    }
    ctx.restore();
  }

  // phlake API
  var phlake = function(n){
    var r = r_max,
        red,
        x = Math.cos(TWOPI/12*(n+1)),
        y = Math.sin(TWOPI/12*(n+1)),
        brushPHI = brush/PHI,
        twoPI6 = TWOPI/6,
        brushn = brush*n,
        n150 = 150*n;
    while(r > 0){
      red = Math.floor(100 * (r/(r_max)));
      ctx.fillStyle = 'rgba('+red+','+(255-red)+',255,'+(15/r/PHI)+')';
      for (var i=0; i<6; i++){
        point([r, 0], brushn);
        for (var s = (r + r*n/2); s > r; s-=n150){
          point([x*s, -y*s], brushPHI);
          point([x*s, y*s], brushPHI);
        }

        ctx.rotate(twoPI6);
      }
      r -= brushPHI;
    }
  }

  phlake(n);
  phlake(n/Math.PI*PHI);
  phlake(n/Math.PI/PHI);
  ctx.restore();
};
