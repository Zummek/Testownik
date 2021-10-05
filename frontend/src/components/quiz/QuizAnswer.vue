<template>
  <q-card
    class="quiz-answer row justify-center items-center"
    :class="markingClass"
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
  computed: {
    markingClass() {
      if (this.showCorrectAnswer && this.isSelected && this.answer.isCorrect) {
        return 'quiz-answer--correct';
      } else if (
        this.showCorrectAnswer &&
        this.isSelected &&
        !this.answer.isCorrect
      ) {
        return 'quiz-answer--incorrect-selected';
      } else if (
        this.showCorrectAnswer &&
        !this.isSelected &&
        this.answer.isCorrect
      ) {
        return 'quiz-answer--missed';
      } else if (this.isSelected) {
        return 'quiz-answer--selected';
      } else {
        return '';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
$quiz-answer-incorrect-color: $negative;
$quiz-answer-correct-color: $positive;
$quiz-answer-missed-color: $warning;
$quiz-answer-selected-color: #707070;

@mixin quiz-answer-marking($color) {
  background-color: rgba($color, 0.05);
  box-shadow: 0 1px 5px rgba($color, 0.75), 0 2px 2px rgba($color, 0.19),
    0 3px 1px -2px rgb22a($color, 0.17) !important;
}

@mixin quiz-answer-selected($color) {
  overflow: hidden;
  &:before {
    content: '';
    border-style: solid;
    border-width: 10px 0 10px 15px;
    border-color: transparent transparent transparent rgba($color, 0.5);
    position: absolute;
    left: 0;
  }
  &:after {
    content: '';
    border-style: solid;
    border-width: 10px 15px 10px 0;
    border-color: transparent rgba($color, 0.5) transparent transparent;
    position: absolute;
    right: 0;
  }
}

.quiz-answer {
  min-width: 280px;
  transition: 0.1s ease-in-out;
}
.quiz-answer--incorrect-selected {
  transition: 0.3s ease-in-out;
  @include quiz-answer-marking($quiz-answer-incorrect-color);
  @include quiz-answer-selected($quiz-answer-incorrect-color);
}
.quiz-answer--selected {
  transition: 0.1s ease-in-out;
  @include quiz-answer-marking($quiz-answer-selected-color);
  @include quiz-answer-selected($quiz-answer-selected-color);
}
.quiz-answer--correct {
  transition: 0.3s ease-in-out;
  @include quiz-answer-marking($quiz-answer-correct-color);
  @include quiz-answer-selected($quiz-answer-correct-color);
}
.quiz-answer--missed {
  transition: 0.3s ease-in-out;
  @include quiz-answer-marking($quiz-answer-missed-color);
}
.quiz-answer__text {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
