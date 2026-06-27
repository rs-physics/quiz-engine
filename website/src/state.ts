import type { QuizConfig, Question, QuizState } from "./types.ts";

export let questionBank: Question[] = [];
export let config: QuizConfig;

export const state: QuizState = {
    studentName: "",
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    submitted: false,
    score: 0
};

export const select: string[] = ["A", "B", "C", "D"];

export function setQuestionBank(arg : Question[]): void {
    questionBank = arg;
}

export function setConfig(arg: QuizConfig): void {
    config = arg;
}