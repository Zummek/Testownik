<template>
  <div class="row justify-center q-col-gutter-lg">
    <div class="row col-12 col-lg-6" v-for="answer in answers" :key="answer.id">
      <quiz-answer
        class="col"
        :answerText="answer.text"
        :answerImage="answer.image"
        :isCorrectAnswer="answer.isCorrect"
        :showCorrectAnswer="showCorrectAnswer"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Answer } from 'app/types/Quiz';
import QuizAnswer from './QuizAnswer.vue';

export default defineComponent({
  components: { QuizAnswer },
  name: 'QuizAnswers',
  props: {
    answers: {
      type: Array as () => Answer[],
      required: true,
    },
    showCorrectAnswer: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
