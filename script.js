const HTML = {};

window.addEventListener("DOMContentLoaded", init);


function getHTMLelements() {
  HTML.qoutesContainer = document.querySelector(".quoteSlider");
  HTML.quote = document.querySelector(".quoteTemplate").content;
  HTML.dashTemplate = document.querySelector(".dashTemplate").content;
  HTML.dashesContainer = document.querySelector(".dashes");
  HTML.infoBtn = document.querySelector("#scrollinfo");
  HTML.container = document.querySelector(".container");
  HTML.images = document.querySelectorAll(".charcterPage img");
  HTML.quotes = document.querySelectorAll(".quote");
  HTML.quoteSlider = document.querySelector(".quoteSlider");

}

function init() {
  getQoutes()
  getHTMLelements()
  getStatus()
  observIngCharacterImg()
}



function observeQoutes(quoteElements) {

  let options = {
    root: HTML.quoteSlider,
    rootMargin: '0px 0px 0px 100px'
  }
  const quoteObserver = new IntersectionObserver(function (entries, quoteObserver) {
    entries.forEach(entry => {
      entry.target.dataset.loaded = "";

      if (!entry.isIntersecting) {
        return;

      } else {
        entry.target.dataset.loaded = "true";
        // entry.target.classList.toggle("quoteAnimation");

      }
    })
  }, options)

  quoteElements.forEach(quote => {
    quoteObserver.observe(quote, options)
  })


}


function observIngCharacterImg() {
  let options = {
    root: HTML.container,
    rootMargin: '0px 0px 300px 0px',
    threshold: 1.0
  }

  const articleObserver = new IntersectionObserver(function (entries, articleObserver) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return

      } else {
        prealoadImg(entry.target)
        entry.target.dataset.loaded = "true";

      }
    })
  }, options)

  HTML.images.forEach(charImg => {
    articleObserver.observe(charImg, options)
  })

}


function prealoadImg(entry) {
  const imgSrc = entry.getAttribute("data-src");
  entry.src = imgSrc;
}

function getQoutes() {

  fetch("./data.json").then(res => res.json()).then(data => data.forEach(quote => showQuotes(quote, data))).then(data => {
    HTML.qoutes = document.querySelectorAll(".quote");
    observeQoutes(HTML.qoutes);
  });

}

let counter = 0;

function showQuotes(quote, data) {
  counter++
  if (counter >= data.length) {
    createDashes(counter)

  } else if (counter % 3 === 0) {

    createDashes(counter)

  }
  const clnQuote = HTML.quote.cloneNode(true);
  clnQuote.querySelector(".quote").setAttribute("id", `quote${counter}`);
  clnQuote.querySelector("q").textContent = quote.quote;
  clnQuote.querySelector("h4").textContent = `-${quote.name}`;

  HTML.qoutesContainer.appendChild(clnQuote);

}

function createDashes(counter) {
  const dashCln = HTML.dashTemplate.cloneNode(true);
  dashCln.querySelector("a").setAttribute("href", `#quote${counter}`)
  HTML.dashesContainer.appendChild(dashCln);
}



function getStatus() {
  HTML.container.addEventListener("scroll", showStatus)
}


function showStatus(event) {
  const ratio = event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight);
  HTML.infoBtn.style.setProperty("--width", ratio);
}