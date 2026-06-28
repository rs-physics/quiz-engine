import { setQuestionBank, setConfig, } from "../state.js"

export async function loadFiles(): Promise<void> {
    const questionsPromise = fetch("./questions.json");
    const configPromise = fetch("./config.json");

    const questionsResponse = await questionsPromise;
    const configResponse = await configPromise;

    if (!questionsResponse.ok) {
        throw new Error(`Failed to load questions: ${questionsResponse.status}`);
    }

    if (!configResponse.ok) {
        throw new Error(`Failed to load config: ${configResponse.status}`);
    }

    setQuestionBank(await questionsResponse.json());
    setConfig(await configResponse.json());

    console.log("Files loaded.");
}

export function handleLoadingError(error: unknown): void {
    console.error(error);

    const app = document.getElementById("app");
    if (!app) return;

    app.replaceChildren();

    const errorMessage = document.createElement("p");
    errorMessage.innerText = "The quiz could not be loaded. Please try again later.";

    app.appendChild(errorMessage);
}