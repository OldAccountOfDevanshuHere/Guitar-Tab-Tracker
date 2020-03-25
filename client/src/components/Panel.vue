<template>
  <div class="white elevation-2">
    <v-toolbar flat dense class="grey" dark>
      <v-toolbar-title class="mt-2">
        <!-- TODO CenterME -->
        <span class="centerMe">
          <h4>
            {{ title }}
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
  props: ['title']
}
</script>

<style scoped>
</style>
