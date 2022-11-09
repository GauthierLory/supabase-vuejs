<template>
  <v-row>
    <v-col cols="lg-6 md-6" offset="lg-3 md-6">
      <v-card class="mt-6 rounded-lg">
        <v-card-title class="py-4 text-white bg-primary">
          Log in
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1 my-3">
          Sign in with your email below
        </v-card-subtitle>
        <v-card-text v-if="errorForm">
          <v-alert :icon="false" :text="errorForm" type="error" />
        </v-card-text>
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
              <v-col class="d-flex justify-space-between">
                <global-button
                    type="submit"
                    :disabled="loading"
                />
                <global-button
                    type="submit"
                    @click.prevent="handleLogin('github')"
                    :disabled="loading"
                    prepend-icon="mdi-github"
                >
                  Or sign in with Github
                </global-button>
                <router-link to="/forgotPassword">
                  <global-button
                      type="submit"
                      :disabled="loading"
                  >
                    Forgot Password?
                  </global-button>
                </router-link>
              </v-col>
            </v-row>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import {ref} from 'vue'
import useAuthUser from "../composables/useAuthUser.js";
import GlobalButton from "../components/GlobalButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

let errorForm = ref(null)
  const loading = ref(false)
  const form = ref({
    email: "",
    password: "",
  });
const handleLogin = async (provider) => {
    try {
      loading.value = true
      provider
          ? await loginWithSocialProvider(provider)
          : await login(form.value);
    } catch (error) {
      errorForm.value = error.message
    } finally {
      loading.value = false
      // await router.push({name: "Me"});
    }
  }
</script>