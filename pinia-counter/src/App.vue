<script setup>
import Counter from './components/Counter.vue';
import { reactive, provide } from 'vue';

const counterStore = reactive({count:0,});

provide('counterStore', counterStore);
</script>

<template>
  <Counter counterName="Counter1" />
  <Counter counterName="Counter2" />
</template>

<style scoped>

</style>
