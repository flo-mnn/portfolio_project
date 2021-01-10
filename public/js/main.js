
// // VARIABLES

// cursor
let cursor = document.querySelector('.cursor');
let cursorOpacity05 = [document.querySelectorAll('span'),document.querySelectorAll('h1'),document.querySelectorAll('h3'),document.querySelectorAll('h5'),document.querySelectorAll('p'),document.querySelectorAll('button'),document.querySelectorAll('a'),document.querySelectorAll('.cube'),document.querySelectorAll('i'),document.querySelectorAll('img'),document.querySelectorAll('#logo'),document.querySelectorAll('.interests-item'),document.querySelectorAll('input'),document.querySelectorAll('textarea')]; cursorOpacity05.flat();

// wings 
let mainTitle = document.querySelector('#main-title-box');
let wingsDeployed;
let wingsSvgs = home.querySelectorAll('svg');
let wingsCall = 0; //otherwise, a closure of the wings happens 20sec after each enter of the mouse, which can make the wings close prematurely

// credits slideIn
let copyrightDiv = document.querySelector('#copyright');
let credits = document.querySelectorAll('.credits');
let copyCall = 0;

// navbar
let navToggle = document.querySelector('#navbar-toggle');
let dots = navToggle.querySelector('.fa-ellipsis-h');
let circle = navToggle.querySelector('.fa-circle');
let navMenu = document.querySelector('.nav-menu');
let navItems = navMenu.querySelectorAll('a');
let sections = document.querySelectorAll('section');
let sectionOnDisplay = sections[0];
let loader = document.querySelector('#loading-page');

// // Cube & caroussel
// https://medium.com/@josephwong2004/how-to-do-rotating-cube-with-mouse-tracking-in-css-a2366b69fd73

const defaultPerspective = '-10vw';
const sectionCube = document.getElementById('experience');
let cube = document.getElementsByClassName('cube')[0];
let pause = false;
let allFaces = document.querySelectorAll('.cube-face'); //for pause on hover

// Track the mouse movemont
let mouseX = 0;
let mouseY = 0;
let lastXDeg = 0;
let lastYDeg = 0;
const speed = 0.04;
let newStyle;

let covers = document.querySelectorAll('.cover');
let cubeClick = false;
let divXP = document.querySelector('#list-experience');

let slider = document.querySelector('#slider');
let slides = slider.children;
let slideNextBtn = document.querySelector('.slider-next');
let showingSlideN = 0;
let activeSlide = slides[showingSlideN];
let activeIndex;

let sectionSkills = document.querySelector('#skills');

// languages - radial progress
let lgSection = document.querySelector('#languages');
let languages = document.querySelectorAll('.lg');

// folio letters to paint
let sectionConstruction = document.querySelector('#construction');
let t1 = sectionConstruction.querySelector('h5').querySelectorAll('span');
let t2 = sectionConstruction.querySelector('h1').querySelectorAll('span');
let brush = document.createElement('i');
brush.setAttribute('class',"fas fa-paint-brush fa-2x");
brush.style.color = "var(--color)";

// themes
let themeSand = {
  name: "sand",
  url: "joshua-sortino-m5P0c6ABWDs-unsplash.jpg",
  bgPosition: "top center",
  bgSize: "cover",
  color:  "#CB8D63",
  light: "#d4c0b3",
  dark: "#4D433C",
};
let themePink = {
  name: "sunset",
  url: "samuel-ferrara-dKJXkKCF2D8-unsplash.jpg",
  bgPosition: "center",
  bgSize: "cover",
  color:  "#B77973",
  light: "#d4c0b3",
  dark: "#855854",
};
let themeBee = {
  name: "bee",
  url: "oxa-roxa-bnFuB--1lE4-unsplash.jpg",
  bgPosition: "center",
  bgSize: "cover",
  color:  "#e7ad4a",
  light: "#C1A96B",
  dark: "#5D633C",
};
let allThemes = [themeSand,themeBee,themePink];
let logo = document.querySelector('#logo');


// // FUNCTIONS

// cursor location
let moveCursor = (e) => {
    // for section full page with no scroll, based on clientW/H
    if ((sectionOnDisplay === sections[0]) && (document.documentElement.clientWidth -24 <= e.pageX|| document.documentElement.clientHeight -24<= e.pageY)) {
        cursor.style.top = e.pageY - 48 +"px";
        cursor.style.left = e.pageX -48 +"px";
    } else {
        cursor.style.top = e.pageY - 24 +"px";
        cursor.style.left = e.pageX -24 +"px";
        // otherwise, based on innerW (no need of height since there is a scrollbar on Y anyway)
        if (e.pageX +24 >= document.documentElement.clientWidth) {
            cursor.style.left = (document.documentElement.clientWidth - 48) +"px";
        }; 
    };
};

let lightenCursor = () => {
    for (let i = 0; i < cursorOpacity05.length; i++) {
        let nodesI = cursorOpacity05[i];
        for (let i = 0; i < nodesI.length; i++) {
          // nodesI[i].style.cursor = "none";
          nodesI[i].addEventListener('mouseover',function(){
            cursor.style.opacity = '0.5';
          });
          nodesI[i].addEventListener('mouseout',function(){
            cursor.style.opacity = '1';
          });
        };
    };
}


// wings
let closeWings = () => {
    for (let i = 0; i < wingsSvgs.length; i++) {
      wingsSvgs[i].classList.remove('moveWings');
      setTimeout(() => {
        wingsSvgs[i].classList.remove('deployWings');
      }, 1300);
    };
  };

let deployWings = () => {
wingsCall++;
if (wingsCall===1) {
    for (let i = 0; i < wingsSvgs.length; i++) {
    wingsSvgs[i].parentElement.style.opacity = "1";
    wingsSvgs[i].classList.add('deployWings');
    setTimeout(() => {
        wingsSvgs[i].classList.add('moveWings');
    }, 200);
    };
    setTimeout(() => {
    closeWings();
    wingsCall=0;
    }, 20000);
}
};

// credits slideIn
let slideCredits = () => {
    copyCall ++;
    if (copyCall === 1) {
        for (let i = credits.length -1; i >= 0; i--) {
            (function(i) {
            setTimeout(function(){
                credits[i].style.transition = "0.3s";
                credits[i].style.transform = 'translateX(0)';
                }, i * 150);
            })(i);
            setTimeout(() => {
                for (let i = 0; i < credits.length; i++) {
                    if (i === credits.length -1) {
                    credits[i].style.transform = "rotate(-90deg)";  
                    } else {
                    credits[i].style.transform = 'translateX(500%)';
                    };
                };
                copyCall = 0;
            }, 5000);
        }; 
    }
};

// navbar

// -toggle part
let revealNavbar = () => {
    navMenu.classList.replace('navbar-hidden','navbar-displayed');
    // anim toggle
    dots.classList.add('dots-turn');
    circle.classList.replace('circle-shrinks','circle-grows');
    sectionOnDisplay.classList.add('blurred');
};

let hideNavbar = () => {
    navMenu.classList.replace('navbar-displayed','navbar-hidden');
    // anim toggle
    dots.style.transitionDelay = "0.2s";
    dots.classList.remove('dots-turn');
    circle.classList.replace('circle-grows','circle-shrinks');
    setTimeout(() => {
        sectionOnDisplay.classList.remove('blurred');
    }, 300);
};

//-links part
let removeOnDisplay = () => {
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('onDisplay');
      navItems[i].classList.remove('active');
      setTimeout(() => {
        sections[i].classList.remove('blurred');
      }, 300);
    };
    // remove paint brush for folio section
    if ((cursor.children).length>=1) {
      cursor.classList.remove('paint');
      cursor.removeChild(brush);
    };
  };

// change page
let changeSection = () => {
  for (let i = 0; i < navItems.length -1; i++) { //-1 remove FR click
    navItems[i].addEventListener('click',function(e){
      e.preventDefault();
      loader.classList.add('load-page');
      // on half loader animation => 3s/2=1.5s;
      setTimeout(() => {
        window.scrollTo(0,0);
        removeOnDisplay();
        sections[i].classList.add('onDisplay');
        navItems[i].classList.add('active');
        sectionOnDisplay = sections[i];
        if (i === 3) {
          cursor.classList.add('paint');
          cursor.appendChild(brush);
        };
      }, 1500);
      setTimeout(() => {
        loader.classList.remove('load-page');
      }, 3000);
    });
  };
};

// CUBE & CAROUSSEL
//  -cube
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

let coverCube = () => {
    for (let i = 0; i < covers.length; i++) {
        covers[i].classList.add('cover');
    };
    // divXP.classList.remove('appears');
};

let removeCovers = () => {
  // reveal the cube
  for (let i = 0; i < covers.length; i++) {
    covers[i].classList.remove('cover');    
    };
};

let revealXp = () => {
    sectionSkills.classList.add('cubeBlock');
    lgSection.classList.add('cubeBlock');
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
    removeCovers();
    cubeClick = true;
};

// caroussel
// -active slide
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

let slideCaroussel = () => {
    isActive();
    // show cube face and begin new turn
    pause = true;
    if (showingSlideN===slides.length -1) {
        activeIndex = 0;
    } else {
        activeIndex = showingSlideN+1;
    };
    let newSlide = slides[activeIndex];
    showFace(activeIndex);
    activeSlide.classList.add("out-next");
    newSlide.classList.add('translate-next',"active");
    removeCovers();
    setTimeout(() => {
        activeSlide.classList.remove('active',"out-next");
        newSlide.classList.remove('translate-next');
        cube.style.transition = 'none';
    }, 500);
};

// languages skills - radial progress

// helper function to get vh
function vhTOpx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  var result = (y*value)/100;
  return result;
}

let loadCircles = () => {
    if (cubeClick) {
        if (window.scrollY > vhTOpx(100)){
          for (let i = 0; i < languages.length; i++) {
            let progress = languages[i].querySelector('.front');
            let text = languages[i].querySelector('.text');
            let svg = languages[i].querySelector('svg');
            (function(i) {
              setTimeout(function(){
               svg.style.opacity = "1";
               progress.style.animation = 'fillCircle reverse';
               text.style.animation = 'displayGrade 2s forwards';
               if (text.textContent.includes('5/5')) {
                 progress.style.strokeDasharray = "565.49";
               } else if (text.textContent.includes("4/5")){
                 progress.style.strokeDasharray = "452.39";
               } else if (text.textContent.includes('3/5')){
                 progress.style.strokeDasharray = "339.30";
               };
               }, i * 1000);
           })(i);
          }
        };
    };
};

// folio paint letters
let paintLetter = (title) => {
  for (let i = 0; i < title.length; i++) {
    title[i].addEventListener('mouseenter',function(){
      title[i].classList.toggle('painted');
    });
  };
};

let changeTheme = (theme) => {
  let home = document.querySelector('#home');
  home.style.background = `url('./../../../public/img/${theme.url}') no-repeat`;
  home.style.backgroundPosition = theme.bgPosition;
  home.style.backgroundSize = theme.bgSize;
  document.documentElement.style.setProperty('--color', theme.color);
  document.documentElement.style.setProperty('--light', theme.light);
  document.documentElement.style.setProperty('--dark', theme.dark);
  if (theme === themePink) {
   let imageMe = document.querySelector("#introduction").querySelector('img');
   imageMe.style.filter = "unset";
  //  filter: sepia(100%);
  }
};

let addCta = () => {
  logo.classList.add('click');
};
let removeCta = () => {
  logo.classList.remove('click');
};

// // EVENT LISTENERS & call functions
// window.addEventListener('resize', reportWindowSize);

let smartphone = window.matchMedia("(max-width: 767px)");
let tablet = window.matchMedia("(max-width: 991px)");
let desktop = window.matchMedia("(min-width: 992px)");

let screenSize = () => {
  if (desktop.matches) {
    window.addEventListener('mousemove',moveCursor);
    lightenCursor();

      // wings
    mainTitle.addEventListener('mouseenter',deployWings);

    navMenu.addEventListener('mouseleave',hideNavbar);

  } else if (tablet.matches) {
    if (smartphone.matches) {

      for (let i = 0; i < sections.length; i++) {
        sections[i].addEventListener('mousedown',hideNavbar);
      };
    } else { //tablet

      // wings
      mainTitle.addEventListener('mouseenter',deployWings);
      for (let i = 0; i < sections.length; i++) {
        sections[i].addEventListener('mousedown',hideNavbar);
      };

    };
  };
}


window.addEventListener('resize',function() {
    screenSize();
  }) // Attach listener function on state changes
screenSize();
  



// any size screen : 

// credits
copyrightDiv.addEventListener('mouseover',slideCredits);

// navbar
// -toggle part
navToggle.addEventListener('mouseover',revealNavbar);
// hide => see size screen functon

// -change section
changeSection();

// cube & caroussel

// cube itself
sectionCube.addEventListener('mousemove',updateMousePosition);
setInterval(rotateCube, 66);
// pause the cube :
for (let i = 0; i < allFaces.length; i++) {
    allFaces[i].addEventListener('mouseenter',function(){
      pause = true;
    });  
    allFaces[i].addEventListener('mouseleave',function(){
      pause = false;
    }); 
};

cube.addEventListener('click',revealXp);

// -carousel
slideNextBtn.addEventListener('click',slideCaroussel);

// leave cube section
sectionSkills.addEventListener('mouseenter',coverCube);
// lg skills - radial progress
window.addEventListener('scroll',loadCircles)

// paint letters
paintLetter(t1);
paintLetter(t2);

// themes
let currentTheme;
window.addEventListener('DOMContentLoaded',function(){
  let randomTheme = Math.floor(Math.random()*allThemes.length);
  currentTheme = randomTheme;
  changeTheme(allThemes[currentTheme]);
  console.log(currentTheme);
});

let themePreview;
let themePreviewCompt = 0;

logo.addEventListener('mouseenter',function(e){
  e.stopPropagation();
  console.log(currentTheme);
  themePreview = currentTheme + themePreviewCompt +1;
  if (themePreview >= allThemes.length) {
    themePreview = themePreviewCompt;
  };
  console.log(themePreview);
  addCta();
  setTimeout(() => {
    changeTheme(allThemes[themePreview]);
  }, 500);
  themePreviewCompt ++;
  if (themePreviewCompt === 2) {
    themePreviewCompt = 0;
  };
});
logo.addEventListener('mouseleave',function(){
  setTimeout(() => {
    changeTheme(allThemes[currentTheme]);
    removeCta();
  }, 500);
});
logo.addEventListener('click',function () {
  changeTheme(allThemes[themePreview]);
  currentTheme = themePreview;
  console.log(currentTheme);
  themePreviewCompt = 0;
  // svg color
  let letters = logo.querySelector('svg');
  letters.style.fill = "var(--color)";
  setTimeout(() => {
    letters.style.fill = "var(--white)";
  }, 2000);

});






// BILINGUAL
let allToTranslate = [document.querySelector('#function').querySelectorAll('h5'),document.querySelectorAll('.rights'),document.querySelectorAll('.section-title-text'),document.querySelectorAll('#location-text'),document.querySelectorAll('.intro-text'),document.querySelectorAll('.quality'),document.querySelectorAll('.interest'),document.querySelectorAll('.experience-position'),document.querySelectorAll('.company-name'),document.querySelectorAll('.date'),document.querySelectorAll('.xp-description'),document.querySelectorAll('.level'),document.querySelectorAll(".language"),document.querySelectorAll('#french'),document.querySelectorAll('textarea')]; allToTranslate.flat();

let allToTranslateNew = [];
for (let i = 0; i < allToTranslate.length; i++) {
  allToTranslateNew.push(Array.from(allToTranslate[i]));
};
allToTranslateNew = allToTranslateNew.flat();

// stock english version
let english = [];
for (let i = 0; i < allToTranslateNew.length; i++) {
  english.push(allToTranslateNew[i].textContent);
  // console.log(allToTranslateNew[i].textContent);
};
// translation
let french = ["Développeuse Web",`Tous droits réservés.`,"Florence, enchantée !","Téléchargements en cours","Jetez-y un oeil","Contactez-moi","  Bruxelles, Belgique","Salut ! Je m\'appelle Florence et je suis une jeune développeuse web. J\'ai étudié la traduction à l\'université avant de travailler comme réceptionniste dans un hôtel. Quand la Covid-19 a frappé, j\'ai réalisé qu\'il était temps pour moi d'explorer davantage ma créativité.","J\'ai toujours aimé créer des choses, des montages photos de mon skyblog d\'ado à la couture, en passant par le tricot, les DIY en tout genre, le dessin... Et maintenant, c\'est au design et développement web que je m\'attele !","Précision","Ponctualité","Disponible","Livres","DIY","Langues","Voyages","Écologie","Droits des Femmes","CodingSchool","Master en Traduction","Stagiaire","MolenGeek","Université de Bruxelles","Éditions Jourdan","Septembre 2020 - Mars 2021","Septembre 2014 - Septembre 2019","Octobre 2018 - Janvier 2019","En seulement six mois, une équipe de coachs est là pour nous guider alors qu'on se lance éperdument dans le code. Au coeur de Bruxelles, nous travaillons sans relâche pour devenir full-stack web developer. Nous commençons en douceur avec HTML et CSS, puis nous passons à la base avec JavaScript et aussi son framework React, avant de plonger dans PHP et Laravel.",`J'ai eu la chance de passer cinq années à étudier les langues de Shakespeare, de Pouchkine, mais aussi et avant tout celle de Molière. Ici, à Bruxelles, mais aussi en Russie, pendant un échange riche en apprentissage. En cinq ans, j'ai pu apprendre l'art de la traduction, un art dans lequel Google Traduction n'est pas prêt de détrôner l'humain. Cet art est bien trop subtile.`,`Pendant un semestre, j'avais un peu le boulot de rêve. Passer ses journées à lire, évaluer et corriger des manuscrits... Plutôt cool, non ? Mais aussi gérer la publication d'articles sur leurs sites internet et même en rédiger certains. `,"avancée","intermédiaire","intermédiaire","expérimentée","bases","expérimentée","expérimentée","expérimentée","expérimentée","avancée","bases","bases","anglais","français","russe","néerlandais","Langue Maternelle","Chère Florence"];


let switchLg = document.querySelector('#switchLg');
let loadLg = (lg) => {
  for (let i = 0; i < allToTranslateNew.length; i++) {
    allToTranslateNew[i].textContent = lg[i];
  };
};

if (navigator.language.includes('fr')) {
  loadLg(french);
  switchLg.textContent = "en";
};

switchLg.addEventListener('click',function(e){
  e.preventDefault();
  if (switchLg.textContent === "fr") {
    loadLg(french);
    switchLg.textContent = "en";
  } else {
    loadLg(english);
    switchLg.textContent = "fr";
  };
});
