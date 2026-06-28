import { config, state } from "../state.js";
import { renderStartScreen } from "./startScreen.js"

export function renderFailScreen() {
    //find and clear app
    const app = document.getElementById('app');
    if (!app) return;
    app.replaceChildren();

    //create section
    const failScreen = document.createElement("section");
    failScreen.classList.add("fail-card");

    //create heading
    const failHeading = document.createElement("h1");
    failHeading.innerText = config.title;
    failScreen.appendChild(failHeading);

    //name
    const failName = document.createElement("h2");
    failName.innerText = state.studentName;
    failScreen.appendChild(failName);

    //give score
    const failScore = document.createElement("p");
    failScore.innerText = `Your Score:
    ${state.score} / ${state.questions.length}`;
    failScreen.appendChild(failScore);

    //fail
    const failText = document.createElement("h3");
    failText.innerText = "Fail"
    failScreen.appendChild(failText);

    //restart button
    const restartButton = document.createElement("button");
    restartButton.innerText = "Retry";
    failScreen.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
        renderStartScreen();
    })

    //render
    app.appendChild(failScreen);
}