<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";

const props = defineProps<{ workplaces: WorkplacesProps[]; plans: PlansProps[] }>();

const mapCanvas = ref<HTMLCanvasElement | null>(null);
const clickCoords = ref<ClickProps>();
const markerRadius = 20;

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

      const x = (canvas.width - newWidth) / 2;
      const y = (canvas.height - newHeight) / 2;

      ctx.drawImage(img, x, y, newWidth, newHeight);

      props?.workplaces?.map((marker) => {
        marker.ctx = ctx;
        return drawMarker(marker);
      });
    };
  }
}

onMounted(() => {
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});

function drawMarker(props: WorkplacesProps) {
  if (props.ctx) {
    props.ctx.fillStyle = "red";
    props.ctx.beginPath();
    props.ctx.arc(props.x - markerRadius / 2, props.y - markerRadius / 2, markerRadius, 0, 2 * Math.PI);
    props.ctx.fill();
  }
}

interface ClickProps {
  x: number;
  y: number;
}

function handleMapClick(e: MouseEvent) {
  clickCoords.value = { x: e.clientX, y: e.clientY };
  const found = props.workplaces.filter(
    (obj) =>
      e.clientX - markerRadius < obj.x &&
      obj.x < e.clientX + markerRadius &&
      e.clientY - markerRadius < obj.x &&
      obj.x < e.clientY + markerRadius
  );

  console.log(found);

  console.log(clickCoords.value);
}
</script>

<template>
  <div class="map">
    <canvas ref="mapCanvas" :width="1000" :height="600" @click="handleMapClick"></canvas>
  </div>
</template>

<style scoped>
.map {
  position: relative;
  border: 2px solid black;
}
</style>
