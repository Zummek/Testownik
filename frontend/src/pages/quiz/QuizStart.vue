<template>
  <div>
    {{ `lets start: ${quizId}` }}
  </div>
</template>

<script lang="ts">
import api from 'src/services/api';
import { QuizDetailsResponse } from 'src/services/api/apiResources/types';
import { defineComponent } from 'vue';

export default defineComponent({
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
  },
});
</script>
