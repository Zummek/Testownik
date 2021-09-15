import { Answer, Quiz } from 'app/types/Quiz';
import store from 'src/store';
import {
  QuizzingController as IQuizzingController,
  QuizzingSettings,
  RemainingQuestion,
} from './types';

class QuizzingController implements IQuizzingController {
  quiz: Quiz;
  upTime: number;
  timer: number;
  isQuizzing: boolean;
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
      this.timer = 0;
      this.isQuizzing = false;
      this.remainingQuestions = [];
      this.settings = settings;
      this.generateRemainingQuestions();
      this.currentQuestion = this.getRandomRemainingQuestion();
    } else if (oldQuizzingController) {
      this.quiz = oldQuizzingController.quiz;
      this.upTime = oldQuizzingController.upTime;
      this.timer = 0;
      this.isQuizzing = oldQuizzingController.isQuizzing;
      this.remainingQuestions = oldQuizzingController.remainingQuestions;
      this.settings = oldQuizzingController.settings;
      this.currentQuestion = oldQuizzingController.currentQuestion;
    } else
      throw new Error(
        'No quiz with settings or oldQuizzingController provided'
      );
  }

  static fromOldQuizzingController(
    oldQuizzingController: IQuizzingController
  ): QuizzingController {
    return new QuizzingController(undefined, undefined, oldQuizzingController);
  }

  generateRemainingQuestions(): void {
    this.remainingQuestions = this.quiz.questions.map((question) => ({
      question,
      remainingRepetitions: this.settings.initialRepetitions,
    }));
  }

  getRandomRemainingQuestion(): RemainingQuestion {
    const randomIndex = Math.floor(
      Math.random() * this.remainingQuestions.length
    );
    return this.remainingQuestions[randomIndex];
  }

  start(): void {
    this.isQuizzing = true;
    this.timer = window.setInterval(() => {
      this.upTime += 1000;
    }, 1000);
  }

  pause(): void {
    this.isQuizzing = false;
    window.clearInterval(this.timer);
    void this.saveSession();
  }

  finish(): void {
    this.isQuizzing = false;
    window.clearInterval(this.timer);
    void this.saveSession();
  }

  checkAnswer(checkedAnswers: Answer[]): boolean {
    const correctAnswers = this.currentQuestion.question.answers.filter(
      (answer) => answer.isCorrect
    );
    return checkedAnswers.every((checkedAnswer) =>
      correctAnswers.some(
        (correctAnswer) => correctAnswer.id === checkedAnswer.id
      )
    );
  }

  answerQuestion(isCorrectAnswer: boolean): void {
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
    void this.saveSession();
  }

  getNextQuestion(): void {
    this.currentQuestion = this.getRandomRemainingQuestion();
    void this.saveSession();
  }

  private async saveSession(): Promise<void> {
    await store.dispatch('quizSessions/saveSession', this);
  }
}

export default QuizzingController;
