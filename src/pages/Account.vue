<script setup>
  import Avatar from '../components/Avatar.vue'
  import GlobalButton from "../components/GlobalButton.vue";

  import {onMounted, ref } from 'vue'
  import useAuthUser from "../composables/useAuthUser.js";

  const { userProfile, update, user } = useAuthUser();

  const loading = ref(true)
  const username = ref('')
  const email = ref('')
  const website = ref('')
  const avatar_url = ref('')

  onMounted(() => {
    getProfile()
  })

  async function getProfile() {
    try {
      loading.value = true
        const data = await userProfile(user.value.id)
        if (data) {
          email.value = user.value.email
          username.value = data.username
          website.value = data.website
          avatar_url.value = data.avatar_url
        }
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

  async function updateProfile() {
    try {
      loading.value = true
      const updates = {
        id: user.value.id,
        username: username.value,
        website: website.value,
        avatar_url: avatar_url.value,
        updated_at: new Date(),
      }
      let error = await update(updates);
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

</script>

<template>
  <h1>Profile</h1>
  <v-row>
    <v-col>
      <v-card :loading="loading" class="rounded-lg">
        <v-card-title class="py-4 text-white bg-primary">
          Update profile
        </v-card-title>
        <v-card-text>
          <v-form
              @submit.prevent="updateProfile"
          >
            <Avatar v-model:path="avatar_url" @upload="updateProfile" size="10" />
            <v-text-field
                disabled
                label="E-mail"
                v-model="email"
                prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field
                v-model="username"
                label="Name"
                prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field
                v-model="website"
                label="Website"
                prepend-icon="mdi-web"
            ></v-text-field>
          </v-form>

        </v-card-text>
        <v-card-actions class="mr-2">
          <v-row>
            <v-col class="d-flex justify-end">
              <global-button
                  type="submit"
                  :disabled="loading"
                  @click="updateProfile"
              >
                Update
              </global-button>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
