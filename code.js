// code.js
var backgroundImage = document.getElementById('background_image');

if(preferences.useBgBlur){
  backgroundImage.style.filter = 'blur(7.5px)';
} else {
  backgroundImage.style.filter = 'blur(0px)';
}

function rescaleBackgroundImage() {
  if(backgroundImage.clientWidth / backgroundImage.clientHeight > window.innerWidth / window.innerHeight){
    if(preferences.bgHorizontalGravity == 'center'){
      backgroundImage.style.left = '50%';
      backgroundImage.style.top = '';
      backgroundImage.style.transform = 'translateX(-50%)';
    } else {
      backgroundImage.style[preferences.bgHorizontalGravity] = '0px';
    }
    backgroundImage.style.width = 'auto';
    backgroundImage.style.height = '100%';
  } else {
    if(preferences.bgVerticalGravity == 'center'){
      backgroundImage.style.left = '';
      backgroundImage.style.top = '50%';
      backgroundImage.style.transform = 'translateY(-50%)';
    } else {
      backgroundImage.style[preferences.bgVerticalGravity] = '0px';
    }
    backgroundImage.style.width = '100%';
    backgroundImage.style.height = 'auto';
  }
}

var MIN_WINDOW_WIDTH = 880;

function reposition() {
  var timeObject = document.getElementById('time');
  if(window.innerWidth < MIN_WINDOW_WIDTH){
    timeObject.style.right = '';
    timeObject.style.left = '50%';
    timeObject.style.transform = 'translateX(-50%)';
  } else {
    timeObject.style.right = '25rem';
    timeObject.style.left = '';
    timeObject.style.transform = '';
  }
}

window.addEventListener('resize', rescaleBackgroundImage);
window.addEventListener('resize', reposition);
rescaleBackgroundImage();
reposition();


var darkmode = document.getElementById('darkmode');

if(!preferences.useDarkMode){
  darkmode.parentNode.removeChild(darkmode);
} else {
  darkmode.style.backgroundColor = 'rgba(0, 0, 0, ' + preferences.darkModeAmount + ')';
}


var digitEach = document.getElementById('time_digit_min_1').childNodes[1];
var digitHeight = digitEach.clientHeight + parseFloat(window.getComputedStyle(digitEach).marginBottom);
var digits = [
  document.getElementById('time_digit_hour_10'),
  document.getElementById('time_digit_hour_1'),
  document.getElementById('time_digit_min_10'),
  document.getElementById('time_digit_min_1'),
  document.getElementById('time_digit_sec_10'),
  document.getElementById('time_digit_sec_1')
];
var pauseTime = false;
var pastTimeData = [-1, -1, -1, -1, -1, -1];
var DIGIT_ANIM_DURATION = 300;
var DIGIT_OFFSET = 25;

function refreshTime() {
  if(pauseTime) return;
  var currentTime = new Date();
  var timeData = [
    Math.floor(currentTime.getHours()/10),
    currentTime.getHours()%10,
    Math.floor(currentTime.getMinutes()/10),
    currentTime.getMinutes()%10,
    Math.floor(currentTime.getSeconds()/10),
    currentTime.getSeconds()%10,
  ];
  for(var i = 0; i < digits.length; i++){
    if(timeData[i] != pastTimeData[i]){
      var player = digits[i].animate([
        {top: window.innerHeight/2 - (pastTimeData[i] * digitHeight + DIGIT_OFFSET) + 'px'},
        {top: window.innerHeight/2 - (timeData[i] * digitHeight + DIGIT_OFFSET) + 'px'}
      ], {
        duration: DIGIT_ANIM_DURATION,
        easing: "ease-out",
        fill: "forwards"
      });
      digitDiv = digits[i].getElementsByTagName('div');
      for(var j = 0; j < digitDiv.length; j++){
        var targetOpacity = j == timeData[i] ? 1 : 0.3;
        digitDiv[j].animate([
          {opacity: window.getComputedStyle(digitDiv[j]).opacity},
          {opacity: targetOpacity}
        ], {
          duration: DIGIT_ANIM_DURATION,
          fill: "forwards"
        });
      }
    }
  }
  pastTimeData = timeData;
  setTimeout(function() {
    refreshTime();
  }, 50);
}

refreshTime();

var textObject = document.getElementById('text');
textObject.innerHTML = preferences.mainText + '<br>' + preferences.subText;
