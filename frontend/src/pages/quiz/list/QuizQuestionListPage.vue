<template>
  <q-page :padding="$q.screen.gt.xs" class="full-width">
    <q-card v-if="quiz && selectedQuestion">
      <q-card-section>
        <page-header
          :title="quiz.name || $t('common.loading')"
          @click="goBack"
        />
      </q-card-section>

      <q-card-section
        class="row justify-center"
        horizontal
        v-if="$q.screen.gt.sm"
      >
        <q-card-section>
          <question-list
            style="width: 300px"
            :questions="quiz.questions"
            :selectedQuestion="selectedQuestion"
            @selectQuestion="selectQuestion"
          />
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="full-width">
          <question-details :question="selectedQuestion" />
        </q-card-section>
      </q-card-section>

      <q-card-section v-else>
        <q-tab-panels
          v-model="currentPanel"
          animated
          swipeable
          class="rounded-borders"
        >
          <q-tab-panel name="list">
            <question-list
              :questions="quiz.questions"
              :selectedQuestion="selectedQuestion"
              @selectQuestion="selectQuestion"
            />
          </q-tab-panel>

          <q-tab-panel name="details">
            <q-btn
              @click="backToList"
              outline
              color="primary"
              class="q-ml-md"
              icon="arrow_back"
              label="Back to list"
            />
            <question-details :question="selectedQuestion" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Quiz, { Question } from 'app/types/Quiz';
import PageHeader from 'src/components/PageHeader.vue';
import api from 'src/services/api';
import { defineComponent } from 'vue';
import QuestionDetails from './QuizQuestionListPageDetails.vue';
import QuestionList from './QuizQuestionListPageList.vue';

export default defineComponent({
  components: { PageHeader, QuestionList, QuestionDetails },
  name: 'QuizQuestionListPage',
  data() {
    return {
      quiz: null as null | Quiz,
      selectedQuestion: null as null | Question,
      currentPanel: 'list',
    };
  },
  async created() {
    let selectedFromQuery;
    await this.fetchQuiz();

    if (this.$route.query.s)
      selectedFromQuery = this.quiz?.questions.find(
        (q) => q.id === +String(this.$route.query.s)
      );

    this.selectedQuestion =
      selectedFromQuery || this.quiz?.questions[0] || null;
  },
  methods: {
    async fetchQuiz() {
      this.quiz = await api.quiz.getDetails(+this.$route.params.quizId);
    },
    selectQuestion(question: Question) {
      void this.$router.replace(`${this.$route.path}?s=${question.id}`);
      this.selectedQuestion = question;
      this.currentPanel = 'details';
    },
    goBack() {
      this.$router.back();
    },
    backToList() {
      this.currentPanel = 'list';
    },
  },
});
</script>
