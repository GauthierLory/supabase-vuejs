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
          <form @submit.prevent="handleLogin()">
            <v-text-field
                label="E-mail"
                v-model="form.email"
                variant="outlined"
                prepend-icon="mdi-email"
                required
            ></v-text-field>
            <v-text-field
                label="Password"
                v-model="form.password"
                variant="outlined"
                prepend-icon="mdi-lock"
                required
            ></v-text-field>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                    type="submit"
                    color="primary"
                    :value="loading ? 'Loading' : 'Send magic link'"
                    :disabled="loading"
                    variant="flat"
                >
                  Log in
                </v-btn>
              </v-col>
            </v-row>
          </form>
<!--          <a @click.prevent="handleLogin('github')">Github</a>-->
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import {ref} from 'vue'
import useAuthUser from "../composables/useAuthUser.js";
import { useRouter } from "vue-router";

const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

  const loading = ref(false)
  const form = ref({
    email: "",
    password: "",
  });

const handleLogin = async (provider) => {
    try {
      provider
          ? await loginWithSocialProvider(provider)
          : await login(form.value);
      router.push({ name: "Me" });
    } catch (error) {
      alert(error.message);
    }
  }
</script>