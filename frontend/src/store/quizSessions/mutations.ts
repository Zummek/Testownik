import QuizzingController from 'src/controllers/QuizzingController';
import { MutationTree } from 'vuex';
import { QuizSession, QuizSessionsState } from './types';

const mutation: MutationTree<QuizSessionsState> = {
  saveSession(state: QuizSessionsState, payload: QuizzingController) {
    const wantedQuizIndex = state.quizzes.findIndex(
      ({ quizController }) => quizController.quiz.id === payload.quiz.id
    );
    const pack = {
      quizController: payload,
      lastRun: new Date(),
    };

    if (wantedQuizIndex) {
      state.quizzes.splice(wantedQuizIndex, 1, pack);
    } else {
      state.quizzes.unshift(pack);
    }
  },
  removeSession(state: QuizSessionsState, payload: QuizSession) {
    const wantedQuizIndex = state.quizzes.findIndex(
      ({ quizController }) =>
        quizController.quiz.id === payload.quizController.quiz.id
    );
    if (wantedQuizIndex) {
      state.quizzes.splice(wantedQuizIndex, 1);
    }
  },
};

export default mutation;
