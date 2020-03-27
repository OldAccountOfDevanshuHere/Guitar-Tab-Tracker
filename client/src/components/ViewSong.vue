<template>
<div class="wrapper">
  <v-layout>
    <v-flex xs6 mr-1>
      <panel v-bind:title="song.title">
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
          <v-btn dark v-if="isUserLoggedIn && !bookmark" @click="bookmarkIt">
            Bookmark
          </v-btn>
          <v-btn dark v-if="isUserLoggedIn && bookmark" @click="unbookmarkIt">
            unBookmark
          </v-btn>
          <v-btn dark v-if="isUserLoggedIn" :to="{name: 'edit-song', 
              params: {
                songId: song.id
              }}">
            Edit
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image" :src="song.albumImageUrl" />
        </v-flex>
      </v-layout>
      </panel>
    </v-flex>
    <v-flex xs6 ml-1>
      <panel title="Wanna Watch it!?">
        <iframe width="630" height="310" :src='"https://www.youtube.com/embed/"+ song.youtubeId' frameborder="0" allow="accelerometer; encrypted-media; gyroscope" allowfullscreen></iframe>
      </panel>
    </v-flex>
  </v-layout>
    <v-layout mt-2>
      <v-flex xs6 mr-1>
          <panel title="Lyrics">
            <pre>
            {{song.lyrics}}
            </pre>
          </panel>
      </v-flex>
      <v-flex xs6 ml-1>
          <panel title="Guitar Tabs">
            <!-- <pre> -->
            {{song.tab}}
            <!-- </pre> -->
          </panel>
      </v-flex>
    </v-layout>
</div>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import HistoryService from '@/services/HistoryService'

export default {
  data () {
    return {
      song: {},
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    // console.log(this.song)
    this.bookmark = (await BookmarksService.index({
      songId: this.song.id,
      userId: this.$store.state.user.id
    })).data
    HistoryService.post({
      songId: this.song.id
      // userId: this.$store.state.user.id
    })
    // console.log('orignal state: ', this.bookmark)
  },
  components: {
    Panel
  },
  methods: {
    async bookmarkIt () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
        console.log('after bookmark is hit:', this.bookmark)
      } catch (error) {
        console.log(error)
      }
    },
    async unbookmarkIt () {
      console.log(this.song.id, this.$store.state.user.id)
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = (await BookmarksService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
        console.log('after delete is hit:', this.bookmark)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

</script>

<style>
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
.wrapper {
  margin: 0px;
  padding: 0px;
}
.SongInfoBasic {
  width: 100%;
}
</style>
