type Question = {
    id: number;
    topic: string;
    question: string;
    answers: string[];
    correct: number;
};

type QuizState = {
    studentName: string;
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswers: (number | null)[];
    submitted: boolean;
};

const state: QuizState = {
    studentName: "",
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    submitted: false
};

const statusElement = document.getElementById("status");

async function loadQuestions(): Promise<void> {
    try {
        const response = await fetch("questions.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        state.questions = await response.json();

        console.log("Questions loaded successfully:", state.questions);

        if (statusElement) {
            statusElement.textContent =
                `Question bank loaded successfully. ${state.questions.length} questions found.`;
        }
    } catch (error) {
        console.error("Failed to load questions:", error);

        if (statusElement) {
            statusElement.textContent = "Error: question bank could not be loaded.";
        }
    }
}

loadQuestions();