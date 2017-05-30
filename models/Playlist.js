const mongoose = require('mongoose')

var PlaylistSchema = new mongoose.Schema({
  songs: { type: Array, "default": [] },
  user: String
})

module.exports = mongoose.model('Playlist', PlaylistSchema)
