<template>
  <div class="wrapperDiv">
    <v-layout>
      <v-flex xs6 mr-2 v-if="$store.state.isUserLoggedIn">
        <div class="white elevation-2 ml-0 mr-0 pl-0 pr-0">
          <v-toolbar flat dense class="black" dark>
            <v-toolbar-title class="mt-2">
              <!-- TODO CenterME -->
              <span class="centerMe">
                <h4>
                  {{currDisp}}
                  <v-btn absolute right class="red mt-1" @click="switchLayout">
                    Show {{nxtDisp}}
                  </v-btn>
                </h4>
              </span>
            </v-toolbar-title>
            <slot name="action" />
          </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <div v-if="currDisp == 'Bookmarks'"   >
            <div v-for="bookmark in bookmarks" :key="bookmark.SongId" @click="console.log('hiii')">
              {{bookmark.Song.title}} by {{bookmark.Song.artist}}
            </div>
          </div>
          <div v-if="currDisp == 'History'"   >
            <div v-for="things in history" :key="things.SongId" @click="console.log('hiii')">
              {{things.Song.title}} by {{things.Song.artist}}
            </div>
          </div>
        </div>
      </div>
      </v-flex>
      <v-flex xs6 :class="{
        'offset-xs3': !$store.state.isUserLoggedIn,
        'mr-4': $store.state.isUserLoggedIn
      }">
      <search-panel class="mb-2" />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex offset-xs3 xs6>
        <panel title="Songs">
          <v-btn
              v-if="this.$store.state.isUserLoggedIn"
            slot="action"
            :to="{
              name: 'songs-create'
            }"
            class="red"
            absolute
            right
            fab
          >
            <v-icon>add</v-icon>
          </v-btn>
      <div 
        v-for="song in songs"
        class="song"
        :key="song.id">

        <v-layout>
          <v-flex xs6>
            <div class="song-title">
              {{song.title}}
            </div>
            <div class="song-artist">
              {{song.artist}}
            </div>
            <div class="song-genre">
              {{song.genre}}
            </div>

            <v-btn
              dark
              class="red"
              :to="{
                name: 'song', 
                params: {
                  songId: song.id
                }
              }">
              View
            </v-btn>
            <br>
            <v-btn
              dark
              class="red"
              :href='"https://www.youtube.com/watch?v="+ song.youtubeId'>
              play
            </v-btn>
          </v-flex>

          <v-flex xs6>
            <img class="album-image" :src="song.albumImageUrl" />
          </v-flex>
        </v-layout>
        <br><br>
        <hr>
         </div>
        </panel>
      </v-flex>
    </v-layout>
    </div>
</template>
<script>
import Panel from '@/components/Panel'
import SearchPanel from '@/components/SearchPanel'
import SongsService from '@/services/SongsService'
import BookmarksService from '@/services/BookmarksService'
import HistoryService from '@/services/HistoryService'

export default {
  components: {
    Panel,
    SearchPanel
  },
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title',
          align: 'left'
        },
        {
          text: 'Artist',
          value: 'artist',
          align: 'right'
        }
      ],
      songs: null,
      nxtDisp: 'History',
      currDisp: 'Bookmarks',
      bookmarks: null,
      history: null,
      sList: []
    }
  },
  methods: {
    switchLayout () {
      if (this.currDisp === 'History') {
        this.currDisp = 'Bookmarks'
        this.nxtDisp = 'History'
      } else {
        this.currDisp = 'History'
        this.nxtDisp = 'Bookmarks'
      }
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  },
  async mounted () {
    console.log('mounted function')
    const userId = this.$store.state.user.id
    this.bookmarks = (await BookmarksService.indexAll()).data
    console.log('og', this.history)
    this.history = (await HistoryService.get({
      userId: userId
    })).data
    console.log('new', this.history)
    // console.log(this.$store.state.user.id)
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-artist {
  font-size: 24px;
}
.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
#makeWrapper {
  margin: 0px !important;
  padding: 0px !important;
  color: blue !important;
}
</style>
