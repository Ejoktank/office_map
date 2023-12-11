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
  <Map :width="windowSize.w > 1280 ? 1280 :windowSize.w - 90" :height="windowSize.h - 90" />
  <div></div>
  <!-- <CanvasMap  :w="600" :h="400" /> -->
</template>

<style scoped></style>