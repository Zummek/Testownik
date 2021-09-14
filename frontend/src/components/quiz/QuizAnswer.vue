<template>
  <q-card
    class="quiz-answer row justify-center items-center"
    :class="{ 'quiz-answer--correct': isCorrectAnswer }"
  >
    <q-card-section>
      <div v-if="answerText" class="quiz-answer__text text-center">
        <span>{{ answerText }}</span>
      </div>
      <div v-if="answerImage">
        <img :src="answerImage" alt="answer content" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizAnswer',
  props: {
    answerText: String,
    answerImage: String,
    isCorrectAnswer: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.quiz-answer {
  min-width: 280px;
}
.quiz-answer--correct {
  background-color: rgba($positive, 0.05);
  box-shadow: 0 1px 5px rgba($positive, 0.75), 0 2px 2px rgba($positive, 0.19),
    0 3px 1px -2px rgba($positive, 0.17);
}
.quiz-answer__text {
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
