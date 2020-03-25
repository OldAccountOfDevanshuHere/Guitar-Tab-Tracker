<template>
  <panel title="Search Songs">
      <v-text-field label="Search by Anything ;)" v-model="search">
          Demo
      </v-text-field>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import _ from 'lodash'
export default {
  data () {
    return {
      search: null
    }
  },
  components: {
    Panel
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
      console.log(value)
    }, 400),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style>

</style>