// API url and API key used for movie data API
const apiKey = "api_key=04ef3a6b311aca50d5d8eaa11a964db1";
const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&" + apiKey;
const imgUrl = "https://image.tmdb.org/t/p/w500";
const searchUrl = "https://api.themoviedb.org/3/search/movie?" + apiKey;

var title = "";

// Grabbing elements from html
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const calendarDays = document.getElementById("calendar-days");
const time = document.getElementById("time");
const tickets = document.getElementById("tickets");
const submit = document.getElementById("submit")
const date = document.getElementById("date");
const timeSlot = document.getElementById("timeSlot");
const movieSelection = document.getElementById("movie-selected");

// Calls getMovie function, takes in apiUrl to retrieve movie data
getMovies(apiUrl);

// Calls function displayDays
displayDays();


function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showMovies(data.results);
    })
}

// Displays movie poster, title, rating, and summary.
function showMovies(data) {
    // Empty main tag
    main.innerHTML = "";

    // Retrives data from each movie
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        var vote = vote_average.toFixed(1);

        // Displays data
        movieEl.classList.add("movies");
        movieEl.innerHTML = `
        <button class="movieBtn" id="${title}" onclick="movieSelected(this)">Select</button>
        <img src="${imgUrl + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote}</span>
        </div>
        <div class="overview">
            <h3>Summary</h3>
            <h2>__________________________________________</h2>
                ${overview}
        </div>
        `
        main.appendChild(movieEl);
    });
}

// Changes background color of rating depending on score
function getColor(rating) {
    if(rating >= 8){
        return "good";
    }
    else if(rating >= 5) {
        return "ok";
    }
    else{
        return "bad";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchUrl + "&query=" + searchTerm);
    }
})

// Displays the calendar used for purchasing tickets
function displayDays() {  
    // Displays days of August
    for (i = 1; i < 32; i++) {
        const dayEl = document.createElement("button");
        dayEl.classList.add("days");
        dayEl.setAttribute("id", "day" + i);
        dayEl.setAttribute("onclick", "daySelected(this)");
        dayEl.innerHTML = i;  
        calendarDays.appendChild(dayEl);
    }

    // Dispays Time includes AM and PM
    for (i = 1; i < 13; i++) {
        const timeEl = document.createElement("button");
        timeEl.classList.add("time");
        if(i < 4) {
            timeEl.setAttribute("id", "time:" + (i + 8) + ":00AM");
            timeEl.setAttribute("onclick", "timeSelected(this)");
            timeEl.innerHTML = i + 8 + ":00 AM";  
            time.appendChild(timeEl);
        }
        else if(i == 4) {
            timeEl.setAttribute("id", "time:" + (i + 8) + ":00PM");
            timeEl.innerHTML = i + 8 + ":00 PM";
            timeEl.setAttribute("onclick", "timeSelected(this)");  
            time.appendChild(timeEl);
        }
        else {
            timeEl.setAttribute("id", "time:" + (i - 4) + ":00PM");
            timeEl.innerHTML = i - 4 + ":00 PM";
            timeEl.setAttribute("onclick", "timeSelected(this)");  
            time.appendChild(timeEl);
        }
        
    }
}

// Stores time into local storage
function storeTime(input) { 
    event.preventDefault(); 
    console.log(input);
    localStorage.setItem ("Time", input);
}

// Stores day into local storage
function storeDay(input) { 
    event.preventDefault(); 
    console.log(input);
    localStorage.setItem ("Day", input); 
}

// Stores title into local storage
function storeMovie(input) { 
    event.preventDefault(); 
    console.log(input);
    localStorage.setItem ("Title", input);
    
}

// Display ticket purchased at bottom of page
function buyTicket() {
    // Grab data from local storage
    tickets.innerHTML =
    "Thank you for your purchase! <br> Enjoy your movie Experience.<br><br>" +
    "Title: " + localStorage.getItem("Title") + "<br><br>" +
    "Date: " + localStorage.getItem("Day") + "<br><br>" +
    "Time: " + localStorage.getItem("Time") + "<br>" +
    '<img class="logoBot" src="./assets/movie-ticket-transparent-25.png" alt="logo">';
    
}


// Selects day and displays at bottom
function daySelected(button) {   
    event.preventDefault();

    date.innerHTML = "";
    var dateEl = document.createElement("span");
    dateEl.innerHTML = "August " + button.id.replace("day", "");
    date.appendChild(dateEl);
    var dayStorage = "August " + button.id.replace("day", "");
    storeDay(dayStorage);
}

// Selects time and displays at bottom
function timeSelected(button) {   
    event.preventDefault();

    timeSlot.innerHTML = "";
    var timeSlotEl = document.createElement("span");
    timeSlotEl.innerHTML = button.id.replace("time:", "") + " / ";
    timeSlot.appendChild(timeSlotEl);
    var timeStorage = button.id.replace("time:", "");
    storeTime(timeStorage);
}

// Selects movie and displays at bottom
function movieSelected(button) {   
    event.preventDefault();

    movieSelection.innerHTML = "";
    var movieSelectedEl = document.createElement("span");
    movieSelectedEl.innerHTML = button.id;
    movieSelection.appendChild(movieSelectedEl);
    var movieStorage = button.id;
    storeMovie(movieStorage);
}

// Movie Quote API retrives quote
function getQuote() {
    let options = {
        method: 'GET',
        headers: { 'x-api-key': 'jjlPTxptiqKGEHZuBxee6A==OTVIOiGPFxJxfc2O' }
    }
    
    let url = 'https://api.api-ninjas.com/v1/quotes?category=movies'
    
    
    fetch(url,options)
            .then(res => res.json())
            .then(data => {
            console.log(data);
            displayQuote(data);
            })
            .catch(err => {
                console.log(`error ${err}`)
            }); 
}

function displayQuote(quote) {
    quoteDisplay.innerHTML = "quote";
}

function modal() {
    document.getElementById("modal").classList.add('is-active');
    
    const modalText = document.getElementById("title mb-6")
    modalText.innerHTML = "Thank you for your purchase! <br> Enjoy your movie Experience.<br><br>" +
    "Title: " + localStorage.getItem("Title") + "<br><br>" +
    "Date: " + localStorage.getItem("Day") + "<br><br>" +
    "Time: " + localStorage.getItem("Time") + "<br>" +
    '<button class="close" onclick="modalOff()">Close</button>';

    buyTicket();
}

function modalOff(){
    document.getElementById("modal").classList.remove('is-active');
}