import api from './api';
import './styles.css';

class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.appElement.innerHTML = this.render();
  }

  render() {
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
