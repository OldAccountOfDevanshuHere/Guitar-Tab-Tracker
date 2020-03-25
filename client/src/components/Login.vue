<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <v-card class="ml-auto mt-4">
        
          <v-card-title><h4>Login</h4></v-card-title>
       

        <v-card-actions class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field 
            :rules="[required]"
            type="email" 
            v-model="email"
            label="Email" />
          <br>
          <v-text-field
            :rules="[required]" 
            type="password" 
            v-model="password"
            label="Password"></v-text-field>
          <br>
          <div class="warning" v-html="error" />
          <br>
          <v-btn dark
            @click="login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null,
      required: (value) => !!value || 'Required'
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push('songs')
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
