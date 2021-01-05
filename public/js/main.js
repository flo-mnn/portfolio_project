


// // CUBE start
// https://medium.com/@josephwong2004/how-to-do-rotating-cube-with-mouse-tracking-in-css-a2366b69fd73
const defaultPerspective = '-10vw';
const section = document.getElementById('experience');
section.addEventListener('mousemove',updateMousePosition);

let cube = document.getElementsByClassName('cube')[0];
let pause = false;
// test stop cube
let allFaces = document.querySelectorAll('.cube-face');
for (let i = 0; i < allFaces.length; i++) {
  allFaces[i].addEventListener('mouseenter',function(){
    pause = true;
    console.log(pause); 
  });  
  allFaces[i].addEventListener('mouseleave',function(){
    pause = false;
  }); 
};

// Track the mouse movemont
let mouseX = 0;
let mouseY = 0;
let lastXDeg = 0;
let lastYDeg = 0;

const speed = 0.07;

// Follow mouse movement
function updateMousePosition(e) {
    mouseX = e.pageX/vwTOpx(20);
    mouseY = e.pageY/vwTOpx(20);
};

function rotateCube(e) {
    if (pause) {
        
    } else {
        lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg) * speed;
        lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg) * speed;
        let newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
        cube.style.transform = newStyle;
    };
}
// this function return the corresponding angle for an x value
function getAngle(x) {
    return 180 - 360 * x;
};
// Helper function to get page Width
function vwTOpx(value) {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    var result = (x*value)/100;
    return result;
};

setInterval(rotateCube, 66);

// // CUBE end

// let video = document.querySelector('#molengeek-video');
// video.autoplay();