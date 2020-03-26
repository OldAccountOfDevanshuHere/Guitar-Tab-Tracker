<template>
  <v-toolbar fixed dark>
    <v-toolbar-title class="mr-4">
      <v-btn :to="{name: 'root'}" flat dark>
      TabTracker
    </v-btn>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn @click="navigateTo({ name: 'songs' })" flat block dark>
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn  v-if="!$store.state.isUserLoggedIn" dark class="mr-2" @click="navigateTo({ name: 'login' })" flat>
        Login
      </v-btn>
      <v-btn flat v-if="!$store.state.isUserLoggedIn" dark @click="navigateTo({ name: 'register' })">
        Sign Up
      </v-btn>
      <v-btn flat v-if="$store.state.isUserLoggedIn" dark @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.red {
  background-color: red !important;
}
</style>
