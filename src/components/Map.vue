<script setup lang="ts">
import { ref, onMounted } from "vue";

interface MarkerProps {
  x: number;
  y: number;
  plan: string;
  employee: string;
  ctx: CanvasRenderingContext2D | null;
}

const mapCanvas = ref<HTMLCanvasElement | null>(null);

const markers: MarkerProps[] = [
  { x: 100, y: 150, ctx: null, employee: "Ivan", plan: "../../public/plan1.jpg" },
  { x: 200, y: 150, ctx: null, employee: "Oleg", plan: "../../public/plan1.jpg" },
  { x: 200, y: 250, ctx: null, employee: "Sergey", plan: "../../public/plan1.jpg" },
  { x: 140, y: 450, ctx: null, employee: "Andrew", plan: "../../public/plan1.jpg" },
];

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

      markers.map(marker => {
        marker.ctx = ctx
        return drawMarker(marker)
      })
    };
  }
};

onMounted(() => {
  const canvas = mapCanvas.value;
  if (canvas) {
    drawCanvas(canvas);
  }
});

function drawMarker(props: MarkerProps) {
  if (props.ctx) {
    props.ctx.fillStyle = "red";
    props.ctx.fillRect(props.x, props.y, 50, 50);
  }
}
</script>

<template>
  <div class="border">
    <canvas ref="mapCanvas" :width="1000" :height="600"></canvas>
  </div>
</template>

<style scoped>
.border {
  border: 2px solid black;
}
</style>
