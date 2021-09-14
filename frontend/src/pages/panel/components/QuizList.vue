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
    <q-dialog v-model="showQuizDialog" @hide="onQuizDialogHide">
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
  async created() {
    await this.loadQuizzes();
    if (this.$route.query.s) void this.openQuiz(+String(this.$route.query.s));
  },
  methods: {
    async loadQuizzes() {
      this.rows = await api.quiz.getList();
      this.isLoading = false;
    },
    async openQuiz(id: number) {
      await this.$router.replace(`${this.$route.path}?s=${id}`);
      this.selectedQuizId = id;
      this.showQuizDialog = true;
    },
    async onQuizDialogHide() {
      await this.$router.replace(`${this.$route.path}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 70vh;
}
</style>
