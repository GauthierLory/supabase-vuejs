<template>
  <div>
    <h1>404</h1>
    <p>{{ $route.params.wrongPath }}</p>
    <v-btn @click="$router.go(-1)" type="primary" round>
      Go back
    </v-btn>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>