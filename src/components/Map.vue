<script setup lang="ts">
import { ref, onMounted } from "vue";
import { WorkplacesProps } from "../App.vue";

const props = defineProps<{markers?: WorkplacesProps[]}>();

const mapCanvas = ref<HTMLCanvasElement | null>(null);

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

      ctx.drawImage(img, x, y, newWidth, newHeight);

      props?.markers?.map((marker) => {
        console.log(marker);
        
        marker.ctx = ctx;
        return drawMarker(marker);
      });
    };
  }
};

onMounted(() => {
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});

function drawMarker(props: WorkplacesProps) {
  if (props.ctx) {
    props.ctx.fillStyle = "red";
    props.ctx.fillRect(props.x, props.y, 50, 50);
  }
}
</script>

<template>
  <div class="map">
    <canvas ref="mapCanvas" :width="1000" :height="600"></canvas>
  </div>
</template>

<style scoped>
.map {
  position: relative;
  border: 2px solid black;
}
</style>
