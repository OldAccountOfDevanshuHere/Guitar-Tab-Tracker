<template>
  <v-app>
    <div id="app">
      <page-header />
      <main>
        <v-container fluid id="makeWrapper">
          <router-view></router-view>
        </v-container>
      </main>
    </div>
  </v-app>
    <!-- <img src="./assets/logo.png"> -->
</template>

<script>
import PageHeader from './components/Header.vue'
export default {
  name: 'app',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapperDiv {
  margin: 0px;
  padding: 0px;
}

.toolbar__title > btn{
  font-size: 35px;
}


</style>
