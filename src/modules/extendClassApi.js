class ExtendClassApi {
  constructor() {
    this.uri = 'https://json.extendsclass.com/bin/ee2bba3b38cc';
  }

  addGameToDatabase = (gameData) => {
    fetch(this.uri, {
      method: 'PUT',
      body: JSON.stringify(gameData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  };

  getGameId = async () => {
    try {
      const response = await fetch(this.uri, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      return data['game-id'];
    } catch (error) {
      return undefined;
    }
  };
}

export default ExtendClassApi;