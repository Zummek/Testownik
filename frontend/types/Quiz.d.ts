export interface Answer {
  id: number;
  text: string;
  image: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  image: string;
  answers: Answer[];
}

export interface Quiz {
  id: number;
  name: string;
  description: string;
  questions: Question[];
  created: Date;
  modified: Date;
}

export interface QuizListItem extends Omit<Quiz, 'questions'> {
  questionsCount: number;
}

export default Quiz;
