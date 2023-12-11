<script setup lang="ts">
// import CanvasMap from "./components/CanvasMap.vue";
import Map from "./components/Map.vue";
import { ref } from "vue";

const windowSize = ref({ h: 0, w: 0 });
setWindowSize();

function setWindowSize() {
  windowSize.value = { h: window.innerHeight, w: window.innerWidth };
}
</script>

<template>
  <Map />
</template>

<style scoped></style>