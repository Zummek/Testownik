<template>
  <q-card>
    <q-card-section>
      <page-header :title="quiz?.name || $t('common.loading')" closePopup />
      <div class="row quiz-desc">
        {{ quiz?.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="column items-center">
        {{ $t('quiz.nQuestions', { n: quiz?.questions.length }) }}
        <q-btn flat color="primary" @click="previewQuestions" label="Preview" />
      </div>
    </q-card-section>
    <q-card-section class="quiz-start-settings-container">
      <quiz-start-settings />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import api from 'src/services/api';
import { QuizDetailsResponse } from 'src/services/api/apiResources/types';
import { defineComponent } from 'vue';
import PageHeader from '../PageHeader.vue';
import QuizStartSettings from './QuizStartSettings.vue';

export default defineComponent({
  components: { QuizStartSettings, PageHeader },
  name: 'QuizStart',
  props: {
    quizId: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      quiz: null as null | QuizDetailsResponse['data'],
      isLoading: true,
    };
  },
  created() {
    void this.loadQuiz();
  },
  methods: {
    async loadQuiz() {
      this.quiz = await api.quiz.getDetails(this.quizId);
      this.isLoading = false;
    },
    previewQuestions() {
      void this.$router.push({
        name: 'quiz-questions',
        params: {
          quizId: this.quizId,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.quiz-start-settings-container {
  padding: 0 35px 15px 35px;
}
.quiz-name {
  font-size: 1.5rem;
  font-weight: 400;
}
.quiz-desc {
  font-size: 1rem;
  margin-left: 42px;
}
</style>
