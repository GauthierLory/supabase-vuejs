<template>
  <v-row>
    <v-col cols="lg-6 md-6" offset="lg-3 md-6">
      <v-card :loading="loading" class="mt-6">
        <v-card-title class="py-4 text-white bg-primary">
          Register
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1 my-3">
          Register with your email below
        </v-card-subtitle>
        <v-card-text>
          <form @submit.prevent="handleSubmit">
            <v-text-field
                label="E-mail"
                v-model="formRegister.email"
                variant="outlined"
                prepend-icon="mdi-email"
                required
            ></v-text-field>
            <v-text-field
                label="Password"
                v-model="formRegister.password"
                variant="outlined"
                prepend-icon="mdi-password"
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
              @click="handleSubmit"
              variant="flat"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref } from 'vue'
import useAuthUser from "../composables/useAuthUser.js";

const loading = ref(false)
const { register } = useAuthUser();

const formRegister = ref ({
  email: "",
  password: ""
})

const handleSubmit = async () => {
  try {
    loading.value = true
    await register(formRegister.value)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>