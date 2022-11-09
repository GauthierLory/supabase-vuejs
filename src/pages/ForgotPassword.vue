<template>
  <v-row>
    <v-col cols="lg-6 md-6" offset="lg-3 md-6">
      <v-card class="mt-6 rounded-lg">
        <v-card-title class="py-4 text-white bg-primary">
          Recover password
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1 my-3">
          Recover password by sending you an email
        </v-card-subtitle>

        <v-card-text v-if="errorForm || validForm">
          <v-alert :icon="false" v-if="errorForm" :text="errorForm" type="error" />
          <v-alert :icon="false" v-if="validForm" :text="validForm" type="success" />
        </v-card-text>
        <v-card-text>
          <form @submit.prevent="handlePasswordReset()">
            <v-text-field
                label="E-mail"
                v-model="email"
                variant="outlined"
                prepend-icon="mdi-email"
                required
            ></v-text-field>
            <v-row>
              <v-col class="d-flex justify-space-between">
                <global-button
                    type="submit"
                    :disabled="loading"
                    @click="$emit('someEvent')"
                />
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

const { sendPasswordRestEmail } = useAuthUser();
const errorForm = ref(null)
const loading = ref(false)
const email = ref("");
let validForm = ref(null)

import { useRouter } from "vue-router";

const router = useRouter();

const handlePasswordReset = async () => {
  try {
    await sendPasswordRestEmail(email.value);
    loading.value = true
    validForm.value = 'check your mail to recover your password'
  } catch (error) {
    errorForm.value = error.message
    console.log(errorForm)
  } finally {
    loading.value = false
    // router.push('/login')
  }
}
</script>