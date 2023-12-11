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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = "../../public/plan1.jpg";
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      let newWidth = canvas.width;
      let newHeight = canvas.width / aspectRatio;

      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = canvas.height * aspectRatio;
      }

      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight); // Рисуем изображение, учитывая его масштаб
      // Пример отрисовки маркера
      ctx.fillStyle = "red";
      ctx.fillRect(250, 250, 50, 50);
    };

  }
};

onMounted(() => {
  window.addEventListener("resize", updateCanvasSize);
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCanvasSize);
});
</script>
