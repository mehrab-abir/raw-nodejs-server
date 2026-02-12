import { ServerResponse } from "node:http";

function sendResponse(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, {
    "content-type": "application/json",
  });
  return res.end(JSON.stringify(data));
}

export default sendResponse;

