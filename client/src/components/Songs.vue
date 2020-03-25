<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
    <search-panel class="mb-2">
    </search-panel>
      <panel title="Songs">
        <v-btn
          slot="action"
          :to="{
            name: 'songs-create'
          }"
          class="grey"
          light
          medium
          absolute
          right
          middle
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
            class="grey"
            :to="{
              name: 'song', 
              params: {
                songId: song.id
              }
            }">
            View
          </v-btn>
        </v-flex>

        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl" />
        </v-flex>
      </v-layout>
    </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SearchPanel from '@/components/SearchPanel'
import SongsService from '@/services/SongsService'
export default {
  components: {
    Panel,
    SearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  // async mounted () {
  //   this.songs = (await SongsService.index()).data
  // },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
        console.log(this.songs)
      }
    }
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
</style>
