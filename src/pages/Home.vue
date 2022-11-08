<template>
  <div v-if="user">
    <div>user {{ user }}</div>
  </div>
</template>

<script setup>
import useAuthUser from "../composables/useAuthUser.js";
const { user, } = useAuthUser();

</script>