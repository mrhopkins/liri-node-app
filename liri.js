// file and npm requirements
require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// parse command line inputs
var request = process.argv[2];
var target = process.argv[3];
var search = request + " " + target + "\n";

// var target = process.argv[3];

// formatting results
var divider = "\n------------------------------------------------------------\n\n";
var noData = "No data available. Please try a different search.";

// function to perform request based on user input
function liriSearch() {
    switch (request) {

        case "concert-this":
            concertThis(target);
            break;

        case "spotify-this-song":
            spotifyThis(target);
            break;

        case "movie-this":
            movieThis(target);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("\nError: Not a valid command. Try one of these:")
            console.log("node liri.js concert-this <artist/band name here>");
            console.log("node liri.js spotify-this-song <song name here>");
            console.log("node liri.js movie-this <movie name here>");
            console.log("node liri.js do-what-it-says \n");
    }
}

// node liri.js concert-this <artist/band name here>
// show next concert for given artist
function concertThis(musician) {
    if (!musician) {
        musician = "The Cardigans";
    }

    var URL = "https://rest.bandsintown.com/artists/" + musician + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {

        // hold the response to the requested info
        var jsonData = response.data[0];

        // note if search fails
        if (response.data.length < 1) {
            fs.appendFile("log.txt", search + noData + divider, function (err) {
                if (err) throw err;
                console.log(noData);
            });
        } else {
            var concertInfo = [
                "Venue: " + jsonData.venue.name,
                "Location: " + jsonData.venue.city + ", " + jsonData.venue.country,
                "Date: " + moment(jsonData.datetime).format("MM/DD/YYYY")
            ].join("\n");

            // Append concertInfo to log.txt + print to console
            fs.appendFile("log.txt", search + musician + "\n" + concertInfo + divider, function (err) {
                if (err) throw err;
                console.log("\n" + musician + "\n" + concertInfo + "\n");
            });
        }

    })
        // artist not found
        .catch(function (error) {
            console.log("Error: No artist found.");
        })
}

// `node liri.js spotify-this-song '<song name here>'`
// show info on given song title
function spotifyThis(songName) {
    if (!songName) {
        songName = "The Sign Ace of Base";
    }

    spotify.search({
        type: 'track',
        limit: '1',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var jsonData = data.tracks.items;

        // note if search fails
        if (jsonData.length < 1) {
            fs.appendFile("log.txt", search + noData + divider, function (err) {
                if (err) throw err;
                console.log(noData);
            });
        } else {
            var songInfo = [
                "Artist: " + jsonData[0].artists[0].name,
                "Song Title: " + jsonData[0].name,
                "Song Preview: " + jsonData[0].preview_url,
                "Album: " + jsonData[0].album.name
            ].join("\n");

            // Append songInfo to log.txt + print to console
            fs.appendFile("log.txt", search + songInfo + divider, function (err) {
                if (err) throw err;

                console.log("\n" + songInfo + "\n");
            });
        }

    });
}

// `node liri.js movie-this '<movie name here>'`
//  give info for given movie title
function movieThis(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }

    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    axios.get(URL).then(function (response) {

        // hold the response to the requested info
        var jsonData = response.data;

        // note if search fails
        if (jsonData.length < 1) {
            fs.appendFile("log.txt", search + noData + divider, function (err) {
                if (err) throw err;
                console.log(noData);
            });
        } else {
            var movieInfo = [
                "Title: " + jsonData.Title,
                "Release Year: " + jsonData.Year,
                "IMDB Rating: " + jsonData.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                "Country: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n");

            // Append movieInfo to log.txt + print to console
            fs.appendFile("log.txt", search + movieInfo + divider, function (err) {
                if (err) throw err;
                console.log("\n" + movieInfo + "\n");
            });
        }

    })
        // movie not found
        .catch(function (error) {
            console.log("Error: no such movie found.");
        })
}

// `node liri.js do-what-it-says`
// look in random.txt and run that search
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;

        var textArr = data.split(",");
        request = textArr[0];
        target = textArr[1];
        liriSearch();
    });
}

// make LIRI go!
liriSearch();