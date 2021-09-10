<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NoAppLayout',
});
</script>

<style lang="scss" scoped>
.page-container {
  background-color: $background;
}
</style>
