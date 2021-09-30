import Quiz, { Answer, Question } from 'app/types/Quiz';
import { QuizSettings } from 'app/types/User';

export interface RemainingQuestion {
  question: Question;
  remainingRepetitions: number;
}

export type QuizzingSettings = QuizSettings;

export type QuizzingStatus = 'markingAnswer' | 'showingAnswer' | 'finished';

export interface QuizzingController {
  quiz: Quiz;
  upTime: number;
  isQuizzing: boolean;
  status: QuizzingStatus;
  selectedAnswers: Answer[];
  settings: QuizzingSettings;
  remainingQuestions: RemainingQuestion[];
  currentQuestion: RemainingQuestion;
}
