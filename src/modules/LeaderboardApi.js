import ExtendClassApi from './extendClassApi.js';

class LeaderboardApi {
  init = async () => {
    this.extendClassApi = new ExtendClassApi();
    this.gameId = await this.extendClassApi.getGameId();
    if (!this.gameId) {
      this.addGame('Micro Game');
    }
    this.baseUri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.getGameData();
  }

  addGame = async (gameName) => {
    const response = await fetch(this.baseUri, {
      method: 'POST',
      body: JSON.stringify({
        name: gameName,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = response.json();
    this.extendClassApi.addGameToDatabase({
      'game-id': data.result.split(' ')[3],
    });
  }

  getGameData = async () => {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameId}/scores/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    this.loadDataToDocument(data.result);
  }

  loadDataToDocument = (arr) => {
    arr.sort((a, b) => a.score - b.score);
    document.querySelector('.scores-list').innerHTML = '';
    arr.forEach((element) => {
      document.querySelector('.scores-list').innerHTML += `<li>
        <div>${element.user}</div>
        <div>${element.score}</div>
      </li>`;
    });
  }

  addPlayerData = async (userName, userScore) => {
    fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameId}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user: userName,
        score: userScore,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };
}

export default LeaderboardApi;