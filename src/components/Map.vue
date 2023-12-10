<script setup lang="ts">
import { ref, onMounted } from "vue";

const mapCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  const canvas = mapCanvas.value;

  if (canvas) {
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Добавляем проверку, чтобы избежать ошибки, если getContext вернет null
      // Отрисовка карты
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Пример отрисовки маркера
      ctx.fillStyle = "red";
      ctx.fillRect(50, 50, 10, 10);

      // Рисуем круг
      ctx.beginPath();
      ctx.arc(200, 150, 50, 0, Math.PI * 2);
      ctx.fillStyle = "lightgreen";
      ctx.fill();

      // А как?
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 10, 10);
      };
      img.src = "../../vue.svg";

      ctx.fillStyle = "black"
      ctx.font = "30px Arial";
      ctx.fillText("Привет, мир!", 50, 50);
    }
  }
});
</script>

<template>
  <canvas ref="mapCanvas"></canvas>
</template>

<!-- Стили для размера и стилей canvas могут быть добавлены здесь или в отдельном файле стилей -->
