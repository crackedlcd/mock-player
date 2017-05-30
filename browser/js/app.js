const app = new Vue({
  el: '#app',
  data: {
    username: '',
    currentIndex: 0,
    songs: [],
    history: [],
    shuffleState: false,
    isLoaded: undefined,
    isAddSong: false,
    songToAdd: {
      artist: '',
      title: ''
    }
  },
  methods: {
    loadPlaylist: function(username) {
      this.$data.isLoaded = false

      // ajax request for GET /playlist/username
      axios.get('/playlist/' + username)
      .then((response) => {
        this.$data.songs = response.data.songs
        this.$data.username = response.data.user
        this.$data.isLoaded = true
        this.play()
      })
      .catch(err => {
        swal('Something went wrong', err, 'error')
      })
    },

    play: function() {
      swal('Playing ' + this.$data.songs[this.$data.currentIndex].artist + ' - ' + this.$data.songs[this.$data.currentIndex].title, 'Enjoy the beats!')
    },

    next: function() {
      if(this.$data.shuffleState === false) {
        if(this.$data.currentIndex === this.$data.songs.length - 1)
          swal('At the end of the playlist', 'Looks like you\'ll have to add more music to keep this party going', 'warning')
        else {
          this.$data.history.push(this.$data.currentIndex)
          this.$data.currentIndex++
          this.play()
        }
      }
      else {
        this.$data.currentIndex = Math.floor(Math.random() * this.$data.songs.length)
        this.$data.history.push(this.$data.currentIndex)

        this.play()
      }

    },

    previous: function() {
      if(this.$data.history.length === 0) {
        swal('Oh No!', 'Song history is empty. Go play some music!', 'warning')
      }
      else {
        this.$data.currentIndex = this.$data.history[this.$data.history.length-1]
        this.$data.history.pop()
        this.play()
      }

    },

    shuffle: function() {
      this.$data.shuffleState = !this.$data.shuffleState

    },

    addSong: function() {
      var data = {
        artist: this.$data.songToAdd.artist,
        title: this.$data.songToAdd.title
      }

      axios.post('/playlist/' + this.$data.username + '/song', data)
      .then(response => {
        this.$data.isAddSong = false
        swal(response)
        this.$data.songToAdd.artist = ''
        this.$data.songToAdd.title = ''

        this.loadPlaylist(this.$data.username)
      })
      .catch(err => {
        swal('Something went wrong', err, 'error')
      })
    },

    triggerAddSong() {
      this.$data.isAddSong = true
    },

    isActiveSong: function(index) {
      return index === this.$data.currentIndex
    }
  },
})