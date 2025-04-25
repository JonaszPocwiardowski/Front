<script setup>
    import { FwbCheckbox, FwbButton } from 'flowbite-vue';
    import { ref } from 'vue';

    const props = defineProps(['taskData']);

    //console.log(props.taskData);

    const isDone = ref(props.taskData.isDone);

    const emit = defineEmits(['ModalOpen']);


    const editTask = () => {
        emit('ModalOpen',props.taskData);
        //console.log(props.taskData);
    };

</script>

<template>
    <div class="task_item" :id="props.taskData.id">
        <fwb-checkbox v-model="isDone" />
        <div class="task_item_textarea">
            <div class="task_item_content"> {{ props.taskData.content }} </div>
            <div class="task_item_description"> {{ props.taskData.description }} </div>
        </div>
        <fwb-button color="green" @click="editTask">Edytuj</fwb-button>
        <fwb-button color="red">Usuń</fwb-button>
    </div>
</template>


<style lang="scss" scoped>
    .task_item{
        display: flex;
        flex-direction: row;
        flex: 1;
        gap: 10px;

        .task_item_textarea {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
</style>