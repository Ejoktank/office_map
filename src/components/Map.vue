<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";

const props = defineProps<{ workplaces: WorkplacesProps[]; plans: PlansProps[] }>();

const mapCanvas = ref<HTMLCanvasElement | null>(null);
const markerRadius = 20;

onMounted(() => {
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});

function drawCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = props.plans[0].img;
    img.onload = function () {
      const aspectRatio = img.width / img.height;
      let newWidth = canvas.width;
      let newHeight = canvas.width / aspectRatio;

      if (newHeight > canvas.height) {
        newHeight = canvas.height;
        newWidth = canvas.height * aspectRatio;
      }

      console.log("imgW", img.width);
      console.log("canvasW", canvas.width);
      console.log("newW", newWidth);
      console.log("imgH", img.height);
      console.log("canvasH", canvas.height);
      console.log("newH", newHeight);

      const x = 0;
      const y = 0;

      ctx.drawImage(img, x, y, newWidth, newHeight);

      props?.workplaces?.forEach((marker) => {
        marker.ctx = ctx;
        marker.x = x + marker.x * (newWidth / img.width);
        marker.y = y + marker.y * (newHeight / img.height);
        drawMarker(marker);
      });
    };
  }
}

function drawMarker(props: WorkplacesProps) {
  if (props.ctx) {
    props.ctx.fillStyle = "red";
    props.ctx.beginPath();
    props.ctx.arc(props.x, props.y, markerRadius, 0, Math.PI * 2);
    props.ctx.fill();
  }
}

function handleMapClick(e: MouseEvent) {
  const coords = mapCanvas.value?.getBoundingClientRect() ?? { left: 0, top: 0 };
  const pX = coords.left;
  const pY = coords.top;

  console.log(pX, pY);
  console.log(e.clientX, e.clientY);

  const found = props.workplaces.find(
    (obj) =>
      e.clientX - pX - markerRadius < obj.x &&
      obj.x < e.clientX - pX + markerRadius &&
      e.clientY - pY - markerRadius < obj.y &&
      obj.y < e.clientY - pY + markerRadius
  );
  console.log(found);
}
</script>

<template>
  <div class="map">
    <canvas class="canvas" ref="mapCanvas" :width="1000" :height="600" @click="handleMapClick"></canvas>
  </div>
</template>

<style scoped>
.map {
  border: 2px solid black;
}

.canvas {
  width: 100%;
}
</style>
