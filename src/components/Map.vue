<script setup lang="ts">
import { ref } from "vue";

const title = ref("asdasd");
const description = ref("asdasdasd");

</script>

<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<style>
.container {
  padding: 20px;
  background-color: #f4f4f4;
}
</style>
