/*!
 * MousemoveBGColors v1
 * Vanilla JS Plugin change background color depending the mouse position
 *
 * License MIT
 *
 * https://mi-ca.ch
 * Michael CAILLET
 * inspired by : https://stackoverflow.com/a/37141167 © Regis Portalez > Thanks
 */
function MousemoveBGColors(options){  
    const _this = this; 
    const defaultOptions = {
        target: "body"
       ,transition : .09
       ,delay:0
       ,center: [168, 218, 218] // green
       ,topMiddle: [168, 218, 218]
       ,leftMiddle: [236, 236, 236] // gris
       ,rightMiddle: [255, 128, 63] // orange;
      ,bottomMiddle: [204, 177, 218] // purple;
    }
    let colorsAvg = {
      topLeft:null
      ,topRight:null
      ,bottomLeft:null
      ,bottomRight:null
    };

    let ww;
    let wh;
    
    options = {...defaultOptions, ...options};
    
    this.init = function() {
        colorsAvg.topLeft=this.average(options.leftMiddle, options.topMiddle);
        colorsAvg.topRight = this.average(options.topMiddle, options.rightMiddle);
        colorsAvg.bottomLeft = this.average(options.leftMiddle, options.bottomMiddle);
        colorsAvg.bottomRight = this.average(options.bottomMiddle, options.rightMiddle);
        this.getSizes();
        
        window.addEventListener('mousemove',this.mousemove,true);
        window.addEventListener('resize',this.getSizes,true);
        document.querySelector(options.target).classList.add("mousemoveBGColorsInitialized");

    }



    this.destroy = function(){

      window.removeEventListener('mousemove',_this.mousemove,true);
      window.removeEventListener('resize',_this.getSizes,true);
      document.querySelector(options.target).classList.remove("mousemoveBGColorsInitialized");

      const target = document.querySelector(options.target);
      target.style.backgroundColor =null;

      if(options.transition>0){
        target.style.transitionDuration =null;
      }

      if(options.delay>0){
        target.style.transitionDelay =null;
      }
    }

    this.getSizes = function(){
      const win = window;
      const doc = document;
      const docEl = doc.documentElement;
      const body0 = doc.getElementsByTagName('body')[0];
      ww = win.innerWidth||docEl.clientWidth||body0.clientWidth;
      wh = win.innerHeight||docEl.clientHeight||body0.clientHeight;
    }

    this.average = function(a,b){
        return [0.5 * (a[0] + b[0]), 0.5 * (a[1] + b[1]), 0.5 * (a[1] + b[1])];
    }
    this.interpolate2D = function(x00, x01, x10, x11, x, y) {
        return x00 * (1 - x) * (1 - y) + x10 * x * (1 - y) + x01 * (1 - x) * y + x11 * x * y;
    }
    this.interpolateArray = function(x00, x01, x10, x11, x, y) {
      let result = [0, 0, 0];
      for (let i = 0; i < 3; ++i) {
        result[i] = Math.floor(_this.interpolate2D(x00[i], x01[i], x10[i], x11[i], x, y));
      }
      return result;
    }

    this.mousemove = function(e){
        
        let positionX = e.pageX / ww;
        let positionY = e.pageY / wh;
        let x00, x01, x11, x10;

        if (positionX > 0.5 && positionY > 0.5) {
        x00 = options.center;
        x01 = options.bottomMiddle;
        x10 = options.rightMiddle;
        x11 = colorsAvg.bottomRight;
        positionX = 2.0 * (positionX - 0.5); // scale position back to [0, 1]
        positionY = 2.0 * (positionY - 0.5);
      } else if (positionX > 0.5 && positionY <= 0.5) {
        x00 = options.topMiddle;
        x01 = options.center;
        x10 = colorsAvg.topRight;
        x11 = options.rightMiddle;
        positionX = 2.0 * (positionX - 0.5);
        positionY = 2.0 * (positionY);
      } else if (positionX <= 0.5 && positionY <= 0.5) {
        x00 = colorsAvg.topLeft;
        x01 = options.leftMiddle;
        x10 = options.topMiddle;
        x11 = options.center;
        positionX = 2.0 * (positionX);
        positionY = 2.0 * (positionY);
      } else if (positionX <= 0.5 && positionY > 0.5) {
        x00 = options.leftMiddle;
        x01 = colorsAvg.bottomLeft;
        x10 = options.center;
        x11 = options.bottomMiddle;
        positionX = 2.0 * (positionX);
        positionY = 2.0 * (positionY - 0.5);
      } else {
        // can't happen
      }
      const rgb=_this.interpolateArray(x00, x01, x10, x11, positionX, positionY);
      
      const target = document.querySelector(options.target);
      target.style.backgroundColor ='rgb(' + rgb.join(',') + ')';

      
      if(options.transition>0){
        target.style.transitionDuration =options.transition+'s';
      }
      if(options.delay>0){
        target.style.transitionDelay =options.delay+'s';
      }
    }
    this.init();    
}
