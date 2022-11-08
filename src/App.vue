<script setup>
  import { ref } from 'vue'
  import TheMenu from "./components/TheMenu.vue";

  const theme = ref('light')

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar elevation="1">
      <TheMenu/>
      <v-btn
          color="primary"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
      >
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>
