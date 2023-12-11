<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { WorkplacesProps } from "../App.vue";
import { workplaces } from "../api/Api";
import Map from "./Map.vue";

// const markers: MarkerProps[] = [
//   { x: 100, y: 150, employee: 1, plan: 1 },
//   { x: 200, y: 150, employee: 2, plan: 1 },
//   { x: 200, y: 250, employee: 3, plan: 1 },
//   { x: 140, y: 450, employee: 4, plan: 1 },
// ];

const places = ref<WorkplacesProps[]>();

onBeforeMount(async () => {
  places.value = await workplaces();
});

</script>

<template>
  <div class="wrapper">
    <Map :markers="places" />
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
}
</style>
