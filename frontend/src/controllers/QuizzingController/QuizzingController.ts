import { Answer, Question, Quiz } from 'app/types/Quiz';
import { shuffle } from 'lodash';
import store from 'src/store';
import { QuizSession } from 'src/store/quizSessions/types';
import {
  QuizzingController as IQuizzingController,
  QuizzingSettings,
  QuizzingStatus,
  RemainingQuestion,
} from './types';

class QuizzingController implements IQuizzingController {
  quiz: Quiz;
  upTime: number;
  private _timer: number;
  isQuizzing: boolean;
  status: QuizzingStatus;
  selectedAnswers: Answer[];
  settings: QuizzingSettings;
  questionsWithoutCorrectAnswer: Question[];
  remainingQuestions: RemainingQuestion[];
  currentQuestion: RemainingQuestion;
  correctAnswers: number;
  incorrectAnswers: number;

  constructor(
    quiz?: Quiz,
    settings?: QuizzingSettings,
    oldQC?: IQuizzingController
  ) {
    if (quiz && settings) {
      this.quiz = quiz;
      this.upTime = 0;
      this._timer = 0;
      this.isQuizzing = false;
      this.status = 'markingAnswer';
      this.selectedAnswers = [];
      this.remainingQuestions = [];
      this.settings = settings;
      this.questionsWithoutCorrectAnswer = quiz.questions.filter((question) => {
        return !question.answers.some((answer) => answer.isCorrect);
      });
      this.generateRemainingQuestions();
      this.currentQuestion = this.getRandomRemainingQuestion();
      this.correctAnswers = 0;
      this.incorrectAnswers = 0;
    } else if (oldQC) {
      this.quiz = oldQC.quiz;
      this.upTime = oldQC.upTime;
      this._timer = 0;
      this.isQuizzing = oldQC.isQuizzing;
      this.status = oldQC.status;
      this.selectedAnswers = oldQC.selectedAnswers;
      this.remainingQuestions = oldQC.remainingQuestions;
      this.settings = oldQC.settings;
      this.questionsWithoutCorrectAnswer = oldQC.questionsWithoutCorrectAnswer;
      this.currentQuestion = oldQC.currentQuestion;
      this.correctAnswers = oldQC.correctAnswers;
      this.incorrectAnswers = oldQC.incorrectAnswers;
    } else
      throw new Error(
        'No quiz with settings or oldQuizzingController provided'
      );
  }

  static fromSession(oldSession: QuizSession): QuizzingController {
    return new QuizzingController(
      undefined,
      undefined,
      oldSession.quizController
    );
  }

  get masteredQuestionsFormated() {
    const allAvailableQuestions =
      this.quiz.questions.length - this.questionsWithoutCorrectAnswer.length;
    const masteredQuestions =
      allAvailableQuestions - this.remainingQuestions.length;
    return `${masteredQuestions}/${allAvailableQuestions}`;
  }

  generateRemainingQuestions(): void {
    this.remainingQuestions = this.quiz.questions
      .filter((question) => {
        return question.answers.some((answer) => answer.isCorrect);
      })
      .map((question) => ({
        question,
        remainingRepetitions: this.settings.initialRepetitions,
      }));
  }

  getRandomRemainingQuestion(otherThan?: Question): RemainingQuestion {
    let randomIndex;

    if (this.remainingQuestions.length === 1) {
      randomIndex = 0;
    } else {
      do {
        randomIndex = Math.floor(
          Math.random() * this.remainingQuestions.length
        );
      } while (this.remainingQuestions[randomIndex].question === otherThan);
    }
    return this.remainingQuestions[randomIndex];
  }

  start(): void {
    this.isQuizzing = true;
    this._timer = window.setInterval(() => {
      this.upTime += 1;
    }, 1000);
  }

  pause(): void {
    this.isQuizzing = false;
    window.clearInterval(this._timer);
    this.saveSession();
  }

  finish(): void {
    this.isQuizzing = false;
    window.clearInterval(this._timer);
    this.status = 'finished';
    this.saveSession();
  }

  checkAnswer(): boolean {
    const correctAnswers = this.currentQuestion.question.answers.filter(
      (answer) => answer.isCorrect
    );
    return this.selectedAnswers.every((checkedAnswer) =>
      correctAnswers.some(
        (correctAnswer) => correctAnswer.id === checkedAnswer.id
      )
    );
  }

  answerQuestion(): boolean {
    const isCorrectAnswer = this.checkAnswer();

    if (isCorrectAnswer) {
      this.currentQuestion.remainingRepetitions--;
      this.correctAnswers++;
      if (this.currentQuestion.remainingRepetitions === 0) {
        this.remainingQuestions = this.remainingQuestions.filter(
          (question) => question !== this.currentQuestion
        );
      }
    } else {
      this.currentQuestion.remainingRepetitions +=
        this.settings.additionalRepetitions;
      this.incorrectAnswers++;
    }
    this.status = 'showingAnswer';
    this.saveSession();

    return isCorrectAnswer;
  }

  getNextQuestion(): void {
    this.selectedAnswers = [];

    if (this.remainingQuestions.length === 0) {
      this.finish();
      return;
    }

    this.currentQuestion = this.getRandomRemainingQuestion(
      this.currentQuestion.question
    );
    this.currentQuestion.question.answers = shuffle(
      this.currentQuestion.question.answers
    );
    this.status = 'markingAnswer';
    this.saveSession();
  }

  private saveSession(): void {
    store.commit('quizSessions/saveSession', this);
  }
}

export default QuizzingController;
