<template>
  <v-toolbar fixed class="grey">
    <v-toolbar-title class="mr-4">
      <v-btn flat dark :to="{ name: 'root' }">
        TabTracker
      </v-btn>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat @click="navigateTo({ name: 'login' })">
        Login
      </v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat @click="navigateTo({ name: 'register' })">
        Sign Up
      </v-btn>
      <v-btn v-if="$store.state.isUserLoggedIn" flat @click="logout">
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

<style></style>
