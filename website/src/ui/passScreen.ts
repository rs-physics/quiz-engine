import html2canvas from "html2canvas";
import { config, state } from "../state.js";

export function renderPassScreen() {
    //find and clear app
    const app = document.getElementById('app');
    if (!app) return;
    app.replaceChildren();

    //create section
    const passScreen: HTMLElement = document.createElement('section');
    passScreen.classList.add("pass-screen");

    //create certificate div
    const certificateDiv: HTMLDivElement = document.createElement('div');
    certificateDiv.id = 'certificate';
    certificateDiv.classList.add("certificate");

    //create heading
    const passHeading: HTMLHeadingElement = document.createElement('h1');
    passHeading.innerText = config.title;
    certificateDiv.append(passHeading);

    //name
    const passName: HTMLHeadingElement = document.createElement('h2');
    passName.innerText = state.studentName;
    certificateDiv.append(passName);

    //give score
    const passScore: HTMLElement = document.createElement('p');
    passScore.innerText = `Your Score:
    ${state.score} / ${state.questions.length}`;
    certificateDiv.append(passScore);

    //pass
    const passText: HTMLHeadingElement = document.createElement('h3');
    passText.innerText = "Pass"
    certificateDiv.append(passText);

    //instructions
    const passInstructions: HTMLElement = document.createElement('p');
    passInstructions.innerText = "Screenshot the certificate below, or download using the button.";

    //download certificate button
    const buttonDL: HTMLButtonElement = document.createElement('button');
    buttonDL.innerText = "Download";

    buttonDL.addEventListener('click', certificateDL);

    //Render
    passScreen.appendChild(passInstructions);
    passScreen.appendChild(buttonDL);
    passScreen.appendChild(certificateDiv);
    app.appendChild(passScreen);
}

async function certificateDL() {
    const certificate = document.getElementById("certificate") as HTMLElement;
    if (!certificate) return;

    console.log("Certificate downloading...");

    (html2canvas as any)(certificate).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement("a");
        link.download = `${state.studentName}_certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}