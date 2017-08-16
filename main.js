/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
      //song title, band name, audio file, album thumbnail
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
  //on click, add the preview url to the src attribute in the audio tag?


//create global variables
let results = document.querySelector('.results');
let audio = document.querySelector('audio');
let searchButton= document.querySelector('#search-button');
let searchBox = document.querySelector('#search-box');
// let musicPlayer = document.querySelector('.music-player');
let preview = '';

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
          const containerDiv = document.createElement('div');
          const p = document.createElement('p');
          const h4 = document.createElement('h4');
          const img = document.createElement('img');

          //fill the HTML elements with iTunes data
          img.src = song.artworkUrl100;
          p.textContent = `${song.trackName}`;
          h4.textContent = `${song.artistName}`;
          containerDiv.setAttribute("data_src", `${song.previewUrl}`);

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

        // console.log(artistName);
      }

});
