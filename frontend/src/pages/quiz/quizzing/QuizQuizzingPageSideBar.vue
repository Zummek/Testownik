<template>
  <div class="column items-center">
    <side-bar-actions
      :mainBtnIcon="mainBtnIcon"
      :mainBtnDisabled="!quizzing.selectedAnswers.length"
      :onMainBtnClick="onMainBtnClick"
    />
    <stopwatch :time="quizzing.upTime" />
    <div class="q-mt-md column items-center">
      <span>{{ $t('quiz.masteredQuestions') }} </span>
      <span>{{ quizzing.masteredQuestionsFormated }} </span>
    </div>
    <div
      v-if="quizzing.questionsWithoutCorrectAnswer.length"
      class="q-mt-md column items-center"
    >
      <span>
        {{ $t('quiz.unavailbleQuestions') }}
        <q-icon
          class="q-ml-xs absolute"
          size="xs"
          name="help_outline"
          color="info"
        >
          <q-tooltip
            class="text-center"
            max-width="200px"
            transition-show="scale"
            transition-hide="scale"
            :delay="200"
          >
            {{ $t('quiz.unavailbleQuestionsInfo') }}
          </q-tooltip>
        </q-icon>
      </span>
      <span class="justify-center items-center">
        {{ quizzing.questionsWithoutCorrectAnswer.length }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import QuizzingController from 'src/controllers/QuizzingController';
import SideBarActions from './QuizQuizzingPageSideBarActions.vue';
import Stopwatch from 'src/components/stopwatch/Stopwatch.vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: { Stopwatch, SideBarActions },
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
