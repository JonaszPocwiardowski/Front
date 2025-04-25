<script setup>
import { ref, onMounted } from 'vue';
import { saveToLocalStorage, readFromLocalStorage } from '../services/localStorageModule';
import { FwbHeading, FwbListGroup, FwbListGroupItem, FwbButton, FwbInput } from 'flowbite-vue';


const currentKey = ref('');
const newKey = ref('');

onMounted(() => {
  currentKey.value = readFromLocalStorage('key') || 'myTasks';
  //console.log(currentKey.value)
});
//console.log(readFromLocalStorage('myTasks'));
//const allKeys = Object.keys(localStorage);
//console.log(allKeys);

const updateKey = () => {
  if (newKey.value.trim()) {
    const tasks = readFromLocalStorage(currentKey.value);
    saveToLocalStorage(newKey.value, tasks);
    localStorage.removeItem(currentKey.value);
    saveToLocalStorage('key', newKey.value);
    currentKey.value = newKey.value;
    newKey.value = '';
  }
};
</script>

<template>
  <div class="settings-view">
    <h1>Ustawienia</h1>
    <p>Obecny klucz przechowywania zadań: <strong>{{ currentKey }}</strong></p>
    <div class="content">
      <fwb-input v-model="newKey" placeholder="Wprowadź nowy klucz" />
      
      <fwb-button @click="updateKey">Zmień klucz</fwb-button>
    </div>
  </div>
</template>

<style scoped>
.settings-view {
  width: 100%;
  max-width: 800px;
  min-width: 320px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px; 
}
</style>
