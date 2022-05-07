class Storage {
  
  getMovies() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies
  }

  addToList(movie) {
    let movies = this.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  deleteFromList(movieName) {
    let movies = this.getMovies();
    const result = movies.filter(movie => movie['title'] !== movieName);
    localStorage.setItem('movies', JSON.stringify(result));
  }
}