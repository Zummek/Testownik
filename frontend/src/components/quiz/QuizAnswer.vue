<template>
  <q-card
    class="quiz-answer row justify-center items-center"
    :class="{
      'quiz-answer--selected': isSelected,
      'quiz-answer--correct': showCorrectAnswer && answer.isCorrect,
      'quiz-answer--incorrect-selected':
        showCorrectAnswer && isSelected && !answer.isCorrect,
    }"
  >
    <q-card-section>
      <div v-if="answer.text" class="quiz-answer__text text-center">
        <span>{{ answer.text }}</span>
      </div>
      <div v-if="answer.image">
        <img :src="answer.image" alt="answer content" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { Answer } from 'app/types/Quiz';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizAnswer',
  props: {
    answer: {
      type: Object as () => Answer,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    showCorrectAnswer: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log('QuizAnswer mounted', this.isSelected);
  },
});
</script>

<style lang="scss" scoped>
.quiz-answer {
  min-width: 280px;
}
.quiz-answer--incorrect-selected {
  background-color: rgba($negative, 0.05);
  box-shadow: 0 1px 5px rgba($negative, 0.75), 0 2px 2px rgba($negative, 0.19),
    0 3px 1px -2px rgba($negative, 0.17) !important;
}
.quiz-answer--selected {
  background-color: rgba($info, 0.05);
  box-shadow: 0 1px 5px rgba($info, 0.75), 0 2px 2px rgba($info, 0.19),
    0 3px 1px -2px rgba($info, 0.17);
}
.quiz-answer--correct {
  background-color: rgba($positive, 0.05);
  box-shadow: 0 1px 5px rgba($positive, 0.75), 0 2px 2px rgba($positive, 0.19),
    0 3px 1px -2px rgba($positive, 0.17) !important;
}
.quiz-answer__text {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
