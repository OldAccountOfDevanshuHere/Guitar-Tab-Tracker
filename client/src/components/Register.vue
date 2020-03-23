<template>
  <div>
      <h1>
          Jaadu
      </h1>

      <input type="email" v-model="email" name="email" placeholder="email">
      <br>
      <input type="password" v-model="password" name="password" placeholder="password">
      <br>
      <button @click="register">Register</button>
  </div>
</template>

<script>
/* eslint-disable */
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
        email: "",
        password: ""
    }
  },
  methods: {
      async register() {
         await AuthenticationService.register({
              email: this.email,
              password: this.password
          })
      }
  }
}
</script>

<style scoped>

</style>
