const player = require('../controllers/PlayerController.js')

module.exports = (app) => {

  // GET /
  app.get('/', player.getIndex)
  // GET /playlist/:username
  app.get('/playlist/:username', player.getPlaylist)
  // POST /playlist/:username/song
  app.post('/playlist/:username/song', player.addSong)
}
