<template>
  <q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Testownik</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-card>
        <q-card-section>
          <router-view />
        </q-card-section>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: $background;
}
</style>
