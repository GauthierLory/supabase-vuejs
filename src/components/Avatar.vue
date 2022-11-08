<script setup>
  import { ref, toRefs, watch } from 'vue'

  import useAuthUser from "../composables/useAuthUser.js";
  const { getAvatar, storeAvatar } = useAuthUser();
  const prop = defineProps(['path', 'size'])
  const { path, size } = toRefs(prop)

  const emit = defineEmits(['upload', 'update:path'])
  const uploading = ref(false)
  const src = ref('')
  const files = ref()

  const downloadImage = async () => {
    try {
       const { data, error } = await getAvatar(path.value)
      if (error) throw error
      src.value = URL.createObjectURL(data)
    } catch (error) {
      console.error('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (evt) => {
    files.value = evt.target.files
    try {
      uploading.value = true
      if (!files.value || files.value.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = files.value[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${Math.random()}.${fileExt}`

      const { uploadError } = await storeAvatar({filePath, file});

      if (uploadError) throw uploadError
      emit('update:path', filePath)
      emit('upload')
    } catch (error) {
      alert(error)
    } finally {
      uploading.value = false
    }
  }

  watch(path, () => {
    if (path.value) downloadImage()
  })
</script>

<template>
  <v-img
      class="ml-9 mb-6"
      v-if="src"
      :src="src"
      alt="Avatar"
      :style="{ height: size + 'em', width: size + 'em' }"
  />
    <v-file-input
        label="Avatar"
        @change="uploadAvatar"
        :disabled="uploading"
        accept="image/*">
    </v-file-input>
</template>
