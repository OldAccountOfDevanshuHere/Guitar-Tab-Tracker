<template>
  <div class="white elevation-2 ml-0 mr-0 pl-0 pr-0">
    <v-toolbar flat dense class="black" dark>
      <v-toolbar-title class="mt-2">
        <!-- TODO CenterME -->
        <span class="centerMe">
          <h4>
            {{ title }}
                         
            <v-btn absolute right class="red mt-1" v-if="title == ('Bookmarks' || 'History')" @click="switchLayout">
              {{bVal}}
            </v-btn>

          </h4>
        </span>
        
      </v-toolbar-title>
      <slot name="action" />
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No thing here yet
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'bVal']
}
</script>

<style scoped>
</style>
