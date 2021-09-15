<template>
  <div>
    <q-card-section>
      <quiz-question
        class="text-center"
        :questionText="question.text"
        :questionImage="question.image"
      />
    </q-card-section>
    <q-card-section>
      <quiz-answers :answers="question.answers" showCorrectAnswer />
    </q-card-section>
    <span
      class="q-mt-md row justify-center items-center text-accent"
      v-if="isUnanswered"
    >
      <q-icon class="q-mr-sm" name="warning_amber" color="accent" size="34px" />
      {{ $t('quiz.thisQuestionDoesNotHaveSpecificAnswer') }} <br />
      {{ $t('quiz.ifYouKnowAnswerHelpAnswerThisQuestionByReportingIt') }}
    </span>
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
    question: {
      type: Object as () => Question,
      required: true,
    },
  },
  computed: {
    isUnanswered(): boolean {
      return !this.question.answers.some((answer) => answer.isCorrect);
    },
  },
});
</script>
