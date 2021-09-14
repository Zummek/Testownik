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
        component: () => import('src/pages/quiz/QuizQuestionListPage.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/NoAppLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/homePage/HomePage.vue') },
      { path: '/login', component: () => import('src/pages/LoginPage.vue') },
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
