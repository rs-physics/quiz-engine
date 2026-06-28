import { config, state } from "../state.js"
import { initializeQuiz} from "../quiz.js";

export function renderStartScreen():void {
    //Find app container
    const app: HTMLElement | null = document.getElementById("app");
    if (!app) return;

    //Clear anything inside it
    app.replaceChildren();

    //Create the section
    const startScreen: HTMLElement = document.createElement("section");
    startScreen.classList.add("start-screen");

    //Create the heading
    const heading: HTMLHeadingElement = document.createElement("h1");
    heading.innerText = config.title;

    //Create the explanatory text.
    const subHeading: HTMLParagraphElement = document.createElement("p");
    subHeading.innerText = config.introduction;
    //this should also be referenced from some external file too, and the pass mark concatenated on the string etc

    //Create a div for the label and textbox
    const nameDiv: HTMLElement = document.createElement("div");
    nameDiv.classList.add("name-div")

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
        //console.log("Quiz started:", state);
        initializeQuiz();
    }

    //Assemble and attach to app
    startScreen.appendChild(heading);
    startScreen.appendChild(subHeading);
    startScreen.appendChild(nameDiv);
    startScreen.appendChild(startButton);
    app.appendChild(startScreen);
}