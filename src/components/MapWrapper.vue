<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";
import { workplaces, plans } from "../api/Api";
import Map from "./Map.vue";

const places = ref<WorkplacesProps[]>([]);
const workplans = ref<PlansProps[]>([]);
const isDataLoaded = ref(false);

onBeforeMount(async () => {
  places.value = await workplaces();
  workplans.value = await plans();
  isDataLoaded.value = true;
});
</script>

<template>
  <div class="wrapper">
    <template v-if="!isDataLoaded">
      <p>Loading...</p>
    </template>
    <template v-else>
      <div class="">
        <div class="map_menu">
          <button class="map_menu-button">Просмотр</button>
          <button class="map_menu-button">Добавить маркер</button>
          <button class="map_menu-button">Удалить маркер</button>
        </div>
        <Map :workplaces="places" :plans="workplans" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
}
.map_menu {
  display: flex;
  justify-content: start;
  align-items: center;
  
}
.map_menu-button {

}
</style>
