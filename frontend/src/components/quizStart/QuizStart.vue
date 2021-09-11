<template>
  <q-card>
    <q-card-section>
      <div class="row items-center">
        <q-btn flat round color="primary" icon="arrow_back" v-close-popup />
        <div class="quiz-name">
          {{ quiz?.name || 'loading' }}
        </div>
      </div>
      <div class="row quiz-desc">
        {{ quiz?.description }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="column items-center">
        {{ quiz?.questions.length }} questions
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
import QuizStartSettings from './QuizStartSettings.vue';

export default defineComponent({
  components: { QuizStartSettings },
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
