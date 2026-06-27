export type QuizConfig = {
    title: string;
    passMark: number;
    questionCount: number;
    introduction: string;
};

export type Question = {
    id: number;
    topic: string;
    question: string;
    answers: string[];
    correct: number;
};

export type QuizState = {
    studentName: string;
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswers: (number | null)[];
    submitted: boolean;
    score: number;
};