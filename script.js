let apiQuotes = [];
let quoteText = document.querySelector('#quote');
let authorText = document.querySelector('#author');
let newButtonQuot = document.querySelector('#new-quote');
let twitterButton = document.querySelector('#twitter');
let loader = document.querySelector('#loader')
let qouteContainer = document.querySelector('#quote-container')

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
    loader.hidden = true;
    qouteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    showLoadingSpinner()
    // Pick a random quote
    random = apiQuotes[Math.floor(Math.random() * 1000)]
    quoteText.textContent = random.text;
    authorText.textContent = random.author ? random.author : 'Unknow';
    removeLoadingSpinner()
    if (random.text?.length > 120) {
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        alert(error)
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newButtonQuot.addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)

// On Load
getQuotes()