<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";
import { MapState } from "./MapWrapper.vue";

const props = defineProps<{ workplaces: WorkplacesProps[]; plans: PlansProps[]; state: MapState }>();

const mapCanvas = ref<HTMLCanvasElement | null>(null);
const aspectRatio = ref<number>(0);
const markerRadius = 20;
const context = ref<CanvasRenderingContext2D | undefined>(undefined);

onMounted(() => {
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});

function drawCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  context.value = ctx ?? undefined;
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = props.plans[0].img;
  img.onload = function () {
    aspectRatio.value = img.width / img.height;
    let newWidth = canvas.width;
    let newHeight = canvas.width / aspectRatio.value;

    if (newHeight > canvas.height) {
      newHeight = canvas.height;
      newWidth = canvas.height * aspectRatio.value;
    }

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

function drawMarker(marker: WorkplacesProps) {
  if (!marker.ctx) return;

  marker.ctx.fillStyle = "red";
  marker.ctx.beginPath();
  marker.ctx.arc(marker.x, marker.y, markerRadius, 0, Math.PI * 2);
  marker.ctx.fill();
}

function drawInfo(marker: WorkplacesProps) {
  if (!marker.ctx) return;

  const ctx = marker.ctx;
  const pX = 20;
  const pY = 40;
  const lh = 20;

  ctx.fillStyle = "#ffccaa";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.roundRect(marker.x, marker.y, 150, 150, 5);
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.font = "18px sans-serif";
  ctx.fillText("id: " + marker.id.toString(), marker.x + pX, marker.y + pY, 150);
  ctx.fillText("employee: " + marker.employee, marker.x + pX, marker.y + pY + lh, 150);
}

function addMarker(marker: WorkplacesProps) {
  console.log("adding marker");

  drawMarker(marker);
}

function handleMapClick(e: MouseEvent) {
  const coords = mapCanvas.value?.getBoundingClientRect() ?? { left: 0, top: 0 };
  const pX = coords.left;
  const pY = coords.top;

  console.log(Math.floor((e.clientX * 2) / aspectRatio.value), Math.floor(e.clientY * 2 * aspectRatio.value));

  const clickedMarker = props.workplaces.find(
    (obj) =>
      e.clientX - pX - markerRadius < obj.x &&
      obj.x < e.clientX - pX + markerRadius &&
      e.clientY - pY - markerRadius < obj.y &&
      obj.y < e.clientY - pY + markerRadius
  );
  // console.log(found);
  switch (props.state) {
    case "watch":
      clickedMarker && drawInfo(clickedMarker);
      break;

    case "add":
      const maxId = props.workplaces.reduce((prev, current) => (prev.id > current.id ? prev : current)).id;
      const newMarker: WorkplacesProps = {
        id: maxId + 1,
        x: e.clientX - pX,
        y: e.clientY - pY,
        employee: 5,
        plan: 1,
        ctx: context.value
      };
      addMarker(newMarker);
      break;

    case "delete":
      clickedMarker && drawInfo(clickedMarker);
      break;

    default:
      break;
  }
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
