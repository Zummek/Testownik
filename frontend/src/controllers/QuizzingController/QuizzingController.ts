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
  remainingQuestions: RemainingQuestion[];
  currentQuestion: RemainingQuestion;

  constructor(
    quiz?: Quiz,
    settings?: QuizzingSettings,
    oldQuizzingController?: IQuizzingController
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
      this.generateRemainingQuestions();
      this.currentQuestion = this.getRandomRemainingQuestion();
    } else if (oldQuizzingController) {
      this.quiz = oldQuizzingController.quiz;
      this.upTime = oldQuizzingController.upTime;
      this._timer = 0;
      this.isQuizzing = oldQuizzingController.isQuizzing;
      this.status = oldQuizzingController.status;
      this.selectedAnswers = oldQuizzingController.selectedAnswers;
      this.remainingQuestions = oldQuizzingController.remainingQuestions;
      this.settings = oldQuizzingController.settings;
      this.currentQuestion = oldQuizzingController.currentQuestion;
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
    const masteredQuestions =
      this.quiz.questions.length - this.remainingQuestions.length;
    return `${masteredQuestions}/${this.quiz.questions.length}`;
  }

  generateRemainingQuestions(): void {
    this.remainingQuestions = this.quiz.questions.map((question) => ({
      question,
      remainingRepetitions: this.settings.initialRepetitions,
    }));
  }

  getRandomRemainingQuestion(otherThan?: Question): RemainingQuestion {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * this.remainingQuestions.length);
    } while (this.remainingQuestions[randomIndex].question === otherThan);

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
      if (this.currentQuestion.remainingRepetitions === 0) {
        this.remainingQuestions = this.remainingQuestions.filter(
          (question) => question !== this.currentQuestion
        );
      }
    } else {
      this.currentQuestion.remainingRepetitions +=
        this.settings.additionalRepetitions;
    }
    this.status = 'showingAnswer';
    this.saveSession();

    return isCorrectAnswer;
  }

  getNextQuestion(): void {
    this.selectedAnswers = [];

    if (this.remainingQuestions.length === 0) {
      this.status = 'finished';
      this.saveSession();
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
    console.log('saveSession');
    store.commit('quizSessions/saveSession', this);
  }
}

export default QuizzingController;
