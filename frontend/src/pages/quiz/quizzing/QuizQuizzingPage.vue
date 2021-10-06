<template>
  <q-page :padding="$q.screen.gt.xs" class="full-width">
    <q-card v-if="quizzing">
      <q-card-section
        :horizontal="$q.screen.gt.xs"
        class="quiz-quizzing q-pa-none"
      >
        <q-card-section
          class="column full-width"
          :class="{ 'q-pa-none': $q.screen.xs }"
        >
          <transition
            class="quiz-quizzing__transition"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            duration="150"
            mode="out-in"
          >
            <div
              class="quiz-quizzing--animated full-width q-pa-none"
              :key="quizzing.currentQuestion.question.id"
            >
              <q-card-section>
                <quiz-question
                  class="text-center"
                  :key="quizzing.currentQuestion.question.id"
                  :questionImage="quizzing.currentQuestion.question.image"
                  :questionText="quizzing.currentQuestion.question.text"
                />
              </q-card-section>
              <q-card-section>
                <quiz-answers
                  :answers="quizzing.currentQuestion.question.answers"
                  :showCorrectAnswer="quizzing?.status === 'showingAnswer'"
                  :selectable="quizzing?.status === 'markingAnswer'"
                  v-model:selected="quizzing.selectedAnswers"
                />
              </q-card-section>
            </div>
          </transition>
          <q-separator />
          <div class="q-mt-sm row justify-center quiz-quizzing__footer">
            <span
              >{{
                $t('quiz.remainingRepetitions') +
                ': ' +
                quizzing.currentQuestion.remainingRepetitions
              }}
            </span>
          </div>
        </q-card-section>

        <q-card-section
          class="quiz-quizzing__side-bar"
          :class="{ 'full-width': $q.screen.xs }"
        >
          <side-bar :quizzing="quizzing" :onMainBtnClick="onMainBtnClick" />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import QuizAnswers from 'src/components/quiz/QuizAnswers.vue';
import QuizQuestion from 'src/components/quiz/QuizQuestion.vue';
import QuizzingController from 'src/controllers/QuizzingController';
import SideBar from './QuizQuizzingPageSideBar.vue';
import api from 'src/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { QuizQuestion, QuizAnswers, SideBar },
  name: 'QuizQuizzingPage',
  data() {
    return {
      quizzing: null as null | QuizzingController,
      isCorrectAnswer: false,
    };
  },
  async created() {
    await this.startResumeQuiz();
  },
  beforeUnmount() {
    this.quizzing?.pause();
  },
  methods: {
    async startResumeQuiz() {
      const oldSession = this.$store.state.quizSessions.quizzes.find(
        ({ quizController }) =>
          quizController.quiz.id === +this.$route.params.quizId
      );

      if (oldSession && oldSession.quizController.status !== 'finished') {
        this.quizzing = QuizzingController.fromSession(oldSession);
      } else {
        const quiz = await api.quiz.getDetails(+this.$route.params.quizId);
        const settings = await api.me.getSettings();
        this.quizzing = new QuizzingController(quiz, settings);
      }

      this.quizzing.start();
    },
    onMainBtnClick() {
      if (this.quizzing?.status === 'markingAnswer')
        this.isCorrectAnswer = this.quizzing.answerQuestion();
      else if (this.quizzing?.remainingQuestions.length === 0) {
        this.quizzing?.finish();
        return this.$router.push({
          name: 'quiz-summary',
          params: { quizId: this.$route.params.quizId },
        });
      } else this.quizzing?.getNextQuestion();
    },
  },
});
</script>

<style lang="scss" scoped>
.quiz-quizzing {
  min-height: 50vh;
}
.quiz-quizzing__transition {
  position: relative;
  flex: 1;
}
.quiz-quizzing__side-bar {
  width: 350px;
  background-color: $backgroundVariant;
  margin-left: 10px;
}
.quiz-quizzing__footer {
  color: $lowText;
}
</style>
