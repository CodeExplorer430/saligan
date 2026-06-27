import "reflect-metadata";

import { createApplication } from "./bootstrap.js";

const port = Number.parseInt(process.env.API_PORT ?? "3000", 10);
const app = await createApplication();

await app.listen(port, "0.0.0.0");
