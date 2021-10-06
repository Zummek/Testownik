<template>
  <div class="column items-center">
    <q-btn
      class="start-btn"
      color="primary"
      label="Start Quiz"
      @click="startQuiz"
    />
    <div class="settings">
      <editable-field-text
        :label="$t('quiz.settings.additionalRepetitionsNumberWithWrongAnswers')"
        v-model:value="settings.additionalRepetitions"
        inputType="number"
        @update:value="(val) => updateQuizSetting('additionalRepetitions', val)"
      />
      <editable-field-text
        :label="$t('quiz.settings.initialRepetitionsNumber')"
        v-model:value="settings.initialRepetitions"
        inputType="number"
        @update:value="(val) => updateQuizSetting('initialRepetitions', val)"
      />
      <editable-field-text
        :label="$t('quiz.settings.maximumRepetitionsNumber')"
        v-model:value="settings.maximumRepetitions"
        inputType="number"
        @update:value="(val) => updateQuizSetting('maximumRepetitions', val)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { QuizSettings } from 'app/types/User';
import EditableFieldText from 'src/components/editableFieldText/EditableFieldText.vue';
import api from 'src/services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { EditableFieldText },
  name: 'StartQuizSettings',
  props: {
    quizId: Number,
  },
  data() {
    return {
      settings: {
        additionalRepetitions: 1,
        initialRepetitions: 2,
        maximumRepetitions: 10,
      },
    };
  },
  created() {
    void this.getQuizSettings();
  },
  methods: {
    async getQuizSettings() {
      this.settings = await api.me.getSettings();
    },
    async updateQuizSetting(key: keyof QuizSettings, value: number) {
      await api.me.updateSetting({ [key]: value });
    },
    startQuiz() {
      void this.$router.push({
        name: 'quiz-quizzing',
        params: {
          quizId: String(this.quizId),
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.start-btn {
  z-index: 500;
}
.settings {
  position: relative;
  top: -18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  padding-top: 2rem;
  color: $lowText;
  font-size: 0.8rem;
  line-height: 1.5rem;
}
</style>
