<script setup>
  import {FwbHeading, FwbButton,FwbListGroup, FwbListGroupItem} from 'flowbite-vue';
  import InputComponent from './components/InputComponent.vue';
  import TaskItemComponent from './components/TaskItemComponent.vue';
  import { readFromLocalStorage, saveToLocalStorage } from './services/localStorageModule';
  import { onMounted, ref } from 'vue';
  import ModalEdit from './components/ModalEdit.vue';
  import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';


  const taskList = ref([]);
  const modalVisible = ref(false);
  const taskToEdit = ref();
  const router = useRouter();
  const route = useRoute();

  const buttonClickedToDo = () => {
    //<RouterLink to="/">Home</RouterLink>
    router.push('/');
    }
    const buttonClickedSett = () => {
      //<RouterLink to="/settings">About</RouterLink>
      router.push('/settings');
    }
  

</script>

<template>
  <div class="container">
    <fwb-heading tag="h1" class="heading">HELLO WORLD!</fwb-heading>
    <div class="navigation">
      <fwb-button color="green" @click="buttonClickedToDo">ToDo</fwb-button>
      <fwb-button color="green" @click="buttonClickedSett">Ustawienia</fwb-button>
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container{
    border: 2px solid black;
    width: 80%;
    max-width: 800px;
    min-width: 320px;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .heading {
      background-color: yellow;
      text-align: center;
    }

    .content {
    flex-grow: 1; 
    height: 100%; 
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center; 
  }
  .navigation {
    display: flex;
    gap: 10px;
    margin: 10px; 
  }

  }
</style>
