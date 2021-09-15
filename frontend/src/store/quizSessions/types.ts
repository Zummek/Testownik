import QuizzingController from 'src/controllers/QuizzingController';

export interface QuizSession {
  quizController: QuizzingController;
  lastRun: Date;
}

export interface QuizSessions {
  quizzes: QuizSession[];
}

export type QuizSessionsState = QuizSessions;
