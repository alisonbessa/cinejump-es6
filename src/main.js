import api from './api';
import './styles.css';

const api_key = '048712d053658b68816866a39f3285b0';
class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.appElement.innerHTML = this.render();
  }
  
  async getPopularMovies() {
    try {
      const response = await api.get(`/3/movie/popular?api_key=${api_key}&language=pt-BR&page=1`);
      const popularMovies = response.data.results.slice(0, 3);
      console.log(popularMovies);
      return popularMovies;
    }
    catch {
      alert('Bad request - Popular Movies');
    }
  }

  async getLatestMovies() {
    try {
      const latestResponse = await api.get(`/3/movie/now_playing?api_key=${api_key}&language=pt-BR`);
      const latestMovies = latestResponse.data.results.slice(0, 10);
      console.log(latestMovies);
      return latestMovies;
    }
    catch {
      alert('Bad request - Recent Movies');
    }
  }
  
  render() {
    this.getPopularMovies();
    this.getLatestMovies();

    const app = /*html*/`
      <div class="container">
        <header>
          <div class='menu-container'>
            <div>Filmes</div>
            <div>Séries</div>
          </div>
          <div class='title-container'>
            <img src="./svg/Logo-white.svg" alt="Webjump logo">
          </div>
          <div class='icons-container'>
            <div><img src="./svg/FiSearch.svg" alt="Magnifier icon"></div>
            <div><img src="./svg/FaRegUserCircle.svg" alt="User icon"></div>
          </div>
        </header>
      <div>
    `;

    return app;
  }
}

const app = new App();
