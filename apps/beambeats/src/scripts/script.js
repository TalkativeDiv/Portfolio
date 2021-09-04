//variables
const musicContainer = document.querySelector('.music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles

const songs = ['cacao','candyland','colors']; //hey they all start with a s!

//keep track of the songs
let songIndex = 2;

//functions

//update song deatils
let loadSong = (song) =>{
     title.innerText = song;
     audio.src = `src/assets/music/${song}.mp3`;
     cover.src = `src/assets/images/${song}.jpg`;
}
//play song
let playSong = () =>{
     musicContainer.classList.add('play');
     playBtn.querySelector('i.fas').classList.remove('fa-play');
     playBtn.querySelector('i.fas').classList.add('fa-pause');

     audio.play()
}
//pause song
let pauseSong = () =>{
     musicContainer.classList.remove('play');
     playBtn.querySelector('i.fas').classList.add('fa-play');
     playBtn.querySelector('i.fas').classList.remove('fa-pause');

     audio.pause()
}
// previous song
let prevSong = () =>{
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
//next song
let nextSong = () =>{
     songIndex++;
   
     if (songIndex > songs.length - 1) {
       songIndex = 0;
     }
   
     loadSong(songs[songIndex]);
   
     playSong();
   }

//update progress bar
let updateProgress = (e) =>{
     const { duration, currentTime } = e.srcElement;
     const progressPercent = (currentTime / duration) * 100;
     progress.style.width = `${progressPercent}%`;
   }

//set the progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
  

//intialy load song into dom
loadSong(songs[songIndex]);

//event listeners
playBtn.addEventListener('click', () =>{
const isPlaying = musicContainer.classList.contains('play');

if(isPlaying){
     pauseSong();
}else{
 playSong();
}
})
// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
