const PlaylistService = require('../services/PlaylistService')
const path = require('path')


// loads HTML
exports.getIndex = (request, response) => {
  response.sendFile(path.resolve('browser/index.html'))
}

// Gets playlist
exports.getPlaylist = (request, response) => {
  return PlaylistService.getPlaylist(request.params.username)
  .then((playlistObj) => {
    response.send({
      songs: playlistObj.songs,
      user: playlistObj.user
    })
  })
  .catch((err) => {
    response.status(500).send(err)
  })
}

exports.addSong = (request, response) => {
  const user = request.params.username
  const newSong = {
    artist: request.body.artist,
    title: request.body.title
  }

  PlaylistService.addSongToPlaylist(user, newSong)
  .then( message => {
    response.send({ message })
  })
  .catch((err) => {
    response.status(500).send(err)
  })
}
