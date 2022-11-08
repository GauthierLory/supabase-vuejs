<script setup>

import useAuthUser from "../composables/useAuthUser.js";
const { isLoggedIn } = useAuthUser();
</script>
<template>
  <v-spacer></v-spacer>
    <RouterLink v-if="isLoggedIn()" :to="{ name: 'Logout' }"><v-btn color="primary">Logout</v-btn></RouterLink>
    <RouterLink v-if="isLoggedIn()" :to="{ name: 'Me' }"><v-btn color="primary">Profile</v-btn></RouterLink>
    <RouterLink v-if="!isLoggedIn()" :to="{ name: 'Login' }" class="primary"><v-btn color="primary">Login</v-btn></RouterLink>
    <RouterLink v-if="!isLoggedIn()" :to="{name :'Register' }"><v-btn color="primary">Register</v-btn></RouterLink>
    <RouterLink to="/"><v-btn color="primary">Home</v-btn></RouterLink>
</template>