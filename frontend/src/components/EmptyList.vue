<template>
  <div class="full-width row flex-center text-accent q-gutter-sm">
    <q-icon size="2em" name="sentiment_dissatisfied" /><br />
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmptyList',
  props: {
    message: String,
  },
});
</script>
