import { loadFiles, handleLoadingError } from "./utils/loader.js";
import { renderStartScreen} from "./ui/startScreen.js";

loadFiles()
    .then(renderStartScreen)
    .catch(handleLoadingError);
