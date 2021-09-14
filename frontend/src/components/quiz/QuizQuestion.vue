<template>
  <div>
    <div v-if="questionText">
      <span>{{ questionText }}</span>
    </div>
    <div v-if="questionImage" class="row justify-center">
      <img :src="questionImage" alt="question content" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizQuestion',
  props: {
    questionNo: Number,
    questionText: String,
    questionImage: String,
  },
});
</script>
