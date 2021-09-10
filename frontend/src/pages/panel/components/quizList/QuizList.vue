<template>
  <div class="box">
    <q-table
      :title="$t('quiz.quizzes')"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :loading="isLoading"
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

      <template v-slot:no-data>
        <empty-list :message="$t('quiz.emptyList')" />
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import EmptyList from 'src/components/EmptyList.vue';
import api from 'src/services/api';
import { QuizListResponse } from 'src/services/api/apiResources/types';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { EmptyList },
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
    openQuiz(id: string) {
      void this.$router.push({ name: 'quiz-start', params: { id } });
    },
  },
});
</script>

<style lang="scss" scoped>
.box {
  width: 70vh;
}
</style>
