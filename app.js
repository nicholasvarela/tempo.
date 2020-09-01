// API implemention adapted from by http://youtube.com/CodeExplained
//myPopUp implementation
// api key : 82005d27a116c2880c8f0fcb866998a0
// http://www.run2r.com/Technical+linking-bpm-to-running-speed-usa.aspx 
// API KEY
const key = "f11886fda303a0f198969af182c18730";
// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".bpm p");
const descElement = document.querySelector(".songTitle p");
const artistNameElement = document.querySelector(".artistName p");
const notificationElement = document.querySelector(".notification");
const button = document.querySelector(".submit");
const textBox = document.querySelector(".advancedSearchTextBox")
const textBox2 = document.querySelector(".advancedSearchTextBox2")
const searchResult = document.querySelector(".searchResult")
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay');
const buttonOpen = document.getElementById('help');

// Song data object definition
const songData = {};
var songID = 0;
songData.song = {
    namex: "celsius",
    artist: "",
    bpm: '00',
    pic: ''
}
const searchData = {};

searchData.fullText = {
    text: ""
}


//Start Up Commands
getFirstSong()
popUPP();

//Runs when the webpage first begin and displays default song pQNKoy
function getFirstSong() {
    let api = 'https://nameless-mesa-60180.herokuapp.com/http://api.getsongbpm.com/song/?api_key=' + key + '&id=pQNKoy'
    

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;

        })
        .then(function (data) {
            songData.song.namex = data.song.title;
            songData.song.bpm = data.song.tempo;
            songData.song.artist = data.song.artist.name;
            songData.song.pic = data.song.artist.img;
        })
        .then(function () {
            displaySong();
            displayTempo();
        });
}
//Function is called by the search function to log data from api. Stoped in songData object
function getNextSong(song) {
    let api = 'https://nameless-mesa-60180.herokuapp.com/http://api.getsongbpm.com/song/?api_key=' + key + '&id=' + song;


    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;

        })
        .then(function (data) {
            songData.song.namex = data.song.title;
            songData.song.bpm = data.song.tempo;
            songData.song.artist = data.song.artist.name;
            songData.song.pic = data.song.artist.img;
        })
        .then(function () {
            displaySong();
            displayTempo();
        });
}

// DISPLAY SONG TO UI
function displaySong() {
    descElement.innerHTML = songData.song.namex;
    artistNameElement.innerHTML = songData.song.artist;

}

function displayNextSong() {
    songID = textBox.value;

    getNextSong(songID)
    descElement.innerHTML = songData.song.namex;
    artistNameElement.innerHTML = songData.song.artist;
}
//displays the tempo from the object data
function displayTempo() {
    tempElement.innerHTML = songData.song.bpm + ' ' ;
}

function displaySearch() {
    var searchQ = textBox2.value;
    search(searchQ)
    searchResult.innerHTML = searchData.fullText.text;
}
//retrieves data from the textBox2. 'song name' and searches it using the api
//api goes through Heroku proxy to avoid CORRS error 
function search() {
    var title = textBox2.value
    title = title.replace(" ", "+")
    let api = "https://nameless-mesa-60180.herokuapp.com/https://api.getsongbpm.com/search/?api_key=f11886fda303a0f198969af182c18730&type=song&lookup=" + title;
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;

        })
        .then(function (data) {
            searchData.fullText.text = data.search;
            var btn = document.createElement("PARAGRAPH");
            console.log(data.search[0])
            if (data.search[0] == null){
            alert("Looks like we couldn't find a song by that name. Please Try Again.")
        } else {
                getNextSong(data.search[0].id)
                textBox.innerHTML = data.search[0].id;
        }

        })
        .then(function () {
            displaySong();
        });

}
//Displays the popup that prompts users to click for directions if it is their first vist. Trigger myPopup to open
function popUPP() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }
//code to open and close directions popup. myPopUp
  {
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget)
            openModal(modal);
        })
    })
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal')
            closeModal(modal);
        })
    })
    
    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
    }
    
    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }
    }ÎÎ