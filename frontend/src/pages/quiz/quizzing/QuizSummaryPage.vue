<template>
  <q-page
    :padding="$q.screen.gt.xs"
    :class="{
      'full-width': $q.screen.xs,
      'quiz-summary-page': $q.screen.gt.xs,
    }"
  >
    <q-card v-if="quizzing">
      <q-card-section class="column">
        <span class="text-h4"> {{ quizzing.quiz.name }} </span>
        <span class="text-subtitle1">
          {{ quizzing.quiz.description }}
        </span>
      </q-card-section>

      <q-card-section class="text-center">
        <span class="text-h5">{{ $t('common.summary') }}</span>
      </q-card-section>

      <q-card-section>
        <div
          class="justify-evenly"
          :class="[$q.screen.gt.xs ? 'row' : 'column']"
        >
          <div class="col-6 q-mb-md column">
            <span class="text-body1 text-center">
              {{ $t('quiz.summary.duration') }}
            </span>
            <stopwatch class="justify-center" :time="quizzing.upTime" smaller />
          </div>
          <centred-data-field
            class="col-6"
            :label="$t('quiz.summary.questionsNumber')"
            :data="
              quizzing.quiz.questions.length -
              quizzing.questionsWithoutCorrectAnswer.length
            "
          />
          <centred-data-field
            class="col-6"
            v-if="quizzing.questionsWithoutCorrectAnswer.length"
            :label="$t('quiz.unavailbleQuestions')"
            :data="quizzing.questionsWithoutCorrectAnswer.length"
            :tooltip="$t('quiz.unavailbleQuestionsInfo')"
          />
          <centred-data-field
            class="col-6"
            :label="$t('quiz.summary.givenAnswers')"
            :caption="$t('quiz.summary.givenAnswersCaption')"
            :data="`${quizzing.correctAnswers} / ${quizzing.incorrectAnswers}`"
          />
        </div>
      </q-card-section>

      <q-card-section class="row justify-center">
        <q-btn
          :label="$t('common.retry')"
          icon="refresh"
          :to="{ name: 'quiz-quizzing', params: { quizId: quizzing.quiz.id } }"
        />
        <q-btn
          class="q-ml-md q-mt-md"
          color="primary"
          :label="$t('common.toPanel')"
          icon-right="chevron_right"
          to="/app"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import CentredDataField from 'src/components/CentredDataField.vue';
import Stopwatch from 'src/components/stopwatch/Stopwatch.vue';
import QuizzingController from 'src/controllers/QuizzingController';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizSummaryPage',
  components: { Stopwatch, CentredDataField },
  data() {
    return {
      quizzing: null as null | QuizzingController,
    };
  },
  created() {
    void this.getQuizSummaryData();
  },
  beforeUnmount() {
    this.quizzing?.pause();
  },
  methods: {
    async getQuizSummaryData() {
      const finishedQuizSession = this.$store.state.quizSessions.quizzes.find(
        ({ quizController }) =>
          quizController.quiz.id === +this.$route.params.quizId
      );

      if (!finishedQuizSession) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('quiz.summary.quizNotFound'),
        });
        return this.$router.push('/app');
      } else if (finishedQuizSession.quizController.status !== 'finished') {
        this.$q.notify({
          type: 'negative',
          message: this.$t('quiz.summary.quizIsNotFinishedYet'),
        });
        return this.$router.push({
          name: 'quiz-quizzing',
          params: {
            quizId: this.$route.params.quizId,
          },
        });
      } else {
        this.quizzing = QuizzingController.fromSession(finishedQuizSession);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.quiz-summary-page {
  min-width: 700px;
}
</style>
