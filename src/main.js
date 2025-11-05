const musics = [
  {
    id: 1,
    artist: "Mehrad Hidden",
    name: "khodaye bi nahayat",
    cover: "./public/cover/mehrad-hidden-khodaye-binahayat.jpg",
    url: "./public/music/mehrad-hidden-khodaye-binahayat.mp3",
  },
  {
    id: 2,
    artist: "Mehrad Hidden",
    name: "Hamoomi",
    cover: "./public/cover/mehrad-hidden-hamoomi.jpg",
    url: "./public/music/mehrad-hidden-hamoomi.mp3",
  },
  {
    id: 3,
    artist: "Ali Yassini",
    name: "Nafahmidam",
    cover: "./public/cover/ali-yasini-x-poori-nafahmidam.jpg",
    url: "./public/music/ali-yasini-x-poori-nafahmidam.mp3",
  },
];

// elements
const player = document.querySelector(".music-player");
const playPauseBtn = document.querySelector("#playPauseBtn");
const playPauseIcon = document.querySelector("#playPauseIcon");
const muteUnmuteBtn = document.querySelector("#muteUnmuteBtn");
const muteUnmuteIcon = document.querySelector("#muteUnmuteIcon");
const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const durationElem = document.getElementById("duration");
const currentTimeElem = document.getElementById("currentTime");
const artistName = document.querySelector("#artistName");
const songName = document.querySelector("#songName");
const musicCover = document.querySelector("#musicCover");
const audio = document.querySelector("audio");

// current music Index
let currentIndex = 0;

// load new music
function loadMusic(index) {
  const music = musics[index];
  artistName.textContent = music.artist;
  songName.textContent = music.name;
  musicCover.src = music.cover;
  audio.src = music.url;
}

// function play music
function playMusic() {
  audio.play();
  playPauseIcon.setAttribute("href", "#pause");
}

// function pause music
function pauseMusic() {
  audio.pause();
  playPauseIcon.setAttribute("href", "#play");
}

// play Pause Btn
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});

// mute Btn
muteUnmuteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteUnmuteIcon.setAttribute("href", audio.muted ? "#mute" : "#unmute");
});

// next music
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % musics.length;
  loadMusic(currentIndex);
  playMusic();
});

// previous music
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + musics.length) % musics.length;
  loadMusic(currentIndex);
  playMusic();
});

// timer
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationElem.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeElem.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const newTime = (clickX / width) * audio.duration;
  audio.currentTime = newTime;
});

// load screen
window.addEventListener("DOMContentLoaded", () => {
  loadMusic(currentIndex);
});
