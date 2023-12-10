<script setup lang="ts">
import { ref } from "vue";

defineProps<{ num: number }>();

const count = ref(0);
</script>

<template>
  <div class="container">
    <button type="button" @click="count++">Increment</button>
    <p>{{ num }}</p>
    <div class="">{{ count }}</div>
  </div>
</template>
