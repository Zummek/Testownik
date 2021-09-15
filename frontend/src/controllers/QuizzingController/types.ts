import Quiz, { Question } from 'app/types/Quiz';
import { QuizSettings } from 'app/types/User';

export interface RemainingQuestion {
  question: Question;
  remainingRepetitions: number;
}

export type QuizzingSettings = QuizSettings;

export interface QuizzingController {
  quiz: Quiz;
  upTime: number;
  timer: number;
  isQuizzing: boolean;
  settings: QuizzingSettings;
  remainingQuestions: RemainingQuestion[];
  currentQuestion: RemainingQuestion;
}
