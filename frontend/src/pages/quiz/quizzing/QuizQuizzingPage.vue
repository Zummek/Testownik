<template>
  <q-page :padding="$q.screen.gt.xs" class="full-width">
    <q-card v-if="quizzing">
      <q-card-section horizontal class="quiz-quizzing">
        <q-card-section class="column full-width">
          <transition
            class="quiz-quizzing__transition"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            duration="150"
            mode="out-in"
          >
            <div
              class="quiz-quizzing--animated full-width q-pa-md"
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

        <q-card-section class="quiz-quizzing__side-bar column items-center">
          <side-bar-actions
            :mainBtnIcon="mainBtnIcon"
            :mainBtnDisabled="!quizzing.selectedAnswers.length"
            :onMainBtnClick="onMainBtnClick"
          />
          <stopwatch :time="quizzing.upTime" />
          <div class="q-mt-md column items-center">
            <span>{{ $t('quiz.masteredQuestions') }} </span>
            <span>{{ quizzing.masteredQuestionsFormated }} </span>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import QuizAnswers from 'src/components/quiz/QuizAnswers.vue';
import QuizQuestion from 'src/components/quiz/QuizQuestion.vue';
import Stopwatch from 'src/components/stopwatch/Stopwatch.vue';
import QuizzingController from 'src/controllers/QuizzingController';
import api from 'src/services/api';
import { defineComponent } from 'vue';
import SideBarActions from './QuizQuizzingPageSideBarActions.vue';

export default defineComponent({
  components: { QuizQuestion, QuizAnswers, Stopwatch, SideBarActions },
  name: 'QuizQuizzingPage',
  data() {
    return {
      quizzing: null as null | QuizzingController,
      isCorrectAnswer: false,
    };
  },
  async created() {
    await this.startResumeQuiz();
    console.log('quizzing', this.quizzing);
  },
  beforeUnmount() {
    this.quizzing?.pause();
  },
  computed: {
    mainBtnIcon(): string {
      return this.quizzing?.status === 'markingAnswer'
        ? 'done'
        : 'arrow_forward_ios';
    },
  },
  methods: {
    async startResumeQuiz() {
      const oldSession = this.$store.state.quizSessions.quizzes.find(
        (session) =>
          session.quizController.quiz.id === +this.$route.params.quizId
      );

      if (oldSession) {
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
      else this.quizzing?.getNextQuestion();
    },
  },
});
</script>

<style lang="scss" scoped>
.quiz-quizzing {
  min-height: 500px;
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
