import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helper/RouteHandler";
import './helper/routes';  //? see 'routes.ts' file

const port = config.port;

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    //extracting 'method' and 'url' from the 'req'
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";

    //*looking for the handler function in the Map() using the 'method' and 'url'
    const methodMap = routes.get(method); //get the 2nd Map(), which is the value of the 'method', from the 'routes Map()'

    const handler: RouteHandler | undefined = methodMap?.get(path); //get the handler function using the key(path, first item of the 2nd Map) of the 2nd Map()

    //if handler exists, run it, otherwise, -->> res.end("not found...");
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, {
        "content-type": "application/json",
      });
      res.end(
        JSON.stringify({
          success: false,
          message: "path not found",
          path: path,
        }),
      );
    }
  },
);

server.listen(port, () => {
  console.log(`node-ts server is running on port localhost:${port}`);
});
