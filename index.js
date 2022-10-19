const videoUrl = "http://static.videogular.com/assets/videos/videogular.mp4";
const playIcon = "https://img.icons8.com/ios-glyphs/30/000000/play--v1.png";
const pauseIcon = "https://img.icons8.com/ios-glyphs/30/000000/pause--v1.png";
const sound = "https://img.icons8.com/ios/50/000000/room-sound.png";
const noSound = "https://img.icons8.com/ios/50/000000/no-audio--v1.png";
const fullscreenIcon  = "https://img.icons8.com/pastel-glyph/64/000000/fullscreen.png";
const poster  = "https://images.ctfassets.net/vsp83h9pnr7f/4b0JOf55HlY9ksigtksBgJ/d41a79cf06044bdf8de3991aa9fc8ba4/03dde26d-8592-43f9-91d1-37c3b157462e1.jpg";
const settingsIcon = "https://img.icons8.com/external-justicon-lineal-justicon/64/000000/external-setting-notifications-justicon-lineal-justicon.png";

const progressBarWidth = 250;
var videoPlay = false;
var openSound = true;
var settings = false;
var openSpeed = false;
 
const video = document.getElementById("video");
const videoPlayOrPauseButton = document.getElementById("play_pause");
const videoPlayOrPauseButtonIcon = document.getElementById("play_pause_icon");
const progressBarRed = document.getElementById("progress_bar_red");
const progressBarGrey = document.getElementById("progress_bar");
const currentTime = document.getElementById("current_time");
const soundButton = document.getElementById("sound");
const soundImg = document.getElementById("sound_icon");
const settingsImg = document.getElementById("settings_icon");
const fullscreenImg = document.getElementById("fullscreen_icon");
const fullscreenButton = document.getElementById("fullscreen_button");
const videoQuality = document.getElementById("video_quality");
const speedDialog = document.getElementById("speed_dialog");
const settingsButton = document.getElementById("settings");
const speed = document.getElementById("speed");
const speedUl = document.getElementById("speed_ul");

start();

video.addEventListener('play', (e) => {
    videoPlay = true
    videoPlayOrPauseButtonIcon.src = pauseIcon
})
video.addEventListener('pause', (e) => {
    videoPlay = false
    videoPlayOrPauseButtonIcon.src = playIcon
})

speedUl.addEventListener('click', (e) => {
    var text = e.path[0].innerText
    speed.innerText = text
    video.playbackRate = text.substring(0, text.length - 1)
    speedDialog.style.display = "none";
    openSpeed = false;
})

settingsButton.addEventListener('click', (e) => {
    if (settings) {
        videoQuality.style.display = 'none'
    } else {
        videoQuality.style.display = 'flex'
    }
    settings = !settings;
})
speed.addEventListener('click', (e) => {
    if (openSpeed) {
        speedDialog.style.display = "none";
    } else {
        speedDialog.style.display = "flex";
    }
    openSpeed = !openSpeed;
})
fullscreenButton.addEventListener('click', (e) => {
    video.requestFullscreen();
})

progressBarGrey.addEventListener('click', (e) => {
    video.currentTime = e.offsetX * video.duration / progressBarWidth
})

videoPlayOrPauseButton.addEventListener("click", (e) => {
    playOrPause()
})

soundButton.addEventListener("click", (e) => {
    if (openSound) {
        soundImg.src = noSound;
    } else {
        soundImg.src = sound;
    }
    video.muted = openSound;
    openSound = !openSound;

})

function start() {
    videoPlayOrPauseButtonIcon.src = playIcon
    video.src = videoUrl;
    soundImg.src = sound;
    settingsImg.src = settingsIcon;
    fullscreenImg.src = fullscreenIcon;
    video.poster = poster;
}

function progressBar(durantion, currentTime) {
    return `${percentageCalculation(durantion, currentTime)}%`;
}

function percentageCalculation(durantion, currentTime) {
    return currentTime * 100 / durantion;
}

function second(time) {
    var minute = Math.floor(time / 60);
    var second = time % 60;
    var second = second < 10 ? `0${second}` : second;
    return minute < 10 ? `0${minute}:${second}` : `${minute}:${second}`
}

function playOrPause() {
    if (!videoPlay) {
        video.play()
    } else {
        video.pause()
    }

}
function update() {
    progressBarRed.style.width = progressBar(video.duration, video.currentTime)
    currentTime.innerText = second(Math.ceil(video.currentTime))
}

setInterval(() => {
    update()
}, 100)



