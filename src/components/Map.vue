<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";

const props = defineProps<{ workplaces: WorkplacesProps[]; plans: PlansProps[] }>();

const mapCanvas = ref<HTMLCanvasElement | null>(null);
const clickCoords = ref<ClickProps>();
const markerRadius = 20;
const wrongPixels = 61;

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
    props.ctx.arc(props.x, props.y, markerRadius, 0, Math.PI * 2);
    props.ctx.fill();
  }
}

interface ClickProps {
  x: number;
  y: number;
}

function handleMapClick(e: MouseEvent) {
  clickCoords.value = { x: e.clientX - wrongPixels, y: e.clientY - wrongPixels };
  const found = props.workplaces.find(
    (obj) =>
      e.clientX - wrongPixels - markerRadius < obj.x &&
      obj.x < e.clientX - wrongPixels + markerRadius &&
      e.clientY - wrongPixels - markerRadius < obj.x &&
      obj.x < e.clientY - wrongPixels + markerRadius
  );
  console.log(found?.employee);
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
