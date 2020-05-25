// API implemention adapted from by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
// http://www.run2r.com/Technical+linking-bpm-to-running-speed-usa.aspx 


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
// Song data
const songData = {};
var songID  = 0;
songData.song = {
    namex : "celsius",
    artist : "",
    bpm : '00',
    pic : ''
}
const searchData = {};

searchData.fullText = {
    text : ""
}
// API KEY
const key = "f11886fda303a0f198969af182c18730";

getFirstSong()

function getFirstSong(){
    let api = 'https://api.getsongbpm.com/song/?api_key='+key+'&id=pQNKoy'
  
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
            
        })
        .then(function(data){
            songData.song.namex = data.song.title;
            songData.song.bpm = data.song.tempo; 
            songData.song.artist = data.song.artist.name;
            songData.song.pic = data.song.artist.img;
        })
        .then(function(){
            displaySong();
            displayTempo();
        });
}
function getNextSong(song){
    let api = 'https://api.getsongbpm.com/song/?api_key='+key+'&id='+song
  
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
            
        })
        .then(function(data){
            songData.song.namex = data.song.title;
            songData.song.bpm = data.song.tempo; 
            songData.song.artist = data.song.artist.name;
            songData.song.pic = data.song.artist.img;
        })
        .then(function(){
            displaySong();
            displayTempo();
        });
}

// DISPLAY SONG TO UI
function displaySong(){
    descElement.innerHTML = songData.song.namex;
    artistNameElement.innerHTML =  songData.song.artist;

}
function displayNextSong(){
    songID = textBox.value;
    
    getNextSong(songID)
    descElement.innerHTML = songData.song.namex;
    artistNameElement.innerHTML = songData.song.artist;
}
function displayTempo(){
    tempElement.innerHTML = songData.song.bpm + ''
    
    if(iconElement === null){
        iconElement.innerHTML ='';
    }
    console.log(songData.song.pic)
 
}
function displaySearch(){
    var searchQ = textBox2.value;
    search(searchQ)
    searchResult.innerHTML = searchData.fullText.text;
}
//search("bad");
function search(){
    var title = textBox2.value
    title = title.replace(" ","+")
    let api = "https://api.getsongbpm.com/search/?api_key=f11886fda303a0f198969af182c18730&type=song&lookup="+ title;
  
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
            
        })
        .then(function(data){
            searchData.fullText.text = data.search;
            var btn = document.createElement("PARAGRAPH");
            if(data.search[0].id != null)
            searchResult.innerHTML = data.search[0].title + "//ID Number: "+ data.search[0].id 
            getNextSong(data.search[0].id)
            textBox.innerHTML = data.search[0].id;

        })
        .then(function(){
           displaySong();
        });
    
}


