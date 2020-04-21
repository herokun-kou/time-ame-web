// code.js
var backgroundImage = document.getElementById('background_image');

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

function reposition() {

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
