<template>
  <div class="row">
    {{ `${label}: ${value}` }}
    <q-popup-edit
      v-if="inputType === 'text'"
      v-model="valueState"
      auto-save
      v-slot="scope"
    >
      <q-input
        v-model="scope.value"
        dense
        autofocus
        :hint="label"
        @keyup.enter="scope.set"
      />
    </q-popup-edit>
    <q-popup-edit v-else v-model.number="valueState" auto-save v-slot="scope">
      <q-input
        v-model.number="scope.value"
        type="number"
        dense
        autofocus
        :hint="label"
        @keyup.enter="scope.set"
      />
    </q-popup-edit>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'EditableFieldText',
  emits: ['update:value'],
  props: {
    label: String,
    value: {
      type: [String, Number],
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
      validator: (value: string) => ['text', 'number'].includes(value),
    },
  },
  setup(props, { emit }) {
    const valueState = computed({
      get() {
        return props.value;
      },
      set(val: string | number) {
        emit('update:value', val);
      },
    });

    return {
      valueState,
    };
  },
});
</script>
