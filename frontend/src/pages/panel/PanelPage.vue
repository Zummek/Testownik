<template>
  <q-page :padding="$q.screen.gt.xs" class="row justify-center">
    <quiz-list />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuizList from './components/QuizList.vue';

export default defineComponent({
  components: { QuizList },
  name: 'PanelPage',
});
</script>
