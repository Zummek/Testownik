<template>
  <div class="q-mb-md column col text-center">
    <span class="text-body1">{{ label }}</span>
    <span class="text-h5">{{ value }}</span>
    <span v-if="caption" class="caption--lowTextColor text-caption text-italic">
      {{ caption }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CentredDataField',
  props: {
    label: {
      type: String,
      required: true,
    },
    caption: String,
    value: {
      type: [String, Number],
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
}
.caption--lowTextColor {
  color: $lowText;
}
</style>
