<template>
  <div 
    class="parent center" 
    :style="{ backgroundColor: color }"
  >
    <span style="font-weight: 500; margin: 3px 0px">
      {{ label }}
    </span>
    <ion-input
      v-model.number="editableValue"
      :readonly="!editable"
      :style="inputStyle"
      @ionFocus="focused = true"
      @ionBlur="focused = false"
      type="number"
      enterkeyhint="done"
      class="macros"
    ></ion-input>
  </div>
</template>

<script setup>
import { IonInput } from '@ionic/vue';
import { 
  ref, 
  defineProps, 
  computed, 
  watch, 
  $emit 
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

const focused = ref(false);
const editableValue = ref(props.value);

// watch inputs value and emit valueChange event
watch(editableValue, (newValue) => {
  if (newValue === "") editableValue.value = 0;
  console.log('valueChange', newValue)
  // $emit('valueChange', newValue);
});

const inputStyle = computed(() => {
  if (focused.value) {
    return {
      backgroundColor: 'var(--ion-color-step-150)',
    };
  }
  return {
    backgroundColor: 'var(--ion-color-step-100)',
  };
});
</script>

<style scoped>
.parent {
  width: 30%; 
  border-radius: 10px
}

ion-input.macros {
  text-align: center;
  font-size: 2.25rem;
  font-weight: 200;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-bottom: 8px;
  --padding-top: 8px;
  border-radius: 0 0 7px 7px;
  background-color: var(--ion-color-light);
}
</style>