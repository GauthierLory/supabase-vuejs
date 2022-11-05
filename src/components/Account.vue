<script setup>
  import { supabase } from '../supabase'
  import { onMounted, ref, toRefs } from 'vue'
  import Avatar from './Avatar.vue'

  const props = defineProps(['session'])
  const { session } = toRefs(props)

  const loading = ref(true)
  const username = ref('')
  const website = ref('')
  const avatar_url = ref('')

  onMounted(() => {
    getProfile()
  })

  async function getProfile() {
    try {
      loading.value = true
      const { user } = session.value

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
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
      const { user } = session.value

      const updates = {
        id: user.id,
        username: username.value,
        website: website.value,
        avatar_url: avatar_url.value,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }

</script>

<template>
  <v-card
      variant="outlined"
      :loading="loading">

    <template v-slot:loader="{ isActive }">
      <v-progress-linear
          :active="isActive"
          color="primary"
          height="4"
          indeterminate
      ></v-progress-linear>
    </template>

  <v-card-title>
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
                v-model="session.user.email"
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading"
          @click="updateProfile"
      >
        Update
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
