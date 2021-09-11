<template>
  <div class="column items-center">
    <q-btn
      glossy
      class="start-btn"
      color="primary"
      label="Start Quiz"
      @click="startQuiz"
    />
    <div class="settings">
      <editable-field-text
        :label="$t('quiz.settings.additionalNumberRepetitionsWithWrongAnswers')"
        v-model:value="additionalNumberRepetitionsWithWrongAnswers"
        inputType="number"
        @update:value="updateQuizSettings"
      />
      <editable-field-text
        :label="$t('quiz.settings.initialNumberRepetitions')"
        v-model:value="initialNumberRepetitions"
        inputType="number"
        @update:value="updateQuizSettings"
      />
      <editable-field-text
        :label="$t('quiz.settings.maximumNumberRepetitions')"
        v-model:value="maximumNumberRepetitions"
        inputType="number"
        @update:value="updateQuizSettings"
      />
    </div>
  </div>
</template>

<script lang="ts">
import EditableFieldText from 'src/components/editableFieldText/EditableFieldText.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { EditableFieldText },
  name: 'StartQuizSettings',
  data() {
    return {
      additionalNumberRepetitionsWithWrongAnswers: 1,
      initialNumberRepetitions: 2,
      maximumNumberRepetitions: 10,
    };
  },
  methods: {
    startQuiz() {
      void this.$router.push({
        name: 'quiz',
        params: {
          id: this.$route.params.id,
        },
      });
    },
    updateQuizSettings(value: number) {
      console.log(value);
      // TODO: update quiz settings
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
