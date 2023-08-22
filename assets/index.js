

const quoteDisplay = document.getElementById("quote-display");

getQuote();

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
            console.log(data[0]);
            displayQuote(data[0]);
            })
            .catch(err => {
                console.log(`error ${err}`)
            }); 
}



function displayQuote(quote) {
    quoteDisplay.innerHTML = "Welcome to CCTickets!<br><br>" + quote.quote + "<br>" + "-" + quote.author;
}