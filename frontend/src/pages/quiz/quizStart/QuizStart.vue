<template>
  <q-page class="quiz-start-page">
    <q-card>
      <q-card-section>
        <div class="row items-center">
          <q-btn flat round color="primary" icon="arrow_back" @click="goBack" />
          <div class="quiz-name">
            {{ quiz?.name || 'loading' }}
          </div>
        </div>
        <div class="quiz-desc">
          {{ quiz?.description }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="column items-center">
          {{ quiz?.questions.length }} questions
          <q-btn
            flat
            color="primary"
            @click="previewQuestions"
            label="Preview"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <start-quiz-settings />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import api from 'src/services/api';
import { QuizDetailsResponse } from 'src/services/api/apiResources/types';
import { defineComponent } from 'vue';
import StartQuizSettings from './components/StartQuizSettings.vue';

export default defineComponent({
  components: { StartQuizSettings },
  name: 'QuizStart',
  data: function () {
    return {
      quizId: this.$route.params.id as string,
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
    goBack() {
      void this.$router.back();
    },
    previewQuestions() {
      void this.$router.push({
        name: 'quizPreview',
        params: {
          id: this.quizId,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.quiz-start-page {
  padding: 25px;
  max-width: 600px;
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
