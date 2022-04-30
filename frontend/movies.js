class Movies {
  constructor() {
    this.apiKey = '53be01b6fa2b51ae21e087618a66c87f';
  }

  async getMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`);
    const responseData = await response.json();

    return responseData;
  }

  async getDetails(movie) {
    const id = seenMovies[movie];
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`);
    const responseData = await response.json();

    return responseData;
  }
}