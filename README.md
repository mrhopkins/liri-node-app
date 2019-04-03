# liri-node-app

## Overview:

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

---

## Details:

1. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

2. To retrieve the data that will power this app, requests are sent to the Bands in Town, Spotify and OMDB APIs.

   - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   - [Request](https://www.npmjs.com/package/request) (axios used in this case)
     - Used to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   - [Moment](https://www.npmjs.com/package/moment)
   - [DotEnv](https://www.npmjs.com/package/dotenv)

3. In addition to logging the data to the terminal/bash window, the commands and data are appended to the log.txt file.

## What Each Command Does:

1.  [`node liri.js concert-this <artist/band name here>`](#concert-this)
2.  [`node liri.js spotify-this-song '<song name here>'`](#spotify-this-song)
3.  [`node liri.js movie-this '<movie name here>'`](#movie-this)
4.  [`node liri.js do-what-it-says`](#do-what-it-says)

---

### concert-this

**1. `node liri.js concert-this <artist/band name here>`**

- This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal and log.txt:

  - Name of the venue
  - Venue location
  - Date of the Event (formatted as"MM/DD/YYYY")
  
  _If no artist/band is provided, the search will default to The Cardigans._

  ![concert-this-demo.gif](./assets/images/concert-this-demo.gif)

  [back to list](#what-each-command-does)

---

### spotify-this-song

**2. `node liri.js spotify-this-song '<song name here>'`**

- This will show the following information about the song in the terminal/bash window

  - Artist(s)

  - The song's name

  - A preview link of the song from Spotify

  - The album that the song is from

  _If no song is provided, the search will default to "The Sign" by Ace of Base._

  ![spotify-this-song-demo.gif](./assets/images/spotify-this-song-demo.gif)

  [back to list](#what-each-command-does)

---

### movie-this

**3. `node liri.js movie-this '<movie name here>'`**

- This will output the following information to the terminal/bash window:

  ```
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
  ```
    _If no movie is provided, the search will default to the movie 'Mr. Nobody.'_

  ![movie-this-demo.gif](./assets/images/movie-this-demo.gif)

  [back to list](#what-each-command-does)

---

### do-what-it-says

**4. `node liri.js do-what-it-says`**

- Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  _It will run `spotify-this-song` for "I Want it That Way," from the text in `random.txt`._

  ![do-what-it-says-demo.gif)](./assets/images/do-what-it-says-demo.gif)

  [back to list](#what-each-command-does)

---

## Built with:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - High-level programming language.
- [Node.js](https://nodejs.org/en/) - Open-source run-time environment that executes JS code outside of a browser.
- [Visual Studio Code](https://code.visualstudio.com/) - source code editor developed by Microsoft.

#### npm packages used:

- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - Zero-dependency module that loads environment variables from a .env file into process.env.
- [moment](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
- [Node Spotify API](https://www.npmjs.com/package/node-spotify-api) - API library for the Spotify REST API.

---

#### Check me out on LinkedIn!

https://linkedin.com/in/matthewrhopkins/
