<template>
  <div v-if="user">
    <div>user {{ user }}</div>
  </div>
  <global-button color="primary"/>
</template>

<script setup>
import GlobalButton from "../components/GlobalButton.vue";
import useAuthUser from "../composables/useAuthUser.js";
const { user, } = useAuthUser();

</script>