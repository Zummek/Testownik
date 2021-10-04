<template>
  <div class="stopwatch text-h4" :class="{ 'text-h5': smaller }">
    <span v-if="hours" class="time">{{ hours }}</span>
    <span v-if="hours" class="colon">:</span>
    <span class="time">{{ minutes }}</span>
    <span class="colon">:</span>
    <span class="time">{{ seconds }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Stopwatch',
  props: {
    time: {
      type: Number,
      required: true,
    },
    smaller: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hours(): string | null {
      if (this.time < 3600) return null;

      return Math.floor(this.time / 3600).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
    minutes(): string {
      return Math.floor((this.time % 3600) / 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
    seconds(): string {
      return Math.floor(this.time % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.stopwatch {
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  /* font-size: 2rem; */

  &.time {
    margin-right: 0.5rem;
  }
  &.colon {
    margin-right: 0;
  }
}
</style>
