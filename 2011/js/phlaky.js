/**
 * Ye olde Ecsmas Phlake
 *
 * @darkgoyle
 * circa 2010
 */
var phlake = function(num, x,y, context, key){

  var t = new Date/num,
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
  // ctx.scale(.05*Math.random(),.05*Math.random());
  ctx.scale(.04,.04);

  // brush width relative to canvas size
  var brush = window.innerWidth/window.innerHeight*91;
  var r_max = Math.min(window.innerWidth/2, window.innerHeight/2) - brush;
  
  var sym = 3,
    TWOPIsym = TWOPI/sym,
    brushPHI = brush/PHI,
    brushPHIr = -brushPHI/2,
    brushPHIrPHI = brushPHIr/PHI,
    brushPHIPHI = brushPHI/PHI,
    twoPI6 = TWOPI/6;

  // phlake API
  var phlake = function(n){
    var brushn = brush*n,
      brushnr = -brushn/2,
      brushnrPHI = brushnr/PHI,
      brushnPHI = brushn/PHI,
      r = r_max,
      red,
      x = Math.cos(TWOPI/12*(n+1)),
      y = Math.sin(TWOPI/12*(n+1)),
      n150 = 150*n;

    while(r > 0){
      red = (100 * (r/(r_max)))|0;
      ctx.fillStyle = 'rgba('+red+','+(255-red)+',255,'+(15/r/PHI)+')';
      for (var i=0; i<6; i++){
        pointn(r, 0);
        for (var s = (r + r*n/2); s > r; s-=n150){
          pointPHI(x*s, -y*s);
          pointPHI(x*s, y*s);
        }
        ctx.rotate(twoPI6);
      }
      r -= brushPHI;
    }

    // hexagonal point
    function pointn(p0,p1){
      ctx.save();
      ctx.translate(p0, p1);
      ctx.fillRect(brushnr, brushnrPHI, brushn, brushnPHI);
      ctx.rotate(TWOPIsym);
      ctx.fillRect(brushnr, brushnrPHI, brushn, brushnPHI);
      ctx.rotate(TWOPIsym);
      ctx.fillRect(brushnr, brushnrPHI, brushn, brushnPHI);
      ctx.restore();
    }
    function pointPHI(p0,p1){
      ctx.save();
      ctx.translate(p0, p1);
      ctx.fillRect(brushPHIr, brushPHIrPHI, brushPHI, brushPHIPHI);
      ctx.rotate(TWOPIsym);
      ctx.fillRect(brushPHIr, brushPHIrPHI, brushPHI, brushPHIPHI);
      ctx.rotate(TWOPIsym);
      ctx.fillRect(brushPHIr, brushPHIrPHI, brushPHI, brushPHIPHI);
      ctx.restore();
    }

  }

  phlake(n);
  phlake(n/Math.PI*PHI);
  phlake(n/Math.PI/PHI);
  ctx.restore();
};
