<template>
  <div>
    <div
      class="question-item row q-my-md no-wrap"
      :class="{ 'question-item--selected': isSelected }"
    >
      <div v-if="questionNo" class="q-mr-md text-center">
        <span>{{ questionNo }}.</span>
      </div>
      <quiz-question
        :questionText="questionText"
        :questionImage="questionImage"
      />
    </div>
    <q-separator v-if="!isLast" />
  </div>
</template>

<script lang="ts">
import QuizQuestion from 'src/components/quiz/QuizQuestion.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { QuizQuestion },
  name: 'QuizQuestionListPageQuestionItem',
  props: {
    questionNo: Number,
    questionText: String,
    questionImage: String,
    isSelected: Boolean,
    isLast: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.question-item {
  cursor: pointer;
}
.question-item--selected {
  text-shadow: 0px 0px 1px black;
}
.question-item__icon {
  margin-left: auto;
  align-self: center;
}
</style>
