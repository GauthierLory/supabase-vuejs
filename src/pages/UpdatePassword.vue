<template>
  <v-row>
    <v-col cols="lg-6 md-6" offset="lg-3 md-6">
      <v-card class="mt-6 rounded-lg">
        <v-card-title class="py-4 text-white bg-primary">
          Update password
        </v-card-title>
        <v-card-subtitle class="text-subtitle-1 my-3">
          Type your new password
        </v-card-subtitle>
        <v-card-text v-if="errorForm">
          <v-alert :icon="false" :text="errorForm" type="error" />
        </v-card-text>
        <v-card-text>
          <form @submit.prevent="handleSubmit()">
            <v-text-field
                label="Password"
                v-model="password"
                variant="outlined"
                prepend-icon="mdi-lock"
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
import { useRouter } from "vue-router";

const router = useRouter();
const { updatePassword } = useAuthUser();

let errorForm = ref(null)
const loading = ref(false)
const password = ref('');

const handleSubmit = async () => {
  try {
    loading.value = true
    await updatePassword(password.value)
  } catch (error) {
    errorForm.value = error.message
    console.log(errorForm)
    // alert(error.message);
  } finally {
    loading.value = false
    await router.push({name: "Home"});
  }
}
</script>

<style scoped>

</style>