import { questionBank, config, state } from "./state.js"
import {renderQuestionScreen, updateQuestion} from "./ui/quizScreen.js";
import {renderFailScreen} from "./ui/failScreen.js";
import {renderPassScreen} from "./ui/passScreen.js";

export function initializeQuiz(): void {
    const shuffledQuestions = [...questionBank];
    let maxQuestions =  config.questionCount;

    for (let i = shuffledQuestions.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        const temp = shuffledQuestions[i]!;
        shuffledQuestions[i] = shuffledQuestions[randomIndex]!;
        shuffledQuestions[randomIndex] = temp;
    }

    if (config.questionCount > questionBank.length) {
        maxQuestions = questionBank.length;
    }

    state.questions = shuffledQuestions.slice(0, maxQuestions);
    state.selectedAnswers = Array(maxQuestions).fill(null);
    state.currentQuestionIndex = 0;
    state.submitted = false

    //console.log("Quiz initialised:")

    renderQuestionScreen();
    updateQuestion()
}

export function nextQuestion(): void {
    if (state.currentQuestionIndex === state.questions.length - 1) {
        submitAnswers();
        return;
    }
    state.currentQuestionIndex++;
    updateQuestion();
}

export function previousQuestion(): void {
    if (state.currentQuestionIndex === 0) return;
    state.currentQuestionIndex--;
    updateQuestion();
}

function submitAnswers(): void {
    state.submitted = true;

    for (let i = 0; i < state.questions.length; i++) {
        if (state.selectedAnswers[i] === state.questions[i]!.correct) {
            state.score++
        }
    }
    //console.log("Quiz submitted");

    const target = config.questionCount * config.passMark / 100
    if (state.score >= target) {
        renderPassScreen();
    }
    else {
        renderFailScreen();
    }
}