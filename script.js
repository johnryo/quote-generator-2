const
  quoteContainer = document.getElementById("quote-container"),
  quoteText = document.getElementById("quote"),
  authorText = document.getElementById("author"),
  twitterBtn = document.getElementById("twitter"),
  newQuoteBtn = document.getElementById("new-quote"),
  loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function removeSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  showSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author field is blank and replace it with 'Unknown'
  if (!quote.author)  {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine font size
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeSpinner();
}

// Get Quotes From API
async function getQuotes() {
  showSpinner();
  const proxyUrl = 'https://jpo-cors-proxy.herokuapp.com/';
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    apiQuotes = await response.json();
    newQuote();
    removeSpinner();
  } catch (error) {
    //  Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  // const quote = quoteText.innerText;
  // const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
