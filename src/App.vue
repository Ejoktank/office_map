<script setup lang="ts">
import { ref } from "vue";
import MapWrapper from "./components/MapWrapper.vue";

export interface WorkplacesProps {
  id: number;
  x: number;
  y: number;
  plan: number;
  employee: number;
  ctx?: CanvasRenderingContext2D;
}

export interface PlansProps {
  id: number;
  height: number;
  width: number;
  img: string;
  name: string;
}

const windowSize = ref({ h: 0, w: 0 });
setWindowSize();

function setWindowSize() {
  windowSize.value = { h: window.innerHeight, w: window.innerWidth };
}
</script>

<template>
  <div class="container main">
    <MapWrapper />
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
}
</style>
