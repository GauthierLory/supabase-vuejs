<template>
  <div v-if="user">
    <div>user {{ user }}</div>
  </div>
  <div v-if="isLoggedIn">
    <div>isLoggedIn {{ isLoggedIn }}</div>
  </div>
  <router-link to="/profile">profile link</router-link>
</template>

<script setup>
import useAuthUser from "../composables/useAuthUser.js";
const { isLoggedIn, user } = useAuthUser();
</script>

<style scoped>

</style>