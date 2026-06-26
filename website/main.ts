import "./style.css";

type QuizConfig = {
    title: string;
    passMark: number;
    questionCount: number;
    introduction: string;
};

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

let questionBank: Question[] = [];
let config: QuizConfig;

function renderStartScreen():void {
    //Find app container
    const app: HTMLElement | null = document.getElementById("app");
    if (!app) return;

    //Clear anything inside it
    app.replaceChildren();

    //Create the section
    const startScreen: HTMLElement = document.createElement("section");

    //Create the heading
    const heading: HTMLHeadingElement = document.createElement("h1");
    heading.innerText = config.title;

    //Create the explanatory text.
    const subHeading: HTMLParagraphElement = document.createElement("p");
    subHeading.innerText = config.introduction;
    //this should also be referenced from some external file too, and the pass mark concatenated on the string etc

    //Create a div for the label and textbox
    const nameDiv: HTMLElement = document.createElement("div");

    //Create the label
    const nameLabel: HTMLLabelElement = document.createElement("label");
    nameLabel.innerText = "Enter your name here:";
    nameLabel.htmlFor = "student-name";
    nameDiv.appendChild(nameLabel);

    //Create the textbox
    const nameBox: HTMLInputElement = document.createElement("input");
    nameBox.id = "student-name";
    nameBox.type = "text";
    nameBox.autocomplete = "name";
    nameDiv.appendChild(nameBox);

    //Create the Start button
    const startButton: HTMLButtonElement = document.createElement("button");
    startButton.innerText = "Start Quiz";
    startButton.disabled = true;

    nameBox.addEventListener("input", updateStartButton);

    function updateStartButton(): void {
        const name:string = nameBox.value.trim();
        if (name.length > 0) {
            startButton.disabled = false;
        }
            else startButton.disabled = true;
    }

    startButton.addEventListener("click", updateState);

    function updateState(): void {
        state.studentName = nameBox.value.trim();
        console.log("Quiz started:", state);
        initializeQuiz();
    }

    //Assemble and attach to app
    startScreen.appendChild(heading);
    startScreen.appendChild(subHeading);
    startScreen.appendChild(nameDiv);
    startScreen.appendChild(startButton);
    app.appendChild(startScreen);
}

function initializeQuiz(): void {
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

    console.log("Quiz initialised:", state)

}

async function loadFiles(): Promise<void> {
    const questionsPromise = fetch("questions.json");
    const configPromise = fetch("config.json");

    const questionsResponse = await questionsPromise;
    const configResponse = await configPromise;

    if (!questionsResponse.ok) {
        throw new Error(`Failed to load questions: ${questionsResponse.status}`);
    }

    if (!configResponse.ok) {
        throw new Error(`Failed to load config: ${configResponse.status}`);
    }

    questionBank = await questionsResponse.json();
    config = await configResponse.json();

    console.log("Files loaded.");
    console.log(questionBank);
    console.log(config);
}

function handleLoadingError(error: unknown): void {
    console.error(error);

    const app = document.getElementById("app");
    if (!app) return;

    app.replaceChildren();

    const errorMessage = document.createElement("p");
    errorMessage.innerText = "The quiz could not be loaded. Please try again later.";

    app.appendChild(errorMessage);
}

loadFiles()
    .then(renderStartScreen)
    .catch(handleLoadingError);
