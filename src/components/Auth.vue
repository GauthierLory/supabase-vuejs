<template>
    <v-card>
      <v-card-title>
        Sign in via magic link with your email below
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="handleLogin">
          <v-text-field
              label="E-mail"
              v-model="email"
              prepend-icon="mdi-email"
          ></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
            @click="handleLogin"
        >Log in</v-btn>
      </v-card-actions>
    </v-card>
</template>
<script setup>
  import { ref } from 'vue'
  import { supabase } from '../supabase'

  const loading = ref(false)
  const email = ref('')

  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
      })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading.value = false
    }
  }
</script>