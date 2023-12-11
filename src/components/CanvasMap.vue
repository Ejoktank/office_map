<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const props = defineProps({
  w: {
    type: Number,
    required: true,
  },
  h: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = props.w;
    canvas.value.height = props.h;
    ctx.value = canvas.value.getContext("2d");

    drawMap();
    drawAnother();
  }
});

function drawMap() {
  if (ctx.value) {
    ctx.value.fillStyle = "lightgreen";
    ctx.value.fillRect(0, 0, 1000, 1000);
  }
}

function drawAnother() {
  if (ctx.value) {
    ctx.value.fillStyle = "lightblue";
    ctx.value.fillRect(0, 0, props.w, props.h);

    // Пример отрисовки маркера
    ctx.value.fillStyle = "red";
    ctx.value.fillRect(50, 50, 10, 10);

    // Рисуем круг
    ctx.value.beginPath();
    ctx.value.arc(200, 150, 50, 0, Math.PI * 2);
    ctx.value.fillStyle = "lightred";
    ctx.value.fill();

    ctx.value.fillStyle = "black";
    ctx.value.font = "30px Arial";
    ctx.value.fillText("Привет, мир!", 50, 50);
  }
}
</script>

<style scoped>
/* Ваши стили CanvasMap */
</style>
