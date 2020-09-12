import api from './api';
import './styles.css';

const api_key = '048712d053658b68816866a39f3285b0';
class App {
  constructor() {
    this.popularMovies = [];
    this.latestMovies = [];
    this.favoritesMovies = [];
    this.latestMoviesElement = '';
    
    this.appElement = document.getElementById('app');
    this.init();
  }
  
  async init() {
    await this.fetchPopularMovies();
    await this.fetchLatestMovies();

    this.appElement.innerHTML = await this.render();
  }

  async getPopularMovies() {
    try {
      const response = await api.get(`/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`);
      const popularMoviesSliced = response.data.results.slice(0, 3);
      const popularMoviesData = this.adjustMoviesData(popularMoviesSliced);
      return popularMoviesData;
    }
    catch(error) {
      alert('Bad request - Popular Movies', error);
    }
  }

  async getLatestMovies() {
    try {
      const latestResponse = await api.get(`/3/movie/now_playing?api_key=${api_key}&language=pt-BR`);
      const latestMovies = latestResponse.data.results.slice(0, 20);
      const latestMoviesData = this.adjustMoviesData(latestMovies);
      return latestMoviesData;
    }
    catch(error) {
      alert('Bad request - Recent Movies', error);
    }
  }

  adjustMoviesData(rawMoviesData) {
    const movies = rawMoviesData.map((movie) => {
      return {
        ...movie,
        poster_path: `https://image.tmdb.org/t/p/w1280/${movie.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      };
    });
    return movies;
  }

  async fetchPopularMovies() {
    if (this.popularMovies.length === 0) {
      this.popularMovies = await this.getPopularMovies();
    }
  }

  async fetchLatestMovies() {
    if (this.latestMovies.length === 0) {
      this.latestMovies = await this.getLatestMovies();
    }

    this.latestMoviesElement = this.latestMovies.map((movie) => {
      return /*html*/ `
      <img src=${movie.poster_path} class='latest-movie-item'/>
      `;
    })
  }
  render() {    
    const app = /*html*/`
      <div class='container'>
        <header>
          <div class='header-content'>
            <div class='menu-container'>
              <a href='#'>Filmes</a>
              <a href='#'>Séries</a>
            </div>
            <a href='#' class='title-container'>
              <img src="./svg/Logo-white.svg" alt="Webjump logo">
            </a>
            <div class='icons-container'>
              <a href='#'>
                <img src="./svg/FiSearch.svg" alt="Magnifier icon">
              </a>
              <a href='#'>
                <img src="./svg/FaRegUserCircle.svg" alt="User icon">
              </a>
            </div>
          </div>
        </header>
        <section class='popular-movies-section'>
          <div class='popular-white-bar'></div>
          <div class='popular-movies-content'>
            <div class='most-popular-movie'>
              <img src=${this.popularMovies[0].backdrop_path}>
              <div class='popular-movie-details'>
                <h1>${this.popularMovies[0].title}</h1>
                <p>${
                  this.popularMovies[0].overview.length <= 200 ?
                  this.popularMovies[0].overview :
                  (this.popularMovies[0].overview.substring(0, 200) + '...')
                }</p>
              </div>
            </div>
            <div class='two-popular-movies-container'>
              <div class='second-popular-movie'>
                <img src=${this.popularMovies[1].backdrop_path}>
                <div class='popular-movie-details'>
                  <p>${this.popularMovies[1].title}</p>
                </div>
              </div>
              <div class='second-popular-movie'>
                <img src=${this.popularMovies[2].backdrop_path}>
                <div class='popular-movie-details'>
                  <p>${this.popularMovies[2].title}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class='latest-movies-section'>
          <div class='latest-movies-content'>
            <h1>Filmes mais recentes</h1>
            <div class='latest-movies-list'>
              ${this.latestMoviesElement}
            </div>
          </div>
        </section>
      <div>
    `;

    return app;
  }
}

const app = new App();
