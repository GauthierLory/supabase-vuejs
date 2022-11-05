<script setup>
  import { onMounted, ref } from 'vue'
  import Account from './components/Account.vue'
  import Auth from './components/Auth.vue'
  import { supabase } from './supabase'

  const session = ref()
  const theme = ref('light')

  const loading = ref(false)

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  async function signOut() {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar elevation="1">
      <v-spacer></v-spacer>
      <v-btn
          v-if="session"
          color="primary"
          @click="signOut"
          prepend-icon="mdi-logout"
          :disabled="loading">Log out
      </v-btn>
      <v-btn
          v-else
          href="/"
          color="primary"
          prepend-icon="mdi-login"
          :disabled="loading">Log in
      </v-btn>
      <v-btn
          color="primary"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
      >
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Account v-if="session" :session="session" />
        <Auth v-else />
      </v-container>
    </v-main>
  </v-app>
</template>
