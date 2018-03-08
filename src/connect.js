import sc2 from 'sc2-sdk';

const api = sc2.Initialize({
      app: 'bloque64.app',
      callbackURL: 'http://127.0.0.1:8000/',
      accessToken: 'access_token',
      scope: ['login','vote','comment']
  });

export default api;
