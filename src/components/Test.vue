<script setup lang="ts">
import { ref } from "vue";

const title = ref("asdasd");
const description = ref("asdasdasd");

</script>

<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
  </div>
</template>
