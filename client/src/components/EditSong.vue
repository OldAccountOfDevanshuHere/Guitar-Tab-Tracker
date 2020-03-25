<template>
  <v-layout>
    <!-- <div text-align="center">
      <h1>Add Songs</h1>
    </div> -->
    <v-flex xs4>
      <panel title="Wanna Add a Song?">
        <br />
        <v-text-field
          type="text"
          :rules="[required]"
          v-model="song.title"
          label="Title"
        />
        <br />
        <v-text-field
          type="text"
          :rules="[required]"
          v-model="song.artist"
          label="Artist"
        />
        <br />
        <v-text-field
          type="text"
          :rules="[required]"
          v-model="song.album"
          label="Album"
        />
        <br />
        <v-text-field
          type="text"
          :rules="[required]"
          v-model="song.genre"
          label="Genre"
        />
        <br />
        <v-text-field
          type="email"
          :rules="[required]"
          v-model="song.albumImageUrl"
          label="Album Image URL"
        />
        <br />
        <v-text-field
          type="email"
          :rules="[required]"
          v-model="song.youtubeId"
          label="Youtube ID"
        />
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Yeah More info :D" class="ml-3">
        <br />
        <v-text-field
          type="email"
          multi-line
          :rules="[required]"
          v-model="song.lyrics"
          label="Lyrics"
        />
        <br />
        <v-text-field
          type="email"
          multi-line
          :rules="[required]"
          v-model="song.tab"
          label="Tabs"
        />
        <br />
        <div v-html="error" class="warning" />
      </panel>
      <v-btn dark @click="editSong" class="mt-3">
        <v-icon>edit</v-icon>
        EDIT SONG
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      song: null
    }
  },
  components: {
    Panel
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  },
  methods: {
    async editSong () {
      const allFieldsFilled = Object.keys(this.song).every(
        key => !!this.song[key]
      )
      if (!allFieldsFilled) {
        this.error = 'We thought you wanted to improve :D'
      } else {
        try {
          await SongsService.put(this.song)
          console.log(this.song.id)
          this.$router.push({
            name: 'song',
            params: {
              songId: this.song.id
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>

<style></style>
