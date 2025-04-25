<script setup>
    import {FwbButton, FwbInput} from 'flowbite-vue';
    import {ref} from 'vue';
    const emit = defineEmits(['inputValue']);
    const text = ref('');

    const buttonClicked = () => {
        emit('inputValue', text.value);
        text.value = '';
    }
</script>

<template>
    <div class="flex w-full">
        <fwb-input class="grow"
                   placeholder="Podaj zadanie do dodania do listy"
                   v-model="text"
                   size="lg"
                   >
            <template #prefix>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 dark:text-gray-400" stroke="currentColor" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
            </template>
            <template #suffix>
                <fwb-button @click="buttonClicked">+ Dodaj</fwb-button>
            </template>
        </fwb-input>
    </div>
</template>

<style lang="scss" scoped>
    
</style>