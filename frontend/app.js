const storage = new Storage();
const movies = new Movies();
const ui = new UI();

// store all searched movies so we can cut down on api calls
let seenMovies = {};

// Send query string to movies API
document.getElementById('m-search-bar').addEventListener('keyup', (e) => {
  const query = e.target.value;

  if(query !== '') {
    movies.getMovies(query)
    .then(results => {
      ui.paint(results.results);
    })
    .catch(err => console.log(err));
  } else {
    ui.clearSearch();
  }
});

document.getElementById('results').addEventListener('click', (e) => {
  if(e.target && e.target.id === 'm-result'){
    if(e.target.classList.contains('active')){
      ui.removeMovieDetails(e.target);
    } else {
      let movie = e.target.textContent;
      movies.getDetails(movie)
        .then(details => {
          ui.showMovieDetails(e.target, details);
        })
        .catch(err => console.log(err));
    }
  }
  e.preventDefault();
});

document.getElementById('results').addEventListener('mousedown', (e) => {
  if(e.target && e.target.id === 'add-to-list'){
    let movie = e.target.parentElement.parentElement.children[0].children[0].innerText;
    movies.getDetails(movie)
      .then(details => {
        storage.addToList(details);
        ui.addMovieRow(details);
      })

  }
  e.preventDefault();
});

document.getElementById('watchlist-table').addEventListener('click', (e) => {
  if(e.target && e.target.id === 'delete-icon'){
    let row = e.target.parentElement.parentElement;
    let movieName = row.children[1].textContent;
    ui.deleteMovieRow(movieName);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ui.paintList();
});
