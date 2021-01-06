


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

const speed = 0.04;

let newStyle;

// Follow mouse movement
function updateMousePosition(e) {
    mouseX = e.pageX/vwTOpx(20);
    mouseY = e.pageY/vwTOpx(20);
    // trick to stop the cube on landing 
};

function rotateCube(e) {
    if (pause) {
        
    } else {
        lastXDeg = lastXDeg + (getAngle(mouseX) - lastXDeg) * speed;
        lastYDeg = lastYDeg + (getAngle(mouseY) - lastYDeg) * speed;
        newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
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

// show Cube's face 
let showFace = (faceIndex) => {
  cube.style.transition = 'transform 0.5s';
  let face;
  switch (faceIndex) {
    // Molengeek Video - Back
    case 0:
      cube.style.transform = `translateZ(0vw) rotateY(-180deg)`;
      // launch video
      let video = document.querySelector('#molengeek-video');
      video.src = "https://www.youtube.com/embed/D9aK6z8fXe4?|&autoplay=1"; 
      face = video.parentElement;
      break;
    // ULB -right
    case 1:
      cube.style.transform = `translateZ(${defaultPerspective}) rotateY(-90deg)`;
      face = document.querySelector('.right')
      break;
    // Jourdan -left
    case 2:
      cube.style.transform = `translateZ(${defaultPerspective}) rotateY(90deg)`;
      face = document.querySelector('.left')
      break;
    default:
      console.log('error switch show face cube -caroussel')
        break;
        // SIDES PROPERTIES:
        // // front
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateY(0deg)`;
        // // right
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateY(-90deg)`;
        // // back
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateY(-180deg)`;
        // // left
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateY(90deg)`;
        // // top
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateX(-90deg)`;
        // // bottom
        // cube.style.transform = `translateZ(${defaultPerspective}) rotateX(90deg)`;
  };
  // opacity
  for (let i = 0; i < allFaces.length; i++) {
    allFaces[i].style.opacity = 0.5;
  };
  face.style.opacity = 1;
};
// // CUBE end

// GET THE CAROUSSEL WITH THE CUBE
let covers = document.querySelectorAll('.cover');
let cubeClick = false;
let divXP = document.querySelector('#list-experience');
cube.addEventListener('click',function(){
  if (!cubeClick) {
    // to launch Molengeek video on first click
    setTimeout(() => {
      slideNextBtn.click();
      pause = true;
    }, 300);
  };
  cube.style.transition = '0.4s'; 
  divXP.style.transition = '0.4s';
  divXP.classList.add('appears');
  // reveal the cube
  for (let i = 0; i < covers.length; i++) {
    covers[i].classList.remove('cover');    
  };
  cubeClick = true;
});
// put back covers 
let sectionSkills = document.querySelector('#skills');
sectionSkills.addEventListener('mouseenter',function(){
  for (let i = 0; i < covers.length; i++) {
    covers[i].classList.add('cover');
  };
  divXP.classList.remove('appears');
});

// carousel start 
let slider = document.querySelector('#slider');
let slides = slider.children;
let slideNextBtn = document.querySelector('.slider-next');
let showingSlideN = 0;
let activeSlide = slides[showingSlideN];
let activeIndex;

// active
let isActive = () => {
  for (let i = 0; i < slides.length; i++) {
    let activeClass = slides[i].getAttribute('class');
    if (activeClass.includes('active')) {
      showingSlideN = i;  
    };
  };
  activeSlide = slides[showingSlideN];
  return activeSlide;
};
// 
slideNextBtn.addEventListener('click',function(){
  isActive();
  // show cube face and begin new turn
  pause = true;
  if (showingSlideN===slides.length -1) {
    activeIndex = 0;
  } else {
    activeIndex = showingSlideN+1;
  }
  let newSlide = slides[activeIndex];
  showFace(activeIndex);
  activeSlide.classList.add("out-next");
  newSlide.classList.add('translate-next',"active");
  setTimeout(() => {
    activeSlide.classList.remove('active',"out-next");
    newSlide.classList.remove('translate-next');
    cube.style.transition = 'none';
  }, 500);

  

});
// carousel end

// skills Hover
let skillItems = document.querySelectorAll('.skill-item');
for (let i = 0; i < skillItems.length; i++) {
  let levelSpan = skillItems[i].querySelector('span');
  let logo = skillItems[i].querySelector('.logo');
  skillItems[i].addEventListener('mouseenter',function(){
    setTimeout(() => {
      logo.style.opacity = 0;
      levelSpan.style.opacity = 1;
    }, 300);
  });
  skillItems[i].addEventListener('mouseleave',function(){
    setTimeout(() => {
      logo.style.opacity = 1;
      levelSpan.style.opacity = 0;
    }, 900);
  });
}
