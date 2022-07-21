import database from "./../database.json";

import TerminalController from "./terminalController.js";
import Person from "./person.js";

import { save } from "./repository.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERM = ":q";

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
    try {
        const answer = await terminalController.question("What? ");
        if (answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log("process finished");
            return;
        }

        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANG));

        await save(person);

        return mainLoop();
    } catch (error) {
        console.error("Deu Ruim!", error);
        return mainLoop();
    }
}

await mainLoop();

// setInterval(() => {
//     database.push({
//         "id": Date.now(),
//         "vehicles": ["test" + Date.now()],
//         "kmTraveled": 10000,
//         "from": "2009-01-01",
//         "to": "2009-11-26"
//     });
//     const table = chalkTable(options, database);
//     print(table);
// }, 10000);
