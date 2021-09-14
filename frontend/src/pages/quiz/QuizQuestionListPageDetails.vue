<template>
  <div>
    <q-card-section>
      <quiz-question
        class="text-center"
        :questionText="selectedQuestion.text"
        :questionImage="selectedQuestion.image"
      />
    </q-card-section>
    <q-card-section>
      <quiz-answers :answers="selectedQuestion.answers" showCorrectAnswer />
    </q-card-section>
  </div>
</template>

<script lang="ts">
import { Question } from 'app/types/Quiz';
import QuizAnswers from 'src/components/quiz/QuizAnswers.vue';
import QuizQuestion from 'src/components/quiz/QuizQuestion.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { QuizQuestion, QuizAnswers },
  name: 'QuizQuestionListPageDetails',
  props: {
    selectedQuestion: {
      type: Object as () => Question,
      required: true,
    },
  },
});
</script>
