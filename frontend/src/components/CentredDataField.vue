<template>
  <div class="q-mb-md column col text-center">
    <span class="text-body1"
      >{{ label }}
      <q-icon
        v-if="tooltip"
        class="q-ml-xs absolute"
        size="xs"
        name="help_outline"
        :color="tooltipColor"
      >
        <q-tooltip
          class="text-center"
          max-width="200px"
          transition-show="scale"
          transition-hide="scale"
          :delay="200"
        >
          {{ tooltip }}
        </q-tooltip>
      </q-icon>
    </span>
    <span class="text-h5" :class="{ 'text-body1': smaller }">{{ data }}</span>
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
    data: {
      type: [String, Number],
      required: true,
    },
    smaller: Boolean,
    tooltip: String,
    tooltipColor: {
      type: String,
      default: 'info',
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
