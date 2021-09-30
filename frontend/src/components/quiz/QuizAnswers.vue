<template>
  <div class="row justify-center q-col-gutter-lg">
    <div class="row col-12 col-lg-6" v-for="answer in answers" :key="answer.id">
      <quiz-answer
        class="col"
        :answer="answer"
        :showCorrectAnswer="showCorrectAnswer"
        :isSelected="isSelected(answer)"
        @click="() => toggleAnswer(answer)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Answer } from 'app/types/Quiz';
import QuizAnswer from './QuizAnswer.vue';

export default defineComponent({
  components: { QuizAnswer },
  name: 'QuizAnswers',
  emits: ['update:selected'],
  watch: {
    selected: {
      handler(answers: Answer[]) {
        this.selectedState = answers;
      },
      immediate: true,
    },
  },
  props: {
    answers: {
      type: Array as () => Answer[],
      required: true,
    },
    showCorrectAnswer: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array as () => Answer[],
      default: () => [],
    },
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    console.log(this.selected);
    console.log(this.selectedState);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', (e) => this.onKeyDown(e));
  },
  data() {
    return {
      selectedState: [] as Answer[],
    };
  },
  methods: {
    onKeyDown(event: KeyboardEvent) {
      // check if the key is a number
      if (event.key.length === 1 && !isNaN(+event.key)) {
        this.toggleAnswerByNumber(+event.key);
      }
    },
    isSelected(answer: Answer) {
      return this.selectedState.some(
        (selectedAnswer) => selectedAnswer.id === answer.id
      );
    },
    toggleAnswerByNumber(number: number) {
      const answer = this.answers[number - 1];
      if (answer) {
        this.toggleAnswer(answer);
      }
    },
    toggleAnswer(answer: Answer) {
      if (this.selectable) {
        const selectedIndex = this.selectedState.findIndex((s) => s === answer);

        if (selectedIndex !== -1) this.selectedState.splice(selectedIndex, 1);
        else this.selectedState.push(answer);

        this.$emit('update:selected', this.selectedState);
      }
    },
  },
});
</script>
