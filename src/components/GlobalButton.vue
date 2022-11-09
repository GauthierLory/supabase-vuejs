<template>
  <v-btn
      :color="color ?? 'primary'"
      :variant="variant ?? 'flat'"
  >
    <slot>
    Submit
  </slot>
  </v-btn>
</template>

<script setup>

import { toRefs } from "vue";

const prop = defineProps(['color', 'variant'])
const { color, variant } = toRefs(prop)

</script>

<style scoped>

</style>