<template>
  <div>
    <span class="list-title">{{ $t('quiz.questionList') }}</span>

    <quiz-question-list-item
      v-for="(question, index) in questions"
      :key="question.id"
      :questionText="question.text"
      :questionNo="index + 1"
      :questionImage="question.image"
      :isSelected="question.id === selectedQuestion.id"
      :isLast="index === questions.length - 1"
      @click="() => selectQuestion(question)"
    />
  </div>
</template>

<script lang="ts">
import { Question } from 'app/types/Quiz';
import QuizQuestionListItem from './QuizQuestionListPageQuestionItem.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { QuizQuestionListItem },
  name: 'QuizQuestionListPageList',
  emits: ['selectQuestion'],
  props: {
    questions: {
      type: Array as () => Question[],
      required: true,
    },
    selectedQuestion: {
      type: Object as () => Question,
      required: true,
    },
  },
  methods: {
    selectQuestion(question: Question) {
      this.$emit('selectQuestion', question);
    },
  },
});
</script>

<style lang="scss" scoped>
.list-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
</style>
