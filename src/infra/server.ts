import { application } from "./app";

application.listen(3001, () => console.log(`[${new Date().toLocaleTimeString()}] Server is running!`));
