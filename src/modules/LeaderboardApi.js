import ExtendClassApi from './extendClassApi.js';

class LeaderboardApi {
  init = async () => {
    this.loadingScreen('block');
    this.extendClassApi = new ExtendClassApi();
    this.gameId = await this.extendClassApi.getGameId();
    if (!this.gameId) {
      await this.addGame('Micro Game');
    }
    this.baseUri = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    await this.getGameData();
  }

  loadingScreen = (status) => {
    document.querySelector('#loading-bar').style.display = status;
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
    this.loadingScreen('none');
  }

  loadDataToDocument = (arr) => {
    if (arr.length === 0) {
      return;
    }
    arr.sort((a, b) => b.score - a.score);
    this.list = arr;
    document.querySelector('.scores-list').innerHTML = '';
    let largest = arr[0].score;
    let medal = 'gold';
    arr.forEach((element, index) => {
      const percent = (element.score / arr[0].score) * 100;
      let dashes = '';
      for (let i = 0; i < 10; i += 1) {
        if (i < Math.floor(percent / 10)) {
          dashes += '<span>|</span>';
        } else {
          dashes += '<span class="greyed">|</span>';
        }
      }
      if (element.score !== largest) {
        switch (medal) {
          case 'gold':
            medal = 'silver';
            break;
          case 'silver':
            medal = 'bronze';
            break;
          default:
            medal = 'none';
            break;
        }
      }
      document.querySelector('.scores-list').innerHTML += `<li id='position-${index}' class='${medal}'>
        <div class='dashes'>${dashes}</div>
        <div class='user'>${element.user}</div>
        <div class='score'>${element.score}</div>
      </li>`;
      largest = element.score;
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