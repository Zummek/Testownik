<template>
  <div class="box">
    <q-table
      :title="$t('quiz.quizzes')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
      :no-data-label="$t('quiz.emptyList')"
      bordered
      hide-pagination
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            round
            flat
            color="primary"
            icon="chevron_right"
            @click="() => openQuiz(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="showQuizDialog">
      <quiz-start :quizId="selectedQuizId" />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import QuizStart from 'src/components/quizStart/QuizStart.vue';
import api from 'src/services/api';
import { QuizListResponse } from 'src/services/api/apiResources/types';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { QuizStart },
  name: 'QuizList',
  data: function () {
    return {
      isLoading: true,
      rows: [] as QuizListResponse['data'],
      columns: [
        {
          name: 'icon',
          label: '',
          align: 'center',
          field: 'icon',
        },
        {
          name: 'name',
          label: this.$t('common.name'),
          field: 'name',
        },
        {
          name: 'actions',
        },
      ],
      showQuizDialog: false,
      selectedQuizId: 0,
    };
  },
  created() {
    void this.loadQuizzes();
  },
  methods: {
    async loadQuizzes() {
      this.rows = await api.quiz.getList();
      this.isLoading = false;
    },
    openQuiz(id: number) {
      this.selectedQuizId = id;
      this.showQuizDialog = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 70vh;
}
</style>
