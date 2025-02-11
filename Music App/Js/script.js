// Selecting elements from the DOM
const warapper = document.querySelector(".wrapper");           // Wrapper container of the music player
musicImg = document.querySelector(".img-area img"),            // Image of the current playing music
    musicName = document.querySelector(".song-details .name"),    // Music name displayed on the UI
    musicArtist = document.querySelector(".song-details .artist"), // Artist name displayed on the UI
    mainAudio = document.querySelector("#main-audio"),             // Audio element for the current music
    playPauseBtn = document.querySelector(".play-pause"),          // Play/Pause button
    prevbtn = document.querySelector("#prev"),                     // Previous music button
    nextBtn = document.querySelector("#next"),                     // Next music button
    progressBar = document.querySelector(".progress-bar"),         // Progress bar element
    progressArea = document.querySelector(".progress-area"),       // Progress area container
    repeatBtn = warapper.querySelector("#repeat-plist"),
    musicList = warapper.querySelector(".music-list"),
    showMoreBtn = warapper.querySelector("#more-music"),
    hideMusicBtn = warapper.querySelector("#close");
let musicIndex = Math.floor(Math.random()*allMusic.length + 1); // Initial music index

// Load music when the window is loaded
window.addEventListener("load", () => {
    loadMusic(musicIndex); // calling loadMusic function once window is loaded
    playingNow();
});

// Function to load music based on the index
function loadMusic(index) {
    musicName.innerText = allMusic[index - 1].name;            // Set the music name
    musicArtist.innerText = allMusic[index - 1].artist;        // Set the music artist
    musicImg.src = `../images/${allMusic[index - 1].img}.jpg`; // Set the image source for the music
    mainAudio.src = `../songs/${allMusic[index - 1].src}.mp3`; // Set the audio source for the music
}

// Pause music function
function pauseMusic() {
    warapper.classList.remove("paused");                         // Remove the "paused" class from the wrapper
    playPauseBtn.querySelector("i").innerText = "play_arrow";    // Change the icon to "play"
    mainAudio.pause();                                           // Pause the audio
}

// Play music function
function playMusic() {
    warapper.classList.add("paused");                            // Add the "paused" class to the wrapper
    playPauseBtn.querySelector("i").innerText = "pause";        // Change the icon to "pause"
    mainAudio.play();                                            // Play the audio
}

// Function to play the next music
function nextMusic() {
    musicIndex = (musicIndex + 1) % allMusic.length;             // Increment the index and loop back to the start when reaching the end
    if (musicIndex === 0)
        musicIndex = 1;                                         // Ensure musicIndex is not 0 (adjusting index to start from 1)
    loadMusic(musicIndex);                                       // Load the next music
    playMusic(); 
    playingNow();                                                 // Play the next music
};

// Function to play the previous music
function prevMusic() {
    if (musicIndex - 1 > 0)
        musicIndex--;                                           // Decrement the music index
    else {
        musicIndex = allMusic.length;                            // If at the beginning, loop to the last song
    }
    loadMusic(musicIndex);                                       // Load the previous music
    playMusic();    
    playingNow();                                             // Play the previous music
}

// Event listener to toggle play/pause on the button click
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = warapper.classList.contains("paused"); // Check if music is paused
    // If music is paused, call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

// Event listener for next button click to go to next music
nextBtn.addEventListener("click", () => {
    nextMusic();
});

// Event listener for previous button click to go to previous music
prevbtn.addEventListener("click", () => {
    prevMusic();
   
});

// Event listener for audio time update to track the current time of the song
mainAudio.addEventListener("timeupdate", (e) => {
    console.log(e); // Debugging output for timeupdate
    const currentTime = e.target.currentTime; // Get the current time of the audio
    const duration = e.target.duration;       // Get the total duration of the audio
    let progressWidth = (currentTime / duration) * 100; // Calculate the progress width percentage
    progressBar.style.width = `${progressWidth}%`; // Update the progress bar width

    let musicCurrentTime = warapper.querySelector(".current"),
        musicDuration = warapper.querySelector(".duration");

    // Event listener to update song duration once the data is loaded
    mainAudio.addEventListener("loadeddata", () => {
        // Update song total duration
        let audioDuration = mainAudio.duration;
        musicDuration.innerText = audioDuration; // Display total song duration
        let totalMin = Math.floor(audioDuration / 60); // Calculate total minutes
        let totalSec = Math.floor(audioDuration % 60); // Calculate total seconds
        if (totalSec < 10) {
            totalSec = `0${totalSec}`; // Add leading zero if seconds are less than 10
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`; // Display formatted duration (mm:ss)
    });

    // Update the current time of the playing song
    let currentMin = Math.floor(currentTime / 60); // Calculate current minutes
    let currentSec = Math.floor(currentTime % 60); // Calculate current seconds
    if (currentSec < 10) {
        currentSec = `0${currentSec}`; // Add leading zero if seconds are less than 10
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`; // Display current time (mm:ss)
});

// Event listener for click on the progress area to change current time based on click position
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth; // Get the width of the progress bar container
    let clickOffSetX = e.offsetX;                       // Get the click position relative to the progress bar
    let songDuration = mainAudio.duration;              // Get the total duration of the song
    console.log(progressWidthVal);                       // Debugging output for width
    console.log(clickOffSetX);                           // Debugging output for click position
    console.log(songDuration);                           // Debugging output for song duration
    // Set the audio current time based on the click position
    mainAudio.currentTime = (clickOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

// let's work on repeat,shuffle song according to the icon



repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Platlist shuffle");
            break;
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playliast looped");
            break;
    }
});


/*Above we just changed the icon, now let's work on what to do after the song ended*/

mainAudio.addEventListener("ended", () => {
    // we will do according to the icon means if user has set icon to loop song then 
    // we will repeat the current song and will do further accordingly
    let getText = repeatBtn.innerText;

    switch (getText) {
        case "repeat": // simply call the nextMusic function do next song will be played
            nextMusic();
            break;
        case "repeat_one": // change current playing sonh time to 0 so that it will play from begining
            mainAudio.musicCurrentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle":
            let randIndex = Math.floor(Math.random() * 6 + 1);
            do {
                randIndex = Math.floor(Math.random() * 6 + 1);
            } while (randIndex == musicIndex);

            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }

});



showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = warapper.querySelector("ul");

// create li tage according to array length

for (let i = 0; i < allMusic.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("li-index", `${i+1}`);
    li.innerHTML = `<div class="row">
                        <!-- Song name and artist -->
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="../songs/${allMusic[i].src}.mp3"></audio>
                    <!-- Duration of the song -->
                    <span class="audio-duration" id= "${allMusic[i].src}">3:40</span>`
    ulTag.insertAdjacentElement("beforeend", li);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60); // Calculate total minutes
        let totalSec = Math.floor(audioDuration % 60); // Calculate total seconds
        if (totalSec < 10) {
            totalSec = `0${totalSec}`; // Add leading zero if seconds are less than 10
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration",`${totalMin}:${totalSec}`);
    });
}
// play particular song on click
const allLiTags = ulTag.querySelectorAll("li");
console.log(allLiTags);

function playingNow(){
    for (let i = 0; i < allLiTags.length; i++) {

        let audioTag = allLiTags[i].querySelector(".audio-duration");
        // remove class from li
        if(allLiTags[i].classList.contains("playing")){
            allLiTags[i].classList.remove("playing");
            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
        }
            

        // if there is li tag which li-index is equal to musicindex 
        // then this music is plying now and we will style it 
        if (allLiTags[i].getAttribute("li-index") == (musicIndex)) {
            allLiTags[i].classList.add("playing");
            audioTag.innerText = "Playing";
        }
    
        // add onclick attribute to all li tags
        allLiTags[i].setAttribute("onclick", "clicked(this)");
    }
}

// lets play song on li click 
function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}