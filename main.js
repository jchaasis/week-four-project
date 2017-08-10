/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
      //song title, band name, audio file, album thumbnail
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play


//create global variables
let results = document.querySelector('.results');


//convert the JSON data
  function convertData(data){
    return data.json();
  }
//print the data to verify we were able to retrieve the information.
  function printData(data){
    let searchItems = '';
    for( let i = 0; i < data.results.length; i++){
      let searchItem = `
                      <div>
                        <img src="${data.results[i].artworkUrl100}">
                        <h4>${data.results[i].trackName}</h4>
                        <h3>${data.results[i].artistName}</h3>
                      </div>
                      `;
      searchItems += searchItem;

      }
      results.innerHTML= searchItems;
      console.log(data);
  }

//fetch the data from the itunes API

fetch("https://itunes.apple.com/search?term=jack+johnson&limit=25")

  .then(convertData)
  .then(printData);
