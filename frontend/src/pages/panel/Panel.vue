<template>
  <q-page class="row justify-center">
    <quiz-list />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import QuizList from './components/quizList/QuizList.vue';

export default defineComponent({
  components: { QuizList },
  name: 'Panel',
});
</script>
