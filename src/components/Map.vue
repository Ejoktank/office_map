<template>
  <canvas ref="mapCanvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const mapCanvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number | null = null;

const updateCanvasSize = () => {
  const canvas = mapCanvas.value;
  if (canvas) {
    canvas.width = window.innerWidth > 1280 ? 1280 : window.innerWidth - 90;
    canvas.height = window.innerHeight - 90;
    cancelAnimationFrame(animationFrameId!);
    animationFrameId = requestAnimationFrame(() => drawCanvas(canvas));
  }
};

const drawCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Очистка канваса
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовка карты
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Добавляем картинку
    const img = new Image();
    img.src = "../../public/plan1.jpg";
    img.onload = function () {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      ctx.drawImage(img, x, y, width, height);
    };

    // Пример отрисовки маркера
    ctx.fillStyle = "red";
    ctx.fillRect(150, 150, 10, 10);
  }
};
onMounted(() => {
  window.addEventListener("resize", updateCanvasSize);

  // Первичное рисование
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCanvasSize);
});
</script>
