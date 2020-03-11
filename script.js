const HTML = {};

window.addEventListener("DOMContentLoaded", init);


function getHTMLelements() {
  HTML.qoutesContainer = document.querySelector(".quoteSlider");
  HTML.quote = document.querySelector(".quoteTemplate").content;
  HTML.dashTemplate = document.querySelector(".dashTemplate").content;
  HTML.dashesContainer = document.querySelector(".dashes");

}

function init() {
  getHTMLelements()
  getQoutes()
}

function getQoutes() {

  fetch("./data.json").then(res => res.json()).then(data => data.forEach(showQuotes))

}

let counter = 0;

function showQuotes(quote) {
  counter++
  const clnQuote = HTML.quote.cloneNode(true);

  clnQuote.querySelector(".quote").setAttribute("id", `quote${counter}`);
  clnQuote.querySelector("q").textContent = quote.quote;
  clnQuote.querySelector("h4").textContent = `-${quote.name}`;
  createDashes(counter)
  HTML.qoutesContainer.appendChild(clnQuote);
}

function createDashes(counter) {
  const dashCln = HTML.dashTemplate.cloneNode(true);
  dashCln.querySelector("a").setAttribute("href", `#quote${counter}`)
  HTML.dashesContainer.appendChild(dashCln);
}