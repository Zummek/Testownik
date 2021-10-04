import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    meta: { public: false },
    children: [
      {
        path: '',
        name: 'panel',
        component: () => import('src/pages/panel/PanelPage.vue'),
      },
      {
        path: '/quizzes/:quizId/questions',
        name: 'quiz-questions',
        component: () => import('src/pages/quiz/list/QuizQuestionListPage.vue'),
      },
      {
        path: '/quizzes/:quizId',
        name: 'quiz-quizzing',
        component: () => import('src/pages/quiz/quizzing/QuizQuizzingPage.vue'),
      },
      {
        path: '/quizzes/:quizId/summary',
        name: 'quiz-summary',
        component: () => import('src/pages/quiz/quizzing/QuizSummaryPage.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/NoAppLayout.vue'),
    meta: { public: true },
    children: [
      { path: '', component: () => import('src/pages/homePage/HomePage.vue') },
      {
        path: '/login',
        name: 'login',
        component: () => import('src/pages/LoginPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
