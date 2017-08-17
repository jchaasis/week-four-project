


//create global variables
let results = document.querySelector('.results');
let audio = document.querySelector('audio');
let searchButton= document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');

//event listener that will commence the fetch
  searchButton.addEventListener("click", function(){
    let artist = searchBox.value;

    //fetch the data from the iTunes api
      fetch("https://itunes.apple.com/search?term="+artist+"&limit=25")

        .then(convertData)
        .then(printData);
  });

  //convert the JSON data
    function convertData(data){
      return data.json();

    }



  //print the data to verify we were able to retrieve the information.
    function printData(data){

      for( let i = 0; i < data.results.length; i++){

          const song = data.results[i];
          //create the HTML elements
          let containerDiv = document.createElement('div');
          let p = document.createElement('p');
          let h4 = document.createElement('h4');
          let img = document.createElement('img');

          // if there are currently results in the results node, remove them
          // if (results.firstChild !== true){
          //   results.removeChild(containerDiv);
          // };

          //fill the HTML elements with iTunes data
          img.src = song.artworkUrl100;
          p.textContent = `${song.trackName}`;
          h4.textContent = `${song.artistName}`;
          containerDiv.setAttribute("data_src", `${song.previewUrl}`);

          //attach HTML elements created in JS to index.html
          results.appendChild(containerDiv);
          containerDiv.appendChild(img);
          containerDiv.appendChild(p);
          containerDiv.appendChild(h4);

        };
          console.log(data);


  }
  //When a song is clicked, the preview will play through the audio player

  function findContainingDiv(e) {
    let original = e.target;

    while (original !== null) {

      //if the element is a div, give me the div
      if (original.tagName === "DIV") {
        return original;
      }

      original = original.parentElement;
    }

    return null;
    }

  results.addEventListener("click", function (e) {
      // when we click anywhere in the container, try
      // to find the target's containing div.
      let div = findContainingDiv(e);

      if (div !== null) {
   // make the preview url the src for the audio tag
      let songPreview = div.getAttribute("data_src");

      audio.src = songPreview;
    //find the name of the song and artist and create a textbox uder the audio box to designate what song is playing.
      let songName = div.querySelector('p').textContent;
      let artistName = div.querySelector('h4').textContent;

      let playingBox = document.querySelector('#playing');
      playingBox.textContent = `Now playing: ${artistName} - ${songName}`;


      }

});
