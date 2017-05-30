const Playlist = require('../models/Playlist')

PlaylistService = {
  /**
   * Retrieves the playlist in the dtabase
   * Creates a record of the playlist in the database if the username does not exist (initializePlaylist)
   * 
   * @param String    username 
   * @return Promise            resolves to an object containing an array of the user's songs and a user string
   *
   */
  getPlaylist: (username) => {
    return Playlist.find({user: username})
    .then((playlist) => {
      if(playlist.length === 0){
        return PlaylistService.initializePlaylist(username, playlist)
      }
      else {
        return playlist
      }
    })
    .then((playlist) => {
      return {
        songs: playlist[0].songs,
        user: playlist[0].user
      }
    })
  },

  /**
   * Adds a song to the database
   * 
   * @param  String username
   * @param  Object song     Contains a title attribute and an artist attribute
   * @return Promise          Resolves to a string message upon success
   */
  addSongToPlaylist: (username, song) => {
    return Playlist.find({user: username})
    .then(playlist => {
      playlist[0].songs.push(song) 
      return Playlist.update({user: username}, { $set: { songs: playlist[0].songs }})
    })
    .then(() => {
      return 'Successfully added a song to the playlist.'
    })
  },

  /**
   * @param  String username
   * @param  Object playlist  contains title and artist attributes
   * @return {[type]}
   */
  initializePlaylist: (username, playlist) => {
    if(!playlist.length) {
      playlist = new Playlist({
        user: username,
        songs: [{
          title: 'Song 1',
          artist: 'Artist'
        }]
      })
      playlist.save()

      playlist = [playlist]
      return playlist
    }
  }
}

module.exports = PlaylistService
