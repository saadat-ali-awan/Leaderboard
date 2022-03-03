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
}

export default LeaderboardApi;