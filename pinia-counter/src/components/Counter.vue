<script setup>
import { ref, watch, inject} from 'vue';

const counter = ref(0);
const props = defineProps(['counterName']);

const counterStore = inject('counterStore');

const name = props.counterName;

const increment = () => {
    counter.value++;
    counterStore.count++;
}

const decrement = () => {
    counter.value--;
    counterStore.count--;
}

watch( () => counterStore.count, () => {
    console.log("Zmiana wartości counterStore'a");
});

</script>

<template>
    <div class="counter_container">
        <h1> {{ name }} </h1>
        <p> Global counter: {{ counterStore.count }} </p>
        <p> Local counter: {{ counter }} </p>
        <div class="counter_buttons">
            <button type="button" @click="decrement()"> - </button>
            <button type="button" @click="increment()"> + </button>
        </div>
    </div>
</template>

<style scoped>
    .counter_container {
        border: 2px solid black;
        border-radius: 10px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .counter_buttons {
        display: flex;
        gap: 25px;
    }
</style>