class UI {
  constructor() {
    this.name = document.getElementById('m-name');
    this.results = document.getElementById('results');
  }

  paint(results) {
    let output = '';
    results.forEach(function(result){
      if(result.popularity > 10){
        output += `
          <div class="row">  
            <div class="ten columns">
              <h5><a href="" id="m-result">${result.title}</a></h5>
            </div>
            <div class="two columns">
              <button class="button-primary" id="add-to-list">Add to watch list</button>
            </div>
          </div>
        `
        seenMovies[result.title] = result.id
      } 
    });
    this.results.innerHTML = output;
  }

  clearSearch() {
    this.results.innerHTML = '';
  }

  showMovieDetails(result, details) {
    result.classList.add("active");
    let release_year = new Date(details.release_date).getFullYear();
    let output = `
      <div class="row">
        <div class="three columns"><strong>Year:</strong> ${release_year}</div>
        <div class="three columns"><strong>Rating:</strong> ${details.vote_average}</div>
        <div class="three columns"><strong>Runtime:</strong> ${details.runtime} mins</div>
        <div class="three columns"><strong>Revenue:</strong> $${(details.revenue).toLocaleString("en-us")}</div>
        <br>
        <em>Overview: ${details.overview}</em>
        <br><br>
      </div>
    `
    let content = document.createElement("div");
    result.parentNode.insertAdjacentElement('afterend', content);
    content.innerHTML = output;
    content.style.display = "block";
  }

  removeMovieDetails(result) {
    let content = result.parentNode.nextSibling;
    content.style.display = "none";
    result.classList.remove("active");
  }
}