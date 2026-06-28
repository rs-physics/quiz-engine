import "../style.css";
import { state, select } from "../state.js";
import { previousQuestion, nextQuestion } from "../quiz.js";

export function renderQuestionScreen(): void {
    //Find app container and clear
    const app: HTMLElement | null = document.getElementById("app");
    if (!app) return;
    app.replaceChildren();

    //Create the section
    const quizScreen: HTMLElement = document.createElement("section");
    quizScreen.classList.add("quiz-card");

    //Create the Question Number
    const questionNo: HTMLHeadingElement = document.createElement("h1");
    questionNo.id = "question-number";
    quizScreen.appendChild(questionNo);

    //Create the question text
    const questionText: HTMLParagraphElement = document.createElement("h2");
    questionText.id = "question-text";
    quizScreen.appendChild(questionText);

    //Create the Answer buttons
    for (let i = 0; i < 4; i++) {
        const div: HTMLDivElement = document.createElement("div");
        div.classList.add("answer-div");
        const divButton: HTMLButtonElement = document.createElement("button");
        const divText: HTMLParagraphElement = document.createElement("p");

        div.addEventListener("click", () => {
            selectAnswer(i);
        })
        divButton.innerText = select[i]!;
        divButton.id = `button-${i}`;
        divText.id = `answer-${select[i]!}`;
        div.appendChild(divButton);
        div.appendChild(divText);
        quizScreen.appendChild(div);
    }

    //Create navigation buttons
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("nav-div");
    const buttonPrevious: HTMLButtonElement = document.createElement("button");
    const buttonNext: HTMLButtonElement = document.createElement("button");

    buttonPrevious.id = "button-previous";
    buttonPrevious.innerText = "Previous";
    buttonNext.id = "button-next";
    buttonNext.innerText = "Next";
    div.appendChild(buttonPrevious);
    div.appendChild(buttonNext);
    quizScreen.appendChild(div);

    buttonPrevious.addEventListener("click", previousQuestion);
    buttonNext.addEventListener("click", nextQuestion);

    //Display
    app.appendChild(quizScreen);
}

export function updateQuestion(): void {
    //Identify current question
    const currentQ = state.questions[state.currentQuestionIndex];
    if (!currentQ) return;

    //Display question no
    const questionNo= document.getElementById("question-number");
    if (!questionNo) return;
    questionNo.innerText = `Question ${state.currentQuestionIndex + 1}`;

    //Display question text
    const questionText = document.getElementById("question-text");
    if (!questionText) return;
    questionText.innerText = currentQ.question;

    //Display answers
    for (let i = 0; i < 4; i++) {
        const answerText = document.getElementById(`answer-${select[i]!}`)
        if (!answerText) return;
        answerText.innerText = currentQ.answers[i]!;
    }

    //If first question, set previous button to disabled
    const prevButton= document.getElementById("button-previous") as HTMLButtonElement
    if (!prevButton) return;
    if (state.currentQuestionIndex === 0) {
        prevButton.disabled = true;
    }
    else {
        prevButton.disabled = false;
    }

    //If last question, change next button text to submit
    const nextButton= document.getElementById("button-next") as HTMLButtonElement
    if (!nextButton) return;
    if (state.currentQuestionIndex === state.questions.length - 1) {
        nextButton.innerText = "Submit";
    }
    else {
        nextButton.innerText = "Next";
    }

    //rehighlight a previously selected answer
    for (let i = 0; i < 4; i++) {
        const button = document.getElementById(`button-${i}`) as HTMLButtonElement;
        button.classList.remove("selected");
    }

    const selected = state.selectedAnswers[state.currentQuestionIndex];
    if (selected !== null) {
        const button = document.getElementById(`button-${selected}`) as HTMLButtonElement;
        button.classList.add("selected");
    }
}

function selectAnswer(n: number) {

    state.selectedAnswers[state.currentQuestionIndex] = n;

    for (let i = 0; i < 4; i++) {
        const button = document.getElementById(`button-${i}`) as HTMLButtonElement;

        if (i === n) {
            button.classList.add("selected");
        }
        else {
            button.classList.remove("selected");
        }
    }
}