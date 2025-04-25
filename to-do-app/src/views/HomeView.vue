<script setup>
import {FwbListGroup, FwbListGroupItem, FwbButton } from 'flowbite-vue';
import InputComponent from '../components/InputComponent.vue';
import TaskItemComponent from '../components/TaskItemComponent.vue';
import { readFromLocalStorage, saveToLocalStorage } from '../services/localStorageModule';
import { onMounted, ref, resolveDirective } from 'vue';
import ModalEdit from '../components/ModalEdit.vue';
import { useRouter } from 'vue-router';


const storageKey = ref('myTasks');
const taskList = ref([]);
const modalVisible = ref(false);
const taskToEdit = ref();

onMounted(() => {
  //const storedKey = readFromLocalStorage(storageKey);
  //storageKey.value = storedKey;
  //console.log(storedKey);
  storageKey.value= readFromLocalStorage('key') || 'myTasks';
  taskList.value = readFromLocalStorage(storageKey.value);
  console.log(storageKey.value)
  console.log(readFromLocalStorage(storageKey.value));
  saveToLocalStorage('key',storageKey.value);
});

const addNewTask = (content) => {
  const task = {
    content: content,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    isDone: false,
    description: ''
  };
  taskList.value.push(task);
  saveToLocalStorage(storageKey.value, taskList.value);
};

const inputValueChanged = (arg) => {
  addNewTask(arg);
};

const openModal = (task) => {
  taskToEdit.value = task;
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
  taskToEdit.value = null;
};

const updateTask = (updatedTask) => {
  const index = taskList.value.findIndex(task => task.id === updatedTask.id);
  if (index !== -1) {
    taskList.value[index] = updatedTask;
    saveToLocalStorage(storageKey.value, taskList.value);
  }
  closeModal();
};
</script>

<template>
  <div class="container">
    <div class="content w-full">
      <fwb-list-group class="w-full">
        <fwb-list-group-item v-for="item in taskList" :key="item.id">
          <TaskItemComponent :taskData="item" @ModalOpen="openModal" />
        </fwb-list-group-item>
      </fwb-list-group>
    </div>
    <InputComponent @input-value="inputValueChanged" />
    <ModalEdit
      :taskData="taskToEdit"
      :showModal="modalVisible"
      @updateTask="updateTask"
      @closeModal="closeModal"
    />
  </div>
</template>

<style scoped>
.container {
  border:none;
  width: 100%;
  max-width: 800px;
  min-width: 320px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  
  .content {
    flex-grow: 1;
  }
}
</style> 
