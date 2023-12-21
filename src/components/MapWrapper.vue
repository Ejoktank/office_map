<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { PlansProps, WorkplacesProps } from "../App.vue";
import { workplaces, plans } from "../api/Api";
import Map from "./Map.vue";

const places = ref<WorkplacesProps[]>([]);
const workplans = ref<PlansProps[]>([]);
const isDataLoaded = ref(false);
const mapState = ref<MapState>("watch");
const addingMarker = ref<boolean>(false);

export type MapState = "watch" | "add" | "delete";

onBeforeMount(async () => {
  places.value = await workplaces();
  workplans.value = await plans();
  isDataLoaded.value = true;
});

function addMarker() {
  mapState.value = "add";
  addingMarker.value = true;
}
function watchMarker() {
  mapState.value = "watch";
  addingMarker.value = false;
}
function deleteMarker() {
  mapState.value = "delete";
  addingMarker.value = false;
}

</script>

<template>
  <template v-if="!isDataLoaded">
    <p>Loading...</p>
  </template>
  <template v-else>
    <div class="wrapper">
      <div class="map_menu">
        <button @click="watchMarker" class="map_menu-button">Просмотр</button>
        <button @click="addMarker" class="map_menu-button">Добавить маркер</button>
        <button @click="deleteMarker" class="map_menu-button">Удалить маркер</button>
      </div>
      <Map :workplaces="places" :plans="workplans" :state="mapState" />
      <div class="popup" :class="{ visible: addingMarker, hidden: !addingMarker }">
        <label for="input">Введите id сотрудника</label>
        <input type="text" id="input" />
        <button @click="">Ok</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.wrapper {
  position: relative;
}
.map_menu {
  display: flex;
  justify-content: start;
  align-items: center;
}
.popup {
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 15px 0;
  color: #000;
  background-color: #fff;
  border: #000;
  border-radius: 10px;
}
.visible {
  display: flex;
}
.hidden {
  display: none;
}
</style>
