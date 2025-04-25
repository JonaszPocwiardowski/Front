  <script lang="ts" setup>
    import { ref, watch } from 'vue'
    import { FwbButton, FwbModal , FwbInput} from 'flowbite-vue'
    
    const props = defineProps([
    'taskData',
    'showModal'
    ]);

    const emit = defineEmits(['updateTask', 'closeModal']);


    const editedContent = ref();

    watch(
  () => props.taskData,
  (newTaskData) => {
    if (newTaskData) {
      editedContent.value = newTaskData.content;
    }
  },
  { immediate: true }
);

    const saveChanges = () => {
        emit('updateTask', { ...props.taskData, content: editedContent.value });
        emit('closeModal'); 
    };

    const closeModal = () => {
        emit('closeModal');
    };

  </script>



<template>
    <fwb-modal persistent v-if="showModal">
      <template #header>
        <div class="flex items-center text-lg">
          Edytowanie
        </div>
      </template>
      <template #body>
        <fwb-input
            v-model="editedContent"
        />
      </template>
      <template #footer>
        <div class="flex justify-between">
            <fwb-button color="green" @click="saveChanges">Zapisz</fwb-button>
            <fwb-button color="red" @click="closeModal">Anuluj</fwb-button>
        </div>
      </template>
    </fwb-modal>
  </template>
  