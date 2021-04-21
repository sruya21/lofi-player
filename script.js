
const bagian = document.getElementById('bagian');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const rdm = document.getElementById('rdm');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const bagianProg = document.getElementById('bagian-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


// Song titles

const musik = ['lofi (1)', 'lofi (2)', 'lofi (3)', 'lofi (4)', 'lofi (5)', 'lofi (6)', 'lofi (7)', 'lofi (8)', 'lofi (9)', 'lofi (10)',
			'lofi (11)', 'lofi (12)', 'lofi (13)', 'lofi (14)', 'lofi (15)', 'lofi (16)', 'lofi (17)', 'lofi (18)', 'lofi (19)', 'lofi (20)',
			'lofi (21)', 'lofi (22)', 'lofi (23)', 'lofi (24)', 'lofi (25)', 'lofi (26)', 'lofi (27)', 'lofi (28)', 'lofi (29)', 'lofi (30)'];

const gambar = ['2', '3', '4', '5', '6'];

// Keep track of song
let musikIndex = 29;
let gambarIndex = 4;

// Initially load song details into DOM
loadMusik(musik[musikIndex]);
loadGambar(gambar[gambarIndex]);

// Update song details
function loadMusik(musik) {
  title.innerText = musik;
  audio.src = `music/${musik}.wav`;
}

function loadGambar(gambar) {
  cover.src = `images/${gambar}.png`;
}

// Play song
function playSong() {
  bagian.classList.add('play');
  play.querySelector('i.fas').classList.remove('fa-play');
  play.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  bagian.classList.remove('play');
  play.querySelector('i.fas').classList.add('fa-play');
  play.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  musikIndex--;
  gambarIndex++;

  if (musikIndex < 0) {
    musikIndex = musik.length - 1;
  }

  gambarIndex = Math.floor(Math.random() * 4);

  loadMusik(musik[musikIndex]);
  loadGambar(gambar[gambarIndex]);

  playSong();
}

// Next song
function nextSong() {
  musikIndex++;
  gambarIndex++;

  if (musikIndex > musik.length - 1) {
    musikIndex = 0;
  }

  gambarIndex = Math.floor(Math.random() * 4);

  loadMusik(musik[musikIndex]);
  loadGambar(gambar[gambarIndex]);

  playSong();
}

// Random song

function acak() {
	musikIndex++;
  gambarIndex++;

	if(musikIndex = musik.length) {
		musikIndex = Math.floor(Math.random() * 29);
    gambarIndex = Math.floor(Math.random() * 4);
	}

  loadMusik(musik[musikIndex]);
  loadGambar(gambar[gambarIndex]);

	playSong();
}


// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}


// Event listeners
play.addEventListener('click', () => {
  const isPlaying = bagian.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
rdm.addEventListener('click', acak);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
bagianProg.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', acak);
