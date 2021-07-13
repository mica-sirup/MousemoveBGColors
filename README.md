# MousemoveBGColors
Vanilla JS Plugin change background color depending the mouse position

## DEMO
### [codepen](https://codepen.io/mica-sirup/pen/WNjRevO?editors=0011) | [jsfiddle](https://jsfiddle.net/mica/ngmoq85b/2/)

## USAGE : 
```javascript
// usage
 const bg = new MousemoveBGColors();
```
or
```javascript
// with options
 const bg = new MousemoveBGColors({
       target : '.selector' //(string) element selector // default : 'body'
      ,transition : .2 //(float|int) transition duration // default: .09
      ,delay:2 //(float|int) transition delay // default: 0 
      ,center: [255, 255, 255] //(array) rgb color in the center // default : [168, 218, 218]
      ,topMiddle: [168, 218, 218]  //(array) rgb color in top middle // default : [168, 218, 218]
      ,leftMiddle: [236, 236, 236]  //(array) rgb color in the center // default : [168, 218, 218]
      ,rightMiddle: [255, 128, 63] //(array) rgb color in the center // default : [255, 128, 63]
      ,bottomMiddle: [204, 177, 218] //(array) rgb color in the center // default : [168, 218, 218]
      });
```
## COPYRIGHT
Inspired by @JeWaVe [Regis Portalez answer on StackOverflow](https://stackoverflow.com/a/37141167) 
