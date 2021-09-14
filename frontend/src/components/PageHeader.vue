<template>
  <div class="row items-center">
    <q-btn
      flat
      round
      color="primary"
      icon="arrow_back"
      v-close-popup="closePopup"
      @click="onClick"
    />
    <div class="page-header__title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader',
  emits: ['click'],
  props: {
    title: {
      type: String,
    },
    closePopup: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
});
</script>

<style lang="scss" scoped>
.page-header__title {
  font-size: 1.5rem;
  font-weight: 400;
}
</style>
