import LeaderboardApi from './modules/LeaderboardApi.js';
import './style.css';

const leaderboardApi = new LeaderboardApi();
leaderboardApi.init();

window.addEventListener('load', () => {
  const nameInput = document.querySelector('#name');
  const scoreInput = document.querySelector('#score');
  window.addEventListener('popstate', () => {
    switch (window.location.hash) {
      case '#submit-score':
        if (nameInput.value !== '' && scoreInput.value !== '') {
          leaderboardApi.addPlayerData(nameInput.value, scoreInput.value);
          nameInput.value = '';
          scoreInput.value = '';
        }
        break;
      case '#refresh':
        leaderboardApi.displayLoadingScreen();
        leaderboardApi.getGameData();
        break;
      default:
        break;
    }
  });
});