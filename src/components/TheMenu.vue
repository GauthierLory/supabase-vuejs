<script setup>

import useAuthUser from "../composables/useAuthUser.js";
const { isLoggedIn } = useAuthUser();
</script>
<template>
  <ul v-if="isLoggedIn">
    <li><RouterLink :to="{ name: 'Logout' }">Logout</RouterLink></li>
<!--    <li><RouterLink :to="{ name: 'Me' }">Profile</RouterLink></li>-->
  </ul>
  <ul v-else>
    <li><RouterLink :to="{ name: 'Login' }">Login</RouterLink></li>
    <li><RouterLink :to="{ name: 'Register' }">Register</RouterLink></li>
  </ul>
  <v-spacer></v-spacer>
  <RouterLink
      to="/"
  >
    <v-btn
        color="primary">Home
    </v-btn>
  </RouterLink>
</template>