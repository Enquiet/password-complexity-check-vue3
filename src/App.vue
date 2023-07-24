<template>
  <div>
    <input v-model="pass" />
    <check-password v-model="pass" only-error>
      <template v-slot="message">
        {{ message }}
      </template>
    </check-password>
  </div>
</template>
<script setup lang="ts">
import CheckPassword from '@/components/CheckPassword.vue'

import { ref } from 'vue'

const pass = ref('')
</script>
