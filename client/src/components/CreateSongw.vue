<template>
  <v-layout>
    <!-- <div text-align="center">
      <h1>Add Songs</h1>
    </div> -->
    <v-flex xs4>
      <panel title="Wanna Add a Song?">
        <br />
        <v-text-field type="text" @change="checkValidity" :rules="[required]" v-model="song.title" label="Title" />
        <br />
        <v-text-field type="text" @change="checkValidity" :rules="[required]" v-model="song.artist" label="Artist" />
        <br />
        <v-text-field type="text" @change="checkValidity" :rules="[required]" v-model="song.album" label="Album" />
        <br />
        <v-text-field type="text" @change="checkValidity" :rules="[required]" v-model="song.genre" label="Genre" />
        <br />
        <v-text-field type="email" @change="checkValidity" :rules="[required]" v-model="song.albumImageUrl" label="Album Image URL" />
        <br />
        <v-text-field type="email" @change="checkValidity" :rules="[required]" v-model="song.youtubeId" label="Youtube ID" />
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Yeah More info :D" class="ml-3">
        <br />
        <v-text-field type="email" multi-line @change="checkValidity" :rules="[required]" v-model="song.lyrics" label="Lyrics" />
        <br />
        <v-text-field type="email" multi-line @change="checkValidity" :rules="[required]" v-model="song.tab" label="Tabs" />
        <br />
        <div v-html="error" class="warning" />
      </panel>
      <v-btn :disabled="!allFieldsFilled" @click="addSong" class="mt-3 success">
        <v-icon>add</v-icon>
      Create Song
    </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: 'Full info please',
      required: (value) => !!value || 'Required',
      allFieldsFilled: false
    }
  },
  components: {
    Panel
  },
  methods: {
    async addSong () {
      this.allFieldsFilled = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!this.allFieldsFilled) {
        this.error = 'Full info please'
      } else {
        try {
          await SongService.post(this.song)
          this.$router.push({
            name: 'songs'
          })
        } catch (err) {
          console.log(err)
        }
      }
    },
    checkValidity () {
      this.allFieldsFilled = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (this.allFieldsFilled) {
        this.error = null
      } else {
        this.error = 'Full info please'
      }
    }
  }
}
</script>

<style></style>
