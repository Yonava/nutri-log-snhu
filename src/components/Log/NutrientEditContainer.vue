<template>
  <div>
    <div 
      @click="printElement"
      :style="{ backgroundColor: color }"
      class="label"
    >
      {{ label }}
    </div>
    <input
      v-model.number="editableValue"
      :readonly="!editable"
      ref="inputField"
      type="number"
      class="macros"
    />
  </div>
</template>

<script setup>
import { 
  ref, 
  defineProps,  
  watch, 
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: 'var(--ion-color-primary)',
  },
  editable: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emits = defineEmits(['valueChange']);

const editableValue = ref(props.value);
const inputField = ref(null);

onMounted(() => {
  inputField.value.addEventListener('focusout', cleanInput);
});

onBeforeUnmount(() => {
  inputField.value.removeEventListener('focusout', cleanInput);
});

function cleanInput() {
  if (editableValue.value === "") return editableValue.value = 0;
  if (isNaN(editableValue.value)) return editableValue.value = 0;
  if (editableValue.value < 0) return editableValue.value = 0;
}

// watch inputs value and emit valueChange event
watch(editableValue, (newValue) => {
  if (newValue === "") return;
  if (isNaN(newValue)) return;
  if (newValue < 0) return;
  emits('valueChange', newValue);
});
</script>

<style scoped>
.label {
  width: 100%; 
  text-align: center; 
  font-weight: 500; 
  border-radius: 7px 7px 0px 0px; 
  padding: 3px 0px;
}

input.macros {
  text-align: center;
  font-size: 2.25rem;
  font-weight: 200;
  padding: 8px;
  border-radius: 0 0 7px 7px;
  background-color: var(--ion-color-step-100);
  width: 100%;
  border: none;
}

input.macros:focus {
  background-color: var(--ion-color-step-150);
  outline: none;
}
</style>