<template>
  <div class="column items-center">
    <side-bar-actions
      :mainBtnIcon="mainBtnIcon"
      :mainBtnDisabled="!quizzing.selectedAnswers.length"
      :onMainBtnClick="onMainBtnClick"
    />
    <stopwatch :time="quizzing.upTime" />
    <centred-data-field
      class="q-mt-md"
      :label="$t('quiz.masteredQuestions')"
      :data="quizzing.masteredQuestionsFormated"
    />
    <centred-data-field
      v-if="quizzing.questionsWithoutCorrectAnswer.length"
      :label="$t('quiz.unavailbleQuestions')"
      :data="quizzing.questionsWithoutCorrectAnswer.length"
      :tooltip="$t('quiz.unavailbleQuestionsInfo')"
      smaller
    />
  </div>
</template>

<script lang="ts">
import QuizzingController from 'src/controllers/QuizzingController';
import SideBarActions from './QuizQuizzingPageSideBarActions.vue';
import Stopwatch from 'src/components/stopwatch/Stopwatch.vue';
import { defineComponent, PropType } from 'vue';
import CentredDataField from 'src/components/CentredDataField.vue';

export default defineComponent({
  components: { Stopwatch, SideBarActions, CentredDataField },
  name: 'QuizQuizzingPageSideBar',
  props: {
    quizzing: {
      type: Object as PropType<QuizzingController>,
      required: true,
    },
    onMainBtnClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  computed: {
    mainBtnIcon(): string {
      return this.quizzing?.status === 'markingAnswer'
        ? 'done'
        : 'arrow_forward_ios';
    },
  },
});
</script>
