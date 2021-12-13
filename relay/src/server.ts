import GUN from "gun"
import { createServer } from "http"

const server = createServer().listen(8080);
const gun = GUN({web: server});