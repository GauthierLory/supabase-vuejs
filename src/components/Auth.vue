<template>
  <v-row>
    <v-col cols="lg-6 md-6" offset="lg-3 md-6">
      <v-card class="mt-6">
        <v-card-title class="py-4 text-white bg-primary">
          Log in
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1 my-3">
          Sign in via magic link with your email below
        </v-card-subtitle>
        <v-card-text>
          <form @submit.prevent="handleLogin">
            <v-text-field
                label="E-mail"
                v-model="email"
                variant="outlined"
                prepend-icon="mdi-email"
                required
            ></v-text-field>
          </form>
        </v-card-text>
        <v-card-actions class="mr-2">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              :value="loading ? 'Loading' : 'Send magic link'"
              :disabled="loading"
              @click="handleLogin"
              variant="flat"
          >
            Log in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
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