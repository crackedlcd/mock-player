const PlaylistService = require('./PlaylistService')
const Playlist = require('../models/Playlist')

const chai = require('chai')
const assert = chai.assert
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mocha_tests')

describe('PlaylistService', function() {
   let currentPlaylist = null;

  beforeEach(function(done) {
    let playlist = new Playlist({ user: 'testuser',
      songs: [
      {
        artist: 'one',
        title: 'one'
      },
      {
        artist: 'two',
        title: 'two'
      }]
    })

    playlist.save()
    currentPlaylist = playlist
    done()
  })

  afterEach(function(done) {
    Playlist.remove({}, function() {
      done()
    })
  })

  describe('#getPlaylist', function() {
    it('should get the playlist from the given username', function(done) {
      PlaylistService.getPlaylist(currentPlaylist.user)
      .then(function(playlistObj) {
        assert.equal('testuser', playlistObj.user)
        assert.deepEqual({ songs: [
          {
            artist: 'one',
            title: 'two'
          },
          {
            artist: 'two',
            title: 'two'
          }]
        }, playlistObj.songs)
      })
      done()
    })
  })

  describe('#addSongToPlaylist', function() {
    it('should add a song to playlist\'s songs', function(done) {
      PlaylistService.addSongToPlaylist('testuser', { artist: 'three', title: 'three'})
      .then(function(message) {
        assert('Successfully added a song to the playlist.', message)
      })
      done()
    })

    it('should have 3 songs after song added to playlist', function(done) {
      PlaylistService.addSongToPlaylist('testuser', { artist: 'three', title: 'three'})
      assert(3, currentPlaylist.songs.length)
      done()
    })
  })

  describe('#initializePlaylist', function() {
    it('should create a new playlist given an empty playlist', function(done) {
      PlaylistService.getPlaylist('anemptyuser')
      .then(function(playlistObj) {
        assert(playlistObj)
      })
      done()
    })
  })
})