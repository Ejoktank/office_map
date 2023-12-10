<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    drawMap();
  }
});

const drawMap = () => {
  if (ctx.value) {
    // Ваш код отрисовки карты
    // Например:
    ctx.value.fillStyle = 'lightgreen';
    ctx.value.fillRect(0, 0, 600, 400);
  }
};
</script>

<style scoped>
/* Ваши стили CanvasMap */
</style>
