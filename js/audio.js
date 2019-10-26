var audios = [
  { 
    id: 'audio1',
    scrollPlayed: false
  }
];

var muteAll = true;

document.getElementById('toggle-mute').onclick = function () {
  var icon = this.querySelector('i');
  
  if (muteAll) {
    changeLogo(icon, 'volumn-mute', 'volumn-up');
    this.innerHTML = "Just a joke, I cheat you to click, Now Scroll can play sound audio";
  } else {
    changeLogo(icon, 'volumn-up', 'volumn-mute');
    this.innerHTML = "Unmuted Now";
  }
  muteAll = !muteAll;
}

document.getElementById("audio1").onclick = function() {
  var fatherElement = document.getElementById("audio1");
  triggerAudio(fatherElement);
};

window.onscroll = function() {
  handleAudioWhenScroll()
};

function handleAudioWhenScroll() {
  logCurrentLocation();
  if (document.documentElement.scrollTop > 600) {
    // dectect scroll for first audio 
    // this function run only one time when audio not played
    if (!audios[0].scrollPlayed) {
      var fatherElement = document.getElementById(audios[0].id);
      triggerAudio(fatherElement);
      audios[0].scrollPlayed = true;
    }
  }
}

function logCurrentLocation() {
  console.log('current location:', document.documentElement.scrollTop);
}

function triggerAudio(fatherElement) {
  var audio = fatherElement.querySelector("audio");
  var icon = fatherElement.querySelector("i");
  
  console.log('audio trigger');
  console.log('audio state:', audio.paused);

  if (audio.paused) {
    playAudioAndChangeIcon(audio, icon);
  } else {
    pauseAudioAndChangeIcon(audio, icon);
  }
}

function playAudioAndChangeIcon(audio, icon) {
  play(audio);
  changeLogo(icon, 'play', 'pause');
}

function pauseAudioAndChangeIcon(audio, icon) {
  pause(audio);
  changeLogo(icon, 'pause', 'play');
}

function play(audio){
  setTimeout(audio.play(), 1000);
}

function pause(audio){
  audio.pause();
}

function changeLogo(icon, oldState, newState) {
  var iconClass = {
    play: 'fa-play',
    pause: 'fa-pause',
    'volumn-mute': 'fa-volume-mute',
    "volumn-up": 'fa-volume-up'
  }
  let oldClass = iconClass[oldState];
  let newClass = iconClass[newState];

  swapClass(icon, oldClass, newClass);
}

function swapClass(icon, oldClass, newClass) {
  icon.classList.remove(oldClass);
  icon.classList.add(newClass);
}

// ======================== Stackoverflow Solution ======================== //
// $( "span" ).prependTo( "#foo" );


//index.js
// let audioPlaying = true;
// let backgroundAudio;
// let browser;

// browser = navigator.userAgent.toLowerCase();

// $('<audio class="audio1" src="https://static01.nyt.com/newsgraphics/2017/11/22/chicago-inv/db14dce8dfe269ee163bffcf2d51ce45671277d6/audio/shirley.mp3" loop></audio>').prependTo('body');
// if (!browser.indexOf('firefox') > -1) {
//     $('<embed id="background-audio" src="https://static01.nyt.com/newsgraphics/2017/11/22/chicago-inv/db14dce8dfe269ee163bffcf2d51ce45671277d6/audio/shirley.mp3" autostart="1"></embed>').prependTo('body');

//     backgroundAudio = setInterval(function() {
//       $("#background-audio").remove();
//       $('<embed id="background-audio" src="https://static01.nyt.com/newsgraphics/2017/11/22/chicago-inv/db14dce8dfe269ee163bffcf2d51ce45671277d6/audio/shirley.mp3"></embed>').prependTo('body');
//     }, 120000);
//       //120000 is the duration of your audio which in this case 2 mins.
// }

// $(".toggle-audio").on('click', function(event) {
//   audioPlaying = !audioPlaying;
//   $("#background-audio").remove();
 
//   clearInterval(backgroundAudio);

//   if(audioPlaying){
//     $(".audio1").play();
//     //play audio 
//   } else{
//     $(".audio1").pause();
//   }
// });